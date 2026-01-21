import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/pages/Portfolio.css';
import WalletConnectButton from '../components/ui/WalletConnectButton';

/**
 * 投资组合页面组件
 * 展示用户的ETF投资组合和相关统计信息
 */
const Portfolio = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  // 模拟ETF数据
  const etfData = [
    {
      id: 1,
      name: 'DeFi蓝筹ETF',
      symbol: 'DEFI-BLUE',
      price: 125.50,
      change: 2.34,
      changePercent: 1.90,
      holdings: 15.25,
      totalValue: 1911.88,
      logo: '📊'
    },
    {
      id: 2,
      name: 'NFT精选ETF',
      symbol: 'NFT-SELECT',
      price: 89.75,
      change: -1.20,
      changePercent: -1.32,
      holdings: 8.50,
      totalValue: 762.88,
      logo: '🎨'
    },
    {
      id: 3,
      name: 'Layer 1公链ETF',
      symbol: 'L1-COINS',
      price: 156.20,
      change: 5.67,
      changePercent: 3.78,
      holdings: 10.00,
      totalValue: 1562.00,
      logo: '🔗'
    },
    {
      id: 4,
      name: 'Web3基础设施ETF',
      symbol: 'WEB3-INFRA',
      price: 98.45,
      change: 0.89,
      changePercent: 0.91,
      holdings: 12.75,
      totalValue: 1255.24,
      logo: '🏗️'
    }
  ];

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

  // 模拟ETH资产数据
  const ethBalance = {
    amount: 0.5,
    value: 1250.00
  };

  // 计算投资组合总价值（包含ETH）
  const totalPortfolioValue = etfData.reduce((total, etf) => total + etf.totalValue, 0) + ethBalance.value;

  // 计算总收益
  const totalReturns = etfData.reduce((total, etf) => {
    const costBasis = (etf.price - etf.change) * etf.holdings;
    return total + (etf.totalValue - costBasis);
  }, 0);

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

  // 模拟资产数据
  const assets = {
    eth: 0.0997,
    leapETF: 0.0000,
    leth: 0.0000,
    ltc: 0.0000,
    link: 0.0000,
    usdc: 0.0000
  };

  // 模拟ETF分配数据
  const etfAllocation = [
    { name: 'LTC', percentage: 40, color: '#FFA500' },
    { name: 'LETH', percentage: 30, color: '#9370DB' },
    { name: 'LINK', percentage: 20, color: '#4169E1' },
    { name: 'USDC', percentage: 10, color: '#32CD32' }
  ];

  return (
    <div className="portfolio-container">
      {/* 钱包连接提示 */}
      {!walletConnected && (
        <div className="wallet-prompt">
          <div className="wallet-prompt-content">
            <h2 className="prompt-title">Welcome to LeapETF</h2>
            <p className="prompt-message">A decentralized platform for trading blockchain-based ETFs</p>
            <p className="prompt-submessage">Connect your wallet to start trading</p>
            <WalletConnectButton 
              onConnect={handleWalletConnect} 
              onDisconnect={handleWalletDisconnect} 
              walletConnected={walletConnected} 
              walletAddress={walletAddress} 
            />
          </div>
        </div>
      )}

      {/* 投资组合内容 - 仅在钱包连接后显示 */}
      {walletConnected && (
        <div className="portfolio-content">
          {/* 页面头部 */}
          <div className="portfolio-header">
            <div className="logo">LEAPETF</div>
            <div className="wallet-info">
              <span className="wallet-address">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              <button className="disconnect-btn" onClick={handleWalletDisconnect}>Disconnect</button>
            </div>
          </div>

          {/* 资产概览卡片 */}
          <div className="asset-overview">
            {/* Ethereum Balance */}
            <div className="overview-card">
              <div className="card-header">
                <span className="card-icon">💎</span>
                <span className="card-title">Ethereum Balance</span>
              </div>
              <div className="card-value">{assets.eth}</div>
              <div className="card-subtitle">ETH</div>
            </div>

            {/* LeapETF Balance */}
            <div className="overview-card">
              <div className="card-header">
                <span className="card-icon">📊</span>
                <span className="card-title">LeapETF Balance</span>
              </div>
              <div className="card-value">{assets.leapETF}</div>
              <div className="card-subtitle">LEAPETF</div>
            </div>

            {/* ETF Allocation */}
            <div className="overview-card">
              <div className="card-header">
                <span className="card-icon">📈</span>
                <span className="card-title">ETF Allocation</span>
              </div>
              <div className="allocation-list">
                {etfAllocation.map((item, index) => (
                  <div key={index} className="allocation-item">
                    <div className="allocation-color" style={{ backgroundColor: item.color }}></div>
                    <span className="allocation-name">{item.name}</span>
                    <span className="allocation-percentage">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Assets部分 */}
          <div className="assets-section">
            <h2 className="section-title">Your Assets</h2>
            <div className="assets-table">
              {/* ETF */}
              <div className="asset-row">
                <div className="asset-info">
                  <span className="asset-icon">📊</span>
                  <div className="asset-details">
                    <div className="asset-name">ETF</div>
                    <div className="asset-subname">LeapETF Token</div>
                  </div>
                </div>
                <div className="asset-balance">{assets.leapETF}</div>
              </div>

              {/* LETH */}
              <div className="asset-row">
                <div className="asset-info">
                  <span className="asset-icon">💎</span>
                  <div className="asset-details">
                    <div className="asset-name">LETH</div>
                    <div className="asset-subname">Wrapped Ether</div>
                  </div>
                </div>
                <div className="asset-balance">{assets.leth}</div>
              </div>

              {/* LTC */}
              <div className="asset-row">
                <div className="asset-info">
                  <span className="asset-icon">🟠</span>
                  <div className="asset-details">
                    <div className="asset-name">LTC</div>
                    <div className="asset-subname">Wrapped Bitcoin</div>
                  </div>
                </div>
                <div className="asset-balance">{assets.ltc}</div>
              </div>

              {/* LINK */}
              <div className="asset-row">
                <div className="asset-info">
                  <span className="asset-icon">🔗</span>
                  <div className="asset-details">
                    <div className="asset-name">LINK</div>
                    <div className="asset-subname">Chainlink</div>
                  </div>
                </div>
                <div className="asset-balance">{assets.link}</div>
              </div>

              {/* USDC */}
              <div className="asset-row">
                <div className="asset-info">
                  <span className="asset-icon">💵</span>
                  <div className="asset-details">
                    <div className="asset-name">USDC</div>
                    <div className="asset-subname">USD Coin</div>
                  </div>
                </div>
                <div className="asset-balance">{assets.usdc}</div>
              </div>
            </div>
          </div>

          {/* 页脚 */}
          <div className="footer">
            <div className="footer-text">© 2025 LeapETF. All rights reserved.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;