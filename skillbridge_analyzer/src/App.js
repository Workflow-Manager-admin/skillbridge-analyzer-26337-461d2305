import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  // Palette
  const PRIMARY = "#4F8A8B";
  const SECONDARY = "#FBD46D";
  const ACCENT = "#F76B8A";

  return (
    <div className="app">
      {/* Vibrant Navbar with Engaging Logo */}
      <nav
        className="navbar"
        style={{
          background:
            "linear-gradient(90deg, #4F8A8B 50%, #FBD46D 95%, #F76B8A 100%)",
          borderBottom: `4px solid ${ACCENT}`,
          boxShadow: "0 4px 16px 0 rgba(247,107,138,0.07)",
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div
              className="logo"
              style={{
                fontSize: "1.6rem",
                letterSpacing: "0.8px",
                fontWeight: 700,
                color: "#fff",
                gap: 16,
                background: "rgba(255,255,255,0.08)",
                padding: "7px 25px 7px 15px",
                borderRadius: 26,
                boxShadow: "0 2px 10px 0 rgba(79,138,139,0.14)"
              }}
            >
              {/* Engaging logo: funky icon + bold text with accent highlight */}
              <span
                style={{
                  fontSize: 32,
                  marginRight: 11,
                  color: SECONDARY,
                  textShadow: "0 2px 8px #f3c95e44"
                }}
                aria-label="logo"
                role="img"
              >
                <svg width="35" height="34" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign:'middle'}}>
                  <ellipse cx="19" cy="18" rx="15.5" ry="15" fill="#FBD46D" />
                  <ellipse cx="18" cy="19" rx="8" ry="8" fill="#4F8A8B" />
                  <ellipse cx="25" cy="12" rx="2.5" ry="2.2" fill="#F76B8A" />
                  <ellipse cx="11.5" cy="25" rx="2.2" ry="2.4" fill="#F76B8A" />
                </svg>
              </span>
              <span>
                <span style={{ color: PRIMARY, fontWeight: 900, fontSize: "1.25em", verticalAlign: "middle", textShadow: "0 1px 7px #fbd46d44" }}>
                  SkillBridge
                </span>
                <span style={{
                  color: ACCENT, fontWeight: 800, fontSize: "1.1em", marginLeft: 6, verticalAlign: "middle",
                  textShadow: "0 1px 7px #fbd46d99"
                }}>Analyzer</span>
              </span>
            </div>
            {/* Spacer to keep logo on left */}
            <div style={{ flex: 1 }} />
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