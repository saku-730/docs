---
created: '2026-02-13T04:15:03+09:00'
updated: '2026-02-16T01:40:34+09:00'
author: saku
---
# Usage: コンテンツ編集手順

このサイトは `pages/` 配下の「ページ単位ディレクトリ（`index.mdx`）」を元に静的ページを生成します。日本語と英語の2言語を想定しています。

## 1. 新規ページの作成

### コマンドで作成（推奨）
```bash
npm run page:new
```
1. ルートパスを入力します（例: `biology/new-topic`）。
2. 言語を入力します（空欄なら `ja`）。
3. `pages/{lang}/{path}/index.mdx` が生成されます（`created` は自動入力）。

### 手動作成の例（日本語）
1. `pages/ja/` 以下にページ用ディレクトリを作成し、`index.mdx` を配置します。
2. 例: `pages/ja/biology/new-topic/index.mdx`

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
1. `pages/en/` 以下にページ用ディレクトリを作成し、`index.mdx` を配置します。
2. 例: `pages/en/biology/new-topic/index.mdx`

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

現行のサイドバー上位項目は `ホーム / タグ一覧 / カテゴリ一覧`（英語側は `Home / Tags / Categories`）のみを表示する運用です。その他の項目は `_meta.js` の `display: 'hidden'` で非表示にします。

## 3. タグ/カテゴリのリンク追加（手動）

現状はタグ/カテゴリの一覧ページは手動更新です。

- タグ一覧: `pages/ja/tags/index.mdx`, `pages/en/tags/index.mdx`
- タグ詳細: `pages/ja/tags/*/index.mdx`, `pages/en/tags/*/index.mdx`
- カテゴリ一覧: `pages/ja/categories/index.mdx`, `pages/en/categories/index.mdx`
- カテゴリ詳細: `pages/ja/categories/*/index.mdx`, `pages/en/categories/*/index.mdx`

新規ページを作成したら、関連するタグ/カテゴリページにリンクを追加してください。

## 4. ローカルでのプレビュー

```bash
npm install
npm run dev
```

`http://localhost:3000/ja` または `http://localhost:3000/en` にアクセスして確認します。

## 5. 言語切り替え（UI）

- ヘッダー左上のサイト名は、現在の言語トップへ遷移します（`/ja` または `/en`）。
- 言語切り替えはヘッダー右側エリアの検索ボックス左にあります。
- 切り替え時は現在ページの言語プレフィックス（`/ja` / `/en`）だけを置換して遷移します。
- 左サイドバーは現在の言語ルートのみ表示し、反対言語のグループは表示しません。

## 6. 静的ビルド・公開

```bash
npm run build
npx next export
```

`out/` に静的ファイルが出力されます。Vercel / GitHub Pages へ配置してください。

## 7. よくある注意点

- `created` は作成時のみ、`updated` は更新時に変更してください。
- `audience` は `beginner` / `expert` のように運用します。
- 数式は `{}` が JSX として解釈されるため、`String.raw` で囲むか `\(` `\)` の形で記述してください。
- 全体スタイルは `pages/_app.mdx` で読み込みます。
- pre-commit フックで `created`/`updated`/`author` を自動更新しています。必要に応じて `npm run fm:update` でも更新できます。
- 仕様・運用の変更を行った場合は、`Codex.md` と `usage.md` に変更内容を追記してください。
