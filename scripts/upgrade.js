const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; //NVMToken_Proxy

async function main() {
   const V2Contract = await ethers.getContractFactory("NVMTokenV2");
   console.log("Upgrading V1Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, V2Contract);
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
