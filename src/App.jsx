import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/ui/Sidebar';
import Header from './components/ui/Header';
import Portfolio from './pages/Portfolio';
import Trade from './pages/Trade';
import Stake from './pages/Stake';
import Rewards from './pages/Rewards';
import Faucet from './pages/Faucet';

/**
 * 主应用组件
 * 整合侧边栏、顶部信息栏和路由功能
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/portfolio" replace />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/faucet" element={<Faucet />} />
              <Route path="*" element={<Navigate to="/portfolio" replace />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="footer-text">© 2026 LEAPETF. All rights reserved.</div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
