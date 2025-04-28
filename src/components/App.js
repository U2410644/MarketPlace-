import React, { Component } from 'react';
import Web3 from 'web3'; // For blockchain interactions and BN math
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import MarketplaceList from './MarketplaceList';
import AddProduct from './AddProduct';
import Login from './Login';

// Basket page component to display and manage cart
const BasketPage = ({ basket, confirmPurchase, updateQuantity, removeItem }) => {
  // Calculate total price in Wei
  const totalPrice = basket.reduce(
    (sum, item) =>
      sum.add(
        window.web3.utils.toBN(item.price).mul(window.web3.utils.toBN(item.quantity || 1))
      ),
    window.web3.utils.toBN('0')
  );

  return (
    <div className="mt-5">
      <h3>🧺 Basket</h3>
      {basket.length === 0 ? (
        <p>No items in the basket.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {basket.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong>
                  <div className="text-muted small">
                    {window.web3.utils.fromWei(item.price.toString(), 'ether')} ETH each
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => updateQuantity(item.id, 1)}>
                    ➕
                  </button>
                  <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => removeItem(item.id)}>
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h5>Total: {window.web3.utils.fromWei(totalPrice.toString(), 'ether')} ETH</h5>
          <button className="btn btn-success mt-3" onClick={confirmPurchase}>
            ✅ Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
};

class App extends Component {
  // Initialize state for app data
  state = {
    account: '',
    balance: '',
    isAdmin: false,
    isLoggedIn: false,
    buyerName: '',
    marketplace: null,
    products: [],
    loading: true,
    totalSales: '0',
    soldCount: 0,
    unsoldCount: 0,
    purchaseHistory: [],
    basket: []
  };

  // Load Web3 and check login status on mount
  async componentDidMount() {
    await this.loadWeb3();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isLoggedIn) {
      this.handleLogin(isAdmin);
    }
  }

  // Connect to MetaMask
  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        alert("❌ MetaMask permission denied.");
      }
    } else {
      alert("Please install MetaMask to use this DApp.");
    }
  };

  // Fetch blockchain data
  loadBlockchainData = async () => {
    const web3 = window.web3;
    if (!web3) return;

    const accounts = await web3.eth.getAccounts();
    if (!accounts.length) {
      alert("No MetaMask accounts found.");
      return;
    }

    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (!networkData) {
      alert("Smart contract not deployed to this network.");
      return;
    }

    // Initialize contract instance
    const contract = new web3.eth.Contract(Marketplace.abi, networkData.address);
    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEth = web3.utils.fromWei(balanceWei.toString(), 'ether');

    // Fetch products
    const productCount = await contract.methods.productCount().call();
    const products = [];
    let sold = 0, unsold = 0;
    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.products(i).call();
      products.push(product);
      parseInt(product.stock) > 0 ? unsold++ : sold++;
    }

    // Get admin and sales data
    const admin = await contract.methods.admin().call();
    const totalSales = await contract.methods.totalSales().call();
    const totalSalesEth = web3.utils.fromWei(totalSales.toString(), 'ether');

    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

    this.setState({
      account: accounts[0],
      balance: balanceEth,
      marketplace: contract,
      products,
      loading: false,
      totalSales: totalSalesEth,
      soldCount: sold,
      unsoldCount: unsold,
      isAdmin: accounts[0].toLowerCase() === admin.toLowerCase(),
      purchaseHistory: history
    });
  };

  // Handle user login
  handleLogin = async (isAdmin) => {
    const buyerName = localStorage.getItem('buyerName') || '';
    await this.loadBlockchainData();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    this.setState({ isLoggedIn: true, isAdmin, buyerName });
  };

  // Handle user logout
  handleLogout = () => {
    localStorage.removeItem('buyerName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    this.setState({
      isLoggedIn: false,
      buyerName: '',
      account: '',
      balance: '',
      isAdmin: false,
      products: [],
      marketplace: null,
      basket: []
    });
  };

  // Create a new product
  createProduct = (name, priceEth, stock, imageName = '') => {
    const { marketplace, account } = this.state;
    if (!marketplace || !account) return alert("Wallet not connected.");

    const priceWei = window.web3.utils.toWei(priceEth.toString(), 'ether');

    marketplace.methods
      .createProduct(name, imageName, priceWei, stock.toString())
      .send({ from: account })
      .once('receipt', () => {
        this.loadBlockchainData();
        alert(`✅ Product "${name}" created successfully.`);
      })
      .on('error', (err) => {
        console.error(err);
        alert("❌ Failed to create product.");
      });
  };

  // Purchase a single product
  purchaseProduct = (id, price) => {
    const { marketplace, account, buyerName } = this.state;
    if (!account || !marketplace || !buyerName) return alert("Please login and connect MetaMask.");

    marketplace.methods
      .purchaseProduct(id, buyerName)
      .send({ from: account, value: price.toString() })
      .once('receipt', () => {
        const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
        history.push({ productId: id, buyer: buyerName, date: new Date().toISOString() });
        localStorage.setItem('purchaseHistory', JSON.stringify(history));
        this.loadBlockchainData();
        alert(`✅ Product #${id} purchased successfully.`);
      })
      .on('error', (err) => {
        console.error(err);
        alert("❌ Transaction failed.");
      });
  };

  // Add product to basket
  addToBasket = (product) => {
    this.setState((prev) => {
      const basket = [...prev.basket];
      const existingItem = basket.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        basket.push({ ...product, quantity: 1 });
      }
      alert(`🧺 ${product.name} added to basket!`);
      return { basket };
    });
  };

  // Remove product from basket
  removeFromBasket = (productId) => {
    this.setState((prev) => ({
      basket: prev.basket.filter((item) => item.id !== productId)
    }));
  };

  // Update item quantity in basket
  updateQuantity = (productId, delta) => {
    this.setState((prev) => ({
      basket: prev.basket.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    }));
  };

  // Remove item from basket (alias for removeFromBasket)
  removeItem = (productId) => {
    this.setState((prev) => ({
      basket: prev.basket.filter(item => item.id !== productId)
    }));
  };

  // Confirm and purchase all basket items
  confirmPurchase = async () => {
    const { basket, marketplace, account, buyerName } = this.state;
    if (!basket.length) return alert("Basket is empty!");
    if (!account || !marketplace || !buyerName) return alert("Please login and connect MetaMask.");

    try {
      for (const item of basket) {
        const totalPrice = window.web3.utils.toBN(item.price).muln(item.quantity);
        await marketplace.methods
          .purchaseProduct(item.id, buyerName, item.quantity)
          .send({ from: account, value: totalPrice.toString() });
      }

      const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      basket.forEach((item) =>
        history.push({
          productId: item.id,
          buyer: buyerName,
          quantity: item.quantity,
          date: new Date().toISOString()
        })
      );
      localStorage.setItem('purchaseHistory', JSON.stringify(history));
      this.setState({ basket: [] });
      this.loadBlockchainData();
      alert("✅ All basket items purchased!");
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed.");
    }
  };

  // Remove product from marketplace
  removeProduct = (productId) => {
    const { marketplace, account } = this.state;
    if (!marketplace || !account) return alert("Wallet not connected.");

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    marketplace.methods
      .removeProduct(productId)
      .send({ from: account })
      .once('receipt', () => {
        alert("🗑 Product removed successfully.");
        this.loadBlockchainData();
      })
      .on('error', (err) => {
        console.error(err);
        alert("❌ Failed to remove product.");
      });
  };

  render() {
    const {
      isLoggedIn, isAdmin, products, account, balance,
      loading, totalSales, soldCount, unsoldCount, purchaseHistory, basket
    } = this.state;

    // Redirect to login if not authenticated
    if (!isLoggedIn) return <Login onLogin={this.handleLogin} />;

    // Calculate total items in basket
    const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <Router>
        <Navbar
          account={account}
          balance={balance}
          isAdmin={isAdmin}
          onLogout={this.handleLogout}
          basketCount={basketCount}
        />
        <div className="container mt-4">
          {loading ? (
            <p className="text-center">⏳ Loading blockchain data...</p>
          ) : (
            <Switch>
              <Route exact path="/">
                <MarketplaceList
                  account={account}
                  products={products}
                  purchaseProduct={this.purchaseProduct}
                  purchaseHistory={purchaseHistory}
                  addToBasket={this.addToBasket}
                  isAdmin={isAdmin}
                  removeProduct={this.removeProduct}
                />
              </Route>
              <Route path="/add-product">
                {isAdmin ? (
                  <AddProduct
                    createProduct={this.createProduct}
                    totalSales={totalSales}
                    soldCount={soldCount}
                    unsoldCount={unsoldCount}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/basket">
                <BasketPage
                  basket={basket}
                  confirmPurchase={this.confirmPurchase}
                  updateQuantity={this.updateQuantity}
                  removeItem={this.removeItem}
                />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default App;