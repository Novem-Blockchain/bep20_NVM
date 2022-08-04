import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts, upgrades} from 'hardhat';
import {NVMTokenV2} from '../typechain';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
import {setupUsers} from './utils';
import {FEE, TOKEN_NAME, TOKEN_SYMBOL, ZERO_ADDRESS, FEE_EXCLUDED_ROLE} from './include_in_testfiles.js';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('NVMTokenV2');

  const contracts = {
    NVMTokenV2: <NVMTokenV2>await ethers.getContract('NVMTokenV2'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

const toWei = ethers.utils.parseEther;

describe('NVMTokenV2', function () {

  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let contract_proxy: NVMTokenV2;

  beforeEach(async () => {
    const NVMTokenV2 = await ethers.getContractFactory("NVMTokenV2");
    [user1, user2] = await ethers.getSigners();
    contract_proxy = <NVMTokenV2>await upgrades.deployProxy(NVMTokenV2);

    contract_proxy.setFeeWalletAddress(user1.address);
    contract_proxy.setTransferFeeDivisor(FEE);
  });

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  it('sets minting fee address', async function () {
    const {users, NVMTokenV2} = await setup();
    let newFeeAdddress = users[7].address;
    NVMTokenV2.setFeeWalletAddress(newFeeAdddress);
    await delay(1000);
    expectEqualStringValues(await NVMTokenV2.feeAddress(), newFeeAdddress)
  });

  it('sets minting fee divisor', async function () {
    const {users, NVMTokenV2} = await setup();
    let newFee = 1000;
    NVMTokenV2.setTransferFeeDivisor(1000);
    expectEqualStringValues(await NVMTokenV2.tokenTransferFeeDivisor(), newFee)
  });


  it('sets minting fee divisor to 0 and throws exception', async function () {
    const {users, NVMTokenV2} = await setup();
    await expect(NVMTokenV2.setTransferFeeDivisor(0)).to.be.revertedWith(
      'Token transfer fee divisor must be greater than 0'
    );
  });

  it('reverts when setting invalid fee address', async function () {
    const {users, NVMTokenV2} = await setup();
    await expect(NVMTokenV2.setFeeWalletAddress(ZERO_ADDRESS)).to.be.revertedWith('zero address is not allowed');
  });

  function expectEqualStringValues(value1, value2) {
    expect(value1.toString()).to.equal(value2.toString())
}

  it('name should be Novem Token', async function () {
    const {NVMTokenV2} = await setup();
    expect(await NVMTokenV2.name()).to.equal('Novem Token');
  });

  it('symbol should be NVM', async function () {
    const {NVMTokenV2} = await setup();
    expect(await NVMTokenV2.symbol()).to.equal('NVM');
  });

  it('has 18 decimals', async function () {
    const {NVMTokenV2} = await setup();
    expect(await NVMTokenV2.decimals()).to.be.equal(18);
  });

  it('has cap of 300 million tokens', async function () {
    const {NVMTokenV2} = await setup();
    expect(await NVMTokenV2.cap()).to.equal(toWei('300000000'));
  });

  it('should revert if we try to mint more then 300 million tokens', async function () {
    const {users, NVMTokenV2} = await setup();
    await expect(NVMTokenV2.mint(users[1].address, toWei('300000001'))).to.be.revertedWith('ERC20Capped: cap exceeded');
  });

  it('deployer should have minter role', async function () {
    const {NVMTokenV2} = await setup();
    const minterRole = await NVMTokenV2.getRoleMember(
      '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
      0
    );
    const deployerAddress = await NVMTokenV2.signer.getAddress();
    await expect(deployerAddress).to.equal(minterRole);
  });

  it('should revert if not the deployer tries to mint', async function () {
    const {users} = await setup();
    await expect(users[0].NVMTokenV2.mint(users[1].address, toWei('3'))).to.be.revertedWith(
      'ERC20PresetMinterPauser: must have minter role to mint'
    );
  });

  it('should mint and burn', async function () {
    const {users, NVMTokenV2} = await setup();
    await NVMTokenV2.mint(users[1].address, toWei('30'));
    const balanceAfterMint = await NVMTokenV2.balanceOf(users[1].address);
    expect(balanceAfterMint).to.equal(toWei('30'));
    await users[1].NVMTokenV2.burn(toWei('30'));
    const balanceAfterBurn = await NVMTokenV2.balanceOf(users[1].address);
    expect(balanceAfterBurn).to.equal(toWei('0'));
  });
});
