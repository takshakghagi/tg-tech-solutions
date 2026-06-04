import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdEmail, MdLock, MdPerson, MdPhone,
  MdVisibility, MdVisibilityOff
} from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form,    setForm]    = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [step,    setStep]    = useState(1); // 1=form, 2=otp
  const [otp,     setOtp]     = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/verify-otp', {
        email: form.email, otp
      });
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id:    data.data.user?.id,
        email: form.email,
        name:  form.name,
        role:  'user'
      }));
      toast.success('Email verified! Welcome! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at top, #1a1a3e 0%, #0f0f1a 70%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4 shadow-lg shadow-indigo-500/30">
              <span className="text-2xl font-black text-white">TG</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {step === 1 ? 'Create Account' : 'Verify Email'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {step === 1 ? 'Join TG Tech Solutions' : `OTP sent to ${form.email}`}
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                <div className="relative">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
                <div className="relative">
                  <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210"
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
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 6 characters"
                    required
                    minLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                      Password must contain uppercase, lowercase and number (e.g. Test@123)
                  </p>
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>

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
                    Creating account...
                  </div>
                ) : 'Create Account'}
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <motion.a
                href="http://localhost:5000/api/v1/auth/google"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
              >
                <FaGoogle className="text-red-400" size={18} />
                Continue with Google
              </motion.a>
            </form>
          ) : (
            // OTP Step
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <MdEmail className="text-indigo-400" size={32} />
                </div>
                <p className="text-gray-400 text-sm">
                  We sent a 6-digit OTP to<br />
                  <strong className="text-white">{form.email}</strong>
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block text-center">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-indigo-500"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || otp.length !== 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-bg py-3 rounded-xl text-white font-semibold disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </motion.button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-400 text-sm hover:text-white transition-colors"
              >
                ← Back to Register
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}