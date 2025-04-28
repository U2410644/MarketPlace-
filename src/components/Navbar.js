import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Navbar component for navigation
const Navbar = ({ account, balance, isAdmin, onLogout, basketCount }) => {
  return (
    // Dark-themed navbar
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Brand link */}
      <Link className="navbar-brand fw-bold" to="/">🛍 DApp Shop</Link>

      <div className="collapse navbar-collapse justify-content-between">
        <ul className="navbar-nav">
          {/* Admin-only link to add product */}
          {isAdmin && (
            <li className="nav-item">
              <Link
                to="/add-product"
                className="nav-link px-3 border border-info rounded-pill d-flex align-items-center text-info fw-bold"
                style={{ fontSize: '1rem' }}
              >
                <span
                  role="img"
                  aria-label="plus"
                  className="me-1"
                  style={{ color: '#17c1e8', fontSize: '1.3rem', fontWeight: 'bold' }}
                >
                  ➕
                </span>
                Add Product
              </Link>
            </li>
          )}
        </ul>

        {/* Right-aligned user info and actions */}
        <div className="d-flex align-items-center">
          {/* Display user balance */}
          <span className="text-white me-3 fw-bold">
            {parseFloat(balance).toFixed(6)} ETH
          </span>

          {/* Display shortened account address */}
          <span className="badge bg-success me-3">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>

          {/* Basket link with item count */}
          <Link to="/basket" className="btn btn-outline-info me-3 position-relative">
            🧺 Basket
            {basketCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {basketCount}
              </span>
            )}
          </Link>

          {/* Logout button */}
          <button onClick={onLogout} className="btn btn-sm btn-outline-warning fw-bold">
            🔓 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;