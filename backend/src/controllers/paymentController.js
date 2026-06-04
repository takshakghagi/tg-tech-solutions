const Razorpay    = require('razorpay');
const crypto      = require('crypto');
const { pool }    = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id:     process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

const createOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return ApiResponse.error(res, 'Payment system not configured!');
    }

    const { amount, currency = 'INR', notes = {} } = req.body;

    if (!amount || amount < 1) {
      return ApiResponse.badRequest(res, 'Invalid amount');
    }

    const options = {
      amount:  Math.round(parseFloat(amount) * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
      notes
    };

    const order = await razorpay.orders.create(options);

    await pool.query(
      `INSERT INTO payments
       (user_id, razorpay_order_id, amount, currency, status, notes)
       VALUES (?, ?, ?, ?, 'created', ?)`,
      [req.user.id, order.id, amount, currency, JSON.stringify(notes)]
    );

    return ApiResponse.success(res, {
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
      key_id:   process.env.RAZORPAY_KEY_ID
    }, 'Order created');

  } catch (error) {
    console.error('createOrder error:', error.message);
    return ApiResponse.error(res, error.message);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      note_id,
      order_id
    } = req.body;

    const body     = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return ApiResponse.badRequest(res, 'Invalid payment signature');
    }

    await pool.query(
      `UPDATE payments SET
        razorpay_payment_id = ?,
        razorpay_signature  = ?,
        status              = 'paid',
        paid_at             = NOW()
       WHERE razorpay_order_id = ?`,
      [razorpay_payment_id, razorpay_signature, razorpay_order_id]
    );

    let download_url = null;

    if (note_id) {
      await pool.query(
        `INSERT INTO user_downloads (user_id, note_id, payment_id)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE payment_id = ?`,
        [req.user.id, note_id, razorpay_payment_id, razorpay_payment_id]
      );

      const [notes] = await pool.query(
        'SELECT file_url FROM notes WHERE id = ?', [note_id]
      );

      if (notes.length > 0) {
        download_url = notes[0].file_url;
      }
    }

    if (order_id) {
      await pool.query(
        `UPDATE orders SET payment_status = 'paid', payment_id = ?
         WHERE id = ?`,
        [razorpay_payment_id, order_id]
      );
    }

    // Socket notification
    try {
      const io = req.app.get('io');
      if (io) {
        const { sendToAdmin } = require('../utils/socket');
        sendToAdmin(io, 'payment_confirmed', {
          payment_id: razorpay_payment_id,
          amount:     req.body.amount
        });
      }
    } catch (socketErr) {
      console.log('Socket error:', socketErr.message);
    }

    return ApiResponse.success(res, {
      payment_id:   razorpay_payment_id,
      status:       'paid',
      download_url,
      order_id:     razorpay_order_id
    }, 'Payment verified');

  } catch (error) {
    console.error('verifyPayment error:', error.message);
    return ApiResponse.error(res, error.message);
  }
};

const getInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const [payments] = await pool.query(
      `SELECT p.*, u.name, u.email, u.phone
       FROM payments p
       JOIN users u ON p.user_id = u.id
       WHERE p.razorpay_order_id = ?
       AND p.user_id = ?`,
      [orderId, req.user.id]
    );

    if (!payments.length) {
      return ApiResponse.notFound(res, 'Invoice not found');
    }

    const payment = payments[0];
    const notes   = payment.notes ? JSON.parse(payment.notes) : {};

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice — TG Tech Solutions</title>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family:Arial,sans-serif; padding:40px; color:#333; }
          .header { text-align:center; margin-bottom:40px; padding-bottom:20px; border-bottom:3px solid #6366f1; }
          .logo { font-size:28px; font-weight:900; color:#6366f1; }
          .logo-sub { color:#666; font-size:14px; margin-top:4px; }
          .invoice-title { font-size:22px; font-weight:700; margin-top:16px; }
          .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:24px 0; }
          .info-box { background:#f8f8ff; border-radius:8px; padding:16px; }
          .info-label { font-size:11px; color:#999; text-transform:uppercase; margin-bottom:4px; }
          .info-value { font-size:14px; font-weight:600; }
          table { width:100%; border-collapse:collapse; margin:16px 0; }
          th { background:#6366f1; color:#fff; padding:12px 16px; text-align:left; }
          td { padding:12px 16px; border-bottom:1px solid #eee; }
          .total td { font-weight:700; font-size:16px; background:#f0f0ff; }
          .status { display:inline-block; padding:4px 16px; background:#10b981; color:#fff; border-radius:100px; font-size:12px; }
          .footer { text-align:center; margin-top:40px; color:#999; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">TG Tech Solutions</div>
          <div class="logo-sub">Nagpur, Maharashtra | ghagitakshak@gmail.com | +91 7020521466</div>
          <div class="invoice-title">Payment Invoice</div>
        </div>
        <div class="info-grid">
          <div class="info-box">
            <div class="info-label">Bill To</div>
            <div class="info-value">${payment.name}</div>
            <div class="info-label" style="margin-top:8px">Email</div>
            <div class="info-value">${payment.email}</div>
          </div>
          <div class="info-box">
            <div class="info-label">Invoice Date</div>
            <div class="info-value">${new Date(payment.paid_at || payment.created_at).toLocaleDateString('en-IN')}</div>
            <div class="info-label" style="margin-top:8px">Status</div>
            <div class="info-value"><span class="status">PAID</span></div>
          </div>
        </div>
        <table>
          <thead><tr><th>#</th><th>Description</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>${notes.description || 'IT Service'}</td><td>₹${payment.amount}</td></tr>
            <tr class="total"><td colspan="2">Total</td><td>₹${payment.amount}</td></tr>
          </tbody>
        </table>
        <div class="footer">
          <p>Thank you for choosing TG Tech Solutions!</p>
          <p>Payment ID: ${payment.razorpay_payment_id || 'N/A'}</p>
        </div>
      </body>
      </html>
    `;

    return ApiResponse.success(res, {
      ...payment,
      invoice_html: invoiceHtml
    }, 'Invoice fetched');

  } catch (error) {
    return ApiResponse.error(res, error.message);
  }
};

module.exports = { createOrder, verifyPayment, getInvoice };