import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Fresh Organic Bananas',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.8,
      reviews: 124,
      category: 'Fruits',
      badge: 'Organic'
    },
    {
      id: 2,
      name: 'Premium Coffee Beans',
      price: 15.99,
      originalPrice: 19.99,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.9,
      reviews: 89,
      category: 'Beverages',
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Fresh Milk 1L',
      price: 2.49,
      originalPrice: 2.99,
      image: 'https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.7,
      reviews: 156,
      category: 'Dairy',
      badge: 'Fresh'
    },
    {
      id: 4,
      name: 'Mixed Vegetables Pack',
      price: 8.99,
      originalPrice: 11.99,
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.6,
      reviews: 98,
      category: 'Vegetables',
      badge: 'Pack'
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked products with the best quality and amazing deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
                
                {/* Discount */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>

                {/* Wishlist */}
                <button className="absolute top-16 right-4 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Quick Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-4 right-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600 font-medium">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r bg-[#1653A4] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;