import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg backdrop-blur-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         <Link to="/" className="flex items-center space-x-2 group">
  <img 
    src="../logo1.png" // Change this path to your actual logo path
    alt="Logo"
    className="w-100% h-15 object-contain transform group-hover:scale-105 transition-transform" style={{ height: '60px' }}/>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === item.href ? 'text-green-600' : 'text-gray-700'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transform scale-x-100 transition-transform"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                    {user.isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Admin Panel</Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block text-sm font-medium">Login</span>
              </Link>
            )}

            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-t border-gray-200`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 text-base font-medium transition-colors hover:text-green-600 ${
                location.pathname === item.href ? 'text-green-600 bg-green-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;