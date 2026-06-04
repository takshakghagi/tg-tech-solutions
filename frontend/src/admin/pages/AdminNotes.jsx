import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdEdit, MdDelete, MdClose, MdBook } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

const COURSES   = ['MCA','BCA','B.Tech','Diploma','MBA','M.Tech','BSC','Other'];
const LANGUAGES = ['Hindi','English','Hinglish'];

const emptyForm = {
  title:'', subject:'', description:'', course:'MCA',
  semester:'1st', price:'0', is_free:false,
  file_url:'', thumbnail:'', language:'English'
};

export default function AdminNotes() {
  const [notes,   setNotes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(emptyForm);
  const [page,    setPage]    = useState(1);
  const [total,   setTotal]   = useState(0);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/notes?page=${page}&limit=10`);
      setNotes(data.data);
      setTotal(data.pagination.total);
    } catch {
      toast.error('Failed to load notes!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, [page]);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (note) => {
    setEditing(note);
    setForm({ ...note, is_free: !!note.is_free });
    setModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await API.put(`/admin/notes/${editing.id}`, form);
        toast.success('Note updated!');
      } else {
        await API.post('/admin/notes', form);
        toast.success('Note created!');
      }
      setModal(false);
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed!');
    }
  };

  const deleteNote = async (id) => {
    if (!confirm('Delete this note?')) return;
    try {
      await API.delete(`/admin/notes/${id}`);
      toast.success('Note deleted!');
      fetchNotes();
    } catch {
      toast.error('Failed to delete!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notes Management</h1>
          <p className="text-gray-400 text-sm">Total {total} notes</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAdd}
          className="flex items-center gap-2 gradient-bg px-5 py-2.5 rounded-xl text-white font-medium shadow-lg shadow-indigo-500/25"
        >
          <MdAdd size={20} /> Add Note
        </motion.button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
          ))
        ) : notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <MdBook className="text-indigo-400" size={20} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(note)}
                  className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all">
                  <MdEdit size={16} />
                </button>
                <button onClick={() => deleteNote(note.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                  <MdDelete size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{note.title}</h3>
            <p className="text-gray-400 text-xs mb-3">{note.subject} • {note.course} • {note.semester}</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-bold">
                {note.is_free ? 'FREE' : `₹${note.price}`}
              </span>
              <span className="text-xs text-gray-500">{note.downloads} downloads</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3">
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
          className="px-4 py-2 rounded-xl glass text-gray-300 disabled:opacity-40 text-sm">Previous</button>
        <span className="px-4 py-2 text-white text-sm">Page {page}</span>
        <button onClick={() => setPage(p => p+1)} disabled={notes.length<10}
          className="px-4 py-2 rounded-xl glass text-gray-300 disabled:opacity-40 text-sm">Next</button>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="rounded-2xl p-6 w-full max-w-lg my-4"
              style={{ background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {editing ? 'Edit Note' : 'Add New Note'}
                </h3>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white">
                  <MdClose size={22} />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Title', key: 'title', placeholder: 'Note title' },
                  { label: 'Subject', key: 'subject', placeholder: 'e.g. Data Structures' },
                  { label: 'File URL (PDF)', key: 'file_url', placeholder: 'https://...' },
                  { label: 'Thumbnail URL', key: 'thumbnail', placeholder: 'https://...' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400 mb-1 block">{label}</label>
                    <input
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none border border-white/10 text-sm"
                      style={{ background: '#0f0f1a' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Note description..."
                    rows={3}
                    className="w-full rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none border border-white/10 text-sm resize-none"
                    style={{ background: '#0f0f1a' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Course</label>
                    <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-white outline-none border border-white/10 text-sm"
                      style={{ background: '#0f0f1a' }}>
                      {COURSES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Semester</label>
                    <input value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })}
                      placeholder="1st" className="w-full rounded-xl px-4 py-2.5 text-white outline-none border border-white/10 text-sm"
                      style={{ background: '#0f0f1a' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Price (₹)</label>
                    <input type="number" value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-white outline-none border border-white/10 text-sm"
                      style={{ background: '#0f0f1a' }} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Language</label>
                    <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}
                      className="w-full rounded-xl px-4 py-2.5 text-white outline-none border border-white/10 text-sm"
                      style={{ background: '#0f0f1a' }}>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.is_free}
                    onChange={e => setForm({ ...form, is_free: e.target.checked })}
                    className="w-4 h-4 accent-indigo-500" />
                  <span className="text-sm text-gray-300">Free Note</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setModal(false)}
                    className="flex-1 py-3 rounded-xl glass text-gray-300 hover:text-white transition-all">
                    Cancel
                  </button>
                  <button onClick={handleSubmit}
                    className="flex-1 py-3 rounded-xl gradient-bg text-white font-semibold">
                    {editing ? 'Update Note' : 'Create Note'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}