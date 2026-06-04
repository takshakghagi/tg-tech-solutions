import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdPhone, MdLocationCity, MdEdit, MdSave } from 'react-icons/md';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const { user }          = useAuth();
  const [form,    setForm]    = useState({
    name: '', phone: '', city: '', bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    API.get('/user/profile').then(r => {
      const u = r.data.data.user;
      setForm({
        name:  u.name  || '',
        phone: u.phone || '',
        city:  u.city  || '',
        bio:   u.bio   || ''
      });
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await API.put('/user/profile', form);
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Failed to update profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 text-sm">Manage your personal information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => editing ? handleSave() : setEditing(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium"
        >
          {editing ? <MdSave size={18} /> : <MdEdit size={18} />}
          {editing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      {/* Avatar */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
            {form.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{form.name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full mt-1 inline-block">
              {user?.role === 'admin' ? 'Administrator' : 'User'}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="glass rounded-2xl p-6 space-y-5">
        {[
          { label: 'Full Name',  key: 'name',  icon: MdPerson,       type: 'text',  placeholder: 'Your full name' },
          { label: 'Phone',      key: 'phone', icon: MdPhone,        type: 'tel',   placeholder: '+91 9876543210' },
          { label: 'City',       key: 'city',  icon: MdLocationCity, type: 'text',  placeholder: 'Your city' },
        ].map(({ label, key, icon: Icon, type, placeholder }) => (
          <div key={key}>
            <label className="text-sm text-gray-400 mb-2 block">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type={type}
                value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                disabled={!editing}
                placeholder={placeholder}
                className={`w-full rounded-xl px-10 py-3 text-white placeholder-gray-500 outline-none border transition-colors ${
                  editing
                    ? 'bg-white/5 border-white/20 focus:border-indigo-500'
                    : 'bg-white/3 border-white/5 cursor-not-allowed opacity-70'
                }`}
              />
            </div>
          </div>
        ))}

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            disabled={!editing}
            placeholder="Tell us about yourself..."
            rows={3}
            className={`w-full rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none border resize-none transition-colors ${
              editing
                ? 'bg-white/5 border-white/20 focus:border-indigo-500'
                : 'bg-white/3 border-white/5 cursor-not-allowed opacity-70'
            }`}
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full rounded-xl px-10 py-3 text-gray-400 bg-white/3 border border-white/5 cursor-not-allowed opacity-70 outline-none"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>
      </div>
    </div>
  );
}