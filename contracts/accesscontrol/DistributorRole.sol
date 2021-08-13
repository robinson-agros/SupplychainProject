// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./Roles.sol";

contract DistributorRole {
    using Roles for Roles.Role;

    /*
    Events
     */

    event DistributorAdded (address indexed account);
    event DistributorRemoved (address indexed account);

    /*
    Modifiers
    */

    Roles.Role private distributors;

    constructor() {
        _addDistributor(msg.sender); //mm...should be an admin role...this is kinda weird.
    }

    modifier onlyDistributor() {
        require(isDistributor(msg.sender));
        _;
    }

    function addDistributor(address addr) public onlyDistributor {
        _addDistributor(addr);
    }


    function _addDistributor(address addr) internal {
        distributors.add(addr);
        emit DistributorAdded(addr);
    }

    function isDistributor(address addr) public view returns(bool){
        return distributors.has(addr);
    }

    function removeDistributor() public {
        _removeDistributor(msg.sender);
    } 

    function _removeDistributor(address addr) public onlyDistributor {
        distributors.remove(addr);
        emit DistributorRemoved(addr);        
    }

}