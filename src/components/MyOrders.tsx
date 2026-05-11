import { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import './Home.css';
import type { OrderResponseData } from '../types/order';
import { orderService } from '../api/orderService';

export default function MyOrders() {
  const [orders, setOrders] = useState<OrderResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await orderService.getMyOrders();
        if (!alive) return;
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err: unknown) {
        if (!alive) return;
        const maybeErr = err as { response?: { data?: { message?: string } }; message?: string };
        setError(maybeErr?.response?.data?.message || maybeErr?.message || 'Failed to load orders');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    const shouldCancel = window.confirm('Are you sure you want to cancel this order?');
    if (!shouldCancel) return;

    try {
      setCancellingOrderId(orderId);
      setError(null);
      await orderService.deleteOrder(orderId);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err: unknown) {
      const maybeErr = err as { response?: { data?: { message?: string } }; message?: string };
      setError(maybeErr?.response?.data?.message || maybeErr?.message || 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

  return (
    <DashboardLayout title="My Orders">
      <div className="orders-container">
        {loading ? (
          <div className="empty-orders">
            <h3>Loading orders...</h3>
          </div>
        ) : error ? (
          <div className="empty-orders">
            <h3>Could not load orders</h3>
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
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
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.quantity ?? 0}</td>
                  <td>${Number(order.totalAmount ?? 0).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${String(order.status || '').toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="view-btn cancel-btn"
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancellingOrderId === order._id || String(order.status || '').toLowerCase() !== 'pending'}
                    >
                      {cancellingOrderId === order._id ? 'Cancelling...' : 'Cancel Order'}
                    </button>
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
