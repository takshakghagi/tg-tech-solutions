const bcrypt              = require('bcryptjs');
const User                = require('../models/User');
const { generateTokenPair, verifyToken } = require('../utils/generateToken');
const { generateOTP, getOTPExpiry }      = require('../utils/otpGenerator');
const { sendOTPEmail, sendPasswordResetEmail } = require('../utils/sendEmail');
const ApiResponse         = require('../utils/apiResponse');
const Notification        = require('../models/Notification');
const logger              = require('../utils/logger');

// @desc    Register User
// @route   POST /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
      return ApiResponse.badRequest(res, 'Email already registered. Please login.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await User.create({ name, email, password: hashedPassword, phone, city });

    const otp    = generateOTP();
    const expiry = getOTPExpiry(10);
    await User.updateOTP(userId, otp, expiry);
    await sendOTPEmail(email, name, otp);

    logger.info(`New user registered: ${email}`);

    return ApiResponse.created(res, { userId }, 'Registration successful! Please verify your email.');
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/auth/verify-otp
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return ApiResponse.notFound(res, 'User not found.');

    if (user.is_verified) {
      return ApiResponse.badRequest(res, 'Email already verified.');
    }

    if (user.otp !== otp) {
      return ApiResponse.badRequest(res, 'Invalid OTP.');
    }

    if (new Date() > new Date(user.otp_expiry)) {
      return ApiResponse.badRequest(res, 'OTP expired. Please request a new one.');
    }

    await User.verifyUser(user.id);
    await Notification.create({
      user_id:    user.id,
      title:      'Welcome to TG Tech Solutions! 🎉',
      message:    `Namaste ${user.name}! Aapka account successfully verified ho gaya hai.`,
      type:       'system',
      action_url: '/dashboard'
    });

    const { accessToken, refreshToken } = generateTokenPair(user);

    return ApiResponse.success(res, { accessToken, refreshToken }, 'Email verified successfully!');
  } catch (error) {
    logger.error(`OTP verify error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Login User
// @route   POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    if (!user.password) {
      return ApiResponse.badRequest(res, 'This account uses Google login. Please login with Google.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    if (!user.is_verified) {
      return ApiResponse.badRequest(res, 'Please verify your email first.');
    }

    if (!user.is_active) {
      return ApiResponse.forbidden(res, 'Account deactivated. Contact support.');
    }

    await User.updateLastLogin(user.id);

    const { accessToken, refreshToken } = generateTokenPair(user);

    logger.info(`User logged in: ${email}`);

    return ApiResponse.success(res, {
      accessToken,
      refreshToken,
      user: {
        id:    user.id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        avatar: user.avatar
      }
    }, 'Login successful!');
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Google OAuth Callback
// @route   GET /api/v1/auth/google/callback
const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const { accessToken, refreshToken } = generateTokenPair(user);

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/google/success?token=${accessToken}&refresh=${refreshToken}`
    );
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
  }
};

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.success(res, {}, 'If this email exists, a reset link has been sent.');
    }

    const resetToken = generateTokenPair(user).accessToken;
    const resetLink  = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(email, user.name, resetLink);

    return ApiResponse.success(res, {}, 'Password reset email sent!');
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = verifyToken(token);
    if (!decoded) {
      return ApiResponse.badRequest(res, 'Invalid or expired reset link.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updatePassword(decoded.id, hashedPassword);

    return ApiResponse.success(res, {}, 'Password reset successful!');
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Resend OTP
// @route   POST /api/v1/auth/resend-otp
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return ApiResponse.notFound(res, 'User not found.');
    if (user.is_verified) return ApiResponse.badRequest(res, 'Email already verified.');

    const otp    = generateOTP();
    const expiry = getOTPExpiry(10);
    await User.updateOTP(user.id, otp, expiry);
    await sendOTPEmail(email, user.name, otp);

    return ApiResponse.success(res, {}, 'OTP resent successfully!');
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Get Current User
// @route   GET /api/v1/auth/me
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return ApiResponse.success(res, { user });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Logout
// @route   POST /api/v1/auth/logout
const logout = async (req, res) => {
  res.clearCookie('accessToken');
  return ApiResponse.success(res, {}, 'Logged out successfully!');
};

module.exports = {
  register, verifyOTP, login,
  googleCallback, forgotPassword,
  resetPassword, resendOTP,
  getMe, logout
};