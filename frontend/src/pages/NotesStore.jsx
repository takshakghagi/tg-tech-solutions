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
  const [winW,        setWinW]        = useState(window.innerWidth);
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const { initiatePayment, loading: paymentLoading } = useRazorpay();

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = winW < 640;

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
      onFailure: () => toast.error('Payment cancelled!')
    });
  };

  return (
    <Layout>

      {/* ── Hero ── */}
      <section style={{
        padding: isMobile ? '90px 20px 40px' : '100px 24px 60px',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          style={{ maxWidth:'700px', margin:'0 auto' }}>
          <span style={{
            display:'inline-block', padding:'6px 20px', borderRadius:'100px',
            background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)',
            color:'#fbbf24', fontSize:'13px', marginBottom:'16px'
          }}>📚 Notes Store</span>
          <h1 style={{
            fontSize: isMobile ? '28px' : 'clamp(28px,5vw,52px)',
            fontWeight:800, color:'#fff', marginBottom:'12px', lineHeight:1.2
          }}>
            Study Smart with{' '}
            <span style={{
              background:'linear-gradient(135deg,#f59e0b,#fbbf24)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>Quality Notes</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize: isMobile ? '14px' : '17px', lineHeight:1.7 }}>
            Semester-wise notes for MCA, BCA, B.Tech students. Download instantly!
          </p>
        </motion.div>
      </section>

      {/* ── Filters ── */}
      <section style={{ padding:'0 20px 32px', maxWidth:'1200px', margin:'0 auto' }}>

        {/* Search bar */}
        <div style={{
          display:'flex', alignItems:'center', gap:'10px',
          background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:'12px', padding:'11px 16px',
          marginBottom:'14px'
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

        {/* Free/Paid filter */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'14px', flexWrap:'wrap' }}>
          {[
            { key:'all',  label:'All'     },
            { key:'free', label:'🆓 Free' },
            { key:'paid', label:'💰 Paid' },
          ].map(f => (
            <motion.button key={f.key}
              whileTap={{ scale:0.95 }}
              onClick={() => setFilter(f.key)}
              style={{
                padding:'8px 16px', borderRadius:'10px', cursor:'pointer',
                border:`1px solid ${filter===f.key ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                background: filter===f.key ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                color: filter===f.key ? '#fbbf24' : '#9ca3af',
                fontSize:'13px', fontWeight:500
              }}>
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Course filter — scrollable row on mobile */}
        <div style={{
          display:'flex', gap:'8px',
          overflowX:'auto', paddingBottom:'4px',
          scrollbarWidth:'none'
        }}>
          {COURSES.map(c => (
            <motion.button key={c}
              whileTap={{ scale:0.95 }}
              onClick={() => { setCourse(c); setPage(1); }}
              style={{
                padding:'7px 16px', borderRadius:'100px', cursor:'pointer',
                border:`1px solid ${course===c ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                background: course===c ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                color: course===c ? '#a5b4fc' : '#9ca3af',
                fontSize:'13px', fontWeight:500,
                whiteSpace:'nowrap', flexShrink:0
              }}>
              {c}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Notes Grid ── */}
      <section style={{ padding:'0 20px 80px', maxWidth:'1200px', margin:'0 auto' }}>
        {loading ? (
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(auto-fit,minmax(260px,1fr))',
            gap:'14px'
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                height: isMobile ? '200px' : '300px',
                borderRadius:'16px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.08)'
              }} />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div style={{
            textAlign:'center', padding:'60px 24px',
            background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'20px'
          }}>
            <FaBook size={40} style={{ color:'#374151', marginBottom:'12px' }} />
            <p style={{ color:'#6b7280', fontSize:'16px' }}>No notes found!</p>
          </div>
        ) : (
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(2,1fr)'
              : 'repeat(auto-fit,minmax(260px,1fr))',
            gap: isMobile ? '12px' : '20px'
          }}>
            {notes.map((note, i) => (
              <motion.div key={note.id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y:-4, boxShadow:'0 16px 36px rgba(99,102,241,0.15)' }}
                onClick={() => setSelected(note)}
                style={{
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  borderRadius:'16px', overflow:'hidden',
                  cursor:'pointer', display:'flex', flexDirection:'column'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: isMobile ? '90px' : '140px',
                  background:'linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15))',
                  display:'flex', alignItems:'center',
                  justifyContent:'center', position:'relative', flexShrink:0
                }}>
                  <FaBook size={isMobile ? 28 : 44} style={{ color:'rgba(99,102,241,0.8)' }} />

                  {/* Price badge */}
                  <div style={{
                    position:'absolute', top:'8px', right:'8px',
                    padding:'3px 8px', borderRadius:'100px',
                    background: note.is_free ? 'rgba(16,185,129,0.9)' : 'rgba(245,158,11,0.9)',
                    color:'#fff', fontSize:'10px', fontWeight:700,
                    display:'flex', alignItems:'center', gap:'3px'
                  }}>
                    {note.is_free
                      ? <><FaUnlock size={8} /> FREE</>
                      : <><FaLock size={8} /> ₹{note.price}</>
                    }
                  </div>

                  {/* Course badge */}
                  <div style={{
                    position:'absolute', top:'8px', left:'8px',
                    padding:'3px 8px', borderRadius:'100px',
                    background:'rgba(0,0,0,0.6)',
                    color:'#fff', fontSize:'10px', fontWeight:600
                  }}>
                    {note.course}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: isMobile ? '10px' : '16px', flex:1, display:'flex', flexDirection:'column' }}>
                  <h3 style={{
                    color:'#fff', fontWeight:700,
                    fontSize: isMobile ? '12px' : '14px',
                    marginBottom:'4px', lineHeight:1.35,
                    display:'-webkit-box', WebkitLineClamp:2,
                    WebkitBoxOrient:'vertical', overflow:'hidden'
                  }}>
                    {note.title}
                  </h3>
                  <p style={{ color:'#6b7280', fontSize: isMobile ? '10px' : '12px', marginBottom:'10px' }}>
                    {note.subject} • Sem {note.semester}
                  </p>

                  <div style={{ display:'flex', gap:'10px', marginBottom:'10px' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:'3px', color:'#f59e0b', fontSize:'11px' }}>
                      <FaStar size={10} /> {note.rating || '4.5'}
                    </span>
                    <span style={{ color:'#6b7280', fontSize:'11px' }}>
                      📥 {note.downloads || 0}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale:0.96 }}
                    onClick={e => { e.stopPropagation(); handleDownload(note); }}
                    disabled={downloading === note.id || paymentLoading}
                    style={{
                      width:'100%',
                      padding: isMobile ? '8px 6px' : '10px',
                      background: note.is_free
                        ? 'linear-gradient(135deg,#10b981,#059669)'
                        : 'linear-gradient(135deg,#f59e0b,#d97706)',
                      color:'#fff', border:'none', borderRadius:'8px',
                      cursor:'pointer',
                      fontSize: isMobile ? '11px' : '13px',
                      fontWeight:600,
                      display:'flex', alignItems:'center',
                      justifyContent:'center', gap:'5px',
                      opacity: (downloading===note.id || paymentLoading) ? 0.7 : 1,
                      marginTop:'auto'
                    }}
                  >
                    {downloading === note.id ? 'Downloading...' :
                     paymentLoading ? 'Processing...' :
                     note.is_free
                       ? <><FaDownload size={11} /> Download Free</>
                       : <><FaLock size={11} /> Buy ₹{note.price}</>
                    }
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div style={{ display:'flex', justifyContent:'center', gap:'12px', marginTop:'36px' }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
              style={{
                padding:'10px 22px', borderRadius:'10px', cursor:'pointer',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#fff', opacity:page===1?0.4:1
              }}>← Prev</button>
            <span style={{ padding:'10px 16px', color:'#9ca3af' }}>Page {page}</span>
            <button onClick={() => setPage(p=>p+1)} disabled={notes.length<12}
              style={{
                padding:'10px 22px', borderRadius:'10px', cursor:'pointer',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#fff', opacity:notes.length<12?0.4:1
              }}>Next →</button>
          </div>
        )}
      </section>

      {/* ── Note Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSelected(null)}
            style={{
              position:'fixed', inset:0, background:'rgba(0,0,0,0.85)',
              zIndex:9999, display:'flex', alignItems:'center',
              justifyContent:'center', padding:'20px'
            }}
          >
            <motion.div
              initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9 }}
              onClick={e => e.stopPropagation()}
              style={{
                background:'#1a1a2e',
                border:'1px solid rgba(99,102,241,0.3)',
                borderRadius:'20px', padding: isMobile ? '24px 20px' : '32px',
                maxWidth:'440px', width:'100%'
              }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'18px' }}>
                <div style={{
                  width:'48px', height:'48px', borderRadius:'14px',
                  background:'rgba(99,102,241,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <FaBook size={22} style={{ color:'#6366f1' }} />
                </div>
                <button onClick={() => setSelected(null)}
                  style={{
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'8px', padding:'6px 10px',
                    color:'#9ca3af', cursor:'pointer'
                  }}>
                  <MdClose size={18} />
                </button>
              </div>

              <h2 style={{ color:'#fff', fontWeight:700, fontSize:'18px', marginBottom:'6px', lineHeight:1.3 }}>
                {selected.title}
              </h2>
              <p style={{ color:'#6b7280', fontSize:'13px', marginBottom:'18px' }}>
                {selected.subject} • {selected.course} • Sem {selected.semester}
              </p>

              <div style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                marginBottom:'20px'
              }}>
                <p style={{
                  fontSize:'28px', fontWeight:900,
                  color: selected.is_free ? '#10b981' : '#f59e0b', margin:0
                }}>
                  {selected.is_free ? 'FREE' : `₹${selected.price}`}
                </p>
                <div style={{ display:'flex', gap:'3px' }}>
                  {[1,2,3,4,5].map(j => (
                    <FaStar key={j} size={14}
                      style={{ color: j<=4 ? '#f59e0b' : '#374151' }} />
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                onClick={() => { setSelected(null); handleDownload(selected); }}
                disabled={paymentLoading}
                style={{
                  width:'100%', padding:'13px',
                  background: selected.is_free
                    ? 'linear-gradient(135deg,#10b981,#059669)'
                    : 'linear-gradient(135deg,#f59e0b,#d97706)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  cursor:'pointer', fontSize:'15px', fontWeight:600,
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
                <p style={{ color:'#6b7280', fontSize:'13px', textAlign:'center', marginTop:'10px' }}>
                  Please <a href="/login" style={{ color:'#6366f1' }}>login</a> to download
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section style={{ padding:'0 20px 80px', maxWidth:'700px', margin:'0 auto' }}>
        <div style={{
          textAlign:'center',
          background:'linear-gradient(135deg,rgba(245,158,11,0.12),rgba(99,102,241,0.08))',
          border:'1px solid rgba(245,158,11,0.25)',
          borderRadius:'20px', padding: isMobile ? '32px 20px' : '40px 32px'
        }}>
          <h2 style={{ color:'#fff', fontWeight:800, fontSize: isMobile ? '20px' : '24px', marginBottom:'10px' }}>
            Need Custom Notes? 📚
          </h2>
          <p style={{ color:'#9ca3af', fontSize: isMobile ? '13px' : '15px', marginBottom:'20px' }}>
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
