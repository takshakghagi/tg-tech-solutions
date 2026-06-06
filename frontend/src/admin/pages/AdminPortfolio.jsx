// frontend/src/admin/pages/AdminPortfolio.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaGlobe, FaGraduationCap, FaFileAlt, FaTimes, FaCheck } from 'react-icons/fa';
import API from '../../services/api';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'websites', label: 'Sample Websites',  icon: FaGlobe,        color: '#6366f1' },
  { key: 'projects', label: 'Final Yr Projects', icon: FaGraduationCap, color: '#10b981' },
  { key: 'docs',     label: 'Documentation',     icon: FaFileAlt,      color: '#ef4444' },
];

const emptyWebsite = { type: 'website', title: '', description: '', image_url: '', live_link: '', tags: '', price_min: '', price_max: '', color: '#6366f1', sort_order: 0, is_active: 1 };
const emptyProject = { title: '', course: '', description: '', tags: '', price_min: '', price_max: '', delivery: '3 Days', color: '#6366f1', sort_order: 0, is_active: 1 };
const emptyDoc     = { title: '', description: '', price_min: '', price_max: '', color: '#ef4444', sort_order: 0, is_active: 1 };

export default function AdminPortfolio() {
  const [tab,     setTab]     = useState('websites');
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);   // null = add, object = edit
  const [form,    setForm]    = useState(emptyWebsite);
  const [saving,  setSaving]  = useState(false);

  const emptyFor = (t) => t === 'websites' ? emptyWebsite : t === 'projects' ? emptyProject : emptyDoc;

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: res } = await API.get(`/portfolio/admin/${tab}`);
      setData(res.data || []);
    } catch {
      toast.error('Failed to load data!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [tab]);

  const openAdd  = () => { setEditing(null); setForm(emptyFor(tab)); setModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.title) return toast.error('Title required!');
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/portfolio/admin/${tab}/${editing.id}`, form);
        toast.success('Updated!');
      } else {
        await API.post(`/portfolio/admin/${tab}`, form);
        toast.success('Created!');
      }
      closeModal();
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error!');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await API.delete(`/portfolio/admin/${tab}/${id}`);
      toast.success('Deleted!');
      fetchData();
    } catch {
      toast.error('Delete failed!');
    }
  };

  const F = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '24px', margin: 0 }}>Portfolio Manager</h1>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0' }}>Manage sample websites, projects & docs</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={openAdd}
          style={{
            padding: '10px 20px', borderRadius: '10px',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: '14px', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
          <FaPlus /> Add New
        </motion.button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '9px 20px', borderRadius: '10px', cursor: 'pointer',
              border: `1px solid ${tab === t.key ? t.color : 'rgba(255,255,255,0.1)'}`,
              background: tab === t.key ? `${t.color}20` : 'rgba(255,255,255,0.03)',
              color: tab === t.key ? t.color : '#9ca3af',
              fontSize: '13px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '7px'
            }}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading...</div>
      ) : data.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', color: '#6b7280'
        }}>
          No items yet. Click "Add New" to create one.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map(item => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '14px 18px',
                flexWrap: 'wrap'
              }}>
              {/* Color dot */}
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: '160px' }}>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px', margin: 0 }}>{item.title}</p>
                <p style={{ color: '#6b7280', fontSize: '12px', margin: '2px 0 0' }}>
                  {item.course || item.type || '—'} &nbsp;•&nbsp;
                  ₹{item.price_min} – ₹{item.price_max}
                  {item.delivery && ` • ${item.delivery}`}
                </p>
              </div>

              {/* Active badge */}
              <span style={{
                padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
                background: item.is_active ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                border: `1px solid ${item.is_active ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                color: item.is_active ? '#34d399' : '#f87171'
              }}>{item.is_active ? 'Active' : 'Hidden'}</span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => openEdit(item)}
                  style={{
                    padding: '7px 14px', borderRadius: '8px', cursor: 'pointer',
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                    color: '#818cf8', fontSize: '12px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '5px'
                  }}>
                  <FaEdit size={11} /> Edit
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleDelete(item.id)}
                  style={{
                    padding: '7px 14px', borderRadius: '8px', cursor: 'pointer',
                    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                    color: '#f87171', fontSize: '12px', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '5px'
                  }}>
                  <FaTrash size={11} /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
              zIndex: 9999, display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '20px'
            }}>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '20px', padding: '28px',
                width: '100%', maxWidth: '520px',
                maxHeight: '85vh', overflowY: 'auto'
              }}>

              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', margin: 0 }}>
                  {editing ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button onClick={closeModal}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 10px', color: '#9ca3af', cursor: 'pointer' }}>
                  <FaTimes size={15} />
                </button>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                {/* Title */}
                <div>
                  <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Title *</label>
                  <input value={form.title} onChange={e => F('title', e.target.value)}
                    placeholder="e.g. E-Commerce Store"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                {/* Type (only for websites) */}
                {tab === 'websites' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Type</label>
                    <select value={form.type} onChange={e => F('type', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none' }}>
                      <option value="website">Website</option>
                      <option value="app">Mobile App</option>
                    </select>
                  </div>
                )}

                {/* Course (only for projects) */}
                {tab === 'projects' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Course</label>
                    <input value={form.course} onChange={e => F('course', e.target.value)}
                      placeholder="e.g. MCA / BCA"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                {/* Description */}
                <div>
                  <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Description</label>
                  <textarea value={form.description} onChange={e => F('description', e.target.value)}
                    rows={3} placeholder="Short description..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>

                {/* Image URL (websites only) */}
                {tab === 'websites' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Image URL</label>
                    <input value={form.image_url} onChange={e => F('image_url', e.target.value)}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                {/* Live Link (websites only) */}
                {tab === 'websites' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Live Link</label>
                    <input value={form.live_link} onChange={e => F('live_link', e.target.value)}
                      placeholder="https://your-demo.vercel.app"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                {/* Tags */}
                {tab !== 'docs' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Tech Tags <span style={{ color: '#4b5563' }}>(comma separated)</span></label>
                    <input value={form.tags} onChange={e => F('tags', e.target.value)}
                      placeholder="React.js,Node.js,MySQL"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                {/* Price Range */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Min Price (₹)</label>
                    <input type="number" value={form.price_min} onChange={e => F('price_min', e.target.value)}
                      placeholder="999"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Max Price (₹)</label>
                    <input type="number" value={form.price_max} onChange={e => F('price_max', e.target.value)}
                      placeholder="4999"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* Delivery (projects only) */}
                {tab === 'projects' && (
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Delivery Time</label>
                    <input value={form.delivery} onChange={e => F('delivery', e.target.value)}
                      placeholder="3 Days"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                )}

                {/* Color + Active */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="color" value={form.color} onChange={e => F('color', e.target.value)}
                        style={{ width: '44px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'none' }} />
                      <span style={{ color: '#9ca3af', fontSize: '13px' }}>{form.color}</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Status</label>
                    <button onClick={() => F('is_active', form.is_active ? 0 : 1)}
                      style={{
                        padding: '10px 16px', borderRadius: '10px', cursor: 'pointer',
                        background: form.is_active ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.12)',
                        border: `1px solid ${form.is_active ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.25)'}`,
                        color: form.is_active ? '#34d399' : '#f87171',
                        fontSize: '13px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '6px'
                      }}>
                      {form.is_active ? <><FaCheck size={11} /> Active</> : <><FaTimes size={11} /> Hidden</>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleSave} disabled={saving}
                style={{
                  width: '100%', marginTop: '22px', padding: '13px',
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                  color: '#fff', border: 'none', borderRadius: '12px',
                  cursor: 'pointer', fontSize: '15px', fontWeight: 700,
                  opacity: saving ? 0.7 : 1
                }}>
                {saving ? 'Saving...' : editing ? 'Update Item' : 'Create Item'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}