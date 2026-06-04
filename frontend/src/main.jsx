import React    from 'react';
import ReactDOM from 'react-dom/client';
import App      from './App';
import { AuthProvider }   from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Toaster }        from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color:      '#fff',
              border:     '1px solid rgba(99,102,241,0.3)'
            }
          }}
        />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);