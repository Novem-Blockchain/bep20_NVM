
const hre = require("hardhat");
const { deployments, getNamedAccounts } = hre;
const { ethers } = require('hardhat');
const { ether, BN } = require('@openzeppelin/test-helpers');
import { func } from '../deploy/001_deploy_nvm.ts';

const one_nvm = new BN("1000000000000000000")
const toWei = ethers.utils.parseEther;


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


  const nvm_Factory = await hre.ethers.getContractFactory("NVMToken");
  console.log("network name", hre.network.name)
  if (hre.network.name == 'localhost') {
    const nvm_proxy = await ethers.getContract("NVMToken", deployer);
  } else if (hre.network.name == 'testnet') {
    const novemWallet = "0x2a9A4FDcd541Fa049cBb4cf2dAf8929735608dc1"
    console.log("on testnet")
    const nvm_proxy = await nvm_Factory.attach("0xDD1527A826C7FC7BC0F08eb27f28AD11110E7A8e")
  } else if (hre.network.name == 'mainnet') {
    const novemWallet = "0xED3b232bCDe677037cABaaB174799Be35C58bc27"
    const nvm_proxy = await nvm_Factory.attach("0xbe2D8AC2A370972C4328BED520b224C3903A4941")
  }
  console.log("nvm_proxy address: ", nvm_proxy.address)

  console.log("deployer address: ", deployer)

  const supply = await nvm_proxy.totalSupply();
  console.log(" token supply: ", supply.toString())

  const ownerBalance = await nvm_proxy.balanceOf(deployer);

  console.log(deployer, " contract deployer token balance: ", ownerBalance.toString())
  console.log("Wallet balance before burn: ", (await nvm_proxy.balanceOf(novemWallet)).toString())

  const burn_amount = 2267461
  console.log("burning amount:",toWei((burn_amount).toString()))
  await nvm_proxy.burn(toWei((burn_amount).toString()))
  console.log("burned:", burn_amount.toString());

  const new_supply = await nvm_proxy.totalSupply();
  console.log("new token supply: ", new_supply.toString())
  console.log("Wallet balance after burn: ", (await nvm_proxy.balanceOf(novemWallet)).toString())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
