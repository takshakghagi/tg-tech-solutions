const express      = require('express');
const router       = express.Router();
const { pool }     = require('../config/db');
const ApiResponse  = require('../utils/apiResponse');
const { protect }  = require('../middleware/authMiddleware');

router.use(protect);

// GET notifications
router.get('/', async (req, res) => {
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
    return ApiResponse.error(res, error.message);
  }
});

// PUT mark as read
router.put('/:id/read', async (req, res) => {
  try {
    await pool.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    return ApiResponse.success(res, {}, 'Notification marked as read.');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

// PUT mark all as read
router.put('/mark-all-read', async (req, res) => {
  try {
    await pool.query(
      'UPDATE notifications SET is_read = 1 WHERE user_id = ?',
      [req.user.id]
    );
    return ApiResponse.success(res, {}, 'All notifications marked as read.');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
});

module.exports = router;