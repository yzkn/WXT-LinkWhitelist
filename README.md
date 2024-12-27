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

- web-ext.config.ts

```ts
import { defineRunnerConfig } from 'wxt';

export default defineRunnerConfig({
    binaries: {
        chrome: 'C:/Program Files/chrome-win/chrome.exe',
        firefox: 'C:/Program Files/Mozilla Firefox/firefox.exe',
        edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    },
});
```

```sh
npm run dev:edge
```

---

Copyright (c) 2024 YA-androidapp(https://github.com/yzkn) All rights reserved.
