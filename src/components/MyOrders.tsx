import DashboardLayout from './DashboardLayout';
import './Home.css';

const mockOrders = [
  { id: 'ORD-001', date: '2026-05-01', status: 'Delivered', total: 1250, items: 3 },
  { id: 'ORD-002', date: '2026-05-04', status: 'In Transit', total: 450, items: 1 },
  { id: 'ORD-003', date: '2026-05-07', status: 'Processing', total: 2100, items: 5 },
];

export default function MyOrders() {
  return (
    <DashboardLayout title="My Orders">
      <div className="orders-container">
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
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
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
      </div>
    </DashboardLayout>
  );
}
