import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdDownload, MdBook, MdOpenInNew } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function UserDownloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    API.get('/user/downloads')
      .then(r => setDownloads(r.data.data.downloads || []))
      .catch(() => toast.error('Failed to load downloads!'))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (noteId, title) => {
    try {
      const { data } = await API.post(`/notes/${noteId}/download`);
      window.open(data.data.download_url, '_blank');
      toast.success(`Downloading: ${title}`);
    } catch {
      toast.error('Download failed!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Downloads</h1>
        <p className="text-gray-400 text-sm">Your purchased notes</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : downloads.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <MdBook size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 mb-2">No downloads yet!</p>
          <a href="/notes" className="text-indigo-400 text-sm hover:text-indigo-300">
            Browse Notes Store →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloads.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                <MdBook className="text-indigo-400" size={22} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-gray-400 text-xs mb-1">{item.subject} • {item.course}</p>
              <p className="text-gray-500 text-xs mb-4">
                Downloaded {item.download_count} times
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDownload(item.id, item.title)}
                className="w-full flex items-center justify-center gap-2 gradient-bg py-2.5 rounded-xl text-white text-sm font-medium"
              >
                <MdDownload size={16} />
                Download PDF
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}