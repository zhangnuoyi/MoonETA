import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/pages/Portfolio.css';
import WalletConnectButton from '../components/ui/WalletConnectButton';
import EtfCard from '../components/ui/EtfCard';

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

  return (
    <div className="portfolio-container">
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
        <>
          <div className="portfolio-header">
            <div className="portfolio-title">
              <h1>我的投资组合</h1>
            </div>
            <div className="portfolio-actions">
              <WalletConnectButton 
                onConnect={handleWalletConnect} 
                onDisconnect={handleWalletDisconnect} 
                walletConnected={walletConnected} 
                walletAddress={walletAddress} 
              />
            </div>
          </div>

          <div className="portfolio-summary">
            <div className="summary-card">
              <div className="summary-title">总价值</div>
              <div className="summary-value">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">总收益</div>
              <div className={`summary-value ${totalReturns >= 0 ? 'positive' : 'negative'}`}>
                ${Math.abs(totalReturns).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="summary-change">{totalReturns >= 0 ? '+' : ''}{(totalReturns / totalPortfolioValue * 100).toFixed(2)}%</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-title">持有ETF数量</div>
              <div className="summary-value">{etfData.length}</div>
            </div>
          </div>

          <div className="portfolio-content">
            {/* ETH资产显示 */}
            <div className="portfolio-section">
              <h2>我的资产</h2>
              <div className="asset-cards-grid">
                <div className="asset-card eth-card">
                  <div className="asset-header">
                    <div className="asset-icon">Ξ</div>
                    <div className="asset-info">
                      <div className="asset-name">Ethereum</div>
                      <div className="asset-symbol">ETH</div>
                    </div>
                  </div>
                  <div className="asset-balance">
                    <div className="balance-amount">{ethBalance.amount} ETH</div>
                    <div className="balance-value">${ethBalance.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ETF持仓显示 */}
            <div className="portfolio-section">
              <h2>我的ETF持仓</h2>
              <div className="eta-cards-grid">
                {etfData.map(etf => (
                  <EtfCard key={etf.id} eta={etf} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;