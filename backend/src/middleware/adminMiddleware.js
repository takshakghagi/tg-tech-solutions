const ApiResponse = require('../utils/apiResponse');

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return ApiResponse.unauthorized(res, 'Please login first.');
  }

  if (req.user.role !== 'admin') {
    return ApiResponse.forbidden(res, 'Admin access required.');
  }

  next();
};

module.exports = { adminOnly };