import React from 'react';
import '../../styles/components/AssetTable.css';

/**
 * 资产表格组件
 * 显示用户的资产列表
 */
const AssetTable = () => {
  // 模拟资产数据
  const assets = [
    { id: 1, name: 'MOONETA Token', symbol: 'ETA', balance: 0.0000, icon: '📊' },
    { id: 2, name: 'LeapETH', symbol: 'LETH', balance: 0.5000, icon: '⚡' },
    { id: 3, name: 'Wrapped Ether', symbol: 'WETH', balance: 0.0000, icon: '💎' },
    { id: 4, name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.0000, icon: '₿' },
    { id: 5, name: 'Litecoin', symbol: 'LTC', balance: 0.5000, icon: '🟠' },
    { id: 6, name: 'Chainlink', symbol: 'LINK', balance: 50.0000, icon: '🔗' },
    { id: 7, name: 'USDC', symbol: 'USDC', balance: 50.0000, icon: '💵' }
  ];

  return (
    <div className="asset-table-container">
      <div className="table-header">
        <h2 className="table-title">你的资产</h2>
      </div>
      <div className="table-wrapper">
        <table className="asset-table">
          <thead>
            <tr>
              <th className="table-th">Asset</th>
              <th className="table-th text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="table-row">
                <td className="table-td asset-info">
                  <span className="asset-icon">{asset.icon}</span>
                  <div className="asset-details">
                    <div className="asset-name">{asset.name}</div>
                    <div className="asset-symbol">{asset.symbol}</div>
                  </div>
                </td>
                <td className="table-td text-right">{asset.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;