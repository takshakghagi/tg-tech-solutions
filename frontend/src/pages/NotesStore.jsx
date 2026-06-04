import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBook, FaDownload, FaSearch,
  FaStar, FaLock, FaUnlock, FaWhatsapp
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import Layout from '../components/common/Layout';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRazorpay from '../hooks/useRazorpay';

const COURSES = ['All', 'MCA', 'BCA', 'B.Tech', 'Diploma', 'MBA', 'Other'];

export default function NotesStore() {
  const [notes,       setNotes]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState('');
  const [course,      setCourse]      = useState('All');
  const [filter,      setFilter]      = useState('all');
  const [page,        setPage]        = useState(1);
  const [total,       setTotal]       = useState(0);
  const [selected,    setSelected]    = useState(null);
  const [downloading, setDownloading] = useState(null);
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const { initiatePayment, loading: paymentLoading } = useRazorpay();

  const fetchNotes = async () => {
    setLoading(true);
    try {
      let url = `/notes?page=${page}&limit=12`;
      if (course !== 'All') url += `&course=${course}`;
      if (search)           url += `&search=${search}`;
      if (filter === 'free') url += `&is_free=true`;
      if (filter === 'paid') url += `&is_free=false`;
      const { data } = await API.get(url);
      setNotes(data.data || []);
      setTotal(data.pagination?.total || 0);
    } catch {
      toast.error('Failed to load notes!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, [page, course, filter]);

  useEffect(() => {
    const timer = setTimeout(() => fetchNotes(), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDownload = async (note) => {
    if (!user) {
      toast.error('Please login to download!');
      navigate('/login');
      return;
    }

    // Free note
    if (note.is_free) {
      setDownloading(note.id);
      try {
        const { data } = await API.post(`/notes/${note.id}/download`);
        window.open(data.data.download_url, '_blank');
        toast.success('PDF opened! 📥');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Download failed!');
      } finally {
        setDownloading(null);
      }
      return;
    }

    // Paid note — Razorpay
    initiatePayment({
      amount:      note.price,
      description: `Purchase: ${note.title}`,
      note_id:     note.id,
      onSuccess: async () => {
        try {
          const { data } = await API.post(`/notes/${note.id}/download`);
          window.open(data.data.download_url, '_blank');
          toast.success('Notes Downloaded! 📚');
          fetchNotes();
        } catch {
          toast.error('Download failed — contact support!');
        }
      },
      onFailure: () => {
        toast.error('Payment cancelled!');
      }
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 60px', textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          style={{ maxWidth:'700px', margin:'0 auto' }}>
          <span style={{
            display:'inline-block', padding:'6px 20px', borderRadius:'100px',
            background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)',
            color:'#fbbf24', fontSize:'13px', marginBottom:'20px'
          }}>📚 Notes Store</span>
          <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:800, color:'#fff', marginBottom:'20px' }}>
            Study Smart with{' '}
            <span style={{
              background:'linear-gradient(135deg,#f59e0b,#fbbf24)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>Quality Notes</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'18px', lineHeight:1.7 }}>
            Semester-wise notes for MCA, BCA, B.Tech students. Download instantly!
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section style={{ padding:'0 24px 40px', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', gap:'12px', marginBottom:'16px', flexWrap:'wrap' }}>
          <div style={{
            flex:1, minWidth:'200px',
            display:'flex', alignItems:'center', gap:'10px',
            background:'rgba(255,255,255,0.05)',
            border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:'12px', padding:'12px 16px'
          }}>
            <FaSearch style={{ color:'#6b7280', flexShrink:0 }} />
            <input type="text" placeholder="Search notes..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                background:'transparent', border:'none',
                color:'#fff', outline:'none', width:'100%', fontSize:'14px'
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ background:'none', border:'none', color:'#6b7280', cursor:'pointer' }}>
                <MdClose size={18} />
              </button>
            )}
          </div>

          <div style={{ display:'flex', gap:'8px' }}>
            {[
              { key:'all',  label:'All'     },
              { key:'free', label:'🆓 Free' },
              { key:'paid', label:'💰 Paid' },
            ].map(f => (
              <motion.button key={f.key}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                onClick={() => setFilter(f.key)}
                style={{
                  padding:'10px 16px', borderRadius:'10px', cursor:'pointer',
                  border:`1px solid ${filter===f.key ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                  background: filter===f.key ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                  color: filter===f.key ? '#fbbf24' : '#9ca3af',
                  fontSize:'13px', fontWeight:500
                }}>
                {f.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {COURSES.map(c => (
            <motion.button key={c}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => { setCourse(c); setPage(1); }}
              style={{
                padding:'8px 16px', borderRadius:'100px', cursor:'pointer',
                border:`1px solid ${course===c ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                background: course===c ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                color: course===c ? '#a5b4fc' : '#9ca3af',
                fontSize:'13px', fontWeight:500
              }}>
              {c}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Notes Grid */}
      <section style={{ padding:'0 24px 80px', maxWidth:'1200px', margin:'0 auto' }}>
        {loading ? (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
            gap:'20px'
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                height:'320px', borderRadius:'20px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.08)'
              }} />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div style={{
            textAlign:'center', padding:'80px',
            background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'24px'
          }}>
            <FaBook size={48} style={{ color:'#374151', marginBottom:'16px' }} />
            <p style={{ color:'#6b7280', fontSize:'18px' }}>No notes found!</p>
          </div>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
            gap:'20px'
          }}>
            {notes.map((note, i) => (
              <motion.div key={note.id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.06 }}
                whileHover={{ y:-6, boxShadow:'0 20px 40px rgba(99,102,241,0.15)' }}
                style={{
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  borderRadius:'20px', overflow:'hidden',
                  transition:'all 0.3s', cursor:'pointer'
                }}
                onClick={() => setSelected(note)}
              >
                {/* Thumbnail */}
                <div style={{
                  height:'160px',
                  background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.2))',
                  display:'flex', alignItems:'center',
                  justifyContent:'center', position:'relative'
                }}>
                  <FaBook size={48} style={{ color:'rgba(99,102,241,0.8)' }} />
                  <div style={{
                    position:'absolute', top:'12px', right:'12px',
                    padding:'4px 12px', borderRadius:'100px',
                    background: note.is_free ? 'rgba(16,185,129,0.9)' : 'rgba(245,158,11,0.9)',
                    color:'#fff', fontSize:'12px', fontWeight:700,
                    display:'flex', alignItems:'center', gap:'4px'
                  }}>
                    {note.is_free
                      ? <><FaUnlock size={10} /> FREE</>
                      : <><FaLock size={10} /> ₹{note.price}</>
                    }
                  </div>
                  <div style={{
                    position:'absolute', top:'12px', left:'12px',
                    padding:'4px 10px', borderRadius:'100px',
                    background:'rgba(0,0,0,0.6)',
                    color:'#fff', fontSize:'11px', fontWeight:600
                  }}>
                    {note.course}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding:'20px' }}>
                  <h3 style={{
                    color:'#fff', fontWeight:700, fontSize:'15px',
                    marginBottom:'8px', lineHeight:1.4
                  }}>
                    {note.title}
                  </h3>
                  <p style={{ color:'#6b7280', fontSize:'13px', marginBottom:'12px' }}>
                    {note.subject} • Sem {note.semester}
                  </p>

                  <div style={{ display:'flex', gap:'16px', marginBottom:'16px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px', color:'#f59e0b', fontSize:'13px' }}>
                      <FaStar size={12} /> {note.rating || '4.5'}
                    </span>
                    <span style={{ color:'#6b7280', fontSize:'13px' }}>
                      📥 {note.downloads || 0}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale:1.03 }}
                    whileTap={{ scale:0.97 }}
                    onClick={e => { e.stopPropagation(); handleDownload(note); }}
                    disabled={downloading === note.id || paymentLoading}
                    style={{
                      width:'100%', padding:'11px',
                      background: note.is_free
                        ? 'linear-gradient(135deg,#10b981,#059669)'
                        : 'linear-gradient(135deg,#f59e0b,#d97706)',
                      color:'#fff', border:'none', borderRadius:'10px',
                      cursor:'pointer', fontSize:'14px', fontWeight:600,
                      display:'flex', alignItems:'center',
                      justifyContent:'center', gap:'8px',
                      opacity: (downloading===note.id || paymentLoading) ? 0.7 : 1
                    }}
                  >
                    {downloading === note.id ? 'Downloading...' :
                     paymentLoading ? 'Processing...' :
                     note.is_free
                       ? <><FaDownload size={14} /> Download Free</>
                       : <><FaLock size={14} /> Buy ₹{note.price}</>
                    }
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div style={{ display:'flex', justifyContent:'center', gap:'12px', marginTop:'40px' }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
              style={{
                padding:'10px 24px', borderRadius:'10px', cursor:'pointer',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#fff', opacity:page===1?0.4:1
              }}>← Previous</button>
            <span style={{ padding:'10px 20px', color:'#9ca3af' }}>Page {page}</span>
            <button onClick={() => setPage(p=>p+1)} disabled={notes.length<12}
              style={{
                padding:'10px 24px', borderRadius:'10px', cursor:'pointer',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#fff', opacity:notes.length<12?0.4:1
              }}>Next →</button>
          </div>
        )}
      </section>

      {/* Note Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSelected(null)}
            style={{
              position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
              zIndex:9999, display:'flex', alignItems:'center',
              justifyContent:'center', padding:'24px'
            }}
          >
            <motion.div
              initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              onClick={e => e.stopPropagation()}
              style={{
                background:'#1a1a2e',
                border:'1px solid rgba(99,102,241,0.3)',
                borderRadius:'24px', padding:'32px',
                maxWidth:'480px', width:'100%'
              }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
                <div style={{
                  width:'56px', height:'56px', borderRadius:'16px',
                  background:'rgba(99,102,241,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <FaBook size={24} style={{ color:'#6366f1' }} />
                </div>
                <button onClick={() => setSelected(null)}
                  style={{
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'8px', padding:'6px 10px',
                    color:'#9ca3af', cursor:'pointer'
                  }}>
                  <MdClose size={20} />
                </button>
              </div>

              <h2 style={{ color:'#fff', fontWeight:700, fontSize:'20px', marginBottom:'8px' }}>
                {selected.title}
              </h2>
              <p style={{ color:'#6b7280', fontSize:'14px', marginBottom:'20px' }}>
                {selected.subject} • {selected.course} • Sem {selected.semester}
              </p>

              <div style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                marginBottom:'24px'
              }}>
                <p style={{
                  fontSize:'32px', fontWeight:900,
                  color: selected.is_free ? '#10b981' : '#f59e0b'
                }}>
                  {selected.is_free ? 'FREE' : `₹${selected.price}`}
                </p>
                <div style={{ display:'flex', gap:'4px' }}>
                  {[1,2,3,4,5].map(j => (
                    <FaStar key={j} size={16}
                      style={{ color: j<=4 ? '#f59e0b' : '#374151' }} />
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                onClick={() => { setSelected(null); handleDownload(selected); }}
                disabled={paymentLoading}
                style={{
                  width:'100%', padding:'14px',
                  background: selected.is_free
                    ? 'linear-gradient(135deg,#10b981,#059669)'
                    : 'linear-gradient(135deg,#f59e0b,#d97706)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  cursor:'pointer', fontSize:'16px', fontWeight:600,
                  display:'flex', alignItems:'center',
                  justifyContent:'center', gap:'8px'
                }}
              >
                {selected.is_free
                  ? <><FaDownload /> Download Free PDF</>
                  : <><FaLock /> Buy Now — ₹{selected.price}</>
                }
              </motion.button>

              {!user && (
                <p style={{ color:'#6b7280', fontSize:'13px', textAlign:'center', marginTop:'12px' }}>
                  Please <a href="/login" style={{ color:'#6366f1' }}>login</a> to download
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ padding:'0 24px 80px', maxWidth:'700px', margin:'0 auto' }}>
        <div style={{
          textAlign:'center',
          background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(99,102,241,0.1))',
          border:'1px solid rgba(245,158,11,0.3)',
          borderRadius:'24px', padding:'40px 32px'
        }}>
          <h2 style={{ color:'#fff', fontWeight:800, fontSize:'24px', marginBottom:'12px' }}>
            Need Custom Notes? 📚
          </h2>
          <p style={{ color:'#9ca3af', fontSize:'15px', marginBottom:'24px' }}>
            Contact us for specific subject notes!
          </p>
          <a href="https://wa.me/917020521466?text=Hi! I need notes for..."
            target="_blank" rel="noreferrer">
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              style={{
                padding:'12px 28px', borderRadius:'12px',
                background:'linear-gradient(135deg,#25d366,#128c7e)',
                color:'#fff', border:'none', cursor:'pointer',
                fontSize:'15px', fontWeight:600,
                display:'inline-flex', alignItems:'center', gap:'8px'
              }}>
              <FaWhatsapp /> Request Notes
            </motion.button>
          </a>
        </div>
      </section>
    </Layout>
  );
}