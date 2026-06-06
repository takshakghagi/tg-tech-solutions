import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdPeople, MdShoppingCart, MdBook,
  MdMiscellaneousServices, MdStar, MdAttachMoney,
  MdNotifications, MdLogout, MdClose, MdWeb
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { path: '/admin/dashboard',     label: 'Dashboard',     icon: MdDashboard },
  { path: '/admin/users',         label: 'Users',         icon: MdPeople },
  { path: '/admin/orders',        label: 'Orders',        icon: MdShoppingCart },
  { path: '/admin/notes',         label: 'Notes',         icon: MdBook },
  { path: '/admin/services',      label: 'Services',      icon: MdMiscellaneousServices },
  { path: '/admin/reviews',       label: 'Reviews',       icon: MdStar },
  { path: '/admin/revenue',       label: 'Revenue',       icon: MdAttachMoney },
  { path: '/admin/notifications', label: 'Notifications', icon: MdNotifications },
  { path: '/admin/portfolio',     label: 'Portfolio',     icon: MdWeb },
];

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const isMobile = window.innerWidth < 1024;

  return (
    <div style={{
      width: '256px', height: '100vh',
      background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
      borderRight: '1px solid rgba(99,102,241,0.2)',
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto'
    }}>

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px', borderBottom: '1px solid rgba(99,102,241,0.2)'
      }}>
        <div>
          <h1 style={{
            fontSize: '20px', fontWeight: 800, margin: 0,
            background: 'linear-gradient(135deg,#6366f1,#a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>TG Tech</h1>
          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>Admin Panel</p>
        </div>
        {isMobile && (
          <button onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
            <MdClose size={20} />
          </button>
        )}
      </div>

      {/* Admin Info */}
      <div style={{
        margin: '16px', padding: '14px', borderRadius: '12px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '16px', flexShrink: 0
          }}>
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: 0 }}>{user?.name}</p>
            <p style={{ color: '#818cf8', fontSize: '12px', margin: 0 }}>Administrator</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{ padding: '0 12px', flex: 1 }}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}
            onClick={() => isMobile && setIsOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '12px',
              marginBottom: '4px', textDecoration: 'none',
              fontSize: '14px', fontWeight: 500,
              transition: 'all 0.2s',
              background: isActive ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'transparent',
              color: isActive ? '#fff' : '#9ca3af',
              boxShadow: isActive ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
            })}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(99,102,241,0.15)' }}>
        <button onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '12px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#f87171', fontSize: '14px', fontWeight: 500, width: '100%'
          }}>
          <MdLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}