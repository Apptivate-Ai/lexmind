import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Merhaba! Ben LexMind AI asistanınız. Size nasıl yardımcı olabilirim?",
    sender: 'ai',
    timestamp: new Date()
  }
];

const SUGGESTIONS = [
  "İş sözleşmesi nasıl hazırlanır?",
  "Boşanma davası süreci nasıl işler?",
  "Miras hukuku hakkında bilgi almak istiyorum",
  "Şirket kurulum aşamaları nelerdir?"
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now(),
        text: "Sorunuzu aldım. Size en iyi şekilde yardımcı olmaya çalışacağım. Hukuki konularda genel bilgi ve yönlendirme sağlayabilirim, ancak bu bilgiler resmi hukuki tavsiye yerine geçmez.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>LexMind AI Hukuk Asistanı</h1>
        <p>
          Yapay zeka destekli hukuki danışmanlık sistemimiz ile sorularınızı yanıtlıyor, 
          hukuki süreçlerinizi analiz ediyor ve size yol gösteriyoruz.
        </p>
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="welcome-message">
                <h2>Hoş Geldiniz!</h2>
                <p>Hukuki sorularınızı sormaya başlayabilirsiniz.</p>
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
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}-message`}>
                  <div className="message-content">
                    {message.text}
                    <span className="timestamp">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="message ai-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="chat-input"
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat; 