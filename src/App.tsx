import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FloatingElements from './components/FloatingElements/FloatingElements';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ShopPage from './pages/ShopPage/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import TrackingPage from './pages/TrackingPage/TrackingPage';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-green-600 animate-pulse"> ShivamaniSuperMarket</h2>
          <p className="text-gray-600">Loading your fresh experience...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingElements />
            <ScrollToTop />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;