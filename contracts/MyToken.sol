// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    
    constructor() ERC20("Muhammad Zaid","MZ"){
        _mint(msg.sender, 100 * 10**decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 10;
    }
    
}

