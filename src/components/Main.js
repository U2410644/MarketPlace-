// src/components/Main.js
import React, { Component } from 'react';


class Main extends Component {
  render() {
    return (
      <div id="content" style={{ padding: '20px' }}>
        {/* -- Add Product Form (unchanged) -- */}
        <h1>Add Product</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const name = this.productName.value;
            // Convert product price (entered in Ether) to Wei
            const price = window.web3.utils.toWei(
              this.productPrice.value.toString(),
              'Ether'
            );
            console.log('Adding product:', name, price);
            // Call the createProduct function passed down from App.js
            this.props.createProduct(name, price);
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => {
                this.productName = input;
              }}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => {
                this.productPrice = input;
              }}
              className="form-control"
              placeholder="Product Price (in Ether)"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>

        <p>&nbsp;</p>

        {/* -- Buy Product Section (updated to show a card layout) -- */}
        <h2>Buy Product</h2>
        <div className="row">
          {this.props.products.map((product, key) => {
            // Convert price from Wei to Ether for display
            const priceEth = window.web3.utils.fromWei(
              product.price.toString(),
              'Ether'
            );

            return (
              <div key={key} className="col-md-3 mb-4">
                <div className="card h-100">
                  {/* Show product image if it exists (set in App.js) */}
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>Price:</strong> {priceEth} ETH
                    </p>
                    <p className="card-text">
                      <strong>Owner:</strong> {product.owner}
                    </p>

                    {/* If not purchased, show "Buy" button; otherwise show "Purchased" */}
                    {!product.purchased ? (
                      <button
                        className="btn btn-success mt-auto"
                        onClick={() => {
                          // If you want a cart flow, call this.props.onAddToCart(product)
                          // or if you want direct purchase, call purchaseProduct
                          this.props.purchaseProduct(
                            product.id.toString(),
                            window.web3.utils.toWei(priceEth, 'Ether')
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : (
                      <span className="text-muted">Purchased</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
