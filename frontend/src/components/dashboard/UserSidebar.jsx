import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdShoppingCart, MdDownload,
  MdPerson, MdNotifications, MdSettings,
  MdLogout, MdClose, MdFavorite
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { path: '/dashboard',              label: 'Dashboard',      icon: MdDashboard     },
  { path: '/dashboard/orders',       label: 'My Orders',      icon: MdShoppingCart  },
  { path: '/dashboard/downloads',    label: 'Downloads',      icon: MdDownload      },
  { path: '/dashboard/profile',      label: 'Profile',        icon: MdPerson        },
  { path: '/dashboard/notifications',label: 'Notifications',  icon: MdNotifications },
  { path: '/dashboard/settings',     label: 'Settings',       icon: MdSettings      },
];

export default function UserSidebar({ isOpen, setIsOpen }) {
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
      <aside
        style={{
          width:      '256px',
          minWidth:   '256px',
          height:     '100vh',
          background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
          borderRight:'1px solid rgba(99,102,241,0.2)',
          display:    'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-indigo-500/20">
          <div>
            <h1 className="text-xl font-bold gradient-text">TG Tech</h1>
            <p className="text-xs text-gray-400">User Dashboard</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 m-4 rounded-xl glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-indigo-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
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
      </aside>
    </>
  );
}