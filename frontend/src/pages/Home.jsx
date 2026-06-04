import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard, FaBriefcase,
  FaLaptopCode, FaStar, FaWhatsapp, FaArrowRight,
  FaCheckCircle, FaRocket, FaShieldAlt, FaClock
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/common/Layout';
import API from '../services/api';

// Animated Counter
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

// Section Animation
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      y:       direction === 'up'   ? 50  : direction === 'down' ? -50 : 0,
      x:       direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

const services = [
  { icon: FaCode,        title: 'Web Development',    desc: 'Modern responsive websites with React, Node.js',        color: '#6366f1', bg: 'rgba(99,102,241,0.1)'  },
  { icon: FaMobileAlt,   title: 'App Development',    desc: 'Cross-platform mobile apps for Android & iOS',          color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
  { icon: FaGraduationCap,title:'Final Year Project', desc: 'Complete MCA, BCA, B.Tech projects with documentation', color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
  { icon: FaBook,        title: 'Notes & Study Material',desc:'Semester-wise notes for MCA, BCA, B.Tech',           color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  { icon: FaFileAlt,     title: 'Documentation',      desc: 'SRS, DFD, ER Diagram, Project Reports',                color: '#ef4444', bg: 'rgba(239,68,68,0.1)'   },
  { icon: FaPaintBrush,  title: 'Graphic Design',     desc: 'Logo, Banner, Brand Identity Design',                   color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
  { icon: FaIdCard,      title: 'Resume & Portfolio', desc: 'ATS-friendly resume & portfolio website',               color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
  { icon: FaLaptopCode,  title: 'Software Development',desc:'Custom software solutions for businesses',             color: '#84cc16', bg: 'rgba(132,204,22,0.1)'  },
];

const whyUs = [
  { icon: FaRocket,      title: 'Fast Delivery',    desc: 'On-time project delivery guaranteed',          color: '#6366f1' },
  { icon: FaShieldAlt,   title: 'Quality Work',     desc: '100% quality assured with revisions',          color: '#10b981' },
  { icon: FaClock,       title: '24/7 Support',     desc: 'Round the clock support via WhatsApp',         color: '#f59e0b' },
  { icon: FaCheckCircle, title: 'Affordable Price', desc: 'Best quality at student-friendly prices',      color: '#ec4899' },
];

export default function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews?limit=3').then(r => {
      setReviews(r.data.data?.reviews?.slice(0, 3) || []);
    }).catch(() => {});
  }, []);

  return (
    <Layout>
      {/* ============ HERO SECTION ============ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)',
      }}>

        {/* Animated Background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(30)].map((_, i) => (
            <motion.div key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: `hsl(${Math.random() * 60 + 220}, 70%, 60%)`,
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 2, 1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute', width: '500px', height: '500px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
              top: '-100px', right: '-100px', borderRadius: '50%'
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            style={{
              position: 'absolute', width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
              bottom: '-50px', left: '-50px', borderRadius: '50%'
            }}
          />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}
            className="grid-cols-1 lg:grid-cols-2">

            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '6px 16px', borderRadius: '100px',
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.4)',
                    marginBottom: '24px'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }}
                  />
                  <span style={{ color: '#a5b4fc', fontSize: '13px', fontWeight: 500 }}>
                    🚀 Professional IT Services
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: 'clamp(36px, 5vw, 64px)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginBottom: '24px',
                    color: '#fff'
                  }}
                >
                  Transform Your{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Digital Vision
                  </span>{' '}
                  Into Reality
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    color: '#9ca3af', fontSize: '18px', lineHeight: 1.7,
                    marginBottom: '36px', maxWidth: '500px'
                  }}
                >
                  Expert web development, mobile apps, final year projects, IT notes & more.
                  Quality work at student-friendly prices!
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
                >
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99,102,241,0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '14px 32px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontSize: '16px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '8px',
                        boxShadow: '0 8px 30px rgba(99,102,241,0.3)'
                      }}
                    >
                      Explore Services <FaArrowRight />
                    </motion.button>
                  </Link>
                  <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '14px 32px', borderRadius: '12px',
                        background: 'rgba(37,211,102,0.1)',
                        border: '1px solid rgba(37,211,102,0.4)',
                        color: '#25d366', cursor: 'pointer',
                        fontSize: '16px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      <FaWhatsapp /> WhatsApp Us
                    </motion.button>
                  </a>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}
                >
                  {[
                    { value: '500+', label: 'Projects Done'    },
                    { value: '200+', label: 'Happy Clients'    },
                    { value: '4.9',  label: 'Rating'           },
                    { value: '3+',   label: 'Years Experience' },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <p style={{
                        fontSize: '24px', fontWeight: 800,
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {item.value}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '12px' }}>{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right — Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative' }}
              className="hidden lg:block"
            >
              {/* Main Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '24px',
                padding: '32px',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Glowing border effect */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), transparent)',
                  borderRadius: '24px'
                }} />

                {/* Profile Avatar */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
  style={{
    width: '120px', height: '120px',
    borderRadius: '50%',
    margin: '0 auto 16px',
    overflow: 'hidden',
    boxShadow: '0 0 40px rgba(99,102,241,0.5)',
    border: '4px solid rgba(255,255,255,0.2)'
  }}
>
  <img
    src="https://res.cloudinary.com/dkkwdzs49/image/upload/f_auto,q_auto/WhatsApp_Image_2026-05-31_at_8.14.16_AM_opf8xu.jpg"
    alt="Takshak Ghagi"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top'
    }}
  />
