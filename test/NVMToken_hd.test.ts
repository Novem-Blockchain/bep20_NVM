import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts, upgrades} from 'hardhat';
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {NVMToken} from '../typechain';
import {FEE, TOKEN_NAME, TOKEN_SYMBOL, ZERO_ADDRESS, FEE_EXCLUDED_ROLE, expectEqualStringValues} from './include_in_testfiles.js';



const toWei = ethers.utils.parseEther;

describe('NVMToken', function () {
  let addrs: SignerWithAddress[]
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let owner: SignerWithAddress;

  let contract_proxy: NVMToken;
  beforeEach(async () => {
    [owner, acc1, acc2, ...addrs] = await ethers.getSigners();
    const NVMToken = await ethers.getContractFactory("NVMToken");
    contract_proxy = <NVMToken>await upgrades.deployProxy(NVMToken, ["300000000000000000000000000"], {initializer: "__initializeNVM"});
    await contract_proxy.deployed();



  });

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  it('name should be Novem Pro Token', async function () {
    expect(await contract_proxy.name()).to.equal('Novem Pro Token');
  });

  it('symbol should be NVM', async function () {
    expect(await contract_proxy.symbol()).to.equal('NVM');
  });


  it('sets minting fee address', async function () {
    let newFeeAdddress = acc2.address;
    contract_proxy.setFeeWalletAddress(newFeeAdddress);
    await delay(1000);
    expectEqualStringValues(await contract_proxy.feeAddress(), newFeeAdddress)
  });

  it('sets minting fee divisor', async function () {
    let newFee = 1000;
    contract_proxy.setTransferFeeDivisor(1000);
    expectEqualStringValues(await contract_proxy.tokenTransferFeeDivisor(), newFee)
  });


  it('reverts when setting invalid fee address', async function () {
    await expect(contract_proxy.setFeeWalletAddress(ZERO_ADDRESS)).to.be.revertedWith('zero address is not allowed');
  });

  it('sets minting fee divisor to 0 and throws exception', async function () {
    await expect(contract_proxy.setTransferFeeDivisor(0)).to.be.revertedWith(
      'Token transfer fee divisor must be greater than 0'
    );
  });

  it('has 18 decimals', async function () {

    expect(await  contract_proxy.decimals()).to.be.equal(18);
  });

  it('has cap of 300 million tokens', async function () {

    expect(await contract_proxy.cap()).to.equal(toWei('300000000'));
  });

  it('should revert if we try to mint more then 300 million tokens', async function () {
    await expect(contract_proxy.mint(acc1.address, toWei('300000001'))).to.be.revertedWith('ERC20Capped: cap exceeded');
  });

  it('deployer should have minter role', async function () {
    const minterRole = await contract_proxy.getRoleMember(
      '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
      0
    );
    const deployerAddress = await contract_proxy.signer.getAddress();
    await expect(deployerAddress).to.equal(minterRole);
  });


  it('should revert if not the deployer tries to mint', async function () {
    contract_proxy = contract_proxy.connect(acc2);
    await expect(contract_proxy.mint(acc2.address, toWei('3'))).to.be.revertedWith(
      'ERC20PresetMinterPauser: must have minter role to mint'
    );
  });

  it('should mint and burn', async function () {
    await contract_proxy.mint(acc2.address, toWei('30'));
    const balanceAfterMint = await contract_proxy.balanceOf(acc2.address);
    expect(balanceAfterMint).to.equal(toWei('30'));
    contract_proxy = contract_proxy.connect(acc2);
    await contract_proxy.burn(toWei('30'));
    const balanceAfterBurn = await contract_proxy.balanceOf(acc2.address);
    expect(balanceAfterBurn).to.equal(toWei('0'));
  });
});