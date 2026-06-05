const express       = require('express');
const cors          = require('cors');
const helmet        = require('helmet');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const compression   = require('compression');
const passport      = require('./src/config/passport');
const { generalLimiter } = require('./src/middleware/rateLimiter');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const logger        = require('./src/utils/logger');

// Routes
const authRoutes          = require('./src/routes/authRoutes');
const userRoutes          = require('./src/routes/userRoutes');
const orderRoutes         = require('./src/routes/orderRoutes');
const notesRoutes         = require('./src/routes/notesRoutes');
const serviceRoutes       = require('./src/routes/serviceRoutes');
const adminRoutes         = require('./src/routes/adminRoutes');
const notificationRoutes  = require('./src/routes/notificationRoutes');
const reviewRoutes        = require('./src/routes/reviewRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();

// ============================================================
// SECURITY MIDDLEWARE
// ============================================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tg-tech-solutions-m5gy.vercel.app',
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(generalLimiter);

// ============================================================
// GENERAL MIDDLEWARE
// ============================================================
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(passport.initialize());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/health', (req, res) => {
  res.json({
    status:  'OK',
    service: 'TG Tech Solutions API',
    version: '1.0.0',
    time:    new Date().toISOString()
  });
});

// ============================================================
// API ROUTES
// ============================================================
const API = '/api/v1';

app.use(`${API}/auth`,          authRoutes);
app.use(`${API}/user`,          userRoutes);
app.use(`${API}/orders`,        orderRoutes);
app.use(`${API}/notes`,         notesRoutes);
app.use(`${API}/services`,      serviceRoutes);
app.use(`${API}/admin`,         adminRoutes);
app.use(`${API}/notifications`, notificationRoutes);
app.use(`${API}/reviews`,       reviewRoutes);
app.use('/api/v1/payments', paymentRoutes);


app.use('/uploads', express.static('uploads'));
const uploadRoutes = require('./src/routes/uploadRoutes');
app.use('/api/v1/upload', uploadRoutes);

// ============================================================
// ERROR HANDLING
// ============================================================
app.use(notFound);
app.use(errorHandler);

module.exports = app;