import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Admin
import AdminLayout        from './admin/components/AdminLayout';
import AdminLogin         from './admin/pages/AdminLogin';
import AdminDashboard     from './admin/pages/AdminDashboard';
import AdminUsers         from './admin/pages/AdminUsers';
import AdminOrders        from './admin/pages/AdminOrders';
import AdminNotes         from './admin/pages/AdminNotes';
import AdminServices      from './admin/pages/AdminServices';
import AdminReviews       from './admin/pages/AdminReviews';
import AdminRevenue       from './admin/pages/AdminRevenue';
import AdminNotifications from './admin/pages/AdminNotifications';
import AdminPortfolio     from './admin/pages/AdminPortfolio';

// User Auth
import Login    from './pages/Login';
import Register from './pages/Register';

// User Dashboard
import UserLayout        from './components/dashboard/UserLayout';
import UserDashboard     from './pages/dashboard/UserDashboard';
import UserOrders        from './pages/dashboard/UserOrders';
import UserDownloads     from './pages/dashboard/UserDownloads';
import UserProfile       from './pages/dashboard/UserProfile';
import UserNotifications from './pages/dashboard/UserNotifications';
import UserSettings      from './pages/dashboard/UserSettings';

// main page
import Home       from './pages/Home';
import Services   from './pages/Services';
import About      from './pages/About';
import Contact    from './pages/Contact';
import Portfolio  from './pages/Portfolio';
import Blog       from './pages/Blog';
import NotesStore from './pages/NotesStore';
import Reviews    from './pages/Reviews';  // ← YE ADD KARO
import Order      from './pages/Order';
import WriteReview from './pages/WriteReview';
import BlogDetail from './pages/BlogDetail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          containerStyle={{
          top: 20,
          zIndex: 99999
         }}
          toastOptions={{
          duration: 4000,
          style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid rgba(239,68,68,0.5)',
          fontSize: '14px',
          zIndex: 99999
        },
          }}
        />
        <Routes>
          {/* Redirect root */}
          <Route path="/"          element={<Home />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/about"     element={<About />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} /> 
          <Route path="/notes"     element={<NotesStore />} />
          <Route path="/reviews"   element={<Reviews />} />
          <Route path="/order"     element={<Order />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          

          {/* Auth Pages */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index                  element={<UserDashboard />} />
            <Route path="orders"          element={<UserOrders />} />
            <Route path="downloads"       element={<UserDownloads />} />
            <Route path="profile"         element={<UserProfile />} />
            <Route path="notifications"   element={<UserNotifications />} />
            <Route path="settings"        element={<UserSettings />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard"     element={<AdminDashboard />} />
            <Route path="users"         element={<AdminUsers />} />
            <Route path="orders"        element={<AdminOrders />} />
            <Route path="notes"         element={<AdminNotes />} />
            <Route path="services"      element={<AdminServices />} />
            <Route path="reviews"       element={<AdminReviews />} />
            <Route path="revenue"       element={<AdminRevenue />} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen bg-dark flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text">404</h1>
                <p className="text-gray-400 mt-4">Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}