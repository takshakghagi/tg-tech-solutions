import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGlobe, FaEye, FaTimes,
  FaCode, FaMobileAlt, FaGraduationCap,
  FaPaintBrush, FaStar, FaWhatsapp,
  FaFileAlt, FaLock, FaExternalLinkAlt
} from 'react-icons/fa';
import Layout from '../components/common/Layout';
import API from '../services/api';

const categories = ['All', 'Web Development', 'App Development', 'Final Year Project', 'Graphic Design'];

const portfolioProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform — ShopEasy',
    short_desc: 'Full-stack e-commerce with payment integration',
    description: 'Complete e-commerce platform with product management, cart, payment gateway, admin panel and order tracking system.',
    category: 'web_development',
    techs: ['React.js', 'Node.js', 'MySQL', 'Razorpay', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    client_name: 'Rahul Sharma',
    client_review: 'Website exactly waisi bani jaise hum chahte the. On-time delivery and professional work!',
    is_featured: true
  },
  {
    id: 2,
    title: 'Library Management System',
    short_desc: 'Complete MCA final year project',
    description: 'Complete library management system for MCA final year project with book issue/return, fine calculation and admin panel.',
    category: 'final_year_project',
    techs: ['React.js', 'Node.js', 'MySQL', 'JWT Auth'],
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    client_name: 'Priya Singh',
    client_review: 'Project time pe deliver hua. University mein A grade mili. Highly recommended!',
    is_featured: true
  },
  {
    id: 3,
    title: 'Restaurant Mobile App',
    short_desc: 'Cross-platform restaurant ordering app',
    description: 'React Native cross-platform restaurant app with menu, cart, order tracking and payment integration.',
    category: 'app_development',
    techs: ['React Native', 'Node.js', 'Firebase', 'Razorpay'],
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    client_name: 'Amit Patel',
    client_review: 'App bahut smooth hai. Android aur iOS dono pe perfectly kaam karta hai!',
    is_featured: true
  },
  {
    id: 4,
    title: 'Hospital Management System',
    short_desc: 'Complete hospital management solution',
    description: 'Full hospital management system with patient records, doctor appointments, billing and pharmacy management.',
    category: 'web_development',
    techs: ['React.js', 'Node.js', 'MySQL', 'Chart.js'],
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
    client_name: 'Dr. Sneha Patel',
    client_review: 'System bahut efficient hai. Staff ko train karna bhi easy tha!',
    is_featured: false
  },
  {
    id: 5,
    title: 'Brand Identity Design',
    short_desc: 'Complete brand identity for TechStart',
    description: 'Logo design, brand guidelines, business cards, social media kit and complete brand identity for TechStart startup.',
    category: 'graphic_design',
    techs: ['Figma', 'Adobe Illustrator', 'Canva Pro'],
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    client_name: 'Rohan Verma',
    client_review: 'Logo aur brand identity ekdum perfect bana. Our startup looks very professional!',
    is_featured: false
  },
  {
    id: 6,
    title: 'Student Portal — CollegeHub',
    short_desc: 'B.Tech final year project',
    description: 'Complete student portal with attendance tracking, marks management, notices and faculty interaction system.',
    category: 'final_year_project',
    techs: ['React.js', 'PHP', 'MySQL', 'Bootstrap'],
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    client_name: 'Vikash Kumar',
    client_review: 'Project bahut impressive tha. Professor ne bhi appreciate kiya!',
    is_featured: false
  },
];

const categoryColors  = { web_development: '#6366f1', app_development: '#8b5cf6', final_year_project: '#10b981', graphic_design: '#ec4899' };
const categoryLabels  = { web_development: 'Web Development', app_development: 'App Development', final_year_project: 'Final Year Project', graphic_design: 'Graphic Design' };
const categoryIcons   = { web_development: FaCode, app_development: FaMobileAlt, final_year_project: FaGraduationCap, graphic_design: FaPaintBrush };

