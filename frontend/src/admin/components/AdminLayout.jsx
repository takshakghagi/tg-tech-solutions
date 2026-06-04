import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar  from './AdminNavbar';
import { useAuth }  from '../../context/AuthContext';

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading }   = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     '#0f0f1a'
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
      display:   'flex',
      height:    '100vh',
      width:     '100%',
      overflow:  'hidden',
      background:'#0f0f1a'
    }}>

      {/* Sidebar — Fixed 256px */}
      <div style={{
        width:     '256px',
        minWidth:  '256px',
        height:    '100vh',
        overflowY: 'auto',
        flexShrink: 0
      }}>
        <AdminSidebar isOpen={true} setIsOpen={setIsOpen} />
      </div>

      {/* Main Area */}
      <div style={{
        flex:          '1 1 0%',
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        height:        '100vh',
        width:         '0'
      }}>
        <AdminNavbar setIsOpen={setIsOpen} />
        <main style={{
          flex:      1,
          overflowY: 'auto',
          padding:   '24px'
        }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}