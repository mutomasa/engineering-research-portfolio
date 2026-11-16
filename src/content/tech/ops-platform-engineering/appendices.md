---
title: '年表・用語・サービス比較・共通シナリオ'
description: 'IT運用とPlatform Engineeringの年表、主要用語の定義と出典方針、クラウド／データ基盤のサービス比較と責任分界、全章共通の実践シナリオ。'
updated: 2026-11-16
series: ops-platform-engineering
order: 90
label: '付録'
tags: ['Timeline', 'Glossary']
---

## 付録A　IT運用とPlatform Engineeringの年表

本書で扱った技術と出来事を、おおよその時期の順に示す。

| おおよその時期 | 技術・出来事 | 運用上の変化 | 主な参照 | 本書の章 |
|---|---|---|---|---|
| 1960〜80年代 | メインフレーム、ジョブスケジューリング | 人手による定常運用と障害復旧 | 歴史資料を執筆時に追加 | 第1章 |
| 1968年 | NATOソフトウェア工学会議 | 「ソフトウェア危機」の認識、工学としてのソフトウェア開発 | Naur & Randell (eds.) | 第21章 |
| 1960年代末〜70年代 | 日本の計算機メーカーによる「ソフトウェア工場」 | 開発工程の標準化と部品の再利用 | Cusumano (1991) | 第21章 |
| 1980年代後半 | ITILの作成 | ITサービスマネジメントの体系化 | （版を明記して追加） | 第1章 |
| 1980〜90年代 | 分散システム、SNMP（1990年） | ネットワーク／複数機器の監視 | [R01] | 第1章 |
| 1999年 | NetSaint公開 | プラグイン型OSS監視 | [R02] | 第2章 |
| 2001年 | Zabbix初版／アジャイルソフトウェア開発宣言 | 統合監視／短い反復による開発 | [R03] | 第2章、第4章、第22章 |
| 2002年 | Nagiosへ改称 | OSS監視の浸透 | [R02] | 第2章 |
| 2003年 | GoogleでSRE組織が始動／Autonomic Computingのビジョン論文 | ソフトウェアで運用課題を解く／自己管理システムの研究 | [R05][R48] | 第5章 |
| 2004年 | Gangliaの著名論文 | 大規模HPCクラスタの分散監視 | [R04] | 第2章 |
| 2009年前後 | DevOpsのコミュニティ形成 | 開発と運用の協働 | [R06]ほか | 第4章 |
| 2010年 | 書籍 *Continuous Delivery*／Dapper論文 | 継続的デリバリーの体系化／分散トレーシング | ― | 第4章、第7章 |
| 2010年代 | Cloud Native／Kubernetes／GitOps | 宣言的な変更管理・自動復旧 | [R07][R08] | 第6章 |
| 2013年 | Docker公開 | コンテナの普及 | ― | 第6章 |
| 2014〜15年 | Kubernetes公開、CNCF設立 | コンテナオーケストレーションの標準化 | [R07] | 第6章 |
| 2015年 | Hidden Technical Debt論文 | ML固有の運用負債が顕在化 | [R11] | 第9章 |
| 2016年 | Google SRE Book出版／PrometheusのCNCF参加 | SREの考え方の普及 | [R05] | 第5章、第7章 |
| 2018年 | 書籍 *Accelerate* | ソフトウェアデリバリーの測定 | [R06] | 第4章 |
| 2019年 | OpenTelemetryの誕生／書籍 *Team Topologies* | 計装の標準化／認知負荷とチーム設計 | [R09][R22] | 第7章、第14章 |
| 2020年 | Backstageのオープンソース化 | Developer Portalの普及 | [R23] | 第15章 |
| 2020年代前半 | MLOps、DataOps、Platform Engineering普及 | 専門Opsと共通基盤の分化 | [R12][R20] | 第8〜10章、第14章 |
| 2021年 | OpenGitOps原則v1.0.0／米国大統領令14028 | GitOpsの原則化／ソフトウェアサプライチェーンの重視 | [R08] | 第6章、第11章 |
| 2022年 | NIST SSDF（SP 800-218） | セキュアな開発の実践の体系化 | [R14] | 第11章 |
| 2023年 | CNCF Platforms White Paper／Maturity Model／NIST AI RMF | IDPを製品として扱う整理が進む／AIのリスク管理 | [R20][R21][R29] | 第14章、第20章 |
| 2023年 | Self-Refine、Reflexion | LLMの出力・行動の反復改善の研究 | [R34][R35] | 第22章 |
| 2024年 | SWE-agent、ADAS、MCPの公開 | Agentic SWE、エージェント設計の自動探索、ツール接続の標準化 | [R31][R36][R19] | 第13章、第21章、第22章 |
| 2025年 | OpenHands、DGM、AlphaEvolve、A2Aの発表、DORA 2025 | AIによるコード・エージェント構成の改善研究／エージェント間連携 | [R32][R37][R38][R28][R39] | 第19章、第21〜23章 |
| 2025〜26年 | AgentOps、LLMOpsとPlatformの議論、OWASPのエージェント向け資料 | AIエージェントを含む統合運用が論点に | [R17][R18][R30][R40] | 第12章、第13章、第19章、第20章 |
| 2027年2月（予定） | Azure Deployment Environmentsの提供終了 | IDPのためのマネージドサービスでさえ終了しうる | [R25] | 第17章 |

