import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaWhatsapp, FaPaperPlane, FaCode,
  FaMobileAlt, FaGraduationCap, FaBook,
  FaFileAlt, FaPaintBrush, FaIdCard,
  FaBriefcase, FaLaptopCode, FaUpload,
  FaFile, FaTimes, FaCheckCircle
} from 'react-icons/fa';
import Layout from '../components/common/Layout';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const SERVICES = [
  { id:1, title:'Custom Website Development', icon: FaCode,          color:'#6366f1' },
  { id:2, title:'Mobile App Development',     icon: FaMobileAlt,     color:'#8b5cf6' },
  { id:3, title:'Final Year Project',         icon: FaGraduationCap, color:'#10b981' },
  { id:4, title:'IT Notes & Study Material',  icon: FaBook,          color:'#f59e0b' },
  { id:5, title:'Project Documentation',      icon: FaFileAlt,       color:'#ef4444' },
  { id:6, title:'Graphic Design',             icon: FaPaintBrush,    color:'#ec4899' },
  { id:7, title:'Resume & Portfolio',         icon: FaIdCard,        color:'#06b6d4' },
  { id:8, title:'Internship Project',         icon: FaBriefcase,     color:'#84cc16' },
  { id:9, title:'Software Development',       icon: FaLaptopCode,    color:'#f97316' },
];

const BUDGETS = [
  '₹500 - ₹1,000',
  '₹1,000 - ₹2,500',
  '₹2,500 - ₹5,000',
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000+'
];

const DEADLINES = [
  '1-3 Days (Urgent)',
  '3-7 Days',
  '1-2 Weeks',
  '2-4 Weeks',
  '1-2 Months',
  'Flexible'
];

