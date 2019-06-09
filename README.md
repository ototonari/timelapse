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

1. リポジトリのクローン
```
git clone https://github.com/ototonari/timelapse.git
cd timelapse/example
```

2. yarnを利用する場合
```
yarn install
yarn start
```

(2. npm を利用する場合)
```
npm install
npm run start
```

### インストール方法

1. yarnを使う
```
yarn add react-timelapse
```

(1. npmを使う)
```
npm install --save react-timelapse
```

### コンポーネントの使い方

```jsx
import React, { useState } from 'react';
import { sampleImageCreator } from "./lib/Utils";
import { Timelapse } from "react-timelapse"

// たとえばこんな感じ(srcはurlでも可能)
const images = [
  {
    src: "../public/assets/sample/img0001.jpg"
    alt: "sampleImage"
  }
]

const App: React.FC = () => {
  const [timelapseHandle, setTimelapseHandle] = useState<null | boolean>(null)
  const startTimelapse = () => {
    // 読み込みが終わり次第、再生する場合はこのようにする
    setTimelapseHandle(true)
  }
  return (
    <div className="App">
      <Timelapse
        fps={60} // 描画する速さを指定
        timelapseHandle={timelapseHandle} // boolean を渡すことで再生、停止が行える（デフォルトはnull）
        preloadedCallback={startTimelapse} // 画像の読み込みが終わった時に呼ばれる関数
        images={images} // 描画する画像ファイルを渡す
        width={864} // 描画ウィンドウの幅
        height={540} // 描画ウィンドウの高さ
      />
    </div>
  );
}

export default App;
```

### ディレクトリ構成
- リポジトリのディレクトリが以下の用途で利用されます
  - npm モジュールの公開
  - 動作確認
  - 開発環境

```

.
├── dist // npm モジュール公開
│   ├── index.js
│   └── package.json // npm publish
├── example // 動作確認
│   ├── public
│   ├── src
│   └── tsconfig.json // npm run start | yarn start
├── src // 開発環境
│   ├── component
│   ├── index.tsx
│   └── lib
└── tsconfig.json // tsx compile
```