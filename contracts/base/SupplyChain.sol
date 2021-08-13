// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../core/Ownable.sol";
import "../accesscontrol/BuyerRole.sol";
import "../accesscontrol/DistributorRole.sol";
import "../accesscontrol/FarmerRole.sol";


contract SupplyChain is Ownable, BuyerRole, DistributorRole, FarmerRole{
    address owner;

    uint upc;

    uint sku;

    mapping (uint => Item) items; // upc --> Item

    mapping (uint => string[]) itemsHistory; //upc --> [hashHistory]

    enum State {
        seeded,     //0
        growing,    //1
        harvested,  //2
        collected,  //3
        packed,     //4
        advertised, //5
        buyed       //6
    }

    struct Item {
        uint sku;
        uint upc;
        address currentOwnerID;
        address originFarmerID;
        string  farmerName;
        string  farmName;
        string  farmLatitude;
        string  farmLongitude;
        string  itemNotes;
        uint    itemPrice;
        State   itemState;
        address distributorID;
        address buyerID;
    }

    /*Events*/
    event Seeded(uint upc);
    event Growing(uint upc);
    event Harvested(uint upc);
    event Collected(uint upc);
    event Packed(uint upc);
    event Advertised(uint upc);
    event Buyed(uint upc);

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

    constructor() payable {
        owner = msg.sender;
        sku = 1;
        upc = 1; 
    }

    function kill() public onlyOwner {
        selfdestruct(payable(owner));
    }

    function seedItem(uint _upc, string memory _farmerName, string memory _farmName, string memory _farmLatitude,string memory _farmLongitude) onlyFarmer public {
        sku = sku+1;
        items[_upc].sku = sku;
        items[_upc].upc = _upc;
        items[_upc].originFarmerID = msg.sender;
        items[_upc].currentOwnerID = msg.sender;
        items[_upc].farmerName = _farmerName;
        items[_upc].farmName = _farmName;
        items[_upc].farmLatitude = _farmLatitude;
        items[_upc].farmLongitude = _farmLongitude;
        items[_upc].itemState = State.seeded;
        emit Seeded(_upc);
    }

    function growingItem(uint _upc) public onlyFarmer verifyCaller(items[_upc].currentOwnerID) seeded(_upc){
        items[_upc].itemState = State.growing;
        emit Growing(_upc);
    }

    function harvestItem(uint _upc, uint _price) public onlyFarmer verifyCaller(items[_upc].currentOwnerID) growing(_upc){
        items[_upc].itemState = State.harvested;
        items[_upc].itemPrice = _price;
        emit Harvested(_upc);
    }

    function collectItem(uint _upc) public onlyDistributor harvested(_upc) paidEnought(items[_upc].itemPrice) checkValue(_upc) payable {
        payable(items[_upc].originFarmerID).transfer(items[_upc].itemPrice);
        items[_upc].itemState = State.collected;
        items[_upc].currentOwnerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        emit Collected(_upc);
    }

    function packItem(uint _upc) public onlyDistributor collected(_upc) {
        items[_upc].itemState = State.packed;
        items[_upc].itemPrice = items[_upc].itemPrice*2;
        emit Packed(_upc);        
    }

    function advertiseItem(uint _upc) public onlyDistributor packed(_upc) {
        items[_upc].itemState = State.advertised;
        emit Advertised(_upc);
    }

    function buyItem(uint _upc) public onlyBuyer advertised(_upc) paidEnought(items[_upc].itemPrice) checkValue(_upc) payable {
        payable(items[_upc].currentOwnerID).transfer(items[_upc].itemPrice);
        items[_upc].itemState = State.buyed;
        items[_upc].currentOwnerID = msg.sender;
        items[_upc].buyerID = msg.sender;
        emit Buyed(_upc);
    }

    function fetchItemBuffer(uint _upc) public view returns 
    (uint itemSKU, 
    uint itemUPC, 
    address ownerId, 
    address originFarmerID, 
    string memory farmerName,
    string memory farmName, 
    string memory farmLat,
    string memory farmLong
    ){
        Item memory item = items[_upc];
        return(
            item.sku,
            item.upc,
            item.currentOwnerID,
            item.originFarmerID,
            item.farmerName,
            item.farmName,
            item.farmLatitude,
            item.farmLongitude
        );
    }

    function fetchItemBufferTwo(uint _upc) public view returns 
    (string memory itemNotes, 
    uint itemPrice, 
    State state, 
    address distributorID, 
    address buyerID
    ){
        Item memory item = items[_upc];
        return(
            item.itemNotes,
            item.itemPrice,
            item.itemState,
            item.distributorID,
            item.buyerID            
        );
    }


}