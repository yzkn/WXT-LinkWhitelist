# WXT-LinkWhitelist

ホワイトリストに登録されたURLにのみ遷移できるようにするFirefox/Chrome拡張機能

---

# 手順

## プロジェクトを作成

```sh
npx wxt@latest init LinkWhitelist
```

> √ Choose a template » vue
>
> √ Package Manager » npm

```sh
cd LinkWhitelist
npm install

# npm run dev # Chrome
npm run dev:firefox
```

## Edgeで動作確認するための設定を追記

- package.json

```
    "dev:edge": "wxt -b edge",
```

## ブラウザのパスを設定

以下のいずれかのファイルに追記（web-ext.config.tsが優先）

- wxt.config.ts

```ts
  runner: {
    binaries: {
      chrome: 'C:/Program Files/chrome-win/chrome.exe',
      edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      firefox: 'C:/Program Files/Mozilla Firefox/firefox.exe',
    },
  }
```

- web-ext.config.ts（ファイルを新規作成して追記）

```ts
import { defineRunnerConfig } from 'wxt';

export default defineRunnerConfig({
    binaries: {
        chrome: 'C:/Program Files/chrome-win/chrome.exe',
        edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        firefox: 'C:/Program Files/Mozilla Firefox/firefox.exe',
    },
});
```

```sh
npm run dev
npm run dev:edge
npm run dev:firefox
```

---

Copyright (c) 2024 YA-androidapp(https://github.com/yzkn) All rights reserved.
