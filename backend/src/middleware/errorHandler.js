const logger      = require('../utils/logger');
const ApiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, {
    url:    req.originalUrl,
    method: req.method,
    stack:  process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  if (err.code === 'ER_DUP_ENTRY') {
    const field = err.message.includes('email') ? 'Email' : 'Value';
    return ApiResponse.badRequest(res, `${field} already exists.`);
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return ApiResponse.badRequest(res, 'Referenced record does not exist.');
  }

  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.unauthorized(res, 'Invalid token.');
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.unauthorized(res, 'Token expired. Please login again.');
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return ApiResponse.badRequest(res, 'File size too large.');
    }
    return ApiResponse.badRequest(res, err.message);
  }

  if (err.status === 404) {
    return ApiResponse.notFound(res, err.message);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message    = err.message || 'Internal Server Error';

  return ApiResponse.error(
    res,
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal Server Error'
      : message,
    statusCode
  );
};

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

module.exports = { errorHandler, notFound };