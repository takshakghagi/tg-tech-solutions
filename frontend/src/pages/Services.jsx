import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard, FaBriefcase,
  FaLaptopCode, FaWhatsapp, FaCheckCircle
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/common/Layout';

const services = [
  {
    icon:     FaCode,
    image:    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80',
    title:    'Custom Website Development',
    desc:     'Modern, responsive websites built with React.js, Node.js and MySQL.',
    color:    '#6366f1',
    bg:       'rgba(99,102,241,0.1)',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Admin Panel', 'Contact Form', '1 Year Support'],
    tech:     ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    delivery: '14 Days',
    category: 'Web Development'
  },
  {
    icon:     FaMobileAlt,
    image:    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    title:    'Mobile App Development',
    desc:     'Cross-platform mobile apps for Android and iOS using React Native.',
    color:    '#8b5cf6',
    bg:       'rgba(139,92,246,0.1)',
    features: ['Android & iOS', 'Push Notifications', 'Payment Integration', 'Admin Dashboard', 'Play Store Upload'],
    tech:     ['React Native', 'Node.js', 'Firebase'],
    delivery: '21 Days',
    category: 'App Development'
  },
  {
    icon:     FaGraduationCap,
    image:    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500&q=80',
    title:    'Final Year Project',
    desc:     'Complete projects for MCA, BCA, B.Tech with code, documentation and PPT.',
    color:    '#10b981',
    bg:       'rgba(16,185,129,0.1)',
    features: ['Complete Source Code', 'Documentation', 'PPT Presentation', 'Viva Preparation', 'Plagiarism Free'],
    tech:     ['React.js', 'Python', 'Java', 'Node.js', 'MySQL'],
    delivery: '10 Days',
    category: 'Final Year Project'
  },
  {
    icon:     FaBook,
    image:    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80',
    title:    'IT Notes & Study Material',
    desc:     'Detailed semester-wise notes for MCA, BCA, B.Tech in PDF format.',
    color:    '#f59e0b',
    bg:       'rgba(245,158,11,0.1)',
    features: ['PDF Format', 'Hindi & English', 'Semester Wise', 'Previous Year Questions', 'Instant Download'],
    tech:     ['All Subjects Covered'],
    delivery: 'Instant',
    category: 'Notes'
  },
  {
    icon:     FaFileAlt,
    image:    'https://images.unsplash.com/photo-1568667256549-094345857637?w=500&q=80',
    title:    'Project Documentation',
    desc:     'SRS, DFD, ER Diagram, Synopsis and complete project reports.',
    color:    '#ef4444',
    bg:       'rgba(239,68,68,0.1)',
    features: ['SRS Document', 'ER Diagram', 'DFD Charts', 'Synopsis', 'IEEE Format'],
    tech:     ['MS Word', 'LaTeX', 'Draw.io'],
    delivery: '5 Days',
    category: 'Documentation'
  },
  {
    icon:     FaPaintBrush,
    image:    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    title:    'Graphic Design',
    desc:     'Logo, social media banners, business cards and brand identity design.',
    color:    '#ec4899',
    bg:       'rgba(236,72,153,0.1)',
    features: ['Logo Design', 'Business Card', 'Social Media Banner', 'Brand Identity', 'Unlimited Revisions'],
    tech:     ['Figma', 'Adobe Illustrator', 'Canva Pro'],
    delivery: '3 Days',
    category: 'Graphic Design'
  },
  {
    icon:     FaIdCard,
    image:    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80',
    title:    'Resume & Portfolio',
    desc:     'ATS-friendly professional resume and portfolio website.',
    color:    '#06b6d4',
    bg:       'rgba(6,182,212,0.1)',
    features: ['ATS Friendly Resume', 'Professional Design', 'Portfolio Website', 'LinkedIn Optimization'],
    tech:     ['React.js', 'Figma', 'MS Word'],
    delivery: '3 Days',
    category: 'Resume'
  },
  {
    icon:     FaBriefcase,
    image:    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    title:    'Internship Projects',
    desc:     'Complete certificate-worthy projects for college internships.',
    color:    '#84cc16',
    bg:       'rgba(132,204,22,0.1)',
    features: ['Complete Source Code', 'Documentation', 'Certificate Support', 'GitHub Setup'],
    tech:     ['React.js', 'Node.js', 'Python', 'Java'],
    delivery: '7 Days',
    category: 'Internship'
  },
  {
    icon:     FaLaptopCode,
    image:    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    title:    'Software Development',
    desc:     'Custom software for businesses — ERP, CRM, Inventory Management.',
    color:    '#f97316',
    bg:       'rgba(249,115,22,0.1)',
    features: ['Custom Features', 'User Management', 'Reports & Analytics', 'Training Support'],
    tech:     ['React.js', 'Node.js', 'Electron.js', 'MySQL'],
    delivery: '30 Days',
    category: 'Software'
  },
];

