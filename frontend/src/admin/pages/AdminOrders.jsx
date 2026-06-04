import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSearch, MdEdit, MdClose } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending','confirmed','in_progress','review','completed','cancelled'];
const STATUS_COLORS  = {
  pending:     'bg-yellow-500/20 text-yellow-400',
  confirmed:   'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-purple-500/20 text-purple-400',
  review:      'bg-orange-500/20 text-orange-400',
  completed:   'bg-green-500/20 text-green-400',
  cancelled:   'bg-red-500/20 text-red-400',
};

export default function AdminOrders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('');
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);
  const [modal,   setModal]   = useState(null);
  const [form,    setForm]    = useState({ status: '', admin_note: '' });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(
        `/admin/orders?page=${page}&limit=10&status=${filter}&search=${search}`
      );
      setOrders(data.data);
      setTotal(data.pagination.total);
    } catch {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page, filter, search]);

  const openModal = (order) => {
    setModal(order);
    setForm({ status: order.status, admin_note: order.admin_note || '' });
  };

  const updateOrder = async () => {
    try {
      await API.put(`/admin/orders/${modal.id}/status`, form);
      toast.success('Order updated!');
      setModal(null);
      fetchOrders();
    } catch {
      toast.error('Failed to update order!');
    }
  };

  return (
    <div className="w-full space-y-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-gray-400 text-sm">Total {total} orders</p>
        </div>
        <div className="flex flex-wrap gap-2">
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
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="glass rounded-xl px-4 py-2 text-sm text-gray-300 outline-none border border-white/10"
            style={{ background: '#1a1a2e' }}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>
                {s.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                {['Order #', 'Title', 'User', 'Service', 'Budget', 'Deadline', 'Status', 'Action'].map(h => (
                  <th key={h} className="py-3 px-3 text-left text-xs font-semibold text-gray-400 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : orders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors align-middle"
                >
                  <td className="py-2 px-3 text-indigo-400 font-mono text-sm">{order.order_number}</td>
                  <td className="py-2 px-3">
                    <p className="text-white text-sm truncate max-w-[140px]">{order.title}</p>
                  </td>
                  <td className="py-2 px-3 text-gray-300 text-sm">{order.user_name}</td>
                  <td className="py-2 px-3 text-gray-300 text-sm">{order.service_name}</td>
                  <td className="py-2 px-3 text-green-400 font-semibold text-sm">₹{order.budget}</td>
                  <td className="py-2 px-3 text-gray-400 text-sm">
                    {new Date(order.deadline).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-2 px-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                      {order.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => openModal(order)}
                      className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all"
                    >
                      <MdEdit size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-white/5">
          <p className="text-gray-400 text-sm">Showing {orders.length} of {total}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg glass text-sm text-gray-300 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm text-white">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={orders.length < 10}
              className="px-3 py-1.5 rounded-lg glass text-sm text-gray-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-2xl p-6 w-full max-w-md"
              style={{ background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Update Order</h3>
                <button onClick={() => setModal(null)} className="text-gray-400 hover:text-white">
                  <MdClose size={22} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-indigo-400 font-mono text-sm mb-1">{modal.order_number}</p>
                  <p className="text-gray-300 text-sm">{modal.title}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-white outline-none border border-white/10"
                    style={{ background: '#0f0f1a' }}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ').toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Admin Note</label>
                  <textarea
                    value={form.admin_note}
                    onChange={e => setForm({ ...form, admin_note: e.target.value })}
                    placeholder="Note for customer..."
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none border border-white/10 resize-none"
                    style={{ background: '#0f0f1a' }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModal(null)}
                    className="flex-1 py-3 rounded-xl glass text-gray-300 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateOrder}
                    className="flex-1 py-3 rounded-xl gradient-bg text-white font-semibold"
                  >
                    Update Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}