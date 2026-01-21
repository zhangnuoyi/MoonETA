import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../../styles/components/Header.css';

/**
 * 顶部信息栏组件
 * 包含网站标题和钱包连接信息
 */
const Header = () => {
  const [walletAddress, setWalletAddress] = useState('0x7aC2...A249'); // 模拟钱包地址
  const [connected, setConnected] = useState(true); // 模拟已连接状态

  /**
   * 断开钱包连接
   */
  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress(null);
    console.log('钱包已断开连接');
  };

  /**
   * 格式化钱包地址，只显示前6位和后4位
   */
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-right">
          {connected && (
            <div className="wallet-info">
              <span className="wallet-address">{formatWalletAddress(walletAddress)}</span>
              <button className="disconnect-btn" onClick={disconnectWallet}>
                断开钱包连接1
              </button>
              <span className="settings-icon">⚙️</span>
            </div>
          )}
          {!connected && (
            <button className="connect-btn">Connect Wallet</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;