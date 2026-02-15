---
title: 学習アウトプットサイト
tags:
  - 2025/10
  - Nextjs
draft: false
created: 2025-10-06T00:00:00.000Z
updated: '2026-02-16T01:38:13+09:00'
author: saku
---
###### **目次**
```toc
style:nestedList
minLevel:2
maxLevel:5
```
# 学習アウトプットサイト

数理生物学を中心に色々なものをアウトプットするサイト

## 要件定義

### 1. 目的
- 学術系コンテンツを中心に、Markdown/MDXベースで継続的に執筆・運用できるサイトを構築する。
- 静的ホスティング（Vercel / GitHub Pages）で運用可能とし、保守コストを下げる。
- 同一トピックに対して「入門向け」「専門向け」など複数の表示形式を、同一URL内で切り替え表示できるようにする。

### 2. 開発方針（決定事項）
- フレームワークは **Nextra (Next.js)** を採用する。
- サイトコンテンツは基本的に **`.md` / `.mdx`** で作成する。
- 配信は静的出力（`output: 'export'`）を前提とする。
- 多言語（日本語・英語）対応を標準要件とする。
- frontmatter に `created` / `updated` / `author` を持たせる。

### 3. スコープ
- 本要件定義は、コンテンツサイト（ドキュメント/ナレッジベース）構築に関する要件を対象とする。
- 認証付き編集機能やCMSバックエンドは本フェーズでは対象外（将来拡張扱い）。

### 4. 機能要件

- **FR-01: Markdown/MDX執筆**
  - `.md` / `.mdx` によるページ作成ができること。
  - 執筆者がテキスト中心で更新できること。

- **FR-02: 静的ホスティング**
  - ビルド成果物を静的ファイルとして配信できること。
  - Vercel および GitHub Pages の両方で運用可能であること。

- **FR-03: タグ機能**
  - frontmatter の `tags` を用いて一覧・絞り込みページを提供できること。

- **FR-04: カテゴリ機能**
  - frontmatter の `categories` を用いて分類・導線を提供できること。

- **FR-05: 多言語対応**
  - 少なくとも `ja` / `en` の2言語でページ提供できること。
  - 言語ごとにコンテンツを分離管理できること。

- **FR-06: インタラクティブグラフ**
  - JavaScriptベースのグラフ（例: Plotly/ECharts系）をMDXページ内に埋め込めること。
  - 必要なページでのみクライアント側描画を有効化できること。

- **FR-07: 同一URL内の表示切替**
  - 同一トピック・同一URL内で、少なくとも「入門」「専門」の2表示を切り替えられること。
  - 切替はページ内UI（タブ/トグル）で実現し、ページ遷移を必須としないこと。
  - 表示状態はセッション中に保持できること（任意で永続化可）。

- **FR-08: frontmatterメタデータ管理**
  - 全コンテンツで `created` / `updated` / `author` を保持すること。
  - `created` と `updated` は日時形式であること。
  - `author` は文字列または文字列配列であること。

- **FR-09: frontmatter自動更新**
  - 新規作成時に `created` / `updated` を自動設定できること。記事作成はページ作成コマンドを用意してテンプレで`created`を埋める。
  - 更新時に `updated` を自動更新できること。git commit 時に自動更新する。
  - `author` は手動入力を許容しつつ、可能であれば自動挿入できること。

### 5. コンテンツ仕様

- **配置方式（page.mdx方式）**
  - App Router 配下で `page.mdx` を用いてページを構成する。
  - 例:
    - `app/ja/topic-a/page.mdx`
    - `app/en/topic-a/page.mdx`

- **ページ単位ディレクトリ**
  - ページごとにディレクトリを作成し、本文と画像等を同居させる。
  - 例:
    - `app/ja/topic-a/page.mdx`
    - `app/ja/topic-a/figure-1.png`

- **frontmatter標準項目**
  - `title`
  - `description`
  - `tags`（配列）
  - `categories`（配列）
  - `audience`（`beginner` / `expert` など）
  - `created`（日時）
  - `updated`（日時）
  - `author`（文字列または配列）

- **日時フォーマット**
  - ISO 8601 を採用する。
  - 例: `YYYY-MM-DDTHH:mm:ss+09:00`

### 6. 自動化要件（運用ルール）

- **AUT-01: created の取り扱い**
  - 初回作成時に自動設定し、以後は自動変更しない。

- **AUT-02: updated の取り扱い**
  - コンテンツ本文またはfrontmatter変更時に自動更新する。

