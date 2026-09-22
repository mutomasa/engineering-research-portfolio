# Engineering Research Portfolio

Masahiro Muto の研究ポートフォリオサイトです。[Astro](https://astro.build) の静的出力（サーバーサイド実行なし）で構築しています。

## 必要環境

Node.js 22.12 以上

## コマンド

| コマンド            | 内容                                  |
| :------------------ | :------------------------------------ |
| `npm install`       | 依存関係のインストール                |
| `npm run dev`       | 開発サーバーの起動                    |
| `npm run build`     | `dist/` に静的サイトをビルド          |
| `npm run preview`   | ビルド結果のローカルプレビュー        |

## 構成

```text
├── .github/workflows/deploy.yml  # GitHub Actions（ビルド検証・日次リビルド）
├── public/
│   ├── README.md                 # Hugging Face Space 用の設定（dist/ にコピーされる）
│   └── images/
└── src/
    ├── components/Icon.astro     # SVG アイコン
    ├── layouts/Layout.astro      # 共通ヘッダー・フッター
    ├── pages/                    # index / projects / papers / presentations / about / lab / blog
    ├── content/blog/             # ブログ記事（Markdown）
    ├── content/lab/home-lab.md   # Home Lab の解説（/lab に表示）
    ├── content.config.ts         # Content Collections の定義
    ├── consts.ts                 # 名前・リンク・ナビゲーション
    ├── data/publications.ts      # 論文・ポスター等のデータ
    ├── lib/                      # GitHub API・Speaker Deck 取得、ブログ用ヘルパー
    └── styles/global.css
```

## コンテンツの追加

### ブログ記事

`src/content/blog/` に Markdown ファイルを追加します。Frontmatter は次のとおりです。

```yaml
---
title: '記事タイトル'
description: '一覧に表示される説明'
pubDate: 2026-09-21
tags: ['tag1', 'tag2'] # 省略可
draft: false # true にすると非公開（省略可）
github: 'https://github.com/mutomasa/...' # 関連リポジトリ（省略可）
demo: 'https://huggingface.co/spaces/...' # デモ（省略可）
---
```

### 論文・ポスター・研究成果

`src/data/publications.ts` の `publications` 配列に追加します。実在するものだけを追加してください。

## Projects ページについて

ビルド時に GitHub REST API（`/users/mutomasa/repos`）から公開リポジトリを全件（ページネーション対応）取得し、静的 HTML に埋め込みます。最新化するにはリビルドが必要で、GitHub Actions が毎日ビルドします。

ローカルでレート制限に当たる場合は、環境変数 `GITHUB_TOKEN` を設定してビルドしてください。取得に失敗した場合は、GitHub のリポジトリ一覧へのリンクを表示します。

## Presentations ページについて

ビルド時に Speaker Deck の Atom フィード（`https://speakerdeck.com/mutomasa.atom`）から公開スライドを取得し、静的 HTML に埋め込みます。最新化するにはリビルドが必要です。取得に失敗した場合は、Speaker Deck のプロフィールへのリンクを表示します。
