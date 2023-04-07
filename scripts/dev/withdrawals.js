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

  const deposit = await SBCDepositContract.at(depositAddress);
  const failedPtr = (await deposit.failedWithdrawalsPointer()).toNumber();
  const failedCount = (await deposit.numberOfFailedWithdrawals()).toNumber();

  for (let i = failedPtr; i < failedCount; i++) {
    const failedWithdrawals = await deposit.failedWithdrawals(i);

    console.log(failedWithdrawals);
  }
}

module.exports = async function (callback) {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }

  callback();
};
