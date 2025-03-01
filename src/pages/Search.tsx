import { useState, useEffect } from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Stats,
  Configure,
  Pagination
} from 'react-instantsearch-dom';
import { FaSearch } from 'react-icons/fa';

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
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif'
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
    apiKey: 'xyz123',
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


// Set up Typesense client
const typesenseInstantsearchAdapter2 = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz123',
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
const typesenseInstantsearchAdapter3 = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz123',
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
    query_by: 'kanun_adi,kitap,kisim,bolum,ayirim,konu,madde,icerik,vec',
    exclude_fields: 'vec',
  },
});

interface SearchRequest {
  indexName: string;
  params: {
    query?: string;
    page?: number;
    hitsPerPage?: number;
    [key: string]: any;
  };
}

interface SearchResponse {
  results: Array<{
    hits: any[];
    nbHits: number;
    nbPages: number;
    page: number;
    processingTimeMS: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    query: string;
    params: string;
  }>;
}

type SearchType = 'hybrid' | 'semantic' | 'textual';

const Search = () => {
  const [selectedHit, setSelectedHit] = useState<SearchResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<SearchType>('hybrid');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const getSearchClient = (type: SearchType) => {
    switch (type) {
      case 'textual':
        return typesenseInstantsearchAdapter.searchClient;
      case 'semantic':
        return typesenseInstantsearchAdapter2.searchClient;
      case 'hybrid':
      default:
        return typesenseInstantsearchAdapter3.searchClient;
    }
  };

  const searchClient = {
    ...getSearchClient(searchType),
    search(requests: SearchRequest[]) {
      console.log('Search requests:', requests); // Debug log
      return getSearchClient(searchType)
        .search(requests)
        .then((response: SearchResponse) => {
          console.log('Search response:', response); // Debug log
          return response;
        })
        .catch((error: Error) => {
          console.error('Search error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            requests
          });

          const errorMessage = `Arama servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin. (${error.message})`;
          setSearchError(errorMessage);

          return {
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
              hitsPerPage: 0,
              exhaustiveNbHits: true,
              query: '',
              params: '',
            })),
          };
        });
    },
  };

  // Add useEffect to check Typesense connection on component mount
  useEffect(() => {
    // Test the connection by making a simple search
    searchClient.search([{
      indexName: 'turk-kanunlari',
      params: {
        q: '',
        hitsPerPage: 1
      }
    }]).catch((error: Error) => {
      console.error('Initial connection test failed:', error);
      setSearchError('Arama servisi bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.');
    });
  }, []);

  const handleShowDetails = (hit: SearchResult) => {
    setSelectedHit(hit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const CustomSearchBox = () => (
    <div className="search-box-container">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <SearchBox
          translations={{
            placeholder: 'Aranacak kelime veya ifadeyi yazın...',
          }}
          submit={<></>}
          reset={<></>}
          loadingIndicator={<></>}
          searchAsYouType={true}
        />
      </div>
      <div className="search-type-selector">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 214, 19, 0.3)',
            cursor: 'pointer'
          }}
        >
          <option value="hybrid">Hibrit Arama</option>
          <option value="semantic">Olay ya da durumla ilgili ilgili kanun maddelerini arama</option>
          <option value="textual">Doğrudan kanun maddesi arama</option>
        </select>
      </div>
    </div>
  );

  const toggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className="search-container">
      <div className="petition-header">
        <h1>Kanun Maddesi Arama</h1>
        <p>Bu kısımda dilerseniz olay ya da durumunuzla ilgili kanun maddelerini arayabilirsiniz, dilerseniz doğrudan kanun maddesini arayabilirsiniz ya da hibrit arama yapabilirsiniz.</p>
      </div>

      <div className="disclaimer-note" style={{
        backgroundColor: "rgba(255, 214, 19, 0.1)",
        border: "1px solid rgba(255, 214, 19, 0.3)",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "20px",
        fontSize: "14px",
        color: "#FFFFFF",
        textAlign: "left",
        lineHeight: "1.6",
        fontFamily: "Poppins, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto 20px auto"
      }}>
        <strong style={{ color: "#FFD613", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>Önemli Not:</strong> Bu arama sonuçları bilgilendirme amaçlıdır ve güncel olmayabilir. Hukuki kararlar vermeden önce resmi kaynaklardan doğrulama yapmanız ve bir hukuk uzmanına danışmanız önerilir.
      </div>

      <InstantSearch
        searchClient={searchClient}
        indexName="turk-kanunlari"
        key={searchType}
        onSearchStateChange={() => {
          if (searchError && !searchError.includes('bağlantısı kurulamadı')) {
            setSearchError(null);
          }
        }}
      >
        <Configure
          hitsPerPage={10}
          attributesToSnippet={['icerik:50']}
          snippetEllipsisText="..."
        />

        

        <div className="search-interface">
          <aside className="filters-sidebar">
            <div 
              className={`filter-section ${activeFilter === 'kanun' ? 'active' : ''}`} 
              data-filter="kanun"
            >
              <h4 onClick={() => toggleFilter('kanun')}>Kanun</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="kanun_adi" 
                  searchable={true}
                  translations={{
                    placeholder: 'Kanun ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>

            <div 
              className={`filter-section ${activeFilter === 'kitap' ? 'active' : ''}`} 
              data-filter="kitap"
            >
              <h4 onClick={() => toggleFilter('kitap')}>Kitap</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="kitap" 
                  searchable={true}
                  translations={{
                    placeholder: 'Kitap ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>

            <div 
              className={`filter-section ${activeFilter === 'kisim' ? 'active' : ''}`} 
              data-filter="kisim"
            >
              <h4 onClick={() => toggleFilter('kisim')}>Kısım</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="kisim" 
                  searchable={true}
                  translations={{
                    placeholder: 'Kısım ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>

            <div 
              className={`filter-section ${activeFilter === 'bolum' ? 'active' : ''}`} 
              data-filter="bolum"
            >
              <h4 onClick={() => toggleFilter('bolum')}>Bölüm</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="bolum" 
                  searchable={true}
                  translations={{
                    placeholder: 'Bölüm ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>

            <div 
              className={`filter-section ${activeFilter === 'ayirim' ? 'active' : ''}`} 
              data-filter="ayirim"
            >
              <h4 onClick={() => toggleFilter('ayirim')}>Ayırım</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="ayirim" 
                  searchable={true}
                  translations={{
                    placeholder: 'Ayırım ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>

            <div 
              className={`filter-section ${activeFilter === 'konu' ? 'active' : ''}`} 
              data-filter="konu"
            >
              <h4 onClick={() => toggleFilter('konu')}>Konu</h4>
              <div className="filter-content">
                <RefinementList 
                  attribute="konu" 
                  searchable={true}
                  translations={{
                    placeholder: 'Konu ara...',
                    noResults: 'Sonuç bulunamadı'
                  }}
                />
              </div>
            </div>
          </aside>

          <main>
            <CustomSearchBox />
            <div className="search-stats">
              <Stats
                translations={{
                  stats(nbHits, processingTimeMS) {
                    return `${nbHits} sonuç bulundu (${processingTimeMS} ms)`;
                  },
                }}
              />
            </div>
            {searchError && (
              <div style={{
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#ff6b6b'
              }}>
                {searchError}
              </div>
            )}
            <div className="search-results">
              <Hits hitComponent={({ hit }) => (
                <Hit hit={hit as SearchResult} onShowDetails={handleShowDetails} />
              )} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </main>
        </div>
      </InstantSearch>

      <DetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        hit={selectedHit} 
      />
    </div>
  );
};

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
      border: '1px solid rgba(255, 214, 19, 0.1)',
      cursor: 'pointer'
    }} onClick={() => onShowDetails(hit)}>
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
        }}>{hit.madde}</h3>
        <span className="type-tag" style={{
          background: 'rgba(255, 214, 19, 0.1)',
          color: '#FFD613',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Poppins'
        }}>
          {hit.kanun_adi}
        </span>
      </div>
      {/* <p className="result-source" style={{
        fontSize: '14px',
        color: '#FFD613',
        marginBottom: '8px',
        fontFamily: 'Poppins'
      }}>
        {hit.konu[0 ]}
      </p> */}
      <p className="result-excerpt" style={{
        fontFamily: 'Poppins',
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#FFFFFF'
      }}>{truncatedContent}</p>
    </div>
  );
};

export default Search; 