// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./Roles.sol";

contract BuyerRole {
    using Roles for Roles.Role;

    /*
    Events
     */

    event BuyerAdded (address indexed account);
    event BuyerRemoved (address indexed account);

    /*
    Modifiers
    */

    Roles.Role private buyers;

    constructor() {
        _addBuyer(msg.sender); //mm...should be an admin role...this is kinda weird.
    }

    modifier onlyBuyer() {
        require(isBuyer(msg.sender));
        _;
    }

    function addBuyer(address addr) public onlyBuyer {
        _addBuyer(addr);
    }


    function _addBuyer(address addr) internal {
        buyers.add(addr);
        emit BuyerAdded(addr);
    }

    function isBuyer(address addr) public view returns(bool){
        return buyers.has(addr);
    }

    function removeBuyer() public {
        _removeBuyer(msg.sender);
    } 

    function _removeBuyer(address addr) public onlyBuyer {
        buyers.remove(addr);
        emit BuyerRemoved(addr);        
    }

}