</motion.div>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
                    Takshak Ghagi
                  </h3>
                  <p style={{ color: '#a5b4fc', fontSize: '14px' }}>Full Stack Developer & IT Expert</p>
                  <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>
                    📍 Nagpur, Maharashtra
                  </p>
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                  {['React.js', 'Node.js', 'MySQL', 'React Native', 'Python', 'Figma'].map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        padding: '4px 12px', borderRadius: '100px',
                        background: 'rgba(99,102,241,0.2)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        color: '#a5b4fc', fontSize: '12px', fontWeight: 500
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Stats Row */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px', marginBottom: '20px'
                }}>
                  {[
                    { label: 'Projects', value: '500+' },
                    { label: 'Clients',  value: '200+' },
                    { label: 'Rating',   value: '4.9⭐' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      textAlign: 'center', padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{item.value}</p>
                      <p style={{ color: '#9ca3af', fontSize: '11px' }}>{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Contact Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(37,211,102,0.15)',
                        border: '1px solid rgba(37,211,102,0.4)',
                        borderRadius: '10px', color: '#25d366',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}
                    >
                      <FaWhatsapp /> WhatsApp
                    </motion.button>
                  </a>
                  <a href="mailto:ghagitakshak@gmail.com" style={{ flex: 1 }}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        borderRadius: '10px', color: '#818cf8',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}
                    >
                      <MdEmail /> Email
                    </motion.button>
                  </a>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '12px', padding: '10px 16px',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
                }}
              >
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>✅ 500+ Projects</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                style={{
                  position: 'absolute', bottom: '-15px', left: '-20px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '12px', padding: '10px 16px',
                  boxShadow: '0 10px 30px rgba(245,158,11,0.3)'
                }}
              >
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>⭐ 4.9/5 Rating</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px'
          }}
        >
          <p style={{ color: '#6b7280', fontSize: '12px' }}>Scroll Down</p>
          <div style={{
            width: '24px', height: '40px', border: '2px solid rgba(99,102,241,0.5)',
            borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px'
          }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6366f1' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: '13px', fontWeight: 500, marginBottom: '16px'
            }}>
              Our Services
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', marginBottom: '16px'
            }}>
              What We{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Offer</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Complete IT solutions for students and businesses
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 20px 40px ${service.color}30`,
                  borderColor: service.color
                }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '28px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  height: '100%'
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: service.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <service.icon size={26} style={{ color: service.color }} />
                </motion.div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.6 }}>
                  {service.desc}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: service.color, fontSize: '13px', fontWeight: 600,
                    marginTop: '16px'
                  }}
                >
                  Learn More <FaArrowRight size={12} />
                </motion.div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 36px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: '16px', fontWeight: 600,
                  boxShadow: '0 8px 30px rgba(99,102,241,0.3)'
                }}
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        borderBottom: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '40px', textAlign: 'center'
          }}>
            {[
              { end: 500, suffix: '+', label: 'Projects Completed', color: '#6366f1' },
              { end: 200, suffix: '+', label: 'Happy Clients',      color: '#10b981' },
              { end: 3,   suffix: '+', label: 'Years Experience',   color: '#f59e0b' },
              { end: 99,  suffix: '%', label: 'Client Satisfaction',color: '#ec4899' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div>
                  <p style={{
                    fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900,
                    background: `linear-gradient(135deg, ${stat.color}, #fff)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text', marginBottom: '8px'
                  }}>
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: '15px' }}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
              color: '#34d399', fontSize: '13px', marginBottom: '16px'
            }}>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff' }}>
              Why Students &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                Businesses Love Us
              </span>
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {whyUs.map((item, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, boxShadow: `0 20px 40px ${item.color}20` }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '32px',
                  transition: 'all 0.3s ease', textAlign: 'center'
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  style={{
                    width: '64px', height: '64px', borderRadius: '20px',
                    background: `${item.color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <item.icon size={30} style={{ color: item.color }} />
                </motion.div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      {reviews.length > 0 && (
        <section style={{
          padding: '100px 24px',
          background: 'rgba(99,102,241,0.03)',
          borderTop: '1px solid rgba(99,102,241,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <FadeIn>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff' }}>
                  What Our{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    Clients Say
                  </span>
                </h2>
              </div>
            </FadeIn>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {reviews.map((review, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '20px', padding: '28px',
                      transition: 'all 0.3s'
                    }}
                  >
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} size={16}
                          style={{ color: j < review.rating ? '#f59e0b' : '#374151' }} />
                      ))}
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>
                      "{review.comment}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: '18px'
                      }}>
                        {review.user_name?.charAt(0)}
                      </div>
                      <div>
                        <p style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>{review.user_name}</p>
                        <p style={{ color: '#6b7280', fontSize: '13px' }}>{review.service_name}</p>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA SECTION ============ */}
      <section style={{ padding: '100px 24px' }}>
        <FadeIn>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '28px', padding: '60px 40px',
                backdropFilter: 'blur(20px)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: '-50px', right: '-50px',
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)'
              }} />

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: '48px', marginBottom: '24px', display: 'inline-block' }}
              >
                🚀
              </motion.div>
              <h2 style={{
                fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800,
                color: '#fff', marginBottom: '16px'
              }}>
                Ready to Start Your Project?
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '18px', marginBottom: '36px', lineHeight: 1.6 }}>
                Get in touch with us today and let's build something amazing together!
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '14px 36px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 600,
                      boxShadow: '0 8px 30px rgba(99,102,241,0.4)'
                    }}
                  >
                    Contact Us Now
                  </motion.button>
                </Link>
                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '14px 36px', borderRadius: '12px',
                      background: 'rgba(37,211,102,0.15)',
                      border: '1px solid rgba(37,211,102,0.4)',
                      color: '#25d366', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
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