// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ account, balance, isAdmin, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🛍 DApp Shop</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/add-product">➕ Add Product</Link>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center">
          <span className="text-white me-3">
            <strong>{balance} ETH</strong>
          </span>
          <span className="badge bg-success me-3">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button onClick={onLogout} className="btn btn-sm btn-outline-warning">
            🔓 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
