const sendToUser = (io, userId, event, data) => {
  io.to(`user_${userId}`).emit(event, data);
};

const sendToAdmin = (io, event, data) => {
  io.to('admin_room').emit(event, data);
};

const sendToAll = (io, event, data) => {
  io.emit(event, data);
};

module.exports = { sendToUser, sendToAdmin, sendToAll };