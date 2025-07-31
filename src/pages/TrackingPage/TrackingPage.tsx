import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockTrackingData = {
    'ORD001': {
      id: 'ORD001',
      status: 'delivered',
      estimatedDelivery: '2024-01-15',
      currentLocation: 'Delivered to your address',
      timeline: [
        { status: 'Order Placed', date: '2024-01-12 10:30 AM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-12 11:00 AM', completed: true },
        { status: 'Packed', date: '2024-01-13 09:15 AM', completed: true },
        { status: 'Shipped', date: '2024-01-13 02:30 PM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-15 08:00 AM', completed: true },
        { status: 'Delivered', date: '2024-01-15 03:45 PM', completed: true }
      ]
    },
    'ORD002': {
      id: 'ORD002',
      status: 'shipped',
      estimatedDelivery: '2024-01-16',
      currentLocation: 'In transit to delivery center',
      timeline: [
        { status: 'Order Placed', date: '2024-01-13 02:15 PM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-13 02:45 PM', completed: true },
        { status: 'Packed', date: '2024-01-14 10:30 AM', completed: true },
        { status: 'Shipped', date: '2024-01-14 04:20 PM', completed: true },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false }
      ]
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const result = mockTrackingData[trackingId as keyof typeof mockTrackingData];
      setTrackingResult(result || null);
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <Clock className="w-5 h-5 text-gray-400" />;
    
    switch (status.toLowerCase()) {
      case 'order placed':
      case 'order confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'packed':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
      case 'out for delivery':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600">
            Enter your order ID to get real-time updates on your delivery
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleTrack} className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter Order ID (e.g., ORD001)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{trackingResult.id}</h2>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(trackingResult.status)}`}>
                {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
              </span>
              <p className="text-gray-600 mt-2">{trackingResult.currentLocation}</p>
              {trackingResult.status !== 'delivered' && (
                <p className="text-sm text-gray-500 mt-1">
                  Estimated delivery: {trackingResult.estimatedDelivery}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {getStatusIcon(step.status, step.completed)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </h4>
                      <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.date}
                      </p>
                    </div>
                    {index < trackingResult.timeline.length - 1 && (
                      <div className={`absolute left-5 mt-10 w-0.5 h-6 ${
                        step.completed ? 'bg-green-200' : 'bg-gray-200'
                      }`} style={{ marginLeft: '1.25rem' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-gray-600 text-sm mb-4">
                If you have any questions about your order, please contact our customer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Contact Support
                </button>
                <button className="border border-green-500 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
                  View Order Details
                </button>
              </div>
            </div>
          </div>
        )}

        {trackingResult === null && trackingId && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Order Not Found</h3>
            <p className="text-gray-500 mb-6">
              We couldn't find an order with ID "{trackingId}". Please check your order ID and try again.
            </p>
            <div className="text-sm text-gray-400">
              <p>Try these sample order IDs:</p>
              <p className="font-mono">ORD001, ORD002</p>
            </div>
          </div>
        )}

        {/* Sample Order IDs */}
        {!trackingResult && !trackingId && (
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Demo Mode</h3>
            <p className="text-blue-700 mb-4">
              Try tracking with these sample order IDs to see the tracking system in action:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setTrackingId('ORD001')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ORD001 (Delivered)
              </button>
              <button
                onClick={() => setTrackingId('ORD002')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                ORD002 (Shipped)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;