import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdLock, MdSave } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function UserSettings() {
  const [form,    setForm]    = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }
    setLoading(true);
    try {
      await API.put('/user/change-password', {
        currentPassword: form.currentPassword,
        newPassword:     form.newPassword
      });
      toast.success('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your account settings</p>
      </div>

      {/* Change Password */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
          <MdLock className="text-indigo-400" size={22} />
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {[
            { label: 'Current Password', key: 'currentPassword', placeholder: '••••••••' },
            { label: 'New Password',     key: 'newPassword',     placeholder: 'Min 6 characters' },
            { label: 'Confirm Password', key: 'confirmPassword', placeholder: 'Re-enter password' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-sm text-gray-400 mb-2 block">{label}</label>
              <input
                type="password"
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 gradient-bg py-3 rounded-xl text-white font-semibold disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <MdSave size={18} />
                Update Password
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Account Info */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Account Type</span>
            <span className="text-white">Standard User</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email Verified</span>
            <span className="text-green-400">✓ Verified</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Support</span>
            <a href="https://wa.me/917020521466" target="_blank"
              className="text-indigo-400 hover:text-indigo-300">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}