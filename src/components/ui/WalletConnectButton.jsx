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
        // 1. 直接使用wallet_revokePermissions方法撤销eth_accounts权限
        // 这是MetaMask文档中推荐的方法
        try {
          console.log('尝试使用wallet_revokePermissions方法撤销eth_accounts权限...');
          await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [{ eth_accounts: {} }]
          });
          console.log('成功撤销eth_accounts权限');
        } catch (error) {
          console.error('撤销eth_accounts权限失败:', error);
        }
        
        // 2. 尝试使用wallet_requestPermissions方法，这可能会重置权限状态
        try {
          console.log('尝试使用wallet_requestPermissions方法重置权限状态...');
          await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }]
          });
          console.log('成功重置权限状态');
        } catch (error) {
          console.error('重置权限状态失败:', error);
        }
        
        // 3. 尝试清除所有与钱包相关的事件监听器
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
        
        // 4. 直接触发accountsChanged事件，传入空数组，通知所有监听器账户已断开
        try {
          console.log('尝试触发accountsChanged事件...');
          if (window.ethereum.on) {
            // 模拟断开连接，触发accountsChanged事件
            const event = new Event('accountsChanged');
            event.accounts = [];
            window.dispatchEvent(event);
          }
          console.log('成功触发accountsChanged事件');
        } catch (error) {
          console.error('触发accountsChanged事件失败:', error);
        }
        
        // 5. 立即刷新页面，强制清除所有连接状态
        try {
          console.log('刷新页面以清除所有连接状态...');
          window.location.reload();
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