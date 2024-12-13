import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Features/Header/hooks/useCart';
import { CreditCard, Truck, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const shipping = cartTotal > 5000 ? 0 : 50;
  const total = cartTotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your payment processing logic here
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Order Summary - Mobile */}
          <div className="lg:hidden mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setShowOrderSummary(!showOrderSummary)}
              >
                <span className="text-lg font-semibold">
                  Order Summary ({cartItems.length} items)
                </span>
                {showOrderSummary ? <ChevronUp /> : <ChevronDown />}
              </button>
              {showOrderSummary && (
                <div className="mt-4 border-t pt-4">
                  {/* Mobile Order Summary Content */}
                  <OrderSummaryContent
                    cartItems={cartItems}
                    cartTotal={cartTotal}
                    shipping={shipping}
                    total={total}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </section>

                {/* Payment Information */}
                <section className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="Date"
                          name="expiryDate"
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          placeholder="123"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Place Order - ${total.toLocaleString()}
                </button>
              </form>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Free Shipping over $5,000</p>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">24h Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-gray-600">Multiple Payment Options</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary ({cartItems.length} items)
              </h2>
              <OrderSummaryContent
                cartItems={cartItems}
                cartTotal={cartTotal}
                shipping={shipping}
                total={total}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Summary Content Component
const OrderSummaryContent = ({ 
  cartItems, 
  cartTotal, 
  shipping, 
  total,
  removeFromCart,
  updateQuantity 
}) => (
  <div>
    <div className="space-y-4 mb-4">
      {cartItems.map(item => (
        <div key={item.id} className="flex gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-500 hover:text-blue-600"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500 hover:text-blue-600"
              >
                +
              </button>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-medium">
                ${((item.price * (1 - (item.discount || 0) / 100)) * item.quantity).toLocaleString()}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span>${cartTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t pt-2">
        <span>Total</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

export default Checkout;