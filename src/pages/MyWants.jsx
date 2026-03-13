import { useState } from 'react';
import { yuiMyWants, CATEGORY_CONFIG } from '../data/mockData';
import WantModal from '../components/WantModal';

export default function MyWants() {
  const [wants, setWants] = useState(yuiMyWants);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (data) => {
    const newWant = {
      id: String(Date.now()),
      text: data.text,
      category: data.category,
      expiresIn: data.expires + '後',
      anonymous: data.anonymous,
      responses: 0,
    };
    setWants([newWant, ...wants]);
  };

  const handleDelete = (id) => {
    setWants(wants.filter((w) => w.id !== id));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-12 pb-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">マイ Want</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">あなたが投稿したwant</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {wants.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <span className="text-4xl mb-3">📝</span>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">まだwantがありません</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white text-sm font-semibold"
            >
              + want を追加
            </button>
          </div>
        ) : (
          wants.map((want) => {
            const config = CATEGORY_CONFIG[want.category] || CATEGORY_CONFIG['趣味'];
            return (
              <div
                key={want.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${config.bg}`}>
                    {config.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug mb-1">
                      {want.text}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                        {want.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {want.expiresIn}
                      </span>
                      {want.responses > 0 && (
                        <span className="flex items-center gap-1 text-xs text-indigo-500 dark:text-indigo-400 font-semibold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                          </svg>
                          {want.responses}件の反応
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => {
                      // In real app, open edit modal
                      setShowModal(true);
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 transition-colors active:scale-95"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(want.id)}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400 transition-colors active:scale-95"
                  >
                    削除
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add button */}
      {wants.length > 0 && (
        <div className="flex-shrink-0 px-4 pb-24 pt-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 rounded-2xl text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95"
          >
            + want を追加
          </button>
        </div>
      )}

      {showModal && (
        <WantModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
      )}
    </div>
  );
}
