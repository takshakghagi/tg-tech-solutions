const express     = require('express');
const router      = express.Router();
const { pool }    = require('../config/db');
const ApiResponse = require('../utils/apiResponse');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// GET all reviews (Admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const [reviews] = await pool.query(
      `SELECT r.*,
              u.name  AS user_name,
              s.title AS service_name
       FROM reviews r
       LEFT JOIN users    u ON r.user_id    = u.id
       LEFT JOIN services s ON r.service_id = s.id
       ORDER BY r.created_at DESC`
    );
    return ApiResponse.success(res, reviews);
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

// GET approved reviews (Public)
router.get('/', async (req, res) => {
  try {
    const [reviews] = await pool.query(
      `SELECT r.*,
              u.name  AS user_name,
              s.title AS service_name
       FROM reviews r
       LEFT JOIN users    u ON r.user_id    = u.id
       LEFT JOIN services s ON r.service_id = s.id
       WHERE r.is_approved = 1
       ORDER BY r.created_at DESC`
    );
    return ApiResponse.success(res, { reviews });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

// POST create review
router.post('/', protect, async (req, res) => {
  try {
    const { service_id, rating, title, comment } = req.body;
    const [result] = await pool.query(
      `INSERT INTO reviews (user_id, service_id, rating, title, comment)
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, service_id, rating, title || null, comment]
    );
    return ApiResponse.created(res, { id: result.insertId }, 'Review submitted!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

// PUT approve review
router.put('/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    await pool.query(
      'UPDATE reviews SET is_approved = 1 WHERE id = ?',
      [req.params.id]
    );
    return ApiResponse.success(res, {}, 'Review approved!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

// DELETE review
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM reviews WHERE id = ?', [req.params.id]
    );
    return ApiResponse.success(res, {}, 'Review deleted!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

module.exports = router;