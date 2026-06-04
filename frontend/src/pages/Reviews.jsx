import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaWhatsapp } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

const reviews = [
  { id:1, user_name:'Rahul Sharma',  service_name:'Final Year Project',     rating:5, title:'Excellent Work!',          comment:'Project was delivered on time and documentation was perfect. Won best project award in university!',    is_featured:true,  city:'Mumbai' },
  { id:2, user_name:'Priya Singh',   service_name:'Website Development',    rating:5, title:'Amazing Portfolio!',        comment:'Got 3 job interviews because of this portfolio website. Beautiful animations and mobile friendly!',     is_featured:true,  city:'Delhi'  },
  { id:3, user_name:'Amit Kumar',    service_name:'Project Documentation',  rating:5, title:'Perfect Documentation!',    comment:'SRS, DFD, ER Diagram all perfectly made as per university standards. Professor appreciated it!',       is_featured:true,  city:'Pune'   },
  { id:4, user_name:'Sneha Patel',   service_name:'Resume & Portfolio',     rating:4, title:'Professional Resume!',      comment:'Very professional ATS friendly resume. Got a job within 2 weeks of sending this resume!',              is_featured:false, city:'Nagpur' },
  { id:5, user_name:'Rohan Verma',   service_name:'Mobile App Development', rating:5, title:'Best App Developer!',       comment:'React Native app runs very smoothly on both Android and iOS. On-time delivery and great support!',     is_featured:false, city:'Nashik' },
  { id:6, user_name:'Divya Joshi',   service_name:'IT Notes',               rating:5, title:'Best Study Material!',      comment:'Very detailed notes for all MCA subjects. Got 85% marks in exams using these notes!',                  is_featured:false, city:'Indore' },
];

