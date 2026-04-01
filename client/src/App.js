import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, MapPin, Search, ThumbsUp, Compass } from 'lucide-react'; 

// --- NEW COMPONENT FOR REAL TIME COUNTING ---
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count.toLocaleString()} +</span>;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- Carousel State & Logic ---
  const [carouselData] = useState([
    { img: "/DT_Auckland.jpg", title: "Auckland ?" },
    { img: "/DT_Christchurch.jpg", title: "Christchurch ?" },
    { img: "/DT_Queenstown.jpg", title: "Queenstown ?" }
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(slideInterval);
  }, [carouselData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  
  // Helper for smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const dropdownItemStyle = {
    padding: '12px 20px',
    color: '#777',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: '0.2s',
    display: 'block',
    textDecoration: 'none'
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

        .hero-subtitle { font-size: 38px; }
        .hero-title { font-size: 110px; }

        .social-icon { cursor: pointer; transition: opacity 0.2s; font-size: 14px; }
        .social-icon:hover { opacity: 0.7; }

        .social-box {
          width: 35px;
          height: 35px;
          border: 1px solid #ddd;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #356E6E;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .social-box:hover {
          background-color: #356E6E;
          color: white;
          border-color: #356E6E;
        }

        .call-badge {
          text-decoration: none;
          position: absolute; 
          bottom: 40px; 
          left: 30px;
          background-color: white; 
          padding: 15px 25px; 
          border-radius: 12px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 10;
          transition: transform 0.3s ease;
        }
        .call-badge:hover { transform: translateY(-5px); }

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
          .process-badges-row { justify-content: center !important; flex-direction: column !important; gap: 20px !important; align-items: center !important; }
          .process-badges-row img { height: auto !important; width: 80% !important; max-width: 280px !important; margin: 0 auto; }
          .company-col { text-align: center !important; display: flex; flex-direction: column; align-items: center; }
          .company-col img { width: 80% !important; max-width: 280px !important; margin: 0 auto !important; }
          .hero-subtitle { font-size: 22px !important; }
          .hero-title { font-size: 55px !important; }
          .carousel-container { height: 450px !important; }
          .carousel-btn { display: none !important; }
          .plan-section-container { flex-direction: column !important; text-align: center !important; padding: 40px 20px !important; margin: 50px auto !important; }
          .plan-image-wrapper { width: 100% !important; }
          .plan-content-wrapper { width: 100% !important; margin-top: 40px !important; }
          .plan-check-item { justify-content: center !important; }
          .features-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .feature-card { border-radius: 10px !important; }
          .counter-divider { display: none; }
          .counter-item { width: 100% !important; border-bottom: 1px solid #eee; }
          .specialize-row { flex-direction: column !important; }
          .specialize-text-side { padding: 40px 20px !important; text-align: center !important; }
        }
        
        .nav-item { cursor: pointer; transition: 0.2s; color: #555; font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 4px; height: 100px; list-style: none; position: relative; }
        .nav-item:hover { color: #356E6E !important; }
        .nav-item::after { content: ''; position: absolute; bottom: 30px; left: 0; width: 0; height: 2px; background: #356E6E; transition: width 0.3s; }
        .nav-item:hover::after { width: 100%; }
        
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

        .feature-card {
            padding: 50px 25px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white; 
            color: #264F4F;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            border: 1px solid #f0f0f0;
        }

        .feature-card:hover {
            transform: translateY(-15px);
            background-color: #4A7677;
            box-shadow: 0 15px 35px rgba(53, 110, 110, 0.3);
        }

        .feature-card h3 {
            color: #264F4F;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            line-height: 1.3;
            transition: color 0.3s ease;
        }

        .feature-card p {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
            transition: color 0.3s ease;
        }

        .feature-icon {
            color: #356E6E;
            margin-bottom: 25px;
            transition: color 0.3s ease, transform 0.3s ease;
        }

        .feature-card:hover h3, 
        .feature-card:hover p, 
        .feature-card:hover .feature-icon {
            color: white !important;
        }
        
        .feature-card:hover .feature-icon {
            transform: scale(1.1);
        }

        .search-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(38, 79, 79, 0.95); z-index: 2000;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 20px; transition: all 0.3s ease;
        }

        @keyframes subtleScaleIn {
          0% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animated-specialize-img {
          animation: subtleScaleIn 1.5s cubic-bezier(0.19, 1, 0.22, 1) both;
        }
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
              <span style={{ fontWeight: '900', fontSize: '14px', cursor: 'pointer', padding: '0 5px' }} className="social-icon">X</span>
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
              <img src="/logo.png" className="logo-img" alt="Freedom Logo" style={{ height: '75px', display: 'block', cursor: 'pointer' }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} />
            </div>
            <div className="desktop-nav-center" style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <ul style={{ display: 'flex', gap: '35px', margin: 0, padding: 0 }}>
                <li className="nav-item" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</li>
                <li className="nav-item">Van Rentals</li>
                <li className="nav-item" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} style={{ position: 'relative' }}>
                  Day Tours <ChevronDown size={14} />
                  {isDropdownOpen && (
                    <div style={{ position: 'absolute', top: '100px', left: '0', backgroundColor: 'white', minWidth: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '6px', padding: '5px 0', zIndex: 1001, borderTop: '3px solid #356E6E' }}>
                      <div className="dropdown-link" style={dropdownItemStyle}>Auckland</div>
                      <div style={separatorStyle}></div>
                      <div className="dropdown-link" style={dropdownItemStyle}>Christchurch</div>
                      <div style={separatorStyle}></div>
                      <div className="dropdown-link" style={dropdownItemStyle}>Queenstown</div>
                    </div>
                  )}
                </li>
                <li className="nav-item" onClick={() => scrollToSection('contact-footer')}>Contact</li>              </ul>
            </div>
            <div className="desktop-button-right" style={{ flex: '0 0 auto' }}>
              <a href="https://drive.google.com/file/d/1u3w4y27UTtw0mUe0WI3cj0VrC-v5Ju4i/view" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#264F4F', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
                  Download Day Tours
                </button>
              </a>
            </div>
            <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={35} color="#264F4F" /> : <Menu size={35} color="#264F4F" />}
            </div>
          </div>
          {isMenuOpen && (
            <div className="mobile-menu-overlay">
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }} onClick={() => { setIsMenuOpen(false); window.scrollTo(0,0); }}>Home</div>
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
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600' }} onClick={() => scrollToSection('contact-footer')}>Contact</div>
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', fontWeight: '600', color: '#356E6E' }} onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}>Search Tours</div>
            </div>
          )}
        </nav>
      </header>

      {/* --- SECTION 1: CAROUSEL --- */}
      <div className="carousel-container" style={{ position: 'relative', width: '100%', height: '650px', backgroundColor: '#000', overflow: 'hidden' }}>
        {carouselData.map((slide, index) => (
          index === currentSlide && (
            <div key={currentSlide} style={{ width: '100%', height: '100%', position: 'relative' }}>
              <div
                className="zoom-anim"
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${slide.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 5
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
        <button onClick={prevSlide} className="carousel-btn" style={{ left: '30px' }} aria-label="Previous slide"><ChevronLeft size={30} /></button>
        <button onClick={nextSlide} className="carousel-btn" style={{ right: '30px' }} aria-label="Next slide"><ChevronRight size={30} /></button>
      </div>

      {/* --- SECTION 2: PLAN YOUR TRIP --- */}
      <div id="plan-trip" className="plan-section-container" style={{ display: 'flex', maxWidth: '1200px', margin: '100px auto', padding: '0 20px', gap: '60px', alignItems: 'center' }}>
        <div className="plan-image-wrapper" style={{ flex: '1', position: 'relative' }}>
          <img src="/tour-11-768x539.jpg" alt="New Zealand Day Tour" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'block' }} />
          
          <a href="tel:+64212788915" className="call-badge">
            <div style={{ backgroundColor: '#F0F8F8', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={22} color="#356E6E" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: '#8E9999', fontWeight: '700', letterSpacing: '1px' }}>BOOK TOUR NOW</p>
              <p style={{ margin: 0, fontSize: '20px', color: '#264F4F', fontWeight: '800' }}>+64 212 788 915</p>
            </div>
          </a>
        </div>

        <div className="plan-content-wrapper" style={{ flex: '1' }}>
          <p style={{ fontFamily: '"Brush Script MT", cursive', color: '#356E6E', fontSize: '34px', margin: '0' }}>Get to know us</p>
          <h2 style={{ fontSize: '52px', color: '#264F4F', margin: '10px 0 25px 0', lineHeight: '1.1', fontWeight: '800' }}>Plan Your Trip with Freedom</h2>
          <p style={{ color: '#666', lineHeight: '1.8', fontSize: '17px', marginBottom: '35px' }}>
            We provide specialized day tours across New Zealand's most beautiful landscapes. Our expertise ensures you experience the heart of every destination with comfort and ease.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '45px' }}>
            <div className="plan-check-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#264F4F', fontWeight: '600', fontSize: '16px' }}>
              <CheckCircle2 size={22} color="#356E6E" /> Professional Local Guides
            </div>
            <div className="plan-check-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#264F4F', fontWeight: '600', fontSize: '16px' }}>
              <CheckCircle2 size={22} color="#356E6E" /> Customized Itineraries
            </div>
            <div className="plan-check-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#264F4F', fontWeight: '600', fontSize: '16px' }}>
              <CheckCircle2 size={22} color="#356E6E" /> Premium Transport Vehicles
            </div>
          </div>
          <button style={{ backgroundColor: '#356E6E', color: 'white', border: 'none', padding: '20px 45px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: '0.3s', boxShadow: '0 10px 20px rgba(53, 110, 110, 0.2)' }}>
            BOOK WITH US NOW
          </button>
        </div>
      </div>

      {/* --- SECTION 3: FEATURES GRID --- */}
      <div style={{ backgroundColor: '#F8F9FA', padding: '100px 0' }}>
        <div className="features-grid" style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '25px', 
            padding: '0 20px' 
        }}>
          
          <div className="feature-card">
            <MapPin size={44} className="feature-icon" />
            <h3>Choose<br/>Destinations</h3>
            <p>Discover a world of breathtaking locations, from vibrant cities to serene natural escapes.</p>
          </div>

          <div className="feature-card">
            <Search size={44} className="feature-icon" />
            <h3>Find What You<br/>Want</h3>
            <p>Explore Auckland's hidden gems, iconic landmarks, and must-visit attractions tailored to your interests.</p>
          </div>

          <div className="feature-card">
            <ThumbsUp size={44} className="feature-icon" />
            <h3>Select the Best<br/>Place</h3>
            <p>From stunning beaches to cultural hotspots, find the perfect destination for your next adventure.</p>
          </div>

          <div className="feature-card">
            <Compass size={44} className="feature-icon" />
            <h3>Go Out & Explore<br/>Now</h3>
            <p>Unforgettable journey and experience the beauty and excitement of Auckland today!</p>
          </div>

        </div>
      </div>

      {/* --- COUNTER SECTION --- */}
      <div style={{ padding: '80px 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div className="counter-item" style={{ flex: '1', textAlign: 'center', padding: '20px', minWidth: '200px' }}>
            <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '48px', color: '#4A7677', marginBottom: '5px' }}>
              <AnimatedCounter target={4000} />
            </div>
            <div style={{ fontSize: '16px', color: '#777', fontWeight: '500' }}>Successful Tours</div>
          </div>

          <div className="counter-divider" style={{ width: '1px', height: '70px', backgroundColor: '#ddd' }}></div>

          <div className="counter-item" style={{ flex: '1', textAlign: 'center', padding: '20px', minWidth: '200px' }}>
            <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '48px', color: '#4A7677', marginBottom: '5px' }}>
              <AnimatedCounter target={5000} />
            </div>
            <div style={{ fontSize: '16px', color: '#777', fontWeight: '500' }}>Travel Agents</div>
          </div>

          <div className="counter-divider" style={{ width: '1px', height: '70px', backgroundColor: '#ddd' }}></div>

          <div className="counter-item" style={{ flex: '1', textAlign: 'center', padding: '20px', minWidth: '200px' }}>
            <div style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '48px', color: '#4A7677', marginBottom: '5px' }}>
              <AnimatedCounter target={14000} />
            </div>
            <div style={{ fontSize: '16px', color: '#777', fontWeight: '500' }}>Happy People</div>
          </div>

        </div>
      </div>

      {/* --- SECTION: SPECIALIZES IN DAY TOURS (MOVED ABOVE FOOTER) --- */}
      <div style={{ backgroundColor: '#fff', overflow: 'hidden', paddingBottom: '80px' }}>
        <div className="specialize-row" style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F8F8' }}>
            <div style={{ maxWidth: '400px', overflow: 'hidden', borderRadius: '20px' }}>
              <img 
                src="/tour-17.jpg" 
                alt="Freedom Specialist" 
                className="animated-specialize-img"
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </div>
          <div className="specialize-text-side" style={{ flex: '1', padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Brush Script MT", cursive', color: '#356E6E', fontSize: '32px', margin: '0 0 10px 0' }}>Freedom Tourism Limited</p>
            <h2 style={{ fontSize: '48px', color: '#264F4F', margin: '0 0 25px 0', lineHeight: '1.2', fontWeight: '800' }}>Specializes in Daytours From Auckland</h2>
            <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', maxWidth: '500px', margin: 0, textTransform: 'uppercase', fontWeight: '600' }}>
              One of the Largest New Zealand Based IBOs, Expert in "INDIAN FRIENDS & FAMILY GROUP TOURS".
            </p>
          </div>
        </div>
      </div>
      <section style={{
        backgroundColor: '#356363',
        backgroundImage: 'linear-gradient(rgba(53, 99, 99, 0.8), rgba(53, 99, 99, 0.8)), url("https://www.transparenttextures.com/patterns/topography.png")',
        padding: '60px 20px',
        color: 'white',
        width: '100%',
        boxSizing: 'border-box'
      }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '30px'
      }}>
      <div style={{ textAlign: 'left' }}>
      <p style={{ 
        fontFamily: '"Brush Script MT", cursive', 
        fontSize: '28px', 
        margin: '0',
        fontWeight: 'normal'
      }}>
        Plan your trip with us
      </p>
      <h3 style={{ 
        fontSize: 'clamp(24px, 4vw, 40px)', 
        margin: '5px 0 0 0', 
        fontWeight: 'bold',
        letterSpacing: '0.5px'
      }}>
        Ready for an unforgettable tour?
      </h3>
    </div>

    <button style={{
      backgroundColor: '#4db5b5',
      color: 'white',
      border: 'none',
      padding: '15px 35px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textTransform: 'uppercase',
      transition: 'background-color 0.3s ease'
    }}>
      BOOK TOUR NOW
    </button>
  </div>

  {/* Responsive Style Helper */}
  <style dangerouslySetInnerHTML={{ __html: `
    @media (max-width: 768px) {
      section div { justify-content: center !important; text-align: center !important; }
      button { width: 100%; max-width: 320px; }
    }
  `}} />
  </section>
      {/* FOOTER SECTION */}
      <footer id="contact-footer" style={{ borderTop: '1px dashed #ccc', paddingTop: '60px', backgroundColor: '#fff' }}>
        <div className="footer-container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: '1' }}>
            <div style={{ color: '#356E6E', fontWeight: 'bold', fontSize: '18px', marginBottom: '25px', letterSpacing: '1px' }}>OUR PROCESS</div>
            <div className="process-badges-row" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src="/Footer2.png" alt="Economy Price" className="responsive-img" style={{ height: '80px', width: 'auto' }} />
              <img src="/process-2-1.png" alt="Process" className="responsive-img" style={{ height: '80px', width: 'auto' }} />
              <img src="/footer-logo.png" alt="Aussie Specialist" className="responsive-img" style={{ height: '100px', width: 'auto' }} />
            </div>
          </div>
          
          <div className="company-col" style={{ flex: '0 0 auto', textAlign: 'right' }}>
            <div style={{ color: '#356E6E', fontWeight: 'bold', fontSize: '18px', marginBottom: '25px', letterSpacing: '1px' }}>OUR COMPANIES</div>
            <img src="/pds_header_org.png" alt="Perfect Designing" className="responsive-img" style={{ width: '280px', height: 'auto', marginLeft: 'auto' }} />
          </div>
        </div>

        <div style={{ borderTop: '1px dashed #ccc', marginTop: '60px', padding: '50px 0' }}>
            <div className="address-grid" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '30px' }}>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>INDIA</div>
                  <div style={{ color: '#777', fontSize: '13px', lineHeight: '1.8' }}><strong>AHMEDABAD</strong><br/>601, Abhishree Avenue, Opp. Hanumanji Temple, Nr. Nehru Nagar Circle, Ahmedabad - 15, Gujarat</div>
                </div>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>NEW ZEALAND</div>
                  <div style={{ color: '#777', fontSize: '13px', lineHeight: '1.8' }}><strong>AUCKLAND</strong><br/>5, McGowan Street, Mt. Roskill, Auckland 1041.</div>
                </div>
                <div>
                  <div style={{ visibility: 'hidden', marginBottom: '15px' }}>.</div>
                  <div style={{ color: '#777', fontSize: '13px', lineHeight: '1.8' }}><strong>DUNEDIN</strong><br/>63-B, Royal Crescent, Saint Kilda, Dunedin 9012.</div>
                </div>
                <div>
                  <div style={{ visibility: 'hidden', marginBottom: '15px' }}>.</div>
                  <div style={{ color: '#777', fontSize: '13px', lineHeight: '1.8' }}><strong>QUEENSTOWN</strong><br/>9 Tewa Street, Frankton, Queenstown 9300.</div>
                </div>
                <div>
                  <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>AUSTRALIA</div>
                  <div style={{ color: '#777', fontSize: '13px', lineHeight: '1.8' }}><strong>SYDNEY</strong><br/>Llyod Street, Werrington, NSW 2747.</div>
                </div>
            </div>
        </div>

        <div style={{ backgroundColor: '#fdfdfd', borderTop: '1px solid #eee', padding: '40px 0', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
                {['facebook-f', 'instagram', 'youtube', 'linkedin-in'].map(icon => (
                    <div key={icon} className="social-box"><i className={`fa-brands fa-${icon}`}></i></div>
                ))}
                <div className="social-box"><span style={{ fontWeight: 'bold', fontSize: '14px' }}>X</span></div>
                <div className="social-box"><i className="fa-brands fa-pinterest"></i></div>
            </div>
            <div style={{ color: '#356E6E', fontWeight: 'bold', marginBottom: '15px', fontSize: '12px', letterSpacing: '1px', cursor: 'pointer' }}>
              TERMS & CONDITIONS &nbsp; | &nbsp; FAQS &nbsp; | &nbsp; PRIVACY POLICY
            </div>
            <div style={{ color: '#aaa', fontSize: '12px' }}>© 2014-2026 Freedom Tourism Ltd. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;