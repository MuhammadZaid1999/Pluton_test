// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyNFT is ERC721, Ownable{
    using Strings for uint256;
    uint8 private counter;
    uint8 private maxSupply;
    string private baseUri;
    bool private reveal;
    uint256 mintPrice = 0.5 * 10**10;
    IERC20 public token;
    
    constructor(address _token) ERC721("Muhammad Zaid", "MZ"){
        counter = 0;
        maxSupply = 3;
        token = IERC20(_token);
        baseUri = "ipfs://QmbYkqXCRU7dC4chmJXwcnHSXaE2b2WasFPQzeVB1HRyqy/unknown.json";
        reveal = false;
    }

    function mint() external {
        require(counter < maxSupply, "Maxmimum Supply Exceeded");
        require(token.balanceOf(msg.sender) >= mintPrice, "insufficient ERC20 Tokens");
        counter += 1;
        token.transferFrom(msg.sender, owner(), mintPrice);
        _safeMint(msg.sender,counter); 
    }

    function setbaseURI(string memory _baseUri, bool _reveal) external onlyOwner{
        baseUri = _baseUri;
        reveal = _reveal;
    } 

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function totalSupply() public view returns(uint256) {
        return maxSupply;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        string memory baseURI = _baseURI();
        if(reveal){
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : "";
        }
        else{
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
        }
    }

}