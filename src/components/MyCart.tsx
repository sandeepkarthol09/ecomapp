import DashboardLayout from './DashboardLayout';
import './Home.css';

const mockCartItems = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80' },
  { id: 2, name: 'Ultra-thin Laptop', price: 1299, quantity: 1, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80' },
];

export default function MyCart() {
  const total = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <DashboardLayout title="My Cart">
      <div className="cart-container">
        <div className="cart-items">
          {mockCartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-controls">
                  <button className="qty-btn">-</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn">+</button>
                </div>
              </div>
              <button className="remove-btn">
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
            <span>${total}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
