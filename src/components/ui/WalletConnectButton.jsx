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
      
      if (window.ethereum) {
        // 1. 尝试使用eth_requestAccounts方法，传入空数组，这可能会重置连接状态
        try {
          console.log('尝试使用eth_requestAccounts方法重置连接状态...');
          await window.ethereum.request({
            method: 'eth_requestAccounts',
            params: []
          });
          console.log('成功重置连接状态');
        } catch (error) {
          console.error('重置连接状态失败:', error);
        }
        
        // 2. 尝试使用wallet_disconnect方法（如果可用）
        try {
          console.log('尝试使用wallet_disconnect方法断开连接...');
          await window.ethereum.request({
            method: 'wallet_disconnect'
          });
          console.log('成功使用wallet_disconnect方法断开连接');
        } catch (error) {
          console.error('wallet_disconnect方法失败:', error);
        }
        
        // 3. 尝试使用window.ethereum.disconnect方法（如果可用）
        try {
          console.log('尝试使用window.ethereum.disconnect方法断开连接...');
          if (typeof window.ethereum.disconnect === 'function') {
            window.ethereum.disconnect();
            console.log('成功使用window.ethereum.disconnect方法断开连接');
          } else {
            console.log('window.ethereum.disconnect方法不可用');
          }
        } catch (error) {
          console.error('window.ethereum.disconnect方法失败:', error);
        }
        
        // 4. 尝试清除所有与钱包相关的事件监听器
        try {
          console.log('尝试清除钱包事件监听器...');
          window.ethereum.removeAllListeners('accountsChanged');
          window.ethereum.removeAllListeners('chainChanged');
          window.ethereum.removeAllListeners('disconnect');
          window.ethereum.removeAllListeners('connect');
          console.log('成功清除钱包事件监听器');
        } catch (error) {
          console.error('清除钱包事件监听器失败:', error);
        }
        
        // 5. 尝试清除所有与钱包相关的本地存储
        try {
          console.log('尝试清除钱包本地存储...');
          localStorage.removeItem('wallet_connect');
          localStorage.removeItem('ethereum');
          localStorage.removeItem('metamask');
          console.log('成功清除钱包本地存储');
        } catch (error) {
          console.error('清除钱包本地存储失败:', error);
        }
        
        // 6. 强制刷新页面，确保所有连接状态都被清除
        try {
          console.log('强制刷新页面以清除所有连接状态...');
          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 500);
        } catch (error) {
          console.error('刷新页面失败:', error);
        }
      }
      
      console.log('钱包已断开连接');
      
      // 调用回调函数通知父组件
      if (onDisconnect) {
        onDisconnect();
      }
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