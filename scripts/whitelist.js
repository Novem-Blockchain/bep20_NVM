
const hre = require("hardhat");
const { deployments, getNamedAccounts } = hre;
const { ethers } = require('hardhat');
const { ether, BN } = require('@openzeppelin/test-helpers');
import { func } from '../deploy/001_deploy_nvm.ts';
const timers = require('timers/promises')

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


  const deployerWallet = accounts[0]
  const deployer = accounts[0].address
  const novemWallet = "0xED3b232bCDe677037cABaaB174799Be35C58bc27"
  const mint_amount = new BN("300000000")

  const nvm_Factory = await hre.ethers.getContractFactory("NVMToken");
  console.log("network name", hre.network.name)
  if (hre.network.name == 'localhost') {
    const nvm_proxy = await ethers.getContract("NVMToken", deployer);
  } else if (hre.network.name == 'testnet') {
    console.log("on testnet")
    const nvm_proxy = await nvm_Factory.attach("0xDD1527A826C7FC7BC0F08eb27f28AD11110E7A8e")
  } else if (hre.network.name == 'mainnet') {
    const nvm_proxy = await nvm_Factory.attach("0xbe2D8AC2A370972C4328BED520b224C3903A4941")
  }
  console.log("nvm_proxy address: ", nvm_proxy.address)

  console.log("deployer address: ", deployer)

  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xED3b232bCDe677037cABaaB174799Be35C58bc27"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xbd186632f17aC6881F952A6f03c617e00f2f7F74"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x1A0f4B3D35867103ce61E142B09e79A554D18fd0"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD3B4E49b428a6924E5a1B8B20fAA6F14029FB4C7"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD6e8Dbe452b0B76d9047169e80b44778602d6C3e"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x643363C9EcE37bF707da6B908403f578cBCF27b2"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xef7cD1379Ec7D0F673718343d19bDD59C165A7C6"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x55bd9de3c06fe868ffe5b8debd4d068fc29e4c68"));


  await nvm_proxy.grantRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xED3b232bCDe677037cABaaB174799Be35C58bc27");
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

  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xED3b232bCDe677037cABaaB174799Be35C58bc27"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xbd186632f17aC6881F952A6f03c617e00f2f7F74"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x1A0f4B3D35867103ce61E142B09e79A554D18fd0"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD3B4E49b428a6924E5a1B8B20fAA6F14029FB4C7"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xD6e8Dbe452b0B76d9047169e80b44778602d6C3e"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x643363C9EcE37bF707da6B908403f578cBCF27b2"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0xef7cD1379Ec7D0F673718343d19bDD59C165A7C6"));
  console.log("has whitelist role: ",await nvm_proxy.hasRole("0xbcaa5c4620c62b2fedc77ef4fe401724814aeef811d907416a737179a85b1ab2", "0x55bd9de3c06fe868ffe5b8debd4d068fc29e4c68"));



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
