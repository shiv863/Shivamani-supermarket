import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
 const slides = [
  {
    id: 1,
    title: "Fresh Groceries Delivered",
    subtitle: "Shivamani SuperMarket brings the freshest produce to your doorstep",
    image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Shop Now",
    offer: "Up to 30% OFF"
  },
  {
    id: 2,
    title: "Organic & Natural",
    subtitle: "Discover premium organic products at Shivamani SuperMarket for healthy living",
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Explore Organic",
    offer: "Fresh Daily"
  },
  {
    id: 3,
    title: "Same Day Delivery",
    subtitle: "Order before 2 PM from Shivamani SuperMarket and enjoy same-day delivery",
    image: "https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: "Order Now",
    offer: "Free Delivery"
  }
];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-green-50 to-orange-50 pt-16">
      {/* Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 transform -translate-x-full'
                  : 'opacity-0 transform translate-x-full'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Content */}
              <div className="flex items-center justify-center p-8 lg:p-16">
                <div className="max-w-lg text-center lg:text-left space-y-6">
                  <div className="inline-block bg-gradient-to-r from-green-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                    {slide.offer}
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {slide.title.split(' ').map((word, i) => (
                      <span 
                        key={i}
                        className={`inline-block animate-fadeInUp`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </h1>
                  <p className="text-xl text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                    <Link
  to="/shop"
  className="bg-[#1653A4] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
>
  <ShoppingBag className="w-5 h-5" />
  <span>{slide.cta}</span>
</Link>

<Link
  to="/tracking"
  className="border-2 border-[#1653A4] text-[#1653A4] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2"
>
  <Truck className="w-5 h-5" />
  <span>Track Order</span>
</Link>

                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-green-500 w-8' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 rect">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Delivery</h3>
                <p className="text-sm text-gray-600">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Same Day Delivery</h3>
                <p className="text-sm text-gray-600">Order before 2 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fresh Guarantee</h3>
                <p className="text-sm text-gray-600">100% fresh products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;