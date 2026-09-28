import React, { useState } from 'react';
import { ChatTurn, sendChatMessage } from '../services/chatService';
import './Chatbot.css';

type ChatMessage = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const suggestions = [
  'How do I search for a medicine?',
  'How does this website work?',
  'Where can I find wellness tips?'
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Namaste! I can help you find your way around the Ayurvedic Medicine Suggestion System. What would you like to know?'
    }
  ]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    const question = text.trim();
    if (!question || isSending) return;

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: question };
    const conversation = [...messages, userMessage]
      .slice(-20)
      .map(({ role, text: content }) => ({ role, content })) as ChatTurn[];
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setError(null);
    setIsSending(true);

    try {
      const reply = await sendChatMessage(conversation);
      setMessages((current) => [...current, { id: Date.now(), role: 'assistant', text: reply }]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="chatbot-page">
      <section className="chatbot-shell" aria-labelledby="chatbot-title">
        <header className="chatbot-heading">
          <div>
            <p className="chatbot-eyebrow">AYURVEDIC MEDICINE SUGGESTION SYSTEM</p>
            <h1 id="chatbot-title">Let’s find your way.</h1>
            <p className="chatbot-intro">Ask a question about using the website and I’ll point you in the right direction.</p>
          </div>
          <span className="chatbot-status"><span aria-hidden="true" /> AI chat</span>
        </header>

        <div className="chatbot-workspace">
          <section className="chat-panel" aria-label="Chat conversation">
            <div className="chat-messages" aria-live="polite">
              {messages.map((message) => (
                <div className={`chat-message chat-message-${message.role}`} key={message.id}>
                  {message.role === 'assistant' && <span className="chat-avatar" aria-hidden="true">A</span>}
                  <p>{message.text}</p>
                </div>
              ))}
              {isSending && <p className="chat-loading" role="status">Thinking...</p>}
            </div>

            <div className="chat-composer-wrap">
              <form
                className="chat-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(draft);
                }}
              >
                <label className="sr-only" htmlFor="chat-message">Your message</label>
                <input
                  id="chat-message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  disabled={isSending}
                  placeholder="Ask a question about the website..."
                />
                <button type="submit" aria-label="Send message" disabled={!draft.trim() || isSending}>
                  <span aria-hidden="true">↑</span>
                </button>
              </form>
              {error ? <p className="chat-error" role="alert">{error}</p> : (
                <p className="chat-composer-note">Please avoid sharing sensitive personal or medical information.</p>
              )}
            </div>
          </section>

          <aside className="chat-sidebar" aria-label="Suggested questions and safety information">
            <div className="chat-suggestions">
              <h2>Try asking</h2>
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" disabled={isSending} onClick={() => sendMessage(suggestion)}>
                  <span aria-hidden="true">↗</span>{suggestion}
                </button>
              ))}
            </div>
            <div className="chat-safety-note">
              <span className="safety-mark" aria-hidden="true">+</span>
              <h2>Health note</h2>
              <p>This chat is for website guidance, not medical advice or diagnosis. Please consult a qualified healthcare professional about health concerns.</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Chatbot;