※ 年表は代表的なマイルストーンであり、各技術の「単一の発明年」を断定するものではない。執筆・引用ルール第4項に従い、刊行前に複数の資料で裏付ける。

---

## 付録B　主要用語の定義と出典方針

| 用語 | 本書での定義（短縮） | 一次参照／定義上の注意 | 初出の章 |
|---|---|---|---|
| IT Operations | サービスを継続提供するための運用活動 | 筆者の操作的定義。ITSMと区別 | 第1章 |
| Monitoring | 事前に定めた対象・信号・閾値などの監視 | 第2〜3章、関連資料 | 第2章 |
| Observability | 外部信号から内部状態や振る舞いを理解できる性質 | OpenTelemetry [R09] | 第7章 |
| DevOps | 開発と運用の協働・継続的デリバリーの実践 | DORAなど [R06] | 第4章 |
| SRE | ソフトウェア工学によって信頼性と運用を実践する方法 | Google SRE [R05] | 第5章 |
| SLI / SLO / SLA | 指標 / 目標 / 契約上の合意 | Google SRE [R05] | 第5章 |
| Error Budget | SLOによって許容される不信頼性の量（1 − SLO） | Google SRE [R05] | 第5章 |
| Toil | 手作業・繰り返し・自動化可能・永続的な価値がなく、サービスの成長に比例して増える作業 | Google SRE [R05] | 第5章 |
| Cloud Native | 変化に強いスケーラブルなシステムのための設計・技術 | CNCF [R07] | 第6章 |
| GitOps | 宣言的状態を版管理し、自動Pull・継続的Reconciliationを行う | OpenGitOpsの4原則 [R08] | 第6章 |
| DataOps | データの開発・供給・品質管理を継続的に改善する実践 | DataOps Manifesto [R13] | 第10章 |
| MLOps | MLの開発から配備・監視・再学習までを管理する実践 | Google Cloud [R12] | 第9章 |
| AIOps | AIを活用してIT運用を支援・高度化する実践 | 第10章の操作的定義 | 第10章 |
| DevSecOps | セキュリティを開発・運用のライフサイクルに組み込む実践 | NIST SSDF [R14] | 第11章 |
| FinOps | 技術支出の事業価値と説明責任を高める運用フレームワーク・文化 | FinOps Foundation 2026 [R15] | 第11章 |
| LLMOps | LLMアプリの開発・評価・提供・監視・統制 | CNCF寄稿論考 [R17] | 第12章 |
| AgentOps | エージェントの行動・実行・評価・権限・監査の運用 | 新興用語。本書の操作的定義 [R18][R30] | 第13章 |
| MCP | AIアプリケーションとツール・データソースを接続するプロトコル | 公式仕様 [R19] | 第13章 |
| A2A | エージェント間の通信のためのプロトコル | 発表記事 [R28]、公式仕様 | 第19章 |
| Platform Engineering | 共通能力・開発体験を内製プラットフォーム製品として提供する実践 | CNCF [R20][R21] | 第14章 |
| IDP | 開発者がセルフサービスで利用できる共通能力の集合体 | CNCF／Backstage [R20][R23] | 第14章 |
| Developer Portal | IDPの機能を発見・利用するための入口 | IDPと同義ではない [R23] | 第14章 |
| Golden Path | 組織が推奨する、ある種類の仕事を成し遂げるための標準的な道筋 | Spotify（Golden Path）、Netflix（Paved Road） | 第14章 |
| Cognitive Load | 人・チームが同時に処理できる情報量の限界。内在的・外在的・学習関連に分類される | Team Topologies [R22] | 第14章 |
| Capability（共通部品） | 単一の機能を提供する再利用可能な部品 | 本書の整理 | 第15章 |
| Control / Data / Runtime Plane | 望ましい状態の受付・検証・記録 / 業務データとテレメトリーの流れ / ワークロードの実行 | 本書の整理（ネットワークの用法とは範囲が異なる） | 第16章 |
| Context Layer | AIが企業データを正しく使うための意味・関係・ガバナンス・品質の情報を提供する層 | 本書の操作的定義。標準化された用語ではない | 第18章 |
| Agent Mesh | 複数のエージェントを連携・管理するアーキテクチャパターン | 本書の操作的定義。A2A/MCPと区別 | 第19章 |
| Software Factory | 要件からリリースまでの生産工程を体系化・自動化する仕組み | 歴史的意味とAI時代の使用を区別 | 第21章 |
| ACI（Agent-Computer Interface） | LLMエージェントの特性に合わせて設計されたコンピュータとのインターフェース | SWE-agent [R31] | 第21章 |
| MAPE-K | Monitor・Analyze・Plan・Execute・Knowledgeからなる自律管理のループ | IBM Autonomic Computing [R33] | 第22章 |
| Self-Evolving Platform | 評価された変更によって能力・構成を改善し続けるプラットフォーム | <strong>研究仮説</strong>。公式標準の定義ではない | 第22章 |

