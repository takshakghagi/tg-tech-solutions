import { MdMenu, MdNotifications, MdSearch } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

export default function AdminNavbar({ setIsOpen }) {
  const { user }                        = useAuth();
  const [unread,    setUnread]          = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [search,    setSearch]          = useState('');
  const dropdownRef                     = useRef(null);
  const navigate                        = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get('/notifications');
      setUnread(data.data.unread_count || 0);
      setNotifications(data.data.notifications?.slice(0, 5) || []);
    } catch {}
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/admin/orders?search=${search}`);
      setSearch('');
    }
  };

  return (
    <header
       className="h-16 flex items-center justify-between px-6 border-b border-indigo-500/20 relative"
       style={{ background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <MdMenu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2 glass rounded-lg px-3 py-2 w-64">
          <MdSearch className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search orders... (Press Enter)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative text-gray-400 hover:text-white transition-colors"
          >
            <MdNotifications size={24} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div
               style={{position: 'fixed',top: '64px', right: '24px',width: '320px',background: '#1a1a2e',
                       border: '1px solid rgba(99,102,241,0.3)',borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                       zIndex: 99999, overflow: 'hidden'}}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <h3 className="text-white font-semibold text-sm">Notifications</h3>
                <button
                  onClick={() => { navigate('/admin/notifications'); setShowDropdown(false); }}
                  className="text-indigo-400 text-xs hover:text-indigo-300"
                >
                  View All
                </button>
              </div>

              {/* Notification List */}
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 text-sm">
                    No notifications!
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${
                        !notif.is_read ? 'border-l-2 border-l-indigo-500' : ''
                      }`}
                      onClick={() => {
                        navigate('/admin/notifications');
                        setShowDropdown(false);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          notif.is_read ? 'bg-gray-600' : 'bg-indigo-500'
                        }`} />
                        <div>
                          <p className="text-white text-xs font-semibold">{notif.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3">
                <button
                  onClick={() => { navigate('/admin/notifications'); setShowDropdown(false); }}
                  className="w-full py-2 rounded-xl gradient-bg text-white text-xs font-medium"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <span className="hidden md:block text-sm text-gray-300">{user?.name}</span>
        </div>
      </div>
    </header>
  );
}