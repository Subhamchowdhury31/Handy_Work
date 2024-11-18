import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  item.quantity > 1
                    ? updateQuantity(item.id, item.quantity - 1)
                    : removeFromCart(item.id)
                }
                className={`p-1 ${
                  item.quantity === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:text-blue-600'
                }`}
                disabled={item.quantity === 1}
              >
                <MinusCircle className="h-5 w-5" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:text-blue-600"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}

        {/* Total and Checkout */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
