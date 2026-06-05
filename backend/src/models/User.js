const { pool } = require('../config/db');

class User {
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    return rows[0] || null;
  }

  static async findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, avatar, phone, is_verified, is_active, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

  static async create(userData) {
  const { name, email, password, phone } = userData;
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password, phone)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, phone || null]
  );
  return result.insertId;
}

  static async update(id, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await pool.execute(`UPDATE users SET ${fields} WHERE id = ?`, values);
    return this.findById(id);
  }

  static async updateOTP(id, otp, expiry) {
    await pool.execute(
      'UPDATE users SET otp = ?, otp_expiry = ? WHERE id = ?',
      [otp, expiry, id]
    );
  }

  static async verifyUser(id) {
    await pool.execute(
      'UPDATE users SET is_verified = TRUE, otp = NULL, otp_expiry = NULL WHERE id = ?',
      [id]
    );
  }

  static async updatePassword(id, hashedPassword) {
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
  }

  static async updateLastLogin(id) {
    await pool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?', [id]
    );
  }

  static async getAll({ page = 1, limit = 10, search = '', role = '' }) {
    const offset = (page - 1) * limit;
    let query  = 'SELECT id, name, email, role, phone, city, is_verified, is_active, created_at FROM users WHERE 1=1';
    let countQ = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
    const params = [];

    if (search) {
      query  += ' AND (name LIKE ? OR email LIKE ?)';
      countQ += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (role) {
      query  += ' AND role = ?';
      countQ += ' AND role = ?';
      params.push(role);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const [rows]  = await pool.execute(query, [...params, limit, offset]);
    const [count] = await pool.execute(countQ, params);

    return { users: rows, total: count[0].total };
  }

  static async getDashboardStats() {
    const [totalUsers]    = await pool.execute('SELECT COUNT(*) as count FROM users');
    const [newThisMonth]  = await pool.execute(
      'SELECT COUNT(*) as count FROM users WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())'
    );
    const [verifiedUsers] = await pool.execute(
      'SELECT COUNT(*) as count FROM users WHERE is_verified = TRUE'
    );
    return {
      total:      totalUsers[0].count,
      new_month:  newThisMonth[0].count,
      verified:   verifiedUsers[0].count
    };
  }
}

module.exports = User;