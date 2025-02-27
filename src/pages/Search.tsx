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
        port: 8108,
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
        host: '185.136.206.76',
        port: 8108,
        protocol: 'http',
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

  return (
    <div className="search-container" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }}>
      {/* Main title header */}
      <div className="search-header" style={{
        padding: '3rem',
        background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
        borderRadius: '30px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '2rem'
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
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <InstantSearch searchClient={searchClient} indexName="turk-kanunlari">
          {/* Sidebar with filters */}
          <div className="sidebar" style={{
            width: '250px',
            background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
            borderRadius: '30px',
            padding: '1.5rem',
            height: 'fit-content',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 3rem)'
          }}>
            <h3 style={{
              fontFamily: 'Poppins',
              fontSize: '18px',
              color: '#FFD613',
              marginBottom: '1rem'
            }}>Filtreler</h3>
            
            <ClearRefinements 
              translations={{
                reset: 'Filtreleri Temizle',
              }}
            />
            
            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px'
              }}>Kanun</h4>
              <RefinementList
                attribute="kanun_adi"
                limit={5}
                showMore={true}
                showMoreLimit={20}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Kanun ara...',
                }}
              />
            </div>
            
            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px',
                marginTop: '1rem'
              }}>Kitap</h4>
              <RefinementList
                attribute="kitap"
                limit={5}
                showMore={true}
                showMoreLimit={15}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Kitap ara...',
                }}
              />
            </div>
            
            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px',
                marginTop: '1rem'
              }}>Kısım</h4>
              <RefinementList
                attribute="kisim"
                limit={5}
                showMore={true}
                showMoreLimit={15}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Kısım ara...',
                }}
              />
            </div>

            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px',
                marginTop: '1rem'
              }}>Bölüm</h4>
              <RefinementList
                attribute="bolum"
                limit={5}
                showMore={true}
                showMoreLimit={15}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Bölüm ara...',
                }}
              />
            </div>
            
            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px',
                marginTop: '1rem'
              }}>Ayırım</h4>
              <RefinementList
                attribute="ayirim"
                limit={5}
                showMore={true}
                showMoreLimit={15}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Ayırım ara...',
                }}
              />
            </div>
            
            <div className="filter-section">
              <h4 style={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: '#FFD613',
                marginBottom: '8px',
                marginTop: '1rem'
              }}>Konu</h4>
              <RefinementList
                attribute="konu"
                limit={5}
                showMore={true}
                showMoreLimit={15}
                searchable={true}
                translations={{
                  showMore: 'Daha Fazla',
                  noResults: 'Sonuç bulunamadı',
                  placeholder: 'Konu ara...',
                }}
              />
            </div>
          </div>
          
          {/* Main content */}
          <div className="main-content" style={{ flex: 1 }}>
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
      
            {/* Configure search parameters */}
            <Configure 
              {...getSearchParams()} 
            />
            
            <div className="search-input-container" style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex', 
              flex: 1,
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 214, 19, 0.3)',
              }}>
                <div style={{ width: '100%' }}>
                  <style>
                    {`
                      .ais-SearchBox {
                        width: 100%;
                      }
                      .ais-SearchBox-form {
                        display: flex;
                        margin: 0;
                        height: 100%;
                        background: transparent;
                        border: none;
                        box-shadow: none;
                      }
                      .ais-SearchBox-input {
                        flex: 1;
                        background: transparent;
                        border: none;
                        color: #FFFFFF;
                        font-family: Poppins;
                        font-size: 16px;
                        padding: 1rem 1.5rem;
                        outline: none;
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                      }
                      .ais-SearchBox-submit, .ais-SearchBox-reset {
                        display: none;
                      }
                      .ais-RefinementList-item {
                        margin-bottom: 8px;
                      }
                      .ais-RefinementList-label {
                        display: flex;
                        align-items: center;
                        color: #FFFFFF;
                        font-family: Poppins;
                        font-size: 14px;
                      }
                      .ais-RefinementList-checkbox {
                        margin-right: 8px;
                        accent-color: #FFD613;
                      }
                      .ais-RefinementList-count {
                        margin-left: 8px;
                        background: rgba(255, 214, 19, 0.1);
                        color: #FFD613;
                        padding: 2px 6px;
                        border-radius: 8px;
                        font-size: 12px;
                      }
                      .ais-ClearRefinements-button {
                        background: rgba(255, 214, 19, 0.1);
                        color: #FFD613;
                        border: none;
                        padding: 8px 12px;
                        border-radius: 8px;
                        font-family: Poppins;
                        font-size: 14px;
                        cursor: pointer;
                        margin-bottom: 16px;
                        width: 100%;
                      }
                      .ais-ClearRefinements-button--disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                      }
                      .ais-Pagination-item {
                        display: inline-block;
                        margin: 0 4px;
                      }
                      .ais-Pagination-link {
                        color: #FFFFFF;
                        background: rgba(255, 255, 255, 0.1);
                        padding: 8px 12px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-family: Poppins;
                      }
                      .ais-Pagination-item--selected .ais-Pagination-link {
                        background: #FFD613;
                        color: #000000;
                      }
                      .ais-RefinementList-searchBox {
                        margin-bottom: 10px;
                      }
                      .ais-RefinementList-searchBox .ais-SearchBox-input {
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 214, 19, 0.3);
                        border-radius: 8px;
                        padding: 8px 12px;
                        font-size: 14px;
                        height: auto;
                      }
                      .ais-RefinementList-noResults {
                        color: #FFD613;
                        font-family: Poppins;
                        font-size: 12px;
                        margin-top: 5px;
                      }
                      .ais-RefinementList-showMore {
                        background: transparent;
                        border: none;
                        color: #FFD613;
                        font-family: Poppins;
                        font-size: 12px;
                        cursor: pointer;
                        padding: 5px 0;
                        margin-top: 5px;
                        text-decoration: underline;
                      }
                    `}
                  </style>
                  <SearchBox
                    placeholder={
                      searchType === 'semantic'
                        ? "Olay ya da durumu açıklayın (Örn: Kiracı evi zamanında boşaltmadı)"
                        : "Kanun adı veya madde numarası girin (Örn: TBK 299, İcra 24)"
                    }
                    onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();
                      setIsLoading(true);
                      // Simulate loading state for better UX
                      setTimeout(() => setIsLoading(false), 500);
                    }}
                    onKeyUp={(e: React.KeyboardEvent) => {
                      const input = e.currentTarget as HTMLInputElement;
                      setSearchQuery(input.value);
                    }}
                    translations={{
                      submitTitle: '',
                      resetTitle: '',
                      placeholder: searchType === 'semantic'
                        ? "Olay ya da durumu açıklayın (Örn: Kiracı evi zamanında boşaltmadı)"
                        : "Kanun adı veya madde numarası girin (Örn: TBK 299, İcra 24)"
                    }}
                  />
                </div>
          <button 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 500);
                  }}
            style={{
              fontFamily: 'Poppins',
              fontSize: '16px',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0 12px 12px 0',
              border: 'none',
              background: '#FFD613',
              color: '#000000',
              cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '80px'
                  }}
                >
                  {isLoading ? 'Aranıyor...' : 'Ara'}
          </button>
        </div>
      </div>

            <div style={{
          background: 'linear-gradient(133.74deg, #2B2424 25.55%, rgba(131, 109, 109, 0) 116.47%)',
          borderRadius: '30px',
          padding: '2rem',
            }}>
              <Stats
                translations={{
                  stats: (nbHits: number) => `${nbHits} sonuç bulundu`,
                }}
              />
              
              <Hits 
                hitComponent={({ hit }) => (
                  <Hit hit={hit} onShowDetails={handleShowDetails} />
                )}
              />
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem'
              }}>
                <Pagination
                  padding={2}
                  showFirst={false}
                  showLast={false}
                  translations={{
                    previous: 'Önceki',
                    next: 'Sonraki',
                  }}
                />
              </div>
            </div>
        </div>
        </InstantSearch>
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