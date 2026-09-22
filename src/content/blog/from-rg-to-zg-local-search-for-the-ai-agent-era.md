---
title: 'From rg to zg: Local Search for the AI Agent Era'
description: 'Notes on zg (zvec-grep), an open-source local code search tool from Alibaba Cloud that combines vector search, BM25, and rg-style exact match, and why it matters for AI Coding Agents.'
pubDate: 2026-09-05
tags: ['ai-coding-agents', 'developer-tools', 'search', 'ai-engineering']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/05/212704'
originalTitle: '「rg」から「zg」へ――AIエージェント時代のローカル検索'
sourceLanguage: 'ja'
---

For searching source code, ripgrep (rg) is the standard tool. But rg excels specifically when you already know what you're looking for — a function name, an error message, and so on. When you want to search by meaning or intent — something like "the code that restores the theme setting on startup" — you have to guess at the right keywords.

That's where "zg" (zvec-grep), an open-source tool introduced by Alibaba Cloud, comes in: a local search tool aimed at solving exactly this problem. It combines vector search, BM25, and rg-style exact-match search, so you can search loosely in natural language first and then pin down the exact location afterward — which looks quite convenient.

Another nice point is that indexing and embedding are handled locally by design, which makes it easier to work with internal documents or unreleased code. It supports not just a CLI but also MCP, so it can be used directly from AI Coding Agents like Codex and Claude Code.

Going forward, code search seems to be moving away from plain string matching and toward search that understands "what the developer — or the AI — is actually looking for." zg is a tool worth watching as a kind of new grep for the AI agent era.

**References:**
- [From rg to zg: Local Search Beyond Keywords](https://www.alibabacloud.com/blog/from-rg-to-zg-local-search-beyond-keywords_603530)
- [github.com/zvec-ai/zvec-grep](https://github.com/zvec-ai/zvec-grep)

---

*This is an English translation of the original Japanese post: [「rg」から「zg」へ――AIエージェント時代のローカル検索](https://mutomasa.hatenablog.com/entry/2026/09/05/212704)*
