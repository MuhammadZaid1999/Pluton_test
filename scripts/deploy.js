
async function main() {

  // ERC20 Token Deployment
  const MyToken = await ethers.getContractFactory("MyToken");
  // Start deployment, returning a promise that resolves to a contract object
  const mytoken = await MyToken.deploy();
  console.log("ERC20 Contract deployed to address:", mytoken.address);

  // NFT Token Deployment
  const MyNFT = await ethers.getContractFactory("MyNFT");
  // Start deployment, returning a promise that resolves to a contract object
  const mynft = await MyNFT.deploy(mytoken.address);
  console.log("NFT Contract deployed to address:", mynft.address);

}

  main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
