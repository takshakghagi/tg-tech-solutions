import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaTag } from 'react-icons/fa';
import Layout from '../components/common/Layout';

const posts = [
  {
    id: 1,
    slug: 'top-10-final-year-project-ideas-mca-2024',
    title: 'Top 10 Final Year Project Ideas for MCA Students 2024',
    excerpt: 'MCA final year project choose karna difficult hota hai. Is article mein hamne top 10 trending project ideas share kiye hain.',
    category: 'career',
    tags: ['MCA', 'Final Year Project', 'Career'],
    views: 1250,
    read_time: 8,
    created_at: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'
  },
  {
    id: 2,
    slug: 'how-to-get-software-job-after-mca-complete-roadmap',
    title: 'How to Get a Software Job After MCA — Complete Roadmap',
    excerpt: 'MCA ke baad software job paana mushkil nahi hai agar aap sahi path follow karo. Step-by-step roadmap.',
    category: 'placement',
    tags: ['MCA', 'Job', 'Placement'],
    views: 2100,
    read_time: 12,
    created_at: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80'
  },
  {
    id: 3,
    slug: 'reactjs-vs-vuejs-vs-angular-2024',
    title: 'React.js vs Vue.js vs Angular — Which Should You Learn?',
    excerpt: 'Frontend frameworks mein confused ho? Janiye kaunsa framework 2024 mein learn karna chahiye aur kyun.',
    category: 'programming',
    tags: ['React', 'Vue', 'Angular'],
    views: 890,
    read_time: 10,
    created_at: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80'
  },
  {
    id: 4,
    slug: 'top-interview-questions-for-mca-bca-freshers',
    title: 'Top Interview Questions for MCA/BCA Freshers 2024',
    excerpt: 'Job interview mein ye questions zaroor pooche jaate hain. Complete preparation guide with answers.',
    category: 'interview',
    tags: ['Interview', 'MCA', 'BCA', 'Fresher'],
    views: 3200,
    read_time: 15,
    created_at: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80'
  },
  {
    id: 5,
    slug: 'how-to-build-portfolio-website-react',
    title: 'How to Build a Portfolio Website with React.js',
    excerpt: 'Step by step tutorial to build a professional portfolio website using React.js and Tailwind CSS.',
    category: 'tutorial',
    tags: ['React', 'Portfolio', 'Tutorial'],
    views: 1800,
    read_time: 20,
    created_at: '2024-04-01',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80'
  },
  {
    id: 6,
    slug: 'ai-tools-for-students-2024',
    title: 'Best AI Tools for Students in 2024',
    excerpt: 'ChatGPT, GitHub Copilot aur aur bhi AI tools jo aapki studies aur projects mein help karenge.',
    category: 'technology',
    tags: ['AI', 'Tools', 'Students'],
    views: 4500,
    read_time: 9,
    created_at: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80'
  },
];

const CATEGORIES = ['All', 'programming', 'career', 'placement', 'interview', 'technology', 'tutorial'];

const categoryColors = {
  programming: '#6366f1',
  career:      '#10b981',
  placement:   '#f59e0b',
  interview:   '#ef4444',
  technology:  '#8b5cf6',
  tutorial:    '#06b6d4',
};

export default function Blog() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? posts
    : posts.filter(p => p.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 60px', textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
          style={{ maxWidth:'700px', margin:'0 auto' }}>
          <span style={{
            display:'inline-block', padding:'6px 20px', borderRadius:'100px',
            background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)',
            color:'#a5b4fc', fontSize:'13px', marginBottom:'20px'
          }}>📝 Blog & Articles</span>
          <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:800, color:'#fff', marginBottom:'20px' }}>
            Learn &{' '}
            <span style={{
              background:'linear-gradient(135deg,#6366f1,#a855f7)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>Grow</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'18px', lineHeight:1.7 }}>
            Programming tutorials, career guidance, placement tips and more!
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section style={{ padding:'0 24px 40px', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', justifyContent:'center' }}>
          {CATEGORIES.map(cat => (
            <motion.button key={cat}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => setFilter(cat)}
              style={{
                padding:'8px 20px', borderRadius:'100px', cursor:'pointer',
                border:`1px solid ${filter===cat ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                background: filter===cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                color: filter===cat ? '#a5b4fc' : '#9ca3af',
                fontSize:'13px', fontWeight:500, textTransform:'capitalize'
              }}>
              {cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding:'0 24px 100px', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))',
          gap:'24px'
        }}>
          {filtered.map((post, i) => (
            <motion.div key={post.id}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.08 }}
              whileHover={{ y:-6, boxShadow:'0 20px 40px rgba(99,102,241,0.15)' }}
              style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:'20px', overflow:'hidden',
                transition:'all 0.3s'
              }}
            >
              {/* Image */}
              <div style={{ position:'relative', height:'200px', overflow:'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width:'100%', height:'100%', objectFit:'cover',
                    transition:'transform 0.3s'
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.2))';
                  }}
                />
                {/* Category */}
                <span style={{
                  position:'absolute', top:'12px', left:'12px',
                  padding:'4px 12px', borderRadius:'100px',
                  background: `${categoryColors[post.category]}dd`,
                  color:'#fff', fontSize:'11px', fontWeight:700,
                  textTransform:'capitalize'
                }}>
                  {post.category}
                </span>
                {/* Read Time */}
                <span style={{
                  position:'absolute', top:'12px', right:'12px',
                  padding:'4px 10px', borderRadius:'100px',
                  background:'rgba(0,0,0,0.7)',
                  color:'#fff', fontSize:'11px',
                  display:'flex', alignItems:'center', gap:'4px'
                }}>
                  <FaClock size={10} /> {post.read_time} min
                </span>
              </div>

              {/* Content */}
              <div style={{ padding:'24px' }}>
                <h3 style={{
                  color:'#fff', fontWeight:700, fontSize:'17px',
                  marginBottom:'10px', lineHeight:1.4
                }}>
                  {post.title}
                </h3>
                <p style={{
                  color:'#9ca3af', fontSize:'14px', lineHeight:1.6,
                  marginBottom:'16px'
                }}>
                  {post.excerpt.substring(0, 100)}...
                </p>

                {/* Tags */}
                <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'16px' }}>
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      display:'flex', alignItems:'center', gap:'4px',
                      padding:'3px 10px', borderRadius:'100px',
                      background:'rgba(99,102,241,0.1)',
                      border:'1px solid rgba(99,102,241,0.2)',
                      color:'#a5b4fc', fontSize:'11px'
                    }}>
                      <FaTag size={9} /> {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display:'flex', alignItems:'center',
                  justifyContent:'space-between',
                  borderTop:'1px solid rgba(255,255,255,0.05)',
                  paddingTop:'16px'
                }}>
                  <div style={{ display:'flex', gap:'16px' }}>
                    <span style={{
                      color:'#6b7280', fontSize:'12px',
                      display:'flex', alignItems:'center', gap:'4px'
                    }}>
                      <FaEye size={11} /> {post.views?.toLocaleString()}
                    </span>
                    <span style={{ color:'#6b7280', fontSize:'12px' }}>
                      {new Date(post.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  {/* ✅ Read More — Blog Detail Pe Jata Hai */}
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      color:'#6366f1', fontWeight:600,
                      fontSize:'14px', textDecoration:'none'
                    }}
                  >
                    Read More →
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