import React from 'react';
import '../../styles/components/AssetCards.css';

/**
 * 资产卡片组件
 * 显示ETH余额、LeapETF余额和ETF分配信息
 */
const AssetCards = () => {
  // 模拟数据
  const ethBalance = 0.7753;
  const leapETFbalance = 0.0000;
  const etfAllocation = [
    { name: 'LETH', percentage: 30, color: '#3b82f6' },
    { name: 'LTC', percentage: 20, color: '#f59e0b' },
    { name: 'LINK', percentage: 20, color: '#6366f1' },
    { name: 'USDC', percentage: 30, color: '#10b981' }
  ];

  return (
    <div className="asset-cards">
      {/* ETH余额卡片 */}
      <div className="asset-card">
        <div className="card-header">
          <span className="card-icon">⚡</span>
          <h3 className="card-title">Ethereum 余额</h3>
        </div>
        <div className="card-value">{ethBalance}</div>
        <div className="card-unit">ETH</div>
      </div>

      {/* LeapETF余额卡片 */}
      <div className="asset-card">
        <div className="card-header">
          <span className="card-icon">📊</span>
          <h3 className="card-title">LeapETF 余额</h3>
        </div>
        <div className="card-value">{leapETFbalance}</div>
        <div className="card-unit">ETF</div>
      </div>

      {/* ETF分配卡片 */}
      <div className="asset-card allocation-card">
        <div className="card-header">
          <span className="card-icon">📈</span>
          <h3 className="card-title">ETF 配比</h3>
        </div>
        <div className="allocation-list">
          {etfAllocation.map((item, index) => (
            <div key={index} className="allocation-item">
              <div className="allocation-info">
                <span className="allocation-color" style={{ backgroundColor: item.color }}></span>
                <span className="allocation-name">{item.name}</span>
              </div>
              <span className="allocation-percentage">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetCards;