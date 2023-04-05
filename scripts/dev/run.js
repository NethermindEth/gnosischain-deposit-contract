const SBCDepositContractProxy = artifacts.require("SBCDepositContractProxy");
const SBCDepositContract = artifacts.require("SBCDepositContract");
const SBCInit = artifacts.require("SBCInit");
const SBCToken = artifacts.require("SBCToken");
const SBCTokenProxy = artifacts.require("SBCTokenProxy");
const SBCWrapper = artifacts.require("SBCWrapper");
const SBCWrapperProxy = artifacts.require("SBCWrapperProxy");

async function main() {
  const [admin] = await web3.eth.getAccounts();
  const depositAddress = "0xbabe2bed00000000000000000000000000000003";
  const initAddress = "0xface2face0000000000000000000000000000000";
  const stakeTokenAddress = "0xbabe2bed00000000000000000000000000000002";
  const tokenAddress = "0xbabe2bed00000000000000000000000000000001";
  const wrapperAddress = "0xbabe2bed00000000000000000000000000000004";
  const initialStake = 32 * 10_000;

  const token = await SBCToken.at(tokenAddress);
  const balance = await token.balanceOf("0x7b380660b3e857971ffc04a7ada5ce563acf9f31");

  console.log("Balance is", web3.utils.fromWei(balance.toString()));
}

module.exports = async function (callback) {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }

  callback();
};
