import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { MdAttachMoney, MdTrendingUp, MdShoppingCart } from 'react-icons/md';
import API from '../../services/api';

export default function AdminRevenue() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/admin/dashboard').then(r => setData(r.data.data));
  }, []);

  const pieData = [
    { name: 'Completed', value: data?.orders?.completed   || 0, color: '#10b981' },
    { name: 'Pending',   value: data?.orders?.pending     || 0, color: '#f59e0b' },
    { name: 'Progress',  value: data?.orders?.in_progress || 0, color: '#6366f1' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Revenue Tracking</h1>
        <p className="text-gray-400 text-sm">Financial overview and analytics</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue',  value: `₹${parseFloat(data?.total_revenue||0).toLocaleString()}`,  icon: MdAttachMoney, color: '#10b981' },
          { label: 'Month Revenue',  value: `₹${parseFloat(data?.month_revenue||0).toLocaleString()}`,  icon: MdTrendingUp,  color: '#6366f1' },
          { label: 'Total Orders',   value: data?.orders?.total || 0,                                    icon: MdShoppingCart,color: '#f59e0b' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}20` }}>
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data?.revenue_chart || []}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #6366f1', borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Orders Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #6366f1', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray-400 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}