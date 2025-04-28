# Decentralized Marketplace DApp (with Basket & Admin Management)

A full-stack Ethereum-based Decentralized Application (DApp) that allows customers to browse and purchase products using MetaMask, while enabling admin users to manage products, stock, and images with a real-time blockchain backend.

🔧 Built With:
💻 React.js – Frontend Framework
🔗 Ethereum / Solidity – Smart Contracts
📦 Ganache / Web3.js – Blockchain Testing
💼 Truffle – Contract Deployment
🔐 MetaMask – Wallet Integration
📄 JSON Server (mocked backend) – User Auth (register/login)
🖼️ Static Image Support – Image selection from public folder
🛒 Cart System – Add/Remove items with quantity control
👤 Admin Mode – Product creation, removal, and sales dashboard
⚙️ Features

👥 User Roles:
Admin
Add new products (with name, price, stock, image)
Remove listed products
![alt text](<Add Product.png>)
![alt text](<Remove Product.png>)

Customer
Register/login
![alt text](<Create Account.png>)
Browse products with images and details
Add products to basket with quantity control
![alt text](<Add to Cart.png>)
![alt text](<quantity control.png>)
Confirm purchase via MetaMask
![alt text](<MetaMask Confirmation.png>)
View purchase history
![alt text](<Ganache Transaction History.png>)
🖼 Product Image Management
Images are stored in /public/image/ folder
Admin selects images via dropdown during product creation
Fallback image is used if product image is missing

🧺 Basket (Cart)
Customers can add items to basket
Quantity can be increased or decreased
Basket items persist via localStorage
Confirmed purchases update product stock on-chain

📦 Smart Contract (Solidity)
function purchaseProduct(uint _id, string memory _buyerName, uint _quantity) public payable {
    require(_quantity > 0 && _quantity <= product.stock, "Invalid quantity");
    require(msg.value >= product.price * _quantity, "Insufficient payment");

    product.stock -= _quantity;
    totalSales += msg.value;

    emit ProductPurchased(_id, msg.sender, _buyerName, _quantity, msg.value);
}


🚀 Getting Started

🧱 Prerequisites
Node.js
MetaMask
Truffle
Ganache
Optional: JSON Server for mocked backend

🧪 To Run Locally:
# 1. Start Ganache locally

# 2. Compile & migrate contracts
truffle compile
truffle migrate --reset

# 3. Start React frontend
cd client
npm install
npm start

# 4. (Optional) Start JSON server (for /Backend API)
cd Backend
node server.js
🔐 Admin Credentials

Email: admin@marketplace.com
Password: admin123
Use these to log in as admin and manage the product listings.

📚 Future Improvements

✅ Backend DB integration (MongoDB / PostgreSQL)
📲 Mobile responsive UI
🧠 ML-based product recommendations
🔔 Notification system for order confirmation
🤝 Acknowledgments

