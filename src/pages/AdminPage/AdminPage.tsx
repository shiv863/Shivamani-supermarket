import React, { useState } from 'react';
import { Package, Users, MessageSquare, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const AdminPage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user?.isAdmin) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { name: 'Total Orders', value: '1,234', change: '+12%', icon: Package },
    { name: 'Total Users', value: '5,678', change: '+8%', icon: Users },
    { name: 'Revenue', value: '$45,678', change: '+15%', icon: BarChart3 },
    { name: 'Messages', value: '89', change: '+3%', icon: MessageSquare }
  ];

  const products = [
    { id: 1, name: 'Fresh Bananas', price: 3.99, stock: 45, category: 'Fruits' },
    { id: 2, name: 'Premium Coffee', price: 15.99, stock: 23, category: 'Beverages' },
    { id: 3, name: 'Fresh Milk', price: 2.49, stock: 67, category: 'Dairy' },
    { id: 4, name: 'Vegetables Pack', price: 8.99, stock: 34, category: 'Vegetables' }
  ];

  const orders = [
    { id: 'ORD001', customer: 'John Doe', total: 45.99, status: 'pending', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Jane Smith', total: 78.50, status: 'shipped', date: '2024-01-14' },
    { id: 'ORD003', customer: 'Bob Johnson', total: 32.25, status: 'delivered', date: '2024-01-13' }
  ];

  const messages = [
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', message: 'Great service!', date: '2024-01-15' },
    { id: 2, name: 'Charlie Wilson', email: 'charlie@example.com', message: 'Question about delivery', date: '2024-01-14' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'orders', name: 'Orders', icon: Package },
              { id: 'messages', name: 'Messages', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <stat.icon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
                <div className="space-y-4">
                  {products.filter(p => p.stock < 30).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">{product.stock} left</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Products Management</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">${product.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.stock < 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Orders Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">${order.total}</td>
                      <td className="py-3 px-4">
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Messages</h2>
            
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{message.message}</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;