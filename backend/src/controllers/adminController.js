const { pool }    = require('../config/db');
const Notification = require('../models/Notification');
const ApiResponse = require('../utils/apiResponse');

const getDashboard = async (req, res) => {
  try {
    const [totalUsers]   = await pool.query('SELECT COUNT(*) AS count FROM users');
    const [newUsers]     = await pool.query(
      'SELECT COUNT(*) AS count FROM users WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())'
    );
    const [totalOrders]  = await pool.query('SELECT COUNT(*) AS count FROM orders');
    const [pending]      = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'");
    const [inProgress]   = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE status = 'in_progress'");
    const [completed]    = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE status = 'completed'");
    const [revenue]      = await pool.query("SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE status = 'paid'");
    const [monthRevenue] = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE status = 'Paid' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())"
    );
    const [recentOrders] = await pool.query(
      `SELECT o.order_number, o.title, o.status, o.budget, o.created_at,
              u.name AS user_name, s.title AS service_name
       FROM orders o
       JOIN users u    ON o.user_id    = u.id
       JOIN services s ON o.service_id = s.id
       ORDER BY o.created_at DESC LIMIT 5`
    );
    const [revenueChart] = await pool.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month,
              SUM(amount) AS revenue, COUNT(*) AS orders
       FROM payments WHERE status = 'paid'
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY month DESC LIMIT 12`
    );

    return ApiResponse.success(res, {
      users: {
        total:     totalUsers[0].count,
        new_month: newUsers[0].count
      },
      orders: {
        total:       totalOrders[0].count,
        pending:     pending[0].count,
        in_progress: inProgress[0].count,
        completed:   completed[0].count
      },
      total_revenue:  revenue[0].total,
      month_revenue:  monthRevenue[0].total,
      recent_orders:  recentOrders,
      revenue_chart:  revenueChart.reverse()
    });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const role   = req.query.role   || '';

    let query = 'SELECT id, name, email, role, phone, is_verified, is_active, created_at FROM users WHERE 1=1';
    let countQ = 'SELECT COUNT(*) AS total FROM users WHERE 1=1';
    const params = [], countParams = [];

    if (search) {
      query  += ' AND (name LIKE ? OR email LIKE ?)';
      countQ += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }
    if (role) {
      query  += ' AND role = ?';
      countQ += ' AND role = ?';
      params.push(role);
      countParams.push(role);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [users] = await pool.query(query, params);
    const [count] = await pool.query(countQ, countParams);

    return ApiResponse.paginated(res, users, {
      page, limit,
      total: count[0].total,
      pages: Math.ceil(count[0].total / limit)
    });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';
    const search = req.query.search || '';

    let query  = `SELECT o.*, u.name AS user_name, s.title AS service_name
                  FROM orders o
                  JOIN users u    ON o.user_id    = u.id
                  JOIN services s ON o.service_id = s.id
                  WHERE 1=1`;
    let countQ = 'SELECT COUNT(*) AS total FROM orders WHERE 1=1';
    const params = [], countParams = [];

    if (status) {
      query  += ' AND o.status = ?';
      countQ += ' AND status = ?';
      params.push(status);
      countParams.push(status);
    }
    if (search) {
      query  += ' AND (o.order_number LIKE ? OR o.title LIKE ? OR u.name LIKE ?)';
      countQ += ' AND (order_number LIKE ? OR title LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      countParams.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await pool.query(query, params);
    const [count]  = await pool.query(countQ, countParams);

    return ApiResponse.paginated(res, orders, {
      page, limit,
      total: count[0].total,
      pages: Math.ceil(count[0].total / limit)
    });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, admin_note } = req.body;
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE id = ?', [req.params.id]
    );
    if (!orders.length) return ApiResponse.notFound(res, 'Order not found.');

    const order = orders[0];
    await pool.query(
      'UPDATE orders SET status = ?, admin_note = ? WHERE id = ?',
      [status, admin_note || null, req.params.id]
    );

    await Notification.create({
      user_id:    order.user_id,
      title:      `Order ${order.order_number} Update`,
      message:    `Your order status updated to: ${status.toUpperCase()}`,
      type:       'order_update',
      action_url: `/dashboard/orders/${order.id}`
    });

    return ApiResponse.success(res, {}, 'Order status updated!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const createNote = async (req, res) => {
  try {
    const {
      title, subject, description, course,
      semester, price, is_free, file_url,
      thumbnail, preview_url, file_size,
      total_pages, language, tags
    } = req.body;

    // Slug generate karo
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
      '-' + Date.now();

    const [result] = await pool.query(
      `INSERT INTO notes
       (title, slug, subject, description, course, semester,
        price, is_free, file_url, thumbnail, preview_url,
        file_size, total_pages, language, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(title),
        String(slug),
        String(subject),
        String(description || ''),
        String(course),
        String(semester),
        parseFloat(price) || 0,
        is_free ? 1 : 0,
        String(file_url),
        thumbnail  ? String(thumbnail)   : null,
        preview_url ? String(preview_url) : null,
        file_size  ? String(file_size)   : null,
        total_pages ? parseInt(total_pages) : null,
        String(language || 'English'),
        JSON.stringify(tags || [])
      ]
    );

    return ApiResponse.created(res, { noteId: result.insertId }, 'Note created successfully!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const {
      title, subject, description, course,
      semester, price, is_free, file_url,
      thumbnail, language
    } = req.body;

    await pool.query(
      `UPDATE notes SET
        title       = ?,
        subject     = ?,
        description = ?,
        course      = ?,
        semester    = ?,
        price       = ?,
        is_free     = ?,
        file_url    = ?,
        thumbnail   = ?,
        language    = ?
       WHERE id = ?`,
      [
        String(title       || ''),
        String(subject     || ''),
        String(description || ''),
        String(course      || ''),
        String(semester    || ''),
        parseFloat(price)  || 0,
        is_free ? 1 : 0,
        String(file_url    || ''),
        thumbnail ? String(thumbnail) : null,
        String(language    || 'English'),
        parseInt(req.params.id)
      ]
    );

    return ApiResponse.success(res, {}, 'Note updated successfully!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const deleteNote = async (req, res) => {
  try {
    await pool.query(
      'UPDATE notes SET is_active = 0 WHERE id = ?',
      [req.params.id]
    );
    return ApiResponse.success(res, {}, 'Note deleted!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT is_active FROM users WHERE id = ?', [req.params.id]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'User not found.');
    const newStatus = rows[0].is_active ? 0 : 1;
    await pool.query(
      'UPDATE users SET is_active = ? WHERE id = ?',
      [newStatus, req.params.id]
    );
    return ApiResponse.success(res, { is_active: newStatus },
      `User ${newStatus ? 'activated' : 'deactivated'}!`
    );
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  getDashboard, getAllUsers, getAllOrders,
  updateOrderStatus, createNote, updateNote,
  deleteNote, toggleUserStatus
};