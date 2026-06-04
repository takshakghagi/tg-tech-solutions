const bcrypt       = require('bcryptjs');
const { pool }     = require('../config/db');
const ApiResponse  = require('../utils/apiResponse');
const logger       = require('../utils/logger');

// @desc    Get Profile
const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, avatar, phone, city, bio, is_verified, is_active, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'User not found.');
    return ApiResponse.success(res, { user: rows[0] });
  } catch (error) {
    logger.error(`getProfile error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, city, bio } = req.body;
    const updateData = {};
    if (name)  updateData.name  = name;
    if (phone) updateData.phone = phone;
    if (city)  updateData.city  = city;
    if (bio)   updateData.bio   = bio;

    if (Object.keys(updateData).length === 0) {
      return ApiResponse.badRequest(res, 'No data to update.');
    }

    const fields = Object.keys(updateData).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(updateData), req.user.id];

    await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, values);

    const [rows] = await pool.query(
      'SELECT id, name, email, role, avatar, phone, city, bio, is_verified, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    return ApiResponse.success(res, { user: rows[0] }, 'Profile updated!');
  } catch (error) {
    logger.error(`updateProfile error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Change Password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const [rows] = await pool.query(
      'SELECT password FROM users WHERE id = ?', [req.user.id]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'User not found.');

    if (!rows[0].password) {
      return ApiResponse.badRequest(res, 'Google account cannot change password here.');
    }

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) return ApiResponse.badRequest(res, 'Current password is incorrect.');

    const hashed = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);

    return ApiResponse.success(res, {}, 'Password changed successfully!');
  } catch (error) {
    logger.error(`changePassword error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [orders] = await pool.query(
      `SELECT o.*, s.title AS service_name, s.icon AS service_icon
       FROM orders o
       JOIN services s ON o.service_id = s.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [req.user.id, limit, offset]
    );

    const [count] = await pool.query(
      'SELECT COUNT(*) AS total FROM orders WHERE user_id = ?',
      [req.user.id]
    );

    return ApiResponse.paginated(res, orders, {
      page, limit,
      total: count[0].total,
      pages: Math.ceil(count[0].total / limit)
    });
  } catch (error) {
    logger.error(`getMyOrders error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get My Downloads
const getMyDownloads = async (req, res) => {
  try {
    const [downloads] = await pool.query(
      `SELECT n.id, n.title, n.subject, n.course, n.thumbnail,
              n.file_url, ud.download_count, ud.last_downloaded
       FROM user_downloads ud
       JOIN notes n ON ud.note_id = n.id
       WHERE ud.user_id = ?
       ORDER BY ud.last_downloaded DESC`,
      [req.user.id]
    );
    return ApiResponse.success(res, { downloads });
  } catch (error) {
    logger.error(`getMyDownloads error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get Notifications
const getNotifications = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [notifications] = await pool.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [req.user.id, limit, offset]
    );
    const [unread] = await pool.query(
      'SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND is_read = 0',
      [req.user.id]
    );

    return ApiResponse.success(res, {
      notifications,
      unread_count: unread[0].count
    });
  } catch (error) {
    logger.error(`getNotifications error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getMyOrders,
  getMyDownloads,
  getNotifications
};