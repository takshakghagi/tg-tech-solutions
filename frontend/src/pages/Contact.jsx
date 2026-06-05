import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaClock
} from 'react-icons/fa';
import Layout from '../components/common/Layout';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const waMsg = `Hi! I'm ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0ASubject: ${form.subject}%0AMessage: ${form.message}`;
      window.open(`https://wa.me/917020521466?text=${waMsg}`, '_blank');
      toast.success('Redirecting to WhatsApp!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FaPhone,        label: 'Phone',    value: '+91 7020521466',          href: 'tel:+917020521466',               color: '#6366f1' },
    { icon: FaWhatsapp,     label: 'WhatsApp', value: '+91 7020521466',          href: 'https://wa.me/917020521466',      color: '#25d366' },
    { icon: FaEnvelope,     label: 'Email',    value: 'ghagitakshak@gmail.com',  href: 'mailto:ghagitakshak@gmail.com',   color: '#f59e0b' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Nagpur, Maharashtra',     href: '#map',                            color: '#ef4444' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: 'clamp(80px,12vw,120px) 16px 60px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc', fontSize: '13px', marginBottom: '16px'
          }}>📞 Get In Touch</span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Let's Work <span style={{
              background: 'linear-gradient(135deg,#6366f1,#a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Together</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(14px,2.5vw,18px)', lineHeight: 1.7 }}>
            Have a project in mind? We'd love to hear from you!
          </p>
        </motion.div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '0 16px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {contactInfo.map((info, i) => (
            <motion.a key={i} href={info.href} target="_blank" rel="noreferrer"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 12px 30px ${info.color}25` }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '20px', borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none', transition: 'all 0.3s'
              }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${info.color}20`, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <info.icon size={20} style={{ color: info.color }} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>{info.label}</p>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '13px', margin: 0,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Form + Hours Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Contact Form */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px', padding: 'clamp(20px,4vw,32px)' }}>
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { field: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Takshak Ghagi' },
                  { field: 'email',   label: 'Email',        type: 'email', placeholder: 'you@email.com' },
                  { field: 'phone',   label: 'Phone',        type: 'tel',   placeholder: '+91 9876543210' },
                  { field: 'subject', label: 'Subject',      type: 'text',  placeholder: 'Project inquiry...' },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label style={{ color: '#9ca3af', fontSize: '12px', display: 'block', marginBottom: '6px' }}>{label}</label>
                    <input type={type} value={form[field]} placeholder={placeholder} required={field !== 'phone'}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                        color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}

                <div>
                  <label style={{ color: '#9ca3af', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Message</label>
                  <textarea value={form.message} placeholder="Tell us about your project..." required rows={4}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                      color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical',
                      fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>

                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ padding: '13px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer',
                    fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px' }}>
                  <FaWhatsapp size={18} />
                  {loading ? 'Sending...' : 'Send via WhatsApp'}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Working Hours */}
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <FaClock size={18} style={{ color: '#6366f1' }} />
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: 0 }}>Working Hours</h3>
              </div>
              {[
                { day: 'Monday - Friday', time: '9:00 AM - 8:00 PM' },
                { day: 'Saturday',        time: '10:00 AM - 6:00 PM' },
                { day: 'Sunday',          time: 'WhatsApp Support' },
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>{h.day}</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a href="https://wa.me/917020521466?text=Hi! I need help with my project."
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '12px', padding: '20px', borderRadius: '20px',
                background: 'linear-gradient(135deg,rgba(37,211,102,0.15),rgba(18,140,126,0.15))',
                border: '1px solid rgba(37,211,102,0.3)', textDecoration: 'none'
              }}>
              <FaWhatsapp size={28} style={{ color: '#25d366' }} />
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: 0 }}>Chat on WhatsApp</p>
                <p style={{ color: '#25d366', fontSize: '13px', margin: 0 }}>Usually replies within 1 hour</p>
              </div>
            </motion.a>

            {/* Map */}
            <div id="map" style={{ borderRadius: '20px', overflow: 'hidden', height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238131.28646461644!2d78.87870545!3d21.1458004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37cf76e922e69!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%" height="200" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}