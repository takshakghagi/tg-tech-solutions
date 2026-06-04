import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, noFooter = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a' }}>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  );
}