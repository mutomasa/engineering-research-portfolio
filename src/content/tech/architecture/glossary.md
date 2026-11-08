---
title: '用語集'
description: '本書に登場する技術用語を、日本語・英語・略語とともに1〜3文で説明します。各章の本文から用語へリンクしています。'
updated: 2026-11-08
series: architecture
order: 90
label: '付録A'
tags: ['Glossary']
---

本書に登場する主な技術用語をまとめています。各用語には、日本語表記・英語表記（略語）・短い定義と、関連用語・詳しく扱う章へのリンクを付けています。用語は章ごとにまとめ、末尾にアルファベット順の索引を置いています。

## 章ごとの目次

- **基本概念（第1・2・4章）**：[アーキテクチャ](#architecture)、[アーキテクト](#architect)、[抽象化](#abstraction)、[モジュール化](#modularization)、[トレードオフ](#trade-off)、[非機能要件](#non-functional-requirement)、[ADR](#adr)、[ウォーターフォール](#waterfall)、[アジャイル](#agile)、[UML](#uml)、[C4 モデル](#c4-model)、[関心の分離](#separation-of-concerns)、[凝集度](#cohesion)、[結合度](#coupling)、[SOLID 原則](#solid)
- **ITアーキテクチャの歴史（第3章）**：[メインフレーム](#mainframe)、[UNIX](#unix)、[クライアントサーバー](#client-server)、[SOA](#soa)、[ESB](#esb)、[仮想化](#virtualization)、[コンテナ](#container)、[Kubernetes](#kubernetes)、[クラウドネイティブ](#cloud-native)、[マイクロサービス](#microservices)、[モノリス](#monolith)
- **コンピュータとネットワーク（第5章）**：[OS（オペレーティングシステム）](#os)、[カーネル](#kernel)、[システムコール](#system-call)、[プロセス](#process)、[スレッド](#thread)、[OSI 参照モデル](#osi-model)、[TCP/IP](#tcp-ip)、[IP アドレス](#ip-address)、[NAT](#nat)、[DNS](#dns)、[HTTP](#http)、[TLS](#tls)、[SMTP](#smtp)、[VLAN](#vlan)、[VPN](#vpn)、[ファイアウォール](#firewall)、[ロードバランサー](#load-balancer)、[VPC](#vpc)
- **アプリケーションアーキテクチャ（第6章）**：[レイヤードアーキテクチャ](#layered-architecture)、[MVC](#mvc)、[クリーンアーキテクチャ](#clean-architecture)、[ヘキサゴナルアーキテクチャ](#hexagonal-architecture)、[ドメイン駆動設計](#ddd)、[境界づけられたコンテキスト](#bounded-context)、[CAP 定理](#cap-theorem)、[サーバーレス](#serverless)
- **システム間通信（第7章）**：[API](#api)、[REST API](#rest-api)、[gRPC](#grpc)、[Protocol Buffers](#protocol-buffers)、[GraphQL](#graphql)、[WebSocket](#websocket)、[RPC](#rpc)、[メッセージキュー](#message-queue)、[Pub/Sub](#pub-sub)、[イベント駆動アーキテクチャ](#eda)、[イベントソーシング](#event-sourcing)、[CQRS](#cqrs)、[冪等性](#idempotency)、[SFTP](#sftp)
- **データアーキテクチャ（第8章）**：[リレーショナルデータベース](#rdb)、[ACID](#acid)、[NoSQL](#nosql)、[インデックス](#index)、[WAL（ログ先行書き込み）](#wal)、[レプリケーション](#replication)、[シャーディング](#sharding)、[OLTP](#oltp)、[OLAP](#olap)、[データウェアハウス](#dwh)、[データレイク](#data-lake)、[レイクハウス](#lakehouse)、[ETL](#etl)、[ELT](#elt)、[CDC（変更データキャプチャ）](#cdc)、[データカタログ](#data-catalog)、[埋め込み](#embedding)、[ベクトルデータベース](#vector-db)、[知識グラフ](#knowledge-graph)、[セマンティックレイヤー](#semantic-layer)
- **安全性・信頼性・運用（第9章）**：[認証](#authentication)、[認可](#authorization)、[OAuth 2.0](#oauth)、[OpenID Connect](#oidc)、[SAML](#saml)、[IAM](#iam)、[RBAC](#rbac)、[ABAC](#abac)、[最小権限の原則](#least-privilege)、[SCIM](#scim)、[ゼロトラスト](#zero-trust)、[KMS](#kms)、[可観測性](#observability)、[SLI・SLO・SLA](#sli-slo-sla)、[RTO・RPO](#rto-rpo)、[DevSecOps](#devsecops)、[Policy as Code](#policy-as-code)
- **GPU と AI 計算基盤（第10章）**：[GPU](#gpu)、[CUDA](#cuda)、[SM](#sm)、[ワープ](#warp)、[Tensor Core](#tensor-core)、[HBM](#hbm)、[ルーフラインモデル](#roofline)、[NVLink](#nvlink)、[NCCL](#nccl)、[データ並列](#data-parallelism)、[テンソル並列](#tensor-parallelism)、[パイプライン並列](#pipeline-parallelism)、[KV キャッシュ](#kv-cache)、[量子化](#quantization)、[TPU](#tpu)
- **AI 時代のアーキテクチャ（第11章）**：[大規模言語モデル](#llm)、[Transformer](#transformer)、[Attention（注意機構）](#attention)、[トークン](#token)、[RAG（検索拡張生成）](#rag)、[AI Agent](#ai-agent)、[AI Coding Agent](#ai-coding-agent)、[ハーネス](#harness)、[メタハーネス](#meta-harness)、[サンドボックス](#sandbox)、[プロンプトインジェクション](#prompt-injection)、[MCP](#mcp)、[A2A](#a2a)、[ガードレール](#guardrails)、[Human-in-the-Loop](#human-in-the-loop)

## 基本概念（第1・2・4章）

<a id="architecture"></a>

### アーキテクチャ（Architecture）

システムを構成する要素、要素同士の関係、それらを導く原則と決定の集まり。何を分離し、何を結びつけ、どんな制約のもとでシステムを成立させるかを定める。

- 関連用語：[アーキテクト](#architect)、[トレードオフ](#trade-off)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="architect"></a>

### アーキテクト（Architect）

システム全体の構造に責任を持ち、要求を構造と品質の目標に翻訳し、トレードオフを判断・記録する役割。語源は「職人を統べる者」。

- 関連用語：[アーキテクチャ](#architecture)、[ADR](#adr)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="abstraction"></a>

### 抽象化（Abstraction）

細部を隠し、利用者に必要な本質だけを見せること。インターフェースを通して使うことで、内部の変更から利用者を守る。

- 関連用語：[モジュール化](#modularization)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="modularization"></a>

### モジュール化（Modularization）

内部を隠した部品（モジュール）に分け、決められた接点だけでつなぐこと。Parnas は「変更されそうな設計判断を隠す単位」で分けるべきだとした。

- 関連用語：[抽象化](#abstraction)、[凝集度](#cohesion)、[結合度](#coupling)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="trade-off"></a>

### トレードオフ（Trade-off）

一方を得ると他方を失う関係。可用性とコスト、性能と整合性など、品質特性は互いにぶつかり合うため、優先順位をつけて選ぶ必要がある。

- 関連用語：[非機能要件](#non-functional-requirement)、[ADR](#adr)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="non-functional-requirement"></a>

### 非機能要件（Non-functional Requirement, NFR）

システムが「どのように」動くべきかの要件。性能、可用性、セキュリティ、保守性、コストなど。数値と条件で表すことが重要。

- 関連用語：[トレードオフ](#trade-off)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="adr"></a>

### ADR（Architecture Decision Record）

重要な設計判断を、背景・決定・結果とともに1件1文書で記録する方法。Michael Nygard が提案。リポジトリ内に置くと AI Coding Agent も参照できる。

- 関連用語：[アーキテクト](#architect)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="waterfall"></a>

### ウォーターフォール（Waterfall）

要件定義から設計・実装・テスト・リリースまでを順番に進める開発手法。計画しやすいが、途中の変更に弱い。

- 関連用語：[アジャイル](#agile)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="agile"></a>

### アジャイル（Agile）

短い期間で計画・実装・確認・改善を繰り返し、動くソフトウェアを少しずつ育てる開発の考え方。設計も継続的に行う。

- 関連用語：[ウォーターフォール](#waterfall)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="uml"></a>

### UML（Unified Modeling Language）

ソフトウェアの構造や振る舞いを図で表す標準記法。ユースケース図、クラス図、シーケンス図、コンポーネント図、配置図などがある。

- 関連用語：[C4 モデル](#c4-model)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="c4-model"></a>

### C4 モデル（C4 Model）

Simon Brown が提唱した、System Context・Container・Component・Code の4階層でソフトウェアの構造を表す方法。

- 関連用語：[UML](#uml)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="separation-of-concerns"></a>

### 関心の分離（Separation of Concerns）

画面表示・業務ルール・データ保存など、異なる関心事を異なる部品に分けること。

- 関連用語：[凝集度](#cohesion)、[レイヤードアーキテクチャ](#layered-architecture)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="cohesion"></a>

### 凝集度（Cohesion）

1つの部品の中身が、どれだけ1つの目的にまとまっているか。高いほど良い。

- 関連用語：[結合度](#coupling)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="coupling"></a>

### 結合度（Coupling）

部品同士がどれだけ互いに依存しているか。低い（疎結合）ほど、変更の影響が広がりにくい。

- 関連用語：[凝集度](#cohesion)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

<a id="solid"></a>

### SOLID 原則（SOLID Principles）

単一責任・開放閉鎖・リスコフの置換・インターフェース分離・依存性逆転の5原則の頭文字。オブジェクト指向設計の指針。

- 関連用語：[クリーンアーキテクチャ](#clean-architecture)
- 詳細：[第1章](/tech/architecture/01-why-architecture)

## ITアーキテクチャの歴史（第3章）

<a id="mainframe"></a>

### メインフレーム（Mainframe）

計算とデータを中央の大型コンピュータに集める集中処理のための計算機。高い信頼性から、今も金融などの基幹系で使われる。

- 関連用語：[クライアントサーバー](#client-server)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="unix"></a>

### UNIX

1969年にベル研究所で開発が始まった OS。小さなプログラムを組み合わせる設計思想は Linux やクラウドに受け継がれている。

- 関連用語：[OS（オペレーティングシステム）](#os)、[カーネル](#kernel)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="client-server"></a>

### クライアントサーバー（Client-Server）

処理を、利用者側のクライアントと、データや処理を提供するサーバーに分ける構成。

- 関連用語：[メインフレーム](#mainframe)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="soa"></a>

### SOA（Service-Oriented Architecture）

業務機能を再利用可能な「サービス」として公開し、標準的なインターフェースでつなぐ設計の考え方。

- 関連用語：[ESB](#esb)、[マイクロサービス](#microservices)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="esb"></a>

### ESB（Enterprise Service Bus）

SOA でサービス間の通信・変換・経路制御を仲介する基盤。集中しすぎると肥大化しやすい。

- 関連用語：[SOA](#soa)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="virtualization"></a>

### 仮想化（Virtualization）

1台の物理コンピュータ上で、ハイパーバイザーを使って複数の仮想マシン（VM）を動かす技術。

- 関連用語：[コンテナ](#container)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="container"></a>

### コンテナ（Container）

アプリケーションと依存ライブラリをまとめ、OS カーネルを共有しながら隔離して動かす技術。Linux の namespaces と cgroups で実現される。

- 関連用語：[仮想化](#virtualization)、[Kubernetes](#kubernetes)、[サンドボックス](#sandbox)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="kubernetes"></a>

### Kubernetes（Kubernetes, K8s）

多数のコンテナを複数のサーバーに配置し、障害時の再起動や台数の増減を自動で行うオーケストレーション基盤。

- 関連用語：[コンテナ](#container)、[クラウドネイティブ](#cloud-native)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="cloud-native"></a>

### クラウドネイティブ（Cloud Native）

コンテナ、マイクロサービス、宣言的な設定、自動化された運用などで、クラウドの性質を最大限に活かすアプローチ。

- 関連用語：[Kubernetes](#kubernetes)、[マイクロサービス](#microservices)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="microservices"></a>

### マイクロサービス（Microservices）

アプリケーションを、独立してデプロイでき、それぞれが自分のデータを持つ小さなサービスの集まりとして作るスタイル。

- 関連用語：[モノリス](#monolith)、[境界づけられたコンテキスト](#bounded-context)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

<a id="monolith"></a>

### モノリス（Monolith）

アプリケーション全体を1つの単位としてビルド・デプロイする構造。内部をモジュールに分けたものをモジュラーモノリスと呼ぶ。

- 関連用語：[マイクロサービス](#microservices)
- 詳細：[第3章](/tech/architecture/03-it-architecture-history)

## コンピュータとネットワーク（第5章）

<a id="os"></a>

### OS（オペレーティングシステム）（Operating System）

ハードウェアを抽象化し、資源を配分し、プログラムを互いに保護するソフトウェア。

- 関連用語：[カーネル](#kernel)、[プロセス](#process)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="kernel"></a>

### カーネル（Kernel）

OS の中心部分。特権的なカーネル空間で動き、プロセス・メモリ・ファイル・ネットワーク・デバイスを管理する。

- 関連用語：[OS（オペレーティングシステム）](#os)、[システムコール](#system-call)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="system-call"></a>

### システムコール（System Call）

アプリケーションがカーネルに処理（ファイル操作、通信、プロセス生成など）を依頼するための窓口。

- 関連用語：[カーネル](#kernel)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="process"></a>

### プロセス（Process）

実行中のプログラム。それぞれが独立したメモリ空間を持つ。

- 関連用語：[スレッド](#thread)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="thread"></a>

### スレッド（Thread）

プロセスの中で並行して動く実行の流れ。同じプロセスのスレッドはメモリを共有する。

- 関連用語：[プロセス](#process)、[ワープ](#warp)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="osi-model"></a>

### OSI 参照モデル（OSI Reference Model）

ネットワーク通信の機能を7つの層に分けて説明する、ISO が標準化したモデル。

- 関連用語：[TCP/IP](#tcp-ip)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="tcp-ip"></a>

### TCP/IP（Transmission Control Protocol / Internet Protocol）

インターネットを支えるプロトコル群。IP がパケットの配送を、TCP が信頼性のある通信を担う。

- 関連用語：[OSI 参照モデル](#osi-model)、[IP アドレス](#ip-address)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="ip-address"></a>

### IP アドレス（IP Address）

ネットワーク上の機器を識別する番号。IPv4（32ビット）と IPv6（128ビット）がある。

- 関連用語：[NAT](#nat)、[DNS](#dns)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="nat"></a>

### NAT（Network Address Translation）

プライベート IP アドレスとグローバル IP アドレスを変換する仕組み。

- 関連用語：[IP アドレス](#ip-address)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="dns"></a>

### DNS（Domain Name System）

ドメイン名を IP アドレスなどに変換する、階層的で分散したデータベース。

- 関連用語：[IP アドレス](#ip-address)、[SMTP](#smtp)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="http"></a>

### HTTP（HyperText Transfer Protocol）

Web の通信の約束事。クライアントのリクエストにサーバーがレスポンスを返す、ステートレスなプロトコル。

- 関連用語：[TLS](#tls)、[REST API](#rest-api)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="tls"></a>

### TLS（Transport Layer Security）

通信の暗号化、改ざん検知、証明書によるサーバー認証を提供するプロトコル。HTTPS で使われる。

- 関連用語：[HTTP](#http)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="smtp"></a>

### SMTP（Simple Mail Transfer Protocol）

メールを送信・転送するためのプロトコル。受信者は IMAP などで読み出す。

- 関連用語：[DNS](#dns)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="vlan"></a>

### VLAN（Virtual LAN）

物理的に同じネットワーク機器の上で、論理的にネットワークを分割する技術。

- 関連用語：[ファイアウォール](#firewall)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="vpn"></a>

### VPN（Virtual Private Network）

インターネット上に暗号化された仮想的な専用線を作る技術。

- 関連用語：[ゼロトラスト](#zero-trust)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="firewall"></a>

### ファイアウォール（Firewall）

送信元・宛先・ポートなどのルールで通信を許可・拒否する仕組み。

- 関連用語：[VPC](#vpc)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="load-balancer"></a>

### ロードバランサー（Load Balancer）

リクエストを複数のサーバーに振り分け、負荷分散と冗長化を行う装置・サービス。

- 関連用語：[HTTP](#http)
- 詳細：[第5章](/tech/architecture/05-computer-network)

<a id="vpc"></a>

### VPC（Virtual Private Cloud）

クラウド上に作る、論理的に隔離された自分専用のネットワーク。サブネットやゲートウェイで構成する。

- 関連用語：[ファイアウォール](#firewall)
- 詳細：[第5章](/tech/architecture/05-computer-network)

## アプリケーションアーキテクチャ（第6章）

<a id="layered-architecture"></a>

### レイヤードアーキテクチャ（Layered Architecture）

コードを役割ごとの層に分け、上の層が下の層だけを呼ぶようにする構造。

- 関連用語：[関心の分離](#separation-of-concerns)、[クリーンアーキテクチャ](#clean-architecture)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="mvc"></a>

### MVC（Model-View-Controller）

データと業務ルール（Model）、表示（View）、入力の処理（Controller）を分けるパターン。

- 関連用語：[レイヤードアーキテクチャ](#layered-architecture)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="clean-architecture"></a>

### クリーンアーキテクチャ（Clean Architecture）

Robert C. Martin が提唱した、ソースコードの依存を常に内側（業務ルール）に向ける構造。

- 関連用語：[ヘキサゴナルアーキテクチャ](#hexagonal-architecture)、[SOLID 原則](#solid)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="hexagonal-architecture"></a>

### ヘキサゴナルアーキテクチャ（Hexagonal Architecture / Ports & Adapters）

アプリケーションの核を、ポート（接点）とアダプター（具体的な技術との接続）で外の世界から切り離す構造。

- 関連用語：[クリーンアーキテクチャ](#clean-architecture)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="ddd"></a>

### ドメイン駆動設計（Domain-Driven Design, DDD）

業務（ドメイン）の理解と共通の言葉を中心にソフトウェアを設計する手法。Eric Evans が体系化した。

- 関連用語：[境界づけられたコンテキスト](#bounded-context)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="bounded-context"></a>

### 境界づけられたコンテキスト（Bounded Context）

同じ言葉が同じ意味を持つ範囲。DDD の中心概念で、サービス分割の手がかりになる。

- 関連用語：[ドメイン駆動設計](#ddd)、[マイクロサービス](#microservices)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="cap-theorem"></a>

### CAP 定理（CAP Theorem）

ネットワーク分断が起きたとき、分散システムは一貫性と可用性の両方を同時には保証できないことを示す定理。

- 関連用語：[レプリケーション](#replication)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

<a id="serverless"></a>

### サーバーレス（Serverless）

サーバーの管理をクラウド事業者に任せ、関数などのコードだけを書いて動かす実行モデル。

- 関連用語：[クラウドネイティブ](#cloud-native)
- 詳細：[第6章](/tech/architecture/06-application-architecture)

## システム間通信（第7章）

<a id="api"></a>

### API（Application Programming Interface）

ソフトウェア同士がやり取りするための、決められた接点と約束事。

- 関連用語：[REST API](#rest-api)、[gRPC](#grpc)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="rest-api"></a>

### REST API（Representational State Transfer API）

リソースを URL で表し、HTTP のメソッドで操作する Web API の設計スタイル。

- 関連用語：[HTTP](#http)、[API](#api)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="grpc"></a>

### gRPC

Google が公開した RPC フレームワーク。Protocol Buffers でインターフェースを定義し、HTTP/2 上で動く。

- 関連用語：[RPC](#rpc)、[Protocol Buffers](#protocol-buffers)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="protocol-buffers"></a>

### Protocol Buffers（Protocol Buffers, protobuf）

構造化データをコンパクトなバイナリで表すための、言語中立なデータ定義形式。

- 関連用語：[gRPC](#grpc)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="graphql"></a>

### GraphQL

クライアントが必要なデータの形をクエリで指定できる API の問い合わせ言語。

- 関連用語：[REST API](#rest-api)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="websocket"></a>

### WebSocket

ブラウザとサーバーの間で双方向の通信路を維持するプロトコル。

- 関連用語：[HTTP](#http)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="rpc"></a>

### RPC（Remote Procedure Call）

別のコンピュータの関数を、手元の関数のように呼び出す方式。

- 関連用語：[gRPC](#grpc)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="message-queue"></a>

### メッセージキュー（Message Queue）

メッセージを一時的に溜め、受け手が自分のペースで取り出して処理できるようにする仕組み。

- 関連用語：[Pub/Sub](#pub-sub)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="pub-sub"></a>

### Pub/Sub（Publish/Subscribe）

送り手がトピックに発行したメッセージを、購読しているすべての受け手に届ける方式。

- 関連用語：[メッセージキュー](#message-queue)、[イベント駆動アーキテクチャ](#eda)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="eda"></a>

### イベント駆動アーキテクチャ（Event-Driven Architecture, EDA）

「何かが起きた」というイベントを中心に、サービスが反応し合うようにシステムを組み立てるスタイル。

- 関連用語：[Pub/Sub](#pub-sub)、[イベントソーシング](#event-sourcing)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="event-sourcing"></a>

### イベントソーシング（Event Sourcing）

状態そのものではなく、状態を変えたイベントの履歴を保存し、現在の状態は再生して求める方式。

- 関連用語：[CQRS](#cqrs)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="cqrs"></a>

### CQRS（Command Query Responsibility Segregation）

更新（Command）と読み取り（Query）でデータのモデルを分ける設計。

- 関連用語：[イベントソーシング](#event-sourcing)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="idempotency"></a>

### 冪等性（Idempotency）

何回実行しても、1回実行したのと同じ結果になる性質。安全な再試行の前提になる。

- 関連用語：[メッセージキュー](#message-queue)
- 詳細：[第7章](/tech/architecture/07-communication)

<a id="sftp"></a>

### SFTP（SSH File Transfer Protocol）

SSH の上でファイルを安全に転送するプロトコル。企業間のファイル連携で広く使われる。

- 詳細：[第7章](/tech/architecture/07-communication)

## データアーキテクチャ（第8章）

<a id="rdb"></a>

### リレーショナルデータベース（Relational Database, RDB）

データを行と列のテーブルで表し、SQL で操作するデータベース。

- 関連用語：[ACID](#acid)、[NoSQL](#nosql)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="acid"></a>

### ACID（Atomicity, Consistency, Isolation, Durability）

トランザクションが保証する4つの性質（原子性・一貫性・分離性・永続性）。

- 関連用語：[リレーショナルデータベース](#rdb)、[WAL（ログ先行書き込み）](#wal)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="nosql"></a>

### NoSQL（Not only SQL）

RDB 以外のデータベースの総称。Key-Value、Document、Column-family、Graph などがある。

- 関連用語：[リレーショナルデータベース](#rdb)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="index"></a>

### インデックス（Index）

目的のデータを素早く見つけるための補助的なデータ構造。B+木がよく使われる。

- 関連用語：[リレーショナルデータベース](#rdb)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="wal"></a>

### WAL（ログ先行書き込み）（Write-Ahead Logging）

データ本体を書き換える前に、変更内容をログに追記する仕組み。障害からの回復、レプリケーション、CDC に使われる。

- 関連用語：[ACID](#acid)、[CDC（変更データキャプチャ）](#cdc)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="replication"></a>

### レプリケーション（Replication）

同じデータを複数のサーバーに複製すること。可用性と読み取り性能を高める。

- 関連用語：[シャーディング](#sharding)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="sharding"></a>

### シャーディング（Sharding）

データを複数のサーバーに分割して保存すること。書き込み性能と容量の限界を超える手段。

- 関連用語：[レプリケーション](#replication)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="oltp"></a>

### OLTP（Online Transaction Processing）

注文の登録など、日々の業務の取引を処理する用途。少数行の高速な読み書きと強い整合性が求められる。

- 関連用語：[OLAP](#olap)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="olap"></a>

### OLAP（Online Analytical Processing）

大量のデータを集計・分析する用途。列指向の保存形式がよく使われる。

- 関連用語：[OLTP](#oltp)、[データウェアハウス](#dwh)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="dwh"></a>

### データウェアハウス（Data Warehouse, DWH）

分析のために、複数のシステムのデータを統合・整理して保存するデータベース。

- 関連用語：[OLAP](#olap)、[レイクハウス](#lakehouse)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="data-lake"></a>

### データレイク（Data Lake）

構造化・非構造化データを元の形のまま大量に保存する場所。オブジェクトストレージ上に作られることが多い。

- 関連用語：[レイクハウス](#lakehouse)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="lakehouse"></a>

### レイクハウス（Lakehouse）

データレイクの柔軟性と、DWH のトランザクション・スキーマ管理・高速な問い合わせを組み合わせたアーキテクチャ。

- 関連用語：[データウェアハウス](#dwh)、[データレイク](#data-lake)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="etl"></a>

### ETL（Extract, Transform, Load）

データを取り出し、変換してから格納する処理の流れ。

- 関連用語：[ELT](#elt)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="elt"></a>

### ELT（Extract, Load, Transform）

データをまず生のまま格納し、分析基盤の計算能力で後から変換する処理の流れ。

- 関連用語：[ETL](#etl)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="cdc"></a>

### CDC（変更データキャプチャ）（Change Data Capture）

データベースの変更を検知して、ほぼリアルタイムに他のシステムへ流す仕組み。

- 関連用語：[WAL（ログ先行書き込み）](#wal)、[イベント駆動アーキテクチャ](#eda)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="data-catalog"></a>

### データカタログ（Data Catalog）

組織のデータを検索し、意味・出所・品質・責任者を確認できるようにする仕組み。

- 関連用語：[セマンティックレイヤー](#semantic-layer)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="embedding"></a>

### 埋め込み（Embedding）

テキストや画像などを、意味を反映した数値のベクトルに変換したもの。意味の近いものはベクトルも近くなる。

- 関連用語：[ベクトルデータベース](#vector-db)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="vector-db"></a>

### ベクトルデータベース（Vector Database）

大量のベクトルを保存し、近いベクトルを高速に検索できるデータベース。RAG の検索に使われる。

- 関連用語：[埋め込み](#embedding)、[RAG（検索拡張生成）](#rag)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="knowledge-graph"></a>

### 知識グラフ（Knowledge Graph）

実世界の物事と、その関係をノードとエッジのグラフで表したもの。

- 関連用語：[ベクトルデータベース](#vector-db)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

<a id="semantic-layer"></a>

### セマンティックレイヤー（Semantic Layer）

指標やビジネス用語の定義を一か所にまとめ、BI や AI が同じ定義でデータを使えるようにする層。

- 関連用語：[データカタログ](#data-catalog)
- 詳細：[第8章](/tech/architecture/08-data-architecture)

## 安全性・信頼性・運用（第9章）

<a id="authentication"></a>

### 認証（Authentication, AuthN）

利用者やシステムが「誰か」を確かめること。

- 関連用語：[認可](#authorization)、[OpenID Connect](#oidc)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="authorization"></a>

### 認可（Authorization, AuthZ）

認証された主体が「何をしてよいか」を決めること。

- 関連用語：[認証](#authentication)、[RBAC](#rbac)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="oauth"></a>

### OAuth 2.0

パスワードを渡さずに、範囲と期限を限ったアクセストークンで API へのアクセスを委譲する認可の仕組み。

- 関連用語：[OpenID Connect](#oidc)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="oidc"></a>

### OpenID Connect（OpenID Connect, OIDC）

OAuth 2.0 の上に認証の機能を加え、ID トークンで利用者が誰かを伝える仕様。

- 関連用語：[OAuth 2.0](#oauth)、[SAML](#saml)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="saml"></a>

### SAML（Security Assertion Markup Language）

XML ベースの認証連携の仕様。主に企業のシングルサインオンで使われる。

- 関連用語：[OpenID Connect](#oidc)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="iam"></a>

### IAM（Identity and Access Management）

人・サービス・AI Agent などの ID と、そのアクセス権限を管理する仕組み。

- 関連用語：[RBAC](#rbac)、[最小権限の原則](#least-privilege)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="rbac"></a>

### RBAC（Role-Based Access Control）

役割（ロール）に権限を割り当て、利用者にロールを与えるアクセス制御。

- 関連用語：[ABAC](#abac)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="abac"></a>

### ABAC（Attribute-Based Access Control）

利用者・リソース・環境の属性に基づくルールで判断するアクセス制御。

- 関連用語：[RBAC](#rbac)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="least-privilege"></a>

### 最小権限の原則（Principle of Least Privilege）

必要な権限だけを、必要な期間だけ与えるという原則。

- 関連用語：[IAM](#iam)、[サンドボックス](#sandbox)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="scim"></a>

### SCIM（System for Cross-domain Identity Management）

ユーザーやグループの情報を、ID 基盤から各サービスへ自動で作成・更新・削除するための標準仕様。

- 関連用語：[IAM](#iam)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="zero-trust"></a>

### ゼロトラスト（Zero Trust）

ネットワーク上の場所では信頼せず、すべてのアクセスを ID・端末・状況に基づいて検証する考え方。

- 関連用語：[最小権限の原則](#least-privilege)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="kms"></a>

### KMS（Key Management Service）

暗号鍵の生成・保管・ローテーション・利用の制御を行うサービス。

- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="observability"></a>

### 可観測性（Observability）

ログ・メトリクス・トレースなどの出力から、システム内部で何が起きているかを理解できる性質。

- 関連用語：[SLI・SLO・SLA](#sli-slo-sla)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="sli-slo-sla"></a>

### SLI・SLO・SLA（Service Level Indicator / Objective / Agreement）

サービス品質の指標（SLI）、その目標値（SLO）、顧客との契約（SLA）。SLO から許容できる失敗の量（エラーバジェット）が決まる。

- 関連用語：[可観測性](#observability)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="rto-rpo"></a>

### RTO・RPO（Recovery Time Objective / Recovery Point Objective）

災害時に、どれだけの時間で復旧するか（RTO）、どの時点までのデータを取り戻すか（RPO）の目標。

- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="devsecops"></a>

### DevSecOps

開発・セキュリティ・運用を一体として、セキュリティの確認を開発の流れに自動で組み込む考え方。

- 関連用語：[Policy as Code](#policy-as-code)
- 詳細：[第9章](/tech/architecture/09-security-operations)

<a id="policy-as-code"></a>

### Policy as Code

セキュリティや運用のルールをコードとして書き、自動で検査・適用する方法。

- 関連用語：[DevSecOps](#devsecops)、[ガードレール](#guardrails)
- 詳細：[第9章](/tech/architecture/09-security-operations)

## GPU と AI 計算基盤（第10章）

<a id="gpu"></a>

### GPU（Graphics Processing Unit）

大量の同じ計算を同時に行うことに特化したプロセッサ。グラフィックス用に生まれ、AI の学習・推論の中心的な計算機になった。

- 関連用語：[CUDA](#cuda)、[SM](#sm)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="cuda"></a>

### CUDA

NVIDIA が提供する、GPU を汎用の並列計算機としてプログラムするための基盤（言語拡張・ランタイム・ライブラリ）。

- 関連用語：[GPU](#gpu)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="sm"></a>

### SM（Streaming Multiprocessor）

NVIDIA の GPU の基本的な処理単位。CUDA コア、Tensor Core、レジスタ、共有メモリなどを持つ。

- 関連用語：[ワープ](#warp)、[Tensor Core](#tensor-core)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="warp"></a>

### ワープ（Warp）

NVIDIA の GPU で、同じ命令を同時に実行する32スレッドの束。SIMT 方式の実行単位。

- 関連用語：[SM](#sm)、[スレッド](#thread)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="tensor-core"></a>

### Tensor Core

小さな行列の積和演算を1命令で行う、NVIDIA の GPU の専用演算器。AI の計算性能の中心。

- 関連用語：[SM](#sm)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="hbm"></a>

### HBM（High Bandwidth Memory）

DRAM を積層して GPU の隣に配置し、非常に広い帯域を実現するメモリ。

- 関連用語：[ルーフラインモデル](#roofline)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="roofline"></a>

### ルーフラインモデル（Roofline Model）

演算性能とメモリ帯域から、処理の性能の上限と、計算律速かメモリ律速かを示すモデル。

- 関連用語：[HBM](#hbm)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="nvlink"></a>

### NVLink

NVIDIA の GPU 同士を高帯域で直接つなぐインターコネクト。

- 関連用語：[NCCL](#nccl)、[テンソル並列](#tensor-parallelism)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="nccl"></a>

### NCCL（NVIDIA Collective Communications Library）

All-Reduce などの集団通信を、GPU 間で効率よく行うライブラリ。

- 関連用語：[NVLink](#nvlink)、[データ並列](#data-parallelism)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="data-parallelism"></a>

### データ並列（Data Parallelism）

各 GPU がモデル全体を持ち、異なるデータで計算して勾配を集約する分散学習の方法。

- 関連用語：[テンソル並列](#tensor-parallelism)、[パイプライン並列](#pipeline-parallelism)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="tensor-parallelism"></a>

### テンソル並列（Tensor Parallelism）

1つの層の行列を分割し、複数の GPU で分担して計算する分散学習の方法。

- 関連用語：[データ並列](#data-parallelism)、[NVLink](#nvlink)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="pipeline-parallelism"></a>

### パイプライン並列（Pipeline Parallelism）

モデルを層の順番で区切って複数の GPU に割り当て、流れ作業のように計算する分散学習の方法。

- 関連用語：[データ並列](#data-parallelism)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="kv-cache"></a>

### KV キャッシュ（Key-Value Cache）

LLM の推論で、過去のトークンの Attention の中間結果（Key と Value）を保存して再利用する仕組み。

- 関連用語：[Attention（注意機構）](#attention)、[トークン](#token)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="quantization"></a>

### 量子化（Quantization）

モデルの重みなどを、より少ないビット数（INT8、INT4、FP8 など）で表し、メモリと計算を削減する技術。

- 関連用語：[KV キャッシュ](#kv-cache)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

<a id="tpu"></a>

### TPU（Tensor Processing Unit）

Google が開発した、行列演算に特化したシストリックアレイを持つ AI 向けの専用チップ。

- 関連用語：[GPU](#gpu)
- 詳細：[第10章](/tech/architecture/10-gpu-architecture)

## AI 時代のアーキテクチャ（第11章）

<a id="llm"></a>

### 大規模言語モデル（Large Language Model, LLM）

大量のテキストから学習し、次に来るトークンの確率を予測することで、文章やコードを生成するモデル。

- 関連用語：[Transformer](#transformer)、[トークン](#token)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="transformer"></a>

### Transformer

2017年に提案された、Attention を中心とするニューラルネットワークの構造。現在の LLM の多くの基礎。

- 関連用語：[Attention（注意機構）](#attention)、[大規模言語モデル](#llm)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="attention"></a>

### Attention（注意機構）（Attention）

系列中のすべての要素同士の関係の強さを計算し、重要な情報に重みを置く仕組み。

- 関連用語：[Transformer](#transformer)、[KV キャッシュ](#kv-cache)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="token"></a>

### トークン（Token）

LLM が扱うテキストの単位。単語や文字の断片。コストやコンテキストの長さもトークン数で数える。

- 関連用語：[大規模言語モデル](#llm)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="rag"></a>

### RAG（検索拡張生成）（Retrieval-Augmented Generation）

質問に関係する情報を検索し、その結果を LLM に渡して根拠のある回答を生成させる仕組み。

- 関連用語：[ベクトルデータベース](#vector-db)、[埋め込み](#embedding)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="ai-agent"></a>

### AI Agent

目的を与えられると、LLM が自ら計画し、ツールを使い、結果を観察して次の行動を決めることを繰り返すソフトウェア。

- 関連用語：[MCP](#mcp)、[サンドボックス](#sandbox)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="ai-coding-agent"></a>

### AI Coding Agent

リポジトリを読み、コードを編集し、コマンドやテストを実行しながら開発作業を行う AI Agent。

- 関連用語：[AI Agent](#ai-agent)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="harness"></a>

### ハーネス（Harness）

モデルの周りで、ファイル操作・ツール呼び出し・権限の確認・サンドボックス・画面など、外の世界との接点を与えるソフトウェア。AI Coding Agent や Agent 開発用の SDK が該当する。

- 関連用語：[AI Coding Agent](#ai-coding-agent)、[メタハーネス](#meta-harness)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="meta-harness"></a>

### メタハーネス（Meta-Harness）

複数のハーネスを共通の API で包み、ハーネスをまたいだ合成・協働・統制を担う上位の層。

- 関連用語：[ハーネス](#harness)、[ガードレール](#guardrails)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="sandbox"></a>

### サンドボックス（Sandbox）

外部に影響が及ばないよう隔離された実行環境。Agent のコード実行などに使う。

- 関連用語：[コンテナ](#container)、[最小権限の原則](#least-privilege)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="prompt-injection"></a>

### プロンプトインジェクション（Prompt Injection）

入力やデータに紛れ込ませた指示によって、LLM に本来の指示と異なる動作をさせる攻撃。

- 関連用語：[ガードレール](#guardrails)、[サンドボックス](#sandbox)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="mcp"></a>

### MCP（Model Context Protocol）

AI アプリケーションと外部のツール・データをつなぐためのオープンなプロトコル。2024年に Anthropic が公開した。

- 関連用語：[A2A](#a2a)、[AI Agent](#ai-agent)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="a2a"></a>

### A2A（Agent2Agent Protocol）

AI Agent 同士がタスクを依頼し合い、協調するためのオープンなプロトコル。2025年に Google が発表した。

- 関連用語：[MCP](#mcp)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="guardrails"></a>

### ガードレール（Guardrails）

AI の入力・出力・行動を検査し、望ましくない振る舞いを防ぐ仕組み。

- 関連用語：[Human-in-the-Loop](#human-in-the-loop)、[Policy as Code](#policy-as-code)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

<a id="human-in-the-loop"></a>

### Human-in-the-Loop（Human-in-the-Loop, HITL）

AI の処理の流れの中に、人間による確認・承認・修正を組み込むこと。

- 関連用語：[ガードレール](#guardrails)
- 詳細：[第11章](/tech/architecture/11-ai-architecture)

## アルファベット順索引

- [Abstraction（抽象化）](#abstraction)
- [Agent2Agent Protocol（A2A）](#a2a)
- [Agile（アジャイル）](#agile)
- [AI Agent](#ai-agent)
- [AI Coding Agent](#ai-coding-agent)
- [Application Programming Interface（API）](#api)
- [Architect（アーキテクト）](#architect)
- [Architecture（アーキテクチャ）](#architecture)
- [Architecture Decision Record（ADR）](#adr)
- [Atomicity, Consistency, Isolation, Durability（ACID）](#acid)
- [Attention（Attention（注意機構））](#attention)
- [Attribute-Based Access Control（ABAC）](#abac)
- [Authentication, AuthN（認証）](#authentication)
- [Authorization, AuthZ（認可）](#authorization)
- [Bounded Context（境界づけられたコンテキスト）](#bounded-context)
- [C4 Model（C4 モデル）](#c4-model)
- [CAP Theorem（CAP 定理）](#cap-theorem)
- [Change Data Capture（CDC（変更データキャプチャ））](#cdc)
- [Clean Architecture（クリーンアーキテクチャ）](#clean-architecture)
- [Client-Server（クライアントサーバー）](#client-server)
- [Cloud Native（クラウドネイティブ）](#cloud-native)
- [Cohesion（凝集度）](#cohesion)
- [Command Query Responsibility Segregation（CQRS）](#cqrs)
- [Container（コンテナ）](#container)
- [Coupling（結合度）](#coupling)
- [CUDA](#cuda)
- [Data Catalog（データカタログ）](#data-catalog)
- [Data Lake（データレイク）](#data-lake)
- [Data Parallelism（データ並列）](#data-parallelism)
- [Data Warehouse, DWH（データウェアハウス）](#dwh)
- [DevSecOps](#devsecops)
- [Domain Name System（DNS）](#dns)
- [Domain-Driven Design, DDD（ドメイン駆動設計）](#ddd)
- [Embedding（埋め込み）](#embedding)
- [Enterprise Service Bus（ESB）](#esb)
- [Event Sourcing（イベントソーシング）](#event-sourcing)
- [Event-Driven Architecture, EDA（イベント駆動アーキテクチャ）](#eda)
- [Extract, Load, Transform（ELT）](#elt)
- [Extract, Transform, Load（ETL）](#etl)
- [Firewall（ファイアウォール）](#firewall)
- [Graphics Processing Unit（GPU）](#gpu)
- [GraphQL](#graphql)
- [gRPC](#grpc)
- [Guardrails（ガードレール）](#guardrails)
- [Harness（ハーネス）](#harness)
- [Hexagonal Architecture / Ports & Adapters（ヘキサゴナルアーキテクチャ）](#hexagonal-architecture)
- [High Bandwidth Memory（HBM）](#hbm)
- [Human-in-the-Loop, HITL（Human-in-the-Loop）](#human-in-the-loop)
- [HyperText Transfer Protocol（HTTP）](#http)
- [Idempotency（冪等性）](#idempotency)
- [Identity and Access Management（IAM）](#iam)
- [Index（インデックス）](#index)
- [IP Address（IP アドレス）](#ip-address)
- [Kernel（カーネル）](#kernel)
- [Key Management Service（KMS）](#kms)
- [Key-Value Cache（KV キャッシュ）](#kv-cache)
- [Knowledge Graph（知識グラフ）](#knowledge-graph)
- [Kubernetes, K8s（Kubernetes）](#kubernetes)
- [Lakehouse（レイクハウス）](#lakehouse)
- [Large Language Model, LLM（大規模言語モデル）](#llm)
- [Layered Architecture（レイヤードアーキテクチャ）](#layered-architecture)
- [Load Balancer（ロードバランサー）](#load-balancer)
- [Mainframe（メインフレーム）](#mainframe)
- [Message Queue（メッセージキュー）](#message-queue)
- [Meta-Harness（メタハーネス）](#meta-harness)
- [Microservices（マイクロサービス）](#microservices)
- [Model Context Protocol（MCP）](#mcp)
- [Model-View-Controller（MVC）](#mvc)
- [Modularization（モジュール化）](#modularization)
- [Monolith（モノリス）](#monolith)
- [Network Address Translation（NAT）](#nat)
- [Non-functional Requirement, NFR（非機能要件）](#non-functional-requirement)
- [Not only SQL（NoSQL）](#nosql)
- [NVIDIA Collective Communications Library（NCCL）](#nccl)
- [NVLink](#nvlink)
- [OAuth 2.0](#oauth)
- [Observability（可観測性）](#observability)
- [Online Analytical Processing（OLAP）](#olap)
- [Online Transaction Processing（OLTP）](#oltp)
- [OpenID Connect, OIDC（OpenID Connect）](#oidc)
- [Operating System（OS（オペレーティングシステム））](#os)
- [OSI Reference Model（OSI 参照モデル）](#osi-model)
- [Pipeline Parallelism（パイプライン並列）](#pipeline-parallelism)
- [Policy as Code](#policy-as-code)
- [Principle of Least Privilege（最小権限の原則）](#least-privilege)
- [Process（プロセス）](#process)
- [Prompt Injection（プロンプトインジェクション）](#prompt-injection)
- [Protocol Buffers, protobuf（Protocol Buffers）](#protocol-buffers)
- [Publish/Subscribe（Pub/Sub）](#pub-sub)
- [Quantization（量子化）](#quantization)
- [Recovery Time Objective / Recovery Point Objective（RTO・RPO）](#rto-rpo)
- [Relational Database, RDB（リレーショナルデータベース）](#rdb)
- [Remote Procedure Call（RPC）](#rpc)
- [Replication（レプリケーション）](#replication)
- [Representational State Transfer API（REST API）](#rest-api)
- [Retrieval-Augmented Generation（RAG（検索拡張生成））](#rag)
- [Role-Based Access Control（RBAC）](#rbac)
- [Roofline Model（ルーフラインモデル）](#roofline)
- [Sandbox（サンドボックス）](#sandbox)
- [Security Assertion Markup Language（SAML）](#saml)
- [Semantic Layer（セマンティックレイヤー）](#semantic-layer)
- [Separation of Concerns（関心の分離）](#separation-of-concerns)
- [Serverless（サーバーレス）](#serverless)
- [Service Level Indicator / Objective / Agreement（SLI・SLO・SLA）](#sli-slo-sla)
- [Service-Oriented Architecture（SOA）](#soa)
- [Sharding（シャーディング）](#sharding)
- [Simple Mail Transfer Protocol（SMTP）](#smtp)
- [SOLID Principles（SOLID 原則）](#solid)
- [SSH File Transfer Protocol（SFTP）](#sftp)
- [Streaming Multiprocessor（SM）](#sm)
- [System Call（システムコール）](#system-call)
- [System for Cross-domain Identity Management（SCIM）](#scim)
- [Tensor Core](#tensor-core)
- [Tensor Parallelism（テンソル並列）](#tensor-parallelism)
- [Tensor Processing Unit（TPU）](#tpu)
- [Thread（スレッド）](#thread)
- [Token（トークン）](#token)
- [Trade-off（トレードオフ）](#trade-off)
- [Transformer](#transformer)
- [Transmission Control Protocol / Internet Protocol（TCP/IP）](#tcp-ip)
- [Transport Layer Security（TLS）](#tls)
- [Unified Modeling Language（UML）](#uml)
- [UNIX](#unix)
- [Vector Database（ベクトルデータベース）](#vector-db)
- [Virtual LAN（VLAN）](#vlan)
- [Virtual Private Cloud（VPC）](#vpc)
- [Virtual Private Network（VPN）](#vpn)
- [Virtualization（仮想化）](#virtualization)
- [Warp（ワープ）](#warp)
- [Waterfall（ウォーターフォール）](#waterfall)
- [WebSocket](#websocket)
- [Write-Ahead Logging（WAL（ログ先行書き込み））](#wal)
- [Zero Trust（ゼロトラスト）](#zero-trust)
