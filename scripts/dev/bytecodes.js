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

  let params = web3.eth.abi.encodeParameters(["address", "string", "string"], [initAddress, "SBC Token", "SBCT"]);
  printBytecode("#1 Token proxy", SBCTokenProxy.bytecode, params);

  params = web3.eth.abi.encodeParameters(["address", "string", "string"], [initAddress, "Stake GNO", "GNO"]);
  printBytecode("#2 Stake token proxy", SBCTokenProxy.bytecode, params);

  params = web3.eth.abi.encodeParameters(["address", "address"], [initAddress, tokenAddress]);
  printBytecode("#3 Deposit proxy", SBCDepositContractProxy.bytecode, params);

  params = web3.eth.abi.encodeParameters(
    ["address", "address", "address"],
    [initAddress, tokenAddress, depositAddress]
  );
  printBytecode("#4 Wrapper proxy", SBCWrapperProxy.bytecode, params);

  params = web3.eth.abi.encodeParameters(
    ["address", "uint256", "address", "address", "address", "address"],
    [admin, web3.utils.toWei(initialStake.toString()), stakeTokenAddress, tokenAddress, depositAddress, wrapperAddress]
  );
  printBytecode("#5 Initializer", SBCInit.bytecode, params);
}

function printBytecode(name, bytecode, params) {
  console.log(name, "\n", bytecode + params.substring(2), "\n---\n");
}

module.exports = async function (callback) {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }

  callback();
};
