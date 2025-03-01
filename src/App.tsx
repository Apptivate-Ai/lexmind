import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import './styles/AIChat.css';
import './styles/Search.css';
import './styles/Petition.css';
import './styles/Terms.css';
import heroImage from './assets/hero_image.png';
import logo from './assets/hukuk_arama_logo.png';

// Import components
import AIChat from './pages/AIChat';
import Search from './pages/Search';
import Petition from './pages/Petition';
import Terms from './pages/Terms';

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
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="Hukuk Arama Logo" />
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
                  <h1 className="hero-title">
                    Yapay Zeka Destekli Hukuk Süreç Destek Platformu
                  </h1>
                  <p className="hero-description">
                    Hukuki süreçlerinizde yapay zeka desteğiyle kolaylık sağlayın:
                  </p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        ⚖️
                      </div>
                      Hukuki olay ya da durum ile ilgili belirli kanunlar çerçevesinde yapay zeka analizi
                    </li>
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        🔍
                      </div>
                      Olay ya da durumla ilgili yapay zeka destekli kanun araması
                    </li>
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        📚
                      </div>
                      Doğrudan kanun araması
                    </li>
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        📝
                      </div>
                      Hukuki Olay ya da durumunuza özel yapay zekadan dilekçe oluşturma
                    </li>
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        🔎
                      </div>
                      Hukuki olay ya da durumla ilgili emsal kararları(içtihatları) yapay zeka destekli arama (Çok Yakında)
                    </li>
                    <li className="feature-item">
                      <div className="feature-item-icon">
                        📊
                      </div>
                      Hukuki olay ya da durum ile alakalı Emsal karara(içtihata) göre yapay zeka değerlendirmesi (Çok yakında)
                    </li>
                  </ul>
                  <div className="hero-buttons">
                    <Link to="/chat" className="primary-btn">Yapay Zekaya Olay/Durum Analizi Yaptır</Link>
                    <Link to="/search" className="secondary-btn">Olay/Durumla İlgili Kanun Ara/Doğrudan Kanun Ara</Link>
                  </div>
                </div>
                <div className="hero-image">
                  <img src={heroImage} alt="LexMind Hero" />
                </div>
              </section>

              <section className="features">
                <h2>Platform Özellikleri</h2>
                <div className="features-grid">
                  <Link to="/chat" className="feature-card">
                    <div className="feature-icon">⚖️</div>
                    <h3>Yapay Zeka Analizi</h3>
                    <p>Olay ve durumlarınızı kanunlar çerçevesinde yapay zeka ile analiz edin. Hukuki durumunuzla ilgili anında fikir alın.</p>
                  </Link>
                  
                  <Link to="/search" className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Akıllı Kanun Araması</h3>
                    <p>Yapay zeka destekli kanun araması ile konunuzla ilgili kanunlara hızlıca ulaşın.</p>
                  </Link>

                  <Link to="/search" className="feature-card">
                    <div className="feature-icon">📚</div>
                    <h3>Doğrudan Kanun Arama</h3>
                    <p>Kanun adı, madde numarası veya anahtar kelimelerle arama yaparak spesifik kanun maddelerini bulun.</p>
                  </Link>

                  <Link to="/petition" className="feature-card">
                    <div className="feature-icon">📝</div>
                    <h3>Dilekçe Oluşturucu</h3>
                    <p>Durumunuza uygun, kanunlara uygun profesyonel dilekçeleri yapay zeka ile hızlıca oluşturun.</p>
                  </Link>

                  <Link to="/chat" className="feature-card">
                    <div className="feature-icon">🔎</div>
                    <h3>Emsal Karar Araması</h3>
                    <p>Benzer davalar için emsal kararları bulun ve davanızı güçlendirin. (Çok Yakında)</p>
                  </Link>

                  <Link to="/chat" className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Emsal Değerlendirmesi</h3>
                    <p>Yapay zeka ile emsal kararlara göre davanızın başarı olasılığını değerlendirin. (Çok Yakında)</p>
                  </Link>
                </div>
              </section>

              <section className="promo-section">
                <div className="promo-container">
                  <div className="promo-badge">
                    Çok Yakında
                  </div>
                  <h2 className="promo-title">
                    Avukat Arama Sistemi
                  </h2>
                  <p className="promo-description">
                    Alanında uzman Avukatlara kolayca ulaşabileceğiniz sistemimize Avukat ön kayıt alımlarına başladık. Siz de hemen kayıt olun sistemde yerinizi alın!
                  </p>
                  <Link 
                    to="/contact" 
                    className="promo-button"
                  >
                    Ön Kayıt İçin İletişime Geçin
                    <span className="promo-button-arrow">→</span>
                  </Link>
                </div>
              </section>

              <footer className="footer">
                <div className="footer-content">
                  <div className="footer-section">
                    <h3>Hukuk Arama</h3>
                    <p>Yapay zeka destekli hukuki süreç destek platformu: Yapay zeka destekli olay/durum analizi, kanun/emsal karar arama ve yapay zeka destekli dilekçe oluşturma.</p>
                  </div>
                  <div className="footer-section">
                    <h3>Hızlı Linkler</h3>
                    <Link to="/">Ana Sayfa</Link>
                    <Link to="/chat">Analiz AI</Link>
                    <Link to="/search">Kanun Ara</Link>
                    <Link to="/petition">Dilekçe Oluştur</Link>
                    <Link to="/contact">İletişim</Link>
                    <Link to="/terms" style={{ color: '#FFFFFF' }}>Kullanım Koşulları ve Gizlilik</Link>
                  </div>
                  <div className="footer-section">
                    <h3>İletişim</h3>
                    <p>Email: hukukarama@lysmind.com</p>
                    <p>Tel: +90 (507) 683 78 50</p>
                    <p><small>© {new Date().getFullYear()} LysMind. Tüm sorumluluklar kullanıcıya aittir.</small></p>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; {new Date().getFullYear()} LysMind. Tüm hakları saklıdır. <Link to="/terms" style={{ color: '#FFFFFF' }}>Kullanım Koşulları ve Gizlilik</Link></p>
                </div>
              </footer>
            </>
          } />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/search" element={<Search />} />
          <Route path="/petition" element={<Petition />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={
            <section className="contact-page">
              <div className="contact-header">
                <h1>İletişime Geçin</h1>
                <p>İşbirlikleri ve avukat arama sistemine kayıt için bizimle iletişime geçmekten çekinmeyin. Size yardımcı olmaktan mutluluk duyarız.</p>
              </div>
              
              <div className="registration-container" style={{ 
                maxWidth: '800px', 
                margin: '0 auto 40px auto',
                background: 'linear-gradient(100.61deg, rgba(255, 214, 19, 0.1) 17.65%, rgba(142, 120, 13, 0.1) 57.89%)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 214, 19, 0.2)'
              }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  color: '#FFD613', 
                  marginBottom: '25px',
                  fontSize: '28px'
                }}>Avukat Arama Sistemine Kayıt</h2>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>1</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>E-posta adresimize mesaj gönderin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>2</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Konu kısmına "<strong>Avukat Arama Sistemi Kaydı</strong>" yazın.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>3</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Mesajınızda ad-soyad, baro sicil numarası ve uzmanlık alanlarınızı belirtin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>4</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>CV'nizi ve referanslarınızı (varsa) ekleyin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>5</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>48 saat içinde sizinle iletişime geçeceğiz.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="registration-container" style={{ 
                maxWidth: '800px', 
                margin: '0 auto 40px auto',
                background: 'linear-gradient(100.61deg, rgba(255, 214, 19, 0.1) 17.65%, rgba(142, 120, 13, 0.1) 57.89%)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid rgba(255, 214, 19, 0.2)'
              }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  color: '#FFD613', 
                  marginBottom: '25px',
                  fontSize: '28px'
                }}>Reklam ve İşbirliği</h2>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>1</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>E-posta adresimize mesaj gönderin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>2</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Konu kısmına "<strong>Reklam/İşbirliği Talebi</strong>" yazın.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>3</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Kurumunuz ve işbirliği öneriniz hakkında kısa bilgi verin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>4</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Telefon numaranızı ve müsait olduğunuz görüşme saatlerini belirtin.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>5</div>
                    <div>
                      <p style={{ fontSize: '17px' }}>Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-container">
                <div className="contact-info">
                  <div className="info-item">
                    <h3>E-posta</h3>
                    <p>hukukarama@lysmind.com</p>
                  </div>
                  <div className="info-item">
                    <h3>Telefon</h3>
                    <p>+90 (507) 683 78 50</p>
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
