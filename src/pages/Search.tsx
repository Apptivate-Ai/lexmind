import { useState } from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  ClearRefinements,
  Stats,
  Configure,
  Pagination
} from 'react-instantsearch-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

// Define the search result interface based on the schema
interface SearchResult {
  kanun_adi: string;
  kitap: string;
  kisim: string;
  bolum: string;
  ayirim: string;
  konu: string[];
  madde: string;
  icerik: string;
  doc_id: number;
}

// Modal component for displaying full article details
const DetailModal = ({ 
  isOpen, 
  onClose, 
  hit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  hit: SearchResult | null 
}) => {
  if (!isOpen || !hit) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid rgba(255, 214, 19, 0.2)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 214, 19, 0.1)',
            color: '#FFD613',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
        
        <div style={{ marginTop: '10px' }}>
          <h2 style={{
            fontFamily: 'Poppins',
            fontSize: '24px',
            color: '#FFD613',
            marginBottom: '1rem'
          }}>{hit.kanun_adi} - Madde {hit.madde}</h2>
          
          {hit.kitap && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#FFD613', fontFamily: 'Poppins', fontSize: '14px' }}>Kitap:</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '14px', marginLeft: '5px' }}>{hit.kitap}</span>
            </div>
          )}
          
          {hit.kisim && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#FFD613', fontFamily: 'Poppins', fontSize: '14px' }}>Kısım:</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '14px', marginLeft: '5px' }}>{hit.kisim}</span>
            </div>
          )}
          
          {hit.bolum && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#FFD613', fontFamily: 'Poppins', fontSize: '14px' }}>Bölüm:</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '14px', marginLeft: '5px' }}>{hit.bolum}</span>
            </div>
          )}
          
          {hit.ayirim && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#FFD613', fontFamily: 'Poppins', fontSize: '14px' }}>Ayırım:</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '14px', marginLeft: '5px' }}>{hit.ayirim}</span>
            </div>
          )}
          
          {hit.konu && hit.konu.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#FFD613', fontFamily: 'Poppins', fontSize: '14px' }}>Konu:</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'Poppins', fontSize: '14px', marginLeft: '5px' }}>{hit.konu.join(', ')}</span>
            </div>
          )}
          
          <div style={{ marginTop: '20px' }}>
            <h3 style={{
              fontFamily: 'Poppins',
              fontSize: '18px',
              color: '#FFD613',
              marginBottom: '10px'
            }}>Madde İçeriği</h3>
            <p style={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#FFFFFF',
              whiteSpace: 'pre-wrap'
            }}>{hit.icerik}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set up Typesense client
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'Lv5vBABZ9mIXI1rudI3Wx3FWLTj5kORg',
    nodes: [
      {
        host: 'search.hukukarama.com',
        port: 443,
        protocol: 'https',
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60,
  },
  additionalSearchParameters: {
    query_by: 'vec',
    exclude_fields: 'vec',
  },
});

// Set up Typesense client
const typesenseInstantsearchAdapter2 = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'Lv5vBABZ9mIXI1rudI3Wx3FWLTj5kORg',
    nodes: [
      {
        host: 'search.hukukarama.com',
        port: 443,
        protocol: 'https',
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60,
  },
  additionalSearchParameters: {
    query_by: 'kanun_adi,kitap,kisim,bolum,ayirim,konu,madde,icerik',
    exclude_fields: 'vec',
  },
});

var searchClient = typesenseInstantsearchAdapter.searchClient;

