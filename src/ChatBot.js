import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Load FAQ data
const loadFAQData = async () => {
  try {
    const response = await fetch('/faq.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading FAQ:', error);
    return [];
  }
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [faqData, setFaqData] = useState([]);
  const [config] = useState({
    botName: 'Chat Assistant',
    welcomeMessage: 'Hi! How can I help you today?',
    primaryColor: '#3b82f6',
    position: 'bottom-right',
    notFoundMessage: "I'm sorry, I couldn't find an answer to that question in our FAQ. Please contact our support team at support-sample@netsuite.com or call 1-xxx-xxx for assistance."
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadFAQData().then(data => setFaqData(data));
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: config.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        source: 'welcome'
      }]);
    }
  }, [isOpen, config.welcomeMessage, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchFAQ = (query) => {
    const normalizedQuery = query.toLowerCase();
    const words = normalizedQuery.split(/\s+/);

    let bestMatch = null;
    let highestScore = 0;

    faqData.forEach(faq => {
      let score = 0;
      
      faq.tags.forEach(tag => {
        words.forEach(word => {
          if (word.length > 2 && tag.includes(word)) {
            score += 2;
          }
          if (word.length > 2 && word.includes(tag)) {
            score += 1;
          }
        });
      });

      if (normalizedQuery.includes(faq.question.toLowerCase())) {
        score += 10;
      }

      if (score > highestScore && score >= 2) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    return bestMatch;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = input;
    setInput('');

    const faqMatch = searchFAQ(userQuery);

    setTimeout(() => {
      if (faqMatch) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: faqMatch.answer,
          sender: 'bot',
          timestamp: new Date(),
          source: 'faq'
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: config.notFoundMessage,
          sender: 'bot',
          timestamp: new Date(),
          source: 'not-found'
        }]);
      }
    }, 300);
  };

  const positionStyles = {
    'bottom-right': { bottom: '24px', right: '24px' },
    'bottom-left': { bottom: '24px', left: '24px' },
    'top-right': { top: '24px', right: '24px' },
    'top-left': { top: '24px', left: '24px' }
  };

  return (
    <div style={{ position: 'fixed', ...positionStyles[config.position], zIndex: 9999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: config.primaryColor,
            borderRadius: '50%',
            padding: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle color="white" size={24} />
        </button>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          width: '384px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            backgroundColor: config.primaryColor,
            padding: '16px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle color={config.primaryColor} size={20} />
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>
                  {config.botName}
                </h3>
                <p style={{ color: 'white', fontSize: '12px', opacity: 0.9 }}>Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                padding: '4px',
                borderRadius: '50%'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  backgroundColor: message.sender === 'user' 
                    ? config.primaryColor 
                    : message.source === 'not-found'
                    ? '#fff3cd'
                    : '#f3f4f6',
                  color: message.sender === 'user' 
                    ? 'white' 
                    : message.source === 'not-found'
                    ? '#856404'
                    : '#1f2937',
                  padding: '12px',
                  borderRadius: '8px',
                  border: message.source === 'not-found' ? '1px solid #ffc107' : 'none'
                }}>
                  <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {message.text}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '4px'
                  }}>
                    <p style={{ fontSize: '11px', opacity: 0.7, margin: 0 }}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    {message.source === 'faq' && (
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        FAQ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '24px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  backgroundColor: config.primaryColor,
                  border: 'none',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: !input.trim() ? 0.5 : 1,
                  transition: 'opacity 0.2s'
                }}
              >
                <Send size={20} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}