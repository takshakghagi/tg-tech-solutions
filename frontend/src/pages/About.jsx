import { motion } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaGraduationCap, FaBook,
  FaWhatsapp, FaLinkedin, FaGithub, FaInstagram,
  FaStar, FaCheckCircle, FaRocket, FaHeart,
  FaEnvelope, FaMapMarkerAlt, FaPhone
} from 'react-icons/fa';
import Layout from '../components/common/Layout';
import { Link } from 'react-router-dom';

const skills = [
  { name: 'React.js',      level: 95, color: '#61dafb' },
  { name: 'Node.js',       level: 90, color: '#68a063' },
  { name: 'MySQL',         level: 85, color: '#f59e0b' },
  { name: 'React Native',  level: 80, color: '#8b5cf6' },
  { name: 'Python',        level: 75, color: '#3776ab' },
  { name: 'Figma',         level: 85, color: '#ec4899' },
  { name: 'JavaScript',    level: 92, color: '#f7df1e' },
  { name: 'Tailwind CSS',  level: 90, color: '#06b6d4' },
];

const services = [
  { icon: FaCode,          title: 'Web Development',    color: '#6366f1' },
  { icon: FaMobileAlt,     title: 'App Development',    color: '#8b5cf6' },
  { icon: FaGraduationCap, title: 'Final Year Projects', color: '#10b981' },
  { icon: FaBook,          title: 'IT Notes & Study',   color: '#f59e0b' },
];

