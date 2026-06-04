const mysql  = require('mysql2/promise');
const logger = require('../utils/logger');

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               parseInt(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  password: process.env.DB_PASSWORD || 'Takshakghagi@123',
  database:           process.env.DB_NAME     || 'tg_tech_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
  timezone:           '+05:30'
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    logger.info(`✅ MySQL Connected: ${process.env.DB_HOST}/${process.env.DB_NAME}`);
    connection.release();
  } catch (error) {
    logger.error(`❌ MySQL Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };