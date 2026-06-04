import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  MdPeople, MdShoppingCart, MdAttachMoney,
  MdTrendingUp, MdPendingActions, MdCheckCircle
} from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { useSocket } from '../../context/SocketContext';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-6 card-hover"
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
        {subtitle}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-400 text-sm">{title}</p>
  </motion.div>
);

const OrderRow = ({ order, index }) => {
  const statusColors = {
    pending:     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
    in_progress: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    completed:   'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled:   'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 hover:bg-white/3 transition-colors"
    >
      <td className="py-3 px-4">
        <span className="text-indigo-400 font-mono text-sm">{order.order_number}</span>
      </td>
      <td className="py-3 px-4">
        <p className="text-white text-sm font-medium truncate max-w-[180px]">{order.title}</p>
        <p className="text-gray-400 text-xs">{order.user_name}</p>
      </td>
      <td className="py-3 px-4 text-gray-300 text-sm">{order.service_name}</td>
      <td className="py-3 px-4">
        <span className="text-green-400 font-semibold">₹{order.budget}</span>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-500/20 text-gray-400'}`}>
          {order.status?.replace('_', ' ').toUpperCase()}
        </span>
      </td>
    </motion.tr>
  );
};

export default function AdminDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const { socket }            = useSocket();

  const fetchStats = () => {
    API.get('/admin/dashboard')
      .then(r => setData(r.data.data))
      .catch(() => toast.error('Failed to load dashboard!'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ===== Socket.io Real-time =====
  useEffect(() => {
    if (!socket) return;

    socket.on('new_order', (data) => {
      fetchStats();
      toast.success(`New order from ${data.user_name}! 🎉`, {
        duration: 6000,
        icon: '🛍️'
      });
    });

    socket.on('payment_confirmed', () => {
      fetchStats();
      toast.success('Payment received! 💰', {
        duration: 4000,
        icon: '💳'
      });
    });

    return () => {
      socket.off('new_order');
      socket.off('payment_confirmed');
    };
  }, [socket]);
  // ===== End Socket =====

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      title:    'Total Users',
      value:    data?.users?.total || 0,
      icon:     MdPeople,
      color:    '#6366f1',
      subtitle: `+${data?.users?.new_month || 0} this month`
    },
    {
      title:    'Total Orders',
      value:    data?.orders?.total || 0,
      icon:     MdShoppingCart,
      color:    '#8b5cf6',
      subtitle: `${data?.orders?.pending || 0} pending`
    },
    {
      title:    'Total Revenue',
      value:    `₹${parseFloat(data?.total_revenue || 0).toLocaleString()}`,
      icon:     MdAttachMoney,
      color:    '#10b981',
      subtitle: `₹${parseFloat(data?.month_revenue || 0).toLocaleString()} this month`
    },
    {
      title:    'Completed Orders',
      value:    data?.orders?.completed || 0,
      icon:     MdCheckCircle,
      color:    '#f59e0b',
      subtitle: `${data?.orders?.in_progress || 0} in progress`
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} transition={{ delay: i * 0.1 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
          {data?.revenue_chart?.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data.revenue_chart}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid #6366f1', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MdTrendingUp size={40} className="mx-auto mb-2 opacity-30" />
                <p>No revenue data yet</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Orders Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Pending',     value: data?.orders?.pending     || 0 },
              { name: 'In Progress', value: data?.orders?.in_progress || 0 },
              { name: 'Completed',   value: data?.orders?.completed   || 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #6366f1', borderRadius: 8 }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Order #', 'Title', 'Service', 'Budget', 'Status'].map(h => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.recent_orders?.map((order, i) => (
                <OrderRow key={order.order_number} order={order} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}