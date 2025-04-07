// ShowPurchaseHistory.js (optional)
import React from 'react';

const ShowPurchaseHistory = () => {
  const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

  if (history.length === 0) return <p>No purchases yet.</p>;

  return (
    <div className="mt-4">
      <h4>🧾 Purchase History</h4>
      <ul className="list-group">
        {history.map((item, i) => (
          <li key={i} className="list-group-item">
            <strong>Product ID:</strong> {item.productId}<br />
            <strong>Buyer:</strong> {item.buyer}<br />
            <small>{new Date(item.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPurchaseHistory;
