import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/pages/Faucet.css';
import WalletConnectButton from '../components/ui/WalletConnectButton';

/**
 * 测试代币水龙头页面组件
 * 用于领取测试网络上的代币
 */
const Faucet = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [activeTab, setActiveTab] = useState('one-click');

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
  const tokens = [
    { name: 'LETC', symbol: 'LETC', amount: '5.0', icon: '🟠' },
    { name: 'LETH', symbol: 'LETH', amount: '5.0', icon: '🟣' },
    { name: 'LINK', symbol: 'LINK', amount: '50.0', icon: '🔵' },
    { name: 'USDC', symbol: 'USDC', amount: '50.0', icon: '🟢' }
  ];

  // 切换标签页
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 一键领取所有代币
  const handleClaimAll = () => {
    console.log('Claim all tokens clicked');
    // 这里可以添加实际的领取逻辑
  };

  // 领取单个代币
  const handleClaimToken = (token) => {
    console.log(`Claim ${token.symbol} clicked`);
    // 这里可以添加实际的领取逻辑
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
    <div className="faucet-container">
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
            <p className="prompt-submessage">Connect your wallet to claim test tokens</p>
            <WalletConnectButton 
              onConnect={handleWalletConnect} 
              onDisconnect={handleWalletDisconnect} 
              walletConnected={walletConnected} 
              walletAddress={walletAddress} 
            />
          </div>
        </div>
      )}

      {/* 水龙头内容 - 仅在钱包连接后显示 */}
      {walletConnected && (
        <div className="faucet-content">
        {/* 左侧内容 */}
        <div className="left-section">
          <div className="info-card">
            <h2 className="info-title">
              <span className="info-icon">💧</span>
              测试代币水龙头
            </h2>
            
            <div className="info-content">
              <p className="info-text">
                欢迎使用 MOONETA 测试代币水龙头！这个工具可以帮助您获取测试网络上的代币，用于测试和调试 MOONETA 平台的各项功能。
              </p>
              <p className="info-text">
                您可以领取 LETC、LETH、LINK 和 USDC 测试代币。每种代币都有冷却时间限制，请主要领取时间。
              </p>
              <p className="info-text">
                这些代币仅用于测试目的，没有实际价值。在主网上，您需要使用真实资产。
              </p>
            </div>

            <div className="instructions-section">
              <h3 className="instructions-title">
                <span className="instructions-icon">📝</span>
                使用说明
              </h3>
              <ul className="instructions-list">
                <li className="instruction-item">单个领取：选择一种代币并点击"领取"按钮，获取该代币。</li>
                <li className="instruction-item">一键领取：使用"一键领取所有代币"按钮，同时获取所有可用代币。</li>
                <li className="instruction-item">冷却时间：每种代币领取后有冷却期，倒计时结束后才能再次领取。</li>
                <li className="instruction-item">余额更新：每个代币卡片只显示当前的余额，每30秒自动刷新。</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="right-section">
          <div className="faucet-card">
            {/* 标签页导航 */}
            <div className="tab-nav">
              <button 
                className={`tab-btn ${activeTab === 'one-click' ? 'active' : ''}`}
                onClick={() => handleTabChange('one-click')}
              >
                一键领取
              </button>
              <button 
                className={`tab-btn ${activeTab === 'token-list' ? 'active' : ''}`}
                onClick={() => handleTabChange('token-list')}
              >
                代币列表
              </button>
            </div>

            {/* 一键领取标签页内容 */}
            {activeTab === 'one-click' && (
              <div className="tab-content">
                <div className="one-click-section">
                  <div className="center-icon">
                    <span className="main-icon">💧</span>
                  </div>
                  <h3 className="one-click-title">一键领取所有代币</h3>
                  <p className="one-click-description">同时获取 LETC、LETH、LINK 和 USDC 测试代币</p>
                  
                  <div className="token-grid">
                    {tokens.map((token, index) => (
                      <div key={token.symbol} className="token-item">
                        <div className="token-icon">{token.icon}</div>
                        <div className="token-symbol">{token.symbol}</div>
                        <div className="token-amount">{token.amount}</div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="claim-all-btn" onClick={handleClaimAll}>
                    <span className="claim-icon">🚰</span>
                    一键领取所有代币
                  </button>
                  <p className="claim-note">领取后，所有代币将自动转入您的钱包</p>
                </div>
              </div>
            )}

            {/* 代币列表标签页内容 */}
            {activeTab === 'token-list' && (
              <div className="tab-content">
                <div className="token-list">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="token-card">
                      <div className="token-card-header">
                        <div className="token-card-icon">{token.icon}</div>
                        <div className="token-card-info">
                          <div className="token-card-name">{token.name}</div>
                          <div className="token-card-symbol">{token.symbol}</div>
                        </div>
                        <div className="token-card-amount">{token.amount}</div>
                      </div>
                      <button 
                        className="claim-token-btn"
                        onClick={() => handleClaimToken(token)}
                      >
                        领取
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Faucet;