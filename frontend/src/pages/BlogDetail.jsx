import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaEye, FaTag, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import Layout from '../components/common/Layout';

const allPosts = [
  {
    id: 1,
    slug: 'top-10-final-year-project-ideas-mca-2024',
    title: 'Top 10 Final Year Project Ideas for MCA Students 2024',
    excerpt: 'Choosing the right final year project is difficult. Here are top 10 trending project ideas.',
    content: `
      <h2>Introduction</h2>
      <p>Selecting the right final year project is one of the most important decisions in your MCA journey. The right project can boost your marks and career both.</p>

      <h2>Top 10 Project Ideas</h2>

      <h3>1. E-Commerce Platform with AI Recommendations</h3>
      <p>Build a complete e-commerce platform using React.js + Node.js + MySQL with AI-based product recommendations. This project is very impressive and uses modern technologies.</p>

      <h3>2. Hospital Management System</h3>
      <p>Complete hospital management system with patient registration, doctor appointment booking, and billing. This is a practical project that is very popular in universities.</p>

      <h3>3. Online Learning Platform</h3>
      <p>Build a platform like YouTube where teachers can upload courses and students can enroll. Include video streaming, quizzes, and certificate generation.</p>

      <h3>4. Food Delivery App</h3>
      <p>Build an app like Swiggy/Zomato using React Native. Include real-time tracking, payment integration, and admin panel.</p>

      <h3>5. Library Management System</h3>
      <p>Complete library system with book issue/return tracking, fine calculation, and member management. Simple but very effective project.</p>

      <h3>6. Inventory Management System</h3>
      <p>Inventory tracking system for small businesses. Include stock management, purchase orders, and sales reports.</p>

      <h3>7. Student Result Management System</h3>
      <p>University result system with automated marks entry, result generation, and merit list creation.</p>

      <h3>8. Online Voting System</h3>
      <p>Secure online voting system with OTP verification, result counting, and admin panel.</p>

      <h3>9. Crime Record Management System</h3>
      <p>Crime record system for police department with case management, suspect tracking, and report generation.</p>

      <h3>10. Agriculture Management System</h3>
      <p>Crop management system for farmers with weather integration and market price tracking.</p>

      <h2>Conclusion</h2>
      <p>Choose any of these projects and get it built by TG Tech Solutions! We provide complete source code, documentation, and PPT presentation.</p>
    `,
    category: 'career',
    tags: ['MCA', 'Final Year Project', 'Career'],
    views: 1250,
    read_time: 8,
    created_at: '2024-01-15',
    author: 'Takshak Ghagi'
  },
  {
    id: 2,
    slug: 'how-to-get-software-job-after-mca-complete-roadmap',
    title: 'How to Get a Software Job After MCA — Complete Roadmap',
    excerpt: 'Getting a software job after MCA is not difficult if you follow the right path.',
    content: `
      <h2>Introduction</h2>
      <p>Getting a software job after MCA degree has become competitive. But with the right skills and strategy, you can easily land your dream job.</p>

      <h2>Required Skills</h2>

      <h3>1. Programming Languages</h3>
      <p>Learn one language properly — Python, Java, or JavaScript. Master it from basics to advanced level.</p>

      <h3>2. Web Development</h3>
      <p>Learn React.js or Angular for frontend and Node.js or Spring Boot for backend development.</p>

      <h3>3. Database</h3>
      <p>Learn MySQL or MongoDB properly. Understand SQL queries, joins, and indexing thoroughly.</p>

      <h3>4. DSA (Data Structures & Algorithms)</h3>
      <p>Practice on LeetCode. Focus on Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming.</p>

      <h2>Job Search Strategy</h2>

      <h3>Resume</h3>
      <p>Create an ATS-friendly resume. Clearly mention Skills, Projects, and Education.</p>

      <h3>LinkedIn Profile</h3>
      <p>Fill your LinkedIn profile properly. Most recruiters reach candidates through LinkedIn.</p>

      <h3>GitHub Profile</h3>
      <p>Upload your projects on GitHub. An active GitHub profile is very impressive to recruiters.</p>

      <h2>Conclusion</h2>
      <p>With consistent practice and the right guidance, you can definitely get a job. Need help? Contact TG Tech Solutions!</p>
    `,
    category: 'placement',
    tags: ['MCA', 'Job', 'Career', 'Placement'],
    views: 2100,
    read_time: 12,
    created_at: '2024-02-10',
    author: 'Takshak Ghagi'
  },
  {
    id: 3,
    slug: 'reactjs-vs-vuejs-vs-angular-2024',
    title: 'React.js vs Vue.js vs Angular — Which Should You Learn?',
    excerpt: 'Confused about frontend frameworks? Find out which framework to learn in 2024.',
    content: `
      <h2>Introduction</h2>
      <p>In 2024, there are three major frontend frameworks — React, Vue, and Angular. Which one should you learn? Let's do a detailed comparison.</p>

      <h2>React.js</h2>
      <p>Created by Facebook. The most popular framework with the highest job market demand.</p>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM — fast performance</li>
        <li>Large community support</li>
        <li>Flexible — it's a library, not a framework</li>
      </ul>

      <h2>Vue.js</h2>
      <p>Easy to learn. Best for beginners. Very popular in China.</p>
      <ul>
        <li>Simple and clean syntax</li>
        <li>Easy learning curve</li>
        <li>Good documentation</li>
        <li>Smaller community than React</li>
      </ul>

      <h2>Angular</h2>
      <p>Created by Google. Best for enterprise applications. TypeScript is mandatory.</p>
      <ul>
        <li>Complete full-featured framework</li>
        <li>TypeScript based</li>
        <li>Best for enterprise level applications</li>
        <li>Steep learning curve</li>
      </ul>

      <h2>Our Recommendation</h2>
      <p><strong>For Beginners:</strong> React.js<br/>
      <strong>For Job Market:</strong> React.js<br/>
      <strong>For Enterprise:</strong> Angular</p>

      <h2>Conclusion</h2>
      <p>Learn React.js — it has the highest demand in the job market and the largest community!</p>
    `,
    category: 'programming',
    tags: ['React', 'Vue', 'Angular', 'Frontend'],
    views: 890,
    read_time: 10,
    created_at: '2024-03-05',
    author: 'Takshak Ghagi'
  },
];

