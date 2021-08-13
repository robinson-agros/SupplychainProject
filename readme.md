## Description

Supplychain smart contract written in silidity and deployed on the Rinkeby test network. This project demostrate authenticity of and relationship between farmer, distributor and buyer.


## Directory
- Diagrams.
    - Activity Diagram.
    - Sequence Diagram.
    - Activity Diagram.
    - State Diagram. 
- contracts
    - /accescontrol
        - BuyerRole.sol
        - Distributorrole.sol
        - FarmerRole.sol
        - Roles.sol
    - /base
        - Supplychain.sol
    - /core
        - Ownable.sol
    - Migrations.sol
- migrations
    - 1_initial_migration.js
    - 2_deploy_contract.js
- test
    - TestSupplychain.js
- package-lock.json
- package.json
- readme.md
- truffle-config.js

---
## Contract Diagrams.

### Activity Diagram.
![Activity_Diagram](/Diagrams/activityDiagram.png)

### Sequence Diagram
![Sequence_Diagram] (/Diagrams/sequenceDiagram.png)

### Activity Diagram
![Activity_Diagram] (/Diagrams/activityDiagram.png)

### State Diagram
![State_Diagram] (stateDiagram.png)

---
## Solidity Functions

### Modifiers
1.- Checking values and address of smartcontract caller.

```js
modifier verifyCaller (address _addr){
        require(msg.sender == _addr, "Not Current Owner");
        _;
    }

    modifier paidEnought(uint _price) {
        require(msg.value >= _price, "Not Enought ether");
        _;
    }

    modifier checkValue(uint _upc) {
        _;
        uint _price = items[_upc].itemPrice;
        uint amountToReturn = msg.value - _price;
        payable(items[_upc].buyerID).transfer(amountToReturn);
    }

```

2.- Checking previous state for each function.
```js
modifier seeded(uint _upc) {
        require(items[_upc].itemState == State.seeded, "Not Seeded Yet");
        _;
    }

    modifier growing(uint _upc) {
        require(items[_upc].itemState == State.growing, "Not Growing Yet");
        _;
    }

    modifier harvested(uint _upc) {
        require(items[_upc].itemState == State.harvested, "Not Harvested Yet");
        _;
    }

    modifier collected(uint _upc) {
        require(items[_upc].itemState == State.collected, "Not collected Yet");
        _;
    }

    modifier packed(uint _upc) {
        require(items[_upc].itemState == State.packed, "Not Packed Yet");
        _;
    }

    modifier advertised(uint _upc) {
        require(items[_upc].itemState == State.advertised, "Not advertised Yet");
        _;
    }

    modifier buyed(uint _upc) {
        require(items[_upc].itemState == State.buyed);
        _;
    }
```

### Events

```js
event Seeded(uint upc);
event Growing(uint upc);
event Harvested(uint upc);
event Collected(uint upc);
event Packed(uint upc);
event Advertised(uint upc);
event Buyed(uint upc);
```

## TestSupplyChain.js
![Tests](/Diagrams/testing.png)

## Dapp
I've used React Truffle Box for developing Fron-End. 
### 1.- First you can create roles as farmers, distributors and buyers from owner contract. 

![Dapp_01](/Diagrams/Dapp_01.png)

### 2.- You can Fetch for Items using UPC. 

![Dapp_02](/Diagrams/Dapp_02.png)

### 3.- As a Farmer you can add a new item. 

![Dapp_03](/Diagrams/Dapp_03.png)

### 4.- As a Distributor or buyer you can put the price for collecting and buying. 

![Dapp_04](/Diagrams/Dapp_04.png)

## Versions
- Solidity: ^0.8.0 (solc-js)
- Truffle v5.4.1 (core: 5.4.1)
- Node v12.21.0
- Web3.js v1.4.0

## Deployed to Rinkeby

![Rinkeby](/Diagrams/ContractAddress.png)

## Quick Start
1.  cd into project repo
    - cd projectSupplychain
2.  download node libraries
    - npm install
3.  download and start ganache
    - https://truffleframework.com/ganache
4.  Compile contracts
    - truffle compile
5.  Migrating (currently listing on port: 9545)
    - truffle migrate --network development 
6. Testing
    - truffle test
7. Start FronEnd Dapp
    - cd client
    - npm run start