export default function Order() {
  const [step,         setStep]         = useState(1);
  const [loading,      setLoading]      = useState(false);
  const [success,      setSuccess]      = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading,    setUploading]    = useState(false);
  const [orderId,      setOrderId]      = useState(null);
  const [form,         setForm]         = useState({
    service_id:   '',
    title:        '',
    description:  '',
    requirements: '',
    budget:       '',
    deadline:     '',
    priority:     'medium'
  });

  const { user }       = useAuth();
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) setForm(prev => ({ ...prev, service_id: serviceId }));
    if (!user) {
      toast.error('Please login first!');
      navigate('/login');
    }
  }, [user]);

  const selectedService = SERVICES.find(s => s.id === parseInt(form.service_id));

  // File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await API.post('/upload/order-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedFile(data.data);
      toast.success('File uploaded! ✅');
    } catch {
      toast.error('File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  // Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const deadlineDate = new Date();
      if (form.deadline.includes('1-3'))         deadlineDate.setDate(deadlineDate.getDate() + 3);
      else if (form.deadline.includes('3-7'))    deadlineDate.setDate(deadlineDate.getDate() + 7);
      else if (form.deadline.includes('1-2 W'))  deadlineDate.setDate(deadlineDate.getDate() + 14);
      else if (form.deadline.includes('2-4'))    deadlineDate.setDate(deadlineDate.getDate() + 28);
      else if (form.deadline.includes('1-2 M'))  deadlineDate.setDate(deadlineDate.getDate() + 60);
      else deadlineDate.setDate(deadlineDate.getDate() + 30);

      const deadlineStr = deadlineDate.toISOString().split('T')[0];
      const budgetNum   = parseFloat(form.budget.replace(/[₹,+\s]/g, '').split('-')[0]) || 999;

      const { data } = await API.post('/orders/create', {
        service_id:   parseInt(form.service_id),
        title:        form.title,
        description:  form.description,
        requirements: form.requirements + (uploadedFile ? `\n\nFile: ${uploadedFile.originalname}` : ''),
        budget:       budgetNum,
        deadline:     deadlineStr,
        priority:     form.priority,
        file_url:     uploadedFile?.url || null
      });

      setOrderId(data.data?.orderId);
      setSuccess(true);
      toast.success('Order placed! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed!');
    } finally {
      setLoading(false);
    }
  };

  // Success Page
  if (success) {
    return (
      <Layout>
        <div style={{
          minHeight:'80vh', display:'flex',
          alignItems:'center', justifyContent:'center',
          padding:'100px 24px'
        }}>
          <motion.div
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            style={{
              textAlign:'center', maxWidth:'500px',
              background:'rgba(16,185,129,0.1)',
              border:'1px solid rgba(16,185,129,0.3)',
              borderRadius:'28px', padding:'60px 40px'
            }}
          >
            <motion.div
              animate={{ scale:[1,1.2,1] }}
              transition={{ duration:0.5 }}
              style={{ fontSize:'72px', marginBottom:'24px' }}
            >
              🎉
            </motion.div>
            <h2 style={{ color:'#10b981', fontSize:'28px', fontWeight:800, marginBottom:'12px' }}>
              Order Placed Successfully!
            </h2>
            <p style={{ color:'#9ca3af', fontSize:'16px', marginBottom:'8px', lineHeight:1.7 }}>
              We will contact you within 24 hours!
            </p>
            <div style={{
              background:'rgba(255,255,255,0.05)',
              borderRadius:'12px', padding:'16px',
              marginBottom:'28px', textAlign:'left'
            }}>
              {[
                { label:'Service',  value: selectedService?.title },
                { label:'Title',    value: form.title             },
                { label:'Budget',   value: form.budget            },
                { label:'Deadline', value: form.deadline          },
                { label:'Priority', value: form.priority          },
              ].map((item, i) => (
                <div key={i} style={{
                  display:'flex', justifyContent:'space-between',
                  padding:'6px 0',
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <span style={{ color:'#6b7280', fontSize:'13px' }}>{item.label}</span>
                  <span style={{ color:'#fff', fontSize:'13px', fontWeight:500, textTransform:'capitalize' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <motion.button
                whileHover={{ scale:1.05 }}
                onClick={() => navigate('/dashboard/orders')}
                style={{
                  padding:'12px 24px', borderRadius:'12px',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color:'#fff', border:'none', cursor:'pointer', fontWeight:600
                }}
              >
                Track Order
              </motion.button>
              <a href="https://wa.me/917020521466" target="_blank" rel="noreferrer">
                <motion.button
                  whileHover={{ scale:1.05 }}
                  style={{
                    padding:'12px 24px', borderRadius:'12px',
                    background:'rgba(37,211,102,0.15)',
                    border:'1px solid rgba(37,211,102,0.4)',
                    color:'#25d366', cursor:'pointer', fontWeight:600,
                    display:'flex', alignItems:'center', gap:'8px'
                  }}
                >
                  <FaWhatsapp /> WhatsApp
                </motion.button>
              </a>
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
        padding:'100px 24px 40px', textAlign:'center',
        background:'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 60%)'
      }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
          <span style={{
            display:'inline-block', padding:'6px 20px', borderRadius:'100px',
            background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)',
            color:'#a5b4fc', fontSize:'13px', marginBottom:'16px'
          }}>📋 Place an Order</span>
          <h1 style={{
            fontSize:'clamp(28px,4vw,48px)', fontWeight:800,
            color:'#fff', marginBottom:'12px'
          }}>
            Let's Build Something{' '}
            <span style={{
              background:'linear-gradient(135deg,#6366f1,#a855f7)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>Amazing</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'16px' }}>
            Fill the form and we'll contact you within 24 hours!
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'center', gap:'0',
          marginTop:'32px', flexWrap:'wrap'
        }}>
          {['Select Service', 'Project Details', 'Review & Submit'].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'8px 16px', borderRadius:'100px',
                background: step > i
                  ? 'rgba(99,102,241,0.3)'
                  : step === i+1
                  ? 'rgba(99,102,241,0.2)'
                  : 'rgba(255,255,255,0.03)',
                border:`1px solid ${step >= i+1 ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
              }}>
                <div style={{
                  width:'24px', height:'24px', borderRadius:'50%',
                  background: step >= i+1
                    ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                    : 'rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontSize:'12px', fontWeight:700
                }}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span style={{
                  color: step >= i+1 ? '#a5b4fc' : '#6b7280',
                  fontSize:'13px', fontWeight:500
                }}>{s}</span>
              </div>
              {i < 2 && (
                <div style={{
                  width:'40px', height:'1px',
                  background: step > i+1
                    ? 'rgba(99,102,241,0.5)'
                    : 'rgba(255,255,255,0.1)'
                }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding:'20px 24px 100px', maxWidth:'800px', margin:'0 auto' }}>
        <form onSubmit={handleSubmit}>

          {/* ===== STEP 1 — Service Selection ===== */}
          {step === 1 && (
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}>
              <h2 style={{ color:'#fff', fontWeight:700, fontSize:'22px', marginBottom:'24px' }}>
                Select a Service
              </h2>
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',
                gap:'12px'
              }}>
                {SERVICES.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale:1.03 }}
                    whileTap={{ scale:0.97 }}
                    onClick={() => setForm({ ...form, service_id: String(service.id) })}
                    style={{
                      padding:'20px',
                      background: form.service_id === String(service.id)
                        ? `${service.color}20` : 'rgba(255,255,255,0.03)',
                      border:`2px solid ${form.service_id === String(service.id)
                        ? service.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius:'16px', cursor:'pointer', transition:'all 0.2s',
                      display:'flex', alignItems:'center', gap:'12px'
                    }}
                  >
                    <div style={{
                      width:'44px', height:'44px', borderRadius:'12px',
                      background:`${service.color}20`, flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center'
                    }}>
                      <service.icon size={20} style={{ color:service.color }} />
                    </div>
                    <span style={{
                      color: form.service_id === String(service.id) ? '#fff' : '#9ca3af',
                      fontSize:'14px', fontWeight:500
                    }}>
                      {service.title}
                    </span>
                    {form.service_id === String(service.id) && (
                      <FaCheckCircle style={{ color:service.color, marginLeft:'auto' }} />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="button"
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                onClick={() => {
                  if (!form.service_id) { toast.error('Please select a service!'); return; }
                  setStep(2);
                }}
                style={{
                  width:'100%', padding:'14px', marginTop:'24px',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  cursor:'pointer', fontSize:'16px', fontWeight:600,
                  boxShadow:'0 8px 30px rgba(99,102,241,0.3)'
                }}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}

          {/* ===== STEP 2 — Project Details ===== */}
          {step === 2 && (
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'8px', padding:'8px 12px',
                    color:'#9ca3af', cursor:'pointer'
                  }}>← Back</button>
                <h2 style={{ color:'#fff', fontWeight:700, fontSize:'22px' }}>
                  Project Details
                </h2>
              </div>

              {/* Selected Service Badge */}
              {selectedService && (
                <div style={{
                  display:'flex', alignItems:'center', gap:'12px',
                  padding:'16px', borderRadius:'12px',
                  background:`${selectedService.color}15`,
                  border:`1px solid ${selectedService.color}30`,
                  marginBottom:'24px'
                }}>
                  <selectedService.icon size={20} style={{ color:selectedService.color }} />
                  <span style={{ color:'#fff', fontWeight:600 }}>{selectedService.title}</span>
                </div>
              )}

              <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                {/* Title */}
                <div>
                  <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                    Project Title *
                  </label>
                  <input type="text" value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Library Management System"
                    required
                    style={{
                      width:'100%', padding:'12px 16px',
                      background:'rgba(255,255,255,0.05)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:'12px', color:'#fff',
                      fontSize:'14px', outline:'none', boxSizing:'border-box'
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                    Project Description *
                  </label>
                  <textarea value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe your project in detail..."
                    required rows={4}
                    style={{
                      width:'100%', padding:'12px 16px',
                      background:'rgba(255,255,255,0.05)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:'12px', color:'#fff',
                      fontSize:'14px', outline:'none', resize:'vertical',
                      fontFamily:'inherit', boxSizing:'border-box'
                    }}
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                    Specific Requirements
                  </label>
                  <textarea value={form.requirements}
                    onChange={e => setForm({ ...form, requirements: e.target.value })}
                    placeholder="Technologies, features or any specific requirements..."
                    rows={3}
                    style={{
                      width:'100%', padding:'12px 16px',
                      background:'rgba(255,255,255,0.05)',
                      border:'1px solid rgba(255,255,255,0.1)',
                      borderRadius:'12px', color:'#fff',
                      fontSize:'14px', outline:'none', resize:'vertical',
                      fontFamily:'inherit', boxSizing:'border-box'
                    }}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                    Attach File (Optional) — PDF, Image, Word, ZIP (Max 10MB)
                  </label>

                  {uploadedFile ? (
                    <div style={{
                      display:'flex', alignItems:'center', gap:'12px',
                      padding:'12px 16px',
                      background:'rgba(16,185,129,0.1)',
                      border:'1px solid rgba(16,185,129,0.3)',
                      borderRadius:'12px'
                    }}>
                      <FaFile size={20} style={{ color:'#10b981' }} />
                      <div style={{ flex:1 }}>
                        <p style={{ color:'#fff', fontSize:'14px' }}>{uploadedFile.originalname}</p>
                        <p style={{ color:'#6b7280', fontSize:'12px' }}>
                          {(uploadedFile.size / 1024).toFixed(1)} KB — Uploaded ✅
                        </p>
                      </div>
                      <button type="button" onClick={() => setUploadedFile(null)}
                        style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer' }}>
                        <FaTimes size={16} />
                      </button>
                    </div>
                  ) : (
                    <label style={{
                      display:'flex', alignItems:'center', justifyContent:'center',
                      gap:'12px', padding:'24px',
                      background:'rgba(255,255,255,0.03)',
                      border:'2px dashed rgba(255,255,255,0.1)',
                      borderRadius:'12px', cursor:'pointer'
                    }}>
                      <input type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip"
                        style={{ display:'none' }}
                      />
                      {uploading ? (
                        <p style={{ color:'#9ca3af', fontSize:'14px' }}>⏳ Uploading...</p>
                      ) : (
                        <>
                          <FaUpload size={20} style={{ color:'#6366f1' }} />
                          <p style={{ color:'#9ca3af', fontSize:'14px' }}>
                            Click to upload file
                          </p>
                        </>
                      )}
                    </label>
                  )}
                </div>

                {/* Budget + Deadline */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                  <div>
                    <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                      Budget Range *
                    </label>
                    <select value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                      required
                      style={{
                        width:'100%', padding:'12px 16px',
                        background:'#1a1a2e',
                        border:'1px solid rgba(255,255,255,0.1)',
                        borderRadius:'12px', color:'#fff',
                        fontSize:'14px', outline:'none', boxSizing:'border-box'
                      }}
                    >
                      <option value="">Select Budget</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                      Deadline *
                    </label>
                    <select value={form.deadline}
                      onChange={e => setForm({ ...form, deadline: e.target.value })}
                      required
                      style={{
                        width:'100%', padding:'12px 16px',
                        background:'#1a1a2e',
                        border:'1px solid rgba(255,255,255,0.1)',
                        borderRadius:'12px', color:'#fff',
                        fontSize:'14px', outline:'none', boxSizing:'border-box'
                      }}
                    >
                      <option value="">Select Deadline</option>
                      {DEADLINES.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label style={{ color:'#9ca3af', fontSize:'13px', display:'block', marginBottom:'8px' }}>
                    Priority
                  </label>
                  <div style={{ display:'flex', gap:'10px' }}>
                    {['low','medium','high','urgent'].map(p => (
                      <button key={p} type="button"
                        onClick={() => setForm({ ...form, priority: p })}
                        style={{
                          flex:1, padding:'10px', borderRadius:'10px', cursor:'pointer',
                          border:`1px solid ${form.priority===p
                            ? p==='urgent' ? '#ef4444'
                            : p==='high' ? '#f59e0b'
                            : p==='medium' ? '#6366f1' : '#10b981'
                            : 'rgba(255,255,255,0.1)'}`,
                          background: form.priority===p
                            ? p==='urgent' ? 'rgba(239,68,68,0.2)'
                            : p==='high' ? 'rgba(245,158,11,0.2)'
                            : p==='medium' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'
                            : 'rgba(255,255,255,0.03)',
                          color: form.priority===p ? '#fff' : '#6b7280',
                          fontSize:'13px', fontWeight:500, textTransform:'capitalize'
                        }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                onClick={() => {
                  if (!form.title || !form.description || !form.budget || !form.deadline) {
                    toast.error('Please fill all required fields!');
                    return;
                  }
                  setStep(3);
                }}
                style={{
                  width:'100%', padding:'14px', marginTop:'24px',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  cursor:'pointer', fontSize:'16px', fontWeight:600
                }}
              >
                Review Order →
              </motion.button>
            </motion.div>
          )}

          {/* ===== STEP 3 — Review & Submit ===== */}
          {step === 3 && (
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
                <button type="button" onClick={() => setStep(2)}
                  style={{
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'8px', padding:'8px 12px',
                    color:'#9ca3af', cursor:'pointer'
                  }}>← Back</button>
                <h2 style={{ color:'#fff', fontWeight:700, fontSize:'22px' }}>
                  Review Your Order
                </h2>
              </div>

              {/* Order Summary */}
              <div style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(99,102,241,0.3)',
                borderRadius:'20px', padding:'24px', marginBottom:'20px'
              }}>
                <h3 style={{ color:'#a5b4fc', fontSize:'13px', fontWeight:600,
                  marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>
                  Order Summary
                </h3>
                {[
                  { label:'Service',     value: selectedService?.title       },
                  { label:'Title',       value: form.title                   },
                  { label:'Budget',      value: form.budget                  },
                  { label:'Deadline',    value: form.deadline                },
                  { label:'Priority',    value: form.priority?.toUpperCase() },
                  { label:'File',        value: uploadedFile?.originalname || 'No file attached' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display:'flex', justifyContent:'space-between',
                    padding:'10px 0',
                    borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                    <span style={{ color:'#6b7280', fontSize:'14px' }}>{item.label}</span>
                    <span style={{ color:'#fff', fontSize:'14px', fontWeight:500,
                      maxWidth:'60%', textAlign:'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Description Preview */}
              <div style={{
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:'16px', padding:'20px', marginBottom:'20px'
              }}>
                <p style={{ color:'#6b7280', fontSize:'13px', marginBottom:'8px' }}>Description:</p>
                <p style={{ color:'#d1d5db', fontSize:'14px', lineHeight:1.6 }}>
                  {form.description}
                </p>
              </div>

              {/* Info Box */}
              <div style={{
                background:'rgba(99,102,241,0.1)',
                border:'1px solid rgba(99,102,241,0.3)',
                borderRadius:'12px', padding:'16px', marginBottom:'24px'
              }}>
                <p style={{ color:'#a5b4fc', fontSize:'14px', lineHeight:1.6 }}>
                  ℹ️ After placing the order, we will contact you within <strong>24 hours</strong> to
                  discuss the details and confirm the price.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                style={{
                  width:'100%', padding:'16px',
                  background:'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color:'#fff', border:'none', borderRadius:'12px',
                  cursor:'pointer', fontSize:'16px', fontWeight:700,
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  boxShadow:'0 8px 30px rgba(99,102,241,0.4)',
                  opacity: loading ? 0.7 : 1, marginBottom:'12px'
                }}
              >
                {loading ? 'Placing Order...' : <><FaPaperPlane /> Place Order Now</>}
              </motion.button>

              {/* WhatsApp Alternative */}
              <a href={`https://wa.me/917020521466?text=Hi! I want to order: ${form.title} (${selectedService?.title}). Budget: ${form.budget}`}
                target="_blank" rel="noreferrer">
                <motion.button type="button"
                  whileHover={{ scale:1.02 }}
                  style={{
                    width:'100%', padding:'14px',
                    background:'rgba(37,211,102,0.15)',
                    border:'1px solid rgba(37,211,102,0.4)',
                    borderRadius:'12px', color:'#25d366',
                    cursor:'pointer', fontSize:'15px', fontWeight:600,
                    display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'
                  }}>
                  <FaWhatsapp size={18} /> Or Order via WhatsApp
                </motion.button>
              </a>
            </motion.div>
          )}
        </form>
      </section>
    </Layout>
  );
}