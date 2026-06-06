import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard, FaBriefcase,
  FaLaptopCode, FaWhatsapp, FaCheckCircle,
  FaExternalLinkAlt, FaEye, FaShoppingCart,
  FaHospital, FaUniversity, FaBriefcase as FaWork
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Layout from '../components/common/Layout';

const services = [
  {
    icon: FaCode,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&q=80',
    title: 'Custom Website Development',
    desc: 'Modern, responsive websites built with React.js, Node.js and MySQL.',
    color: '#6366f1', bg: 'rgba(99,102,241,0.1)',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Admin Panel', 'Contact Form', '1 Year Support'],
    tech: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    delivery: '14 Days', category: 'Web Development'
  },
  {
    icon: FaMobileAlt,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps for Android and iOS using React Native.',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',
    features: ['Android & iOS', 'Push Notifications', 'Payment Integration', 'Admin Dashboard', 'Play Store Upload'],
    tech: ['React Native', 'Node.js', 'Firebase'],
    delivery: '21 Days', category: 'App Development'
  },
  {
    icon: FaGraduationCap,
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500&q=80',
    title: 'Final Year Project',
    desc: 'Complete projects for MCA, BCA, B.Tech with code, documentation and PPT.',
    color: '#10b981', bg: 'rgba(16,185,129,0.1)',
    features: ['Complete Source Code', 'Documentation', 'PPT Presentation', 'Viva Preparation', 'Plagiarism Free'],
    tech: ['React.js', 'Python', 'Java', 'Node.js', 'MySQL'],
    delivery: '10 Days', category: 'Final Year Project'
  },
  {
    icon: FaBook,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80',
    title: 'IT Notes & Study Material',
    desc: 'Detailed semester-wise notes for MCA, BCA, B.Tech in PDF format.',
    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',
    features: ['PDF Format', 'Hindi & English', 'Semester Wise', 'Previous Year Questions', 'Instant Download'],
    tech: ['All Subjects Covered'],
    delivery: 'Instant', category: 'Notes'
  },
  {
    icon: FaFileAlt,
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=500&q=80',
    title: 'Project Documentation',
    desc: 'SRS, DFD, ER Diagram, Synopsis and complete project reports.',
    color: '#ef4444', bg: 'rgba(239,68,68,0.1)',
    features: ['SRS Document', 'ER Diagram', 'DFD Charts', 'Synopsis', 'IEEE Format'],
    tech: ['MS Word', 'LaTeX', 'Draw.io'],
    delivery: '5 Days', category: 'Documentation'
  },
  {
    icon: FaPaintBrush,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    title: 'Graphic Design',
    desc: 'Logo, social media banners, business cards and brand identity design.',
    color: '#ec4899', bg: 'rgba(236,72,153,0.1)',
    features: ['Logo Design', 'Business Card', 'Social Media Banner', 'Brand Identity', 'Unlimited Revisions'],
    tech: ['Figma', 'Adobe Illustrator', 'Canva Pro'],
    delivery: '3 Days', category: 'Graphic Design'
  },
  {
    icon: FaIdCard,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80',
    title: 'Resume & Portfolio',
    desc: 'ATS-friendly professional resume and portfolio website.',
    color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',
    features: ['ATS Friendly Resume', 'Professional Design', 'Portfolio Website', 'LinkedIn Optimization'],
    tech: ['React.js', 'Figma', 'MS Word'],
    delivery: '3 Days', category: 'Resume'
  },
  {
    icon: FaBriefcase,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    title: 'Internship Projects',
    desc: 'Complete certificate-worthy projects for college internships.',
    color: '#84cc16', bg: 'rgba(132,204,22,0.1)',
    features: ['Complete Source Code', 'Documentation', 'Certificate Support', 'GitHub Setup'],
    tech: ['React.js', 'Node.js', 'Python', 'Java'],
    delivery: '7 Days', category: 'Internship'
  },
  {
    icon: FaLaptopCode,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    title: 'Software Development',
    desc: 'Custom software for businesses — ERP, CRM, Inventory Management.',
    color: '#f97316', bg: 'rgba(249,115,22,0.1)',
    features: ['Custom Features', 'User Management', 'Reports & Analytics', 'Training Support'],
    tech: ['React.js', 'Node.js', 'Electron.js', 'MySQL'],
    delivery: '30 Days', category: 'Software'
  },
];

const categories = ['All', 'Web Development', 'App Development', 'Final Year Project', 'Notes', 'Documentation', 'Graphic Design', 'Resume', 'Internship', 'Software'];

