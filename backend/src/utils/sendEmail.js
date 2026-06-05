const nodemailer  = require('nodemailer');
const logger      = require('./logger');

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
  tls: {
    rejectUnauthorized: false  
  }
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from:    process.env.EMAIL_FROM,
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
    throw new Error('Email send failed');
  }
};

// =============================================
// OTP EMAIL
// =============================================
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

          <!-- Header -->
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

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">
              <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;">
                Hello <strong style="color:#ffffff;">${name}</strong>,
              </p>
              <p style="margin:0 0 32px;color:#94a3b8;font-size:15px;line-height:1.6;">
                Use the verification code below to verify your email address.
                This code will expire in
                <strong style="color:#ffffff;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
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

              <!-- Warning -->
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

          <!-- Footer -->
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
</html>
  `;

  return sendEmail({
    to:      email,
    subject: 'Email Verification — TG Tech Solutions',
    html
  });
};

// =============================================
// ORDER CONFIRMATION EMAIL
// =============================================
const sendOrderConfirmationEmail = async (email, name, order) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#1a1a2e;border-radius:16px;
                 overflow:hidden;border:1px solid #6366f1;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);
                       padding:32px;text-align:center;">
              <p style="margin:0;font-size:40px;">🎉</p>
              <h1 style="margin:12px 0 0;color:#ffffff;font-size:26px;font-weight:800;">
                Order Confirmed!
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">
                ⚡ TG Tech Solutions
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">

              <!-- Greeting -->
              <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;">
                Hello <strong style="color:#ffffff;">${name}</strong>,
              </p>
              <p style="margin:0 0 28px;color:#94a3b8;font-size:15px;line-height:1.6;">
                Your order has been successfully placed!
                We will contact you shortly.
              </p>

              <!-- Order Number Box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="margin-bottom:28px;">
                <tr>
                  <td align="center"
                    style="background:#0f0f1a;border:2px dashed #6366f1;
                           border-radius:12px;padding:24px;">
                    <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;
                               text-transform:uppercase;letter-spacing:2px;font-weight:600;">
                      Order Number
                    </p>
                    <p style="margin:0;color:#6366f1;font-size:32px;font-weight:800;
                               font-family:monospace;letter-spacing:3px;">
                      ${order.order_number}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #2a2a4a;border-radius:12px;
                       overflow:hidden;margin-bottom:28px;">

                <!-- Service -->
                <tr>
                  <td style="padding:14px 20px;background:#0f0f1a;
                             border-bottom:1px solid #2a2a4a;">
                    <table width="100%">
                      <tr>
                        <td style="color:#94a3b8;font-size:14px;">Service</td>
                        <td align="right"
                          style="color:#ffffff;font-size:14px;font-weight:600;">
                          ${order.service_name}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Budget -->
                <tr>
                  <td style="padding:14px 20px;background:#1a1a2e;
                             border-bottom:1px solid #2a2a4a;">
                    <table width="100%">
                      <tr>
                        <td style="color:#94a3b8;font-size:14px;">Budget</td>
                        <td align="right"
                          style="color:#10b981;font-size:14px;font-weight:700;">
                          ₹${order.budget}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Deadline -->
                <tr>
                  <td style="padding:14px 20px;background:#0f0f1a;
                             border-bottom:1px solid #2a2a4a;">
                    <table width="100%">
                      <tr>
                        <td style="color:#94a3b8;font-size:14px;">Deadline</td>
                        <td align="right"
                          style="color:#ffffff;font-size:14px;font-weight:600;">
                          ${order.deadline}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Status -->
                <tr>
                  <td style="padding:14px 20px;background:#1a1a2e;">
                    <table width="100%">
                      <tr>
                        <td style="color:#94a3b8;font-size:14px;">Status</td>
                        <td align="right">
                          <span style="background:#6366f1;color:#ffffff;
                                       font-size:12px;font-weight:700;
                                       padding:4px 16px;border-radius:20px;">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="margin-bottom:28px;">
                <tr>
                  <td style="background:#1e1b4b;border-left:4px solid #6366f1;
                             border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0;color:#c7d2fe;font-size:14px;line-height:1.6;">
                      📋 We will review your order and contact you within
                      <strong style="color:#ffffff;">24 hours</strong>.
                      You can track your order status from your dashboard.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0f0f1a;border-radius:10px;
                             padding:20px;border:1px solid #2a2a4a;">
                    <p style="margin:0 0 12px;color:#e2e8f0;
                               font-size:14px;font-weight:600;">
                      Need Help? Contact Us:
                    </p>
                    <p style="margin:0 0 8px;color:#94a3b8;font-size:14px;">
                      📱 WhatsApp:
                      <a href="https://wa.me/917020521466"
                        style="color:#6366f1;text-decoration:none;font-weight:600;">
                        +91 7020521466
                      </a>
                    </p>
                    <p style="margin:0;color:#94a3b8;font-size:14px;">
                      📧 Email:
                      <a href="mailto:ghagitakshak@gmail.com"
                        style="color:#6366f1;text-decoration:none;font-weight:600;">
                        ghagitakshak@gmail.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
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
</html>
  `;

  return sendEmail({
    to:      email,
    subject: `Order Confirmed — ${order.order_number} | TG Tech Solutions`,
    html
  });
};

// =============================================
// PASSWORD RESET EMAIL
// =============================================
const sendPasswordResetEmail = async (email, name, resetLink) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"
    style="background-color:#0f0f1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#1a1a2e;border-radius:16px;
                 overflow:hidden;border:1px solid #6366f1;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);
                       padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;">
                ⚡ TG Tech Solutions
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">
                Password Reset Request
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;background:#1a1a2e;">
              <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;">
                Hello <strong style="color:#ffffff;">${name}</strong>,
              </p>
              <p style="margin:0 0 28px;color:#94a3b8;font-size:15px;line-height:1.6;">
                You requested to reset your password.
                Click the button below to set a new password.
              </p>

              <!-- Reset Button -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${resetLink}"
                      style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);
                             color:#ffffff;text-decoration:none;padding:14px 36px;
                             border-radius:10px;font-size:16px;font-weight:700;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Warning -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1e1b4b;border-left:4px solid #f97316;
                             border-radius:0 8px 8px 0;padding:14px 18px;">
                    <p style="margin:0;color:#fed7aa;font-size:13px;line-height:1.6;">
                      ⚠️ This link will expire in <strong style="color:#ffffff;">1 hour</strong>.
                      If you did not request this, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
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
</html>
  `;

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