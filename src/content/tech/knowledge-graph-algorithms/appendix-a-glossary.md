---
title: '用語集'
description: '知識グラフ、オントロジー、グラフアルゴリズム、グラフ機械学習、GraphRAG などの主要用語と、それを扱う章の一覧。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 90
label: '付録A'
tags: ['Glossary']
---

| 用語 | 説明 | 主な章 |
|---|---|---|
| Knowledge Graph（KG） | エンティティと意味を持つ関係で知識を表現したグラフ | 第1・2章 |
| Ontology | 概念、関係、性質、公理を定義した意味モデル | 第1・9章 |
| Entity | 知識グラフ上の人物・技術・設備などの対象 | 第2章 |
| Relation | エンティティの間の意味付きの関係 | 第2章 |
| Triple | 主語・述語・目的語 $(h,r,t)$ の三つ組 | 第2章 |
| Node / Vertex | グラフの頂点 | 第2章 |
| Edge / Link | グラフの接続関係 | 第2章 |
| Directed Graph | エッジに方向があるグラフ | 第2章 |
| Weighted Graph | エッジに数値の重みがあるグラフ | 第2章 |
| Multigraph | 同じノード対に複数のエッジが存在し得るグラフ | 第2章 |
| Adjacency Matrix | 隣接関係を行列で表現したもの | 第2章 |
| Adjacency List | ノードごとの隣接ノードを列挙した表現 | 第2章 |
| Walk | ノードやエッジの再訪を許す移動列 | 第2章 |
| Path / Simple Path | 経路。単純路はノードの重複を含まない | 第2・3章 |
| Hop | 経路におけるエッジ1本分の移動 | 第3章 |
| Projection | 分析目的に応じてノード・関係・重みを抽出・変換すること | 第2・11章 |
| Meta-path | ノード型・関係型の並びを指定したパターン | 第2・13章 |
| BFS | 幅優先探索。等コストグラフで最少ホップ数を求める | 第3章 |
| Dijkstra | 非負重み付きグラフの最小コスト経路探索 | 第3章 |
| Relaxation | 現時点の距離推定を改善する操作 | 第3章 |
| A* | 実コストと推定残余コストを用いた目標指向探索 | 第3章 |
| Heuristic | 残余コストの推定値。A*等で用いる | 第3章 |
| Admissible | A*の推定値が真の残余最小コストを超えない性質 | 第3章 |
| Degree | ノードへの直接的な接続数 | 第4章 |
| In-Degree | 有向グラフで入ってくるエッジ数 | 第4章 |
| Out-Degree | 有向グラフで出ていくエッジ数 | 第4章 |
| PageRank | 重要な参照元からのリンクを重視する中心性 | 第4章 |
| Personalized PageRank | ジャンプ分布を特定ノードに偏らせるPageRank | 第4章 |
| Betweenness Centrality | 最短経路上での仲介度合いを表す中心性 | 第4章 |
| Modularity | ランダム接続の期待と比べたコミュニティ内密度の指標 | 第5章 |
| Louvain | Modularityの局所改善・集約によるコミュニティ検出 | 第5章 |
| Leiden | Refinementを追加したコミュニティ検出 | 第5章 |
| CPM | Constant Potts Model。コミュニティ分割の目的関数 | 第5章 |
| Label Propagation | 近傍のラベルを使ったコミュニティ検出 | 第5章 |
| Jaccard Similarity | 集合の積集合と和集合の比 | 第6章 |
| Common Neighbors | 2ノードが共有する隣接ノードの数 | 第6章 |
| SimRank | 近傍ノード間の類似性を再帰的に計算する方法 | 第6章 |
| Link Prediction | 未登録・将来のリンク候補を予測すること | 第7章 |
| Adamic-Adar | 希少な共通近傍を重く評価するリンク予測スコア | 第7章 |
| Preferential Attachment | 接続数の積でリンク候補を評価する考え方 | 第7章 |
| MRR | Mean Reciprocal Rank。正解順位の逆数の平均 | 第7章 |
| Hits@K | 正解が上位K候補に入った割合 | 第7章 |
| Open-World Assumption | 記録がないことを偽と同一視しない知識表現の考え方 | 第7章 |
| Embedding | ノード・関係などをベクトル空間で表したもの | 第8章 |
| Random Walk | 確率的にエッジをたどる移動過程 | 第4・8章 |
| Node2Vec | バイアス付きウォークと文脈学習による埋め込み | 第8章 |
| GraphSAGE | 近傍の特徴を集約して表現を生成するGNN | 第8章 |
| R-GCN | 関係タイプごとに重みを持つグラフ畳み込みネットワーク | 第8章 |
| Message Passing | 近傍ノードから情報を集約・更新するGNNの構造 | 第8章 |
| Basis Decomposition | 関係別重みを少数の基底行列の線形結合で表す方法 | 第8章 |
| KGE | Knowledge Graph Embedding。知識グラフの埋め込み学習 | 第8章 |
| TransE | 関係を埋め込み空間の並進として扱うKGE | 第8章 |
| DistMult | エンティティ・関係の成分ごとの積で三つ組をスコア化 | 第8章 |
| Inductive Learning | 未観測ノードにも学習済み関数を適用できる学習 | 第8章 |
| RDFS | RDF Schema。クラスやプロパティの意味関係を定める語彙 | 第9章 |
| OWL | Web Ontology Language。オントロジー記述言語 | 第9章 |
| SHACL | RDFデータの構造・条件を検証する言語 | 第9章 |
| SPARQL | RDFグラフの問い合わせ言語 | 第9章 |
| Cypher | Property Graphのパターン検索等に用いる問い合わせ言語 | 第11・12章 |
| GraphRAG | グラフ構造を検索や生成AIの根拠構築に利用する方法 | 第10章 |
| Local Search | 特定エンティティの近傍・関連情報を主に検索する方式 | 第10章 |
| Global Search | コミュニティ要約を横断して全体的な問いへ回答する方式 | 第10章 |
| GDS | Neo4j Graph Data Science。グラフ分析プラットフォーム | 第11・12章 |
| Temporal KG | 時刻とともに変化する関係を扱う知識グラフ | 第13章 |
| Valid Time | 現実世界で情報が有効な期間 | 第13章 |
| Transaction Time | データがシステムに記録された時間 | 第13章 |
