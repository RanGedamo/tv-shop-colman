// OrdersPage.jsx
import React, { useState } from 'react';
import { Package, Truck, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './Orders.css';  // Import the CSS file

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
  
  // const getStatusStyle = (status) => {
  //   switch (status) {
  //     case 'Shipped':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'Processing':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'Delivered':
  //       return 'bg-green-100 text-green-800';
  //     default:
  //       return '';
  //   }
  // };

  return (
    <div className="orders-container">
      <div className="content-wrapper">
        <h1 className="page-title">My Orders</h1>
        
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div 
                className="order-header"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="order-header-content">
                  <div className="order-basic-info">
                    <div className="order-id-date">
                      <span className="order-id">{order.id}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div className="desktop-toggle">
                      {expandedOrders[order.id] ? 
                        <ChevronUp className="toggle-icon" /> : 
                        <ChevronDown className="toggle-icon" />
                      }
                    </div>
                  </div>

                  <div className="status-price-section">
                    <div className={`status-badge status-${order.status.toLowerCase()}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                    <div className="order-total">
                      <span>${order.total.toFixed(2)}</span>
                      <div className="mobile-toggle">
                        {expandedOrders[order.id] ? 
                          <ChevronUp className="toggle-icon" /> : 
                          <ChevronDown className="toggle-icon" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {expandedOrders[order.id] && (
                <div className="order-details">
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item">
                        <div className="item-info">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="item-quantity">Qty: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="shipping-info">
                      <div className="info-group">
                        <span className="info-label">Tracking Number:</span>
                        <span className="tracking-number">{order.tracking}</span>
                      </div>
                      <div className="info-group">
                        <span className="info-label">Shipping Method:</span>
                        <span className="shipping-method">{order.shippingMethod}</span>
                      </div>
                    </div>
                    <div className="total-section">
                      <div className="total-row">
                        <span className="total-label">Total Amount</span>
                        <span className="total-amount">${order.total.toFixed(2)}</span>
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


