import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaInstagram, FaLinkedin, FaGithub,
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';

const footerLinks = {
  Services: [
    { label: 'Web Development',    path: '/services' },
    { label: 'App Development',    path: '/services' },
    { label: 'Final Year Project', path: '/services' },
    { label: 'Notes Store',        path: '/notes'    },
    { label: 'Documentation',      path: '/services' },
    { label: 'Graphic Design',     path: '/services' },
  ],
  Company: [
    { label: 'About Us',  path: '/about'    },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog',      path: '/blog'      },
    { label: 'Reviews',   path: '/reviews'   },
    { label: 'Contact',   path: '/contact'   },
  ],
  Account: [
    { label: 'Login',     path: '/login'              },
    { label: 'Register',  path: '/register'            },
    { label: 'Dashboard', path: '/dashboard'           },
    { label: 'My Orders', path: '/dashboard/orders'    },
    { label: 'Downloads', path: '/dashboard/downloads' },
  ],
};

const TGLogoFooter = () => (
  <svg width="44" height="44" viewBox="0 0 240 240">
    <defs>
      <linearGradient id="ftgt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="ftgg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
    </defs>
    <path id="ftgcp" d="M120,120 m-105,0 a105,105 0 1,1 210,0 a105,105 0 1,1 -210,0" fill="none"/>
    <text fontSize="11" letterSpacing="10" fontFamily="Georgia,serif" fill="#fde68a" opacity="0.8">
      <textPath href="#ftgcp" startOffset="2%">TG TECH SOLUTIONS · NAGPUR ·</textPath>
    </text>
    <text x="28" y="175" fontSize="155" fontWeight="700" fill="url(#ftgt)" fontFamily="Georgia,serif">T</text>
    <text x="95" y="172" fontSize="130" fontWeight="400" fill="none" stroke="url(#ftgg)" strokeWidth="3" fontFamily="Georgia,serif">G</text>
    <circle cx="204" cy="115" r="9" fill="#f59e0b"/>
    <circle cx="204" cy="115" r="4.5" fill="#fef3c7"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0f0f1a 0%, #080810 100%)',
      borderTop: '1px solid rgba(245,158,11,0.2)',
      paddingTop: '60px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.5fr',
          gap: '32px',
          marginBottom: '48px'
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <TGLogoFooter />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>TG Tech Solutions</p>
                <p style={{
                  background: 'linear-gradient(90deg,#fbbf24,#f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '12px'
                }}>Nagpur, Maharashtra</p>
              </div>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>
              Professional IT services — Web Development, Mobile Apps, Final Year Projects, Notes & More.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: FaInstagram, color: '#e1306c', href: 'https://instagram.com'      },
                { icon: FaLinkedin,  color: '#0077b5', href: 'https://linkedin.com'       },
                { icon: FaGithub,    color: '#fff',    href: 'https://github.com'         },
                { icon: FaWhatsapp,  color: '#25d366', href: 'https://wa.me/917020521466' },
              ].map(({ icon: Icon, color, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, transition: 'all 0.2s'
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '14px' }}>
              Services
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.Services.map(link => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5, color: '#fbbf24' }}
                      style={{ color: '#9ca3af', fontSize: '13px', display: 'inline-block', transition: 'all 0.2s' }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '14px' }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.Company.map(link => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5, color: '#fbbf24' }}
                      style={{ color: '#9ca3af', fontSize: '13px', display: 'inline-block', transition: 'all 0.2s' }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '14px' }}>
              Account
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.Account.map(link => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <Link to={link.path}>
                    <motion.span
                      whileHover={{ x: 5, color: '#fbbf24' }}
                      style={{ color: '#9ca3af', fontSize: '13px', display: 'inline-block', transition: 'all 0.2s' }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '14px' }}>
              Contact Us
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: MdPhone,        text: '+91 7020521466',         href: 'tel:+917020521466'             },
                { icon: FaWhatsapp,     text: 'WhatsApp Chat',          href: 'https://wa.me/917020521466'    },
                { icon: FaEnvelope,     text: 'ghagitakshak@gmail.com', href: 'mailto:ghagitakshak@gmail.com' },
                { icon: FaMapMarkerAlt, text: 'Nagpur, Maharashtra',    href: '#'                              },
              ].map(({ icon: Icon, text, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  whileHover={{ x: 5 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    color: '#9ca3af', fontSize: '13px', textDecoration: 'none'
                  }}
                >
                  <Icon size={15} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  {text}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>
            © 2024 TG Tech Solutions. All rights reserved.
          </p>
          <p style={{ color: '#6b7280', fontSize: '13px' }}>
            Made with ❤️ by{' '}
            <span style={{
              background: 'linear-gradient(90deg,#fbbf24,#f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}>
              Takshak Ghagi
            </span>{' '}
            — Nagpur
          </p>
        </div>
      </div>
    </footer>
  );
}