import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  //let wei = ethers.utils.parseEther('300000000')
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('NVMToken', {
    contract: 'NVMTokenV2',
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
/*       execute: {
        init: {
          methodName: '__initializeNVM',
          args: ['300000000000000000000000000'],
        },
      }, */
    },
    log: true,
  });
};
export default func;
func.tags = ['NVMToken'];
