const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const [product] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );
    res.json(product[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add product
router.post('/', async (req, res) => {
  try {
    const { name, price, category, description, image, stock } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, price, category, description, image, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, category, description, image, stock]
    );
    res.json({ message: 'Product added!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;