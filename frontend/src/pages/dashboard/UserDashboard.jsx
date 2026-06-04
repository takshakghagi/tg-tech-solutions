import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdShoppingCart, MdDownload, MdPerson,
  MdArrowForward, MdCheckCircle, MdPending
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const STATUS_COLORS = {
  pending:     'bg-yellow-500/20 text-yellow-400',
  confirmed:   'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-purple-500/20 text-purple-400',
  completed:   'bg-green-500/20 text-green-400',
  cancelled:   'bg-red-500/20 text-red-400',
};

export default function UserDashboard() {
  const { user }          = useAuth();
  const [orders,  setOrders]  = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/user/orders?limit=5'),
      API.get('/user/downloads')
    ]).then(([ordersRes, downloadsRes]) => {
      setOrders(ordersRes.data.data || []);
      setDownloads(downloadsRes.data.data.downloads || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Orders',    value: orders.length,    icon: MdShoppingCart, color: '#6366f1', link: '/dashboard/orders' },
    { label: 'Downloads',       value: downloads.length, icon: MdDownload,     color: '#10b981', link: '/dashboard/downloads' },
    { label: 'Completed',       value: orders.filter(o => o.status === 'completed').length, icon: MdCheckCircle, color: '#f59e0b', link: '/dashboard/orders' },
    { label: 'Pending',         value: orders.filter(o => o.status === 'pending').length,   icon: MdPending,     color: '#8b5cf6', link: '/dashboard/orders' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-400 text-sm">Here's your activity overview</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={stat.link}>
              <div className="glass rounded-2xl p-5 card-hover">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${stat.color}20` }}>
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="p-5 flex items-center justify-between border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link to="/dashboard/orders" className="flex items-center gap-1 text-indigo-400 text-sm hover:text-indigo-300">
            View All <MdArrowForward size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <MdShoppingCart size={40} className="mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400">No orders yet!</p>
            <Link to="/services" className="text-indigo-400 text-sm mt-2 inline-block hover:text-indigo-300">
              Browse Services →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.slice(0, 5).map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center justify-between hover:bg-white/3 transition-colors"
              >
                <div>
                  <p className="text-white text-sm font-medium">{order.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {order.order_number} • {order.service_name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm font-semibold">₹{order.budget}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {order.status?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: 'Place New Order', link: '/order',   color: '#6366f1', icon: MdShoppingCart },
          { label: 'Browse Notes',    link: '/notes',   color: '#10b981', icon: MdDownload     },
          { label: 'Edit Profile',    link: '/dashboard/profile', color: '#f59e0b', icon: MdPerson },
        ].map((action, i) => (
          <Link key={i} to={action.link}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl p-4 flex items-center gap-3 card-hover"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${action.color}20` }}>
                <action.icon size={20} style={{ color: action.color }} />
              </div>
              <span className="text-white text-sm font-medium">{action.label}</span>
              <MdArrowForward className="ml-auto text-gray-500" size={16} />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}