import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SUGGESTIONS = [
  "6098 sayılı Borçlar Kanunu'nda kira sözleşmesi ile ilgili maddeleri bul",
  "İşçinin haksız feshinde tazminat hakları nelerdir?",
  "Yargıtay'ın mobbing ile ilgili emsal kararlarını göster",
  "Kiracının tahliyesi için emsal kararları incele"
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
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '48px',
          color: '#FFD613',
          marginBottom: '1rem'
        }}>Hukuki Asistan</h1>
        <p style={{
          fontSize: '20px',
          color: '#FFFFFF',
          opacity: 0.8
        }}>Hukuki sorularınızı yapay zeka destekli asistanımıza sorabilirsiniz</p>
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
              fontFamily: 'Poppins',
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
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'Yanıt Hazırlanıyor...' : 'Gönder'}
          </button>
        </div>
      </form>

      {/* Response */}
      {response && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '2rem',
          marginTop: '2rem'
        }}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 style={{color: '#FFD613', marginTop: '2rem', marginBottom: '1rem'}} {...props} />,
              h2: ({node, ...props}) => <h2 style={{color: '#FFD613', marginTop: '2rem', marginBottom: '1rem'}} {...props} />,
              h3: ({node, ...props}) => <h3 style={{color: '#FFD613', marginTop: '1.5rem', marginBottom: '0.75rem'}} {...props} />,
              h4: ({node, ...props}) => <h4 style={{color: '#FFD613', marginTop: '1.25rem', marginBottom: '0.5rem'}} {...props} />,
              h5: ({node, ...props}) => <h5 style={{color: '#FFD613', marginTop: '1rem', marginBottom: '0.5rem'}} {...props} />,
              p: ({node, ...props}) => <p style={{color: '#FFFFFF', marginBottom: '1rem', lineHeight: '1.6'}} {...props} />,
              ul: ({node, ...props}) => <ul style={{color: '#FFFFFF', marginBottom: '1rem', paddingLeft: '1.5rem'}} {...props} />,
              ol: ({node, ...props}) => <ol style={{color: '#FFFFFF', marginBottom: '1rem', paddingLeft: '1.5rem'}} {...props} />,
              li: ({node, ...props}) => <li style={{color: '#FFFFFF', marginBottom: '0.5rem'}} {...props} />,
              em: ({node, ...props}) => <em style={{color: '#FFD613', fontStyle: 'normal'}} {...props} />,
              strong: ({node, ...props}) => <strong style={{color: '#FFD613'}} {...props} />,
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