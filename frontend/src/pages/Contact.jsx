import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaPhone, FaInstagram, FaLinkedin, FaGithub,
  FaPaperPlane, FaClock, FaCheckCircle
} from 'react-icons/fa';
import Layout from '../components/common/Layout';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form,    setForm]    = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // WhatsApp message send karo
      const msg = `*New Contact Form Submission*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Subject:* ${form.subject}%0A*Message:* ${form.message}`;
      window.open(`https://wa.me/917020521466?text=${msg}`, '_blank');
      setSent(true);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message!');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon:  FaPhone,
      title: 'Phone',
      value: '+91 7020521466',
      href:  'tel:+917020521466',
      color: '#6366f1',
      bg:    'rgba(99,102,241,0.1)'
    },
    {
      icon:  FaWhatsapp,
      title: 'WhatsApp',
      value: 'Chat with us',
      href:  'https://wa.me/917020521466',
      color: '#25d366',
      bg:    'rgba(37,211,102,0.1)'
    },
    {
      icon:  FaEnvelope,
      title: 'Email',
      value: 'ghagitakshak@gmail.com',
      href:  'mailto:ghagitakshak@gmail.com',
      color: '#f59e0b',
      bg:    'rgba(245,158,11,0.1)'
    },
    {
      icon:  FaMapMarkerAlt,
      title: 'Location',
      value: 'Nagpur, Maharashtra',
      href:  'https://maps.google.com/?q=Nagpur,Maharashtra',
      color: '#ef4444',
      bg:    'rgba(239,68,68,0.1)'
    },
  ];

  const subjects = [
    'Web Development',
    'Mobile App Development',
    'Final Year Project',
    'IT Notes',
    'Documentation',
    'Graphic Design',
    'Resume & Portfolio',
    'Other'
  ];

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 60px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc', fontSize: '13px', marginBottom: '20px'
          }}>
            📞 Get In Touch
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800,
            color: '#fff', marginBottom: '20px'
          }}>
            Let's{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Talk
            </span>
            {' '}About Your Project
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7 }}>
            Have a project in mind? We'd love to hear from you.
            Send us a message and we'll respond within 24 hours!
          </p>
        </motion.div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '0 24px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px', marginBottom: '60px'
        }}>
          {contactInfo.map((info, i) => (
            <motion.a
              key={i}
              href={info.href}
              target={info.href.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${info.color}25` }}
              style={{
                display: 'block', textDecoration: 'none',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '28px',
                transition: 'all 0.3s', cursor: 'pointer'
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                background: info.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <info.icon size={24} style={{ color: info.color }} />
              </div>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>
                {info.title}
              </p>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>
                {info.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px', alignItems: 'start'
        }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '24px', padding: '48px',
                  textAlign: 'center'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{ fontSize: '64px', marginBottom: '20px' }}
                >
                  🎉
                </motion.div>
                <h3 style={{ color: '#10b981', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
                  Thank you for reaching out! We will get back to you within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSent(false)}
                  style={{
                    padding: '12px 28px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff', border: 'none', cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px', padding: '36px'
              }}>
                <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                  Send us a Message
                </h2>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '28px' }}>
                  Fill out the form and we'll get back to you soon!
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Name + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                        style={{
                          width: '100%', padding: '12px 16px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px', color: '#fff',
                          fontSize: '14px', outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        style={{
                          width: '100%', padding: '12px 16px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px', color: '#fff',
                          fontSize: '14px', outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px', color: '#fff',
                        fontSize: '14px', outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                      Subject *
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      required
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: '#1a1a2e',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px', color: form.subject ? '#fff' : '#6b7280',
                        fontSize: '14px', outline: 'none',
                        boxSizing: 'border-box', cursor: 'pointer'
                      }}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project requirements..."
                      required
                      rows={5}
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px', color: '#fff',
                        fontSize: '14px', outline: 'none', resize: 'vertical',
                        fontFamily: 'inherit', boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '14px 32px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '16px', fontWeight: 600,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '8px',
                      boxShadow: '0 8px 30px rgba(99,102,241,0.3)',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? (
                      <div style={{
                        width: '20px', height: '20px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message via WhatsApp
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Right Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Working Hours */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(99,102,241,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <FaClock size={22} style={{ color: '#6366f1' }} />
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>Working Hours</h3>
              </div>
              {[
                { day: 'Monday — Friday',  time: '9:00 AM — 8:00 PM' },
                { day: 'Saturday',         time: '10:00 AM — 6:00 PM' },
                { day: 'Sunday',           time: 'Emergency Only'      },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>{item.day}</span>
                  <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{item.time}</span>
                </div>
              ))}
            </div>

            {/* Why Contact Us */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '20px', padding: '28px'
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                Why Choose TG Tech?
              </h3>
              {[
                '⚡ Fast response within 24 hours',
                '💰 Transparent pricing — no hidden costs',
                '🔄 Free revisions until satisfied',
                '📦 Complete source code delivery',
                '🚀 On-time project delivery',
                '💬 24/7 WhatsApp support',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 0',
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#d1d5db' }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '28px'
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
                Follow Us
              </h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: FaInstagram, color: '#e1306c', href: 'https://instagram.com',       label: 'Instagram' },
                  { icon: FaLinkedin,  color: '#0077b5', href: 'https://linkedin.com',        label: 'LinkedIn'  },
                  { icon: FaGithub,    color: '#fff',     href: 'https://github.com',          label: 'GitHub'    },
                  { icon: FaWhatsapp,  color: '#25d366', href: 'https://wa.me/917020521466',  label: 'WhatsApp'  },
                ].map(({ icon: Icon, color, href, label }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      padding: '12px 16px', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      textDecoration: 'none', flex: 1
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <motion.a
              href="https://wa.me/917020521466?text=Hi! I want to discuss a project."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(37,211,102,0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '12px', padding: '18px 32px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                textDecoration: 'none', cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(37,211,102,0.25)'
              }}
            >
              <FaWhatsapp size={24} style={{ color: '#fff' }} />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: 0 }}>
                  Chat on WhatsApp
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0 }}>
                  +91 7020521466 — Usually replies in 1 hour
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            borderRadius: '24px', overflow: 'hidden',
            border: '1px solid rgba(99,102,241,0.2)',
            height: '350px'
          }}
        >
          <iframe
            title="TG Tech Solutions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238194.41807322318!2d78.96288!3d21.14631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen=""
            loading="lazy"
          />
        </motion.div>
      </section>
    </Layout>
  );
}