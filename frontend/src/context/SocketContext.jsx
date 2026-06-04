import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket,    setSocket]    = useState(null);
  const [connected, setConnected] = useState(false);
  const { user }                  = useAuth();

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000',
      {
        withCredentials: true,
        transports:      ['websocket', 'polling']
      }
    );

    newSocket.on('connect', () => {
      setConnected(true);
      if (user?.id)           newSocket.emit('join', user.id);
      if (user?.role === 'admin') newSocket.emit('join_admin');
    });

    newSocket.on('disconnect', () => setConnected(false));

    // Order confirmed
    newSocket.on('order_confirmed', (data) => {
      toast.success(data.message || 'Order confirmed! 🎉', {
        duration: 5000, icon: '📋'
      });
    });

    // New order (Admin)
    newSocket.on('new_order', (data) => {
      if (user?.role === 'admin') {
        toast.success(`New Order from ${data.user_name}! 🔔`, {
          duration: 8000, icon: '🛍️'
        });
      }
    });

    // Order status update
    newSocket.on('order_status_update', (data) => {
      toast.success(`Order #${data.order_id} — ${data.status}! 📦`, {
        duration: 5000, icon: '✅'
      });
    });

    // Payment confirmed
    newSocket.on('payment_confirmed', () => {
      toast.success('Payment received! Thank you! 💰', {
        duration: 5000, icon: '💳'
      });
    });

    // New notification
    newSocket.on('new_notification', (data) => {
      toast(data.message, { duration: 4000, icon: '🔔' });
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);