// Custom Hit component to render each search result
const Hit = ({ hit, onShowDetails }: { hit: SearchResult; onShowDetails: (hit: SearchResult) => void }) => {
  // Limit content to 200 characters
  const MAX_CONTENT_LENGTH = 200;
  const truncatedContent = hit.icerik.length > MAX_CONTENT_LENGTH 
    ? `${hit.icerik.substring(0, MAX_CONTENT_LENGTH)}...` 
    : hit.icerik;

  return (
    <div className="result-card" style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      border: '1px solid rgba(255, 214, 19, 0.1)'
    }}>
      <div className="result-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <h3 style={{
          fontFamily: 'Poppins',
          fontSize: '20px',
          color: '#FFD613',
          margin: 0
        }}>{hit.kanun_adi} - Madde {hit.madde}</h3>
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
        {hit.kanun_adi}
      </p>
      <p className="result-excerpt" style={{
        fontFamily: 'Poppins',
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#FFFFFF'
      }}>{truncatedContent}</p>
      <div className="result-footer" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem'
      }}>
        <button 
          className="read-more" 
          onClick={() => onShowDetails(hit)}
          style={{
            fontFamily: 'Poppins',
            fontSize: '14px',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: '#FFD613',
            color: '#000000',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          Detayları Gör
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const [searchType, setSearchType] = useState<'semantic' | 'direct'>('semantic');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHit, setSelectedHit] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = {
    'Kanun Türü': ['Borçlar Kanunu', 'İş Kanunu', 'Türk Ceza Kanunu', 'Medeni Kanun'],
    'Yargı Mercii': ['Yargıtay', 'Danıştay', 'Anayasa Mahkemesi'],
    'Tarih Aralığı': ['Son 1 Yıl', 'Son 5 Yıl', '5 Yıldan Eski'],
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    // Mobil görünümde filtreleri gösterirken body scroll'u engelle
    document.body.style.overflow = !showFilters ? 'hidden' : 'auto';
  };

  // Handle showing details in modal
  const handleShowDetails = (hit: SearchResult) => {
    setSelectedHit(hit);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Configure search parameters based on search type
  const getSearchParams = () => {
    if (searchType === 'semantic') {
      searchClient = typesenseInstantsearchAdapter.searchClient;
      return {
        q: searchQuery,
        query_by: 'vec',
        exclude_fields: 'vec'
      };
    } else {
      searchClient = typesenseInstantsearchAdapter2.searchClient;
      return {
        q: searchQuery,
        query_by: 'kanun_adi,kitap,kisim,bolum,ayirim,konu,madde,icerik',
        exclude_fields: 'vec'
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // API çağrısı burada yapılacak
    try {
      // API implementation
      console.log('Searching for:', searchQuery, 'with filters:', selectedFilters);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Hukuki Arama</h1>
        <p>
          Kanunlar, içtihatlar ve hukuki makaleler içerisinde arama yapın
        </p>
      </div>

      <button 
        className="mobile-filters-button"
        onClick={toggleFilters}
      >
        {showFilters ? 'Filtreleri Kapat' : 'Filtreleri Göster'}
        {showFilters ? <FaTimes /> : null}
      </button>

      <div className="search-interface">
        <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
          {Object.entries(filters).map(([category, options]) => (
            <div key={category} className="filter-section">
              <h4>{category}</h4>
              <div className="filter-list">
                {options.map(option => (
                  <label key={option} className="filter-item">
                    <div className={`filter-checkbox ${selectedFilters.includes(option) ? 'checked' : ''}`}>
                      {selectedFilters.includes(option) && '✓'}
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => handleFilterToggle(option)}
                      style={{ display: 'none' }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main>
          <form onSubmit={handleSubmit}>
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Aranacak kelime veya ifadeyi yazın..."
              />
            </div>
          </form>

          <div className="search-results">
            {/* Örnek sonuç kartları */}
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h3 className="result-title">Yargıtay 9. Hukuk Dairesi Kararı</h3>
                  <div className="result-meta">
                    <span>Karar No: 2023/1234</span>
                    <span>Tarih: 12.03.2023</span>
                  </div>
                </div>
                <p className="result-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="result-tags">
                  <span className="result-tag">İş Hukuku</span>
                  <span className="result-tag">Tazminat</span>
                  <span className="result-tag">Fesih</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      <DetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        hit={selectedHit} 
      />
    </div>
  );
};

export default Search; 