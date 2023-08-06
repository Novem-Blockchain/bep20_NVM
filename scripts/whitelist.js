
const hre = require("hardhat");
const { deployments, getNamedAccounts } = hre;
const { ethers } = require('hardhat');
const { ether, BN } = require('@openzeppelin/test-helpers');
import { func } from '../deploy/001_deploy_nvm.ts';
const timers = require('timers-promises')
const one_nvm = new BN("1000000000000000000")



async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  let accounts = await ethers.getSigners()

  const deployer = accounts[0].address
  console.log("deployer address: ", deployer)
  let providerAddress;
  let nvm_proxy;

  const nvm_Factory = await hre.ethers.getContractFactory("NVMToken");
  console.log("network name", hre.network.name)
  if (hre.network.name == 'hardhat') {
    // const Nvm_proxyFactory = await ethers.getContractFactory("NVMToken");
    // nvm_proxy = await upgrades.deployProxy(Nvm_proxyFactory, ['300000000000000000000000000'], { initializer: "__initializeNVM" });
    nvm_proxy = await nvm_Factory.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
    providerAddress = 'http://localhost:8545'
  } else if (hre.network.name == 'testnet') {
    console.log("on testnet")
    nvm_proxy = await nvm_Factory.attach("0x9eB947Be4de53332022Edbc51528d33EB5D80f94")
    providerAddress = 'https://data-seed-prebsc-1-s1.binance.org:8545'

  } else if (hre.network.name == 'mainnet') {
    nvm_proxy = await nvm_Factory.attach("0xbe2D8AC2A370972C4328BED520b224C3903A4941")
    providerAddress = 'https://bsc-dataseed1.binance.org:443'

  }
  const provider = new ethers.providers.JsonRpcProvider(providerAddress);

  console.log("nvm_proxy address: ", nvm_proxy.address)





  /* console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xED3b232bCDe677037cABaaB174799Be35C58bc27"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xbd186632f17aC6881F952A6f03c617e00f2f7F74"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x1A0f4B3D35867103ce61E142B09e79A554D18fd0"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD3B4E49b428a6924E5a1B8B20fAA6F14029FB4C7"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD6e8Dbe452b0B76d9047169e80b44778602d6C3e"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x643363C9EcE37bF707da6B908403f578cBCF27b2"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xef7cD1379Ec7D0F673718343d19bDD59C165A7C6"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x55bd9de3c06fe868ffe5b8debd4d068fc29e4c68"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xea7b33d264f4b7e6fd283a8250a572f2ceefacd4"));
 */

  /*   await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xED3b232bCDe677037cABaaB174799Be35C58bc27");
    await timers.setTimeout(5000)
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xbd186632f17aC6881F952A6f03c617e00f2f7F74");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x1A0f4B3D35867103ce61E142B09e79A554D18fd0");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD3B4E49b428a6924E5a1B8B20fAA6F14029FB4C7");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD6e8Dbe452b0B76d9047169e80b44778602d6C3e");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x643363C9EcE37bF707da6B908403f578cBCF27b2");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xef7cD1379Ec7D0F673718343d19bDD59C165A7C6");
    await timers.setTimeout(5000);
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x55bd9de3c06fe868ffe5b8debd4d068fc29e4c68");
    await timers.setTimeout(5000);
    // bibox exchange
    await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xea7b33d264f4b7e6fd283a8250a572f2ceefacd4");

  //crypterium
  //await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xC8b6b950a83dCFdeE7275e53A1fBB9547818A866");
  //console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xC8b6b950a83dCFdeE7275e53A1fBB9547818A866"));

  // DEX exchange
  const txResult = await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD0ACB9C61cD72E0f57B19268D70c73b77DbDd553", { from: deployer});
  console.log("waiting for transaction to complete", txResult)
  await waitUntilTransactionMined(txResult.hash, provider)
  //await timers.setTimeout(5000);
  console.log("has whitelist role: ", await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD0ACB9C61cD72E0f57B19268D70c73b77DbDd553"));
  */

  // BitForex
  // const txResult = await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x3a723e58c4808dde4591543282adc7d6b378715b");
  // console.log("waiting for transaction to complete", txResult)
  // await waitUntilTransactionMined(txResult.hash, provider)
  // //await timers.setTimeout(5000);
  // console.log("has whitelist role: ", await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x3a723e58c4808dde4591543282adc7d6b378715b"));

  // Coinsbit
  const whitelistAddress = "0x2a9A4FDcd541Fa049cBb4cf2dAf8929735608dc1"
  const txResult = await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", whitelistAddress);
  console.log("waiting for transaction to complete", txResult)
  await waitUntilTransactionMined(txResult.hash, provider)
  //await timers.setTimeout(5000);
  console.log("has whitelist role: ", await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", whitelistAddress));


}

function checkTransactionStatus(transactionHash, provider) {
  return new Promise((resolve, reject) => {
    provider.getTransactionReceipt(transactionHash)
      .then((receipt) => {
        if (receipt && receipt.status === 1) {
          console.log('Transaction completed successfully!');
          console.log('Gas used:', receipt.gasUsed.toString());
          console.log('Transaction hash:', receipt.transactionHash);
          console.log('Block number:', receipt.blockNumber);
          console.log('Block timestamp:', receipt.timestamp);
          // You can access more properties of the receipt, if needed
          resolve(receipt.status); // Resolve the promise with the receipt status
        } else if (receipt && receipt.status === 0) {
          console.log('Transaction failed!');
          resolve(receipt.status); // Resolve the promise with the receipt status
        } else {
          console.log('Transaction is still pending.');
          resolve(null); // Resolve the promise with null for pending status
        }
      })
      .catch((error) => {
        console.error('Error fetching transaction receipt:', error);
        reject(error); // Reject the promise if there's an error
      });
  });
}



async function waitUntilTransactionMined(transactionHash, provider) {
  let transactionStatus = null;
  while (transactionStatus == null) {
    try {
      transactionStatus = await checkTransactionStatus(transactionHash, provider);
      console.log("Transaction status:", transactionStatus);
      await timers.setTimeout(5000);
      console.log("Waited 5 seconds.");
    } catch (error) {
      console.error('Error checking transaction status:', error);
      break; // Exit the loop if there's an error to avoid infinite loop
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
