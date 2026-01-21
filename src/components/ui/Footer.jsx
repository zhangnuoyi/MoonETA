import React from 'react';
import '../../styles/components/Footer.css';

/**
 * 页脚组件
 * 包含版权信息和相关链接
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>MOONETA</h2>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">条款与条件</a>
            <a href="#" className="footer-link">隐私政策</a>
            <a href="#" className="footer-link">帮助中心</a>
            <a href="#" className="footer-link">联系我们</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2026 MOONETA. 保留所有权利。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;