import React from 'react';
import { ethers } from 'ethers';
import '../../styles/components/WalletConnectButton.css';

/**
 * 连接钱包按钮组件
 * 处理MetaMask钱包连接功能
 */
const WalletConnectButton = ({ onConnect, onDisconnect, walletConnected, walletAddress }) => {
  /**
   * 连接钱包函数
   * 直接使用window.ethereum对象与MetaMask交互
   */
  const connectWallet = async () => {
    try {
      console.log('开始连接钱包...');
      
      if (!window.ethereum) {
        console.log('未检测到MetaMask');
        alert('请安装MetaMask钱包');
        return;
      }

      console.log('检测到MetaMask，准备触发连接请求...');
      console.log('window.ethereum对象:', window.ethereum);
      console.log('window.ethereum是否有request方法:', typeof window.ethereum.request === 'function');
      
      // 强制触发MetaMask连接请求，确保弹出确认窗口
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      console.log('连接请求成功，返回的账户:', accounts);
      
      const address = accounts[0];
      
      console.log('钱包连接成功:', address);
      
      // 调用回调函数通知父组件
      if (onConnect) {
        onConnect(address);
      }
    } catch (error) {
      console.error('连接钱包失败:', error);
      alert('连接钱包失败，请重试');
    }
  };

  /**
   * 断开钱包连接
   */
  const disconnectWallet = async () => {
    try {
      console.log('开始断开钱包连接...');
      
      // 1. 首先调用回调函数通知父组件钱包已断开连接
      if (onDisconnect) {
        onDisconnect();
      }
      
      // 2. 尝试使用window.location.href方法刷新页面，这会完全重新加载页面
      // 这是最可靠的方法，因为它会强制清除所有与钱包相关的状态
      try {
        console.log('强制刷新页面以清除所有连接状态...');
        window.location.href = window.location.origin + '/portfolio';
      } catch (error) {
        console.error('刷新页面失败:', error);
      }
      
      console.log('钱包已断开连接');
    } catch (error) {
      console.error('断开钱包连接失败:', error);
      // 即使出错，也要调用回调函数通知父组件
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  /**
   * 格式化钱包地址，只显示前6位和后4位
   */
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {!walletConnected ? (
        <div className="wallet-connect-options">
          <button 
            className="wallet-connect-btn meta-mask-btn"
            onClick={connectWallet}
          >
            Connect with MetaMask
          </button>
          <button 
            className="wallet-connect-btn brave-wallet-btn"
            onClick={connectWallet}
          >
            Connect with Brave Wallet
          </button>
        </div>
      ) : (
        <div className="wallet-connected-info">
          <span className="wallet-address">{formatWalletAddress(walletAddress)}</span>
          <button 
            className="disconnect-btn"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default WalletConnectButton;