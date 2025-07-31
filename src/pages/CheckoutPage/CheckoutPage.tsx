import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    deliveryInstructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order
    const order = {
      total: getTotalPrice() * 1.08,
      status: 'pending' as const,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    addOrder(order);
    clearCart();
    setOrderPlaced(true);
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly with tracking details.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View Order History
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="w-full border-2 border-green-500 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300'
              }`}>
                1
              </div>
              <span className="font-medium">Delivery</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
                </div>

                <form onSubmit={handleDeliverySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={deliveryInfo.fullName}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, fullName: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={deliveryInfo.zipCode}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                    <textarea
                      value={deliveryInfo.deliveryInstructions}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryInstructions: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentInfo.method === 'card'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span>Credit/Debit Card</span>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentInfo.method === 'cod'}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                          className="mr-3"
                        />
                        <Truck className="w-5 h-5 mr-2" />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {paymentInfo.method === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            placeholder="MM/YY"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            placeholder="123"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-green-600">
                      ${(getTotalPrice() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;