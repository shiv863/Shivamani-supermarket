import React from 'react';
import { Clock, Gift, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OffersSection: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Get 30% off on all fresh fruits and vegetables',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
      discount: '30% OFF',
      validUntil: '2 days left',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      title: 'First Order Bonus',
      description: 'New customers get free delivery + 15% discount',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
      discount: 'FREE DELIVERY',
      validUntil: 'Limited time',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing deals and save more on your favorite products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="relative h-80">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-80`}></div>
                
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-sm font-semibold">{offer.discount}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-3">{offer.title}</h3>
                  <p className="text-lg mb-6 opacity-90">{offer.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{offer.validUntil}</span>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Samples</h3>
            <p className="text-gray-600 text-sm">Try before you buy with our free sample program</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Deals</h3>
            <p className="text-gray-600 text-sm">New discounts every day on selected products</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flash Sales</h3>
            <p className="text-gray-600 text-sm">Limited time offers with huge discounts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;