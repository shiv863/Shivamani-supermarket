import React, { useState } from 'react';
import { User, Package, Settings, LogOut, Edit, Save, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const ProfilePage: React.FC = () => {
  const { user, orders, updateProfile, logout } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.isAdmin && (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    Admin
                  </span>
                )}
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
                    <p className="text-gray-500">Start shopping to see your orders here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="text-lg font-bold text-gray-900 mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600" />
                        <span className="ml-3 text-gray-700">Email notifications for orders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600" />
                        <span className="ml-3 text-gray-700">SMS notifications for delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                        <span className="ml-3 text-gray-700">Marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-600" />
                        <span className="ml-3 text-gray-700">Allow data collection for better recommendations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600" />
                        <span className="ml-3 text-gray-700">Share data with partners</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        Download My Data
                      </button>
                      <button className="w-full text-left px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;