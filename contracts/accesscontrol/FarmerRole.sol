// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./Roles.sol";

contract FarmerRole {
    using Roles for Roles.Role;

    /*
    Events
     */

    event FarmerAdded (address indexed account);
    event FarmerRemoved (address indexed account);

    /*
    Modifiers
    */

    Roles.Role private farmers;

    constructor() {
        _addFarmer(msg.sender); //mm...should be an admin role...this is kinda weird.
    }

    modifier onlyFarmer() {
        require(isFarmer(msg.sender), "Not Farmer");
        _;
    }

    function addFarmer(address addr) public onlyFarmer {
        _addFarmer(addr);
    }


    function _addFarmer(address addr) internal {
        farmers.add(addr);
        emit FarmerAdded(addr);
    }

    function isFarmer(address addr) public view returns(bool){
        return farmers.has(addr);
    }

    function removeFarmer() public {
        _removeFarmer(msg.sender);
    } 

    function _removeFarmer(address addr) public onlyFarmer {
        farmers.remove(addr);
        emit FarmerRemoved(addr);        
    }

}