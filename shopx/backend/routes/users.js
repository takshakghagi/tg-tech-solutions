const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.json({ message: 'User registered!', id: result.insertId });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found!' });
    }

    const validPassword = await bcrypt.compare(password, users[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password!' });
    }

    // Simple token without JWT
    const token = Buffer.from(users[0].id + ':' + users[0].email + ':shopx_secret_key_2026').toString('base64');

    res.json({
      message: 'Login successful!',
      token: token,
      user: {
        id: users[0].id,
        name: users[0].name,
        email: users[0].email
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
