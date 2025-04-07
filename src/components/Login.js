// src/Login.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ADMIN_EMAIL = "admin@marketplace.com";
const ADMIN_PASSWORD = "admin123";

class Login extends Component {
  state = {
    role: 'customer',
    isRegistering: false,
    email: '',
    password: '',
    name: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { role, email, password, isRegistering, name } = this.state;

    if (!email || !password || (role === 'customer' && !name)) {
      return alert('Please fill in all fields.');
    }

    if (role === 'admin') {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        this.props.onLogin(true);
      } else {
        alert("❌ Invalid admin credentials");
      }
    } else {
      if (isRegistering) {
        alert("✅ Account created. You can now log in.");
        this.setState({ isRegistering: false });
      } else {
        localStorage.setItem('buyerName', name);
        this.props.onLogin(false);
      }
    }
  };

  toggleMode = () => {
    this.setState((prev) => ({ isRegistering: !prev.isRegistering }));
  };

  handleRoleChange = (e) => {
    const role = e.target.value;
    this.setState({ role, isRegistering: role === 'customer' ? this.state.isRegistering : false });
  };

  render() {
    const { email, password, role, isRegistering, name } = this.state;

    return (
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <div className="card p-4 shadow">
          <h3 className="mb-3 text-center">
            {isRegistering ? 'Create Account' : `Login as ${role}`}
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mb-3">
              <label>Role</label>
              <select className="form-control" value={role} onChange={this.handleRoleChange}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {role === 'customer' && (
              <div className="form-group mb-3">
                <label>Name</label>
                <input type="text" className="form-control" value={name}
                       onChange={(e) => this.setState({ name: e.target.value })} required />
              </div>
            )}
            <div className="form-group mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email}
                     onChange={(e) => this.setState({ email: e.target.value })} required />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={password}
                     onChange={(e) => this.setState({ password: e.target.value })} required />
            </div>
            <button className="btn btn-primary w-100 mb-2" type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
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