export default function Reviews() {
  const [filter, setFilter] = useState('all');

  const filtered = reviews.filter(r => {
    if (filter === 'featured') return r.is_featured;
    if (filter === '5star')    return r.rating === 5;
    if (filter === '4star')    return r.rating === 4;
    return true;
  });

  const avg = (reviews.reduce((s,r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding:'100px 24px 60px', textAlign:'center',
        background:'radial-gradient(ellipse at top, rgba(245,158,11,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          style={{ maxWidth:'700px', margin:'0 auto' }}>
          <span style={{
            display:'inline-block', padding:'6px 20px', borderRadius:'100px',
            background:'rgba(245,158,11,0.15)', border:'1px solid rgba(245,158,11,0.3)',
            color:'#fbbf24', fontSize:'13px', marginBottom:'20px'
          }}>⭐ Client Reviews</span>
          <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:800, color:'#fff', marginBottom:'20px' }}>
            What Our{' '}
            <span style={{
              background:'linear-gradient(135deg,#f59e0b,#fbbf24)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>Clients Say</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'18px', lineHeight:1.7 }}>
            Real reviews from 200+ happy students and businesses!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3 }}
          style={{
            display:'inline-flex', alignItems:'center', gap:'32px',
            background:'rgba(255,255,255,0.03)',
            border:'1px solid rgba(245,158,11,0.2)',
            borderRadius:'20px', padding:'24px 40px',
            marginTop:'40px', flexWrap:'wrap', justifyContent:'center'
          }}>
          <div style={{ textAlign:'center' }}>
            <p style={{
              fontSize:'56px', fontWeight:900, lineHeight:1,
              background:'linear-gradient(135deg,#f59e0b,#fbbf24)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>{avg}</p>
            <div style={{ display:'flex', gap:'4px', justifyContent:'center', marginTop:'8px' }}>
              {[1,2,3,4,5].map(i => (
                <FaStar key={i} size={18} style={{ color: i<=parseFloat(avg) ? '#f59e0b' : '#374151' }} />
              ))}
            </div>
            <p style={{ color:'#6b7280', fontSize:'13px', marginTop:'6px' }}>Average Rating</p>
          </div>
          <div style={{ width:'1px', height:'60px', background:'rgba(255,255,255,0.1)' }} />
          {[
            { label:'Total Reviews',  value:`${reviews.length}+` },
            { label:'Happy Clients',  value:'200+'               },
            { label:'5 Star Reviews', value:`${reviews.filter(r=>r.rating===5).length}+` },
          ].map((s,i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <p style={{
                fontSize:'28px', fontWeight:800,
                background:'linear-gradient(135deg,#f59e0b,#fbbf24)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
              }}>{s.value}</p>
              <p style={{ color:'#6b7280', fontSize:'13px' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Filters */}
      <section style={{ padding:'0 24px 40px', maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center' }}>
          {[
            { key:'all',      label:`All (${reviews.length})` },
            { key:'featured', label:'⭐ Featured'              },
            { key:'5star',    label:'5 Star'                   },
            { key:'4star',    label:'4 Star'                   },
          ].map(tab => (
            <motion.button key={tab.key}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => setFilter(tab.key)}
              style={{
                padding:'10px 20px', borderRadius:'100px', cursor:'pointer',
                border:`1px solid ${filter===tab.key ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`,
                background: filter===tab.key ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                color: filter===tab.key ? '#fbbf24' : '#9ca3af',
                fontSize:'14px', fontWeight:500
              }}>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <section style={{ padding:'0 24px 80px', maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
          gap:'20px'
        }}>
          {filtered.map((review, i) => (
            <motion.div key={review.id}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.06 }}
              whileHover={{ y:-6, boxShadow:'0 20px 40px rgba(245,158,11,0.1)' }}
              style={{
                background:'rgba(255,255,255,0.03)',
                border:`1px solid ${review.is_featured ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius:'24px', padding:'28px',
                transition:'all 0.3s', position:'relative'
              }}>

              {review.is_featured && (
                <div style={{
                  position:'absolute', top:'16px', right:'16px',
                  padding:'3px 12px', borderRadius:'100px',
                  background:'rgba(245,158,11,0.2)',
                  border:'1px solid rgba(245,158,11,0.4)',
                  color:'#fbbf24', fontSize:'11px', fontWeight:600
                }}>⭐ Featured</div>
              )}

              <FaQuoteLeft size={24} style={{ color:'rgba(245,158,11,0.3)', marginBottom:'16px' }} />

              <div style={{ display:'flex', gap:'4px', marginBottom:'12px' }}>
                {[1,2,3,4,5].map(j => (
                  <FaStar key={j} size={16}
                    style={{ color: j<=review.rating ? '#f59e0b' : '#374151' }} />
                ))}
              </div>

              <h3 style={{ color:'#fff', fontWeight:700, fontSize:'16px', marginBottom:'10px' }}>
                {review.title}
              </h3>

              <p style={{
                color:'#9ca3af', fontSize:'14px', lineHeight:1.7,
                marginBottom:'16px', fontStyle:'italic'
              }}>
                "{review.comment}"
              </p>

              <span style={{
                display:'inline-flex', padding:'4px 12px', borderRadius:'100px',
                background:'rgba(99,102,241,0.15)',
                border:'1px solid rgba(99,102,241,0.3)',
                color:'#a5b4fc', fontSize:'12px', marginBottom:'16px'
              }}>
                {review.service_name}
              </span>

              <div style={{ height:'1px', background:'rgba(255,255,255,0.05)', marginBottom:'16px' }} />

              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{
                  width:'44px', height:'44px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontWeight:700, fontSize:'18px', flexShrink:0
                }}>
                  {review.user_name?.charAt(0)}
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <p style={{ color:'#fff', fontWeight:600, fontSize:'15px' }}>
                      {review.user_name}
                    </p>
                    <MdVerified size={16} style={{ color:'#6366f1' }} />
                  </div>
                  <p style={{ color:'#6b7280', fontSize:'12px' }}>📍 {review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'0 24px 100px', maxWidth:'700px', margin:'0 auto' }}>
        <div style={{
          textAlign:'center',
          background:'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(99,102,241,0.1))',
          border:'1px solid rgba(245,158,11,0.3)',
          borderRadius:'28px', padding:'50px 32px'
        }}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>🌟</div>
          <h2 style={{ fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#fff', marginBottom:'12px' }}>
            Had a Great Experience?
          </h2>
          <p style={{ color:'#9ca3af', fontSize:'16px', marginBottom:'28px' }}>
            Share your experience and help other students!
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/write-review">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{
                  padding:'14px 32px', borderRadius:'12px',
                  background:'linear-gradient(135deg,#f59e0b,#d97706)',
                  color:'#fff', border:'none', cursor:'pointer',
                  fontSize:'15px', fontWeight:600,
                  boxShadow:'0 8px 30px rgba(245,158,11,0.3)'
                }}>
                ⭐ Write a Review
              </motion.button>
            </Link>
            <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{
                  padding:'14px 32px', borderRadius:'12px',
                  background:'rgba(37,211,102,0.15)',
                  border:'1px solid rgba(37,211,102,0.4)',
                  color:'#25d366', cursor:'pointer',
                  fontSize:'15px', fontWeight:600,
                  display:'flex', alignItems:'center', gap:'8px'
                }}>
                <FaWhatsapp /> Contact Us
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}