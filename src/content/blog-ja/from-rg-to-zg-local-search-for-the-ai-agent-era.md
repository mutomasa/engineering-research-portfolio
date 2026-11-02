---
title: '「rg」から「zg」へ――AIエージェント時代のローカル検索'
description: 'ソースコードの検索では、ripgrep（rg）が定番です。ただしrgが得意なのは、関数名やエラーメッセージなど、検索したい言葉が分かっている場合です。「起動時にテーマ設定を復元している処理」のように、意味や目的から探したいときには、適切なキ…'
pubDate: 2026-09-05
tags: ['ai-coding-agents', 'developer-tools', 'search', 'ai-engineering']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/05/212704'
---
ソースコードの検索では、ripgrep（rg）が定番です。ただしrgが得意なのは、関数名やエラーメッセージなど、検索したい言葉が分かっている場合です。「起動時にテーマ設定を復元している処理」のように、意味や目的から探したいときには、適切なキーワードを推測しなければならない。

そこで、Alibaba Cloudが紹介したオープンソースの「zg（zvec-grep）」は、この課題を解決するローカル検索ツールです。ベクトル検索、BM25、rgによる完全一致検索を組み合わせ、自然言語で曖昧に探索してから、該当箇所を正確に特定できるので便利そうだ。

さらに便利な点としては、インデックス作成や埋め込み処理は基本的にローカルで完結するため、社内文書や未公開コードも扱いやすい設計です。CLIだけでなくMCPにも対応し、CodexやClaude CodeなどのAI Coding Agentから利用できます。

これからのコード検索は、単なる文字列検索ではなく、「開発者やAIが何を探しているのか」を理解する検索へ進んでいきそうです。zgは、AIエージェント時代の新しいgrepとして注目したいツール。

参考：[From rg to zg: Local Search Beyond Keywords](https://www.alibabacloud.com/blog/from-rg-to-zg-local-search-beyond-keywords_603530)

[GitHub - zvec-ai/zvec-grep: Local-first search across your workspace, built for humans and AI agents.](https://github.com/zvec-ai/zvec-grep)
