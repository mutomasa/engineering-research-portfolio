---
title: 'ライブラリと分析基盤の選び方'
description: 'NetworkX、igraph、Neo4j Graph Data Science、PyTorch Geometric などのライブラリとグラフストレージを、用途・規模・計算基盤の観点で比較し、選び方を整理する。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 11
label: '第11章'
tags: ['NetworkX', 'Neo4j GDS', 'PyTorch Geometric']
---

## 11.1 理論から実装へ

グラフ理論を実装する際は、用途に応じてライブラリとグラフストレージを分けて考える。

- **NetworkX**：アルゴリズムの理解・小規模PoCに適する。
- **igraph**：C実装を利用した高速な構造分析、コミュニティ検出。
- **Neo4j + Graph Data Science（GDS）**：Property Graphの保存・検索・分析を組み合わせる。
- **PyTorch Geometric（PyG）**：GNN、グラフ表現学習の研究・実装。
- **DGL**：GNN向けのメッセージパッシング、異種グラフ学習。
- **RDFLib**：RDF形式の構築・検索・操作。
- **Amazon Neptune Analytics**：AWSのマネージドなグラフ分析。

## 11.2 技術比較

| 技術 | 主な機能 | 主な特徴 |
|---|---|---|
| NetworkX | BFS、Dijkstra、A*、PageRank、Betweenness、Louvain、Jaccard、SimRank、リンク予測等 | Pythonで数式を検証しやすい |
| python-igraph | 中心性、Leiden、経路探索など | C実装で効率的なグラフ処理 |
| Neo4j GDS | グラフ分析、Node2Vec、GraphSAGE、リンク予測パイプライン等 | KGと分析を統合しやすい |
| PyTorch Geometric | Node2Vec、GraphSAGE、R-GCN等 | PyTorchベースの研究開発 |
| DGL | GraphSAGE、R-GCN、異種グラフ学習 | GNN向けの実装 |
| RDFLib | RDF、SPARQL | RDFベースのKG構築 |
| Amazon Neptune Analytics | 経路探索、中心性、類似性、グラフ分析等 | マネージドなAWS基盤 |

対応アルゴリズム、API、ライセンス、GDSの成熟度区分は版によって変わるため、実装前に公式ドキュメントを確認する。

## 11.3 規模と目的による選び方

| フェーズ | 推奨技術 | 目的 |
|---|---|---|
| 数理学習・小規模PoC | NetworkX | 数式と結果を検算 |
| 大規模な構造分析 | igraph、Neo4j GDS | 中心性・コミュニティ分析 |
| 業務KGと分析の統合 | Neo4j + GDS | データ管理・分析・検索 |
| GNN研究 | PyTorch Geometric | ノード・関係の学習 |
| RDF・OWL中心 | RDFLib + RDFストア + 推論器 | 意味論的な知識基盤 |

単なるノード数ではなく、エッジ数、次数分布、重み、関係タイプ、計算アルゴリズム、メモリ使用量、並列化可能性まで検討する。SimRank・Betweenness・全ペア類似度は大規模化に伴い高コストになりやすい。

## 11.4 NetworkX

NetworkXは数式理解とPoCの第一候補になる。Pythonでグラフを作成・検索・分析しやすく、関数名もアルゴリズムに近い。

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from([(1, 2), (2, 3), (3, 1), (3, 4)])
print(nx.degree_centrality(G))
print(nx.betweenness_centrality(G))
print(nx.shortest_path(G, 1, 4))
```

Pythonオブジェクト中心の実装であるため、巨大グラフの大量計算には専用基盤との比較が必要である。

## 11.5 Neo4j Graph Data Science

GDSではNeo4jに存在するProperty Graphを、用途に合う**分析用グラフとしてインメモリに投影**してから、各種アルゴリズムを実行する。関係のタイプ・方向・重みを選択できる。

例：事前に投影したグラフでPageRankを実行。

```cypher
CALL gds.pageRank.stream('myGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
```

GDSには通常、Stream、Stats、Mutate、Writeなどの実行モードがあり、モードによって実行結果の保存先が変わる。使う前に、投影グラフの構造やバージョンの前提を確認する。

## 11.6 PyTorch GeometricとDGL

PyGやDGLは、グラフをニューラルネットワークの入力として扱うためのライブラリである。グラフの接続は`edge_index`や隣接構造、ノード特徴は特徴行列$X$、関係タイプは`edge_type`等で表現する。

GNNを使うために、データをグラフDBに格納しておく必要は必ずしもない。グラフDBから学習に必要なデータを抽出し、学習フレームワークへ渡す方式も一般的である。

## 11.7 RDF・OWL基盤との接続

RDF/OWLを中心とするKGでは、SPARQLと推論器を使い、意味論的な分析を行う。グラフアルゴリズムの実行が必要な場合は、対象の関係・ノードを抽出してNetworkXやGDSなどへ変換・射影できる。

**意味論的な推論と構造分析がそれぞれ得意な部分を担う**設計が重要である。

## 11.8 公式資料

- [NetworkX](https://networkx.org/documentation/stable/)
- [python-igraph](https://python.igraph.org/)
- [Neo4j GDS](https://neo4j.com/docs/graph-data-science/current/)
- [PyTorch Geometric](https://pytorch-geometric.readthedocs.io/)
- [DGL](https://github.com/dmlc/dgl)
- [RDFLib](https://rdflib.readthedocs.io/)
- [Amazon Neptune Analytics](https://docs.aws.amazon.com/neptune-analytics/latest/userguide/what-is-neptune-analytics.html)
