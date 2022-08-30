const hre = require("hardhat");
const { ethers } = require('hardhat');


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  let accounts = await ethers.getSigners()


  const deployerWallet = accounts[0]
  const deployer = accounts[0].address
  var proxy
  const NVM_Factory = await hre.ethers.getContractFactory("NVMToken");
  console.log("network name", hre.network.name)
  if (hre.network.name == 'localhost') {
    proxy = await NVM_Factory.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
  } else if (hre.network.name == 'testnet') {
    console.log("on testnet")
    proxy = await NVM_Factory.attach("0x4320983F330D3788287d1138f066b01d07a17514")
  } else if (hre.network.name == 'mainnet') {
    proxy = await NVM_Factory.attach("0xbC338EBAaEf242C5AEa767D9330CeA43AD4149E3")
  }

  var feeWalletAddr = "0xef7cd1379ec7d0f673718343d19bdd59c165a7c6"
  var feedivisor = 200
  console.log(await proxy.setFeeWalletAddress(feeWalletAddr))
  console.log(await proxy.setTransferFeeDivisor(feedivisor))
  console.log(await proxy.tokenTransferFeeDivisor())
  console.log(await proxy.feeAddress())


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });