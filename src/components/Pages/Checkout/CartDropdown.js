import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../Features/Header/hooks/useCart';

const CartDropdown = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // רק אם הקליק היה מחוץ לדרופדאון ולא על הכפתור שפותח אותו
        if (!event.target.closest('.cart-trigger')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50"
    >
      <div className="p-4">
        <div className="max-h-96 overflow-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              Your cart is empty
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 py-4 border-b border-gray-100"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-sm min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-sm font-medium mt-1">
                      ${((item.price * (1 - (item.discount || 0) / 100)) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <Link 
                  to="/checkout" 
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={onClose}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;