export default function Portfolio() {
  const [filter,   setFilter]   = useState('All');
  const [selected, setSelected] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [projects, setProjects] = useState([]);
  const [docs,     setDocs]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [winW,     setWinW]     = useState(window.innerWidth);

  const isMobile = winW < 640;

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [w, p, d] = await Promise.all([
          API.get('/portfolio/websites'),
          API.get('/portfolio/projects'),
          API.get('/portfolio/docs'),
        ]);
        setWebsites(w.data.data || []);
        setProjects(p.data.data || []);
        setDocs(d.data.data    || []);
      } catch (err) {
        console.error('Portfolio fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = filter === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(p => categoryLabels[p.category] === filter);

  return (
    <Layout>

      {/* ── Hero ── */}
      <section style={{
        padding: isMobile ? '90px 20px 50px' : '100px 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05
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
            color: '#a5b4fc', fontSize: '13px', marginBottom: '20px'
          }}>Our Portfolio</span>
          <h1 style={{ fontSize: isMobile ? '32px' : 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Our{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Best Work
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '18px', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Explore our portfolio of successful projects delivered to happy clients
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '20px' : '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients'      },
              { value: '4.9',  label: 'Average Rating'     },
              { value: '3+',   label: 'Years Experience'   },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 800, background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '13px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Filter ── */}
      <section style={{ padding: '0 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {categories.map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 24px', borderRadius: '100px', cursor: 'pointer',
                fontSize: '13px', fontWeight: 500,
                border: filter === cat ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: filter === cat ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'rgba(255,255,255,0.03)',
                color: filter === cat ? '#fff' : '#9ca3af',
              }}>
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Portfolio Grid ── */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(340px,1fr))',
          gap: '24px'
        }}>
          {filtered.map((project, i) => {
            const color = categoryColors[project.category] || '#6366f1';
            const Icon  = categoryIcons[project.category]  || FaCode;
            return (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${color}30` }}
                onClick={() => setSelected(project)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', overflow: 'hidden', cursor: 'pointer'
                }}>
                <div style={{ height: isMobile ? '180px' : '220px', overflow: 'hidden', position: 'relative' }}>
                  <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }}
                    src={project.thumbnail} alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,15,26,0.95) 0%,transparent 50%)' }} />
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    padding: '5px 12px', borderRadius: '100px',
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
                    border: `1px solid ${color}50`,
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <Icon size={12} style={{ color }} />
                    <span style={{ fontSize: '11px', color, fontWeight: 600 }}>{categoryLabels[project.category]}</span>
                  </div>
                  {project.is_featured && (
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      padding: '4px 10px', borderRadius: '100px',
                      background: 'rgba(245,158,11,0.9)',
                      fontSize: '11px', color: '#fff', fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}>
                      <FaStar size={10} /> Featured
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '16px' : '18px', marginBottom: '8px' }}>{project.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '14px' }}>{project.short_desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                    {project.techs.map((tech, j) => (
                      <span key={j} style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', background: `${color}15`, border: `1px solid ${color}30`, color }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${color},${color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                      {project.client_name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600, margin: 0 }}>{project.client_name}</p>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, k) => <FaStar key={k} size={10} style={{ color: '#f59e0b' }} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════
          ── SAMPLE WEBSITES SECTION ──
      ════════════════════════════════ */}
      {(websites.length > 0 || loading) && (
        <section style={{
          padding: isMobile ? '60px 20px' : '80px 24px',
          background: 'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.03))',
          borderTop: '1px solid rgba(99,102,241,0.1)',
          borderBottom: '1px solid rgba(99,102,241,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '52px' }}>
              <span style={{
                display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                color: '#a5b4fc', fontSize: '13px', marginBottom: '14px'
              }}>🌐 Sample Work</span>
              <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(24px,4vw,42px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                Sample{' '}
                <span style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Websites & Apps
                </span>
              </h2>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
                Live demos — touch to preview
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading...</div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
                gap: isMobile ? '14px' : '20px'
              }}>
                {websites.map((site, i) => {
                  const tagArr   = site.tags ? site.tags.split(',') : [];
                  const priceStr = `₹${Number(site.price_min).toLocaleString()} – ₹${Number(site.price_max).toLocaleString()}`;
                  return (
                    <motion.div key={site.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -5, boxShadow: `0 16px 40px ${site.color}20` }}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', overflow: 'hidden' }}>
                      {/* Image */}
                      <div style={{ height: isMobile ? '140px' : '180px', overflow: 'hidden', position: 'relative' }}>
                        {site.image_url
                          ? <img src={site.image_url} alt={site.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${site.color}30,${site.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaGlobe size={48} style={{ color: site.color, opacity: 0.5 }} /></div>
                        }
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,15,26,0.85),transparent 50%)' }} />
                        <div style={{
                          position: 'absolute', top: '10px', right: '10px',
                          padding: '4px 12px', borderRadius: '100px',
                          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                          border: `1px solid ${site.color}50`,
                          color: site.color, fontSize: '11px', fontWeight: 700
                        }}>{priceStr}</div>
                        <div style={{
                          position: 'absolute', top: '10px', left: '10px',
                          padding: '3px 10px', borderRadius: '100px',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff', fontSize: '10px', fontWeight: 600
                        }}>{site.type === 'app' ? '📱 App' : '🌐 Website'}</div>
                      </div>

                      <div style={{ padding: isMobile ? '14px' : '18px' }}>
                        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '14px' : '16px', marginBottom: '6px' }}>{site.title}</h3>
                        <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{site.description}</p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {tagArr.map((t, j) => (
                            <span key={j} style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '10px', background: `${site.color}15`, border: `1px solid ${site.color}30`, color: site.color }}>{t.trim()}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {site.live_link && (
                            <a href={site.live_link} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                              <motion.button whileTap={{ scale: 0.96 }}
                                style={{
                                  width: '100%', padding: '9px',
                                  background: `${site.color}15`, border: `1px solid ${site.color}40`,
                                  borderRadius: '9px', color: site.color, cursor: 'pointer',
                                  fontSize: '12px', fontWeight: 600,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
                                }}>
                                <FaEye size={11} /> Live Preview
                              </motion.button>
                            </a>
                          )}
                          <a href={`https://wa.me/917020521466?text=Hi! I want a similar ${site.title}`} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
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
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════
          ── AVAILABLE PROJECTS ──
      ════════════════════════════════ */}
      {(projects.length > 0 || loading) && (
        <section style={{ padding: isMobile ? '60px 20px' : '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '52px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
              color: '#34d399', fontSize: '13px', marginBottom: '14px'
            }}>🎓 Ready to Deliver</span>
            <h2 style={{ fontSize: isMobile ? '24px' : 'clamp(24px,4vw,42px)', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              Available{' '}
              <span style={{ background: 'linear-gradient(135deg,#10b981,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Final Year Projects
              </span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
              Ready-made projects — code + docs + PPT
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
              gap: isMobile ? '12px' : '18px'
            }}>
              {projects.map((proj, i) => {
                const projTags  = proj.tags ? proj.tags.split(',') : [];
                const projPrice = `₹${Number(proj.price_min).toLocaleString()} – ₹${Number(proj.price_max).toLocaleString()}`;
                return (
                  <motion.div key={proj.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: `0 14px 36px ${proj.color}20` }}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${proj.color}20`,
                      borderRadius: '16px', padding: isMobile ? '16px' : '20px'
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 600, background: `${proj.color}15`, border: `1px solid ${proj.color}30`, color: proj.color }}>{proj.course}</span>
                      <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>⚡ {proj.delivery}</span>
                    </div>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '14px' : '15px', marginBottom: '6px' }}>{proj.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{proj.description}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {projTags.map((t, j) => (
                        <span key={j} style={{ padding: '2px 8px', borderRadius: '5px', fontSize: '10px', background: `${proj.color}12`, border: `1px solid ${proj.color}25`, color: proj.color }}>{t.trim()}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '13px' : '15px' }}>{projPrice}</span>
                      <a href={`https://wa.me/917020521466?text=Hi! I want the ${proj.title} project`} target="_blank" rel="noreferrer">
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
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ════════════════════════════════
          ── DOCUMENTATION ──
      ════════════════════════════════ */}
      {(docs.length > 0 || loading) && (
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
                <span style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Documentation
                </span>
              </h2>
              <p style={{ color: '#9ca3af', fontSize: isMobile ? '13px' : '16px' }}>
                Professional project documents — IEEE format, plagiarism free
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading...</div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
                gap: isMobile ? '12px' : '16px'
              }}>
                {docs.map((doc, i) => {
                  const docPrice = `₹${Number(doc.price_min).toLocaleString()} – ₹${Number(doc.price_max).toLocaleString()}`;
                  return (
                    <motion.div key={doc.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4, boxShadow: `0 12px 32px ${doc.color}20` }}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${doc.color}20`,
                        borderRadius: '14px', padding: isMobile ? '14px' : '20px', textAlign: 'center'
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
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '12px' : '14px', marginBottom: '6px', lineHeight: 1.3 }}>{doc.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: 1.5, marginBottom: '12px' }}>{doc.description}</p>
                      <p style={{ color: doc.color, fontWeight: 800, fontSize: isMobile ? '12px' : '14px', marginBottom: '12px' }}>{docPrice}</p>
                      <a href={`https://wa.me/917020521466?text=Hi! I need ${doc.title}`} target="_blank" rel="noreferrer">
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
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '24px', maxWidth: '600px', width: '100%', overflow: 'hidden' }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img src={selected.thumbnail} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(26,26,46,1) 0%,transparent 60%)' }} />
                <button onClick={() => setSelected(null)}
                  style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaTimes size={16} />
                </button>
              </div>
              <div style={{ padding: '28px' }}>
                <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '22px', marginBottom: '10px' }}>{selected.title}</h2>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{selected.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {selected.techs.map((tech, i) => (
                    <span key={i} style={{ padding: '5px 14px', borderRadius: '8px', fontSize: '13px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>{tech}</span>
                  ))}
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', marginBottom: '20px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                    {[...Array(5)].map((_, i) => <FaStar key={i} size={14} style={{ color: '#f59e0b' }} />)}
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic' }}>"{selected.client_review}"</p>
                  <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}>— {selected.client_name}</p>
                </div>
                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                  <motion.button whileHover={{ scale: 1.03 }}
                    style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#25d366,#128c7e)', border: 'none', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <FaWhatsapp /> Get Similar Project
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 24px', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div whileHover={{ scale: 1.01 }}
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '24px', padding: isMobile ? '36px 20px' : '48px 32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(22px,4vw,36px)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              Want a Similar Project?
            </h2>
            <p style={{ color: '#9ca3af', fontSize: isMobile ? '14px' : '16px', marginBottom: '28px' }}>
              Contact us and let's build something amazing together!
            </p>
            <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{ padding: '14px 36px', borderRadius: '12px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <FaWhatsapp /> Start Your Project
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
