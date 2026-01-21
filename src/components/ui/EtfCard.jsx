import React from 'react';
import '../../styles/components/EtfCard.css';

/**
 * ETF卡片组件
 * 展示单个ETF的详细信息
 */
const EtfCard = ({ eta }) => {
  /**
   * 确定价格变化的样式类
   */
  const getChangeClass = (change) => {
    return change >= 0 ? 'positive' : 'negative';
  };

  /**
   * 格式化数字为货币格式
   */
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="eta-card">
      {/* 卡片头部 */}
      <div className="eta-card-header">
        <div className="eta-logo">{eta.logo}</div>
        <div className="eta-info">
          <div className="eta-name">{eta.name}</div>
          <div className="eta-symbol">{eta.symbol}</div>
        </div>
        <div className={`eta-change-badge ${getChangeClass(eta.change)}`}>
          {eta.changePercent >= 0 ? '+' : ''}{eta.changePercent}%
        </div>
      </div>
      
      {/* 价格信息 */}
      <div className="eta-price-section">
        <div className="eta-price">${formatCurrency(eta.price)}</div>
        <div className={`eta-change ${getChangeClass(eta.change)}`}>
          <span className="change-value">{eta.change >= 0 ? '+' : ''}{eta.change}</span>
        </div>
      </div>
      
      {/* 持仓信息 */}
      <div className="eta-holdings-section">
        <div className="holding-item">
          <div className="holding-label">持仓数量</div>
          <div className="holding-value">{eta.holdings}</div>
        </div>
        <div className="holding-item">
          <div className="holding-label">总价值</div>
          <div className="holding-value">${formatCurrency(eta.totalValue)}</div>
        </div>
      </div>
      
      {/* 卡片底部操作按钮 */}
      <div className="eta-card-actions">
        <button className="action-btn buy-btn">
          <span className="btn-icon">+</span>
          <span className="btn-text">买入</span>
        </button>
        <button className="action-btn sell-btn">
          <span className="btn-icon">-</span>
          <span className="btn-text">卖出</span>
        </button>
      </div>
    </div>
  );
};

export default EtfCard;