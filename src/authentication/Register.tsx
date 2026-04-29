import { useState } from "react";
import { authService } from "./api/auth";
import { HTTP_STATUS } from "../utils/statusCodes";
import { useNavigate } from "react-router";
import "./Login.css"; // Reuse glassmorphism and basic styles
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
    role: "employee",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authService.register(formData);

      if (result.status === HTTP_STATUS.OK) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An error occurred during registration.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass register-glass">
        <div className="login-header">
          <div className="login-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 7a4 4 0 100-8 4 4 0 000 8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 8v6M23 11h-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Create Account</h1>
          <p>Join us today and start your journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required disabled={loading} />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" placeholder="9876543210" value={formData.phone} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={formData.gender} onChange={handleChange} disabled={loading} className="custom-select">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="role">Role</label>
              <select id="role" value={formData.role} onChange={handleChange} disabled={loading} className="custom-select">
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
            {!loading && <span className="btn-shine"></span>}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <span className="link-span" onClick={() => navigate("/login")}>Sign In</span></p>
        </div>
      </div>
      <div className="bg-animation">
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
    </div>
  );
}
