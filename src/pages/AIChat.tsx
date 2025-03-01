import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

const SUGGESTIONS = [
  "Kira sözleşmesi yenileme şartları nelerdir?",
  "İşçinin sözleşmesinin işveren tarafından haksız feshedilmesi halinde tazminat hakkı olur mu?",
  "Anlaşmalı boşanma için hangi şartlar gereklidir?",
  "Yurtdışında yaşayanlar için askerlik süreci nasıl olur?"
];

interface APIResponse {
  task_id: string;
  status: string;
  result: {
    result: string;
    evaluations: Array<{
      kanun_adi: string;
      evaluation: string;
      articles: Array<{
        madde: string;
        icerik: string;
        konu: string[];
      }>;
    }>;
    processing_time: number;
  };
  processing_time: number;
}

const AIChat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      const response = await fetch('https://api.hukukarama.com/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data: APIResponse = await response.json();
      
      console.log('Raw API Response:', data);
      
      if (data.status !== 'completed') {
        throw new Error('API işlemi tamamlanmadı');
      }

      let formattedResponse = '';

      // Add the main result first
      formattedResponse += `${data.result.result}\n\n`;

      // Add evaluations and articles if available
      if (data.result.evaluations && data.result.evaluations.length > 0) {
        data.result.evaluations.forEach((evaluation) => {
          formattedResponse += `## ${evaluation.kanun_adi}\n\n`;

          // Add articles if available
          if (evaluation.articles && evaluation.articles.length > 0) {
            evaluation.articles.forEach((article) => {
              formattedResponse += `### ${article.madde}\n`;
              if (article.konu && article.konu.length > 0) {
                formattedResponse += `*${article.konu.join(' > ')}*\n\n`;
              }
              formattedResponse += `${article.icerik}\n\n`;
            });
          }
        });
      }

      setResponse(formattedResponse);
    } catch (error) {
      console.error('API Error:', error);
      setResponse("Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="chat-container" style={{
      padding: '120px 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div className="petition-header">
        <h1>Analiz AI- Olay/Durum Analiz Asistanı</h1>
        <p>Hukuki olay ya da durumunuzu yapay zeka destekli asistanımıza yazın, Analiz AI sizin için ilgili kanunlar çerçevesinde anında analiz etsin. Durumunuzla ilgili önfikir edinin. Yapay zekamız şimdilik şu kanunlar çerçevesinde analiz yapmaktadır: 
          <ul style={{
            listStyleType: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            margin: '1rem 0'
          }}>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Askeralma Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>İcra ve İflas Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>İdari Yargılama Usulü Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>İş Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Kamu Görevlileri Sendikaları ve Toplu Sözleşme Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Sendikalar ve Toplu İş Sözleşmeleri Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Türk Borçlar Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Türk Ceza Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Türk Medeni Kanunu</li>
            <li style={{ 
              padding: '8px 16px', 
              background: 'rgba(255, 214, 19, 0.1)', 
              borderRadius: '20px',
              border: '1px solid rgba(255, 214, 19, 0.2)'
            }}>Türk Ticaret Kanunu</li>
          </ul></p>
          <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Diğer Kanunlar ve Mevzuatlar yakın zamanda eklenecektir.
          </p>
      </div>

      {/* Suggestions */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        {SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              padding: '12px 24px',
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Chat Form */}
      <form onSubmit={handleSubmit} style={{
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hukuki sorunuzu yazın..."
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '30px',
              border: '1px solid rgba(255, 214, 19, 0.3)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '1rem 2rem',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(100.61deg, #FFD613 17.65%, #8E780D 57.89%)',
              color: '#000000',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'Yanıt Hazırlanıyor...' : 'Gönder'}
          </button>
        </div>
      </form>

      <div className="disclaimer-note" style={{
        backgroundColor: "rgba(255, 214, 19, 0.1)",
        border: "1px solid rgba(255, 214, 19, 0.3)",
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "2rem",
        fontSize: "14px",
        color: "#FFFFFF",
        textAlign: "left",
        lineHeight: "1.6",
        maxWidth: "800px",
        margin: "0 auto 3rem auto",
        fontFamily: "Poppins, sans-serif"
      }}>
        <strong style={{ color: "#FFD613", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>Önemli Not:</strong> Hukuki Asistan tamamen yapay zeka tarafından desteklenmektedir. Yapay zeka hata yapabilir, yanlış bilgiler sunabilir veya güncel olmayan hukuki bilgiler içerebilir. Verilen yanıtların hukuki sorumluluğu tamamen kullanıcıya aittir. Önemli hukuki konularda bir avukata danışmanız önerilir.
      </div>

      {/* Response */}
      {response && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '2rem',
          marginTop: '2rem',
          maxWidth: '1000px',
          margin: '0 auto',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 style={{color: '#FFD613', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: '600'}} {...props} />,
              h2: ({node, ...props}) => <h2 style={{color: '#FFD613', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: '600'}} {...props} />,
              h3: ({node, ...props}) => <h3 style={{color: '#FFD613', marginTop: '1.5rem', marginBottom: '0.75rem', fontFamily: 'Poppins, sans-serif', fontWeight: '600'}} {...props} />,
              h4: ({node, ...props}) => <h4 style={{color: '#FFD613', marginTop: '1.25rem', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: '600'}} {...props} />,
              h5: ({node, ...props}) => <h5 style={{color: '#FFD613', marginTop: '1rem', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: '600'}} {...props} />,
              p: ({node, children, ...props}) => {
                // Check if children contains block elements (unlikely with markdown but possible)
                const hasBlockElements = React.Children.toArray(children).some(
                  child => typeof child === 'object' && 
                          (child as React.ReactElement)?.type === 'div' || 
                          (child as React.ReactElement)?.type === 'ul' || 
                          (child as React.ReactElement)?.type === 'ol'
                );
                
                // If there are block elements, render without wrapping p
                if (hasBlockElements) {
                  return <>{children}</>;
                }
                
                // Otherwise render normal paragraph
                return <p style={{color: '#FFFFFF', marginBottom: '1rem', lineHeight: '1.6', fontFamily: 'Poppins, sans-serif'}} {...props}>{children}</p>;
              },
              ul: ({node, ...props}) => <ul style={{color: '#FFFFFF', marginBottom: '1rem', paddingLeft: '1.5rem', fontFamily: 'Poppins, sans-serif'}} {...props} />,
              ol: ({node, ...props}) => <ol style={{color: '#FFFFFF', marginBottom: '1rem', paddingLeft: '1.5rem', fontFamily: 'Poppins, sans-serif'}} {...props} />,
              li: ({node, ...props}) => <li style={{color: '#FFFFFF', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif'}} {...props} />,
              em: ({node, ...props}) => <em style={{color: '#FFD613', fontStyle: 'normal', fontFamily: 'Poppins, sans-serif'}} {...props} />,
              strong: ({node, ...props}) => <strong style={{color: '#FFD613', fontFamily: 'Poppins, sans-serif'}} {...props} />,
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIChat; 