const categories = ['All', 'Web Development', 'App Development', 'Final Year Project', 'Notes', 'Documentation', 'Graphic Design', 'Resume', 'Internship', 'Software'];

export default function Services() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? services
    : services.filter(s => s.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.07
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.2) 0%, transparent 70%)'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc', fontSize: '13px', marginBottom: '20px'
          }}>
            ⚡ Professional IT Services
          </span>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800,
            color: '#fff', marginBottom: '20px', lineHeight: 1.1
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Services
            </span>
          </h1>
          <p style={{
            color: '#9ca3af', fontSize: '18px',
            maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7
          }}>
            Professional IT services for students and businesses at affordable prices.
            Quality work, on-time delivery!
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 32px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  border: 'none', color: '#fff', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 8px 20px rgba(37,211,102,0.3)'
                }}>
                <FaWhatsapp /> Chat on WhatsApp
              </motion.button>
            </a>
            <a href="mailto:ghagitakshak@gmail.com">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 32px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none', color: '#fff', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 8px 20px rgba(99,102,241,0.3)'
                }}>
                <MdEmail /> Send Email
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Filter */}
      <section style={{ padding: '20px 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {categories.map(cat => (
            <motion.button key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 20px', borderRadius: '100px', cursor: 'pointer',
                border: filter === cat ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: filter === cat
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(255,255,255,0.03)',
                color: filter === cat ? '#fff' : '#9ca3af',
                fontSize: '13px', fontWeight: 500, transition: 'all 0.2s'
              }}>
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, boxShadow: `0 24px 48px ${service.color}30` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>

              {/* Image */}
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, rgba(15,15,26,0.9) 0%, transparent 60%)`
                }} />
                {/* Icon */}
                <div style={{
                  position: 'absolute', bottom: '16px', left: '16px',
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${service.color}60`
                }}>
                  <service.icon size={22} style={{ color: service.color }} />
                </div>
                {/* Category Badge */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  padding: '4px 12px', borderRadius: '100px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '11px', color: service.color, fontWeight: 600,
                  border: `1px solid ${service.color}40`
                }}>
                  {service.category}
                </div>
                {/* Delivery Badge */}
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  padding: '4px 12px', borderRadius: '100px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '11px', color: '#fff', fontWeight: 500
                }}>
                  ⏱ {service.delivery}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  color: '#fff', fontWeight: 700, fontSize: '20px', marginBottom: '10px'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: '#9ca3af', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px'
                }}>
                  {service.desc}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '16px' }}>
                  {service.features.slice(0, 4).map((f, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px'
                    }}>
                      <FaCheckCircle size={12} style={{ color: service.color, flexShrink: 0 }} />
                      <span style={{ color: '#d1d5db', fontSize: '13px' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {service.tech.map((t, j) => (
                    <span key={j} style={{
                      padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
                      background: service.bg,
                      border: `1px solid ${service.color}30`,
                      color: service.color
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer"
                    style={{ flex: 1 }}>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '11px',
                        background: 'rgba(37,211,102,0.1)',
                        border: '1px solid rgba(37,211,102,0.3)',
                        borderRadius: '10px', color: '#25d366',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '6px'
                      }}>
                      <FaWhatsapp /> WhatsApp
                    </motion.button>
                  </a>

                  <Link
                      to={`/order?service=${i + 1}`}
                         onClick={e => e.stopPropagation()}
                       style={{ flex: 1 }}
                        >
                         <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                          width: '100%', padding: '10px 16px',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: '#fff', border: 'none', borderRadius: '10px',
                          cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                           }}
  >
                          Order Now →
                          </motion.button>
                          </Link>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}