const express = require('express');
const router  = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  getMyOrders,
  getMyDownloads,
  getNotifications
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/profile',         getProfile);
router.put('/profile',         updateProfile);
router.put('/change-password', changePassword);
router.get('/orders',          getMyOrders);
router.get('/downloads',       getMyDownloads);
router.get('/notifications',   getNotifications);

module.exports = router;