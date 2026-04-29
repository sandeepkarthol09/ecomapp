import { useState } from "react";
import { authService } from "./api/auth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login(email, password);

      if (result.status === 200) {
        console.log("Login successful:", result);
        setSuccess(true);
        // Store tokens
        if (result.data?.accessToken) {
          localStorage.setItem("accessToken", result.data.accessToken);
        }
        if (result.data?.refreshToken) {
          localStorage.setItem("refreshToken", result.data.refreshToken);
        }
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again later.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <div className="login-header">
          <div className="login-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Login Successful!</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <span className="btn-shine"></span>}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="#">Create Account</a>
          </p>
          <div className="social-login">
            <button className="social-btn" aria-label="Sign in with Google">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.36-7.84 5.36-4.96 0-9-4.08-9-9s4.04-9 9-9c2.84 0 4.76 1.2 5.8 2.2l2.6-2.6C18.92 1.36 15.96 0 12.48 0 5.72 0 0 5.72 0 12.48S5.72 24.96 12.48 24.96c7.08 0 11.8-4.96 11.8-11.96 0-.8-.12-1.44-.24-2.08h-11.56z" />
              </svg>
            </button>
            <button className="social-btn" aria-label="Sign in with GitHub">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </button>
          </div>
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
