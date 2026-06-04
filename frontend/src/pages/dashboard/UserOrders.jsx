import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdShoppingCart, MdSearch } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  pending:     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  review:      'bg-orange-500/20 text-orange-400 border-orange-500/30',
  completed:   'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled:   'bg-red-500/20 text-red-400 border-red-500/30',
};

const STATUS_STEPS = ['pending', 'confirmed', 'in_progress', 'review', 'completed'];

export default function UserOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    API.get('/user/orders')
      .then(r => setOrders(r.data.data || []))
      .catch(() => toast.error('Failed to load orders!'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o =>
    o.order_number?.toLowerCase().includes(search.toLowerCase()) ||
    o.title?.toLowerCase().includes(search.toLowerCase())
  );

  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Orders</h1>
          <p className="text-gray-400 text-sm">Track all your orders</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <MdSearch className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-36"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <MdShoppingCart size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No orders found!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-5 cursor-pointer hover:bg-white/3 transition-colors"
                onClick={() => setSelected(selected === order.id ? null : order.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-indigo-400 font-mono text-sm mb-1">{order.order_number}</p>
                    <h3 className="text-white font-semibold">{order.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{order.service_name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-green-400 font-bold text-lg">₹{order.budget}</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                      {order.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Detail */}
              {selected === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-white/5 p-5"
                >
                  {/* Progress Bar */}
                  {order.status !== 'cancelled' && (
                    <div className="mb-6">
                      <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">Order Progress</p>
                      <div className="flex items-center gap-0">
                        {STATUS_STEPS.map((step, idx) => (
                          <div key={step} className="flex items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              idx <= getStepIndex(order.status)
                                ? 'gradient-bg text-white'
                                : 'bg-white/10 text-gray-500'
                            }`}>
                              {idx + 1}
                            </div>
                            {idx < STATUS_STEPS.length - 1 && (
                              <div className={`flex-1 h-1 ${
                                idx < getStepIndex(order.status)
                                  ? 'bg-indigo-500'
                                  : 'bg-white/10'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        {STATUS_STEPS.map(step => (
                          <span key={step} className="text-xs text-gray-500 capitalize">
                            {step.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Deadline</p>
                      <p className="text-white font-medium">
                        {new Date(order.deadline).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Priority</p>
                      <p className="text-white font-medium capitalize">{order.priority}</p>
                    </div>
                  </div>

                  {order.admin_note && (
                    <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <p className="text-xs text-indigo-400 mb-1">Admin Note:</p>
                      <p className="text-gray-300 text-sm">{order.admin_note}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}