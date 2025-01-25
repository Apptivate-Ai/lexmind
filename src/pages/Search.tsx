import { useState } from 'react';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  relevance: number;
}

const CATEGORIES = [
  'Tüm Konular',
  'İş Hukuku',
  'Aile Hukuku',
  'Ceza Hukuku',
  'Ticaret Hukuku',
  'Borçlar Hukuku'
];

const MOCK_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "İş Hukuku Danışmanlığı",
    excerpt: "İşveren ve çalışan hakları, iş sözleşmeleri, tazminat hesaplamaları ve işe iade davaları hakkında detaylı bilgi...",
    category: "İş Hukuku",
    relevance: 0.95
  },
  {
    id: 2,
    title: "Boşanma Süreci",
    excerpt: "Anlaşmalı ve çekişmeli boşanma süreçleri, nafaka hesaplamaları, velayet ve mal paylaşımı konularında hukuki rehber...",
    category: "Aile Hukuku",
    relevance: 0.88
  },
  {
    id: 3,
    title: "Ticari Sözleşmeler",
    excerpt: "Şirketler arası ticari sözleşmeler, ortaklık anlaşmaları ve ticari uyuşmazlıkların çözümü hakkında bilgiler...",
    category: "Ticaret Hukuku",
    relevance: 0.82
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tüm Konular');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = MOCK_RESULTS.filter(result => 
        (selectedCategory === 'Tüm Konular' || result.category === selectedCategory) &&
        (searchQuery === '' || 
         result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         result.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Hukuki Arama</h1>
        <p>Hukuki konularda arama yapın ve bilgi edinin</p>
      </div>
      
      <div className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hukuki konularda arama yapın..."
          />
          <button 
            className="search-button"
            onClick={handleSearch} 
            disabled={isLoading}
          >
            {isLoading ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>

        <div className="search-filters">
          <div className="category-filters">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Sonuçlar yükleniyor...</div>
      ) : searchResults.length > 0 ? (
        <div className="results-grid">
          {searchResults.map(result => (
            <div key={result.id} className="result-card">
              <div className="result-header">
                <h3>{result.title}</h3>
                <span className="category-tag">{result.category}</span>
              </div>
              <p className="result-excerpt">{result.excerpt}</p>
              <div className="result-footer">
                <span className="relevance">Alaka Düzeyi: {(result.relevance * 100).toFixed(0)}%</span>
                <button className="read-more">Detayları Gör</button>
              </div>
            </div>
          ))}
        </div>
      ) : searchQuery && (
        <div className="no-results">
          <h3>Sonuç Bulunamadı</h3>
          <p>Farklı anahtar kelimeler deneyebilir veya kategori seçiminizi değiştirebilirsiniz.</p>
        </div>
      )}
    </div>
  );
};

export default Search; 