const { pool }    = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

const getAllServices = async (req, res) => {
  try {
    const [services] = await pool.query(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    return ApiResponse.success(res, { services });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

const getServiceById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE id = ? AND is_active = 1',
      [req.params.id]
    );
    if (!rows.length) return ApiResponse.notFound(res, 'Service not found.');
    return ApiResponse.success(res, { service: rows[0] });
  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = { getAllServices, getServiceById };