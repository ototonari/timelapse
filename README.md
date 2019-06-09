## タイムラプス コンポーネント

### 機能
- 画像をタイムラプスのように連続で表示させることができます。
- あらかじめ読み込むのでスムーズに再生が可能です。
- 画像はローカル, Urlどちらでも対応しています。
- React Component です。

### プラットフォーム
- Web

### 使用技術
- React

### 試してみる
```
git clone https://github.com/ototonari/timelapse.git
cd timelapse/example

yarn install
yarn start
// or npm install
// npm run start
```

### ディレクトリ構成
- リポジトリのディレクトリが以下の用途で利用されます
  - npm モジュールの公開
  - 動作確認
  - 開発環境
.
├── dist // npm モジュール公開
│   ├── index.js
│   └── package.json // npm publish
├── example // 動作確認
│   ├── public
│   ├── src
│   └── tsconfig.json // npm run start | yarn start
├── src // 開発環境
│   ├── component
│   ├── index.tsx
│   └── lib
└── tsconfig.json // tsx compile
