import React, { useState } from 'react';
import '../styles/pages/Trade.css';

/**
 * 交易页面组件
 * 包含投资(Invest)和赎回(Redeem)两个标签页
 */
const Trade = () => {
  const [activeTab, setActiveTab] = useState('invest');
  const [investToken, setInvestToken] = useState('USDC');
  const [redeemToken, setRedeemToken] = useState('USDC');
  const [investAmount, setInvestAmount] = useState('');
  const [redeemAmount, setRedeemAmount] = useState('');
  const [estimatedETA, setEstimatedETA] = useState('0.000000');
  const [estimatedTokens, setEstimatedTokens] = useState('0.000000');

  // 模拟代币数据
  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', balance: '50.0000' },
    { symbol: 'WETH', name: 'Wrapped Ether', balance: '0.5000' },
    { symbol: 'LETH', name: 'LeapETH', balance: '0.0000' },
    { symbol: 'LTC', name: 'Litecoin', balance: '0.3000' },
    { symbol: 'LINK', name: 'Chainlink', balance: '50.0000' }
  ];

  // ETA余额
  const etaBalance = '0.0000';

  // 获取当前投资的代币信息
  const currentInvestToken = tokens.find(token => token.symbol === investToken) || tokens[0];
  
  // 获取当前赎回的代币信息
  const currentRedeemToken = tokens.find(token => token.symbol === redeemToken) || tokens[0];

  // 切换标签页
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 选择投资代币
  const handleInvestTokenChange = (e) => {
    setInvestToken(e.target.value);
  };

  // 选择赎回代币
  const handleRedeemTokenChange = (e) => {
    setRedeemToken(e.target.value);
    // 更新预计收到的代币数量
    const tokenAmount = parseFloat(redeemAmount) * 102.0448 || 0;
    setEstimatedTokens(tokenAmount.toFixed(6));
  };

  // 输入投资金额
  const handleInvestAmountChange = (e) => {
    const amount = e.target.value;
    setInvestAmount(amount);
    // 模拟计算预计收到的ETA数量
    const etaAmount = parseFloat(amount) / 102.0448 || 0;
    setEstimatedETA(etaAmount.toFixed(6));
  };

  // 输入赎回金额
  const handleRedeemAmountChange = (e) => {
    const amount = e.target.value;
    setRedeemAmount(amount);
    // 模拟计算预计收到的代币数量
    const tokenAmount = parseFloat(amount) * 102.0448 || 0;
    setEstimatedTokens(tokenAmount.toFixed(6));
  };

  // 投资操作
  const handleInvest = () => {
    console.log('Invest clicked', { investToken, investAmount, estimatedETA });
    // 这里可以添加实际的投资逻辑
  };

  // 赎回操作
  const handleRedeem = () => {
    console.log('Redeem clicked', { redeemToken, redeemAmount, estimatedTokens });
    // 这里可以添加实际的赎回逻辑
  };

  // 填充投资最大金额
  const fillInvestMaxAmount = () => {
    setInvestAmount(currentInvestToken.balance);
    const etaAmount = parseFloat(currentInvestToken.balance) / 102.0448 || 0;
    setEstimatedETA(etaAmount.toFixed(6));
  };

  // 填充赎回最大金额
  const fillRedeemMaxAmount = () => {
    setRedeemAmount(etaBalance);
    const tokenAmount = parseFloat(etaBalance) * 102.0448 || 0;
    setEstimatedTokens(tokenAmount.toFixed(6));
  };

  return (
    <div className="trade-container">
      <div className="trade-header">
        <h1 className="trade-title">Trade</h1>
      </div>
      
      <div className="trade-card">
        {/* 标签页导航 */}
        <div className="tab-nav">
          <button 
            className={`tab-btn ${activeTab === 'invest' ? 'active' : ''}`}
            onClick={() => handleTabChange('invest')}
          >
            Invest
          </button>
          <button 
            className={`tab-btn ${activeTab === 'redeem' ? 'active' : ''}`}
            onClick={() => handleTabChange('redeem')}
          >
            Redeem
          </button>
        </div>

        {/* 投资标签页内容 */}
        {activeTab === 'invest' && (
          <div className="tab-content">
            {/* 选择投资代币 */}
            <div className="form-group">
              <label className="form-label">Select Token</label>
              <div className="select-wrapper">
                <select 
                  className="token-select" 
                  value={investToken} 
                  onChange={handleInvestTokenChange}
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} ({token.name})
                    </option>
                  ))}
                </select>
                <span className="balance-info">Balance: {currentInvestToken.balance}</span>
              </div>
            </div>

            {/* 投资金额 */}
            <div className="form-group">
              <label className="form-label">投资金额</label>
              <div className="input-wrapper">
                <div className="token-icon">💵</div>
                <input
                  type="number"
                  className="amount-input"
                  placeholder="0.0"
                  value={investAmount}
                  onChange={handleInvestAmountChange}
                  step="0.01"
                  min="0"
                />
                <div className="token-info">
                  <div className="token-symbol">{investToken}</div>
                  <div className="token-name">{currentInvestToken.name}</div>
                </div>
                <button className="max-btn" onClick={fillInvestMaxAmount}>Max</button>
              </div>
              <div className="input-value">{investAmount || '0.0'}</div>
            </div>

            {/* 预计收到的ETA */}
            <div className="form-group">
              <label className="form-label">已收到预计 ETA</label>
              <div className="result-box">
                <div className="token-icon">📊</div>
                <div className="result-info">
                  <div className="result-label">ETA</div>
                  <div className="result-value">{estimatedETA}</div>
                </div>
              </div>
              <div className="exchange-rate">
                <span>汇率:</span>
                <span>1 ETA = 102.0448 {investToken}</span>
              </div>
            </div>

            {/* 投资按钮 */}
            <button className="trade-btn" onClick={handleInvest}>
              Invest Now
            </button>
          </div>
        )}

        {/* 赎回标签页内容 */}
        {activeTab === 'redeem' && (
          <div className="tab-content">
            {/* ETA余额显示 */}
            <div className="form-group">
              <label className="form-label">ETA to Redeem</label>
              <div className="select-wrapper">
                <div className="eta-balance">ETA</div>
                <span className="balance-info">Balance: {etaBalance}</span>
              </div>
            </div>

            {/* 赎回金额 */}
            <div className="form-group">
              <label className="form-label">Amount to Redeem</label>
              <div className="input-wrapper">
                <div className="token-icon">📊</div>
                <input
                  type="number"
                  className="amount-input"
                  placeholder="0.0"
                  value={redeemAmount}
                  onChange={handleRedeemAmountChange}
                  step="0.000001"
                  min="0"
                />
                <div className="token-info">
                  <div className="token-symbol">ETA</div>
                  <div className="token-name">MOONETA Token</div>
                </div>
                <button className="max-btn" onClick={fillRedeemMaxAmount}>Max</button>
              </div>
              <div className="input-value">{redeemAmount || '0.0'}</div>
            </div>

            {/* 选择输出代币 */}
            <div className="form-group">
              <label className="form-label">Select Output Token</label>
              <div className="select-wrapper">
                <select 
                  className="token-select" 
                  value={redeemToken} 
                  onChange={handleRedeemTokenChange}
                >
                  {tokens.map(token => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} ({token.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 预计收到的代币 */}
            <div className="form-group">
              <label className="form-label">Estimated {redeemToken} Received</label>
              <div className="result-box">
                <div className="token-icon">💵</div>
                <div className="result-info">
                  <div className="result-label">{redeemToken}</div>
                  <div className="result-value">{estimatedTokens}</div>
                </div>
                <span className="balance-info">{redeemToken} Balance: {currentRedeemToken.balance}</span>
              </div>
            </div>

            {/* 赎回按钮 */}
            <button className="trade-btn" onClick={handleRedeem}>
              Redeem Now
            </button>

            {/* 提示信息 */}
            <div className="disclaimer">
              <p>Note: Currently using simulated price. Advanced price feeds and optimal routing are under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;