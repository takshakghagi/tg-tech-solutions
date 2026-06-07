const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Takshakghagi@123',
  database: 'shopx_db',
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000,
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

module.exports = pool.promise();
