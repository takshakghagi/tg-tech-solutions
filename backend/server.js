require('dotenv').config();
const app        = require('./app');
const http       = require('http');
const { Server } = require('socket.io');
const logger     = require('./src/utils/logger');
const { connectDB } = require('./src/config/db');

const PORT   = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:      process.env.FRONTEND_URL || 'http://localhost:5173',
    methods:     ['GET', 'POST'],
    credentials: true
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    logger.info(`User ${userId} joined room`);
  });

  socket.on('join_admin', () => {
    socket.join('admin_room');
    logger.info(`Admin joined admin room`);
  });

  socket.on('typing', (data) => {
    socket.to('admin_room').emit('user_typing', data);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Connect DB then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    logger.info(`🚀 TG Tech Solutions API running on port ${PORT}`);
    logger.info(`📍 Environment: ${process.env.NODE_ENV}`);
    logger.info(`🌐 URL: http://localhost:${PORT}`);
    logger.info(`❤️  Health: http://localhost:${PORT}/health`);
  });
}).catch(err => {
  logger.error(`Database connection failed: ${err.message}`);
  process.exit(1);
});

module.exports = { io };