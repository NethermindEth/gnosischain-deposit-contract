// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.9;

import "../SBCDepositContractProxy.sol";
import "../SBCToken.sol";
import "../SBCTokenProxy.sol";
import "../SBCWrapper.sol";
import "../SBCWrapperProxy.sol";

contract SBCInit {
    constructor(
        address admin,
        uint256 initialStake,
        address stakeTokenProxyAddr,
        address tokenProxyAddr,
        address depositProxyAddr,
        address wrapperProxyAddr
    ) {
        SBCToken stakeToken = SBCToken(stakeTokenProxyAddr);
        SBCToken token = SBCToken(tokenProxyAddr);
        SBCDepositContractProxy depositContractProxy = SBCDepositContractProxy(payable(depositProxyAddr));
        SBCWrapper wrapper = SBCWrapper(wrapperProxyAddr);

        // Enable wrapper
        token.setMinter(wrapperProxyAddr);
        wrapper.enableToken(stakeTokenProxyAddr, initialStake);

        // Mint initial stake
        stakeToken.setMinter(address(this));
        stakeToken.mint(address(this), initialStake);
        stakeToken.approve(wrapperProxyAddr, initialStake);
        wrapper.swap(stakeTokenProxyAddr, initialStake, "0x");
        token.transfer(depositProxyAddr, initialStake);

        depositContractProxy.setAdmin(admin);
        SBCTokenProxy(payable(tokenProxyAddr)).setAdmin(admin);
        SBCWrapperProxy(payable(wrapperProxyAddr)).setAdmin(admin);
        SBCTokenProxy(payable(stakeTokenProxyAddr)).setAdmin(admin);
    }
}
