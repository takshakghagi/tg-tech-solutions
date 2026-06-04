import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdBlock, MdCheckCircle, MdPeople } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/admin/users?page=${page}&limit=10&search=${search}`);
      setUsers(data.data);
      setTotal(data.pagination.total);
    } catch {
      toast.error('Failed to load users!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [page, search]);

  const toggleStatus = async (id) => {
    try {
      await API.put(`/admin/users/${id}/toggle`);
      toast.success('User status updated!');
      fetchUsers();
    } catch {
      toast.error('Failed to update user!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 text-sm">Total {total} users registered</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <MdSearch className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-48"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Email', 'Phone', 'Role', 'Verified', 'Status', 'Joined', 'Action'].map(h => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase">
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
              ) : users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0)}
                      </div>
                      <span className="text-white text-sm font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-gray-300 text-sm">{user.phone || '—'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {user.is_verified
                      ? <MdCheckCircle className="text-green-400" size={18} />
                      : <MdBlock className="text-red-400" size={18} />
                    }
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.is_active ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {new Date(user.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                        user.is_active
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                      }`}
                    >
                      {user.is_active ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-white/5">
          <p className="text-gray-400 text-sm">
            Showing {users.length} of {total} users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg glass text-sm text-gray-300 disabled:opacity-40 hover:text-white transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm text-white">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={users.length < 10}
              className="px-3 py-1.5 rounded-lg glass text-sm text-gray-300 disabled:opacity-40 hover:text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}