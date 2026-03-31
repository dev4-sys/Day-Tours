import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'; 

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // --- Carousel State & Logic ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselData = [
    { img: "/DT_Auckland.jpg", title: "Auckland ?" },
    { img: "/DT_Christchurch.jpg", title: "Christchurch ?" },
    { img: "/DT_Queenstown.jpg", title: "Queenstown ?" }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(slideInterval);
  }, [carouselData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  // ------------------------------

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
        .responsive-img { max-width: 100%; height: auto; display: block; }

        /* --- Advanced Carousel Animations --- */
        @keyframes zoomSlow {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        @keyframes revealRight {
          from { transform: translateX(100px); opacity: 0; filter: blur(10px); }
          to { transform: translateX(0); opacity: 1; filter: blur(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .zoom-anim { animation: zoomSlow 6s ease-out forwards; }
        .reveal-right-anim { animation: revealRight 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .fade-in-scale-anim { animation: fadeInScale 0.7s ease-out both; }

        /* HERO TITLE SIZING */
        .hero-subtitle { font-size: 38px; }
        .hero-title { font-size: 110px; }

        @media (max-width: 1024px) {
          .top-bar { display: none !important; }
          .desktop-nav-center { display: none !important; }
          .desktop-button-right { display: none !important; }
          .mobile-toggle { display: flex !important; align-items: center; justify-content: center; z-index: 1002; cursor: pointer; }
          nav { height: 80px !important; }
          .logo-img { height: 55px !important; }
          .mobile-menu-overlay { display: flex; position: fixed; top: 80px; left: 0; width: 100%; height: calc(100vh - 80px); background-color: white; z-index: 999; flex-direction: column; overflow-y: auto; }
          .footer-container { flex-direction: column !important; text-align: center !important; gap: 30px !important; }
          .address-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 30px !important; }
          
          /* ENHANCED LOGO VISIBILITY FOR MOBILE */
          .process-badges-row { 
            justify-content: center !important; 
            flex-direction: column !important; 
            gap: 30px !important;
            align-items: center !important;
          }
          .process-badges-row img {
            height: auto !important;
            width: 90% !important;
            max-width: 350px !important;
            margin: 0 auto;
          }

          .company-col { text-align: center !important; display: flex; flex-direction: column; align-items: center; }
          .company-col img { width: 90% !important; max-width: 350px !important; margin: 0 auto !important; }
          
          /* SMALLER TEXT FOR MOBILE VIEW */
          .hero-subtitle { font-size: 22px !important; }
          .hero-title { font-size: 55px !important; }
          .carousel-container { height: 450px !important; }
          
          /* REMOVED CAROUSEL BUTTONS ON MOBILE */
          .carousel-btn { display: none !important; }
        }
        
        .nav-item { cursor: pointer; transition: 0.2s; color: #555; font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 4px; height: 100px; list-style: none; }
        .nav-item:hover { color: #356E6E !important; }
        
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; 
          background: rgba(255,255,255,0.2); backdrop-filter: blur(5px);
          color: white; border: none; border-radius: 50%; width: 50px; height: 50px; 
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-btn:hover { background: #356E6E; transform: translateY(-50%) scale(1.1); }

        .btn-green-main {
          background-color: white;
          color: #356E6E;
          border: none;
          padding: 12px 45px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .btn-green-main:hover { background-color: #356E6E; color: white; transform: scale(1.05); }

        .social-box { background-color: #356E6E; color: white; width: 38px; height: 38px; border-radius: 5px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .social-icon { color: white; cursor: pointer; font-size: 14px; transition: 0.2s; padding: 0 5px; }
      `}</style>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <div className="top-bar" style={{ backgroundColor: '#356E6E', color: 'white', height: '45px' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 20px' }}>
            <div style={{ display: 'flex', gap: '25px', fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> IND : +91 79 4032 7371</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> NZ : +64 212 788 915</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
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

      {/* --- CAROUSEL SECTION --- */}
      <div className="carousel-container" style={{ position: 'relative', width: '100%', height: '650px', backgroundColor: '#000', overflow: 'hidden' }}>
        {carouselData.map((slide, index) => (
          index === currentSlide && (
            <div key={`${index}-${currentSlide}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
              <div
                className="zoom-anim"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${slide.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 5
                }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: 10, width: '100%' }}>
                <div className="reveal-right-anim" style={{ animationDelay: '0.2s' }}>
                    <h2 className="hero-subtitle" style={{ fontWeight: '400', marginBottom: '5px' }}>Finding daytours from</h2>
                </div>
                <div className="reveal-right-anim" style={{ animationDelay: '0.6s' }}>
                    <h1 className="hero-title" style={{ fontFamily: '"Brush Script MT", cursive', margin: '0', paddingBottom: '10px', borderBottom: '2px solid rgba(255,255,255,0.6)', display: 'inline-block' }}>
                        {slide.title}
                    </h1>
                </div>
                <div className="fade-in-scale-anim" style={{ marginTop: '40px', animationDelay: '1.2s' }}>
                    <button className="btn-green-main">Explore More</button>
                </div>
              </div>
            </div>
          )
        ))}
        <button onClick={prevSlide} className="carousel-btn" style={{ left: '30px' }}><ChevronLeft size={30} /></button>
        <button onClick={nextSlide} className="carousel-btn" style={{ right: '30px' }}><ChevronRight size={30} /></button>
      </div>

      {/* FOOTER SECTION */}
      <footer style={{ borderTop: '1px dashed #ccc', paddingTop: '40px' }}>
        <div className="footer-container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '40px' }}>
          <div style={{ flex: '3' }}>
            <div style={{ color: '#356E6E', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Our Process</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="process-badges-row" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                <img src="/Footer2.png" alt="Economy Price" className="responsive-img" style={{ height: '95px', width: 'auto' }} />
                <img src="/process-2-1.png" className="responsive-img" style={{ height: '90px', width: 'auto' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }} className="process-badges-row">
                <img src="/footer-logo.png" alt="Aussie Specialist" className="responsive-img specialist-logo" style={{ height: '125px', width: 'auto' }} />
              </div>
            </div>
          </div>
          <div className="company-col" style={{ flex: '1', textAlign: 'right' }}>
            <div style={{ color: '#356E6E', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Our Companies</div>
            <img src="/pds_header_org.png" alt="Perfect Designing" className="responsive-img" style={{ width: '300px', height: 'auto', marginLeft: 'auto' }} />
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #ccc', marginTop: '40px', padding: '40px 0' }}>
            <div className="address-grid" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '12px' }}>India</div>
                  <div style={{ color: '#777', fontSize: '13.5px', lineHeight: '1.8' }}>AHMEDABAD<br/>601, Abhishree Avenue, Opp. Hanumanji Temple, Nr. Nehru Nagar Circle, Ahmedabad - 15, Gujarat</div>
                </div>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '12px' }}>New Zealand</div>
                  <div style={{ color: '#777', fontSize: '13.5px', lineHeight: '1.8' }}>AUCKLAND<br/>5, McGowan Street, Mt. Roskill, Auckland 1041.</div>
                </div>
                <div>
                  <div style={{ visibility: 'hidden' }}>Dunedin</div>
                  <div style={{ color: '#777', fontSize: '13.5px', lineHeight: '1.8' }}>DUNEDIN<br/>63-B, Royal Crescent, Saint Kilda, Dunedin 9012.</div>
                </div>
                <div>
                  <div style={{ visibility: 'hidden' }}>Queenstown</div>
                  <div style={{ color: '#777', fontSize: '13.5px', lineHeight: '1.8' }}>QUEENSTOWN<br/>9 Tewa Street, Frankton, Queenstown 9300.</div>
                </div>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '12px' }}>Australia</div>
                  <div style={{ color: '#777', fontSize: '13.5px', lineHeight: '1.8' }}>SYDNEY<br/>Llyod Street, Werrington, NSW 2747.</div>
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
            <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px' }}>TERMS & CONDITIONS | FAQS | PRIVACY POLICY</div>
            <div style={{ color: '#888', fontSize: '13px' }}>© 2014-2025, Freedom Tourism Ltd., All Rights Reserved</div>
        </div>
      </footer>
    </div>
  );
}

export default App;