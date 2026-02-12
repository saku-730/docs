# Usage: コンテンツ編集手順

このサイトは `pages/` 配下の `.md` / `.mdx` を元に静的ページを生成します。日本語と英語の2言語を想定しています。

## 1. 新規ページの作成

### 日本語ページの例
1. `pages/ja/` 以下にファイルを作成します。
2. 例: `pages/ja/biology/new-topic.mdx`

```mdx
---
title: 新しいトピック
description: ページの概要

tags:
  - biology
  - modeling
categories:
  - ecology
  - modeling
audience: beginner
created: 2026-02-12T10:00:00+09:00
updated: 2026-02-12T10:00:00+09:00
author: saku
---

# 新しいトピック

本文をここに書きます。
```

### 英語ページの例
1. `pages/en/` 以下にファイルを作成します。
2. 例: `pages/en/biology/new-topic.mdx`

```mdx
---
title: New Topic
description: Page summary

tags:
  - biology
  - modeling
categories:
  - ecology
  - modeling
audience: beginner
created: 2026-02-12T10:00:00+09:00
updated: 2026-02-12T10:00:00+09:00
author: saku
---

# New Topic

Write content here.
```

## 2. サイドバー表示名の追加

同じ階層にある `_meta.js` にページ表示名を追加します。

例: `pages/ja/biology/_meta.js`

```js
export default {
  'lotka-volterra': 'ロトカ・ヴォルテラモデル',
  'new-topic': '新しいトピック'
}
```

英語版の `_meta.js` も同様に更新します。

## 3. タグ/カテゴリのリンク追加（手動）

現状はタグ/カテゴリの一覧ページは手動更新です。

- タグ一覧: `pages/ja/tags/index.mdx`, `pages/en/tags/index.mdx`
- タグ詳細: `pages/ja/tags/*.mdx`, `pages/en/tags/*.mdx`
- カテゴリ一覧: `pages/ja/categories/index.mdx`, `pages/en/categories/index.mdx`
- カテゴリ詳細: `pages/ja/categories/*.mdx`, `pages/en/categories/*.mdx`

新規ページを作成したら、関連するタグ/カテゴリページにリンクを追加してください。

## 4. ローカルでのプレビュー

```bash
npm install
npm run dev
```

`http://localhost:3000/ja` または `http://localhost:3000/en` にアクセスして確認します。

## 5. 静的ビルド・公開

```bash
npm run build
npx next export
```

`out/` に静的ファイルが出力されます。Vercel / GitHub Pages へ配置してください。

## 6. よくある注意点

- `created` は作成時のみ、`updated` は更新時に変更してください。
- `audience` は `beginner` / `expert` のように運用します。
- 数式は `{}` が JSX として解釈されるため、`String.raw` で囲むか `\(` `\)` の形で記述してください。
- `_app.mdx` が存在するため、スタイルは `pages/_app.mdx` から読み込まれます。
