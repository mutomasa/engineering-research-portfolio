---
title: '参考文献'
description: '本書の執筆にあたって参照した、またはさらに学ぶために役立つ書籍・論文・公式資料の一覧です。'
updated: 2026-11-08
series: architecture
order: 91
label: '付録B'
tags: ['References']
---

本書の内容をさらに深く学ぶための書籍・論文・公式資料です。版や URL は変わることがあるため、利用時に最新の情報を確認してください（URL の参照日：2026年11月）。

## 建築の思想とパターン（第2章）

| 文献 | 内容 |
|---|---|
| Vitruvius, *De architectura*（『建築について』、紀元前1世紀） | 現存最古の体系的な建築書。強さ・用・美の3原則 |
| Christopher Alexander ほか, *A Pattern Language*, Oxford University Press, 1977 | 253のパターンによる建築・都市の設計言語 |
| Stewart Brand, *How Buildings Learn*, Viking, 1994 | 変化の速さが異なる建物の層（shearing layers） |
| Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides, *Design Patterns*, Addison-Wesley, 1994 | オブジェクト指向設計の23パターン（GoF） |

## 設計の原則と方法（第1・4・6章）

| 文献 | 内容 |
|---|---|
| David L. Parnas, "On the Criteria To Be Used in Decomposing Systems into Modules," *Communications of the ACM*, 1972 | 情報隠蔽によるモジュール分割 |
| Frederick P. Brooks, Jr., "No Silver Bullet: Essence and Accident in Software Engineering," 1986 | 本質的な複雑さと偶有的な複雑さ |
| Melvin E. Conway, "How Do Committees Invent?," *Datamation*, 1968 | コンウェイの法則 |
| Len Bass, Paul Clements, Rick Kazman, *Software Architecture in Practice*, Addison-Wesley | 品質特性とアーキテクチャ評価（ATAM） |
| Robert C. Martin, *Clean Architecture*, Prentice Hall, 2017 | 依存性のルールと SOLID 原則 |
| Eric Evans, *Domain-Driven Design*, Addison-Wesley, 2003 | ドメイン駆動設計、境界づけられたコンテキスト |
| Neal Ford, Rebecca Parsons, Patrick Kua, *Building Evolutionary Architectures*, O'Reilly | 進化的アーキテクチャと適応度関数 |
| Simon Brown, [The C4 model for visualising software architecture](https://c4model.com/) | C4 モデルの公式サイト |
| Michael Nygard, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 2011 | ADR の提案 |
| Alistair Cockburn, [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/), 2005 | Ports & Adapters |

## ITの歴史・コンピュータ・ネットワーク（第3・5章）

| 文献 | 内容 |
|---|---|
| Andrew S. Tanenbaum ほか, *Computer Networks*, Pearson | ネットワークの標準的な教科書 |
| W. Richard Stevens, *TCP/IP Illustrated*, Addison-Wesley | TCP/IP の詳細 |
| Andrew S. Tanenbaum, Herbert Bos, *Modern Operating Systems*, Pearson | OS の標準的な教科書 |
| James Lewis, Martin Fowler, [Microservices](https://martinfowler.com/articles/microservices.html), 2014 | マイクロサービスの特徴の整理 |
| Martin Fowler, [MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html), 2015 | まずモノリスから始める考え方 |
| Sam Newman, *Building Microservices*, O'Reilly | マイクロサービスの設計と運用 |
| IETF, [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) / [RFC 8446: TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446) | HTTP と TLS の仕様 |

## 通信・データ（第7・8章）

| 文献 | 内容 |
|---|---|
| Roy T. Fielding, *Architectural Styles and the Design of Network-based Software Architectures*, 博士論文, 2000 | REST の原典 |
| Gregor Hohpe, Bobby Woolf, *Enterprise Integration Patterns*, Addison-Wesley, 2003 | メッセージングによる統合のパターン |
| Martin Kleppmann, *Designing Data-Intensive Applications*, O'Reilly | データシステム・分散システムの原理 |
| E. F. Codd, "A Relational Model of Data for Large Shared Data Banks," *Communications of the ACM*, 1970 | 関係モデルの原典 |
| Seth Gilbert, Nancy Lynch, "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services," 2002 | CAP 定理の証明 |
| Michael Armbrust ほか, "Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics," CIDR, 2021 | Lakehouse の提案 |

## セキュリティ・信頼性（第9章）

| 文献 | 内容 |
|---|---|
| IETF, [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749) | OAuth 2.0 の仕様 |
| OpenID Foundation, [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html) | OpenID Connect の仕様 |
| IETF, [RFC 7643](https://www.rfc-editor.org/rfc/rfc7643) / [RFC 7644](https://www.rfc-editor.org/rfc/rfc7644) | SCIM の仕様 |
| NIST, [SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final), 2020 | Zero Trust の体系的な整理 |
| Betsy Beyer ほか, [Site Reliability Engineering](https://sre.google/books/), O'Reilly, 2016 | SLO・エラーバジェット・SRE の実践 |
| [OpenTelemetry](https://opentelemetry.io/) | 可観測性の標準 |

## GPU と AI 計算基盤（第10章）

| 文献 | 内容 |
|---|---|
| John L. Hennessy, David A. Patterson, *Computer Architecture: A Quantitative Approach*, Morgan Kaufmann | コンピュータアーキテクチャの標準的な教科書（GPU・専用アクセラレータの章を含む） |
| NVIDIA, [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/) | CUDA の公式ガイド |
| Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton, "ImageNet Classification with Deep Convolutional Neural Networks," NeurIPS, 2012 | AlexNet |
| Samuel Williams, Andrew Waterman, David Patterson, "Roofline: An Insightful Visual Performance Model for Multicore Architectures," *Communications of the ACM*, 2009 | ルーフラインモデル |
| Mohammad Shoeybi ほか, "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism," 2019 | テンソル並列 |
| Samyam Rajbhandari ほか, "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models," 2019 | ZeRO |
| Tri Dao ほか, "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness," NeurIPS, 2022 | IO を意識した Attention の高速化 |
| Woosuk Kwon ほか, "Efficient Memory Management for Large Language Model Serving with PagedAttention," SOSP, 2023 | vLLM と PagedAttention |
| Norman P. Jouppi ほか, "In-Datacenter Performance Analysis of a Tensor Processing Unit," ISCA, 2017 | TPU |

## 機械学習のアーキテクチャ（第11章）

| 文献 | 内容 |
|---|---|
| Ian Goodfellow, Yoshua Bengio, Aaron Courville, *Deep Learning*, MIT Press, 2016 | 深層学習の標準的な教科書 |
| David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams, "Learning representations by back-propagating errors," *Nature*, 1986 | 誤差逆伝播法 |
| Yann LeCun ほか, "Gradient-Based Learning Applied to Document Recognition," *Proceedings of the IEEE*, 1998 | LeNet-5 と CNN |
| Kaiming He ほか, "Deep Residual Learning for Image Recognition," CVPR, 2016 | ResNet と残差接続 |
| Sepp Hochreiter, Jürgen Schmidhuber, "Long Short-Term Memory," *Neural Computation*, 1997 | LSTM |
| Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio, "Neural Machine Translation by Jointly Learning to Align and Translate," ICLR, 2015 | RNN の Seq2Seq への Attention の導入 |
| Ashish Vaswani ほか, "Attention Is All You Need," NeurIPS, 2017 | Transformer |
| Alexey Dosovitskiy ほか, "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale," ICLR, 2021 | Vision Transformer（ViT） |
| Mathias Lechner ほか, "Neural circuit policies enabling auditable autonomy," *Nature Machine Intelligence*, 2020 | Neural Circuit Policies |
| Ramin Hasani ほか, "Liquid Time-constant Networks," AAAI, 2021 | LTC（Liquid Neural Networks） |
| Ramin Hasani ほか, "Closed-form continuous-time neural networks," *Nature Machine Intelligence*, 2022 | CfC |
| Makram Chahine ほか, "Robust flight navigation out of distribution with liquid neural networks," *Science Robotics*, 2023 | ドローンでの分布外環境への頑健性 |
| D. Sculley ほか, "Hidden Technical Debt in Machine Learning Systems," NeurIPS, 2015 | 機械学習システムの技術的負債 |
| Google Cloud, [MLOps: Continuous delivery and automation pipelines in machine learning](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) | MLOps の成熟度レベル |
| [MLflow Documentation](https://mlflow.org/docs/latest/) | MLflow の公式ドキュメント（Tracking、Model Registry、評価、サービング） |

## AI 時代のアーキテクチャ（第12章）

| 文献 | 内容 |
|---|---|
| Patrick Lewis ほか, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," NeurIPS, 2020 | RAG |
| Shunyu Yao ほか, "ReAct: Synergizing Reasoning and Acting in Language Models," ICLR, 2023 | 推論と行動を交互に行う Agent |
| Anthropic, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), 2024 | ワークフローと Agent の使い分け |
| [Model Context Protocol](https://modelcontextprotocol.io/) | MCP の公式仕様 |
| [Agent2Agent (A2A) Protocol](https://a2a-protocol.org/) | A2A の公式仕様 |
| Kento Nishio, [AIエージェントの「メタハーネス」とは何か？主要フレームワークを比較する](https://zenn.dev/genda_jp/articles/60af4b2aa074ce), Zenn, 2026 | ハーネスとメタハーネスの整理、主要フレームワークの比較 |
| Databricks, [Introducing Omnigent: A Meta-Harness to Combine, Control and Share Your Agents](https://www.databricks.com/blog/introducing-omnigent-meta-harness-combine-control-and-share-your-agents), 2026 | メタハーネス Omnigent の紹介 |
| [OWASP Top 10 for LLM Applications](https://genai.owasp.org/) | LLM アプリケーションの主要なリスク |
| NIST, [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | AI のリスク管理の枠組み |