- **AUT-03: author の取り扱い**
  - 既定値を自動挿入できること（例: サイト設定値、Git著者名）。
  - 手動上書きを許可する。

- **AUT-04: 実行ポイント**
  - ローカル（pre-commit / スクリプト）またはCI（build前）で自動処理できること。
  - どちらの方式でも同一結果になること。

### 7. 情報設計・URL設計

- **言語プレフィックス**
  - `/ja/...`
  - `/en/...`

- **同一URL内切替**
  - 同一ページ内で「入門」「専門」を切り替える。
  - ルーティング分岐（`/beginner` `/expert`）を必須としない。
  - 必要に応じて選択状態をブラウザ保存して再訪時に復元する。

- **一覧系ページ**
  - `/tags/[tag]`
  - `/categories/[category]`

### 8. 非機能要件

- **NFR-01: 保守性**
  - コンテンツ更新時にアプリケーションコード変更を極力不要にすること。
  - frontmatter規約を固定し、lint/チェックで逸脱を防止すること。

- **NFR-02: 移行容易性**
  - 既存Markdown資産を流用しやすい構成であること。
  - コンテンツ構造をフレームワーク依存しすぎないこと。

- **NFR-03: パフォーマンス**
  - 静的配信を前提に高速表示を担保すること。
  - 重いJSは必要ページのみでロードすること。

- **NFR-04: 可搬性**
  - ホスティング先（Vercel / GitHub Pages）を切り替えても運用継続できること。

- **NFR-05: 一貫性**
  - created/updated/author の自動処理により、メタデータ品質を一定に保つこと。

### 9. ホスティング要件

- **Vercel**
  - Next.jsプロジェクトとしてデプロイ可能であること。
  - 静的出力運用を選択可能であること。

- **GitHub Pages**
  - 静的成果物（`out/`）をActions経由でデプロイできること。
  - Project Pages運用時はサブパス配信（`basePath` など）を考慮すること。

### 10. 技術的制約・注意事項（静的出力前提）

- サーバー依存機能（SSR前提機能）は利用しない設計とする。
- 動的ルートを使う場合は静的生成前提の実装にする。
- 言語自動判定リダイレクトのような実行時処理には依存しない。
- 言語遷移は明示リンク（言語スイッチ）を基本とする。

### 11. 受け入れ基準（Definition of Done）

- [x] `.md/.mdx` だけで新規ページを追加できる。
- [x] `ja/en` 2言語で同一トピックのページ提供ができる。
- [x] タグ一覧・カテゴリ一覧・各詳細ページが表示される。
- [x] MDX内でインタラクティブグラフが表示される。
- [x] 同一URL内で「入門/専門」を切り替え表示できる。
- [ ] 新規作成時に `created` / `updated` が自動設定される。
- [ ] 更新時に `updated` が自動更新される。
- [x] `author` が手動または自動で設定される。
- [x] 静的ビルドが成功し、VercelまたはGitHub Pagesで公開できる。

### 12. 将来拡張（任意）

- 検索機能の強化（静的検索インデックス導入）
- 目次・関連記事・難易度別導線の最適化
- コンテンツ品質管理（frontmatter検証、リンクチェック、CI強化）
- 分析基盤（アクセス解析・検索語分析）

