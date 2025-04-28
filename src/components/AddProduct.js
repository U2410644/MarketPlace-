// src/AddProduct.js
import React, { Component } from 'react';

// Predefined images
const imageOptions = ['prod1.png', 'prod2.png', 'prod3.png', 'prod4.png', 'prod5.png', 'prod6.png', 'prod7.png', 'prod8.png'];

class AddProduct extends Component {
  state = {
    name: '',
    price: '',
    stock: '',
    imageName: imageOptions[0],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, stock, imageName } = this.state;

    if (!name || !price || !stock || !imageName) {
      return alert("Please fill all fields.");
    }

    this.props.createProduct(name, price, stock, imageName);

    this.setState({
      name: '',
      price: '',
      stock: '',
      imageName: imageOptions[0],
    });
  };

  render() {
    const { totalSales, soldCount, unsoldCount } = this.props;
    const { name, price, stock, imageName } = this.state;

    return (
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="mb-4 text-primary fw-bold d-flex align-items-center">
            <span role="img" aria-label="add" style={{ fontSize: '1.8rem', color: '#0dcaf0', marginRight: '10px' }}>➕</span>
            Add New Product
          </h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group mb-3">
              <label className="fw-semibold">📦 Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">💰 Price (ETH)</label>
              <input
                type="number"
                step="0.0001"
                className="form-control"
                placeholder="e.g. 0.01"
                value={price}
                onChange={(e) => this.setState({ price: e.target.value })}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">📦 Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 5"
                value={stock}
                onChange={(e) => this.setState({ stock: e.target.value })}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">🖼 Select Image from Folder</label>
              <select
                className="form-select"
                value={imageName}
                onChange={(e) => this.setState({ imageName: e.target.value })}
              >
                {imageOptions.map((img, i) => (
                  <option key={i} value={img}>{img}</option>
                ))}
              </select>

              <div className="mt-3">
                <label className="text-muted">Preview:</label>
                <img
                  src={`/image/${imageName}`}
                  alt="Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: '150px' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-3 px-4">
              ✅ Add Product
            </button>
          </form>
        </div>

        <div className="row mt-5 text-center">
          <div className="col-md-4">
            <span className="badge bg-warning fs-6">
              💰 Total Sales: {parseFloat(totalSales).toFixed(4)} ETH
            </span>
          </div>
          <div className="col-md-4">
            <span className="badge bg-danger fs-6">
              📦 Sold Out: {soldCount}
            </span>
          </div>
          <div className="col-md-4">
            <span className="badge bg-success fs-6">
              🛒 In Stock: {unsoldCount}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;