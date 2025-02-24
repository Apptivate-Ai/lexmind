import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SUGGESTIONS = [
  "6098 sayılı Borçlar Kanunu'nda kira sözleşmesi ile ilgili maddeleri bul",
  "İşçinin haksız feshinde tazminat hakları nelerdir?",
  "Yargıtay'ın mobbing ile ilgili emsal kararlarını göster",
  "Kiracının tahliyesi için emsal kararları incele"
];

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
      const response = await fetch('http://185.136.206.76:8521/api/query', {
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

      const data = await response.json();
      
      console.log('Raw API Response:', data);
      
      // Access the nested result object
      const result = data.result;
      let cleanedAnswer = result.ai_response || "Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.";
      
      // Remove everything before and including </think> tag
      cleanedAnswer = cleanedAnswer.split('</think>').pop()?.trim() || cleanedAnswer;
      
      console.log('Cleaned Answer:', cleanedAnswer);

      // Format the response with relevant laws if available
      let formattedResponse = '';
      if (result.relevant_laws && result.relevant_laws.length > 0) {
        formattedResponse += '**İlgili Kanunlar:**\n\n';
        result.relevant_laws.forEach((law: string) => {
          formattedResponse += `- ${law}\n`;
        });
        formattedResponse += '\n---\n\n';
      }
      
      formattedResponse += cleanedAnswer;
      
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
    <div className="chat-page">
      <div className="chat-header">
        <h1>Analiz AI</h1>
        <p>
          Hukuki açıdan değerlendirilmesini istediğiniz konuyu yazın. Yapay zeka aşağıdaki kanunlar çerçevesinde değerlendirme yapar:
          <br /><br />
          • İcra ve İflas Kanunu<br />
          • İdari Yargılama Usulü Kanunu<br />
          • İş Kanunu<br />
          • Sendikalar ve Toplu İş Sözleşmesi Kanunu<br />
          • Türk Borçlar Kanunu<br />
          • Türk Ceza Kanunu<br />
          • Türk Medeni Kanunu<br />
          • Türk Ticaret Kanunu
        </p>
      </div>

      <div className="query-container">
        <form onSubmit={handleSubmit} className="query-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Analiz edilecek konuyu yazın..."
            className="query-input"
          />
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading || !query.trim()}
          >
            Analiz Et
          </button>
        </form>

        <div className="suggestion-chips">
          {SUGGESTIONS.map((suggestion, index) => (
            <button 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-chip"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="loading-container">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {response && !isLoading && (
          <div className="response-container">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat; 