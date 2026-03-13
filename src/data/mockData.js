export const yuiWants = [
  {
    id: '1',
    text: 'アイラのピートについて語りたい',
    category: '飲み',
    distance: 45,
    expiresIn: '2時間後',
    anonymous: false,
    name: 'たろう',
    matched: false,
    conditions: { ageGroup: '30代', gender: '何でも', area: '渋谷' },
  },
  {
    id: '2',
    text: '渋谷で夜ごはん一緒に食べたい',
    category: '食事',
    distance: 120,
    expiresIn: '今日中',
    anonymous: true,
    name: null,
    matched: false,
    conditions: { ageGroup: '20代', gender: '何でも', area: '渋谷' },
  },
  {
    id: '3',
    text: 'カフェでMac作業する人募集',
    category: '趣味',
    distance: 78,
    expiresIn: '3時間後',
    anonymous: false,
    name: 'あいこ',
    matched: false,
    conditions: { ageGroup: '何でも', gender: '何でも', area: '新宿' },
  },
  {
    id: '4',
    text: '週3のバイト探してます（カフェ・接客希望）',
    category: '仕事',
    distance: 200,
    expiresIn: '1週間後',
    anonymous: false,
    name: 'けんた',
    matched: false,
    conditions: { ageGroup: '20代', gender: '何でも', area: '何でも' },
  },
  {
    id: '5',
    text: '終電まで飲み相手',
    category: '飲み',
    distance: 30,
    expiresIn: '3時間後',
    anonymous: true,
    name: null,
    matched: false,
    conditions: { ageGroup: '何でも', gender: '同性', area: '渋谷' },
  },
  { id: '6', text: 'ニトリのベッド組み立て手伝ってほしい', category: '助け合い', distance: 85, expiresIn: '今日中', anonymous: false, name: 'まりこ', matched: false, conditions: { ageGroup: '何でも', gender: '何でも', area: '渋谷' }, reward: 'ビールおごります' },
  { id: '7', text: '週末に畑作業を一緒にやってほしい（野菜持ち帰りOK）', category: '助け合い', distance: 150, expiresIn: '1週間後', anonymous: false, name: 'ひろし', matched: false, conditions: { ageGroup: '何でも', gender: '何でも', area: '何でも' }, reward: 'お礼あり' },
  { id: '8', text: 'なんでも話聞きます。愚痴でもOK', category: '話し相手', distance: 60, expiresIn: '3時間後', anonymous: true, name: null, matched: false, conditions: { ageGroup: '何でも', gender: '何でも', area: '何でも' }, reward: null },
  {
    id: 'my1',
    text: '一緒に渋谷で飲みたい',
    category: '飲み',
    distance: 15,
    expiresIn: '1時間後',
    anonymous: false,
    name: 'あなた',
    matched: false,
    conditions: { ageGroup: '何でも', gender: '何でも', area: '渋谷' },
  },
];

export const mockMatches = [
  { id: 'm1', name: 'あいこ', lastMessage: 'いいですよ！どこのカフェですか？', unread: 1, time: '23:14' },
  { id: 'm2', name: '匿名', lastMessage: '明日でもいいですか？', unread: 0, time: '昨日' },
];

export const yuiMyWants = [
  { id: 'my1', text: '一緒に渋谷で飲みたい', category: '飲み', expiresIn: '1時間後', anonymous: false, responses: 2 },
];

export const mockMessages = {
  'm1': [
    { id: 1, from: 'them', text: 'カフェで作業の件、気になりました！', time: '23:10' },
    { id: 2, from: 'me', text: 'ありがとう！渋谷近辺です', time: '23:12' },
    { id: 3, from: 'them', text: 'いいですよ！どこのカフェですか？', time: '23:14' },
  ],
  'm2': [
    { id: 1, from: 'them', text: '飲みたいですね', time: '昨日 22:00' },
    { id: 2, from: 'me', text: '今夜どうですか？', time: '昨日 22:05' },
    { id: 3, from: 'them', text: '明日でもいいですか？', time: '昨日 22:10' },
  ],
};

export const CATEGORIES = ['全て', '移動', '食事', '飲み', '仕事', '趣味', '助け合い', '話し相手'];

export const CATEGORY_CONFIG = {
  '移動': { color: '#6366f1', bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-600 dark:text-indigo-400', icon: '🚃' },
  '食事': { color: '#f59e0b', bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-600 dark:text-amber-400', icon: '🍜' },
  '飲み': { color: '#8b5cf6', bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-600 dark:text-violet-400', icon: '🍺' },
  '仕事': { color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-600 dark:text-emerald-400', icon: '💼' },
  '趣味': { color: '#ec4899', bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-600 dark:text-pink-400', icon: '🎮' },
  '助け合い': { color: '#14b8a6', bg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-600 dark:text-teal-400', icon: '🤝' },
  '話し相手': { color: '#64748b', bg: 'bg-slate-100 dark:bg-slate-700/60', text: 'text-slate-600 dark:text-slate-400', icon: '💬' },
};
