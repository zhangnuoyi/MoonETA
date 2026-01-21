import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/pages/Rewards.css';
import WalletConnectButton from '../components/ui/WalletConnectButton';

/**
 * 奖励页面组件
 * 显示奖励概览和关于奖励的信息
 */
const Rewards = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  // 监听钱包连接状态变化
  useEffect(() => {
    if (window.ethereum) {
      // 监听账号变化
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
        } else {
          setWalletConnected(false);
          setWalletAddress(null);
        }
      });

      // 监听链变化
      window.ethereum.on('chainChanged', () => {
        // 链变化时，重置连接状态
        setWalletConnected(false);
        setWalletAddress(null);
      });
    }
  }, []);

  // 模拟数据
  const availableRewards = '0.0000';
  const claimedRewards = '0.0000';
  const rewardsToken = 'LRWD';

  // 领取奖励操作
  const handleClaimRewards = () => {
    console.log('Claim rewards clicked');
    // 这里可以添加实际的领取奖励逻辑
  };

  // 处理钱包连接成功的回调
  const handleWalletConnect = (address) => {
    setWalletConnected(true);
    setWalletAddress(address);
  };

  // 处理钱包断开连接的回调
  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress(null);
  };

  return (
    <div className="rewards-container">
      {/* 网站标语和介绍 */}
      <div className="website-intro">
        <h1 className="intro-title">LEAPETF</h1>
        <p className="intro-subtitle">去中心化区块链ETF交易平台</p>
      </div>

      {/* 钱包连接提示 */}
      {!walletConnected && (
        <div className="wallet-prompt">
          <div className="wallet-prompt-content">
            <h2 className="prompt-title">Welcome to LeapETF</h2>
            <p className="prompt-message">A decentralized platform for trading blockchain-based ETFs</p>
            <p className="prompt-submessage">Connect your wallet to view and claim rewards</p>
            <WalletConnectButton 
              onConnect={handleWalletConnect} 
              onDisconnect={handleWalletDisconnect} 
              walletConnected={walletConnected} 
              walletAddress={walletAddress} 
            />
          </div>
        </div>
      )}

      {/* 奖励内容 - 仅在钱包连接后显示 */}
      {walletConnected && (
        <div className="rewards-content">
        {/* 关于奖励部分 */}
        <div className="about-section">
          <div className="about-card">
            <h2 className="about-title">
              <span className="about-icon">💎</span>
              关于奖励
            </h2>
            
            <div className="about-content">
              <p className="about-text">
                通过质押你的ETA代币，你可以获得LRWD奖励代币。奖励根据你的质押比例和总质押量计算。
              </p>
              <p className="about-text">
                奖励会随时累积，您可以随时领取。领取后奖励将直接发送到您的钱包。
              </p>
              <p className="about-text">
                LRWD代币可用于平台治理、费用折扣和其他生态系统功能。
              </p>
            </div>
          </div>
        </div>

        {/* 奖励概览部分 */}
        <div className="overview-section">
          <div className="overview-card">
            <h2 className="overview-title">
              <span className="overview-icon">🏆</span>
              奖励概览
            </h2>
            
            <div className="overview-item">
              <div className="overview-label">可领取奖励</div>
              <div className="overview-value">{availableRewards} {rewardsToken}</div>
            </div>
            
            <div className="overview-item">
              <div className="overview-label">已领取奖励</div>
              <div className="overview-value">{claimedRewards} {rewardsToken}</div>
            </div>
            
            <button className="claim-btn" onClick={handleClaimRewards}>
              <span className="claim-icon">🎁</span>
              领取奖励
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;