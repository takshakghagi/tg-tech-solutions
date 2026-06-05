const nodemailer = require('nodemailer');
const logger     = require('./logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    logger.error(`Email transporter error: ${error.message}`);
  } else {
    logger.info('Email transporter ready!');
  }
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from:    process.env.EMAIL_FROM || `TG Tech Solutions <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || ''
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Email failed to ${to}: ${error.message}`);
    throw new Error(`Email send failed: ${error.message}`);
  }
};

const sendOTPEmail = async (email, name, otp) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#1a1a2e;border-radius:16px;
                 overflow:hidden;border:1px solid #6366f1;">
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;">
                ⚡ TG Tech Solutions
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">
                Email Verification
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">
              <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;">
                Hello <strong style="color:#ffffff;">${name}</strong>,
              </p>
              <p style="margin:0 0 32px;color:#94a3b8;font-size:15px;line-height:1.6;">
                Use the verification code below to verify your email address.
                This code will expire in <strong style="color:#ffffff;">10 minutes</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center"
                    style="background:#0f0f1a;border:2px dashed #6366f1;
                           border-radius:12px;padding:28px;">
                    <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;
                               text-transform:uppercase;letter-spacing:2px;font-weight:600;">
                      Verification Code
                    </p>
                    <p style="margin:0;color:#6366f1;font-size:42px;font-weight:800;
                               font-family:monospace;letter-spacing:8px;">
                      ${otp}
                    </p>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1e1b4b;border-left:4px solid #f97316;
                             border-radius:0 8px 8px 0;padding:14px 18px;">
                    <p style="margin:0;color:#fed7aa;font-size:13px;line-height:1.6;">
                      ⚠️ If you did not request this code, please ignore this email.
                      Do not share this code with anyone.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0f0f1a;padding:24px;text-align:center;
                       border-top:1px solid #2a2a4a;">
              <p style="margin:0 0 4px;color:#e2e8f0;font-size:14px;font-weight:600;">
                TG Tech Solutions
              </p>
              <p style="margin:0 0 4px;color:#64748b;font-size:13px;">
                Nagpur, Maharashtra, India
              </p>
              <p style="margin:0;color:#475569;font-size:12px;">
                © 2024 TG Tech Solutions. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return sendEmail({
    to:      email,
    subject: 'Email Verification — TG Tech Solutions',
    html
  });
};

const sendOrderConfirmationEmail = async (email, name, order) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;background:#1a1a2e;border-radius:16px;border:1px solid #6366f1;">
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
              <p style="margin:0;font-size:40px;">🎉</p>
              <h1 style="margin:12px 0 0;color:#fff;font-size:26px;font-weight:800;">Order Confirmed!</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);">⚡ TG Tech Solutions</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">
              <p style="margin:0 0 16px;color:#e2e8f0;">Hello <strong style="color:#fff;">${name}</strong>,</p>
              <p style="margin:0 0 28px;color:#94a3b8;">Your order has been placed! We will contact you shortly.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center" style="background:#0f0f1a;border:2px dashed #6366f1;border-radius:12px;padding:24px;">
                    <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;letter-spacing:2px;">ORDER NUMBER</p>
                    <p style="margin:0;color:#6366f1;font-size:32px;font-weight:800;font-family:monospace;">${order.order_number}</p>
                  </td>
                </tr>
              </table>
              <p style="color:#94a3b8;">Service: <strong style="color:#fff;">${order.service_name}</strong></p>
              <p style="color:#94a3b8;">Budget: <strong style="color:#10b981;">₹${order.budget}</strong></p>
              <p style="color:#94a3b8;">Deadline: <strong style="color:#fff;">${order.deadline}</strong></p>
              <br/>
              <p style="color:#c7d2fe;background:#1e1b4b;padding:16px;border-left:4px solid #6366f1;border-radius:0 8px 8px 0;">
                📋 We will contact you within <strong style="color:#fff;">24 hours</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#0f0f1a;padding:24px;text-align:center;border-top:1px solid #2a2a4a;">
              <p style="margin:0;color:#e2e8f0;font-weight:600;">TG Tech Solutions — Nagpur</p>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">© 2024 All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return sendEmail({
    to:      email,
    subject: `Order Confirmed — ${order.order_number} | TG Tech Solutions`,
    html
  });
};

const sendPasswordResetEmail = async (email, name, resetLink) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;background:#1a1a2e;border-radius:16px;border:1px solid #6366f1;">
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">⚡ TG Tech Solutions</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);">Password Reset Request</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">
              <p style="color:#e2e8f0;">Hello <strong style="color:#fff;">${name}</strong>,</p>
              <p style="color:#94a3b8;">Click the button below to reset your password.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);
                             color:#fff;text-decoration:none;padding:14px 36px;
                             border-radius:10px;font-size:16px;font-weight:700;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#fed7aa;background:#1e1b4b;padding:14px;border-left:4px solid #f97316;border-radius:0 8px 8px 0;">
                ⚠️ This link expires in <strong style="color:#fff;">1 hour</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#0f0f1a;padding:24px;text-align:center;border-top:1px solid #2a2a4a;">
              <p style="margin:0;color:#e2e8f0;font-weight:600;">TG Tech Solutions — Nagpur</p>
              <p style="margin:4px 0 0;color:#64748b;font-size:12px;">© 2024 All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return sendEmail({
    to:      email,
    subject: 'Password Reset — TG Tech Solutions',
    html
  });
};

module.exports = {
  sendEmail,
  sendOTPEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetEmail
};