import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-green-400 to-green-600',
      count: '150+ items'
    },
    {
      id: 2,
      name: 'Dairy Products',
      image: 'https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-blue-400 to-blue-600',
      count: '80+ items'
    },
    {
      id: 3,
      name: 'Beverages',
      image: 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-orange-400 to-orange-600',
      count: '120+ items'
    },
    {
      id: 4,
      name: 'Groceries',
      image: 'https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-purple-400 to-purple-600',
      count: '200+ items'
    },
    {
      id: 5,
      name: 'Meat & Seafood',
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-red-400 to-red-600',
      count: '60+ items'
    },
    {
      id: 6,
      name: 'Bakery',
      image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      color: 'from-yellow-400 to-yellow-600',
      count: '90+ items'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of fresh products organized by categories for your convenience
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to="/shop"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h3 className="font-bold text-lg mb-1 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-90 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {category.count}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r bg-[#1653A4] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;