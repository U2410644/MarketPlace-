import React from 'react';

// Component to display product list and purchase history
const MarketplaceList = ({ products, addToBasket, purchaseHistory, isAdmin, removeProduct }) => {
  // Render purchase history
  const renderHistory = () => {
    if (!purchaseHistory || !purchaseHistory.length) return <p>No purchases yet.</p>;

    return (
      <div className="mt-4">
        <h4>
          <span role="img" aria-label="history">🧾</span> Purchase History
        </h4>
        <ul className="list-group">
          {purchaseHistory.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>Product ID:</strong> {item.productId}
              <br />
              <strong>Buyer:</strong> {item.buyer}
              <br />
              <small>{new Date(item.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {/* Product list header */}
      <h2>
        <span role="img" aria-label="shop">🛍</span> Products
      </h2>
      <div className="row">
        {products
          .filter(product => parseInt(product.stock) > 0)
          .map((product, i) => {
            // Set image source with fallback
            const imageSrc = `/image/${product.imageName || 'prod1.png'}`;

            return (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card shadow-sm">
                  {/* Product image */}
                  {product.imageName && (
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/image/prod1.png';
                      }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p>
                      <strong>Price:</strong> {window.web3.utils.fromWei(product.price.toString(), 'ether')} ETH
                    </p>
                    <p>
                      <strong>Stock:</strong> {product.stock.toString()}
                    </p>

                    {/* Conditional button based on user role */}
                    {isAdmin ? (
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => removeProduct(product.id)}
                      >
                        🗑 Remove Product
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => addToBasket(product)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Display purchase history */}
      {renderHistory()}
    </div>
  );
};

export default MarketplaceList;