const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware — verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied!' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token!' });
  }
};

// CREATE order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, total_amount, address } = req.body;
    const user_id = req.user.id;

    const [result] = await db.query(
      'INSERT INTO orders (user_id, items, total_amount, address, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, JSON.stringify(items), total_amount, address, 'pending']
    );

    res.json({ message: 'Order placed!', order_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user orders
router.get('/myorders', verifyToken, async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (admin)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT orders.*, users.name, users.email FROM orders JOIN users ON orders.user_id = users.id ORDER BY orders.created_at DESC'
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;