require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('./src/config/db');

async function testLogin() {
  try {
    const email    = 'ghagitakshak@gmail.com';
    const password = 'Admin@123';

    // DB se user lo
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (!rows.length) {
      console.log('❌ User NOT found in database!');
      process.exit(1);
    }

    const user = rows[0];
    console.log('✅ User found:', user.name);
    console.log('✅ Role:', user.role);
    console.log('✅ Is Verified:', user.is_verified);
    console.log('✅ Is Active:', user.is_active);
    console.log('✅ Password Hash:', user.password.substring(0, 30));

    // Password compare karo
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password Match:', isMatch ? '✅ YES' : '❌ NO');

    if (!isMatch) {
      // Naya hash banao aur update karo
      console.log('\n🔄 Fixing password...');
      const newHash = await bcrypt.hash(password, 12);
      await pool.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [newHash, email]
      );
      console.log('✅ Password updated successfully!');
      
      // Dobara verify karo
      const isMatch2 = await bcrypt.compare(password, newHash);
      console.log('✅ New Password Match:', isMatch2 ? '✅ YES' : '❌ NO');
    }

    process.exit(0);
  } catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();