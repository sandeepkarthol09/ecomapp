import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { productService } from '../api/productService';
import type { Product } from '../types/product';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts(1, 10);
      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <span className="loader"></span>
          <p style={{ marginTop: '20px', color: '#94a3b8' }}>Discovering amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProducts}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Antigravity Store</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toLocaleString()}</span>
                <button className="add-to-cart-btn" aria-label="Add to cart">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
