const bcrypt = require('bcryptjs');

async function generateHashes() {
  const adminHash = await bcrypt.hash('Admin@123', 12);
  const userHash  = await bcrypt.hash('User@123', 12);

  console.log('Admin Password Hash (Admin@123):');
  console.log(adminHash);
  console.log('\nUser Password Hash (User@123):');
  console.log(userHash);
}

generateHashes();