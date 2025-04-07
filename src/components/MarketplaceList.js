// src/MarketplaceList.js
import React from 'react';

const MarketplaceList = ({ products, purchaseProduct, purchaseHistory }) => {
  const renderHistory = () => {
    if (!purchaseHistory || !purchaseHistory.length) return <p>No purchases yet.</p>;

    return (
      <div className="mt-4">
        <h4><span role="img" aria-label="history">🧾</span> Purchase History</h4>
        <ul className="list-group">
          {purchaseHistory.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>Product ID:</strong> {item.productId}<br />
              <strong>Buyer:</strong> {item.buyer}<br />
              <small>{new Date(item.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2><span role="img" aria-label="shop">🛍</span> Products</h2>
      <div className="row">
        {products.map((product, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card shadow-sm">
              {/* ✅ Image Display */}
              {product.imageName && (
                <img
                  src={`/uploads/${product.imageName}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/uploads/default.jpg"; // fallback image
                  }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p><strong>Price:</strong> {window.web3.utils.fromWei(product.price.toString(), 'ether')} ETH</p>
                {parseInt(product.stock) > 0 ? (
                  <p><strong>Stock:</strong> {product.stock.toString()}</p>
                ) : (
                  <span className="badge bg-danger">Sold Out</span>
                )}
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => purchaseProduct(product.id.toString(), product.price.toString())}
                  disabled={parseInt(product.stock) === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {renderHistory()}
    </div>
  );
};

export default MarketplaceList;
