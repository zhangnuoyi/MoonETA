import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/pages/Stake.css';
import WalletConnectButton from '../components/ui/WalletConnectButton';

/**
 * 质押页面组件
 * 包含质押概览、质押和解除质押功能
 */
const Stake = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [activeTab, setActiveTab] = useState('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

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
  const stakedETA = '0.0000';
  const miningRate = '864.0000 LRWD';
  const etaPrice = '0.00';
  const userRewards = '0.0000';
  const rewardsToken = 'LRWD';
  const totalSupply = '203.55 ETA';

  // 切换标签页
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 输入质押金额
  const handleStakeAmountChange = (e) => {
    setStakeAmount(e.target.value);
  };

  // 输入解除质押金额
  const handleUnstakeAmountChange = (e) => {
    setUnstakeAmount(e.target.value);
  };

  // 质押操作
  const handleStake = () => {
    console.log('Stake clicked', { amount: stakeAmount });
    // 这里可以添加实际的质押逻辑
  };

  // 解除质押操作
  const handleUnstake = () => {
    console.log('Unstake clicked', { amount: unstakeAmount });
    // 这里可以添加实际的解除质押逻辑
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
    <div className="stake-container">
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
            <p className="prompt-submessage">Connect your wallet to start staking</p>
            <WalletConnectButton 
              onConnect={handleWalletConnect} 
              onDisconnect={handleWalletDisconnect} 
              walletConnected={walletConnected} 
              walletAddress={walletAddress} 
            />
          </div>
        </div>
      )}

      {/* 质押内容 - 仅在钱包连接后显示 */}
      {walletConnected && (
        <div className="stake-content">
        {/* 质押概览 */}
        <div className="overview-section">
          <div className="overview-card">
            <h2 className="overview-title">
              <span className="overview-icon">📊</span>
              质押概览
            </h2>
            
            <div className="overview-item">
              <div className="overview-label">已质押ETA</div>
              <div className="overview-value">{stakedETA}</div>
              <div className="overview-subtext">开始质押获取奖励</div>
              <div className="supply-info">
                <span className="supply-label">总质押:</span>
                <span className="supply-value">{totalSupply}</span>
              </div>
            </div>
            
            <div className="overview-item">
              <div className="overview-label">挖矿速率</div>
              <div className="overview-value mining-rate">
                {miningRate}
                <span className="rate-unit">/天</span>
              </div>
              <div className="overview-subtext">基于当前质押计算</div>
            </div>
          </div>
        </div>

        {/* 质押操作 */}
        <div className="action-section">
          <div className="action-card">
            {/* 标签页导航 */}
            <div className="tab-nav">
              <button 
                className={`tab-btn ${activeTab === 'stake' ? 'active' : ''}`}
                onClick={() => handleTabChange('stake')}
              >
                <span className="tab-icon">🔒</span>
                质押
              </button>
              <button 
                className={`tab-btn ${activeTab === 'unstake' ? 'active' : ''}`}
                onClick={() => handleTabChange('unstake')}
              >
                <span className="tab-icon">🔓</span>
                解除质押
              </button>
            </div>

            {/* 质押标签页内容 */}
            {activeTab === 'stake' && (
              <div className="tab-content">
                <div className="form-row">
                  <div className="form-label">ETA价格</div>
                  <div className="form-value">{etaPrice}</div>
                </div>
                
                <div className="form-row">
                  <div className="form-label">ETA余额</div>
                  <div className="form-value">0.0000 <span className="token-symbol">ETA</span></div>
                </div>
                
                <div className="form-row">
                  <div className="form-label">质押数量</div>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="amount-input"
                      placeholder="0.0"
                      value={stakeAmount}
                      onChange={handleStakeAmountChange}
                      step="0.01"
                      min="0"
                    />
                    <div className="token-info">
                      <div className="token-symbol">ETA</div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-label">质押类型</div>
                  <div className="form-value">ETA</div>
                </div>

                <div className="form-row">
                  <div className="form-label">预计每日奖励</div>
                  <div className="form-value">{userRewards} <span className="token-symbol">{rewardsToken}</span></div>
                </div>

                <button className="stake-btn" onClick={handleStake}>
                  <span className="btn-icon">🔒</span>
                  质押ETA
                </button>
              </div>
            )}

            {/* 解除质押标签页内容 */}
            {activeTab === 'unstake' && (
              <div className="tab-content">
                <div className="form-row">
                  <div className="form-label">ETA价格</div>
                  <div className="form-value">{etaPrice}</div>
                </div>
                
                <div className="form-row">
                  <div className="form-label">已质押ETA</div>
                  <div className="form-value">0.0000 <span className="token-symbol">ETA</span></div>
                </div>
                
                <div className="form-row">
                  <div className="form-label">解除质押数量</div>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="amount-input"
                      placeholder="0.0"
                      value={unstakeAmount}
                      onChange={handleUnstakeAmountChange}
                      step="0.01"
                      min="0"
                    />
                    <div className="token-info">
                      <div className="token-symbol">ETA</div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-label">质押类型</div>
                  <div className="form-value">ETA</div>
                </div>

                <button className="unstake-btn" onClick={handleUnstake}>
                  <span className="btn-icon">🔓</span>
                  解除质押ETA
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Stake;