### 出典方針

1. <strong>定義</strong>：一次資料（標準団体、著者自身の論文、公式仕様）を優先し、原文と本書での定義を区別する。
2. <strong>操作的定義</strong>：一次資料に確立した定義がない用語（AIOps、AgentOps、Agent Mesh、Context Layerなど）は、本書の操作的定義であることを明示する。
3. <strong>新興用語</strong>：定義が流動的な用語は、参照した時点と資料を明記し、刊行前に再確認する。

---

## 付録C　クラウド／データ基盤のサービス比較と責任分界

### C.1　クラウドのサービス対応（2026年11月時点、例示）

第17章の対応表を再掲する。<strong>名称、提供リージョン、GA／Preview、価格は刊行直前に再検証すること。</strong>

| 共通機能 | AWS | Azure | Google Cloud |
|---|---|---|---|
| 組織・テナントの境界 | Organizations、Control Tower | 管理グループ、サブスクリプション | 組織、フォルダ、プロジェクト |
| 人のID | IAM Identity Center | Entra ID | Cloud Identity |
| Container / Runtime | EKS、ECS、Lambda | AKS、Container Apps、Functions | GKE、Cloud Run、Cloud Functions系 |
| CI/CD | CodeBuild、CodePipeline、GitHub Actions | GitHub Actions、Azure Pipelines | Cloud Build、Cloud Deploy |
| IaC / Provisioning | CloudFormation、CDK、Terraform | Bicep、ARM、Terraform、Azure Verified Modules | Terraform、Infrastructure Manager |
| Identity / Policy | IAM、Organizations（SCP）、Config | Entra ID、Azure Policy | IAM、Organization Policy |
| Observability | CloudWatch、X-Ray | Azure Monitor、Application Insights | Cloud Monitoring、Cloud Trace |
| 監査 | CloudTrail | アクティビティログ | Cloud Audit Logs |
| AI / ML | Bedrock、SageMaker AI | Microsoft Foundry系、Azure ML | Vertex AI／Agent関連サービス |
| Developer Portal | Backstageなどを組み合わせる | Backstageなどを組み合わせる | Backstageなどを組み合わせる |

