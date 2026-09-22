# Research Portfolioの実装

AstroとMarkdownを使って、個人研究ポートフォリオを構築してください。

## 基本情報

* Name: Masahiro Muto
* Title: AI Engineer & Robotics Researcher
* GitHub: https://github.com/mutomasa
* Hugging Face: https://huggingface.co/mutoamsa

## UIデザイン

白背景・黒文字を基本に、研究者向けのシンプルで洗練されたデザインにしてください。

PCとスマートフォンの両方に対応し、カード形式のレイアウトを使用してください。アイコンはSVGで実装してください。

## ナビゲーション

Home / Projects / Research Blog / Papers / About

## Homeページ

見出し：
Research & Engineering

サブタイトル：
Physical AI · World Models · AI Agents · Knowledge Science

以下の4つのカードを表示してください。

1. Projects：GitHubと自動連携したOSS・研究コード一覧
2. Home Lab：OSS分散計算・最適化・AI・Lakehouse基盤
3. Research Blog：研究日誌・論文解説・実験結果
4. Publications：論文・ポスター・研究成果
5. Live Demos：Hugging Face Spacesで動くAIデモ

各カードにはSVGアイコンを表示してください。

Projects、Research Blog、Publicationsは該当ページにリンクしてください。Live DemosはHugging FaceのSpaces一覧にリンクしてください。

## Projectsページ

GitHub REST APIからmutomasaの公開リポジトリを取得してください。

* 100件を超える場合もページネーションで全件取得
* リポジトリ名・説明・言語・スター数・更新日を表示
* 更新日時の新しい順に並べる
* 名前・説明・言語で検索できる
* ForkとArchivedを識別できる
* 非公開リポジトリは表示しない
* APIエラー時はGitHubのリポジトリ一覧へ誘導

## Research Blog

Astro Content Collectionsを使用してください。

Markdownファイルはsrc/content/blog/で管理します。

記事のFrontmatterはtitle、description、pubDate、tags、draft、github、demoを扱えるようにしてください。

記事一覧・個別記事ページ・日付順表示・関連GitHubリンクを実装してください。

## Papers

論文、ポスター、研究成果を将来的に追加できるページを用意してください。

実在しない論文や実績は作成しないでください。

## About

研究分野とGitHub・Hugging Faceへのリンクを掲載してください。

## 技術的な条件

* AstroのStatic出力を使用
* Astroの現行Content Collections APIを使用
* Dockerとサーバーサイド実行環境は使用しない
* GitHub Actionsでビルドできる構成
* npm run buildが成功すること
* CSSとHTMLはアクセシビリティとレスポンシブ表示に対応

まずサイトを実装し、ローカルでビルドを確認してください。GitHubとHugging Faceへの公開は、実装内容を確認した後に行います。

