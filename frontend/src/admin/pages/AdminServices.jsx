import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdMiscellaneousServices, MdEdit, MdClose, MdCheck } from 'react-icons/md';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/services');
      setServices(data.data.services);
    } catch {
      toast.error('Failed to load services!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const categoryColors = {
    web_development:    'bg-blue-500/20 text-blue-400',
    app_development:    'bg-purple-500/20 text-purple-400',
    final_year_project: 'bg-green-500/20 text-green-400',
    notes:              'bg-yellow-500/20 text-yellow-400',
    documentation:      'bg-orange-500/20 text-orange-400',
    graphic_design:     'bg-pink-500/20 text-pink-400',
    resume:             'bg-cyan-500/20 text-cyan-400',
    internship:         'bg-indigo-500/20 text-indigo-400',
    software:           'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Management</h1>
          <p className="text-gray-400 text-sm">Total {services.length} services</p>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 card-hover"
            >
              {/* Icon + Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  <MdMiscellaneousServices className="text-white" size={24} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  categoryColors[service.category] || 'bg-gray-500/20 text-gray-400'
                }`}>
                  {service.category?.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-xs mb-4 line-clamp-2">{service.short_desc}</p>

              {/* Features */}
              <div className="space-y-1 mb-4">
                {(typeof service.features === 'string' ? JSON.parse(service.features) : service.features || []).slice(0, 3).map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <MdCheck className="text-green-400 flex-shrink-0" size={14} />
                    <span className="text-gray-400 text-xs">{f}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  Delivery: {service.delivery_days} days
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  service.is_active
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}