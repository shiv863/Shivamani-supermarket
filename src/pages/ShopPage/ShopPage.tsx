import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ShopPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { addToCart } = useCart();

  const categories = [
    'all',
    'fruits',
    'vegetables',
    'dairy',
    'beverages',
    'groceries',
    'meat'
  ];

  const products = [
    {
      id: 1,
      name: 'Fresh Organic Bananas',
      price: 3.99,
      originalPrice: 4.99,
      image: 'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.8,
      reviews: 124,
      category: 'fruits',
      inStock: true
    },
    {
      id: 2,
      name: 'Premium Coffee Beans',
      price: 15.99,
      originalPrice: 19.99,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.9,
      reviews: 89,
      category: 'beverages',
      inStock: true
    },
    {
      id: 3,
      name: 'Fresh Milk 1L',
      price: 2.49,
      originalPrice: 2.99,
      image: 'https://images.pexels.com/photos/416471/pexels-photo-416471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.7,
      reviews: 156,
      category: 'dairy',
      inStock: true
    },
    {
      id: 4,
      name: 'Mixed Vegetables Pack',
      price: 8.99,
      originalPrice: 11.99,
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.6,
      reviews: 98,
      category: 'vegetables',
      inStock: true
    },
    {
      id: 5,
      name: 'Whole Grain Bread',
      price: 4.99,
      originalPrice: 5.99,
      image: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.5,
      reviews: 67,
      category: 'groceries',
      inStock: true
    },
    {
      id: 6,
      name: 'Fresh Salmon Fillet',
      price: 18.99,
      originalPrice: 22.99,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
      rating: 4.8,
      reviews: 45,
      category: 'meat',
      inStock: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Shop Fresh Products</h1>
            <p className="text-xl opacity-90">Discover our wide range of fresh, quality products</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{filteredProducts.length} products found</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-600 font-medium capitalize">{product.category}</span>
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
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                          product.inStock
                            ? 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;