const bcrypt              = require('bcryptjs');
const User                = require('../models/User');
const { generateTokenPair, verifyToken } = require('../utils/generateToken');
const { generateOTP, getOTPExpiry }      = require('../utils/otpGenerator');
const { sendOTPEmail, sendPasswordResetEmail } = require('../utils/sendEmail');
const ApiResponse         = require('../utils/apiResponse');
const Notification        = require('../models/Notification');
const logger              = require('../utils/logger');
const { pool }            = require('../config/db');

// @desc    Register User
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findByEmail(email);
    if (existing) {
      return ApiResponse.badRequest(res, 'Email already registered. Please login.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await User.create({ 
      name, email, 
      password: hashedPassword, 
      phone: phone || null
    });

    const otp    = generateOTP();
    const expiry = getOTPExpiry(10);
    await User.updateOTP(userId, otp, expiry);
    
    // Send OTP email — non blocking
    sendOTPEmail(email, name, otp).catch(e => 
      logger.error(`OTP email failed: ${e.message}`)
    );

    logger.info(`New user registered: ${email}`);
    return ApiResponse.created(res, { userId }, 'Registration successful! Please verify your email.');
  } catch (error) {
    logger.error(`Register error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Verify OTP
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
    
    // Notification — non blocking
    Notification.create({
      user_id:    user.id,
      title:      'Welcome to TG Tech Solutions! 🎉',
      message:    `Welcome ${user.name}! Your account has been verified successfully.`,
      type:       'system',
      action_url: '/dashboard'
    }).catch(e => logger.error(`Notification error: ${e.message}`));

    const { accessToken, refreshToken } = generateTokenPair(user);
    return ApiResponse.success(res, { accessToken, refreshToken }, 'Email verified successfully!');
  } catch (error) {
    logger.error(`OTP verify error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    if (!user.password) {
      return ApiResponse.badRequest(res, 'This account uses Google login.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.unauthorized(res, 'Invalid email or password.');
    }

    if (!user.is_verified) {
      return ApiResponse.badRequest(res, 'Please verify your email first.');
    }

    // is_active check — safely
    if (user.is_active === 0) {
      return ApiResponse.forbidden(res, 'Account deactivated. Contact support.');
    }

    // Update last login — safely
    try {
      await pool.query(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [user.id]
      );
    } catch(e) {
      // Ignore if column missing
    }

    const { accessToken, refreshToken } = generateTokenPair(user);

    logger.info(`User logged in: ${email}`);

    return ApiResponse.success(res, {
      accessToken,
      refreshToken,
      user: {
        id:     user.id,
        name:   user.name,
        email:  user.email,
        role:   user.role,
        avatar: user.avatar || null
      }
    }, 'Login successful!');
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Google OAuth Callback
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
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return ApiResponse.success(res, { user });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

// @desc    Logout
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