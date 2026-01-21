import React from 'react';
import '../../styles/components/Navbar.css';

/**
 * 导航栏组件
 * 包含网站标题、导航链接和连接钱包按钮
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>MOONETA</h1>
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link">首页</a>
          <a href="#" className="navbar-link">市场</a>
          <a href="#" className="navbar-link active">投资组合</a>
          <a href="#" className="navbar-link">交易历史</a>
          <a href="#" className="navbar-link">关于</a>
        </div>
        <div className="navbar-actions">
          <button className="wallet-connect-btn">连接钱包</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;