export default function BlogDetail() {
  const { slug } = useParams();
  const [post,    setPost]    = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const found = allPosts.find(p => p.slug === slug);
    setPost(found || null);
    if (found) {
      setRelated(allPosts.filter(p => p.slug !== slug).slice(0, 2));
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <div style={{
          minHeight:'80vh', display:'flex',
          alignItems:'center', justifyContent:'center',
          padding:'100px 24px', textAlign:'center'
        }}>
          <div>
            <div style={{ fontSize:'64px', marginBottom:'16px' }}>📝</div>
            <h2 style={{ color:'#fff', fontSize:'24px', marginBottom:'12px' }}>
              Post Not Found!
            </h2>
            <Link to="/blog">
              <button style={{
                padding:'12px 24px', borderRadius:'12px',
                background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color:'#fff', border:'none', cursor:'pointer', fontWeight:600
              }}>
                ← Back to Blog
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const categoryColors = {
    programming: '#6366f1',
    career:      '#10b981',
    placement:   '#f59e0b',
    interview:   '#ef4444',
    technology:  '#8b5cf6',
    tutorial:    '#06b6d4',
  };

  return (
    <Layout>
      {/* Hero */}
      <section style={{
        padding:'100px 24px 60px',
        background:'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)'
      }}>
        <div style={{ maxWidth:'800px', margin:'0 auto' }}>
          <Link to="/blog">
            <motion.button
              whileHover={{ x:-4 }}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'10px', padding:'8px 16px',
                color:'#9ca3af', cursor:'pointer',
                fontSize:'14px', marginBottom:'24px'
              }}>
              <FaArrowLeft size={14} /> Back to Blog
            </motion.button>
          </Link>

          <span style={{
            display:'inline-block', padding:'4px 14px', borderRadius:'100px',
            background:`${categoryColors[post.category]}20`,
            border:`1px solid ${categoryColors[post.category]}40`,
            color: categoryColors[post.category],
            fontSize:'12px', fontWeight:600,
            textTransform:'capitalize', marginBottom:'16px'
          }}>
            {post.category}
          </span>

          <motion.h1
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            style={{
              fontSize:'clamp(24px,4vw,42px)', fontWeight:800,
              color:'#fff', lineHeight:1.2, marginBottom:'20px'
            }}>
            {post.title}
          </motion.h1>

          <div style={{ display:'flex', gap:'24px', flexWrap:'wrap', marginBottom:'24px' }}>
            <span style={{ color:'#6b7280', fontSize:'14px' }}>✍️ {post.author}</span>
            <span style={{ color:'#6b7280', fontSize:'14px', display:'flex', alignItems:'center', gap:'6px' }}>
              <FaClock size={13} /> {post.read_time} min read
            </span>
            <span style={{ color:'#6b7280', fontSize:'14px', display:'flex', alignItems:'center', gap:'6px' }}>
              <FaEye size={13} /> {post.views?.toLocaleString()} views
            </span>
            <span style={{ color:'#6b7280', fontSize:'14px' }}>
              📅 {new Date(post.created_at).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}
            </span>
          </div>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {post.tags?.map(tag => (
              <span key={tag} style={{
                display:'flex', alignItems:'center', gap:'4px',
                padding:'4px 12px', borderRadius:'100px',
                background:'rgba(99,102,241,0.15)',
                border:'1px solid rgba(99,102,241,0.3)',
                color:'#a5b4fc', fontSize:'12px'
              }}>
                <FaTag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding:'0 24px 80px', maxWidth:'800px', margin:'0 auto' }}>
        <div style={{
          background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:'24px', padding:'40px', marginBottom:'40px'
        }}>
          <div
            dangerouslySetInnerHTML={{ __html: post.content
              .replace(/<h2>/g, '<h2 style="color:#fff;font-size:24px;font-weight:700;margin:32px 0 16px">')
              .replace(/<h3>/g, '<h3 style="color:#e5e7eb;font-size:18px;font-weight:600;margin:24px 0 12px">')
              .replace(/<p>/g, '<p style="color:#9ca3af;line-height:1.8;margin-bottom:16px">')
              .replace(/<ul>/g, '<ul style="color:#9ca3af;padding-left:24px;margin-bottom:16px">')
              .replace(/<li>/g, '<li style="margin-bottom:8px">')
              .replace(/<strong>/g, '<strong style="color:#fff">')
            }}
          />
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale:1.01 }}
          style={{
            background:'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1))',
            border:'1px solid rgba(99,102,241,0.3)',
            borderRadius:'20px', padding:'32px',
            textAlign:'center', marginBottom:'40px'
          }}>
          <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:700, marginBottom:'8px' }}>
            Need Help with Your Project? 🚀
          </h3>
          <p style={{ color:'#9ca3af', fontSize:'15px', marginBottom:'20px' }}>
            TG Tech Solutions provides complete final year projects, documentation and more!
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/services">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{
                  padding:'12px 24px', borderRadius:'12px',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color:'#fff', border:'none', cursor:'pointer', fontWeight:600
                }}>
                View Services
              </motion.button>
            </Link>
            <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
              <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{
                  padding:'12px 24px', borderRadius:'12px',
                  background:'rgba(37,211,102,0.15)',
                  border:'1px solid rgba(37,211,102,0.4)',
                  color:'#25d366', cursor:'pointer', fontWeight:600,
                  display:'flex', alignItems:'center', gap:'8px'
                }}>
                <FaWhatsapp /> WhatsApp
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div>
            <h2 style={{ color:'#fff', fontSize:'22px', fontWeight:700, marginBottom:'20px' }}>
              Related Articles
            </h2>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
              gap:'16px'
            }}>
              {related.map(rPost => (
                <Link key={rPost.id} to={`/blog/${rPost.slug}`}>
                  <motion.div
                    whileHover={{ y:-4, boxShadow:'0 20px 40px rgba(99,102,241,0.15)' }}
                    style={{
                      background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.08)',
                      borderRadius:'16px', padding:'20px',
                      transition:'all 0.3s', cursor:'pointer'
                    }}>
                    <span style={{
                      display:'inline-block', padding:'3px 10px', borderRadius:'100px',
                      background:`${categoryColors[rPost.category]}20`,
                      color: categoryColors[rPost.category],
                      fontSize:'11px', fontWeight:600, marginBottom:'10px',
                      textTransform:'capitalize'
                    }}>
                      {rPost.category}
                    </span>
                    <h3 style={{ color:'#fff', fontWeight:600, fontSize:'15px', marginBottom:'8px', lineHeight:1.4 }}>
                      {rPost.title}
                    </h3>
                    <p style={{ color:'#6b7280', fontSize:'13px', display:'flex', alignItems:'center', gap:'4px' }}>
                      <FaClock size={11} /> {rPost.read_time} min read
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}