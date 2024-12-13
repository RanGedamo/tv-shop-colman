import React, { useContext, useState } from "react";
import { CartContext } from "../../../Contexts/CartContext";
import { X, Minus, Plus, CreditCard, Calendar, Lock, User, ShoppingBag } from 'lucide-react';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [paymentStep, setPaymentStep] = useState(1);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = totalPrice > 5000 ? 0 : 50; // משלוח חינם מעל 5000₪
  const total = totalPrice + shipping;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // סימולציה של תהליך תשלום
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    window.location.href = "/order-success";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">העגלה שלך ריקה</h2>
          <p className="text-gray-600 mb-4">נראה שעוד לא הוספת מוצרים לעגלה</p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            המשך בקניות
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-9xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Cart Items Section */}
          <div className="bg-white rounded-lg  overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">העגלה שלך</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-500">{item.brand}</p>
                      <div className="mt-1 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ₪{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-red-600 hover:text-red-800 flex items-center"
                      >
                        <X size={16} className="mr-1" />
                        הסר
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">סכום ביניים</span>
                  <span className="text-gray-900">₪{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base mt-2">
                  <span className="text-gray-600">משלוח</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'חינם' : `₪${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4">
                  <span>סהכ</span>
                  <span>₪{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-lg  overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">פרטי תשלום</h2>
              
              <form onSubmit={handleCheckout} className="space-y-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-700">שם מלא</span>
                    <div className="mt-1 relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ישראל ישראלי"
                      />
                    </div>
                  </label>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-700">מספר כרטיס</span>
                    <div className="mt-1 relative">
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        maxLength="19"
                        className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0000 0000 0000 0000"
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          value = value.match(/.{1,4}/g)?.join(' ') || '';
                          e.target.value = value;
                        }}
                      />
                    </div>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-gray-700">תוקף</span>
                      <div className="mt-1 relative">
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="month"
                          required
                          className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="text-gray-700">קוד אבטחה</span>
                      <div className="mt-1 relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          required
                          maxLength="4"
                          className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="CVV"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`
                    w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white
                    ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150
                  `}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      מעבד תשלום...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2" size={20} />
                      שלם ₪{total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="mt-2 text-sm text-gray-500 text-center">
                  <Lock size={16} className="inline mr-1" />
                  כל הפרטים שלך מאובטחים ומוצפנים
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;