## 作業進捗
- 2026-02-12: Nextra (Next.js) ベースのデモ構成を作成。`content/ja`/`content/en` に多言語ページ、タグ/カテゴリ一覧と詳細、`biology/lotka-volterra` に入門/専門タブとインタラクティブグラフを追加。
- 2026-02-12: ルーティング (`app/[locale]/[[...mdxPath]]/page.tsx`) と Nextra レイアウト、`mdx-components.tsx`、`theme.config.tsx`、`next.config.mjs` を用意。
- 2026-02-12: 現時点の作成範囲は「サイト骨組み + サンプルコンテンツ + タグ/カテゴリ詳細 + 1本のデモ記事」。自動更新スクリプトやCIは未実装。
- 2026-02-12: Tabs コンポーネントの使い方を `Tabs.Tab` に修正（`content/ja/biology/lotka-volterra.mdx` と `content/en/biology/lotka-volterra.mdx`）。
- 2026-02-12: build エラー対応のため App Router を外し、Pages Router 構成へ移行。`app/` を `app_bak/` に退避し、`content/` を `pages/` に移動。`pages/_app.tsx` と `pages/_document.tsx` を追加。
- 2026-02-12: `next.config.mjs` の i18n と turbopack 設定を削除。`package.json` を Next 13 / React 18 / Nextra 2.13.4 に固定。
- 2026-02-12: `npm install` は npm レジストリ到達失敗（`EAI_AGAIN`）で中断。既存 `node_modules` で `npm run build` を試行したが TypeScript フェーズでタイムアウト。ビルドの成否は未確定。
- 2026-02-12: `npm install` を再実行後、`npm run build` は型チェック/リントをスキップして完了。`npx next export` により `out/` 生成を確認。
- 2026-02-12: 型チェック/リントを有効化して `npm run build` を再試行したが、`Linting and checking validity of types ...` 以降で停止。`eslint`/`typescript` が未導入のため devDependencies に追加したが、`npm install` が `EAI_AGAIN` で失敗している。
- 2026-02-12: ビルド時に `app_bak` が型チェック対象になり `nextra/pages` 未解決で失敗したため、`tsconfig.json` の `exclude` に `app_bak` を追加。
- 2026-02-12: `pages/*/biology/lotka-volterra.mdx` の Tabs 内リストがパースエラーを起こしていたため、`<div>` と明示的な HTML 要素で包んで修正。
- 2026-02-12: 数式内の `{dx}` が JSX として評価され `ReferenceError` になっていたため、`String.raw` で `\\[ ... \\]` を文字列化して回避。
- 2026-02-12: `npm run build` が型チェック/リント込みで成功。全 24 ページの静的生成完了を確認。
- 2026-02-12: 警告対応として `package.json` に `"type": "module"` を追加し、`pages/_app.tsx` を `pages/_app.mdx` に変更。
- 2026-02-12: Nextra の git リポジトリ警告を解消するため `git init` を実行。
- 2026-02-12: コンテンツ編集手順（md/mdx 作成、_meta 更新、プレビュー、ビルド手順）を `usage.md` に整理。
- 2026-02-12: frontmatter 自動更新のため `scripts/update-frontmatter.mjs` と `.githooks/pre-commit` を追加。`git config core.hooksPath .githooks` を設定し、`package.json` に `fm:update` スクリプトと `gray-matter` を追加。
- 2026-02-12: `npm run fm:update` の動作確認を実施。テスト mdx に `created`/`updated`/`author` が自動挿入・更新されることを確認し、外部パスを git add しないようスクリプトを調整。
- 2026-02-13: `pages/ja/overview.mdx` に1行追加して commit を実行。pre-commit により `updated` が更新されることを確認。`git push` はネットワーク解決失敗で未実施。
- 2026-02-13: コンテンツ構成を `app/{locale}/{topic}/page.mdx` 方式に移行。`pages/` 配下の MDX と `_meta.js` を `app/` 配下へ移動し、`app/layout.tsx` を新規作成。`usage.md` を新構成に更新。
- 2026-02-13: フロントマターのみのテンプレートとして `templates/page.mdx` を追加。
- 2026-02-13: テンプレートから `app/{lang}/{dir}/page.mdx` を生成する `scripts/new-page.mjs` と `npm run page:new` を追加。`usage.md` に手順を追記。
- 2026-02-13: `npm run dev` で `ERR_INVALID_ARG_TYPE`（Nextra が `pages` ディレクトリ解決に失敗）を確認。`pages/` 構成を復元し、`app/` は `app_router_bak/` に退避してルート競合を解消。`scripts/new-page.mjs` と `usage.md` を `pages` 基準へ修正し、`pages/*/biology/lotka-volterra.mdx` の `InteractiveGrowth` import 相対パスを修正。`npm run build` と `npm run dev`（20秒起動）でエラー解消を確認。
- 2026-02-13: コンテンツ配置を「ページ単位ディレクトリ」に統一するため、`pages/{lang}/.../*.mdx` を `pages/{lang}/.../index.mdx` へ移行。`scripts/new-page.mjs` を `pages/{lang}/{path}/index.mdx` 生成に変更し、`usage.md` を同方針へ更新。`pages/*/biology/lotka-volterra/index.mdx` の import 相対パスを調整し、`npm run build` 成功を確認。
- 2026-02-13: `lotka-volterra` ページで hydration mismatch（`Expected server HTML to contain a matching <p> in <p>`）を確認。`Tabs` の初期表示差異を避けるため `pages/ja/biology/lotka-volterra/index.mdx` と `pages/en/biology/lotka-volterra/index.mdx` から `storageKey` を削除し、`defaultIndex` のみ使用するよう変更。`npm run build` 成功を確認。
- 2026-02-13: サイドバーで現在言語以外のメニューを表示しないように調整。`pages/_app.mdx` で `asPath` から `data-current-locale` を付与し、`styles/locale-sidebar.css` で `aside` 内の逆言語リンク（`/ja` or `/en`）を非表示化。`npm run build` 成功を確認。
- 2026-02-13: 左サイドバーに `en`/`ja` の言語ルート見出しが残る問題に対応。`styles/locale-sidebar.css` に `ul.nextra-menu-desktop > li:has(a[href^='/en/'])` / `...'/ja/'` の非表示ルールを追加し、逆言語のルートグループ自体を非表示化。`npm run build` 成功を確認。
- 2026-02-13: `lotka-volterra` ページの hydration mismatch（`Expected server HTML to contain a matching <p> in <p>`）再発に対応。`pages/ja/biology/lotka-volterra/index.mdx` と `pages/en/biology/lotka-volterra/index.mdx` の `Tabs.Tab` 内で `<p>` を `<div>` に置換し、式表示を `<pre><code>` へ変更して段落ネストの不整合を回避。`npm run build` 成功を確認。
- 2026-02-15: ヘッダーロゴのリンク先を固定 `/` から現在言語トップ（`/ja` または `/en`）へ変更。`theme.config.tsx` の `logo` を `useRouter().asPath` 判定のリンクコンポーネントへ差し替え。
- 2026-02-15: 言語切り替えUIをサイドバー下からヘッダー（検索ボックス左）へ移動。`theme.config.tsx` にヘッダー用 `HeaderLocaleSwitch` を追加し、`navbar.extraContent` で配置、既定のサイドバー言語スイッチを出さないため `i18n` を空配列化。`npm run build` 成功を確認。
- 2026-02-15: 運用ドキュメント更新ルールとして、仕様・運用変更時は `Codex.md` と `usage.md` へ追記する方針を `usage.md` に明記。
- 2026-02-15: 言語切り替えUIの位置を再調整。ヘッダー右側で検索ボックスの左に固定するため、`theme.config.tsx` の `HeaderLocaleSwitch` から `order` インライン指定を除去し、`styles/locale-sidebar.css` に `nav .header-locale-switch { order: 1; }` / `nav .nextra-search { order: 2; }`（`md` 以上）を追加。`npm run build` 成功を確認。
- 2026-02-15: 左サイドバーの表示項目を簡素化。`pages/ja/_meta.js` と `pages/en/_meta.js` を更新し、上位項目を `ホーム(Home) / タグ一覧(Tags) / カテゴリ一覧(Categories)` のみに制限、`overview` と `biology` は `display: 'hidden'` 化。`pages/{ja,en}/tags/_meta.js` と `pages/{ja,en}/categories/_meta.js` を追加し、詳細ページ項目（`biology`/`modeling`/`ecology`）を非表示化。さらに `styles/locale-sidebar.css` で `a[href='/ja']` / `a[href='/en']` を非表示化して言語ラベル表示を抑制。`npm run build` 成功を確認。
- 2026-02-15: 左サイドバー最上部の言語欄が残るケースに対応。`styles/locale-sidebar.css` を更新し、`/ja/`・`/en/`（末尾スラッシュ付き）とその親 `li` も非表示対象へ追加。`npm run build` 成功を確認。
- 2026-02-15: 左サイドバーの先頭 `ja/en` 見出しがリンクではなくボタン要素だったため、`styles/locale-sidebar.css` に `ul.nextra-menu-desktop > li:has(a[href^='/ja/']) > button` / `...'/en/'...` の非表示ルールを追加して見出し自体を非表示化。`npm run build` 成功を確認。
- 2026-02-15: 左サイドバーの階層構造を無効化。`styles/locale-sidebar.css` でサイドバー内の `button` を非表示にし、`/ja/`・`/ja/tags/`・`/ja/categories/`（英語側は `/en/...`）以外のリンクを非表示化。あわせてネスト用のインデント/縦線（`ul` の margin/padding と `::before`）を無効化してフラット表示に変更。`npm run build` 成功を確認。
- 2026-02-15: 要望により左サイドバー設定を元に戻し。`pages/ja/_meta.js` と `pages/en/_meta.js` を標準項目（`overview` / `biology` を含む）へ復元し、追加していた `pages/{ja,en}/tags/_meta.js` と `pages/{ja,en}/categories/_meta.js` を削除。`styles/locale-sidebar.css` からサイドバー制御ルールを撤去して、ヘッダー配置調整（`nav .header-locale-switch` と `nav .nextra-search` の `order`）のみ残す。`npm run build` 成功を確認。