<strong>重要な更新点</strong>：Microsoftは <strong>Azure Deployment Environmentsの2027年2月22日終了</strong>を案内している。[R25]

### C.2　データ基盤の比較（目的と接続方式）

第18章の比較を再掲する。<strong>両者を同一製品とみなさず、目的と接続方式を比較する。</strong>

| 観点 | Databricks | Snowflake |
|---|---|---|
| 出自 | Apache Sparkを起源とするデータ処理とMLの基盤 | クラウドのデータウェアハウス |
| 中心となるアーキテクチャ | Lakehouse（Delta Lake） | データウェアハウス（Icebergへの対応を拡大） |
| ガバナンスの中心 | Unity Catalog [R26] | Horizon Catalog [R27] |
| AIへの主なアプローチ | MLの学習・管理・推論の基盤、生成AIアプリの構築 | データのあるところでLLMの機能を使う（Cortex） |
| IDP・エージェントとの接続 | カタログのAPI、推論エンドポイント、SQLエンドポイント | SQL、AI機能のAPI |

### C.3　データプラットフォームと開発プラットフォームの責任分界

| 領域 | 主責任の例 | 共通化すべき能力 | ドメイン固有の判断 |
|---|---|---|---|
| Developer Platform | Platform Team | 認証、環境作成、CI/CD、観測、監査 | Golden Pathの使い勝手 |
| Data Platform | Data Platform Team | Catalog、Lineage、Storage、権限制御 | データの意味と品質 |
| ML Platform | ML Platform Team | 学習実行、モデル登録、Serving | ML評価、特徴量、再学習 |
| LLM Platform | AI Platform Team | Gateway、Prompt Registry、Eval Runner | アプリごとの品質基準 |
| Agent Platform | Agent Platform / Security | Agent Runtime、Tool認可、Trace | 許可する行動とリスク許容 |
| Service Operations | SRE / Service Teams | Telemetry、Incident、SLO支援 | サービスSLOの合意・改善 |
| Governance | Security / Risk / Data Owners | Policy、Audit、Approval、Cost | 組織のリスク許容と規制対応 |

---

## 付録D　全章共通の実践シナリオ

本書では、架空の企業「ミナト・サポート株式会社」が提供する企業向け問い合わせ支援サービス「<strong>Askline（アスクライン）</strong>」を同じ題材として用い、運用基盤の進化を追跡した。

### D.1　シナリオの段階

| 段階 | 章 | Asklineの姿 | 主に導入する技術 |
|---|---|---|---|
| 1 | 第1〜3章 | 仮想マシン上のWeb/API/DB。運用担当者2名 | SNMP、Nagios互換プラグイン、Zabbixの思想、Runbook、ポストモーテム |
| 2 | 第4〜7章 | Kubernetes上のマイクロサービス（問い合わせ、顧客、通知、検索、集計） | GitHub Actions、Kubernetes、Argo CD、Prometheus、Grafana、OpenTelemetry、SLO |
| 3 | 第8〜11章 | データパイプラインと問い合わせ分類モデルを追加 | データ契約、データテスト、MLflow、ドリフト検知、SBOM、署名、Policy as Code、コスト配賦 |
| 4 | 第12〜13章 | RAGによるAI回答と問い合わせ対応エージェントを追加 | AIゲートウェイ、回帰評価、LLM-as-a-Judge、Tool Gateway、3段階の行動の分類 |
| 5 | 第14〜18章 | Backstageを入口にIDPを構築。3クラウドとデータ基盤のガバナンスを比較 | Software Catalog、Templates、Crossplane、マルチテナント、行・列レベルの権限 |
| 6 | 第19〜21章 | 複数のエージェント（問い合わせ対応、請求処理）とSoftware Factoryを連携 | Agent Registry、Agent Gateway、A2A、MCP、承認付き実行、変更の範囲のポリシーゲート |
| 7 | 第22〜23章 | 改善エージェントがCIの実行時間と費用を分析し、Sandboxで修正案を検証。人間の承認後に限定的に反映 | Platform Improvement Loop、制約と目的を分けた評価器 |

