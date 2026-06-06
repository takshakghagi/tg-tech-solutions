import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar  from './AdminNavbar';
import { useAuth }  from '../../context/AuthContext';

export default function AdminLayout() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [winW,     setWinW]     = useState(window.innerWidth);
  const { user, loading }       = useAuth();

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = winW < 1024;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0f0f1a'
      }}>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100%',
      overflow: 'hidden', background: '#0f0f1a',
      position: 'relative'
    }}>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)', zIndex: 40
          }}
        />
      )}

      {/* Sidebar — always visible on desktop */}
      <div style={{
        position: isMobile ? 'fixed' : 'relative',
        left: isMobile ? (isOpen ? '0' : '-280px') : '0',
        top: 0, bottom: 0,
        width: '256px', minWidth: '256px',
        height: '100vh', overflowY: 'auto',
        flexShrink: 0, zIndex: 50,
        transition: 'left 0.3s ease'
      }}>
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main Area */}
      <div style={{
        flex: '1 1 0%', display: 'flex',
        flexDirection: 'column', overflow: 'hidden',
        height: '100vh'
      }}>
        <AdminNavbar setIsOpen={setIsOpen} />
        <main style={{
          flex: 1, overflowY: 'auto',
          padding: isMobile ? '16px' : '24px'
        }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}