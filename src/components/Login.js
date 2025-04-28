// src/Login.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Admin credentials
const ADMIN_EMAIL = "admin@marketplace.com";
const ADMIN_PASSWORD = "admin123";

class Login extends Component {
  // Initialize state for form fields
  state = {
    role: 'customer',
    isRegistering: false,
    email: '',
    password: '',
    name: ''
  };

  // Handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { role, email, password, isRegistering, name } = this.state;

    // Validate required fields
    if (!email || !password || (role === 'customer' && !name)) {
      return alert('Please fill in all fields.');
    }

    if (role === 'admin') {
      // Check admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        this.props.onLogin(true);
      } else {
        alert("❌ Invalid admin credentials");
      }
    } else {
      if (isRegistering) {
        // Register new customer
        try {
          const res = await fetch("http://localhost:5001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
          });

          const data = await res.json();
          if (!res.ok) {
            return alert(data.error || "❌ Registration failed.");
          }

          alert("✅ Account created. You can now log in.");
          this.setState({ isRegistering: false });
        } catch (err) {
          console.error("Registration error:", err);
          alert("❌ Failed to connect to server.");
        }
      } else {
        // Customer login
        localStorage.setItem('buyerName', name);
        this.props.onLogin(false);
      }
    }
  };

  // Toggle between login and register modes
  toggleMode = () => {
    this.setState((prev) => ({ isRegistering: !prev.isRegistering }));
  };

  // Handle role selection
  handleRoleChange = (e) => {
    const role = e.target.value;
    this.setState({ role, isRegistering: role === 'customer' ? this.state.isRegistering : false });
  };

  render() {
    const { email, password, role, isRegistering, name } = this.state;

    return (
      // Center login card
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <div className="card p-4 shadow">
          <h3 className="mb-3 text-center">
            {isRegistering ? 'Create Account' : `Login as ${role}`}
          </h3>
          <form onSubmit={this.handleSubmit}>
            {/* Role selection */}
            <div className="form-group mb-3">
              <label>Role</label>
              <select className="form-control" value={role} onChange={this.handleRoleChange}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {/* Name field for customer */}
            {role === 'customer' && (
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </div>
            )}
            {/* Email input */}
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>
            {/* Password input */}
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </div>
            {/* Submit button */}
            <button className="btn btn-primary w-100 mb-2" type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
            {/* Toggle login/register for customers */}
            {role === 'customer' && (
              <div className="text-center">
                <small>{isRegistering ? 'Already have an account?' : "Don't have an account?"}</small>
                <br />
                <button type="button" className="btn btn-link" onClick={this.toggleMode}>
                  {isRegistering ? 'Login' : 'Register'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;