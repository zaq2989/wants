import { useState } from 'react';
import { CATEGORY_CONFIG } from '../data/mockData';

export default function WantCard({ want, onConnect }) {
  const [expanded, setExpanded] = useState(false);
  const config = CATEGORY_CONFIG[want.category] || CATEGORY_CONFIG['趣味'];

  return (
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
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {want.anonymous ? '匿名' : want.name}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded: Connect button */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConnect && onConnect(want);
            }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
            style={{ backgroundColor: config.color }}
          >
            ✨ つながる
          </button>
        </div>
      )}
    </div>
  );
}
