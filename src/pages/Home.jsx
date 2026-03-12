import { useState } from 'react';
import { mockWants, CATEGORIES, CATEGORY_CONFIG } from '../data/mockData';
import WantCard from '../components/WantCard';
import WantModal from '../components/WantModal';

export default function Home({ darkMode, setDarkMode }) {
  const [activeCategory, setActiveCategory] = useState('全て');
  const [showModal, setShowModal] = useState(false);
  const [wants, setWants] = useState(mockWants);
  const [connectedId, setConnectedId] = useState(null);

  const filtered = activeCategory === '全て'
    ? wants
    : wants.filter((w) => w.category === activeCategory);

  const handleConnect = (want) => {
    setConnectedId(want.id);
    setTimeout(() => setConnectedId(null), 2000);
  };

  const handleSubmit = (data) => {
    const newWant = {
      id: String(Date.now()),
      text: data.text,
      category: data.category,
      distance: Math.floor(Math.random() * 200) + 10,
      expiresIn: data.expires + '後',
      anonymous: data.anonymous,
      name: data.anonymous ? null : 'あなた',
      matched: false,
    };
    setWants([newWant, ...wants]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-12 pb-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Wants</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500">近くの人のwantを見つけよう</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const config = cat !== '全て' ? CATEGORY_CONFIG[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? cat === '全て'
                      ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                      : 'text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                style={isActive && config ? { backgroundColor: config.color } : {}}
              >
                {config && <span>{config.icon}</span>}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm">近くにwantがありません</p>
          </div>
        ) : (
          filtered.map((want) => (
            <div key={want.id} className="relative">
              <WantCard want={want} onConnect={handleConnect} />
              {connectedId === want.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-2xl">
                  <span className="text-sm font-bold text-indigo-500 animate-pulse">✨ リクエスト送信！</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-300/50 dark:shadow-indigo-900/50 flex items-center justify-center text-2xl font-light transition-all active:scale-95 hover:bg-indigo-600 z-30"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <WantModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
