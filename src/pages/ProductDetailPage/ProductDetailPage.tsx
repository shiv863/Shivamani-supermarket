import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  // Mock product data - in real app, fetch based on id
  const product = {
    id: parseInt(id || '1'),
    name: 'Fresh Organic Bananas',
    price: 3.99,
    originalPrice: 4.99,
    images: [
      'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1',
      'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1',
      'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1'
    ],
    rating: 4.8,
    reviews: 124,
    category: 'Fruits',
    description: 'Premium quality organic bananas, perfectly ripe and sweet. Rich in potassium, vitamin B6, and dietary fiber. Perfect for smoothies, baking, or eating fresh.',
    features: [
      'Organic certified',
      'Rich in potassium',
      'High in vitamin B6',
      'Natural energy source',
      'Perfect ripeness'
    ],
    inStock: true,
    stockCount: 45
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="text-sm text-green-600">{product.stockCount} in stock</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-lg transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Quality Guarantee</p>
                  <p className="text-xs text-gray-600">100% fresh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
                <div className="bg-orange-100 p-2 rounded-full">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">7-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;