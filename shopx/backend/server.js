const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

process.env.JWT_SECRET = 'shopx_secret_key_2026';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ShopX API Running! 🚀' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ ShopX Server running on port ${PORT}`);
});
