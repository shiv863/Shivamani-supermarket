import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
          <Mail className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-4xl font-bold text-white mb-6">
          Stay Updated with Fresh Deals
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new products, exclusive offers, and healthy recipes
        </p>

        {subscribed ? (
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto animate-fadeIn">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">You've successfully subscribed to our newsletter</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-green-100">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Weekly recipes</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Exclusive deals</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>No spam</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;