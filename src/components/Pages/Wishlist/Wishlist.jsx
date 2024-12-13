import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-4">
      <img
        src={item.image || "/api/placeholder/100/100"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex flex-col">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onAddToCart(item)}
        className="p-2 text-blue-600 hover:text-blue-800"
        title="Add to Cart"
      >
        <ShoppingCart size={20} />
      </button>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-600 hover:text-red-800"
        title="Remove from Wishlist"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic for fetching wishlist items from the server
    const fetchWishlistItems = async () => {
      try {
        // Example - replace with real API call
        const response = await fetch('/api/wishlist');
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error('Failed to fetch wishlist items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      // API call to remove item
      await fetch(`/api/wishlist/${itemId}`, { method: 'DELETE' });
      setWishlistItems(items => items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      // API call to add item to cart
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      });
      // Optionally add a success message
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <Heart size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-xl font-medium mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-600">Start adding items to your wishlist</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-medium flex items-center">
          <Heart size={24} className="ml-2 text-red-500" />
          My Wishlist
          <span className="mr-2 text-gray-500 text-sm">
            ({wishlistItems.length} items)
          </span>
        </h2>
      </div>
      <div className="divide-y">
        {wishlistItems.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
