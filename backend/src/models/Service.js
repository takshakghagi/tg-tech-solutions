const { pool } = require('../config/db');

class Service {
  static async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM services WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM services WHERE id = ? AND is_active = TRUE',
      [Number(id)]
    );
    return rows[0] || null;
  }

  static async findBySlug(slug) {
    const [rows] = await pool.execute(
      'SELECT * FROM services WHERE slug = ? AND is_active = TRUE',
      [String(slug)]
    );
    return rows[0] || null;
  }

  static async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO services
       (title, slug, description, short_desc, icon, category,
        features, technologies, delivery_days)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        String(data.title),
        String(data.slug),
        String(data.description),
        String(data.short_desc),
        String(data.icon),
        String(data.category),
        JSON.stringify(data.features || []),
        JSON.stringify(data.technologies || []),
        Number(data.delivery_days || 7)
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    await pool.execute(
      `UPDATE services SET ${fields} WHERE id = ?`,
      [...Object.values(data), Number(id)]
    );
  }
}

module.exports = Service;