// ── Sample Websites ──
const sampleWebsites = [
  {
    title: 'E-Commerce Store',
    desc: 'Full featured online store with cart, payment & admin panel',
    icon: FaShoppingCart,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    tags: ['React.js', 'Node.js', 'MySQL'],
    price: '₹4,999 – ₹12,999',
    link: 'https://your-sample-ecommerce.vercel.app', // 👈 yahan apna link daalo
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80'
  },
  {
    title: 'Hospital Management',
    desc: 'Doctor appointment, patient records & billing system',
    icon: FaHospital,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    tags: ['React.js', 'Node.js', 'MySQL'],
    price: '₹6,999 – ₹15,999',
    link: 'https://your-sample-hospital.vercel.app',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80'
  },
  {
    title: 'Portfolio Website',
    desc: 'Modern developer/freelancer portfolio with animations',
    icon: FaWork,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    tags: ['React.js', 'Framer Motion'],
    price: '₹999 – ₹2,999',
    link: 'https://your-sample-portfolio.vercel.app',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'
  },
  {
    title: 'College/University Site',
    desc: 'Full college website with departments, notices & gallery',
    icon: FaUniversity,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    tags: ['React.js', 'Node.js'],
    price: '₹5,999 – ₹14,999',
    link: 'https://your-sample-college.vercel.app',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80'
  },
];

// ── Available Projects (Final Year) ──
const availableProjects = [
  {
    title: 'Online Exam System',
    course: 'MCA / BCA',
    desc: 'MCQ based exam portal with timer, result & admin panel',
    color: '#6366f1',
    price: '₹1,999 – ₹3,999',
    tags: ['React.js', 'Node.js', 'MySQL'],
    delivery: '3 Days'
  },
  {
    title: 'Library Management',
    course: 'BCA / B.Tech',
    desc: 'Book issue, return, fine management system',
    color: '#10b981',
    price: '₹1,499 – ₹2,999',
    tags: ['React.js', 'MySQL'],
    delivery: '3 Days'
  },
  {
    title: 'Blood Bank System',
    course: 'MCA / BCA',
    desc: 'Donor registration, blood request & availability tracking',
    color: '#ef4444',
    price: '₹1,999 – ₹3,499',
    tags: ['React.js', 'Node.js'],
    delivery: '4 Days'
  },
  {
    title: 'Hostel Management',
    course: 'MCA / B.Tech',
    desc: 'Room allotment, fee payment & complaint system',
    color: '#f59e0b',
    price: '₹2,499 – ₹4,999',
    tags: ['React.js', 'Node.js', 'MySQL'],
    delivery: '5 Days'
  },
  {
    title: 'Job Portal',
    course: 'MCA / BCA',
    desc: 'Job posting, resume upload & application tracking',
    color: '#8b5cf6',
    price: '₹2,999 – ₹5,999',
    tags: ['React.js', 'Node.js'],
    delivery: '7 Days'
  },
  {
    title: 'Food Ordering App',
    course: 'B.Tech / MCA',
    desc: 'Restaurant listing, cart, Razorpay payment integration',
    color: '#ec4899',
    price: '₹3,499 – ₹6,999',
    tags: ['React Native', 'Node.js'],
    delivery: '7 Days'
  },
];

// ── Sample Documentation ──
const sampleDocs = [
  { title: 'SRS Document',       desc: 'Software Requirements Specification — IEEE format', price: '₹299 – ₹699',  color: '#6366f1' },
  { title: 'Project Synopsis',   desc: 'Complete synopsis with objectives & methodology',    price: '₹199 – ₹499',  color: '#10b981' },
  { title: 'ER Diagram + DFD',   desc: 'Entity Relation & Data Flow Diagrams',              price: '₹399 – ₹799',  color: '#f59e0b' },
  { title: 'Full Project Report',desc: 'Complete report — SRS + diagrams + code snippets',  price: '₹799 – ₹1,999', color: '#ec4899' },
];

