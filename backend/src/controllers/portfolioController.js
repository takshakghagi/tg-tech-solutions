// backend/src/controllers/portfolioController.js
const { pool } = require('../config/db');

// ─── PUBLIC APIs ───────────────────────────────────────

// GET /api/portfolio/websites
exports.getWebsites = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM portfolio_items WHERE is_active=1 ORDER BY sort_order ASC, id DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/portfolio/projects
exports.getProjects = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM available_projects WHERE is_active=1 ORDER BY sort_order ASC, id DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/portfolio/docs
exports.getDocs = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM documentation_items WHERE is_active=1 ORDER BY sort_order ASC, id DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── ADMIN APIs ────────────────────────────────────────

// ── Portfolio Items (websites/apps) ──

exports.adminGetWebsites = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio_items ORDER BY sort_order ASC, id DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminCreateWebsite = async (req, res) => {
  try {
    const { type, title, description, image_url, live_link, tags, price_min, price_max, color, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO portfolio_items (type,title,description,image_url,live_link,tags,price_min,price_max,color,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [type||'website', title, description, image_url, live_link, tags, price_min||0, price_max||0, color||'#6366f1', sort_order||0]
    );
    res.json({ success: true, message: 'Item created!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminUpdateWebsite = async (req, res) => {
  try {
    const { type, title, description, image_url, live_link, tags, price_min, price_max, color, is_active, sort_order } = req.body;
    await pool.query(
      'UPDATE portfolio_items SET type=?,title=?,description=?,image_url=?,live_link=?,tags=?,price_min=?,price_max=?,color=?,is_active=?,sort_order=? WHERE id=?',
      [type, title, description, image_url, live_link, tags, price_min, price_max, color, is_active, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Item updated!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminDeleteWebsite = async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio_items WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Item deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Available Projects ──

exports.adminGetProjects = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM available_projects ORDER BY sort_order ASC, id DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminCreateProject = async (req, res) => {
  try {
    const { title, course, description, tags, price_min, price_max, delivery, color, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO available_projects (title,course,description,tags,price_min,price_max,delivery,color,sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
      [title, course, description, tags, price_min||0, price_max||0, delivery||'3 Days', color||'#6366f1', sort_order||0]
    );
    res.json({ success: true, message: 'Project created!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminUpdateProject = async (req, res) => {
  try {
    const { title, course, description, tags, price_min, price_max, delivery, color, is_active, sort_order } = req.body;
    await pool.query(
      'UPDATE available_projects SET title=?,course=?,description=?,tags=?,price_min=?,price_max=?,delivery=?,color=?,is_active=?,sort_order=? WHERE id=?',
      [title, course, description, tags, price_min, price_max, delivery, color, is_active, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Project updated!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminDeleteProject = async (req, res) => {
  try {
    await pool.query('DELETE FROM available_projects WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Project deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Documentation ──

exports.adminGetDocs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM documentation_items ORDER BY sort_order ASC, id DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminCreateDoc = async (req, res) => {
  try {
    const { title, description, price_min, price_max, color, sort_order } = req.body;
    const [result] = await pool.query(
      'INSERT INTO documentation_items (title,description,price_min,price_max,color,sort_order) VALUES (?,?,?,?,?,?)',
      [title, description, price_min||0, price_max||0, color||'#ef4444', sort_order||0]
    );
    res.json({ success: true, message: 'Doc created!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminUpdateDoc = async (req, res) => {
  try {
    const { title, description, price_min, price_max, color, is_active, sort_order } = req.body;
    await pool.query(
      'UPDATE documentation_items SET title=?,description=?,price_min=?,price_max=?,color=?,is_active=?,sort_order=? WHERE id=?',
      [title, description, price_min, price_max, color, is_active, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'Doc updated!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.adminDeleteDoc = async (req, res) => {
  try {
    await pool.query('DELETE FROM documentation_items WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Doc deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};