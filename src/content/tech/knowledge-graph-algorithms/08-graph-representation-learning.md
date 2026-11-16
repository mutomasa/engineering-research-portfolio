---
title: 'グラフ表現学習：Node2Vec・GraphSAGE・R-GCN'
description: 'これまでの中心性や類似性は、与えられた構造に対して明示的な式でスコアを計算する。一方、グラフ表現学習（Graph Representation Learning）では、ノードや関係を学習可能なベクトル表現へ写像する。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 8
label: '第8章'
tags: ['Node2Vec', 'GraphSAGE', 'R-GCN']
---

## 8.1 グラフ表現学習の目的

これまでの中心性や類似性は、与えられた構造に対して明示的な式でスコアを計算する。一方、グラフ表現学習（Graph Representation Learning）では、ノードや関係を学習可能なベクトル表現へ写像する。

$$
\boxed{v_i\longmapsto\boldsymbol z_i\in\mathbb R^d}
$$

得られた埋め込みをノード分類、関係予測、推薦、クラスタリング、異常検知などに用いる。

## 8.2 Node2Vec

### 8.2.1 ランダムウォークによる文脈学習

Node2Vecはグラフ上でランダムウォークを生成し、文脈として一緒に出現するノードの埋め込みが近くなるよう学習する。自然言語処理のWord2Vec/Skip-gramに近い発想を用いる。

現在ノード$v$、直前ノード$t$、次の候補ノード$x$とすると、遷移確率は、

$$
\boxed{P(x\mid v,t)=\frac{\alpha_{pq}(t,x)w_{vx}}{\sum_{z\in N(v)}\alpha_{pq}(t,z)w_{vz}}}
$$

である。バイアス項は、

$$
\alpha_{pq}(t,x)=\begin{cases}
1/p & d(t,x)=0\\
1   & d(t,x)=1\\
1/q & d(t,x)=2
\end{cases}
$$

と定義する。ここで$d(t,x)$は直前ノード$t$と次候補$x$の距離である。$p$は戻りやすさを、$q$は局所探索と遠方探索のバランスを制御する。

- $q$が大きいと、一般に局所的・BFS寄りの探索。
- $q$が小さいと、一般に遠方・DFS寄りの探索。
- $p$が小さいと、直前のノードへ戻りやすい。

BFS/DFSそのものを実行するのではなく、それらに近い探索バイアスを持つ2次ランダムウォークである点に注意する。

### 8.2.2 学習目的関数

ランダムウォークから得た文脈集合を$N_S(u)$とすると、

$$
\boxed{\max_{\boldsymbol z}\sum_{u\in V}\sum_{v\in N_S(u)}\log P(v\mid\boldsymbol z_u)}
$$

を考える。Softmaxによる例は、

$$
P(v\mid\boldsymbol z_u)=\frac{\exp(\boldsymbol z_v^\top\boldsymbol z_u)}{\sum_{x\in V}\exp(\boldsymbol z_x^\top\boldsymbol z_u)}
$$

である。実装ではNegative Sampling等で計算負荷を減らす。

### 8.2.3 計算量

全$n$ノードから各$r$本、長さ$L$のウォークを生成する場合、訪問ステップ数は$O(nrL)$である。これに文脈窓の生成、埋め込み次元、学習回数、負例数などに応じた学習コストが加わる。

### 8.2.4 PyTorch Geometric実装

```python
import torch
from torch_geometric.nn import Node2Vec

edge_index = torch.tensor([
    [0, 0, 1, 1, 2, 3],
    [1, 2, 2, 3, 3, 0]
], dtype=torch.long)

model = Node2Vec(
    edge_index,
    embedding_dim=32,
    walk_length=10,
    context_size=5,
    walks_per_node=10,
    p=1.0,
    q=0.5,
    num_nodes=4,
)

# これはモデル定義例。実際にはランダムウォークと
# 損失計算、最適化の学習ループが必要。
# インストール環境によって追加依存パッケージが必要。
```

### 8.2.5 KGでの応用と限界

