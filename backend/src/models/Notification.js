const { pool } = require('../config/db');

class Notification {
  static async create({ user_id, title, message, type, action_url = null }) {
    const [result] = await pool.execute(
      'INSERT INTO notifications (user_id, title, message, type, action_url) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, message, type, action_url]
    );
    return result.insertId;
  }

  static async getByUserId(userId, { page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    );
    const [unread] = await pool.execute(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [userId]
    );
    return { notifications: rows, unread_count: unread[0].count };
  }

  static async markAsRead(id, userId) {
    await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  }

  static async markAllAsRead(userId) {
    await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [userId]
    );
  }
}

module.exports = Notification;