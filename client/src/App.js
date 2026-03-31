import React, { useState } from 'react';
import { Phone, ChevronDown, Menu, X, ChevronUp } from 'lucide-react'; // Removed unused MessageCircle and ArrowUp

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

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
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#fff', overflowX: 'hidden' }}>
      
      <style>{`
        .mobile-toggle { display: none; }
        .mobile-menu-overlay { display: none; }

        .responsive-img {
            max-width: 100%;
            height: auto;
            display: block;
        }

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

          .footer-container { 
            flex-direction: column !important; 
            text-align: center !important; 
            gap: 30px !important;
          }
          .process-badges-row { 
            justify-content: center !important; 
          }
          .company-col {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .address-grid { 
            grid-template-columns: 1fr !important; 
            text-align: center !important; 
            gap: 30px !important;
          }
          .process-badges-row img {
            height: 60px !important; 
          }
          .specialist-logo {
            height: 80px !important;
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

        .footer-heading { color: #356E6E; font-size: 19px; font-weight: 600; margin-bottom: 25px; }
        .location-title { color: #356E6E; font-size: 17px; font-weight: 700; margin-bottom: 12px; }
        .location-text { color: #666; font-size: 13.5px; line-height: 1.8; margin-bottom: 15px; }
        .social-box { background-color: #356E6E; color: white; width: 38px; height: 38px; border-radius: 5px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
      `}</style>

      {/* STICKY HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
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
              <span style={{ fontWeight: '900', fontSize: '14px', cursor: 'pointer', padding: '0 5px' }}>X</span>
              <i className="fa-brands fa-pinterest social-icon"></i>
              <button style={{ backgroundColor: '#00A1B1', border: 'none', color: 'white', height: '45px', padding: '0 25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', marginLeft: '10px' }}>
                EMAIL US HERE
              </button>
            </div>
          </div>
        </div>

        <nav style={{ backgroundColor: 'white', height: '100px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 20px' }}>
            <div style={{ flex: '0 0 auto' }}>
              <img src="/logo.png" className="logo-img" alt="Freedom Logo" style={{ height: '75px', display: 'block' }} />
            </div>

            <div className="desktop-nav-center" style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <ul style={{ display: 'flex', gap: '35px', margin: 0, padding: 0 }}>
                <li className="nav-item">Home</li>
                <li className="nav-item">Van Rentals</li>
                <li className="nav-item" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} style={{ position: 'relative' }}>
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

            <div className="desktop-button-right" style={{ flex: '0 0 auto' }}>
              <button style={{ backgroundColor: '#264F4F', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold' }}>
                Download Day Tours
              </button>
            </div>

            <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={35} color="#264F4F" /> : <Menu size={35} color="#264F4F" />}
            </div>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu-overlay">
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Home</div>
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }}>Van Rentals</div>
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}>
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
            </div>
          )}
        </nav>
      </header>

      {/* HERO SECTION */}
      <div style={{ height: '550px', backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("https://nzdaytour.com/wp-content/uploads/2023/04/auckland-city-skyline.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '38px', fontWeight: '300', margin: 0 }}>Finding daytours from</h2>
          <h1 style={{ fontSize: '110px', fontFamily: '"Brush Script MT", cursive', marginTop: '-25px' }}>Auckland ?</h1>
        </div>
      </div>

      <div style={{ minHeight: '200px' }}></div>

      {/* FOOTER SECTION */}
      <footer style={{ borderTop: '1px dashed #ccc', paddingTop: '40px' }}>
        <div className="footer-container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '40px' }}>
          
          <div style={{ flex: '3' }}>
            <div className="footer-heading">Our Process</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="process-badges-row" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                <img src="/Footer2.png" alt="Economy Price" className="responsive-img" style={{ height: '95px' }} />
                <img src="/process-2-1.png" className="responsive-img" style={{ height: '90px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }} className="process-badges-row">
                <img src="/footer-logo.png" alt="Aussie Specialist" className="responsive-img specialist-logo" style={{ height: '125px' }} />
              </div>
            </div>
          </div>

          <div className="company-col" style={{ flex: '1', textAlign: 'right' }}>
            <div className="footer-heading">Our Companies</div>
            <img src="/pds_header_org.png" alt="Perfect Designing" className="responsive-img" style={{ width: '300px', height: 'auto' }} />
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #ccc', marginTop: '40px', padding: '40px 0' }}>
          <div className="address-grid" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            <div>
              <div className="location-title">India</div>
              <div className="location-text">AHMEDABAD<br/>601, Abhishree Avenue,<br/>Opp. Hanumanji Temple,<br/>Nr. Nehru Nagar Circle, Ambawadi<br/>Ahmedabad - 15, Gujarat, India</div>
            </div>
            <div>
              <div className="location-title">New Zealand</div>
              <div className="location-text">AUCKLAND<br/>5, McGowan Street<br/>Mt. Roskill<br/>Auckland 1041.</div>
            </div>
            <div>
              <div className="location-title" style={{ visibility: 'hidden' }}>Dunedin</div>
              <div className="location-text">DUNEDIN<br/>63-B, Royal Crescent<br/>Saint Kilda<br/>Dunedin 9012.</div>
            </div>
            <div>
              <div className="location-title" style={{ visibility: 'hidden' }}>Queenstown</div>
              <div className="location-text">QUEENSTOWN<br/>9 Tewa Street<br/>Frankton,<br/>Queenstown 9300.</div>
            </div>
            <div>
              <div className="location-title">Australia</div>
              <div className="location-text">SYDNEY,<br/>Llyod Street,<br/>Werrington,<br/>NSW 2747.</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #ccc', padding: '40px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
            {['facebook-f', 'instagram', 'youtube', 'linkedin-in'].map(icon => (
              <div key={icon} className="social-box"><i className={`fa-brands fa-${icon}`}></i></div>
            ))}
            <div className="social-box"><span style={{ fontWeight: 'bold' }}>X</span></div>
            <div className="social-box"><i className="fa-brands fa-pinterest"></i></div>
          </div>
          <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px', padding: '0 10px' }}>
            TERMS & CONDITIONS | FAQS | PRIVACY POLICY
          </div>
          <div style={{ color: '#888', fontSize: '13px', padding: '0 20px' }}>
            Disclaimer: Photographs/Pictures/Images are owned by their respective copyright owner.<br/>
            © 2014-2025, Freedom Tourism Ltd., All Rights Reserved
          </div>
        </div>

      </footer>
    </div>
  );
}
export default App;