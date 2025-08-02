import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2 group">
                <img 
                  src="/logo2.jpg" // ✅ Update this path as needed
                  alt="Logo"
                  className="h-[60px] object-contain transform group-hover:scale-105 transition-transform"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for fresh groceries and quality products. 
              Delivering freshness to your doorstep since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/shivamani.dsurya/" className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/shivamani-supermarket/" className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://in.pinterest.com/shivamanisupermarket/" className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110">
                <FaPinterest className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/shivamani_supermarket/" className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Shop', 'Contact Us', 'Track Order'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {['Fruits & Vegetables', 'Dairy Products', 'Beverages', 'Groceries', 'Meat & Seafood'].map((category) => (
                <li key={category}>
                  <Link 
                    to="/shop"
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  8-2-686/1/A/D, Road No.12, Ministers Colony, NBT Nagar, Banjara Hills, Hyderabad, Telangana-500034.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="tel:+919502896056" className="text-gray-400 text-sm hover:text-green-500">
                  +91 95028 96056
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a href="mailto:shivamanisupermarket999@gmail.com" className="text-gray-400 text-sm hover:text-green-500">
                  shivamanisupermarket999@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ShivamaniSuperMarket. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
