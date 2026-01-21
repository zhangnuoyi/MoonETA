import React from 'react';
import { ethers } from 'ethers';
import '../../styles/components/WalletConnectButton.css';

/**
 * 连接钱包按钮组件
 * 处理MetaMask钱包连接功能
 */
const WalletConnectButton = () => {
  const [walletAddress, setWalletAddress] = React.useState(null);

  /**
   * 连接钱包函数
   * 使用ethers.js与MetaMask交互
   */
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('请安装MetaMask钱包');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setWalletAddress(address);
      console.log('钱包连接成功:', address);
    } catch (error) {
      console.error('连接钱包失败:', error);
      alert('连接钱包失败，请重试');
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
    <button 
      className="wallet-connect-btn"
      onClick={connectWallet}
    >
      {walletAddress ? formatWalletAddress(walletAddress) : '连接钱包'}
    </button>
  );
};

export default WalletConnectButton;