import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/Sidebar.css';

/**
 * 侧边导航栏组件
 * 包含网站主要功能的导航链接
 */
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  /**
   * 检查当前路径是否匹配导航项
   */
  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">LEAPETF</h1>
      </div>
      <div className="sidebar-nav">
        <Link to="/portfolio" className={`nav-item ${isActive('/portfolio') ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-text">Portfolio</span>
        </Link>
        <Link to="/trade" className={`nav-item ${isActive('/trade') ? 'active' : ''}`}>
          <span className="nav-icon">💱</span>
          <span className="nav-text">Trade</span>
        </Link>
        <Link to="/stake" className={`nav-item ${isActive('/stake') ? 'active' : ''}`}>
          <span className="nav-icon">🎯</span>
          <span className="nav-text">Stake</span>
        </Link>
        <Link to="/rewards" className={`nav-item ${isActive('/rewards') ? 'active' : ''}`}>
          <span className="nav-icon">🏆</span>
          <span className="nav-text">Rewards</span>
        </Link>
        <Link to="/faucet" className={`nav-item ${isActive('/faucet') ? 'active' : ''}`}>
          <span className="nav-icon">🚰</span>
          <span className="nav-text">Faucet</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <div className="footer-icons">
          <span className="footer-icon">📱</span>
          <span className="footer-icon">💬</span>
          <span className="footer-icon">❓</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;