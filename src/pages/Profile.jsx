import { useState } from 'react';

const AVATARS = ['😊', '😎', '🤗', '🥳', '🤩', '😇', '🦊', '🐱', '🐼', '🦁', '🐸', '🐧'];
const AGE_GROUPS = ['10代', '20代', '30代', '40代以上'];
const AREAS = ['渋谷', '新宿', '池袋', '銀座', '秋葉原', '六本木', '恵比寿', '中目黒', 'その他'];
const THEME_COLORS = [
  { name: 'インディゴ', value: '#6366f1' },
  { name: 'バイオレット', value: '#8b5cf6' },
  { name: 'ピンク', value: '#ec4899' },
  { name: 'アンバー', value: '#f59e0b' },
  { name: 'エメラルド', value: '#10b981' },
];

const VISIBILITY_OPTIONS = [
  { value: 'public', icon: '🌐', label: '全体公開', desc: '誰でもプロフィールを見られます' },
  { value: 'limited', icon: '📍', label: '近くの人のみ', desc: '半径100m以内の人だけ見られます' },
  { value: 'private', icon: '🔒', label: '非公開', desc: 'wantはすべて匿名で表示されます' },
];

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem('wants_profile') || '{}');
  } catch {
    return {};
  }
}

export default function Profile({ darkMode, setDarkMode }) {
  const [nickname, setNickname] = useState(() => {
    const p = loadProfile();
    return p.nickname || localStorage.getItem('nickname') || '';
  });
  const [ageGroup, setAgeGroup] = useState(() => {
    const p = loadProfile();
    return p.ageGroup || localStorage.getItem('ageGroup') || '20代';
  });
  const [avatar, setAvatar] = useState(() => {
    const p = loadProfile();
    return p.avatar || localStorage.getItem('avatar') || '😊';
  });
  const [nearbyEnabled, setNearbyEnabled] = useState(() => localStorage.getItem('nearbyEnabled') !== 'false');
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor') || '#6366f1');
  const [visibility, setVisibility] = useState(() => {
    const p = loadProfile();
    return p.visibility || 'public';
  });
  const [area, setArea] = useState(() => {
    const p = loadProfile();
    return p.area || '渋谷';
  });
  const [notifPermission, setNotifPermission] = useState(() => {
    if (typeof Notification === 'undefined') return 'unsupported';
    return Notification.permission;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // 既存の個別キーも保存
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('ageGroup', ageGroup);
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('nearbyEnabled', nearbyEnabled);
    localStorage.setItem('themeColor', themeColor);

    // wants_profile に統合して保存
    const profile = { nickname, ageGroup, avatar, visibility, area };
    localStorage.setItem('wants_profile', JSON.stringify(profile));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateVisibility = (val) => {
    setVisibility(val);
    const current = loadProfile();
    localStorage.setItem('wants_profile', JSON.stringify({ ...current, visibility: val }));
  };

  const updateArea = (val) => {
    setArea(val);
    const current = loadProfile();
    localStorage.setItem('wants_profile', JSON.stringify({ ...current, area: val }));
  };

  const requestNotifPermission = async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    setNotifPermission(result);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-12 pb-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">プロフィール</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">あなたの情報を設定</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-5">

        {/* Avatar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">アバター</p>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center text-5xl">
              {avatar}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setAvatar(emoji)}
                className={`w-full aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${
                  avatar === emoji
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 ring-2 ring-indigo-400 scale-110'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Nickname */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">ニックネーム</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="ニックネームを入力"
            maxLength={20}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Age group */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">年代</p>
          <div className="flex gap-2">
            {AGE_GROUPS.map((age) => (
              <button
                key={age}
                onClick={() => setAgeGroup(age)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  ageGroup === age
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">よくいるエリア</p>
          <select
            value={area}
            onChange={e => updateArea(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
          >
            {AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            条件マッチングに使用されます
          </p>
        </div>

        {/* 通知設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">通知設定</h3>
          {notifPermission === 'unsupported' ? (
            <p className="text-sm text-gray-400 dark:text-gray-500">このブラウザは通知をサポートしていません</p>
          ) : (
            <div className="space-y-3">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                notifPermission === 'granted'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : notifPermission === 'denied'
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}>
                <span className="text-xl">
                  {notifPermission === 'granted' ? '🔔' : notifPermission === 'denied' ? '🔕' : '🔔'}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {notifPermission === 'granted' ? '通知: オン' : notifPermission === 'denied' ? '通知: ブロック中' : '通知: 未設定'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {notifPermission === 'granted'
                      ? 'マッチ・リクエスト通知を受け取れます'
                      : notifPermission === 'denied'
                      ? 'ブラウザ設定から許可してください'
                      : '許可するとマッチ通知が届きます'}
                  </p>
                </div>
              </div>
              {notifPermission !== 'granted' && notifPermission !== 'denied' && (
                <button
                  onClick={requestNotifPermission}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 text-white transition-all active:scale-95"
                >
                  通知を許可する
                </button>
              )}
            </div>
          )}
        </div>

        {/* Nearby toggle — BIG and prominent */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">近距離通信</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {nearbyEnabled ? '近くの人に表示されています' : 'オフ — 非表示モード'}
              </p>
            </div>
            <button
              onClick={() => setNearbyEnabled(!nearbyEnabled)}
              className={`relative w-16 h-8 rounded-full transition-colors shadow-inner ${
                nearbyEnabled ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  nearbyEnabled ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Visual indicator */}
          <div className={`mt-4 py-3 rounded-xl text-center text-sm font-semibold transition-colors ${
            nearbyEnabled
              ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          }`}>
            {nearbyEnabled ? '📡 近くの人に表示中' : '🔇 非表示モード'}
          </div>
        </div>

        {/* プロフィール公開設定 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">プロフィール公開設定</h3>
          <div className="space-y-2">
            {VISIBILITY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => updateVisibility(opt.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  visibility === opt.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <div className="text-left">
                  <div className="font-medium text-sm text-gray-800 dark:text-gray-100">{opt.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                </div>
                {visibility === opt.value && (
                  <span className="ml-auto text-indigo-500">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* private 警告バナー */}
          {visibility === 'private' && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <span className="text-sm">⚠️</span>
              <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">
                すべてのwantが匿名表示になります
              </p>
            </div>
          )}
        </div>

        {/* Theme color */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">テーマカラー</p>
          <div className="flex gap-3 justify-center">
            {THEME_COLORS.map((tc) => (
              <button
                key={tc.value}
                onClick={() => setThemeColor(tc.value)}
                className={`w-10 h-10 rounded-full transition-all ${
                  themeColor === tc.value ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 scale-110' : ''
                }`}
                style={{ backgroundColor: tc.value, ringColor: tc.value }}
                title={tc.name}
              />
            ))}
          </div>
        </div>

        {/* Dark mode */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">ダークモード</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {darkMode ? '現在: ダーク' : '現在: ライト'}
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                darkMode ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform flex items-center justify-center text-xs ${
                  darkMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              >
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
          style={{ backgroundColor: themeColor }}
        >
          {saved ? '✅ 保存しました！' : 'プロフィールを保存'}
        </button>
      </div>
    </div>
  );
}
