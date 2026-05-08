import { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import './Home.css';

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <DashboardLayout title="My Orders">
      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="8" x2="8" y2="8"></line>
              <line x1="16" y1="12" x2="8" y2="12"></line>
              <line x1="16" y1="16" x2="8" y2="16"></line>
            </svg>
            <h3>No orders yet</h3>
            <p>Your order history will appear here once you make a purchase.</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.items.length}</td>
                  <td>${order.total.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="view-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
