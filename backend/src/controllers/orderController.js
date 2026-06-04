const Order        = require('../models/Order');
const Service      = require('../models/Service');
const Notification = require('../models/Notification');
const { sendOrderConfirmationEmail } = require('../utils/sendEmail');
const ApiResponse  = require('../utils/apiResponse');
const { pool }     = require('../config/db');
const logger       = require('../utils/logger');

// @desc    Create Order
// @route   POST /api/v1/orders/create
const createOrder = async (req, res) => {
  try {
    const {
      service_id,
      title,
      description,
      requirements,
      budget,
      deadline,
      priority
    } = req.body;

    // Validate service exists
    const service = await Service.findById(service_id);
    if (!service) {
      return ApiResponse.notFound(res, 'Service not found.');
    }

    // Create order
    const { id, order_number } = await Order.create({
      user_id:      req.user.id,
      service_id:   Number(service_id),
      title:        String(title),
      description:  String(description),
      requirements: requirements || null,
      budget:       parseFloat(budget),
      deadline:     String(deadline),
      priority:     priority || 'medium'
    });

    // Upload files if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const { uploadToCloudinary } = require('../config/cloudinary');
          const fs = require('fs');
          const uploaded = await uploadToCloudinary(file.path, 'tg-tech/order-files');
          await pool.execute(
            `INSERT INTO order_files
             (order_id, uploaded_by, file_name, file_url, file_type, file_size, file_category)
             VALUES (?, ?, ?, ?, ?, ?, 'requirement')`,
            [
              Number(id),
              Number(req.user.id),
              String(file.originalname),
              String(uploaded.url),
              String(file.mimetype),
              `${(file.size / 1024 / 1024).toFixed(2)} MB`
            ]
          );
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (fileErr) {
          logger.error(`File upload error: ${fileErr.message}`);
        }
      }
    }

    // Notification
    await Notification.create({
      user_id:    Number(req.user.id),
      title:      'Order Placed Successfully! 🎉',
      message:    `Your order ${order_number} has been placed successfully. We will contact you soon!`,
      type:       'order_update',
      action_url: `/dashboard/orders/${id}`
    });

    // Email (non-blocking)
    sendOrderConfirmationEmail(req.user.email, req.user.name, {
      order_number,
      service_name: service.title,
      budget,
      deadline
    }).catch(err => logger.error(`Order email failed: ${err.message}`));

    // ===== REAL-TIME SOCKET NOTIFICATION =====
    try {
      const io = req.app.get('io');
      if (io) {
        const { sendToAdmin, sendToUser } = require('../utils/socket');

        // Admin ko notify karo
        sendToAdmin(io, 'new_order', {
          message:      `New order from ${req.user.name}!`,
          order_id:     id,
          order_number,
          user_name:    req.user.name,
          service_name: service.title,
          budget,
          created_at:   new Date()
        });

        // User ko confirm karo
        sendToUser(io, req.user.id, 'order_confirmed', {
          message:      'Your order has been placed successfully! 🎉',
          order_id:     id,
          order_number
        });
      }
    } catch (socketErr) {
      logger.error(`Socket error: ${socketErr.message}`);
    }
    // ===== END SOCKET =====

    logger.info(`Order created: ${order_number} by user ${req.user.id}`);

    return ApiResponse.created(res,
      { order_id: id, order_number },
      'Order placed successfully!'
    );
  } catch (error) {
    logger.error(`Create order error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get Order by ID
// @route   GET /api/v1/orders/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return ApiResponse.notFound(res, 'Order not found.');

    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return ApiResponse.forbidden(res, 'Access denied.');
    }

    const [files] = await pool.execute(
      'SELECT * FROM order_files WHERE order_id = ? ORDER BY created_at DESC',
      [Number(req.params.id)]
    );

    return ApiResponse.success(res, { order, files });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Track Order
// @route   GET /api/v1/orders/track/:orderNumber
const trackOrder = async (req, res) => {
  try {
    const order = await Order.findByOrderNumber(req.params.orderNumber);
    if (!order) return ApiResponse.notFound(res, 'Order not found.');

    return ApiResponse.success(res, {
      order_number: order.order_number,
      title:        order.title,
      status:       order.status,
      service_name: order.service_name,
      budget:       order.budget,
      deadline:     order.deadline,
      admin_note:   order.admin_note,
      created_at:   order.created_at
    });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = { createOrder, getOrder, trackOrder };