export default function Services() {
  const [filter, setFilter] = useState('All');
  const [winW]              = useState(window.innerWidth);
  const isMobile            = winW < 640;

  const filtered = filter === 'All' ? services : services.filter(s => s.category === filter);

  return (
    <Layout>

      {/* ── Hero ── */}
      <section style={{
        padding: isMobile ? '90px 20px 50px' : '100px 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.2) 0%, transparent 70%)'
        }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc', fontSize: '13px', marginBottom: '16px'
          }}>⚡ Professional IT Services</span>
          <h1 style={{
            fontSize: isMobile ? '32px' : 'clamp(36px,5vw,64px)',
            fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.15
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg,#6366f1,#a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Services</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '17px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Professional IT services for students and businesses at affordable prices.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '13px 28px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#25d366,#128c7e)',
                  border: 'none', color: '#fff', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                <FaWhatsapp /> Chat on WhatsApp
              </motion.button>
            </a>
            <a href="mailto:ghagitakshak@gmail.com">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '13px 28px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  border: 'none', color: '#fff', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                <MdEmail /> Send Email
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Filter ── */}
      <section style={{ padding: '20px 20px 36px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <motion.button key={cat} whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 18px', borderRadius: '100px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                border: filter === cat ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: filter === cat ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.03)',
                color: filter === cat ? '#fff' : '#9ca3af',
                fontSize: '13px', fontWeight: 500
              }}>
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(300px,1fr))',
          gap: isMobile ? '16px' : '24px'
        }}>
          {filtered.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, boxShadow: `0 20px 48px ${service.color}30` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', overflow: 'hidden'
              }}>
              <div style={{ height: isMobile ? '160px' : '200px', overflow: 'hidden', position: 'relative' }}>
                <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}
                  src={service.image} alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,15,26,0.9) 0%,transparent 60%)' }} />
                <div style={{
                  position: 'absolute', bottom: '14px', left: '14px',
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${service.color}60`
                }}>
                  <service.icon size={20} style={{ color: service.color }} />
                </div>
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  padding: '3px 10px', borderRadius: '100px',
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                  fontSize: '10px', color: service.color, fontWeight: 600,
                  border: `1px solid ${service.color}40`
                }}>{service.category}</div>
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  padding: '3px 10px', borderRadius: '100px',
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                  fontSize: '10px', color: '#fff', fontWeight: 500
                }}>⏱ {service.delivery}</div>
              </div>

              <div style={{ padding: isMobile ? '16px' : '22px' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '16px' : '18px', marginBottom: '8px' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, marginBottom: '14px' }}>
                  {service.desc}
                </p>
                <div style={{ marginBottom: '14px' }}>
                  {service.features.slice(0, 4).map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
                      <FaCheckCircle size={11} style={{ color: service.color, flexShrink: 0 }} />
                      <span style={{ color: '#d1d5db', fontSize: '12px' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {service.tech.map((t, j) => (
                    <span key={j} style={{
                      padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
                      background: service.bg, border: `1px solid ${service.color}30`, color: service.color
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                    <motion.button whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                        borderRadius: '10px', color: '#25d366', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}><FaWhatsapp /> WhatsApp</motion.button>
                  </a>
                  <Link to={`/order?service=${i + 1}`} style={{ flex: 1 }}>
                    <motion.button whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '10px',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        color: '#fff', border: 'none', borderRadius: '10px',
                        cursor: 'pointer', fontSize: '12px', fontWeight: 600
                      }}>Order Now →</motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          ── SAMPLE WEBSITES SECTION ──
      ════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 24px',
        background: 'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.03))',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        borderBottom: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '52px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: '13px', marginBottom: '14px'
            }}>🌐 Sample Work</span>
            <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(24px,4vw,42px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Sample{' '}
              <span style={{
                background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Websites & Apps</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
              Live demos of websites we build — click to preview
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: isMobile ? '14px' : '20px'
          }}>
            {sampleWebsites.map((site, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, boxShadow: `0 16px 40px ${site.color}20` }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px', overflow: 'hidden'
                }}>
                {/* Image */}
                <div style={{ height: isMobile ? '140px' : '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={site.image} alt={site.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,15,26,0.85),transparent 50%)' }} />
                  {/* Price tag */}
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    padding: '4px 12px', borderRadius: '100px',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${site.color}50`,
                    color: site.color, fontSize: '11px', fontWeight: 700
                  }}>{site.price}</div>
                </div>

                <div style={{ padding: isMobile ? '14px' : '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: site.bg, border: `1px solid ${site.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <site.icon size={16} style={{ color: site.color }} />
                    </div>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '14px' : '16px', margin: 0 }}>
                      {site.title}
                    </h3>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>
                    {site.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {site.tags.map((t, j) => (
                      <span key={j} style={{
                        padding: '3px 10px', borderRadius: '6px', fontSize: '10px',
                        background: site.bg, border: `1px solid ${site.color}30`, color: site.color
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={site.link} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                      <motion.button whileTap={{ scale: 0.96 }}
                        style={{
                          width: '100%', padding: '9px',
                          background: site.bg, border: `1px solid ${site.color}40`,
                          borderRadius: '9px', color: site.color, cursor: 'pointer',
                          fontSize: '12px', fontWeight: 600,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                        }}>
                        <FaEye size={11} /> Live Preview
                      </motion.button>
                    </a>
                    <a href={`https://wa.me/917020521466?text=Hi! I want a similar ${site.title}`}
                      target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                      <motion.button whileTap={{ scale: 0.96 }}
                        style={{
                          width: '100%', padding: '9px',
                          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                          border: 'none', borderRadius: '9px', color: '#fff', cursor: 'pointer',
                          fontSize: '12px', fontWeight: 600,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                        }}>
                        <FaWhatsapp size={11} /> Order This
                      </motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ── AVAILABLE PROJECTS SECTION ──
      ════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '52px' }}>
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#34d399', fontSize: '13px', marginBottom: '14px'
          }}>🎓 Ready to Deliver</span>
          <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(24px,4vw,42px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
            Available{' '}
            <span style={{
              background: 'linear-gradient(135deg,#10b981,#34d399)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Final Year Projects</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
            Ready-made projects for MCA, BCA, B.Tech — with code + docs + PPT
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? '12px' : '18px'
        }}>
          {availableProjects.map((proj, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: `0 14px 36px ${proj.color}20` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${proj.color}20`,
                borderRadius: '16px', padding: isMobile ? '16px' : '20px'
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600,
                  background: `${proj.color}15`, border: `1px solid ${proj.color}30`, color: proj.color
                }}>{proj.course}</span>
                <span style={{
                  padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700,
                  background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399'
                }}>⚡ {proj.delivery}</span>
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '14px' : '15px', marginBottom: '6px' }}>
                {proj.title}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>
                {proj.desc}
              </p>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {proj.tags.map((t, j) => (
                  <span key={j} style={{
                    padding: '2px 8px', borderRadius: '5px', fontSize: '10px',
                    background: `${proj.color}12`, border: `1px solid ${proj.color}25`, color: proj.color
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '14px' : '15px' }}>
                  {proj.price}
                </span>
                <a href={`https://wa.me/917020521466?text=Hi! I want the ${proj.title} project`}
                  target="_blank" rel="noreferrer">
                  <motion.button whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '7px 14px', borderRadius: '8px',
                      background: `linear-gradient(135deg,${proj.color},${proj.color}cc)`,
                      border: 'none', color: '#fff', cursor: 'pointer',
                      fontSize: '11px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '5px'
                    }}>
                    <FaWhatsapp size={10} /> Get Now
                  </motion.button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          ── SAMPLE DOCUMENTATION SECTION ──
      ════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 24px',
        background: 'linear-gradient(135deg,rgba(239,68,68,0.05),rgba(99,102,241,0.04))',
        borderTop: '1px solid rgba(239,68,68,0.1)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171', fontSize: '13px', marginBottom: '14px'
            }}>📄 Documentation</span>
            <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Sample{' '}
              <span style={{
                background: 'linear-gradient(135deg,#ef4444,#f97316)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Documentation</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
              Professional project documents — IEEE format, plagiarism free
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
            gap: isMobile ? '12px' : '16px'
          }}>
            {sampleDocs.map((doc, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: `0 12px 32px ${doc.color}20` }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${doc.color}20`,
                  borderRadius: '14px', padding: isMobile ? '14px' : '20px',
                  textAlign: 'center'
                }}>
                <div style={{
                  width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px',
                  borderRadius: '12px', background: `${doc.color}15`,
                  border: `1px solid ${doc.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <FaFileAlt size={isMobile ? 18 : 22} style={{ color: doc.color }} />
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '12px' : '14px', marginBottom: '6px', lineHeight: 1.3 }}>
                  {doc.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: 1.5, marginBottom: '12px' }}>
                  {doc.desc}
                </p>
                <p style={{ color: doc.color, fontWeight: 800, fontSize: isMobile ? '12px' : '14px', marginBottom: '12px' }}>
                  {doc.price}
                </p>
                <a href={`https://wa.me/917020521466?text=Hi! I need ${doc.title}`}
                  target="_blank" rel="noreferrer">
                  <motion.button whileTap={{ scale: 0.95 }}
                    style={{
                      width: '100%', padding: '7px',
                      background: `${doc.color}20`, border: `1px solid ${doc.color}40`,
                      borderRadius: '8px', color: doc.color, cursor: 'pointer',
                      fontSize: '11px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                    }}>
                    <FaWhatsapp size={10} /> Order
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
}