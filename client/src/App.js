import React, { useState } from 'react';
import { Phone, ChevronDown, Menu, X, ChevronUp } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Constants for consistent desktop dropdown styling
  const dropdownItemStyle = {
    padding: '12px 20px',
    color: '#777',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: '0.2s'
  };

  const separatorStyle = {
    height: '1px',
    backgroundColor: '#f0f0f0',
    margin: '0 20px'
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', margin: 0, padding: 0 }}>
      
      <style>{`
        .mobile-toggle { display: none; }
        .mobile-menu-overlay { display: none; }

        @media (max-width: 1024px) {
          .top-bar { display: none !important; }
          .desktop-nav-center { display: none !important; }
          .desktop-button-right { display: none !important; }
          
          .mobile-toggle { 
            display: flex !important; 
            align-items: center;
            justify-content: center;
            z-index: 1002;
            cursor: pointer;
          }
          nav { height: 80px !important; }
          .logo-img { height: 55px !important; }
          
          .mobile-menu-overlay {
            display: flex;
            position: fixed;
            top: 80px; 
            left: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background-color: white;
            z-index: 999;
            flex-direction: column;
            overflow-y: auto;
          }
        }
        
        .nav-item { 
          cursor: pointer; 
          transition: 0.2s; 
          color: #555; 
          font-weight: 600; 
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 4px;
          height: 100px; 
          list-style: none;
        }
        
        .nav-item:hover { color: #356E6E !important; }
        .dropdown-link:hover { color: #356E6E !important; background-color: #fcfcfc; }
        .social-icon { color: white; cursor: pointer; font-size: 14px; transition: 0.2s; padding: 0 5px; }
      `}</style>

      {/* 1. TOP BAR */}
      <div className="top-bar" style={{ backgroundColor: '#356E6E', color: 'white', height: '45px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '25px', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> IND : +91 79 4032 7371</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> NZ : +64 212 788 915</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <i className="fa-brands fa-facebook-f social-icon"></i>
            <i className="fa-brands fa-instagram social-icon"></i>
            <i className="fa-brands fa-youtube social-icon"></i>
            <i className="fa-brands fa-linkedin-in social-icon"></i>
            <i className="fa-brands fa-x-twitter social-icon"></i>
            <i className="fa-brands fa-pinterest social-icon"></i>
            <button style={{ backgroundColor: '#00A1B1', border: 'none', color: 'white', height: '45px', padding: '0 25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', marginLeft: '10px' }}>
              EMAIL US HERE
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav style={{ backgroundColor: 'white', height: '100px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 20px' }}>
          
          {/* Logo */}
          <div style={{ flex: '0 0 auto' }}>
            <img src="/logo.png" className="logo-img" alt="Freedom Logo" style={{ height: '75px', display: 'block' }} />
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav-center" style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
            <ul style={{ display: 'flex', gap: '35px', margin: 0, padding: 0 }}>
              <li className="nav-item">Home</li>
              <li className="nav-item">Van Rentals</li>
              <li 
                className="nav-item" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                style={{ position: 'relative' }}
              >
                Day Tours <ChevronDown size={14} />
                {isDropdownOpen && (
                  <div style={{ position: 'absolute', top: '90px', left: '0', backgroundColor: 'white', minWidth: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '6px', padding: '5px 0', zIndex: 1001, borderTop: '3px solid #356E6E' }}>
                    <div className="dropdown-link" style={dropdownItemStyle}>Auckland</div>
                    <div style={separatorStyle}></div>
                    <div className="dropdown-link" style={dropdownItemStyle}>Christchurch</div>
                    <div style={separatorStyle}></div>
                    <div className="dropdown-link" style={dropdownItemStyle}>Queenstown</div>
                  </div>
                )}
              </li>
              <li className="nav-item">Contact</li>
            </ul>
          </div>

          {/* Desktop Right Button */}
          <div className="desktop-button-right" style={{ flex: '0 0 auto' }}>
            <button style={{ backgroundColor: '#264F4F', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold' }}>
              Download Day Tours
            </button>
          </div>

          {/* Mobile Toggle Icon */}
          <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={35} color="#264F4F" /> : <Menu size={35} color="#264F4F" />}
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay">
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Home</div>
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Van Rentals</div>
            
            {/* Mobile Dropdown Section */}
            <div 
              style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              Day Tours {isMobileDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {isMobileDropdownOpen && (
              <div style={{ backgroundColor: '#f9f9f9' }}>
                <div style={{ padding: '15px 40px', borderBottom: '1px solid #eee', color: '#666' }}>Auckland</div>
                <div style={{ padding: '15px 40px', borderBottom: '1px solid #eee', color: '#666' }}>Christchurch</div>
                <div style={{ padding: '15px 40px', borderBottom: '1px solid #eee', color: '#666' }}>Queenstown</div>
              </div>
            )}

            <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Contact</div>
            <div style={{ padding: '30px 20px' }}>
              <button style={{ width: '100%', backgroundColor: '#264F4F', color: 'white', border: 'none', padding: '18px', borderRadius: '8px', fontWeight: 'bold' }}>
                Download Day Tours
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <div style={{ height: '550px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("https://nzdaytour.com/wp-content/uploads/2023/04/auckland-city-skyline.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '38px', fontWeight: '300', margin: 0 }}>Finding daytours from</h2>
          <h1 style={{ fontSize: '110px', fontFamily: '"Brush Script MT", cursive', marginTop: '-25px' }}>Auckland ?</h1>
        </div>
      </div>
    </div>
  );
}

export default App;