人材のスキル関係、研究者・論文・研究分野の構造、サービスの依存関係などをベクトル化し、類似候補を探せる。標準Node2Vecは関係タイプそのものを明示的に学習するわけではないので、多関係KGでは関係射影やMetapath2Vecなどの異種グラフ手法も検討する。

## 8.3 GraphSAGE（Graph Sample and Aggregate）

### 8.3.1 概要

GraphSAGEは、ノード自身の特徴と近傍の特徴を集約し、埋め込みを生成する関数を学習する。

Node2Vecは基本的に学習時のノード固有の埋め込みを持つのに対し、GraphSAGEは**新規ノードにも、特徴と近傍が与えられれば学習済み関数を適用できる**帰納的（Inductive）手法である。

### 8.3.2 一般的更新式

$$
\boxed{\boldsymbol h_v^{(k)}=\sigma\left(W^{(k)}\left[\boldsymbol h_v^{(k-1)}\Vert AGG_k\bigl(\{\boldsymbol h_u^{(k-1)}:u\in N(v)\}\bigr)\right]\right)}
$$

- $\boldsymbol h_v^{(k)}$：第$k$層の表現
- $AGG_k$：近傍集約関数
- $W^{(k)}$：学習重み
- $\Vert$：ベクトル連結
- $\sigma$：活性化関数

Mean Aggregationでは、

$$
AGG(v)=\frac1{|N(v)|}\sum_{u\in N(v)}\boldsymbol h_u
$$

を用いる。PoolingやLSTMなどを使う設計もある。

### 8.3.3 近傍サンプリング

多段集約で全近傍を展開すると計算量が増えるため、各層で固定数の隣接ノードをサンプリングして学習する。$K$層で各層のサンプル数を$s_1,\ldots,s_K$とすれば、1ターゲットから展開されるノード数は設計によって$\prod_k s_k$に比例しうる。層数・サンプリング数の選択が性能に影響する。

層を深くすると、表現が似通うOver-smoothingや、遠距離の情報を少ない次元に押し込めるOver-squashingが問題になることがある。

### 8.3.4 PyTorch Geometric実装

```python
import torch
import torch.nn.functional as F
from torch_geometric.nn import SAGEConv

class GraphSAGE(torch.nn.Module):
    def __init__(self, in_dim, hidden_dim, out_dim):
        super().__init__()
        self.conv1 = SAGEConv(in_dim, hidden_dim)
        self.conv2 = SAGEConv(hidden_dim, out_dim)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        return x
```

PyGの標準的なMean Aggregationでは、層の出力は概略、

$$
\boldsymbol x_i'=W_1\boldsymbol x_i+W_2\operatorname{mean}_{j\in N(i)}\boldsymbol x_j
$$

となる。

### 8.3.5 KGでの応用

人物の経験年数、技術属性、案件実績などが特徴量として用意されている場合、周辺ノードの属性と組み合わせて推薦用の埋め込みを作成できる。新しい人物にも表現を計算できる点が利点である。標準のGraphSAGEは関係タイプを区別しないため、異種関係を区別する必要があるなら、Heterogeneous Graph向けの拡張を検討する。

## 8.4 R-GCN（Relational Graph Convolutional Network）

### 8.4.1 関係タイプ別のメッセージ集約

KGでは`HAS_SKILL`、`WORKS_AT`、`USES_TECH`などの関係が異なる。R-GCNは各関係タイプ$r$に対応する変換行列$W_r$を用いる。

$$
\boxed{\boldsymbol h_i^{(l+1)}=\sigma\left(W_0^{(l)}\boldsymbol h_i^{(l)}+\sum_{r\in\mathcal R}\sum_{j\in N_i^r}\frac1{c_{i,r}}W_r^{(l)}\boldsymbol h_j^{(l)}\right)}
$$

- $\mathcal R$：関係タイプ集合
- $N_i^r$：関係$r$で接続されたノード$i$の近傍
- $W_r^{(l)}$：関係ごとの重み行列
- $c_{i,r}$：正規化定数
- $W_0^{(l)}$：自ノード特徴の変換

核心は、$\boxed{W_r\text{ が関係タイプごとに異なる}}$ ことである。

### 8.4.2 パラメータ数と基底分解

