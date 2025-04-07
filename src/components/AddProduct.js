// src/AddProduct.js
import React, { Component } from 'react';

class AddProduct extends Component {
  state = {
    name: '',
    price: '',
    stock: '',
    imageFile: null,
    imagePreview: null,
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, stock, imageFile } = this.state;

    if (!name || !price || !stock || !imageFile) {
      return alert("Please fill all fields and select an image.");
    }

    // Save image locally in /public/uploads
    const fileName = `${name.replace(/\s+/g, '-')}_${Date.now()}_${imageFile.name}`;
    const filePath = `/uploads/${fileName}`;

    // ⛔️ HTML input can't save to local server - use copy manually to public/uploads for now
    // Simulate the image being saved (manual step in dev)
    console.warn(`⚠️ Move the image manually to: public/uploads/${fileName}`);

    // Call the smart contract
    this.props.createProduct(name, price, stock, fileName);

    this.setState({
      name: '',
      price: '',
      stock: '',
      imageFile: null,
      imagePreview: null,
    });
  };

  render() {
    const { totalSales, soldCount, unsoldCount } = this.props;
    const { name, price, stock, imagePreview } = this.state;

    return (
      <div className="add-product-page">
        <h2><span role="img" aria-label="add">➕</span> Add New Product</h2>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <div className="form-group mb-3">
            <label>Product Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => this.setState({ name: e.target.value })} required />
          </div>

          <div className="form-group mb-3">
            <label>Price (in ETH)</label>
            <input type="number" step="0.0001" className="form-control" value={price} onChange={(e) => this.setState({ price: e.target.value })} required />
          </div>

          <div className="form-group mb-3">
            <label>Stock Quantity</label>
            <input type="number" className="form-control" value={stock} onChange={(e) => this.setState({ stock: e.target.value })} required />
          </div>

          <div className="form-group mb-3">
            <label>Upload Product Image</label>
            <input type="file" accept="image/*" className="form-control" onChange={this.handleImageChange} required />
            {imagePreview && (
              <div className="mt-3">
                <p>Preview:</p>
                <img src={imagePreview} alt="Preview" style={{ maxHeight: '200px' }} />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success">Add Product</button>
        </form>

        <hr className="my-4" />

        <div className="row text-center">
          <div className="col"><h5><span role="img" aria-label="money">💰</span> Total Sales: {totalSales} ETH</h5></div>
          <div className="col"><h5><span role="img" aria-label="sold">📦</span> Sold Out: {soldCount}</h5></div>
          <div className="col"><h5><span role="img" aria-label="available">🛒</span> In Stock: {unsoldCount}</h5></div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
