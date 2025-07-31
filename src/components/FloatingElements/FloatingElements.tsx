import React, { useState } from 'react';
import { MessageCircle, ArrowUp, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const FloatingElements: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 transform transition-all duration-300 animate-fadeIn">
            <div className="bg-green-500 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Chat with us!</h3>
              <p className="text-sm opacity-90">We're here to help</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Hello! How can we help you today?</p>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                  Track Order
                </button>
                <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm hover:bg-green-100 transition-colors">
                  Support
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Link
          to="/cart"
          className="relative bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 block"
        >
          <ShoppingCart className="w-5 h-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-42 right-6 z-40">
        <button
          onClick={scrollToTop}
          className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-70 hover:opacity-100"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default FloatingElements;