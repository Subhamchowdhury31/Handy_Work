import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(() => {
    // Get wishlist items from localStorage
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  // Function to remove a product from the wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Save to localStorage
  };

  // Function to handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id); // Optionally remove from wishlist after adding to cart
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>{product.itemsSold || 0} sold</span>
                  <span>{product.itemsLeft || 0} left</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
