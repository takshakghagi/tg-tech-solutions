const express = require('express');
const router  = express.Router();
const {
  getDashboard, getAllUsers, getAllOrders,
  updateOrderStatus, createNote, updateNote,
  deleteNote, toggleUserStatus
} = require('../controllers/adminController');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.use(protect, adminOnly);

router.get('/dashboard',            getDashboard);
router.get('/users',                getAllUsers);
router.put('/users/:id/toggle',     toggleUserStatus);
router.get('/orders',               getAllOrders);
router.put('/orders/:id/status',    updateOrderStatus);
router.post('/notes',               createNote);
router.put('/notes/:id',            updateNote);
router.delete('/notes/:id',         deleteNote);

module.exports = router;