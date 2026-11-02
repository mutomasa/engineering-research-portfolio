---
title: 'D2：図を「描く」から「コードで管理する」へ。AI時代のDiagram as Code'
description: 'システム設計やAI Agentの開発をしていると、アーキテクチャ図やフローチャートを作る機会が多くあります。 ただ、GUIで図を描いていると、構成を変更するたびにボックスや矢印を動かしたり、レイアウトを調整したりする必要があります。 そんな…'
pubDate: 2026-09-18
tags: ['ai-coding-agents', 'developer-tools', 'diagram-as-code', 'ai-engineering']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/18/112355'
---
システム設計やAI Agentの開発をしていると、アーキテクチャ図やフローチャートを作る機会が多くあります。

ただ、GUIで図を描いていると、構成を変更するたびにボックスや矢印を動かしたり、レイアウトを調整したりする必要があります。

そんなときに便利なのが、[D2](https://d2lang.com/)というDiagram as Codeツールです。

D2は、テキストでノードと接続関係を記述するだけで、システム構成図などを自動生成できるツールです。

最近はClaude CodeやCodexなどのAI Coding Agentを使った開発が増えているので、図もコードで管理するという考え方は、これからますます重要になるのではないかと思っています。 これまで、MermaidやDraw.ioを使ってきました。簡単な適材適所として比較表です。

## Mermaid・draw.io MCP・D2の適材適所

この3つは、どれか1つに統一するよりも、図を作る目的や、誰が更新するかによって使い分けるのがよいと思います。

特にAI Coding Agentを使った開発では、次のように整理できます。

| ツール | 得意なこと | 主な用途 |
| --- | --- | --- |
| Mermaid | Markdownと一緒に図を管理する | README、処理フロー、シーケンス図 |
| draw.io MCP | AIで図を生成し、人間がGUIで仕上げる | 顧客提案書、システム構成図、詳細な設計図 |
| D2 | 図の構造・レイアウト・デザインをコードで管理する | アーキテクチャ図、技術ブログ、研究資料 |

MermaidはGitHubなどでのMarkdown内表示に対応し、draw.io MCPはAIから編集可能な図を生成できます。D2は専用の宣言的言語で図を定義する方式です。

## D2の何が便利なのか？

### 1\. 図のレイアウトを自動調整してくれる

D2では、要素同士の関係をコードで記述すると、レイアウトエンジンが自動的に図を配置してくれます。

例えば、システム構成に新しいAI Agentやデータベースを追加した場合でも、基本的にはノードと接続関係を追加するだけです。

手作業でボックスを移動したり、矢印の位置を調整したりする時間を減らせます。

図の見た目を整えるよりも、システムの構造や設計そのものに集中できるのがメリットです。

### 2\. Gitで図の変更履歴を管理できる

個人的に大きなメリットだと感じているのが、Gitとの相性です。

D2のソースコードはテキストファイルなので、通常のソースコードと同じようにGitで差分を確認できます。

例えば、アーキテクチャを変更した際に、Pull Requestで実装コードと構成図を一緒にレビューできます。

設計書を一度作って終わりにするのではなく、実装と一緒に継続的に更新していくことができます。

### 3\. AI Coding Agentとの相性がよい

ここが、私が特に注目しているポイントです。

Claude CodeやCodexなどのAI Coding Agentは、テキストファイルの生成や編集を得意としています。

D2を使えば、AI Coding Agentにリポジトリを解析させ、システム構成図のコードを生成してもらうこともできます。

さらに、アーキテクチャの変更に合わせて既存の図を更新したり、ADR（Architecture Decision Record）と構成図の整合性を確認したりする仕組みも考えられます。

もちろん、これらはD2単体の機能ではなく、AI Coding Agentと組み合わせた活用方法です。

Markdownで設計の意図を記録し、D2でシステム構成を管理することで、AI Agentが設計を理解しやすい開発環境を構築できると思います。

### 4\. ブログや論文、プレゼン資料にも使える

D2はSVGやPNG、PDF、PPTXなどの形式で図を出力できます。

特にSVGで出力できるのは便利です。ブログや技術ドキュメントに掲載しても、拡大したときに文字や線が劣化しにくくなります。

また、テーマの切り替えや手描き風のSketch Modeなどにも対応しています。

研究であれば、実験システムのアーキテクチャを論文や発表資料に再利用する使い方もできそうです。

## 実際にD2で図を書いてみる

例えば、AI AgentがRAGを使って回答するシステムを考えてみます。

D2では、次のように記述できます。

```
direction: right

user: User
agent: AI Agent
retriever: Retriever
vector_db: Vector DB {
  shape: cylinder
}
llm: LLM

user -> agent: Question
agent -> retriever: Search
retriever -> vector_db: Query
vector_db -> retriever: Documents
retriever -> llm: Context
llm -> user: Answer
```

これだけで、各コンポーネントとデータの流れを表す図を生成できます。

作成したコードを`architecture.d2`として保存し、次のコマンドでSVGに変換できます。

```bash
d2 architecture.d2 architecture.svg
```

また、`--watch`を付けることで、ファイルの変更を監視し、図を自動更新できます。

```bash
d2 --watch architecture.d2 architecture.svg
```

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/muto_masa/20260918/20260918112618.png)

インストールする前に試してみたい場合は、[D2 Playground](https://play.d2lang.com/)からブラウザ上で実行できます。

## まとめ：図もコードとして管理する時代へ

D2は、単に図を簡単に描くためのツールというよりも、図をソフトウェア開発のワークフローに組み込むためのツールだと感じています。

もちろん、細かな配置を手作業で調整したい場合などは、従来のGUIツールの方が向いていることもあります。

それでも、AI Coding Agentを使って設計から実装まで進める開発スタイルでは、Diagram as Codeという考え方は重要になると思います。

今後は、自分が開発している[research\_os](https://github.com/mutomasa/research_os)にも組み込み、研究システムのアーキテクチャやAI Agentのワークフローをコードで管理する使い方を試してみたいです。

**参考リンク**

-   [D2公式サイト](https://d2lang.com/)
-   [D2 GitHub](https://github.com/d2lang/d2)
-   [D2 Playground](https://play.d2lang.com/)
