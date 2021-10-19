import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {NVMToken} from '../typechain';
import {setupUsers} from './utils';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('NVMToken');

  const contracts = {
    NVMToken: <NVMToken>await ethers.getContract('NVMToken'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

const toWei = ethers.utils.parseEther;

describe('NVMToken', function () {
  beforeEach(async () => {});

  it('name should be Novem Token', async function () {
    const {NVMToken} = await setup();
    expect(await NVMToken.name()).to.equal('Novem Token');
  });

  it('symbol should be NVM', async function () {
    const {NVMToken} = await setup();
    expect(await NVMToken.symbol()).to.equal('NVM');
  });

  it('has 18 decimals', async function () {
    const {NVMToken} = await setup();
    expect(await NVMToken.decimals()).to.be.equal(18);
  });

  it('has cap of 300 million tokens', async function () {
    const {NVMToken} = await setup();
    expect(await NVMToken.cap()).to.equal(toWei('300000000'));
  });

  it('should revert if we try to mint more then 300 million tokens', async function () {
    const {users, NVMToken} = await setup();
    await expect(NVMToken.mint(users[1].address, toWei('300000001'))).to.be.revertedWith('ERC20Capped: cap exceeded');
  });

  it('deployer should have minter role', async function () {
    const {NVMToken} = await setup();
    const minterRole = await NVMToken.getRoleMember(
      '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
      0
    );
    const deployerAddress = await NVMToken.signer.getAddress();
    await expect(deployerAddress).to.equal(minterRole);
  });

  it('should revert if not the deployer tries to mint', async function () {
    const {users} = await setup();
    await expect(users[0].NVMToken.mint(users[1].address, toWei('3'))).to.be.revertedWith(
      'ERC20PresetMinterPauser: must have minter role to mint'
    );
  });

  it('should mint and burn', async function () {
    const {users, NVMToken} = await setup();
    await NVMToken.mint(users[1].address, toWei('30'));
    const balanceAfterMint = await NVMToken.balanceOf(users[1].address);
    expect(balanceAfterMint).to.equal(toWei('30'));
    await users[1].NVMToken.burn(toWei('30'));
    const balanceAfterBurn = await NVMToken.balanceOf(users[1].address);
    expect(balanceAfterBurn).to.equal(toWei('0'));
  });
});
