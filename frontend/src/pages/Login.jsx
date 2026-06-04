import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdEmail, MdLock, MdVisibility,
  MdVisibilityOff, MdError
} from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const { login } = useAuth();
  const navigate  = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}! 👋`);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password!';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a3e 0%, #0f0f1a 70%)', zIndex: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
        style={{ zIndex: 10 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4 shadow-lg shadow-indigo-500/30"
            >
              <span className="text-2xl font-black text-white">TG</span>
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error Message Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)'
                }}
              >
                <MdError style={{ color: '#f87171', flexShrink: 0 }} size={18} />
                <span style={{ color: '#f87171', fontSize: '14px' }}>{error}</span>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setError(''); }}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setError(''); }}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-indigo-400 text-sm hover:text-indigo-300">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-bg py-3 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : 'Sign In'}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google */}
            <motion.a
              href="http://localhost:5000/api/v1/auth/google"
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
            >
              <FaGoogle className="text-red-400" size={18} />
              Continue with Google
            </motion.a>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}