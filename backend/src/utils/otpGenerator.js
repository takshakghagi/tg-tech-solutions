const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOTPExpiry = (minutes = 10) => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
};

module.exports = { generateOTP, getOTPExpiry };