import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MdNotifications, MdDoneAll, MdShoppingCart,
  MdPayment, MdDownload, MdStar, MdInfo
} from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

const typeIcons = {
  order_update:    { icon: MdShoppingCart, color: '#6366f1', bg: 'bg-indigo-500/20' },
  payment_success: { icon: MdPayment,      color: '#10b981', bg: 'bg-green-500/20'  },
  payment_failed:  { icon: MdPayment,      color: '#ef4444', bg: 'bg-red-500/20'    },
  download_ready:  { icon: MdDownload,     color: '#f59e0b', bg: 'bg-yellow-500/20' },
  review_approved: { icon: MdStar,         color: '#f59e0b', bg: 'bg-yellow-500/20' },
  system:          { icon: MdInfo,         color: '#8b5cf6', bg: 'bg-purple-500/20' },
  promotion:       { icon: MdInfo,         color: '#06b6d4', bg: 'bg-cyan-500/20'   },
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unread,        setUnread]        = useState(0);
  const [loading,       setLoading]       = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/notifications');
      setNotifications(data.data.notifications || []);
      setUnread(data.data.unread_count || 0);
    } catch {
      toast.error('Failed to load notifications!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markAllRead = async () => {
    try {
      await API.put('/notifications/mark-all-read');
      toast.success('All notifications marked as read!');
      fetchNotifications();
    } catch {
      toast.error('Failed!');
    }
  };

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 text-sm">
            {unread} unread notifications
          </p>
        </div>
        {unread > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium"
          >
            <MdDoneAll size={18} />
            Mark All Read
          </motion.button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="glass rounded-2xl h-20 animate-pulse" />
          ))
        ) : notifications.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <MdNotifications size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400">No notifications yet!</p>
          </div>
        ) : (
          notifications.map((notif, i) => {
            const typeInfo = typeIcons[notif.type] || typeIcons.system;
            const Icon     = typeInfo.icon;

            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => !notif.is_read && markRead(notif.id)}
                className={`glass rounded-2xl p-4 cursor-pointer transition-all hover:bg-white/5 ${
                  !notif.is_read ? 'border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl ${typeInfo.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} style={{ color: typeInfo.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${
                        notif.is_read ? 'text-gray-300' : 'text-white'
                      }`}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notif.is_read && (
                          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(notif.created_at).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}