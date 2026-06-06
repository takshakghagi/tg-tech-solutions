import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard, FaLaptopCode,
  FaStar, FaWhatsapp, FaArrowRight,
  FaCheckCircle, FaRocket, FaShieldAlt, FaClock
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/common/Layout';
import API from '../services/api';

function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref               = useRef(null);
  const inView            = useInView(ref, { once: true });

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
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
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
  { icon: FaCode,          title: 'Web Development',       desc: 'Modern responsive websites with React, Node.js',        color: '#6366f1', bg: 'rgba(99,102,241,0.1)'  },
  { icon: FaMobileAlt,     title: 'App Development',       desc: 'Cross-platform mobile apps for Android & iOS',          color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
  { icon: FaGraduationCap, title: 'Final Year Project',    desc: 'Complete MCA, BCA, B.Tech projects with documentation', color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
  { icon: FaBook,          title: 'Notes & Study Material',desc: 'Semester-wise notes for MCA, BCA, B.Tech',             color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  { icon: FaFileAlt,       title: 'Documentation',         desc: 'SRS, DFD, ER Diagram, Project Reports',                color: '#ef4444', bg: 'rgba(239,68,68,0.1)'   },
  { icon: FaPaintBrush,    title: 'Graphic Design',        desc: 'Logo, Banner, Brand Identity Design',                   color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
  { icon: FaIdCard,        title: 'Resume & Portfolio',    desc: 'ATS-friendly resume & portfolio website',               color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
  { icon: FaLaptopCode,    title: 'Software Development',  desc: 'Custom software solutions for businesses',              color: '#84cc16', bg: 'rgba(132,204,22,0.1)'  },
];

const whyUs = [
  { icon: FaRocket,      title: 'Fast Delivery',    desc: 'On-time project delivery guaranteed',     color: '#6366f1' },
  { icon: FaShieldAlt,   title: 'Quality Work',     desc: '100% quality assured with revisions',     color: '#10b981' },
  { icon: FaClock,       title: '24/7 Support',     desc: 'Round the clock support via WhatsApp',    color: '#f59e0b' },
  { icon: FaCheckCircle, title: 'Affordable Price', desc: 'Best quality at student-friendly prices', color: '#ec4899' },
];

export default function Home() {
  const [reviews,     setReviews]     = useState([]);
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
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)',
        padding: isMobile ? '90px 0 50px' : '0'
      }}>
        {/* Particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `hsl(${Math.random() * 60 + 220}, 70%, 60%)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
              animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 2, 1], y: [0, -30, 0] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ position: 'absolute', width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
              top: '-100px', right: '-100px', borderRadius: '50%' }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 24px', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
            gap: isTablet ? '32px' : '60px',
            alignItems: 'center'
          }}>

            {/* Left Content */}
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

                {/* Badge */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '6px 16px', borderRadius: '100px',
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.4)', marginBottom: '20px'
                  }}>
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                  <span style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: 500 }}>
                    🚀 Professional IT Services
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: isMobile ? '32px' : 'clamp(36px,5vw,64px)',
                    fontWeight: 800, lineHeight: 1.2,
                    marginBottom: '16px', color: '#fff'
                  }}>
                  Transform Your{' '}
                  <span style={{
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    Digital Vision
                  </span>{' '}
                  Into Reality
                </motion.h1>

                {/* Subtitle */}
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    color: '#9ca3af',
                    fontSize: isMobile ? '14px' : '18px',
                    lineHeight: 1.7, marginBottom: '24px'
                  }}>
                  Expert web development, mobile apps, final year projects, IT notes & more.
                  Quality work at student-friendly prices!
                </motion.p>

                {/* Buttons */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    display: 'flex', gap: '12px',
                    flexDirection: 'column',
                  }}>
                  <Link to="/services" style={{ textDecoration: 'none', width: '100%' }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '14px 28px', borderRadius: '12px',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontSize: '16px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        width: '100%',
                        boxShadow: '0 8px 30px rgba(99,102,241,0.3)'
                      }}>
                      Explore Services <FaArrowRight />
                    </motion.button>
                  </Link>
                  <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                    style={{ textDecoration: 'none', width: '100%' }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '14px 28px', borderRadius: '12px',
                        background: 'rgba(37,211,102,0.1)',
                        border: '1px solid rgba(37,211,102,0.4)',
                        color: '#25d366', cursor: 'pointer',
                        fontSize: '16px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        width: '100%'
                      }}>
                      <FaWhatsapp /> WhatsApp Us
                    </motion.button>
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    marginTop: '28px',
                    padding: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                  {[
                    { value: '500+', label: 'Projects'  },
                    { value: '200+', label: 'Clients'   },
                    { value: '4.9⭐', label: 'Rating'   },
                    { value: '3+',   label: 'Yrs Exp'   },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <p style={{
                        fontSize: isMobile ? '16px' : '22px', fontWeight: 800,
                        background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        margin: 0
                      }}>{item.value}</p>
                      <p style={{ color: '#6b7280', fontSize: '10px', margin: '2px 0 0' }}>{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right — Profile Card — Desktop Only */}
            {!isTablet && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ position: 'relative' }}>

                <div style={{
                  background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1))',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '24px', padding: '32px',
                  backdropFilter: 'blur(20px)'
                }}>
                  {/* Profile */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        margin: '0 auto 16px', overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(99,102,241,0.5)',
                        border: '4px solid rgba(255,255,255,0.2)'
                      }}>
                      <img
                        src="https://res.cloudinary.com/dkkwdzs49/image/upload/f_auto,q_auto/WhatsApp_Image_2026-05-31_at_8.14.16_AM_opf8xu.jpg"
                        alt="Takshak Ghagi"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    </motion.div>
                    <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>Takshak Ghagi</h3>
                    <p style={{ color: '#a5b4fc', fontSize: '14px' }}>Full Stack Developer & IT Expert</p>
                    <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>📍 Nagpur, Maharashtra</p>
                  </div>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                    {['React.js', 'Node.js', 'MySQL', 'React Native', 'Python', 'Figma'].map(skill => (
                      <span key={skill} style={{
                        padding: '4px 12px', borderRadius: '100px',
                        background: 'rgba(99,102,241,0.2)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        color: '#a5b4fc', fontSize: '12px'
                      }}>{skill}</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { label: 'Projects', value: '500+' },
                      { label: 'Clients',  value: '200+' },
                      { label: 'Rating',   value: '4.9⭐' },
                    ].map((item, i) => (
                      <div key={i} style={{
                        textAlign: 'center', padding: '12px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '10px'
                      }}>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: 0 }}>{item.value}</p>
                        <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact Buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                      <button style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(37,211,102,0.15)',
                        border: '1px solid rgba(37,211,102,0.4)',
                        borderRadius: '10px', color: '#25d366',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}>
                        <FaWhatsapp /> WhatsApp
                      </button>
                    </a>
                    <a href="mailto:ghagitakshak@gmail.com" style={{ flex: 1 }}>
                      <button style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        borderRadius: '10px', color: '#818cf8',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}>
                        <MdEmail /> Email
                      </button>
                    </a>
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    background: 'linear-gradient(135deg,#10b981,#059669)',
                    borderRadius: '12px', padding: '10px 16px',
                    boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
                  }}>
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600, margin: 0 }}>✅ 500+ Projects</p>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
                  style={{
                    position: 'absolute', bottom: '-15px', left: '-20px',
                    background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                    borderRadius: '12px', padding: '10px 16px',
                    boxShadow: '0 10px 30px rgba(245,158,11,0.3)'
                  }}>
                  <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600, margin: 0 }}>⭐ 4.9/5 Rating</p>
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
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: '13px', marginBottom: '16px'
            }}>Our Services</span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              What We <span style={{
                background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Offer</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '17px' }}>
              Complete IT solutions for students and businesses
            </p>
          </div>
        </FadeIn>

        {/* Services Grid — 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : isTablet
              ? 'repeat(2, 1fr)'
              : 'repeat(4, 1fr)',
          gap: isMobile ? '14px' : '20px'
        }}>
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.03, borderColor: service.color }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: isMobile ? '18px' : '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  gap: isMobile ? '14px' : '0'
                }}>
                <div style={{
                  width: isMobile ? '44px' : '52px',
                  height: isMobile ? '44px' : '52px',
                  flexShrink: 0,
                  borderRadius: '12px', background: service.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: isMobile ? '0' : '16px'
                }}>
                  <service.icon size={isMobile ? 20 : 24} style={{ color: service.color }} />
                </div>
                <div>
                  <h3 style={{
                    color: '#fff', fontWeight: 700,
                    fontSize: isMobile ? '14px' : '16px',
                    marginBottom: isMobile ? '0' : '6px', lineHeight: 1.3
                  }}>{service.title}</h3>
                  {!isMobile && (
                    <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/services">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 32px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600
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
        background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.05))',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        borderBottom: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '20px 12px' : '40px',
            textAlign: 'center'
          }}>
            {[
              { end: 150, suffix: '+', label: 'Projects Completed',  color: '#6366f1' },
              { end: 59,  suffix: '+', label: 'Happy Clients',       color: '#10b981' },
              { end: 0,   suffix: '+', label: 'Years Experience',    color: '#f59e0b' },
              { end: 29,  suffix: '%', label: 'Client Satisfaction', color: '#ec4899' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  padding: isMobile ? '16px 8px' : '0',
                  background: isMobile ? 'rgba(255,255,255,0.03)' : 'transparent',
                  borderRadius: isMobile ? '12px' : '0',
                  border: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}>
                  <p style={{
                    fontSize: isMobile ? '32px' : 'clamp(36px,5vw,52px)',
                    fontWeight: 900,
                    background: `linear-gradient(135deg,${stat.color},#fff)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '6px', margin: 0
                  }}>
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: isMobile ? '12px' : '14px', marginTop: '6px' }}>{stat.label}</p>
                </div>
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
              background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
              color: '#34d399', fontSize: '13px', marginBottom: '16px'
            }}>Why Choose Us</span>
            <h2 style={{ fontSize: 'clamp(22px,4vw,48px)', fontWeight: 800, color: '#fff' }}>
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
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '14px' : '24px'
        }}>
          {whyUs.map((item, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <motion.div whileHover={{ y: -4 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: isMobile ? '20px 14px' : '32px',
                  textAlign: 'center',
                  height: '100%'
                }}>
                <div style={{
                  width: isMobile ? '48px' : '64px',
                  height: isMobile ? '48px' : '64px',
                  borderRadius: '16px', background: `${item.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <item.icon size={isMobile ? 22 : 30} style={{ color: item.color }} />
                </div>
                <h3 style={{
                  color: '#fff', fontWeight: 700,
                  fontSize: isMobile ? '13px' : '18px',
                  marginBottom: '6px', lineHeight: 1.3
                }}>{item.title}</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: isMobile ? '11px' : '14px',
                  lineHeight: 1.5, margin: 0
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
                <h2 style={{ fontSize: 'clamp(22px,4vw,48px)', fontWeight: 800, color: '#fff' }}>
                  What Our <span style={{
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
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '20px', padding: isMobile ? '20px' : '28px'
                    }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} size={14}
                          style={{ color: j < review.rating ? '#f59e0b' : '#374151' }} />
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
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '24px',
              padding: isMobile ? '36px 20px' : '60px 40px'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
              <h2 style={{
                fontSize: isMobile ? '22px' : 'clamp(24px,4vw,40px)',
                fontWeight: 800, color: '#fff', marginBottom: '10px'
              }}>Ready to Start Your Project?</h2>
              <p style={{
                color: '#9ca3af',
                fontSize: isMobile ? '14px' : '17px',
                marginBottom: '24px', lineHeight: 1.6
              }}>
                Get in touch today and let's build something amazing together!
              </p>
              <div style={{
                display: 'flex', gap: '12px', justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <Link to="/contact" style={{ textDecoration: 'none', width: '100%' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '14px 32px', borderRadius: '12px',
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 600,
                      width: '100%'
                    }}>
                    Contact Us Now
                  </motion.button>
                </Link>
                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none', width: '100%' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '14px 32px', borderRadius: '12px',
                      background: 'rgba(37,211,102,0.15)',
                      border: '1px solid rgba(37,211,102,0.4)',
                      color: '#25d366', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      width: '100%'
                    }}>
                    <FaWhatsapp /> Chat on WhatsApp
                  </motion.button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
