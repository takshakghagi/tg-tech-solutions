const express = require('express');
const router  = express.Router();
const { createOrder, getOrder, trackOrder } = require('../controllers/orderController');
const { protect }           = require('../middleware/authMiddleware');
const { uploadAny }         = require('../middleware/uploadMiddleware');
const { orderValidation }   = require('../middleware/validator');

router.get('/track/:orderNumber', trackOrder);
router.use(protect);
router.post('/create',  uploadAny.array('files', 5), orderValidation, createOrder);
router.get('/:id',      getOrder);

module.exports = router;