関係タイプ数を$R$、入力特徴次元を$d_{in}$、出力次元を$d_{out}$とすると、すべて独立な重み行列を保持する場合、関係変換のパラメータ数は、

$$
R\,d_{in}d_{out}
$$

である。関係タイプが多いKGでは膨大になるため、Basis Decomposition（基底分解）を使用する。

$$
\boxed{W_r=\sum_{b=1}^{B}a_{rb}V_b}
$$

共有基底行列$V_b$を使うことで、各関係に独立した巨大な行列を保持せずに済む。

### 8.4.3 PyTorch Geometric実装

```python
import torch
import torch.nn.functional as F
from torch_geometric.nn import RGCNConv

class RGCN(torch.nn.Module):
    def __init__(self, in_dim, hidden_dim, out_dim, num_relations):
        super().__init__()
        self.conv1 = RGCNConv(
            in_dim, hidden_dim, num_relations=num_relations, num_bases=4
        )
        self.conv2 = RGCNConv(
            hidden_dim, out_dim, num_relations=num_relations, num_bases=4
        )

    def forward(self, x, edge_index, edge_type):
        x = self.conv1(x, edge_index, edge_type)
        x = F.relu(x)
        x = self.conv2(x, edge_index, edge_type)
        return x
```

このコードはモデルの定義例である。分類やリンク予測には損失関数、訓練・検証分割、予測ヘッドが別途必要。関係数・メモリの条件により`FastRGCNConv`等も比較する。

### 8.4.4 リンク予測デコーダ

R-GCNでエンティティ表現を生成し、別のスコア関数で$(h,r,t)$を評価する構成がある。たとえばDistMultは、

$$
\boxed{s(h,r,t)=\sum_{k=1}^{d}z_{h,k}w_{r,k}z_{t,k}}
$$

である。ただし$h$と$t$を入れ替えても同じスコアになるため、非対称関係を表す能力に限界がある。

TransEは、

$$
\boxed{s(h,r,t)=-\|\boldsymbol z_h+\boldsymbol z_r-\boldsymbol z_t\|_p}
$$

と表され、関係を埋め込み空間での並進として扱う。TransEは反対称関係や逆関係、関係の合成を表せるが、対称関係や1対多・多対1・多対多の関係を苦手とする。対称・反対称・逆関係をまとめて扱える選択肢として、ComplExやRotatEがある。どの性質を表現できるかはモデルごとに異なる。

### 8.4.5 KGでの応用

- 人物のスキル・組織・案件を区別した人材推薦
- 文献・著者・研究分野を使った関係予測
- 設備・工程・不具合・原因の関係に基づく分類
- ロボット・物体・動作・失敗を関連付けた知識構造の学習

## 8.5 3手法の比較

| 観点 | Node2Vec | GraphSAGE | R-GCN |
|---|---|---|---|
| 原理 | ランダムウォーク・文脈学習 | 近傍特徴集約 | 関係タイプ別の近傍集約 |
| 入力 | 接続構造 | 構造＋ノード特徴 | 構造＋特徴＋関係タイプ |
| 新規ノード | 原則再学習・追加学習 | 学習済み集約関数で対応可能 | 特徴と関係情報があれば対応可能 |
| 関係タイプ | 標準では区別なし | 標準では区別なし | 区別する |
| 用途 | 構造類似性・推薦 | ノード分類・推薦 | KG補完・関係予測・分類 |
| 主なライブラリ | PyG、Neo4j GDS | PyG、Neo4j GDS | PyG、DGL |

## 8.6 評価上の論点

表現学習は、埋め込みベクトル自体の見た目よりも、下流タスクの指標で評価する。リンク予測にはMRR・Hits@K、ノード分類にはF1・Accuracy、推薦にはPrecision@K・Recall@K等を用いる。単純なCommon NeighborsやJaccardをベースラインとして置くと、学習モデルの追加コストに見合う価値があるか比較できる。

**原典**：[Node2Vec](https://arxiv.org/abs/1607.00653) ／ [GraphSAGE](https://arxiv.org/abs/1706.02216) ／ [R-GCN](https://arxiv.org/abs/1703.06103) ／ [PyG公式](https://pytorch-geometric.readthedocs.io/)
