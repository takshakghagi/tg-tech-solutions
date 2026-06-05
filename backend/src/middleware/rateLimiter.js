const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      1000,              // 100 se 1000 kar do
  message: {
    success: false,
    message: 'Too many requests. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders:   false,
  validate: { xForwardedForHeader: false }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      50,               // 10 se 50 kar do
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders:   false,
  validate: { xForwardedForHeader: false }
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max:      10,               // 3 se 10 kar do
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again after 5 minutes.'
  }
});

module.exports = { generalLimiter, authLimiter, otpLimiter };