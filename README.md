# Yui 🪢

> 結い — 近くのニーズをつなぐ

近くにいる人と、食事・飲み・助け合い・話し相手をマッチングするローカルSNS。

## Features
- 🗺 GPS近傍マッチング
- 📡 Bluetooth近傍発見（BLE）
- 🤝 助け合いカテゴリ（ベッド組み立て・畑作業など）
- 🔔 Web Push通知
- 👤 プロフィール公開設定（公開/近くのみ/非公開）

## Tech Stack
- React + Vite + Tailwind CSS
- Capacitor (iOS/Android)
- PWA (Web Push, Service Worker)

## Dev
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
railway up --service wants
```

## iOS Build (Mac required)
```bash
npm run cap:ios  # Opens Xcode
```
