import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import './styles/AIChat.css';
import './styles/Search.css';

// Import components
import AIChat from './pages/AIChat';
import Search from './pages/Search';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">
            <Link to="/">LexMind</Link>
          </div>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={isMenuOpen ? 'open' : ''}>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/chat">AI Chat</Link>
            <Link to="/search">Hukuki Arama</Link>
            <Link to="/contact" className="contact-btn">İletişim</Link>
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
                    Yapay Zeka Destekli Sistemimizde Hukuki Bilgiye Erişiminizi Kolaylaştırıyoruz
                  </h1>
                  <p style={{
                    fontSize: '24px',
                    color: '#fff',
                    marginBottom: '40px',
                    maxWidth: '600px'
                  }}>
                    Hadi hizmetlerimize göz atın
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'flex-start',
                    marginTop: '20px'
                  }}>
                    <Link to="/chat" className="primary-btn">AI Chat ile Başla</Link>
                    <Link to="/search" className="secondary-btn">Hukuki Arama</Link>
                  </div>
                </div>
              </section>

              <section className="features">
                <h2>Özelliklerimiz</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h3>AI Destekli Danışmanlık</h3>
                    <p>7/24 erişilebilir yapay zeka asistanımız ile anında hukuki danışmanlık alın.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Akıllı Hukuk Araması</h3>
                    <p>Gelişmiş arama algoritmaları ile hukuki kaynaklara hızlı erişim sağlayın.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📚</div>
                    <h3>Geniş Bilgi Bankası</h3>
                    <p>Güncel mevzuat ve içtihatlarla desteklenmiş kapsamlı hukuki veritabanı.</p>
                  </div>
                </div>
              </section>

              <section className="how-it-works">
                <h2>Nasıl Çalışır?</h2>
                <div className="steps-container">
                  <div className="step">
                    <div className="step-number">1</div>
                    <h3>Sorunuzu Sorun</h3>
                    <p>AI Chat üzerinden hukuki sorunuzu detaylı bir şekilde anlatın.</p>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <h3>AI Analizi</h3>
                    <p>Yapay zeka sistemi sorunuzu analiz eder ve ilgili hukuki kaynakları tarar.</p>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <h3>Çözüm Önerisi</h3>
                    <p>Size özel hazırlanmış hukuki çözüm önerilerini anında alın.</p>
                  </div>
                </div>
              </section>

              <section className="benefits">
                <h2>Neden LexMind?</h2>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <h3>Hızlı Çözüm</h3>
                    <p>Saniyeler içinde hukuki sorularınıza yanıt alın.</p>
                  </div>
                  <div className="benefit-card">
                    <h3>7/24 Erişim</h3>
                    <p>İstediğiniz zaman, istediğiniz yerden danışmanlık alın.</p>
                  </div>
                  <div className="benefit-card">
                    <h3>Maliyet Avantajı</h3>
                    <p>Uygun fiyatlarla profesyonel hukuki destek.</p>
                  </div>
                  <div className="benefit-card">
                    <h3>Güncel Bilgi</h3>
                    <p>Sürekli güncellenen hukuki veritabanı.</p>
                  </div>
                </div>
              </section>

              <section className="cta">
                <h2>Hukuki Yardıma mı İhtiyacınız Var?</h2>
                <p>LexMind AI ile hemen çözüme başlayın.</p>
                <Link to="/chat" className="cta-button">Ücretsiz Deneyin</Link>
              </section>

              <footer className="footer">
                <div className="footer-content">
                  <div className="footer-section">
                    <h3>LexMind</h3>
                    <p>Yapay zeka destekli hukuki danışmanlık platformu.</p>
                  </div>
                  <div className="footer-section">
                    <h3>Hızlı Linkler</h3>
                    <Link to="/">Ana Sayfa</Link>
                    <Link to="/chat">AI Chat</Link>
                    <Link to="/search">Hukuki Arama</Link>
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
