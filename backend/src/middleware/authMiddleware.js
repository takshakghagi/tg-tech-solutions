const { verifyToken } = require('../utils/generateToken');
const { pool }        = require('../config/db');
const ApiResponse     = require('../utils/apiResponse');
const logger          = require('../utils/logger');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return ApiResponse.unauthorized(res, 'Access token required. Please login.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return ApiResponse.unauthorized(res, 'Invalid or expired token. Please login again.');
    }

    const [rows] = await pool.execute(
      'SELECT id, name, email, role, is_active, is_verified FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!rows.length) {
      return ApiResponse.unauthorized(res, 'User not found.');
    }

    const user = rows[0];

    if (!user.is_active) {
      return ApiResponse.forbidden(res, 'Your account has been deactivated.');
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    return ApiResponse.unauthorized(res, 'Authentication failed.');
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const [rows] = await pool.execute(
          'SELECT id, name, email, role, is_active FROM users WHERE id = ?',
          [decoded.id]
        );
        if (rows.length && rows[0].is_active) {
          req.user = rows[0];
        }
      }
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { protect, optionalAuth };