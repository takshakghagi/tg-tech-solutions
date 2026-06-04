import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdStar, MdCheck, MdClose, MdStarBorder } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';


export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('all');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/reviews/admin');
      setReviews(data.data || []);
    } catch {
      // Use sample data if API not ready
      setReviews([
        {
          id: 1,
          user_name:    'Rahul Sharma',
          service_name: 'Final Year Project',
          rating:       5,
          title:        'Excellent Work!',
          comment:      'Takshak bhai ne bahut acha kaam kiya! Project time pe deliver hua.',
          is_approved:  true,
          is_featured:  true,
          created_at:   '2024-01-15'
        },
        {
          id: 2,
          user_name:    'Priya Singh',
          service_name: 'Custom Website Development',
          rating:       5,
          title:        'Amazing Portfolio Website',
          comment:      'My portfolio website was exactly what I wanted. Beautiful animations!',
          is_approved:  true,
          is_featured:  true,
          created_at:   '2024-02-20'
        },
        {
          id: 3,
          user_name:    'Amit Kumar',
          service_name: 'Project Documentation',
          rating:       4,
          title:        'Good Documentation',
          comment:      'Documentation was perfect. Professor appreciated it.',
          is_approved:  false,
          is_featured:  false,
          created_at:   '2024-03-10'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const filtered = reviews.filter(r => {
    if (filter === 'approved')   return r.is_approved;
    if (filter === 'pending')    return !r.is_approved;
    if (filter === 'featured')   return r.is_featured;
    return true;
  });

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        i <= rating
          ? <MdStar     key={i} className="text-yellow-400" size={16} />
          : <MdStarBorder key={i} className="text-gray-600"  size={16} />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews Management</h1>
          <p className="text-gray-400 text-sm">Total {reviews.length} reviews</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'approved', 'pending', 'featured'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'gradient-bg text-white'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 card-hover"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {review.user_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.user_name}</p>
                    <p className="text-gray-400 text-xs">{review.service_name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {review.is_featured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                      Featured
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    review.is_approved
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating} />
                <span className="text-gray-400 text-xs">({review.rating}/5)</span>
              </div>

              {/* Title + Comment */}
              {review.title && (
                <h4 className="text-white font-semibold text-sm mb-1">{review.title}</h4>
              )}
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">{review.comment}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-gray-500 text-xs">
                  {new Date(review.created_at).toLocaleDateString('en-IN')}
                </span>
                <div className="flex gap-2">
                  {!review.is_approved && (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-xs">
                      <MdCheck size={14} /> Approve
                    </button>
                  )}
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs">
                    <MdClose size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <MdStar size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No reviews found!</p>
        </div>
      )}
    </div>
  );
}