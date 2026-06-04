const { pool } = require('../config/db');

class Order {
  static generateOrderNumber() {
    const year   = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TG-${year}-${random}`;
  }

  static async create(data) {
    const orderNumber = this.generateOrderNumber();
    const {
      user_id,
      service_id,
      title,
      description,
      requirements,
      budget,
      deadline,
      priority
    } = data;

    const [result] = await pool.execute(
      `INSERT INTO orders
       (order_number, user_id, service_id, title, description,
        requirements, budget, deadline, priority)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        Number(user_id),
        Number(service_id),
        String(title),
        String(description),
        requirements ? String(requirements) : null,
        parseFloat(budget),
        String(deadline),
        priority || 'medium'
      ]
    );
    return { id: result.insertId, order_number: orderNumber };
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT o.*, 
              u.name  AS user_name,
              u.email AS user_email,
              u.phone AS user_phone,
              s.title AS service_name,
              s.category AS service_category
       FROM orders o
       JOIN users    u ON o.user_id    = u.id
       JOIN services s ON o.service_id = s.id
       WHERE o.id = ?`,
      [Number(id)]
    );
    return rows[0] || null;
  }

  static async findByOrderNumber(orderNumber) {
    const [rows] = await pool.execute(
      `SELECT o.*, s.title AS service_name
       FROM orders o
       JOIN services s ON o.service_id = s.id
       WHERE o.order_number = ?`,
      [String(orderNumber)]
    );
    return rows[0] || null;
  }

  static async findByUserId(userId, { page = 1, limit = 10 } = {}) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT o.*,
              s.title AS service_name,
              s.icon  AS service_icon
       FROM orders o
       JOIN services s ON o.service_id = s.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [Number(userId), Number(limit), Number(offset)]
    );
    const [count] = await pool.execute(
      'SELECT COUNT(*) AS total FROM orders WHERE user_id = ?',
      [Number(userId)]
    );
    return { orders: rows, total: count[0].total };
  }

  static async updateStatus(id, status, adminNote = null) {
    await pool.execute(
      'UPDATE orders SET status = ?, admin_note = ? WHERE id = ?',
      [String(status), adminNote ? String(adminNote) : null, Number(id)]
    );
  }

  static async getAll({ page = 1, limit = 10, status = '', search = '' }) {
    const offset     = (page - 1) * limit;
    let query        = `SELECT o.*,
                               u.name  AS user_name,
                               s.title AS service_name
                        FROM orders o
                        JOIN users    u ON o.user_id    = u.id
                        JOIN services s ON o.service_id = s.id
                        WHERE 1=1`;
    const params     = [];

    if (status) {
      query += ' AND o.status = ?';
      params.push(String(status));
    }
    if (search) {
      query += ' AND (o.order_number LIKE ? OR o.title LIKE ? OR u.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.execute(query, params);

    // Count query
    let countQ      = 'SELECT COUNT(*) AS total FROM orders o JOIN users u ON o.user_id = u.id WHERE 1=1';
    const countP    = [];
    if (status) { countQ += ' AND o.status = ?'; countP.push(String(status)); }
    if (search) {
      countQ += ' AND (o.order_number LIKE ? OR o.title LIKE ? OR u.name LIKE ?)';
      countP.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    const [count] = await pool.execute(countQ, countP);

    return { orders: rows, total: count[0].total };
  }

  static async getDashboardStats() {
    const [total]      = await pool.execute('SELECT COUNT(*) AS count FROM orders');
    const [pending]    = await pool.execute("SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'");
    const [inProgress] = await pool.execute("SELECT COUNT(*) AS count FROM orders WHERE status = 'in_progress'");
    const [completed]  = await pool.execute("SELECT COUNT(*) AS count FROM orders WHERE status = 'completed'");
    return {
      total:       total[0].count,
      pending:     pending[0].count,
      in_progress: inProgress[0].count,
      completed:   completed[0].count
    };
  }
}

module.exports = Order;