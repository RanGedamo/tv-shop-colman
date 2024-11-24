import React from 'react';
import { Package, Truck, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Orders = () => {
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const orders = [
    {
      id: '#OR-28947',
      date: '22/11/2024',
      items: [
        { name: 'Wireless Bluetooth Earbuds', price: 89.99, quantity: 1 },
        { name: 'Phone Case', price: 15.50, quantity: 2 }
      ],
      status: 'Shipped',
      tracking: 'RC458796314IL',
      shippingMethod: 'Free Shipping',
      total: 120.99
    },
    {
      id: '#OR-28946',
      date: '21/11/2024',
      items: [
        { name: 'Smart Watch', price: 199.99, quantity: 1 }
      ],
      status: 'Processing',
      tracking: 'RC458796315IL',
      shippingMethod: 'Free Shipping',
      total: 199.99
    },
    {
      id: '#OR-28945',
      date: '20/11/2024',
      items: [
        { name: 'Wireless Charger', price: 45.99, quantity: 1 },
        { name: 'USB-C Cable', price: 12.99, quantity: 3 }
      ],
      status: 'Delivered',
      tracking: 'RC458796316IL',
      shippingMethod: 'Free Shipping',
      total: 84.96
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shipped':
        return <Truck className="w-5 h-5" />;
      case 'Processing':
        return <Package className="w-5 h-5" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Order Header - עדכון גדלים */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex flex-col gap-4">
                  {/* מספר הזמנה ותאריך */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">{order.id}</span>
                      <span className="text-base text-gray-500">{order.date}</span>
                    </div>
                    {/* חץ למעלה/למטה */}
                    <div className="hidden sm:block">
                      {expandedOrders[order.id] ? 
                        <ChevronUp className="w-6 h-6 text-gray-500" /> : 
                        <ChevronDown className="w-6 h-6 text-gray-500" />
                      }
                    </div>
                  </div>

                  {/* סטטוס ומחיר */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className={`flex items-center px-4 py-2 rounded-full text-base font-medium ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <span className="text-lg font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </span>
                      <div className="sm:hidden">
                        {expandedOrders[order.id] ? 
                          <ChevronUp className="w-6 h-6 text-gray-500" /> : 
                          <ChevronDown className="w-6 h-6 text-gray-500" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrders[order.id] && (
                <div className="border-t border-gray-200">
                  {/* Items List */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                            <p className="text-base text-gray-500 mt-1">Qty: {item.quantity}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 text-base font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-500">Tracking Number:</span>
                          <span className="text-base font-medium text-blue-600">{order.tracking}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-500">Shipping Method:</span>
                          <span className="text-base font-medium text-green-600">{order.shippingMethod}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium">Total Amount</span>
                          <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;