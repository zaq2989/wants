import { useState } from 'react';
import { mockMatches, mockMessages } from '../data/mockData';

function ChatView({ match, onBack }) {
  const [messages, setMessages] = useState(mockMessages[match.id] || []);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 pt-12 pb-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
          {match.name[0]}
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{match.name}</p>
          <p className="text-xs text-green-500">オンライン</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.from === 'me'
                  ? 'bg-indigo-500 text-white rounded-br-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 pb-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="メッセージを入力..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center disabled:opacity-40 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Matches() {
  const [matches, setMatches] = useState(mockMatches);
  const [activeChat, setActiveChat] = useState(null);

  if (activeChat) {
    return <ChatView match={activeChat} onBack={() => setActiveChat(null)} />;
  }

  const totalUnread = matches.reduce((sum, m) => sum + m.unread, 0);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-12 pb-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">マッチ</h1>
          {totalUnread > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-bold">
              {totalUnread}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">つながった人とのメッセージ</p>
      </div>

      {/* Match list */}
      <div className="flex-1 overflow-y-auto pb-24">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <span className="text-4xl mb-3">💬</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm">まだマッチがありません</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">ホームからwantに「つながる」しよう</p>
          </div>
        ) : (
          matches.map((match) => (
            <button
              key={match.id}
              onClick={() => {
                setMatches(matches.map((m) => m.id === match.id ? { ...m, unread: 0 } : m));
                setActiveChat(match);
              }}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-800"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {match.name === '匿名' ? '?' : match.name[0]}
                </div>
                {match.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {match.unread}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm font-semibold ${match.unread > 0 ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
                    {match.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{match.time}</span>
                </div>
                <p className={`text-xs truncate ${match.unread > 0 ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>
                  {match.lastMessage}
                </p>
              </div>

              <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
