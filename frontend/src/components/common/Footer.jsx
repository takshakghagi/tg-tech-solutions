import { Link } from 'react-router-dom';
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0a18 0%, #03030a 100%)',
      borderTop: '1px solid rgba(99,102,241,0.2)',
      padding: '60px 24px 24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '18px', color: '#000'
              }}>TG</div>
              <div>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: '16px', margin: 0 }}>TG Tech Solutions</p>
                <p style={{ color: '#f59e0b', fontSize: '11px', margin: 0, letterSpacing: '2px' }}>NAGPUR</p>
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Professional IT services for students & businesses. Quality work at affordable prices.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: FaWhatsapp, href: 'https://wa.me/917020521466', color: '#25d366' },
                { icon: FaInstagram, href: '#', color: '#e1306c' },
                { icon: FaLinkedin, href: '#', color: '#0077b5' },
                { icon: FaGithub, href: 'https://github.com/takshakghagi', color: '#fff' },
              ].map(({ icon: Icon, href, color }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, transition: 'all 0.2s' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Services</h3>
            {['Website Development', 'Mobile App', 'Final Year Project', 'IT Notes', 'Documentation', 'Graphic Design'].map(s => (
              <Link key={s} to="/services" style={{ textDecoration: 'none' }}>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '10px',
                  cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fbbf24'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}>
                  {s}
                </p>
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Company</h3>
            {[
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: 'Blog', path: '/blog' },
              { label: 'Reviews', path: '/reviews' },
              { label: 'Contact', path: '/contact' },
            ].map(({ label, path }) => (
              <Link key={label} to={path} style={{ textDecoration: 'none' }}>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '10px', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#fbbf24'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}>
                  {label}
                </p>
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a href="tel:+917020521466" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0 }}>
                  <MdPhone size={16} style={{ color: '#6366f1' }} />
                </div>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>+91 7020521466</span>
              </a>
              <a href="mailto:ghagitakshak@gmail.com" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0 }}>
                  <MdEmail size={16} style={{ color: '#6366f1' }} />
                </div>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>ghagitakshak@gmail.com</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <MdLocationOn size={16} style={{ color: '#6366f1' }} />
                </div>
                <span style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.5 }}>
                  Nagpur, Maharashtra,<br />India — 440001
                </span>
              </div>
              <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px',
                  background: 'rgba(37,211,102,0.15)',
                  border: '1px solid rgba(37,211,102,0.4)',
                  color: '#25d366', cursor: 'pointer', fontSize: '13px',
                  fontWeight: 600, width: '100%', justifyContent: 'center'
                }}>
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}>
          <p style={{ color: '#4b5563', fontSize: '13px', margin: 0 }}>
            © {year} TG Tech Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <span key={item} style={{ color: '#4b5563', fontSize: '13px', cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = '#fbbf24'}
                onMouseLeave={e => e.target.style.color = '#4b5563'}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}