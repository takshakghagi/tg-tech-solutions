const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createOrder,
  verifyPayment,
  getInvoice
} = require('../controllers/paymentController');

router.post('/create-order',    protect, createOrder);
router.post('/verify',          protect, verifyPayment);
router.get('/invoice/:orderId', protect, getInvoice);

module.exports = router;