# Decentralized Marketplace DApp (with Basket & Admin Management)

A full-stack Ethereum-based Decentralized Application (DApp) that allows customers to browse and purchase products using MetaMask, while enabling admin users to manage products, stock, and images with a real-time blockchain backend.

## Build With

- React.js – Frontend Framework
- Ethereum / Solidity – Smart Contracts
- Ganache / Web3.js – Blockchain Testing
- Truffle – Contract Deployment
- MetaMask – Wallet Integration
- JSON Server (mocked backend) – User Auth (register/login)
- Static Image Support – Image selection from public folder
- Cart System – Add/Remove items with quantity control
- Admin Mode – Product creation, removal, and sales dashboard

## User Roles and Feature

1. Admin
- Add new products (with name, price, stock, image)
- Remove listed products
- Shows key metrics like total sales (in ETH), sold-out items, and in-stock products, providing a quick overview of     marketplace performance.

2. Customer
- Register/login
- Browse products with images and details
- Add products to basket with quantity control
- Confirm purchase via MetaMask
- View purchase history
- Product Image Management
- Images are stored in /public/image/ folder
- Admin selects images via dropdown during product creation
- Fallback image is used if product image is missing

   

   
## Installation

To get started with this project, clone the repository and install the dependencies.

```bash
  git clone https://github.com/your-username/weather-api.git
  cd weather-api
```

Now install the dependencies.

```bash
    npm install
```

## Run in Development

To run the Weather API in a development environment, follow these steps:

Start the TypeScript Compiler in Watch Mode:

- Open a terminal in the project root directory.
- Run the TypeScript compiler in watch mode, which will compile the TypeScript files to JavaScript in real-time as you make changes.

```bash
npm run build:watch
```

Start the Development Server:

- Open another terminal while the first one is still running.
- Run the development server, which will use the compiled JavaScript files.

```bash
npm run dev
```

This setup allows you to actively develop and test your application with live updates as you save your TypeScript files.

## Run Locally

For local running of the Weather API, especially in a production-like environment, follow these steps:

Compile the TypeScript files to JavaScript.

```bash
  npm run build

```

Start the server

```bash
  npm run start
```




