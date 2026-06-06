import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdPeople, MdShoppingCart, MdBook,
  MdMiscellaneousServices, MdStar, MdAttachMoney,
  MdNotifications, MdLogout, MdClose, MdWeb
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const menuItems = [
  { path: '/admin/dashboard',     label: 'Dashboard',     icon: MdDashboard },
  { path: '/admin/users',         label: 'Users',         icon: MdPeople },
  { path: '/admin/orders',        label: 'Orders',        icon: MdShoppingCart },
  { path: '/admin/notes',         label: 'Notes',         icon: MdBook },
  { path: '/admin/services',      label: 'Services',      icon: MdMiscellaneousServices },
  { path: '/admin/reviews',       label: 'Reviews',       icon: MdStar },
  { path: '/admin/revenue',       label: 'Revenue',       icon: MdAttachMoney },
  { path: '/admin/notifications', label: 'Notifications', icon: MdNotifications },
  { path: '/admin/portfolio',     label: 'Portfolio',     icon: MdWeb },  // ✅ NEW
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className="fixed left-0 top-0 h-full w-64 z-50 lg:translate-x-0 lg:static lg:z-auto"
        style={{
          background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
          borderRight: '1px solid rgba(99,102,241,0.2)'
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
          <div>
            <h1 className="text-xl font-bold gradient-text">TG Tech</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <MdClose size={20} />
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-4 m-4 rounded-xl glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-indigo-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-4 mt-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                  isActive
                    ? 'gradient-bg text-white shadow-lg shadow-indigo-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-500/20">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
          >
            <MdLogout size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}