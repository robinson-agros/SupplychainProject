// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/**
*@title Roles
@dev Library for managing addresses assigned to a Role
 */


library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    modifier notZero(address account) {
        require(account != address(0));
        _;
    }
 

    function add (Role storage role, address account) notZero(account) internal {     
        //require (account != address(0)); // To avoid void address assignment}
        require(!has(role, account)); //Avoid add an already existing account
        role.bearer[account] = true;
        }

    function has (Role storage role, address account) internal view notZero(account) returns (bool) {    
        //require(account != address (0));
        return role.bearer[account];
    }

    function remove(Role storage role, address account) internal notZero(account) {
        require(has(role, account));
        role.bearer[account] = false;
    }
}