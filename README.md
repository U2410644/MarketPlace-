# Weather API

This Weather API is built using Node.js and Express, and it's designed to fetch weather data for a specified city. It's a simple demonstration of creating and deploying RESTful APIs with a service layer architecture, using TypeScript for improved code reliability.

## Features

- Fetch weather data for any city.
- Implemented using Node.js, Express, and TypeScript.
- API documentation using Swagger (OpenAPI Specification).
- Test API endpoints with Postman.

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












School Of Architecture, Computer Science and Engineering  
                                        Department of Engineering and Computing 


                                               Decentralized E-Commerce:
                            A Hybrid DApp for Secure Marketplace Transactions

                            


                                                   Roshan Shahi
                                               Student ID: 2410644


                   A report submitted as a partial requirement for the degree of
                                                 BSc (Hons) in Computer Science
                                     Mobile and Distributed Systems (CN6035)
                                                                    
                                                                                                      Academic Year:  2025


Table of Contents
Chapter1: Introduction	3
Chapter2: System Architecture	4
Chapter3: Technology Stack and Tools	5
Chapter4: Smart Contract (The Blockchain Rules)	6
Chapter5: User Roles and Features	7
5.1 Admin Panel	7
5.2 Customer Interface	10
Chapter6: Blockchain in Action	11
Chapter 7: Challenges Faced	15
Chapter 8: Conclusion and Future Work	15
Chapter9: References	17
Chapter10: Links	18












Chapter1: Introduction
With the advancement of blockchain technology and decentralized platforms, Decentralized Applications (DApps) have emerged as a powerful paradigm for building trustless, transparent, and tamper-proof applications (Antonopoulos and Wood, 2018; Buterin, 2014). This project presents the design and implementation of a hybrid DApp that serves as a decentralized e-commerce platform. The core objective is to build a user-friendly interface where customers can register, browse products, add them to a basket, and complete purchases via blockchain-based transactions. Simultaneously, the platform allows an admin to add or remove products and manage stock levels.
The DApp integrates Ethereum smart contracts written in Solidity with a React.js frontend, a Node.js/Express backend for handling user authentication, and utilizes MetaMask for transaction confirmation. The application is developed and tested using Ganache, a local Ethereum blockchain simulator, and relies on users.json as a simple data store for user management.













Chapter2: System Architecture
 
                                                       Fig1: System Architecture

The system architecture of this hybrid DApp integrates the frontend, backend, and blockchain layers in a cohesive manner. The frontend is developed using React.js, allowing users to browse products, add items to a cart, and initiate blockchain transactions through an intuitive interface. This interface communicates with MetaMask, a browser extension wallet, which facilitates secure Ethereum transactions and connects the user to the blockchain. The backend is built with Node.js and Express.js and is responsible for handling user authentication and storing registered user data in a simple user.json file. For the blockchain layer, a smart contract written in Solidity and deployed locally on Ganache manages core functionalities like product creation, stock tracking, and purchase handling. When a user confirms a purchase, the DApp interacts with the smart contract via Web3.js, processes the payment through MetaMask, and updates the blockchain accordingly. This architecture ensures decentralization where needed (product handling and purchases) while keeping user management lightweight and centralized for simplicity.
Chapter3: Technology Stack and Tools
The following technologies were used to develop the application:
Technology	Role
React.js	Frontend framework
Node.js	Backend API development
Express.js	Routing and API layer for auth
Solidity	Writing smart contracts
Ganache	Local Ethereum blockchain simulation
MetaMask	Wallet and transaction signing
Web3.js	Bridge between React and Ethereum
JSON (users. Json)	Lightweight storage for authentication

The project leverages a robust stack of technologies to ensure seamless functionality across its blockchain-based marketplace. Solidity serves as the core language for developing smart contracts, enabling secure management of products and transactions on the Ethereum blockchain. Ganache provides a local Ethereum blockchain environment, facilitating efficient deployment and testing of these contracts during development. MetaMask, a browser extension wallet, simplifies Ethereum transactions by connecting users to the blockchain securely. Web3.js acts as the bridge between the React.js frontend and the blockchain, enabling smooth interaction with smart contracts. The frontend, built with React.js, delivers a dynamic and responsive user interface for an intuitive experience. On the backend, Node.js paired with Express hosts authentication endpoints, ensuring secure user access. User data is persistently stored in a users.json file on the server for reliable record-keeping. Evidence of the system's functionality is captured in screenshots, including MetaMask transaction confirmation dialogs and Ganache’s storage panel, which clearly demonstrate blockchain-based state changes.
Chapter4: Smart Contract (The Blockchain Rules)
The smart contract is written in Solidity and sets the rules for products using a Product struct. Each product has these details: ID, name, image filename, price (in Wei), stock count, and owner (admin address). Figure 5: Solidity Smart Contract Code shows the code for the Product struct and the main functions like createProduct, purchaseProduct, and removeProduct. This helps us understand how the smart contract works. 
  
                                  Fig2: Solidity Smart Contract Code
