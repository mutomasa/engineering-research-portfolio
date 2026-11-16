---
title: '類似性分析：Jaccard・Common Neighbors・SimRank'
description: '類似性分析（Similarity Analysis）は、ノードの特徴または関係構造の近さを数値化する。人材が保有するスキル、製品の機能、論文の引用先、サービスの依存先などを比較するときに使う。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 6
label: '第6章'
tags: ['Jaccard', 'Common Neighbors', 'SimRank']
---

## 6.1 類似性の考え方

類似性分析（Similarity Analysis）は、ノードの特徴または関係構造の近さを数値化する。人材が保有するスキル、製品の機能、論文の引用先、サービスの依存先などを比較するときに使う。

## 6.2 Jaccard Similarity（ジャッカード類似度）

### 6.2.1 集合の類似度

2つの集合$A,B$の類似度を、

$$
\boxed{J(A,B)=\frac{|A\cap B|}{|A\cup B|}}
$$

と定義する。グラフでは近傍集合$\Gamma(u),\Gamma(v)$を用い、

$$
J(u,v)=\frac{|\Gamma(u)\cap\Gamma(v)|}{|\Gamma(u)\cup\Gamma(v)|}
$$

とする。

例えば、

$$
A=\{\mathrm{Python,SQL,KG}\},\quad B=\{\mathrm{Python,KG,ROS2}\}
$$

なら、共通要素は2つ、和集合は4つで、

$$
\boxed{J(A,B)=2/4=0.5}
$$

である。両方とも空集合の場合は分母0になるので、用途に応じて規約を決める。

### 6.2.2 計算量

ハッシュ集合による1ペアの比較は、$O(|\Gamma(u)|+|\Gamma(v)|)$程度である。ただし全ペアでは$O(n^2)$候補があり、候補ペアの絞り込みが重要になる。

### 6.2.3 Python実装

```python
skills_a = {"Python", "SQL", "KG"}
skills_b = {"Python", "KG", "ROS2"}

jaccard = len(skills_a & skills_b) / len(skills_a | skills_b)
print(jaccard)  # 0.5
```

NetworkXには無向グラフ上の候補エッジに対する`nx.jaccard_coefficient()`もある。

### 6.2.4 重み付きJaccard

重要度・熟練度などの非負特徴量$x_i,y_i$を使うと、

$$
\boxed{J_w(A,B)=\frac{\sum_i\min(x_i,y_i)}{\sum_i\max(x_i,y_i)}}
$$

となる。スキルの単純な一致数でなく、どれほど熟達しているかを反映したい場合に役立つ。

### 6.2.5 KGへの応用

`Person --HAS_SKILL--> Skill`だけを取り出し、人物ごとのスキル集合を比較する。製品なら`HAS_FEATURE`、文書なら`MENTIONS_TOPIC`など、意味が同じ関係に限定する。多種関係を無条件に混ぜないことが重要である。

## 6.3 Common Neighbors（共通近傍数）

### 6.3.1 定義

$$
\boxed{CN(u,v)=|\Gamma(u)\cap\Gamma(v)|}
$$

Jaccardと異なり、正規化せずに共通近傍の絶対数を数える。

人物Aが10スキル、人物Bが12スキルを持ち、共通スキルが5つなら、

$$
CN(A,B)=5,\quad J(A,B)=\frac5{10+12-5}=\frac5{17}\approx0.294
$$

である。スキルを非常に多く持つ人材が上位になりやすいなど、正規化しないことによるバイアスに留意する。

### 6.3.2 Python実装

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from([
    ("Person_A", "Python"),
    ("Person_A", "SQL"),
    ("Person_A", "KG"),
    ("Person_B", "Python"),
    ("Person_B", "KG"),
    ("Person_B", "ROS2"),
])

common = list(nx.common_neighbors(G, "Person_A", "Person_B"))
print(common)  # ['Python', 'KG']（順序は環境による）
print("Count:", len(common))
```

### 6.3.3 KGでの応用

- 共通スキルの多い人物の抽出
- 共通機能を持つ製品の比較
- 共通概念を参照する文書の検索
- 共通依存サービスを持つアプリケーションの検出

Common Neighborsは簡易的なリンク予測特徴量としても使われる。

## 6.4 SimRank

### 6.4.1 直観と再帰式

SimRankは「類似するノードから参照されるノード同士も類似する」と考え、近傍同士の類似度を再帰的に計算する。

有向グラフで入近傍を$I(u)$、減衰係数を$C\in(0,1)$とすると、

$$
\boxed{S(u,v)=\frac{C}{|I(u)||I(v)|}\sum_{a\in I(u)}\sum_{b\in I(v)}S(a,b)\quad(u\ne v)}
$$

この式は $u\ne v$ のときに使い、$u=v$ では $S(u,u)=1$ とする。異なるノード間で入近傍が空なら、通常$S(u,v)=0$と扱う。

### 6.4.2 反復計算

$$
S^{(k+1)}(u,v)=\frac{C}{|I(u)||I(v)|}\sum_{a\in I(u)}\sum_{b\in I(v)}S^{(k)}(a,b)\quad(u\ne v)
$$

を反復する。JaccardやCommon Neighborsと違い、直接の共通近傍だけでなく、入近傍同士が別の経路を通じて似ていることも考慮する。

### 6.4.3 計算量

全ノードペアの類似度行列には$O(n^2)$の記憶容量が必要になる。単純な反復は非常に高コストになり得るため、大規模KGでは候補絞り込み、局所近似、サンプリングなどを考慮する。

### 6.4.4 Python実装

```python
import networkx as nx

G = nx.DiGraph()
G.add_edges_from([
    ("Topic_A", "Document_1"),
    ("Topic_A", "Document_2"),
    ("Topic_B", "Document_1"),
    ("Topic_B", "Document_2"),
    ("Topic_C", "Document_3"),
])

score = nx.simrank_similarity(
    G,
    source="Document_1",
    target="Document_2",
    importance_factor=0.8,
)
print(score)
```

### 6.4.5 KGでの応用

論文・著者・研究テーマの関係から、直接共通する引用が少なくても、類似する研究領域から参照される文書を発見することに使える。一般のSimRankでは関係のタイプを識別しないため、異種関係を含むKGでは関係を選んで射影するか、関係付きの拡張を設計する。

## 6.5 比較表

| 観点 | Jaccard | Common Neighbors | SimRank |
|---|---|---|---|
| 原理 | 共通集合の割合 | 共通近傍の数 | 近傍同士の再帰的類似性 |
| 範囲 | 通常0〜1 | 0以上 | 典型的には0〜1 |
| 計算コスト | 比較的低い | 比較的低い | 高くなりやすい |
| 得意な応用 | 人材・製品の比較 | 共通関係・簡易予測 | 多段階の構造類似性 |

**資料**：[NetworkX Jaccard](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.link_prediction.jaccard_coefficient.html) ／ [NetworkX SimRank](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.similarity.simrank_similarity.html) ／ [SimRank論文](https://doi.org/10.1145/775047.775126)
