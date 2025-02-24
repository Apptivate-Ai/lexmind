import { useState } from 'react';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  type: 'yasa';
  source: string;
  relevance: number;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "Türk Borçlar Kanunu - Madde 299",
    excerpt: "Kira sözleşmesi, kiraya verenin bir şeyin kullanılmasını veya kullanmayla birlikte ondan yararlanılmasını kiracıya bırakmayı, kiracının da buna karşılık kararlaştırılan kira bedelini ödemeyi üstlendiği sözleşmedir.",
    type: 'yasa',
    source: 'Türk Borçlar Kanunu',
    relevance: 0.95
  },
  {
    id: 2,
    title: "Türk Ceza Kanunu - Madde 158",
    excerpt: "Dolandırıcılık suçunun; bilişim sistemlerinin, banka veya kredi kurumlarının araç olarak kullanılması suretiyle işlenmesi halinde üç yıldan on yıla kadar hapis ve beşbin güne kadar adlî para cezasına hükmolunur.",
    type: 'yasa',
    source: 'Türk Ceza Kanunu',
    relevance: 0.82
  }
];

const Search = () => {
  const [searchType, setSearchType] = useState<'semantic' | 'direct'>('semantic');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = MOCK_RESULTS.filter(result => 
        searchQuery === '' || 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="search-container">
      <div className="search-header" style={{
        padding: '3rem',
        background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          fontSize: '48px',
          lineHeight: 1.2,
          color: '#FFD613',
          marginBottom: '1rem'
        }}>Yasa Maddesi Ara</h1>
        <p style={{
          fontFamily: 'Poppins',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: 1.5,
          color: '#FFFFFF',
          opacity: 0.8,
          maxWidth: '800px',
          margin: '0 auto'
        }}>İcra ve İflas Kanunu, İdari Yargılama Usulü Kanunu, İş Kanunu, Sendikalar ve Toplu İş Sözleşmesi Kanunu, Türk Borçlar Kanunu, Türk Ceza Kanunu, Türk Medeni Kanunu ve Türk Ticaret Kanunu içinde arama yapın</p>
      </div>
      
      <div className="search-type-selector" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setSearchType('semantic')}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            background: searchType === 'semantic' ? '#FFD613' : 'rgba(255, 214, 19, 0.1)',
            color: searchType === 'semantic' ? '#000000' : '#FFD613',
            fontFamily: 'Poppins',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Olay/Durum Araması
        </button>
        <button
          onClick={() => setSearchType('direct')}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            border: 'none',
            background: searchType === 'direct' ? '#FFD613' : 'rgba(255, 214, 19, 0.1)',
            color: searchType === 'direct' ? '#000000' : '#FFD613',
            fontFamily: 'Poppins',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Doğrudan Madde Araması
        </button>
      </div>
      
      <div className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchType === 'semantic' ? 
              "Olay ya da durumu açıklayın (Örn: Kiracı evi zamanında boşaltmadı)" : 
              "Kanun adı veya madde numarası girin (Örn: TBK 299, İcra 24)"}
            style={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 214, 19, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF'
            }}
          />
          <button 
            className="search-button"
            onClick={handleSearch} 
            disabled={isLoading}
            style={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              padding: '1rem 2rem',
              borderRadius: '12px',
              border: 'none',
              background: '#FFD613',
              color: '#000000',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'Aranıyor...' : searchType === 'semantic' ? 'Olay/Durum Ara' : 'Madde Ara'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading" style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#FFD613',
          fontFamily: 'Poppins',
          fontSize: '18px'
        }}>Sonuçlar yükleniyor...</div>
      ) : searchResults.length > 0 ? (
        <div className="results-grid" style={{
          background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
          borderRadius: '30px',
          padding: '2rem',
          marginTop: '2rem'
        }}>
          {searchResults.map(result => (
            <div key={result.id} className="result-card" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 214, 19, 0.1)'
            }}>
              <div className="result-header">
                <h3 style={{
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  color: '#FFD613',
                  margin: 0
                }}>{result.title}</h3>
                <span className="type-tag" style={{
                  background: 'rgba(255, 214, 19, 0.1)',
                  color: '#FFD613',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'Poppins'
                }}>
                  Yasa
                </span>
              </div>
              <p className="result-source" style={{
                fontSize: '14px',
                color: '#FFD613',
                marginBottom: '8px',
                fontFamily: 'Poppins'
              }}>
                {result.source}
              </p>
              <p className="result-excerpt" style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#FFFFFF'
              }}>{result.excerpt}</p>
              <div className="result-footer">
                {searchType === 'semantic' && (
                  <span className="relevance" style={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    color: '#FFD613'
                  }}>Alaka Düzeyi: {(result.relevance * 100).toFixed(0)}%</span>
                )}
                <button className="read-more" style={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#FFD613',
                  color: '#000000',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}>Detayları Gör</button>
              </div>
            </div>
          ))}
        </div>
      ) : searchQuery && (
        <div className="no-results" style={{
          background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
          borderRadius: '30px',
          padding: '2rem',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontFamily: 'Poppins',
            fontSize: '24px',
            color: '#FFD613',
            marginBottom: '1rem'
          }}>Sonuç Bulunamadı</h3>
          <p style={{
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#FFFFFF',
            opacity: 0.8
          }}>Farklı anahtar kelimeler deneyebilirsiniz.</p>
        </div>
      )}
    </div>
  );
};

export default Search; 