### D.2　本書に登場した主な実装例

| 章 | 実装例 | 主な設計の考え方 |
|---|---|---|
| 第1章 | SNMPによる再起動の検知 | ポーリングの限界 |
| 第2章 | Nagios互換プラグイン | 判定ロジックをネットワーク処理から分離してテストする |
| 第3章 | アラートの対応要否の集計 | アラート疲れをデータで可視化する |
| 第4章 | GitHub Actionsの最小パイプライン | uv・pytest、最小権限 |
| 第5章 | Error Budgetとバーンレートの計算 | SLOを小さな関数で表現する |
| 第6章 | アプリとデプロイのリポジトリの分離、ドリフトの実験 | GitOpsのPull型 |
| 第7章 | OpenTelemetryの計装、Collectorの設定 | 業務属性をスパンに付ける。機密情報を削除する |
| 第8章 | 能力の棚卸し | 乱立の実態を把握する |
| 第9章 | MLflowによる実験とモデルの登録、PSI | 本番モデルからデータとコードを遡れる |
| 第10章 | データ契約のテスト、異常スコア | データも品質のテストの対象 |
| 第11章 | SBOM・署名を含むCI、タグのポリシー | Security by Default／Cost by Default |
| 第12章 | AIゲートウェイのルーティングと予算、回帰評価 | 評価をCIに組み込む |
| 第13章 | Tool Gatewayのポリシー判定 | 既定で拒否、LLMの外側で判定 |
| 第14章 | 困りごとの優先順位づけ | 利用者の価値から始める |
| 第15章 | カタログの品質の検査 | カタログもデータ製品 |
| 第16章 | 名前空間一式の生成 | 本番の変更はコントロールプレーン経由 |
| 第17章 | クラウドごとの対応づけの分離 | 開発者のリポジトリにクラウド固有の記述を置かない |
| 第18章 | 行・列レベルのアクセス判定 | 人とエージェントが同じ境界を共有する |
| 第19章 | 委任・予算・深さの連鎖 | 権限は連鎖に沿って狭まる |
| 第20章 | 承認内容のハッシュの照合 | 承認した内容と実行内容の一致を保証する |
| 第21章 | 変更の範囲のポリシーゲート | ゲートそのものをエージェントに変更させない |
| 第22章 | 制約と目的を分けた評価器 | 評価の抜け穴を制約で棄却する |

### D.3　実装で共通して測る指標

- <strong>信頼性</strong>：SLI/SLO、障害件数、MTTR、エラーバジェット消費
- <strong>デリバリー</strong>：変更のリードタイム、デプロイ頻度、変更失敗・復旧
- <strong>開発体験</strong>：環境立ち上げ所要時間、Golden Path利用率、開発者満足
- <strong>AI/ML品質</strong>：業務タスク成功率、モデル品質、LLM評価、エージェント逸脱率
- <strong>セキュリティ</strong>：危険な操作の拒否率、脆弱性修正時間、監査完全性
- <strong>コスト</strong>：リクエスト／ジョブ当たり費用、GPU稼働率、利用者別配賦
- <strong>事業成果</strong>：問い合わせ解決時間、顧客価値、運用負担削減

### D.4　実装コードの共通方針

本書の実装例は、次の方針で書かれている。

1. <strong>Pythonのパッケージ管理にはuvを使う</strong>（`uv add`、`uv sync --locked`、`uv run pytest`）。
2. <strong>テストにはpytestを使い、単体テストを書く</strong>。
3. <strong>関数は小さく、一つの責務に限定する</strong>（SOLID原則）。判定・計算のロジックは、ネットワーク・データベース・外部サービスに依存しない純粋関数として切り出し、テストしやすくする。
4. **外部への依存は引数や`Protocol`で注入する**（Tool Gatewayの承認キューや監査ログなど）。
5. <strong>実装例は概念を示すための最小のもの</strong>であり、本番での利用には、エラー処理、設定の外部化、観測、セキュリティの強化が必要である。
6. 執筆・引用ルール第7項に従い、刊行前に、<strong>動作確認したソフトウェアのバージョン、環境、最小権限、費用</strong>を各章に添える。
