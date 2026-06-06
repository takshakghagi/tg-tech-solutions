import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard, FaLaptopCode,
  FaStar, FaWhatsapp, FaArrowRight,
  FaCheckCircle, FaRocket, FaShieldAlt, FaClock,
  FaUsers, FaProjectDiagram, FaAward
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/common/Layout';
import API from '../services/api';

function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);
  return (
    <motion.div ref={ref} initial="hidden" animate={controls}
      variants={variants} transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

const services = [
  { icon: FaCode,          title: 'Web Development',       desc: 'Modern responsive websites with React, Node.js',        color: '#6366f1', bg: 'rgba(99,102,241,0.12)'  },
  { icon: FaMobileAlt,     title: 'App Development',       desc: 'Cross-platform mobile apps for Android & iOS',          color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
  { icon: FaGraduationCap, title: 'Final Year Project',    desc: 'Complete MCA, BCA, B.Tech projects with documentation', color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
  { icon: FaBook,          title: 'Notes & Study Material',desc: 'Semester-wise notes for MCA, BCA, B.Tech',             color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  { icon: FaFileAlt,       title: 'Documentation',         desc: 'SRS, DFD, ER Diagram, Project Reports',                color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
  { icon: FaPaintBrush,    title: 'Graphic Design',        desc: 'Logo, Banner, Brand Identity Design',                   color: '#ec4899', bg: 'rgba(236,72,153,0.12)'  },
  { icon: FaIdCard,        title: 'Resume & Portfolio',    desc: 'ATS-friendly resume & portfolio website',               color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  { icon: FaLaptopCode,    title: 'Software Development',  desc: 'Custom software solutions for businesses',              color: '#84cc16', bg: 'rgba(132,204,22,0.12)'  },
];

const whyUs = [
  { icon: FaRocket,      title: 'Fast Delivery',    desc: 'On-time project delivery guaranteed',     color: '#6366f1' },
  { icon: FaShieldAlt,   title: 'Quality Work',     desc: '100% quality assured with revisions',     color: '#10b981' },
  { icon: FaClock,       title: '24/7 Support',     desc: 'Round the clock support via WhatsApp',    color: '#f59e0b' },
  { icon: FaCheckCircle, title: 'Affordable Price', desc: 'Best quality at student-friendly prices', color: '#ec4899' },
];

const glassStyle = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
};

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    API.get('/reviews?limit=3').then(r => {
      setReviews(r.data.data?.reviews?.slice(0, 3) || []);
    }).catch(() => {});
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  return (
    <Layout>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '80px 20px 40px' : '0 24px',
      }}>

        {/* BG Blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              position: 'absolute', width: isMobile ? '300px' : '500px', height: isMobile ? '300px' : '500px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
              top: '-80px', left: '-80px', borderRadius: '50%'
            }} />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            style={{
              position: 'absolute', width: isMobile ? '250px' : '400px', height: isMobile ? '250px' : '400px',
              background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
              bottom: '-60px', right: '-60px', borderRadius: '50%'
            }} />
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            style={{
              position: 'absolute', width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)',
              top: '50%', left: '50%', borderRadius: '50%'
            }} />
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `hsl(${220 + Math.random() * 60}, 70%, 65%)`,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -25, 0], scale: [1, 1.8, 1] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}>

            {/* ---- LEFT CONTENT ---- */}
            <div>

              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 18px', borderRadius: '100px',
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  backdropFilter: 'blur(10px)',
                  marginBottom: '20px'
                }}>
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                <span style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: 600, letterSpacing: '0.3px' }}>
                  🚀 Professional IT Services
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{
                  fontSize: isMobile ? '36px' : 'clamp(38px,5vw,64px)',
                  fontWeight: 900, lineHeight: 1.15,
                  color: '#fff', marginBottom: '16px',
                  letterSpacing: '-0.5px'
                }}>
                Transform Your
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                }}>
                  Digital Vision
                </span>
                <br />
                Into Reality
              </motion.h1>

              {/* Subtitle */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{
                  color: '#9ca3af', fontSize: isMobile ? '14px' : '17px',
                  lineHeight: 1.75, marginBottom: '28px', maxWidth: '480px'
                }}>
                Expert web development, mobile apps, final year projects, IT notes & more.
                Quality work at <span style={{ color: '#a5b4fc', fontWeight: 600 }}>student-friendly prices!</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>

                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(99,102,241,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '15px 28px', borderRadius: '14px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
                      letterSpacing: '0.3px'
                    }}>
                    Explore Services <FaArrowRight size={14} />
                  </motion.button>
                </Link>

                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(37,211,102,0.25)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '15px 28px', borderRadius: '14px',
                      background: 'rgba(37,211,102,0.08)',
                      border: '1.5px solid rgba(37,211,102,0.4)',
                      backdropFilter: 'blur(10px)',
                      color: '#25d366', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      letterSpacing: '0.3px'
                    }}>
                    <FaWhatsapp size={18} /> WhatsApp Us
                  </motion.button>
                </a>
              </motion.div>

              {/* Stats Bar — Glass card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                style={{
                  ...glassStyle,
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                }}>
                {[
                  { icon: FaProjectDiagram, value: '500+', label: 'Projects', color: '#6366f1' },
                  { icon: FaUsers,          value: '200+', label: 'Clients',  color: '#10b981' },
                  { icon: FaStar,           value: '4.9',  label: 'Rating',   color: '#f59e0b' },
                  { icon: FaAward,          value: '3+',   label: 'Yrs Exp',  color: '#ec4899' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '4px 0' }}>
                    <s.icon size={isMobile ? 14 : 16} style={{ color: s.color, marginBottom: '4px' }} />
                    <p style={{
                      fontSize: isMobile ? '17px' : '20px', fontWeight: 800,
                      color: '#fff', margin: '2px 0 2px',
                      lineHeight: 1
                    }}>{s.value}</p>
                    <p style={{ color: '#6b7280', fontSize: '10px', margin: 0, fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ---- RIGHT — Profile Card (Desktop only) ---- */}
            {!isTablet && (
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{ position: 'relative' }}>

                {/* Main glass card */}
                <div style={{
                  ...glassStyle,
                  padding: '36px 28px',
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  boxShadow: '0 30px 80px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}>
                  {/* Profile */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                      <div style={{
                        width: '110px', height: '110px', borderRadius: '50%',
                        margin: '0 auto 14px', overflow: 'hidden',
                        boxShadow: '0 0 0 3px rgba(99,102,241,0.5), 0 0 40px rgba(99,102,241,0.4)',
                        border: '3px solid rgba(255,255,255,0.15)'
                      }}>
                        <img
                          src="https://res.cloudinary.com/dkkwdzs49/image/upload/f_auto,q_auto/WhatsApp_Image_2026-05-31_at_8.14.16_AM_opf8xu.jpg"
                          alt="Takshak Ghagi"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                        />
                      </div>
                    </motion.div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Takshak Ghagi</h3>
                    <p style={{ color: '#a5b4fc', fontSize: '13px', marginBottom: '4px' }}>Full Stack Developer & IT Expert</p>
                    <p style={{ color: '#4b5563', fontSize: '12px' }}>📍 Nagpur, Maharashtra</p>
                  </div>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
                    {['React.js', 'Node.js', 'MySQL', 'React Native', 'Python', 'Figma'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 12px', borderRadius: '100px',
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        color: '#a5b4fc', fontSize: '11px', fontWeight: 500
                      }}>{skill}</span>
                    ))}
                  </div>

                  {/* Mini stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                    {[
                      { label: 'Projects', value: '500+', color: '#6366f1' },
                      { label: 'Clients',  value: '200+', color: '#10b981' },
                      { label: 'Rating',   value: '4.9⭐', color: '#f59e0b' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        textAlign: 'center', padding: '10px 6px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px'
                      }}>
                        <p style={{ color: '#fff', fontWeight: 800, fontSize: '15px', margin: 0 }}>{item.value}</p>
                        <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                      <button style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(37,211,102,0.1)',
                        border: '1px solid rgba(37,211,102,0.35)',
                        borderRadius: '10px', color: '#25d366',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        backdropFilter: 'blur(8px)'
                      }}>
                        <FaWhatsapp /> WhatsApp
                      </button>
                    </a>
                    <a href="mailto:ghagitakshak@gmail.com" style={{ flex: 1 }}>
                      <button style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.35)',
                        borderRadius: '10px', color: '#818cf8',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        backdropFilter: 'blur(8px)'
                      }}>
                        <MdEmail /> Email
                      </button>
                    </a>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: 'absolute', top: '-18px', right: '-18px',
                    background: 'linear-gradient(135deg,#10b981,#059669)',
                    borderRadius: '14px', padding: '10px 16px',
                    boxShadow: '0 10px 30px rgba(16,185,129,0.35)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700, margin: 0 }}>✅ 500+ Projects</p>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
                  style={{
                    position: 'absolute', bottom: '-14px', left: '-18px',
                    background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                    borderRadius: '14px', padding: '10px 16px',
                    boxShadow: '0 10px 30px rgba(245,158,11,0.35)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700, margin: 0 }}>⭐ 4.9/5 Rating</p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: '13px', fontWeight: 600, marginBottom: '14px',
              backdropFilter: 'blur(10px)'
            }}>Our Services</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>
              What We{' '}
              <span style={{
                background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Offer</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '17px' }}>
              Complete IT solutions for students and businesses
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? 'repeat(3,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? '12px' : '18px'
        }}>
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.04, borderColor: service.color, boxShadow: `0 12px 40px ${service.color}25` }}
                style={{
                  ...glassStyle,
                  padding: isMobile ? '18px 14px' : '24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s',
                  height: '100%'
                }}>
                <div style={{
                  width: isMobile ? '42px' : '50px',
                  height: isMobile ? '42px' : '50px',
                  borderRadius: '12px', background: service.bg,
                  border: `1px solid ${service.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <service.icon size={isMobile ? 18 : 22} style={{ color: service.color }} />
                </div>
                <h3 style={{
                  color: '#fff', fontWeight: 700,
                  fontSize: isMobile ? '12px' : '15px',
                  lineHeight: 1.35, marginBottom: isMobile ? '0' : '6px'
                }}>{service.title}</h3>
                {!isMobile && (
                  <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/services">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '13px 36px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 700,
                  boxShadow: '0 8px 28px rgba(99,102,241,0.3)'
                }}>
                View All Services
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ===== STATS ===== */}
      <section style={{
        padding: isMobile ? '50px 20px' : '80px 24px',
        background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.04))',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        borderBottom: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: isMobile ? '16px' : '32px',
          }}>
            {[
              { end: 500, suffix: '+', label: 'Projects Completed',  color: '#6366f1', icon: '🚀' },
              { end: 200, suffix: '+', label: 'Happy Clients',       color: '#10b981', icon: '😊' },
              { end: 3,   suffix: '+', label: 'Years Experience',    color: '#f59e0b', icon: '🏆' },
              { end: 99,  suffix: '%', label: 'Client Satisfaction', color: '#ec4899', icon: '⭐' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div whileHover={{ scale: 1.03 }}
                  style={{
                    ...glassStyle,
                    padding: isMobile ? '20px 16px' : '28px 24px',
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${stat.color}10, rgba(255,255,255,0.03))`,
                    border: `1px solid ${stat.color}25`,
                  }}>
                  <div style={{ fontSize: isMobile ? '24px' : '30px', marginBottom: '6px' }}>{stat.icon}</div>
                  <p style={{
                    fontSize: isMobile ? '34px' : '48px',
                    fontWeight: 900,
                    background: `linear-gradient(135deg,${stat.color},#fff)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    margin: '0 0 6px'
                  }}>
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px', margin: 0, fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
              color: '#34d399', fontSize: '13px', fontWeight: 600, marginBottom: '14px',
              backdropFilter: 'blur(10px)'
            }}>Why Choose Us</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
              Why Students &{' '}
              <span style={{
                background: 'linear-gradient(135deg,#10b981,#34d399)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Businesses Love Us</span>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? '12px' : '20px'
        }}>
          {whyUs.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6, boxShadow: `0 20px 40px ${item.color}20` }}
                style={{
                  ...glassStyle,
                  padding: isMobile ? '20px 14px' : '32px 24px',
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${item.color}08, rgba(255,255,255,0.03))`,
                  border: `1px solid ${item.color}20`,
                  height: '100%'
                }}>
                <div style={{
                  width: isMobile ? '48px' : '60px',
                  height: isMobile ? '48px' : '60px',
                  borderRadius: '16px',
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px'
                }}>
                  <item.icon size={isMobile ? 22 : 28} style={{ color: item.color }} />
                </div>
                <h3 style={{
                  color: '#fff', fontWeight: 700,
                  fontSize: isMobile ? '13px' : '17px',
                  marginBottom: '8px', lineHeight: 1.3
                }}>{item.title}</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: isMobile ? '11px' : '13px',
                  lineHeight: 1.6, margin: 0
                }}>{item.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      {reviews.length > 0 && (
        <section style={{
          padding: isMobile ? '60px 20px' : '100px 24px',
          background: 'rgba(99,102,241,0.03)',
          borderTop: '1px solid rgba(99,102,241,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <FadeIn>
              <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '60px' }}>
                <h2 style={{ fontSize: 'clamp(22px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
                  What Our{' '}
                  <span style={{
                    background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>Clients Say</span>
                </h2>
              </div>
            </FadeIn>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '16px' : '24px'
            }}>
              {reviews.map((review, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <motion.div whileHover={{ y: -4 }}
                    style={{
                      ...glassStyle,
                      padding: isMobile ? '20px' : '28px'
                    }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} size={14} style={{ color: j < review.rating ? '#f59e0b' : '#374151' }} />
                      ))}
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>
                      "{review.comment}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: '16px', flexShrink: 0
                      }}>
                        {review.user_name?.charAt(0)}
                      </div>
                      <div>
                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px', margin: 0 }}>{review.user_name}</p>
                        <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>{review.service_name}</p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section style={{ padding: isMobile ? '60px 20px' : '100px 24px' }}>
        <FadeIn>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              whileHover={{ boxShadow: '0 30px 80px rgba(99,102,241,0.25)' }}
              style={{
                ...glassStyle,
                background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.08))',
                border: '1px solid rgba(99,102,241,0.25)',
                padding: isMobile ? '36px 20px' : '60px 48px',
                boxShadow: '0 20px 60px rgba(99,102,241,0.15)'
              }}>
              <div style={{ fontSize: isMobile ? '36px' : '48px', marginBottom: '16px' }}>🚀</div>
              <h2 style={{
                fontSize: isMobile ? '24px' : '36px',
                fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1.2
              }}>Ready to Start Your Project?</h2>
              <p style={{
                color: '#9ca3af', fontSize: isMobile ? '14px' : '16px',
                marginBottom: '28px', lineHeight: 1.7
              }}>
                Get in touch today and let's build something amazing together!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '15px 32px', borderRadius: '14px',
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 700,
                      boxShadow: '0 8px 28px rgba(99,102,241,0.35)'
                    }}>
                    Contact Us Now
                  </motion.button>
                </Link>
                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '15px 32px', borderRadius: '14px',
                      background: 'rgba(37,211,102,0.08)',
                      border: '1.5px solid rgba(37,211,102,0.35)',
                      color: '#25d366', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <FaWhatsapp /> Chat on WhatsApp
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </section>

    </Layout>
  );
}