The smart contract has three main functions:
•	createProduct(): Lets only the admin add new products to the blockchain.
•	purchaseProduct(): Takes payment in Ether and lowers the product stock.
•	removeProduct(): Lets the admin take a product off the marketplace.
The contract is deployed on the Ganache network, and all functions are protected to keep things safe. For example, the createProduct function has an onlyAdmin rule, so only the admin can use it.
Chapter5: User Roles and Features
The hybrid DApp supports two roles: admin and customer, each with tailored functionalities for managing and using the marketplace.
5.1 Admin Panel
Login Using Hardcoded Credentials: The admin logs in using predefined credentials, as shown in the login interface below. This prototype uses a hardcoded email (admin@marketplace.com) and password for simplicity, though a production system would implement secure authentication mechanisms like JWT.
 
       Figure 3: Admin login interface displaying fields for role, email, and password.




Manage Products and Metrics: Admins can add products via a form, inputting name, price (in ETH), stock quantity, and selecting an image from a predefined list in the public directory, with a preview displayed before submission (see below). The panel also shows key metrics like total sales (in ETH), sold-out items, and in-stock products, providing a quick overview of marketplace performance.
 
              Figure 4: Form for adding a new product with metrics visible below.


Remove Products from the List if Required: Admins can remove products directly from the product listing, as shown in the admin panel screenshot below. Each product card includes a "Remove Product" button, enabling efficient inventory management.
 
Figure 5: Admin panel displaying product listings with options to remove products

5.2 Customer Interface
Register and Login: Customers can register and log in using the authentication API. Figure 1 shows the registration interface, where users select their role (e.g., Customer), enter their name, email, and password, and submit to create an account.
 
                                        Figure 6: Customer Registration Interface
View Product Listings and Add to Basket: Users can browse products, view details like price (in ETH) and stock, and add items to their basket. Figure 2 displays the product listings, including a GoPro, Sony, and Canon camera, with "Add To Cart" buttons for each.
 
                                 Figure 7: Product Listings in the DApp Shop

Basket Management: The basket supports dynamic quantity updates using + and - buttons. Figure 3 shows the basket with GoPro and Canon cameras (quantity: 1 each), totaling 0.0049 ETH, with options to adjust quantities or confirm the purchase.
 
                                  Figure 8: Basket Interface with Multi-Item Quantities
Chapter6: Blockchain in Action
The blockchain is the heart of this DApp, making sure all buying and product management is secure and transparent. We use Ethereum blockchain (tested on Ganache) to handle transactions. Here’s how it works in simple steps:
When a customer wants to buy a product, the app talks to the smart contract using Web3.js, and the customer’s MetaMask wallet opens to ask them to confirm the payment. For example, Figure 1: MetaMask Payment shows MetaMask asking the user to pay 0.0002 ETH to buy something, with a small fee of 0.001 ETH. This step is important because the user has to say “yes” to pay, making the process safe.

 
               
                                             Fig9: MetaMask Transaction Confirmation

After the customer agrees, the payment is sent to the blockchain (Ganache), where the smart contract updates the product stock and saves the purchase details, and for admin tasks like removing a product, the smart contract also records these actions on the blockchain. For example, Figure 2: Ganache Product Removal shows the admin taking a product off the app, using 26071 gas and saving it in block 197, which proves the admin’s work is saved on the blockchain.

 
                                      Fig10: Ganache Transaction Details

For or admin tasks, like removing a product, the smart contract also records these actions on the blockchain. Figure 3: Ganache Contract Details shows info about the smart contract, including 10 products, some sales, and the admin’s address, along with the product removal action. This is important because it shows the smart contract is working right.
 

                                           Fig11: Ganache Contract Details

This process ensures that no one can cheat, and all actions are saved forever on the blockchain. Figure 4: Ganache Blocks shows a list of blocks (189 to 197), where block 197 has the product removal from Figure 2. This matters because it shows how the blockchain keeps everything in order.
 
                                          Fig12: Ganache Blocks Overview

Chapter 7: Challenges Faced
During the development of the Hybrid Decentralized Marketplace DApp, several challenges emerged that required careful resolution. A significant blockchain-related issue was transaction confirmation delays due to Ethereum blockchain latency, even on the local Ganache network; when users confirmed purchases via MetaMask, varying processing times caused by network conditions and block mining intervals led to a suboptimal user experience, prompting the addition of a "pending" status on the frontend to mitigate delays, though better asynchronous handling like event listeners would be needed in production. Maintaining synchronization between the application's basket state and localStorage proved difficult, as ensuring data persistence across reloads without duplication required frequent updates to localStorage with every basket change. Quantity handling also posed a challenge, as the smart contract initially supported only single-item purchases; this was resolved by extending the contract to accept a quantity parameter, necessitating accurate total price calculations and stock validation. Solidity’s limitations on dynamic strings and arrays further complicated the smart contract logic, requiring careful structuring for efficient storage and operations. On the backend, security concerns arose due to the lack of JWT-based authentication, which, while acceptable for a prototype, would be critical for a production-ready DApp. Additionally, image management was tricky; transitioning from referencing images in the src directory to the public folder required adjustments to ensure consistent product previews across the platform.





