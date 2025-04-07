// contracts/Marketplace.sol
pragma solidity ^0.5.0;

contract Marketplace {
    uint public productCount = 0;
    uint public totalSales = 0;
    address public admin;

    struct Product {
        uint id;
        string name;
        string imageName;
        uint price;
        uint stock;
        address payable owner;
    }

    mapping(uint => Product) public products;

    event ProductCreated(
        uint id,
        string name,
        string imageName,
        uint price,
        uint stock,
        address payable owner
    );

    event ProductPurchased(
        uint id,
        string productName,
        string buyerName,
        address buyer,
        uint price
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    constructor() public {
        admin = msg.sender;
    }

    function createProduct(string memory _name, string memory _imageName, uint _price, uint _stock) public onlyAdmin {
        require(bytes(_name).length > 0, "Name required");
        require(_price > 0, "Price must be > 0");
        require(_stock > 0, "Stock must be > 0");

        productCount++;
        products[productCount] = Product(productCount, _name, _imageName, _price, _stock, msg.sender);

        emit ProductCreated(productCount, _name, _imageName, _price, _stock, msg.sender);
    }

    function purchaseProduct(uint _id, string memory _buyerName) public payable {
        require(_id > 0 && _id <= productCount, "Invalid product ID");

        Product storage product = products[_id];

        require(product.stock > 0, "Out of stock");
        require(msg.value >= product.price, "Insufficient payment");

        product.owner.transfer(msg.value);
        product.stock--;
        totalSales += msg.value;

        emit ProductPurchased(_id, product.name, _buyerName, msg.sender, msg.value);
    }
}
