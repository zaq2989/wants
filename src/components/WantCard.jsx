import { useState } from 'react';
import { CATEGORY_CONFIG } from '../data/mockData';

function getProfileVisibility() {
  try {
    const profile = JSON.parse(localStorage.getItem('wants_profile') || '{}');
    return {
      visibility: profile.visibility || 'public',
      nickname: profile.nickname || 'あなた',
    };
  } catch {
    return { visibility: 'public', nickname: 'あなた' };
  }
}

// 通知送信ヘルパー
async function sendNotification(title, options) {
  if (Notification.permission !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification(title, options);
  } catch (e) {
    // service worker 未対応環境のフォールバック
    new Notification(title, options);
  }
}

export default function WantCard({ want, onConnect }) {
  const [expanded, setExpanded] = useState(false);
  const [showLimitedModal, setShowLimitedModal] = useState(false);
  const config = CATEGORY_CONFIG[want.category] || CATEGORY_CONFIG['趣味'];

  const { visibility, nickname } = getProfileVisibility();

  // 表示名の決定ロジック
  const displayName = (() => {
    if (want.isOwn) {
      if (visibility === 'private') return null;
      return nickname;
    }
    return want.anonymous ? null : want.name;
  })();

  // プロフィールとの条件マッチ計算
  const userProfile = (() => {
    try {
      return JSON.parse(localStorage.getItem('wants_profile') || '{}');
    } catch {
      return {};
    }
  })();
  const conditions = want.conditions || {};

  const matchScore = (() => {
    if (!conditions || (!conditions.ageGroup && !conditions.gender && !conditions.area)) return null;
    let score = 0;
    let total = 0;
    if (conditions.ageGroup && conditions.ageGroup !== '何でも') {
      total++;
      if (userProfile.ageGroup === conditions.ageGroup) score++;
    }
    if (conditions.gender && conditions.gender !== '何でも') {
      total++;
      // モック: genderは常にマッチ
      score++;
    }
    if (conditions.area && conditions.area !== '何でも') {
      total++;
      if (userProfile.area === conditions.area) score++;
    }
    if (total === 0) return null;
    return Math.round((score / total) * 100);
  })();

  // limited設定のとき、プロフィールタップ時のランダム距離チェック（モック）
  const handleNameClick = (e) => {
    if (!want.isOwn && visibility !== 'public') return;
    if (want.isOwn && visibility === 'limited') {
      e.stopPropagation();
      const isNearby = Math.random() > 0.5;
      if (!isNearby) {
        setShowLimitedModal(true);
      }
    }
  };

  // 「つながる」ボタン処理（通知付き）
  const handleConnect = async (e) => {
    e.stopPropagation();

    // 通知許可リクエスト
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    // リクエスト送信通知
    await sendNotification('つながりリクエストを送りました 🎉', {
      body: `「${want.text.slice(0, 30)}${want.text.length > 30 ? '...' : ''}」`,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: `connect-${want.id}`,
      data: { wantId: want.id },
    });

    // 3秒後にマッチ通知（モック）
    setTimeout(async () => {
      await sendNotification('マッチしました！ 🎊', {
        body: `${want.anonymous ? '匿名さん' : want.name}とマッチしました`,
        icon: '/icons/icon-192.png',
        tag: `match-${want.id}`,
        vibrate: [200, 100, 200],
        data: { wantId: want.id },
      });
    }, 3000);

    onConnect && onConnect(want);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer transition-all active:scale-[0.98]"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          {/* Category badge */}
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${config.bg}`}
          >
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug mb-2">
              {want.text}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Category */}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                {want.category}
              </span>

              {/* Distance */}
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {want.distance}m
              </span>

              {/* Expires */}
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {want.expiresIn}
              </span>

              {/* Name / Anonymous */}
              <span
                className={`text-xs text-gray-400 dark:text-gray-500 ${
                  want.isOwn && visibility === 'limited' ? 'cursor-pointer underline decoration-dotted' : ''
                }`}
                onClick={handleNameClick}
              >
                {displayName ? displayName : '匿名'}
                {want.isOwn && visibility === 'limited' && displayName && (
                  <span className="ml-1 text-[10px] text-indigo-400">📍</span>
                )}
              </span>

              {/* マッチ度バッジ */}
              {matchScore !== null && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  matchScore === 100
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : matchScore >= 50
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {matchScore === 100 ? '✨ 条件ぴったり' : `条件 ${matchScore}% マッチ`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expanded: Connect button */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={handleConnect}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
              style={{ backgroundColor: config.color }}
            >
              ✨ つながる
            </button>
          </div>
        )}
      </div>

      {/* Limited: 距離が近くないモーダル */}
      {showLimitedModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6"
          onClick={() => setShowLimitedModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="text-4xl">📍</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
              距離が離れています
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              このプロフィールは半径100m以内の人だけ詳細を見られます。
              もっと近づいてみましょう！
            </p>
            <button
              onClick={() => setShowLimitedModal(false)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 text-white"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