const timeline = [
  {
    year: '2021',
    title: 'Started IT Journey',
    desc: 'Began learning web development with HTML, CSS and JavaScript',
    color: '#6366f1'
  },
  {
    year: '2022',
    title: 'Mastered React & Node',
    desc: 'Built full-stack applications using React.js and Node.js',
    color: '#8b5cf6'
  },
  {
    year: '2023',
    title: 'Started Freelancing',
    desc: 'Helped 100+ students with final year projects and IT services',
    color: '#10b981'
  },
  {
    year: '2024',
    title: 'Launched TG Tech Solutions',
    desc: 'Built a complete IT solutions platform serving students and businesses',
    color: '#f59e0b'
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)'
        }} />

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: `hsl(${220 + Math.random() * 60}, 70%, 60%)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              pointerEvents: 'none'
            }}
            animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 2, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px', alignItems: 'center'
          }}>

            {/* Left — Profile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span style={{
                display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                color: '#a5b4fc', fontSize: '13px', marginBottom: '20px'
              }}>
                About Me
              </span>
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
                color: '#fff', marginBottom: '16px', lineHeight: 1.1
              }}>
                Hi, I am{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Takshak Ghagi
                </span>
              </h1>
              <p style={{
                color: '#a5b4fc', fontSize: '20px',
                fontWeight: 600, marginBottom: '20px'
              }}>
                Full Stack Developer & IT Expert
              </p>
              <p style={{
                color: '#9ca3af', fontSize: '16px',
                lineHeight: 1.8, marginBottom: '32px'
              }}>
                I am a passionate Full Stack Developer from Nagpur, Maharashtra.
                I specialize in building modern web applications, mobile apps,
                and helping students with their final year projects.
                With 3+ years of experience, I have helped 500+ students and businesses
                achieve their digital goals.
              </p>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  { icon: FaMapMarkerAlt, text: 'Nagpur, Maharashtra, India', color: '#6366f1' },
                  { icon: FaPhone,        text: '+91 7020521466',              color: '#10b981' },
                  { icon: FaEnvelope,     text: 'ghagitakshak@gmail.com',     color: '#f59e0b' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: `${item.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <span style={{ color: '#d1d5db', fontSize: '14px' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                {[
                  { icon: FaWhatsapp,  color: '#25d366', href: 'https://wa.me/917020521466'      },
                  { icon: FaLinkedin,  color: '#0077b5', href: 'https://linkedin.com'             },
                  { icon: FaGithub,    color: '#fff',    href: 'https://github.com'               },
                  { icon: FaInstagram, color: '#e1306c', href: 'https://instagram.com'            },
                  { icon: FaEnvelope,  color: '#6366f1', href: 'mailto:ghagitakshak@gmail.com'   },
                ].map(({ icon: Icon, color, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, y: -4 }}
                    style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '14px 28px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #25d366, #128c7e)',
                      border: 'none', color: '#fff', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <FaWhatsapp /> Hire Me
                  </motion.button>
                </a>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '14px 28px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none', color: '#fff', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 600
                    }}
                  >
                    Contact Me
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right — Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* Main Profile Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '24px', padding: '40px',
                  backdropFilter: 'blur(20px)', textAlign: 'center'
                }}
              >
                {/* Avatar — Real Photo */}
<div style={{
  width: '140px', height: '140px', borderRadius: '50%',
  margin: '0 auto 20px', overflow: 'hidden',
  boxShadow: '0 0 50px rgba(99,102,241,0.5)',
  border: '4px solid rgba(255,255,255,0.1)'
}}>
  <img
    src="https://drive.google.com/file/d/12dMshq2eONeUWghoGekwEII1asz-yYjC/view?usp=drive_link.jpg"
    alt="Takshak Ghagi"
    style={{
      width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'center top'
    }}
  />
</div>

                <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '24px', marginBottom: '6px' }}>
                  Takshak Ghagi
                </h2>
                <p style={{ color: '#a5b4fc', fontSize: '15px', marginBottom: '4px' }}>
                  Full Stack Developer
                </p>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>
                  Nagpur, Maharashtra
                </p>

                {/* Stats */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '16px', marginBottom: '24px'
                }}>
                  {[
                    { value: '500+', label: 'Projects'  },
                    { value: '200+', label: 'Clients'   },
                    { value: '3+',   label: 'Years'     },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      padding: '14px 8px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <p style={{
                        color: '#fff', fontWeight: 800, fontSize: '20px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                      }}>
                        {stat.value}
                      </p>
                      <p style={{ color: '#9ca3af', fontSize: '11px' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Skills Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {['React.js', 'Node.js', 'MySQL', 'Python', 'Figma', 'React Native'].map(skill => (
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
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{
                  position: 'absolute', top: '-16px', right: '-16px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: '12px', padding: '10px 16px',
                  boxShadow: '0 10px 30px rgba(16,185,129,0.3)'
                }}
              >
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  500+ Projects
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                style={{
                  position: 'absolute', bottom: '-16px', left: '-16px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '12px', padding: '10px 16px',
                  boxShadow: '0 10px 30px rgba(245,158,11,0.3)'
                }}
              >
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  4.9 Rating
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(99,102,241,0.03)',
        borderTop: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff' }}>
              Mission &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                Vision
              </span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                icon: FaRocket,
                title: 'Our Mission',
                desc: 'To provide high-quality, affordable IT services to students and businesses. We believe every student deserves quality technical guidance to achieve their academic and career goals.',
                color: '#6366f1'
              },
              {
                icon: FaStar,
                title: 'Our Vision',
                desc: 'To become the most trusted IT solutions provider for students across India. We aim to bridge the gap between academic learning and real-world technical skills.',
                color: '#f59e0b'
              },
              {
                icon: FaHeart,
                title: 'Our Values',
                desc: 'Quality, integrity, and student success are at the core of everything we do. We are committed to delivering exceptional work with complete transparency and honesty.',
                color: '#ec4899'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px', padding: '32px',
                  textAlign: 'center', transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '20px',
                  background: `${item.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff' }}>
            Technical{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Skills
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '20px'
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '12px'
              }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>
                  {skill.name}
                </span>
                <span style={{ color: skill.color, fontWeight: 700, fontSize: '14px' }}>
                  {skill.level}%
                </span>
              </div>
              <div style={{
                height: '8px', borderRadius: '100px',
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: '100px',
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(99,102,241,0.03)',
        borderTop: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff' }}>
              My{' '}
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                Journey
              </span>
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Timeline Line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #6366f1, #a855f7)',
              transform: 'translateX(-50%)'
            }} />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                style={{
                  display: 'flex',
                  justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginBottom: '40px',
                  paddingLeft:  i % 2 === 0 ? '0'   : '52%',
                  paddingRight: i % 2 === 0 ? '52%' : '0',
                  position: 'relative'
                }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '50%', top: '20px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: item.color,
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 12px ${item.color}`,
                  zIndex: 1
                }} />

                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${item.color}40`,
                  borderRadius: '16px', padding: '20px',
                  maxWidth: '280px', width: '100%'
                }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 12px',
                    borderRadius: '100px', fontSize: '12px',
                    background: `${item.color}20`, color: item.color,
                    fontWeight: 700, marginBottom: '10px'
                  }}>
                    {item.year}
                  </span>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff' }}>
            Why Work{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              With Me?
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            { title: 'On-Time Delivery',      desc: 'Every project delivered within the promised deadline',              color: '#6366f1' },
            { title: 'Quality Work',           desc: '100% quality assured with revisions until you are satisfied',      color: '#10b981' },
            { title: 'Affordable Pricing',     desc: 'Best quality at student-friendly and budget-conscious prices',     color: '#f59e0b' },
            { title: '24/7 Support',           desc: 'Always available on WhatsApp for any queries or support',         color: '#ec4899' },
            { title: 'Complete Documentation', desc: 'Full source code, documentation and deployment support included',  color: '#8b5cf6' },
            { title: 'Student Friendly',       desc: 'Specialized in helping MCA, BCA and B.Tech students succeed',     color: '#06b6d4' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${item.color}20` }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '24px',
                transition: 'all 0.3s'
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${item.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <FaCheckCircle size={20} style={{ color: item.color }} />
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        borderTop: '1px solid rgba(99,102,241,0.1)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '24px', padding: '60px 40px',
              position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute', top: '-50px', right: '-50px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent)'
            }} />
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>👋</div>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800,
              color: '#fff', marginBottom: '16px'
            }}>
              Let's Work Together!
            </h2>
            <p style={{
              color: '#9ca3af', fontSize: '18px',
              marginBottom: '36px', lineHeight: 1.6
            }}>
              Ready to start your project? Contact me today and let's build something amazing!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '14px 36px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    fontSize: '16px', fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    boxShadow: '0 8px 20px rgba(37,211,102,0.3)'
                  }}
                >
                  <FaWhatsapp /> WhatsApp Me
                </motion.button>
              </a>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '14px 36px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    fontSize: '16px', fontWeight: 600
                  }}
                >
                  Contact Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}