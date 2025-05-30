import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* KAVIA AI Navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>
      {/* MainContainer SkillBridge Analyzer */}
      <main>
        {/* The new MainContainer has its own header/visual block */}
        <MainContainer />
      </main>
    </div>
  );
}

export default App;