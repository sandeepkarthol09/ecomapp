import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DashboardLayout from './DashboardLayout';
import type { CartItem } from '../types/product';
import { orderService } from '../api/orderService';
import type { CreateOrderRequest } from '../types/order';
import './Home.css';

export default function MyCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Intentionally left blank: cart items are initialized from localStorage.
    // If you later add a cart API, this is where you'd fetch+set.
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const payload: CreateOrderRequest = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };

      const result = await orderService.createOrder(payload);

      if (result.status !== 200) {
        alert(result.message || 'Failed to create order');
        return;
      }

      localStorage.removeItem('cart');
      setCartItems([]);

      alert(result.message || 'Order placed successfully!');
      navigate('/my-orders');
    } catch (err: unknown) {
      const maybeErr = err as { response?: { data?: { message?: string } }; message?: string };
      const message =
        maybeErr?.response?.data?.message ||
        maybeErr?.message ||
        'Failed to create order. Please try again.';
      alert(message);
    }
  };

  return (
    <DashboardLayout title="My Cart">
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="checkout-btn" onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img 
                      src={
                        item.image ||
                        (item as CartItem & { imageURL?: string }).imageURL ||
                        (item as CartItem & { img?: string }).img ||
                        (item as CartItem & { thumbnail?: string }).thumbnail ||
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      } 
                      alt={item.name} 
                      className="cart-item-image" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toLocaleString()}</p>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item._id)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
