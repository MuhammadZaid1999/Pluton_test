require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const ERC20_ADDRESS = "0xD99760Fc624EBA9d165f4367404d1d06A0B5a9b1";
const token_contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const token_abi = token_contract.abi;

const NFT_ADDRESS = "0x9F3DD2B9501cf69b5Cb3b0ADEA4d71dD7a17eAE5";
const nft_contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const nft_abi = nft_contract.abi;

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#provider-object
let provider = ethers.provider;

const privateKey = `${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

// https://docs.ethers.io/v5/api/contract/contract
const token = new ethers.Contract(
    ERC20_ADDRESS,
    token_abi,
    signer
  );

// https://docs.ethers.io/v5/api/contract/contract
const nft = new ethers.Contract(
  NFT_ADDRESS,
  nft_abi,
  signer
);

const main = async () => {
  console.log("Waiting 3 blocks for confirmation...");

   for(i=1; i<=3; i++){
        await token
            .approve(NFT_ADDRESS,5000000000)
            .then((tx) => tx.wait(3))
            .then((receipt) => console.log(`Your ERC20 transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
            .catch((e) => console.log("something went wrong on Token transaction", e));

        await nft
        .mint()
        .then((tx) => tx.wait(3))
        .then((receipt) => console.log(`Your NFT transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
        .catch((e) => console.log("something went wrong on NFT transaction", e));
   }

  await nft
   .setbaseURI("ipfs://QmbYkqXCRU7dC4chmJXwcnHSXaE2b2WasFPQzeVB1HRyqy/",true)
   .then((tx) => tx.wait(3))
   .then((receipt) => console.log(`Reveal Token transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
   .catch((e) => console.log("something went wrong on NFT transaction", e));
};

main();