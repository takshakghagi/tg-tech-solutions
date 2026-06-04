import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import Layout from '../components/common/Layout';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SERVICES = [
  { id:1, title:'Custom Website Development' },
  { id:2, title:'Mobile App Development'     },
  { id:3, title:'Final Year Project'         },
  { id:4, title:'IT Notes & Study Material'  },
  { id:5, title:'Project Documentation'      },
  { id:6, title:'Graphic Design'             },
  { id:7, title:'Resume & Portfolio'         },
  { id:8, title:'Internship Project'         },
  { id:9, title:'Software Development'       },
];

export default function WriteReview() {
  const [form,    setForm]    = useState({
    service_id: '',
    rating:     0,
    title:      '',
    comment:    ''
  });
  const [hover,   setHover]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to write a review!');
      navigate('/login');
      return;
    }

    if (form.rating === 0) {
      toast.error('Please select a rating!');
      return;
    }

    if (!form.service_id) {
      toast.error('Please select a service!');
      return;
    }

    setLoading(true);
    try {
      await API.post('/reviews', {
        service_id: parseInt(form.service_id),
        rating:     form.rating,
        title:      form.title,
        comment:    form.comment
      });
      setSuccess(true);
      toast.success('Review submitted! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review!');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div style={{
          minHeight: '80vh', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          padding: '100px 24px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center', maxWidth: '500px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '28px', padding: '60px 40px'
            }}
          >
            <div style={{ fontSize: '72px', marginBottom: '24px' }}>⭐</div>
            <h2 style={{ color: '#f59e0b', fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
              Review Submitted!
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '8px', lineHeight: 1.7 }}>
              Thank you for your feedback! Your review will be published after approval.
            </p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
              Usually approved within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/reviews">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '12px 24px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  View All Reviews
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '12px 24px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', cursor: 'pointer', fontWeight: 600
                  }}
                >
                  Go Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 40px', textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{
            display: 'inline-block', padding: '6px 20px', borderRadius: '100px',
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            color: '#fbbf24', fontSize: '13px', marginBottom: '16px'
          }}>
            ⭐ Write a Review
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: '#fff', marginBottom: '12px'
          }}>
            Share Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Experience
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px' }}>
            Your feedback helps us improve and helps other students make better decisions!
          </p>
        </motion.div>
      </section>

      {/* Form */}
      <section style={{ padding: '20px 24px 100px', maxWidth: '600px', margin: '0 auto' }}>
        {!user ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', padding: '48px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '24px'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
            <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
              Login Required
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
              Please login to write a review.
            </p>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '12px 28px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600
                }}
              >
                Login Now
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '24px', padding: '36px',
              display: 'flex', flexDirection: 'column', gap: '24px'
            }}
          >
            {/* Star Rating */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '12px' }}>
                Rate your experience *
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    {star <= (hover || form.rating)
                      ? <FaStar size={40} style={{ color: '#f59e0b' }} />
                      : <FaRegStar size={40} style={{ color: '#374151' }} />
                    }
                  </motion.button>
                ))}
              </div>
              {form.rating > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#f59e0b', fontSize: '14px', marginTop: '8px', fontWeight: 600 }}
                >
                  {form.rating === 1 ? '😞 Poor'
                    : form.rating === 2 ? '😐 Fair'
                    : form.rating === 3 ? '🙂 Good'
                    : form.rating === 4 ? '😊 Very Good'
                    : '🌟 Excellent!'}
                </motion.p>
              )}
            </div>

            {/* Service */}
            <div>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                Which service did you use? *
              </label>
              <select
                value={form.service_id}
                onChange={e => setForm({ ...form, service_id: e.target.value })}
                required
                style={{
                  width: '100%', padding: '12px 16px',
                  background: '#1a1a2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#fff',
                  fontSize: '14px', outline: 'none', cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select a service...</option>
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                Review Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Excellent Work! Highly Recommended!"
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#fff',
                  fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Comment */}
            <div>
              <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                Your Review *
              </label>
              <textarea
                value={form.comment}
                onChange={e => setForm({ ...form, comment: e.target.value })}
                placeholder="Share your experience in detail..."
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
              <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '4px' }}>
                {form.comment.length} characters
              </p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#fff', border: 'none', borderRadius: '12px',
                cursor: 'pointer', fontSize: '16px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading
                ? 'Submitting...'
                : <><MdSend size={18} /> Submit Review</>
              }
            </motion.button>

            <p style={{ color: '#4b5563', fontSize: '12px', textAlign: 'center' }}>
              Your review will be published after admin approval (within 24 hours)
            </p>
          </motion.form>
        )}
      </section>
    </Layout>
  );
}