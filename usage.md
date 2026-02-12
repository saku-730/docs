---
created: '2026-02-13T04:15:03+09:00'
updated: '2026-02-13T04:43:30+09:00'
author: saku
---
# Usage: コンテンツ編集手順

このサイトは `app/` 配下の `page.mdx` を元に静的ページを生成します。日本語と英語の2言語を想定しています。

## 1. 新規ページの作成

### コマンドで作成（推奨）
```bash
npm run page:new
```
1. ディレクトリ名を入力します（例: `biology/new-topic`）。
2. 言語を入力します（空欄なら `ja`）。
3. `app/{lang}/{dir}/page.mdx` が生成されます（`created` は自動入力）。

### 手動作成の例（日本語）
1. `app/ja/` 以下にディレクトリを作成し、`page.mdx` を配置します。
2. 例: `app/ja/biology/new-topic/page.mdx`

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
1. `app/en/` 以下にディレクトリを作成し、`page.mdx` を配置します。
2. 例: `app/en/biology/new-topic/page.mdx`

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

例: `app/ja/biology/_meta.js`

```js
export default {
  'lotka-volterra': 'ロトカ・ヴォルテラモデル',
  'new-topic': '新しいトピック'
}
```

英語版の `_meta.js` も同様に更新します。

## 3. タグ/カテゴリのリンク追加（手動）

現状はタグ/カテゴリの一覧ページは手動更新です。

- タグ一覧: `app/ja/tags/page.mdx`, `app/en/tags/page.mdx`
- タグ詳細: `app/ja/tags/*/page.mdx`, `app/en/tags/*/page.mdx`
- カテゴリ一覧: `app/ja/categories/page.mdx`, `app/en/categories/page.mdx`
- カテゴリ詳細: `app/ja/categories/*/page.mdx`, `app/en/categories/*/page.mdx`

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
- ルートの `app/layout.tsx` で全体レイアウトとスタイルを読み込みます。
- pre-commit フックで `created`/`updated`/`author` を自動更新しています。必要に応じて `npm run fm:update` でも更新できます。
