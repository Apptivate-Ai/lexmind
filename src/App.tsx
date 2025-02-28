import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import './styles/AIChat.css';
import './styles/Search.css';
import './styles/Petition.css';
import heroImage from './assets/hero_image.png';
import logo from './assets/hukuk_arama_logo.png';

// Import components
import AIChat from './pages/AIChat';
import Search from './pages/Search';
import Petition from './pages/Petition';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={closeMenu}>
              <img src={logo} alt="Hukuk Arama Logo" style={{ height: '60px', width: 'auto' }} />
            </Link>
          </div>
          
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menüyü aç/kapat"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeMenu}>Ana Sayfa</Link>
            <Link to="/chat" onClick={closeMenu}>Analiz AI</Link>
            <Link to="/search" onClick={closeMenu}>Kanun Ara</Link>
            <Link to="/petition" onClick={closeMenu}>Dilekçe Oluştur</Link>
            <Link to="/contact" className="contact-btn" onClick={closeMenu}>İletişim</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <section className="hero">
                <div className="hero-content">
                  <h1 style={{
                    fontSize: '48px',
                    fontWeight: '600',
                    color: '#FFD613',
                    marginBottom: '24px',
                    maxWidth: '800px',
                    lineHeight: '1.2'
                  }}>
                    Yapay Zeka Destekli Hukuk Analizi ve Arama Platformu
                  </h1>
                  <p style={{
                    fontSize: '24px',
                    color: '#fff',
                    marginBottom: '20px',
                    maxWidth: '1020px',
                    textAlign: 'left'
                  }}>
                    Hukuki sorunlarınız için yapay zeka desteği ile çözüm bulun
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    marginBottom: '40px'
                  }}>
                    <li style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        ⚖️
                      </div>
                      İstediğiniz olay ya da durum ile alakalı kanunlara göre yapay zeka analizi alabilirsiniz
                    </li>
                    <li style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        🔍
                      </div>
                      Olay ya da durumla ilgili yapay zeka destekli kanun araması yapabilirsiniz
                    </li>
                    <li style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        📚
                      </div>
                      Doğrudan kanun araması yapabilirsiniz
                    </li>
                    <li style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        📝
                      </div>
                      Durumunuza özel yapay zekadan dilekçe oluşturabilirsiniz
                    </li>
                    <li style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        🔎
                      </div>
                      Olayınızla ilgili emsal kararları(içtihatları) yapay zeka destekli aramayla ulaşabilirsiniz (Çok Yakında)
                    </li>
                    <li style={{
                      marginBottom: '0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      background: 'rgba(255, 214, 19, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        minWidth: '32px',
                        height: '32px',
                        background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        📊
                      </div>
                      Olay ya da durum ile alakalı Emsal karara(içtihata) göre yapay zeka değerlendirmesi alabilirsiniz (Çok yakında)
                    </li>
                  </ul>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'flex-start',
                    marginTop: '20px'
                  }}>
                    <Link to="/chat" className="primary-btn">Yapay Zekaya Olay/Durum Analizi Yaptır</Link>
                    <Link to="/search" className="secondary-btn">Olay/Durumla İlgili Kanun Ara/Doğrudan Kanun Ara</Link>
                  </div>
                </div>
                <div className="hero-image">
                  <img src={heroImage} alt="LexMind Hero" style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }} />
                </div>
              </section>

              <section className="features">
                <h2>Platform Özellikleri</h2>
                <div className="features-grid" style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                  maxWidth: '1200px',
                  margin: '0 auto',
                  padding: '20px'
                }}>
                  <Link to="/chat" className="feature-card" style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="feature-icon">⚖️</div>
                    <h3>Yapay Zeka Analizi</h3>
                    <p>Olay ve durumlarınızı kanunlar çerçevesinde yapay zeka ile analiz edin. Hukuki değerlendirmeleri anında alın.</p>
                  </Link>
                  
                  <Link to="/search" className="feature-card" style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="feature-icon">🔍</div>
                    <h3>Akıllı Kanun Araması</h3>
                    <p>Yapay zeka destekli kanun araması ile konunuzla ilgili tüm yasal düzenlemelere hızlıca ulaşın.</p>
                  </Link>

                  <Link to="/search" className="feature-card" style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="feature-icon">📚</div>
                    <h3>Doğrudan Kanun Arama</h3>
                    <p>Tüm kanun ve mevzuat içeriklerinde arama yapın. İhtiyacınız olan yasal düzenlemeleri kolayca bulun.</p>
                  </Link>

                  <Link to="/petition" className="feature-card" style={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="feature-icon">📝</div>
                    <h3>Dilekçe Oluşturma</h3>
                    <p>Yapay zeka ile durumunuza özel profesyonel dilekçeler oluşturun. Hukuki taleplerinizi etkili bir şekilde ifade edin.</p>
                  </Link>

                  <div className="feature-card" style={{
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    opacity: '0.8',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#FFD613',
                      color: '#000',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>Çok Yakında</div>
                    <div className="feature-icon">🔎</div>
                    <h3>Emsal Karar Arama</h3>
                    <p>Yapay zeka destekli içtihat araması ile konunuzla ilgili tüm emsal kararlara kolayca ulaşın.</p>
                  </div>

                  <div className="feature-card" style={{
                    color: 'inherit',
                    background: 'rgba(255, 214, 19, 0.05)',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 214, 19, 0.1)',
                    opacity: '0.8',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#FFD613',
                      color: '#000',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>Çok Yakında</div>
                    <div className="feature-icon">📊</div>
                    <h3>İçtihat Analizi</h3>
                    <p>Olay ve durumlarınızı emsal kararlar çerçevesinde yapay zeka ile analiz edin. Benzer davalardaki sonuçları inceleyin.</p>
                  </div>
                </div>
              </section>

              <section style={{
                background: 'linear-gradient(100.61deg, rgba(255, 214, 19, 0.1) 17.65%, rgba(142, 120, 13, 0.1) 57.89%)',
                padding: '60px 20px',
                textAlign: 'center',
                borderRadius: '24px',
                margin: '40px auto',
                maxWidth: '1200px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}>
                  <div style={{
                    background: '#FFD613',
                    color: '#000',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Çok Yakında
                  </div>
                  <h2 style={{
                    fontSize: '36px',
                    color: '#FFD613',
                    marginBottom: '16px'
                  }}>
                    Hukukçu Arama Sistemi
                  </h2>
                  <p style={{
                    fontSize: '20px',
                    color: '#FFFFFF',
                    maxWidth: '800px',
                    marginBottom: '32px'
                  }}>
                    Alanında uzman hukukçulara kolayca ulaşabileceğiniz sistemimiz için ön kayıt alımlarına başladık.
                  </p>
                  <Link 
                    to="/contact" 
                    style={{
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
                      padding: '16px 32px',
                      borderRadius: '30px',
                      color: '#000000',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: '500',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Ön Kayıt İçin İletişime Geç
                    <span style={{ fontSize: '24px' }}>→</span>
                  </Link>
                </div>
              </section>

              <footer className="footer">
                <div className="footer-content">
                  <div className="footer-section">
                    <h3>Hukuk Arama</h3>
                    <p>Yapay zeka destekli hukuki analiz ve arama platformu.</p>
                  </div>
                  <div className="footer-section">
                    <h3>Hızlı Linkler</h3>
                    <Link to="/">Ana Sayfa</Link>
                    <Link to="/chat">Analiz AI</Link>
                    <Link to="/search">Kanun Ara</Link>
                    <Link to="/petition">Dilekçe Oluştur</Link>
                    <Link to="/contact">İletişim</Link>
                  </div>
                  <div className="footer-section">
                    <h3>İletişim</h3>
                    <p>Email: info@lexmind.com</p>
                    <p>Tel: +90 (212) XXX XX XX</p>
                    <p>Adres: Maslak, İstanbul</p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; {new Date().getFullYear()} LexMind. Tüm hakları saklıdır.</p>
                </div>
              </footer>
            </>
          } />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/search" element={<Search />} />
          <Route path="/petition" element={<Petition />} />
          <Route path="/contact" element={
            <section className="contact-page">
              <div className="contact-header">
                <h1>İletişime Geçin</h1>
                <p>Hukuki süreçlerinizi yapay zeka ile optimize etmek için bizimle iletişime geçin.</p>
              </div>
              <div className="contact-container">
                <form className="contact-form">
                  <input type="text" placeholder="Adınız Soyadınız" required />
                  <input type="email" placeholder="E-posta Adresiniz" required />
                  <textarea placeholder="Mesajınız" required></textarea>
                  <button type="submit" className="submit-button">Gönder</button>
                </form>
                <div className="contact-info">
                  <div className="info-item">
                    <h3>E-posta</h3>
                    <p>info@lexmind.com</p>
                  </div>
                  <div className="info-item">
                    <h3>Telefon</h3>
                    <p>+90 (212) XXX XX XX</p>
                  </div>
                  <div className="info-item">
                    <h3>Adres</h3>
                    <p>Maslak, İstanbul</p>
                  </div>
                </div>
              </div>
            </section>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
