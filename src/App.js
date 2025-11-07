import React from 'react';
import ChatBot from './ChatBot';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: '700' }}>
          SAMPLE CHATBOT 
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '15px' }}>
          by Dan
        </p>
        <p style={{ fontSize: '16px', opacity: 0.8 }}>
          Click the chat bubble in the bottom right corner to get started!
        </p>
      </div>
      <ChatBot />
    </div>
  );
}

export default App;