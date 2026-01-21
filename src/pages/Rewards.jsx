import React from 'react';
import '../styles/pages/Rewards.css';

/**
 * 奖励页面组件
 * 显示奖励概览和关于奖励的信息
 */
const Rewards = () => {
  // 模拟数据
  const availableRewards = '0.0000';
  const claimedRewards = '0.0000';
  const rewardsToken = 'LRWD';

  // 领取奖励操作
  const handleClaimRewards = () => {
    console.log('Claim rewards clicked');
    // 这里可以添加实际的领取奖励逻辑
  };

  return (
    <div className="rewards-container">
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
    </div>
  );
};

export default Rewards;