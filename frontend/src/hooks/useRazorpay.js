import { useState } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function useRazorpay() {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async ({
    amount,
    name,
    description,
    note_id  = null,
    order_id = null,
    onSuccess,
    onFailure
  }) => {
    setLoading(true);
    try {
      // Create order
      const { data } = await API.post('/payments/create-order', {
        amount,
        notes: { note_id, order_id, description }
      });

      const options = {
        key:         data.data.key_id,
        amount:      data.data.amount,
        currency:    data.data.currency,
        name:        'TG Tech Solutions',
        description,
        order_id:    data.data.order_id,
        theme:       { color: '#6366f1' },

        handler: async (response) => {
          try {
            // Verify payment
            const verifyRes = await API.post('/payments/verify', {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              note_id,
              order_id
            });

            toast.success('Payment Successful! 🎉');

            // Auto download
            const downloadUrl = verifyRes.data.data?.download_url;
            if (downloadUrl) {
              setTimeout(() => {
                window.open(downloadUrl, '_blank');
                toast.success('Notes Downloaded! 📚');
              }, 1000);
            }

            onSuccess && onSuccess({...verifyRes.data.data, order_id: data.data.order_id});
          } catch (err) {
            toast.error('Payment verification failed!');
            onFailure && onFailure();
          }
        },

        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled!');
            setLoading(false);
            onFailure && onFailure();
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed!');
      onFailure && onFailure();
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
}