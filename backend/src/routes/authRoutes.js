const express  = require('express');
const router   = express.Router();
const passport = require('../config/passport');
const {
  register, verifyOTP, login, googleCallback,
  forgotPassword, resetPassword, resendOTP,
  getMe, logout
} = require('../controllers/authController');
const { protect }                            = require('../middleware/authMiddleware');
const { registerValidation, loginValidation } = require('../middleware/validator');
const { authLimiter, otpLimiter }            = require('../middleware/rateLimiter');

router.post('/register',          authLimiter, registerValidation, register);
router.post('/login',             authLimiter, loginValidation, login);
router.post('/verify-otp',        otpLimiter, verifyOTP);
router.post('/resend-otp',        otpLimiter, resendOTP);
router.post('/forgot-password',   authLimiter, forgotPassword);
router.post('/reset-password',    resetPassword);
router.get('/me',                 protect, getMe);
router.post('/logout',            protect, logout);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

module.exports = router;