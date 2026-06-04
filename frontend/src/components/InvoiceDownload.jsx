import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoice, FaDownload } from 'react-icons/fa';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function InvoiceDownload({ orderId }) {
  const [loading, setLoading] = useState(false);

  const downloadInvoice = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/payments/invoice/${orderId}`);
      
      // Create blob and download
      const blob = new Blob([data.data.invoice_html], { type: 'text/html' });
      const url  = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `invoice-${orderId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Invoice downloaded!');
    } catch {
      toast.error('Failed to download invoice!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={downloadInvoice}
      disabled={loading}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 20px', borderRadius: '10px',
        background: 'rgba(99,102,241,0.15)',
        border: '1px solid rgba(99,102,241,0.3)',
        color: '#a5b4fc', cursor: 'pointer',
        fontSize: '14px', fontWeight: 600
      }}
    >
      <FaFileInvoice size={16} />
      {loading ? 'Generating...' : 'Download Invoice'}
    </motion.button>
  );
}