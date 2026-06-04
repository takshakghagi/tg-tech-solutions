import { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { MdMenu, MdNotifications, MdHome } from 'react-icons/md';
import UserSidebar from './UserSidebar';
import { useAuth } from '../../context/AuthContext';

export default function UserLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading }   = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f0f1a' }}>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{
      display:   'flex',
      height:    '100vh',
      width:     '100%',
      overflow:  'hidden',
      background:'#0f0f1a'
    }}>
      {/* Sidebar */}
      <div className="hidden lg:flex" style={{ flexShrink: 0 }}>
        <UserSidebar isOpen={true} setIsOpen={setIsOpen} />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <UserSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', height:'100vh' }}>
        {/* Navbar */}
        <header style={{
          height:     '64px',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:    '0 24px',
          background: 'rgba(15,15,26,0.95)',
          borderBottom: '1px solid rgba(99,102,241,0.2)',
          flexShrink: 0
        }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
              <MdMenu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <MdHome size={18} />
              Home
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/notifications" className="relative text-gray-400 hover:text-white">
              <MdNotifications size={22} />
            </Link>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto', padding:'24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}