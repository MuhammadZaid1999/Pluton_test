/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts:[`${process.env.PRIVATE_KEY}`]
    },
  },
  etherscan:{
    apiKey: process.env.EHTERSCAN_API_KRY
  },
};
