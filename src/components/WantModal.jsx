import { useState } from 'react';
import { CATEGORY_CONFIG } from '../data/mockData';

const TEMPLATES = [
  '一緒に飯食いたい',
  '飲み相手募集',
  'バイト探してます',
  '〇〇について語りたい',
  '散歩の相手募集',
];

const CATEGORIES = ['移動', '食事', '飲み', '仕事', '趣味'];
const EXPIRES = ['1時間', '3時間', '今日中', '1週間'];
const VISIBILITY = ['近くのみ', '全体公開'];

const AGE_GROUPS = ['何でも', '10代', '20代', '30代', '40代以上'];
const GENDERS = ['何でも', '同性', '異性'];
const AREAS = ['何でも', '渋谷', '新宿', '池袋', '銀座', '秋葉原', '六本木', '恵比寿', '中目黒'];

export default function WantModal({ onClose, onSubmit }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('食事');
  const [expires, setExpires] = useState('3時間');
  const [anonymous, setAnonymous] = useState(false);
  const [visibility, setVisibility] = useState('近くのみ');
  const [conditions, setConditions] = useState({ ageGroup: '何でも', gender: '何でも', area: '何でも' });

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit({ text, category, expires, anonymous, visibility, conditions });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl px-5 pt-5 pb-8 z-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-5" />

        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">want を投稿</h2>

        {/* Templates */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {TEMPLATES.map((t) => (
            <button
              key={t}
              onClick={() => setText(t)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Text input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="今夜何したい？"
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        {/* Category */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">カテゴリ</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const config = CATEGORY_CONFIG[cat];
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? `text-white`
                      : `${config.bg} ${config.text}`
                  }`}
                  style={isSelected ? { backgroundColor: config.color } : {}}
                >
                  {config.icon} {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expires */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">有効期限</p>
          <div className="flex gap-2">
            {EXPIRES.map((exp) => (
              <button
                key={exp}
                onClick={() => setExpires(exp)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                  expires === exp
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* Anonymous + Visibility */}
        <div className="flex gap-3 mb-4">
          {/* Anonymous toggle */}
          <div className="flex-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">匿名</span>
            <button
              onClick={() => setAnonymous(!anonymous)}
              className={`relative w-10 h-6 rounded-full transition-colors ${anonymous ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${anonymous ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Visibility */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">公開</span>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="flex-1 bg-transparent text-xs text-gray-700 dark:text-gray-300 focus:outline-none min-w-0"
            >
              {VISIBILITY.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* 相手への条件（任意） */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
            相手への条件 <span className="text-gray-400 font-normal">（任意）</span>
          </label>

          {/* 年代 */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">年代</p>
            <div className="flex flex-wrap gap-1">
              {AGE_GROUPS.map(age => (
                <button
                  key={age}
                  onClick={() => setConditions(c => ({ ...c, ageGroup: age }))}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    conditions.ageGroup === age
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* 性別 */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">性別</p>
            <div className="flex gap-1">
              {GENDERS.map(gender => (
                <button
                  key={gender}
                  onClick={() => setConditions(c => ({ ...c, gender }))}
                  className={`px-3 py-1 rounded-full text-xs border transition-all ${
                    conditions.gender === gender
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* エリア */}
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">エリア</p>
            <select
              value={conditions.area}
              onChange={e => setConditions(c => ({ ...c, area: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {AREAS.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          投稿する
        </button>
      </div>
    </div>
  );
}
