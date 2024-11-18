import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductGrid = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  useEffect(() => {
    fetch('/products.txt') // Ensure the file path is correct
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id); // Remove from wishlist
    } else {
      updatedWishlist = [...wishlist, product]; // Add to wishlist
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update in localStorage
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.some((item) => item.id === product.id) ? 'fill-red-500' : 'fill-none stroke-gray-600'}`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span> Discount {product.discountPercentage || 0}%</span>
                  <span>{product.stock || 0} left</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">Rs:-{product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
