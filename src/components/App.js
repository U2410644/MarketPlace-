// src/App.js
import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import MarketplaceList from './MarketplaceList';
import AddProduct from './AddProduct';
import Login from './Login';

class App extends Component {
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
    purchaseHistory: []
  };

  async componentDidMount() {
    await this.loadWeb3();
  }

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

    const contract = new web3.eth.Contract(Marketplace.abi, networkData.address);
    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEth = web3.utils.fromWei(balanceWei.toString(), 'ether');

    const productCount = await contract.methods.productCount().call();
    const products = [];

    let sold = 0, unsold = 0;
    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.products(i).call();
      products.push(product);
      parseInt(product.stock) > 0 ? unsold++ : sold++;
    }

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

  handleLogin = async (isAdmin) => {
    const buyerName = localStorage.getItem('buyerName') || '';
    await this.loadBlockchainData();
    this.setState({ isLoggedIn: true, isAdmin, buyerName });
  };

  handleLogout = () => {
    localStorage.removeItem('buyerName');
    this.setState({
      isLoggedIn: false,
      buyerName: '',
      account: '',
      balance: '',
      isAdmin: false,
      products: [],
      marketplace: null
    });
  };

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

  render() {
    const {
      isLoggedIn, isAdmin, products, account, balance,
      loading, totalSales, soldCount, unsoldCount, purchaseHistory
    } = this.state;

    if (!isLoggedIn) return <Login onLogin={this.handleLogin} />;

    return (
      <Router>
        <Navbar account={account} balance={balance} isAdmin={isAdmin} onLogout={this.handleLogout} />
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
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
