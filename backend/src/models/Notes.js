const { pool }  = require('../config/db');
const slugify   = require('slugify');

class Notes {
  static async getAll({ page = 1, limit = 12, course = '', search = '', is_free = null }) {
    const offset = (page - 1) * limit;
    let query  = 'SELECT id, title, slug, subject, course, semester, price, is_free, thumbnail, file_size, total_pages, language, downloads, rating, total_ratings, created_at FROM notes WHERE is_active = TRUE';
    let countQ = 'SELECT COUNT(*) as total FROM notes WHERE is_active = TRUE';
    const params = [];

    if (course) {
      query  += ' AND course = ?';
      countQ += ' AND course = ?';
      params.push(course);
    }
    if (is_free !== null) {
      query  += ' AND is_free = ?';
      countQ += ' AND is_free = ?';
      params.push(is_free);
    }
    if (search) {
      query  += ' AND MATCH(title, subject, description) AGAINST(? IN BOOLEAN MODE)';
      countQ += ' AND MATCH(title, subject, description) AGAINST(? IN BOOLEAN MODE)';
      params.push(`${search}*`);
    }

    query += ' ORDER BY downloads DESC LIMIT ? OFFSET ?';
    const [rows]  = await pool.execute(query, [...params, limit, offset]);
    const [count] = await pool.execute(countQ, params);
    return { notes: rows, total: count[0].total };
  }

  static async findBySlug(slug) {
    const [rows] = await pool.execute(
      'SELECT * FROM notes WHERE slug = ? AND is_active = TRUE', [slug]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM notes WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const slug = slugify(data.title, { lower: true, strict: true });
    const [result] = await pool.execute(
      `INSERT INTO notes
       (title, slug, subject, description, course, semester, price, is_free,
        thumbnail, preview_url, file_url, file_size, total_pages, language, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title, slug, data.subject, data.description,
        data.course, data.semester, data.price, data.is_free || false,
        data.thumbnail || null, data.preview_url || null, data.file_url,
        data.file_size || null, data.total_pages || null,
        data.language || 'English', JSON.stringify(data.tags || [])
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await pool.execute(`UPDATE notes SET ${fields} WHERE id = ?`, values);
  }

  static async delete(id) {
    await pool.execute('UPDATE notes SET is_active = FALSE WHERE id = ?', [id]);
  }

  static async incrementDownload(id) {
    await pool.execute('UPDATE notes SET downloads = downloads + 1 WHERE id = ?', [id]);
  }

  static async isUserPurchased(userId, noteId) {
    const [rows] = await pool.execute(
      'SELECT id FROM user_downloads WHERE user_id = ? AND note_id = ?',
      [userId, noteId]
    );
    return rows.length > 0;
  }

  static async addUserDownload(userId, noteId, paymentId = null) {
    await pool.execute(
      `INSERT INTO user_downloads (user_id, note_id, payment_id, download_count, last_downloaded)
       VALUES (?, ?, ?, 1, NOW())
       ON DUPLICATE KEY UPDATE download_count = download_count + 1, last_downloaded = NOW()`,
      [userId, noteId, paymentId]
    );
    await this.incrementDownload(noteId);
  }

  static async getUserDownloads(userId) {
    const [rows] = await pool.execute(
      `SELECT n.id, n.title, n.subject, n.course, n.thumbnail, n.file_url,
              ud.download_count, ud.last_downloaded
       FROM user_downloads ud
       JOIN notes n ON ud.note_id = n.id
       WHERE ud.user_id = ?
       ORDER BY ud.last_downloaded DESC`,
      [userId]
    );
    return rows;
  }
}

module.exports = Notes;