import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMenu, MdClose, MdDashboard, MdPerson, MdLogout } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const navLinks = [
  { path: '/',          label: 'Home'      },
  { path: '/services',  label: 'Services'  },
  { path: '/notes',     label: 'Notes'     },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/reviews',   label: 'Reviews'   },
  { path: '/blog',      label: 'Blog'      },
  { path: '/about',     label: 'About'     },
  { path: '/contact',   label: 'Contact'   },
];

const TGLogo = () => (
  <svg width="48" height="48" viewBox="0 0 240 240">
    <defs>
      <linearGradient id="tgt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="tgg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
    </defs>
    <path id="tgcp" d="M120,120 m-105,0 a105,105 0 1,1 210,0 a105,105 0 1,1 -210,0" fill="none"/>
    <text fontSize="11" letterSpacing="10" fontFamily="Georgia,serif" fill="#fde68a" opacity="0.8">
      <textPath href="#tgcp" startOffset="2%">TG TECH SOLUTIONS · NAGPUR ·</textPath>
    </text>
    <text x="28" y="175" fontSize="155" fontWeight="700" fill="url(#tgt)" fontFamily="Georgia,serif">T</text>
    <text x="95" y="172" fontSize="130" fontWeight="400" fill="none" stroke="url(#tgg)" strokeWidth="3" fontFamily="Georgia,serif">G</text>
    <circle cx="204" cy="115" r="9" fill="#f59e0b"/>
    <circle cx="204" cy="115" r="4.5" fill="#fef3c7"/>
  </svg>
);

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, logout }        = useAuth();
  const { connected }           = useSocket();
  const location                = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(15,15,26,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.2)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}
            >
              {/* Socket Connected Indicator */}
              <div style={{
                position:     'absolute',
                bottom:       '2px',
                left:         '2px',
                width:        '10px',
                height:       '10px',
                borderRadius: '50%',
                background:   connected ? '#10b981' : '#6b7280',
                border:       '2px solid #0f0f1a',
                zIndex:       10
              }} />
              <TGLogo />
              <div>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: '16px', lineHeight: 1 }}>
                  TG Tech
                </p>
                <p style={{
                  background: 'linear-gradient(90deg,#fbbf24,#f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '11px', fontWeight: 600
                }}>
                  Solutions
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="hidden lg:flex">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '8px 14px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 500, display: 'block',
                    color: location.pathname === link.path ? '#fbbf24' : '#d1d5db',
                    background: location.pathname === link.path
                      ? 'rgba(245,158,11,0.1)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            className="hidden lg:flex">
            {user ? (
              <div style={{ position: 'relative' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setDropdown(!dropdown)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 16px', borderRadius: '10px',
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    color: '#fff', cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, color: '#000'
                  }}>
                    {user.name?.charAt(0)}
                  </div>
                  <span style={{ fontSize: '14px' }}>{user.name?.split(' ')[0]}</span>
                </motion.button>

                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute', right: 0, top: '48px',
                      background: '#1a1a2e',
                      border: '1px solid rgba(245,158,11,0.3)',
                      borderRadius: '12px', padding: '8px',
                      minWidth: '180px', zIndex: 9999
                    }}
                  >
                    <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => setDropdown(false)}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        color: '#d1d5db', cursor: 'pointer', fontSize: '14px'
                      }}>
                        <MdDashboard size={18} /> Dashboard
                      </div>
                    </Link>
                    <Link to="/dashboard/profile" onClick={() => setDropdown(false)}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        color: '#d1d5db', cursor: 'pointer', fontSize: '14px'
                      }}>
                        <MdPerson size={18} /> Profile
                      </div>
                    </Link>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
                    <button onClick={() => { logout(); setDropdown(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        color: '#f87171', cursor: 'pointer', fontSize: '14px',
                        width: '100%', background: 'transparent', border: 'none'
                      }}>
                      <MdLogout size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '8px 20px', borderRadius: '8px',
                      border: '1px solid rgba(245,158,11,0.5)',
                      color: '#fbbf24', background: 'transparent',
                      cursor: 'pointer', fontSize: '14px', fontWeight: 500
                    }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '8px 20px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      color: '#000', border: 'none',
                      cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(245,158,11,0.3)'
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {isOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(15,15,26,0.98)',
              borderTop: '1px solid rgba(245,158,11,0.2)',
              padding: '16px 24px 24px'
            }}
          >
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}>
                <div style={{
                  padding: '12px 16px', borderRadius: '10px',
                  color: location.pathname === link.path ? '#fbbf24' : '#d1d5db',
                  fontSize: '15px', fontWeight: 500, marginBottom: '4px'
                }}>
                  {link.label}
                </div>
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {user ? (
                <Link to="/dashboard" style={{ flex: 1 }}>
                  <button style={{
                    width: '100%', padding: '12px',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#000', border: 'none', borderRadius: '10px',
                    cursor: 'pointer', fontWeight: 600
                  }}>
                    Dashboard
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/login" style={{ flex: 1 }}>
                    <button style={{
                      width: '100%', padding: '12px',
                      border: '1px solid rgba(245,158,11,0.5)',
                      color: '#fbbf24', background: 'transparent',
                      borderRadius: '10px', cursor: 'pointer', fontWeight: 600
                    }}>Login</button>
                  </Link>
                  <Link to="/register" style={{ flex: 1 }}>
                    <button style={{
                      width: '100%', padding: '12px',
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      color: '#000', border: 'none',
                      borderRadius: '10px', cursor: 'pointer', fontWeight: 600
                    }}>Get Started</button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}