Chapter 8: Conclusion and Future Work
This project successfully demonstrates a functional hybrid DApp that allows admin-controlled product listing and customer purchasing on the Ethereum blockchain. The application combines React.js, Solidity, Web3.js, Ganache, and MetaMask to deliver a fully decentralized shopping experience enhanced with real-time data interactions.
Future Enhancements:
•	Replace users.json with MongoDB or Firebase for scalable user management (Express.js, 2023). Figure 13 shows the current users.json data, illustrating the prototype’s simple user records, which highlights the need for a more robust database solution to handle larger user bases.
 
                  Figure 4: Current User Data in users.json

•	Implement JWT-based authentication for secure login.
•	Migrate to Ethereum testnet (e.g., Sepolia or Goerli).
•	Add IPFS for decentralized image storage.
•	Enhance the admin panel with analytics and exportable logs.
The DApp showcases a foundational understanding of smart contracts, Ethereum-based transactions, and integrating blockchain with modern web technologies. It serves as a strong basis for building more robust decentralized platforms in the future.
Chapter9: References 
Antonopoulos, A.M. and Wood, G., 2018. Mastering Ethereum: Building smart contracts and DApps. O'Reilly Media.

Buterin, V., 2014. A next-generation smart contract and decentralized application platform. white paper, 3(37), pp.2-1.

Chohan, U.W., 2024. The decentralized autonomous organization and governance issues. In Decentralized Autonomous Organizations (pp. 139-149). Routledge.

Dannen, C., 2017. Introducing Ethereum and solidity (Vol. 1, pp. 159-160). Berkeley: Apress.

Saundariya, K., Abirami, M., Senthil, K.R., Prabakaran, D., Srimathi, B. and Nagarajan, G., 2021, May. Webapp service for booking handyman using mongodb, express JS, react JS, node JS. In 2021 3rd International Conference on Signal Processing and Communication (ICPSC) (pp. 180-183). IEEE

Lazuardy, M.F.S. and Anggraini, D., 2022. Modern front end web architectures with react. js and next. js. Research Journal of Advanced Engineering and Science, 7(1), pp.132-141.

Nuutinen, N.W.S., 2024. CIPHER: Comprehensive Inline Assembly and Solidity Detection for Enhanced Smart Contract Security.

Lee, W.M., 2019. Using the web3. js APIs. In Beginning Ethereum Smart Contracts Programming: With Examples in Python, Solidity, and JavaScript (pp. 169-198). Berkeley, CA: Apress.
Chapter10: Links

Initial  Link of My Project: https://github.com/dappuniversity/marketplace.git
Final Link of My project: https://github.com/U2410644/MarketPlace-.git
Video Link of My Presentation: 



# Decentralized Marketplace DApp (with Basket & Admin Management)

A full-stack Ethereum-based Decentralized Application (DApp) that allows customers to browse and purchase products using MetaMask, while enabling admin users to manage products, stock, and images with a real-time blockchain backend.

Built With:   
React.js – Frontend Framework
Ethereum / Solidity – Smart Contracts
Ganache / Web3.js – Blockchain Testing
Truffle – Contract Deployment
MetaMask – Wallet Integration  
JSON Server (mocked backend) – User Auth (register/login)
Static Image Support – Image selection from public folder
Cart System – Add/Remove items with quantity control
Admin Mode – Product creation, removal, and sales dashboard
Features
User Roles:
Admin
Add new products (with name, price, stock, image)
Remove listed products

Customer
Register/login
Browse products with images and details
Add products to basket with quantity control
Confirm purchase via MetaMask
View purchase history
Product Image Management
Images are stored in /public/image/ folder
Admin selects images via dropdown during product creation
Fallback image is used if product image is missing

Basket (Cart)
Customers can add items to basket
Quantity can be increased or decreased
Basket items persist via localStorage
Confirmed purchases update product stock on-chain

Smart Contract (Solidity)
function purchaseProduct(uint _id, string memory _buyerName, uint _quantity) public payable {
    require(_quantity > 0 && _quantity <= product.stock, "Invalid quantity");
    require(msg.value >= product.price * _quantity, "Insufficient payment");

    product.stock -= _quantity;
    totalSales += msg.value;

    emit ProductPurchased(_id, msg.sender, _buyerName, _quantity, msg.value);
}


Getting Started

Prerequisites
Node.js
MetaMask
Truffle
Ganache
Optional: JSON Server for mocked backend

To Run Locally:
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
Admin Credentials

Email: admin@marketplace.com
Password: admin123
Use these to log in as admin and manage the product listings.

Future Improvements

Backend DB integration (MongoDB / PostgreSQL)
Mobile responsive UI
ML-based product recommendations
Notification system for order confirmation
Acknowledgments

