const { body, validationResult } = require('express-validator');
const ApiResponse = require('../utils/apiResponse');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.badRequest(res, 'Validation failed', errors.array());
  }
  next();
};

const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

const orderValidation = [
  body('service_id')
    .notEmpty().withMessage('Service is required')
    .isInt({ min: 1 }).withMessage('Invalid service'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 300 }).withMessage('Title must be 3-300 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 3 }).withMessage('Description must be at least 3 characters'),
  body('budget')
    .notEmpty().withMessage('Budget is required')
    .isFloat({ min: 0 }).withMessage('Invalid budget'),
  body('deadline')
    .notEmpty().withMessage('Deadline is required'),
  validate
];

const reviewValidation = [
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
  body('comment')
    .trim()
    .notEmpty().withMessage('Comment is required')
    .isLength({ min: 10 }).withMessage('Comment must be at least 10 characters'),
  validate
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  orderValidation,
  reviewValidation
};