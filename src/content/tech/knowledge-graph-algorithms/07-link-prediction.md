---
title: 'リンク予測：Adamic-Adar・Preferential Attachment・評価'
description: '観測されていない接続の候補をスコア化するリンク予測。Adamic-Adar と Preferential Attachment の数式と実装、関係タイプを持つ知識グラフでの予測、MRR などのランキング評価を解説する。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 7
label: '第7章'
tags: ['Link Prediction', 'Adamic-Adar']
---

## 7.1 リンク予測とは

リンク予測（Link Prediction）は、観測されていない接続の候補をスコア化する。一般のグラフでは$(u,v)\in E$を予測し、関係タイプを持つKGでは$(h,r,t)$の妥当性を推定する。

**予測結果は事実の証明ではない。** 将来の関係なのか、すでに存在するが未登録の関係なのかを区別し、予測したエッジには由来・スコア・検証状態を付けて扱う。

## 7.2 Adamic-Adar Index

### 7.2.1 数式

共通近傍のうち、**希少なノードとの共通接続ほど高い評価**を与える。

$$
\boxed{AA(u,v)=\sum_{z\in\Gamma(u)\cap\Gamma(v)}\frac{1}{\log|\Gamma(z)|}}
$$

$\Gamma(z)$は共通近傍$z$の隣接ノード集合で、$\log$は自然対数である。共通ノードの次数が大きいほど寄与が小さくなる。

たとえば、2人のエンジニアがPythonと量子最適化を共通スキルとし、Pythonを保有する人が100人、量子最適化を保有する人が3人なら、

$$
\frac1{\log 100}\approx0.217,\qquad \frac1{\log 3}\approx0.910
$$

である。したがって、

$$
\boxed{AA(A,B)\approx1.127}
$$

となる。この計算は、人物―スキルの二部グラフでスキルノードの次数が上の通りであり、両者の共通スキルがこの2つだけであることを仮定する。

### 7.2.2 計算量と制約

各ノードの近傍集合が効率よく参照できれば、1ペアの計算は$O(|\Gamma(u)|+|\Gamma(v)|)$程度である。全ペア候補の評価は大きくなり得る。単純無向グラフでは共通近傍の次数は2以上なので$\log 1=0$は現れない。有向グラフや射影グラフで近傍の定義を変える場合は、分母が0になるケースを除外・処理する。標準的なNetworkXの実装は無向単純グラフを対象とする。

### 7.2.3 Python実装

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from([
    ("Person_A", "Python"),
    ("Person_A", "Quantum"),
    ("Person_B", "Python"),
    ("Person_B", "Quantum"),
    ("Person_C", "Python"),
    ("Person_D", "Python"),
])

for u, v, score in nx.adamic_adar_index(G, [("Person_A", "Person_B")]):
    print(u, v, score)
```

### 7.2.4 KGでの応用

- 希少な共通スキルを持つ人材の推薦候補
- 同じ技術群を利用する企業間の関連性
- 共通の珍しい概念を参照する研究文献
- 研究者ネットワークでの潜在的な協業候補

`Person --HAS_SKILL--> Skill`の射影から得たスコアは人物の**類似性**の候補である。これを`WORKS_WITH`などの異なる意味の事実として直接登録してはいけない。

## 7.3 Preferential Attachment（優先的選択）

### 7.3.1 数式

Preferential Attachmentは、接続数の多いノードほど新しい接続を得やすいという考え方に基づく。

$$
\boxed{PA(u,v)=\deg(u)\deg(v)}
$$

- $\deg(A)=10,\deg(B)=20$なら$PA(A,B)=200$
- $\deg(C)=2,\deg(D)=3$なら$PA(C,D)=6$

単純で高速だが、人気ノードへのバイアスを持つ。必ずしも意味的な適合性や因果関係を表すわけではない。

### 7.3.2 Python実装

```python
import networkx as nx

G = nx.Graph()
G.add_edges_from([
    ("A", "X"), ("A", "Y"), ("A", "Z"),
    ("B", "X"), ("B", "W"), ("C", "Y"),
])

scores = nx.preferential_attachment(G, [("A", "B"), ("B", "C")])
for u, v, score in scores:
    print(u, v, score)
```

### 7.3.3 KGでの応用

企業同士の協業関係、共同研究ネットワーク、技術エコシステムの拡張、ソーシャルネットワークの将来の接続などの候補生成に利用できる。しかし新興分野や希少な専門ノードを見落としやすいため、Adamic-Adar、属性特徴、GNN等との比較が有用である。

## 7.4 KGのリンク予測は関係タイプを扱う

通常のリンク予測は、

$$
(u,v)\in E\;?
$$

と表せる。KGでは、

$$
\boxed{(h,r,t)\in KG\;?}
$$

である。

例：

```text
(Person_A, HAS_SKILL, Python)
(Person_A, HAS_SKILL, GraphDB)
```

から、

```text
(Person_A, HAS_SKILL, Knowledge_Graph)
```

という関係が未登録の候補として推定できるかを評価する。

このとき、関係$r$に適合するノード型を制約する設計が必要となる。

$$
h\in\operatorname{Domain}(r),\qquad t\in\operatorname{Range}(r)
$$

ただしRDFS/OWLのDomain/Rangeは本来、型についての**論理的帰結**を定めるもので、データ検証の制約そのものではない。候補生成を制限するには、アプリケーション側のルールやSHACL等を併用する。

## 7.5 ランキング評価

### 7.5.1 Mean Reciprocal Rank（MRR）

$$
\boxed{MRR=\frac1N\sum_{i=1}^{N}\frac1{rank_i}}
$$

正解順位が1、2、4位の3件なら、

$$
MRR=\frac{1+1/2+1/4}{3}\approx0.583
$$

である。

### 7.5.2 Hits@K

$$
\boxed{Hits@K=\frac1N\sum_{i=1}^{N}\mathbf1[rank_i\le K]}
$$

正解が上位$K$件に入った割合である。関係予測ではHits@1、Hits@3、Hits@10などが用いられる。

### 7.5.3 その他の指標

候補エッジを二値分類する場合にはROC-AUCやPR-AUCも利用できる。推薦システムではPrecision@K、Recall@K、NDCGなどのランキング指標を使う場合もある。

**Filtered Evaluation**：KG補完の評価では、対象とする正解以外にも実際に成立する既知の三つ組があるとき、それらをランキングから除外する評価方法が使われる。評価結果には、使った評価プロトコルを明記する。

## 7.6 訓練・検証分割と情報漏洩

リンク予測では、既知の関係を訓練用・評価用に分割するが、単純なランダムエッジ分割は危険である。

1. `HAS_SKILL`と`SKILL_OF`など逆関係を片側だけ除去すると、逆方向から正解が漏洩する。
2. 過去から未来を予測する課題では、時間順の分割が必要になる。
3. 同じ実体を表す複数IDが存在すると、実質的な重複が漏洩を起こす。
4. KGが不完全であるため「観測されない」ことは必ずしも負例でない（Open-World Assumption）。
5. ノード属性に答えとなる情報が埋め込まれていないか検査する。

Neo4j GDSにはリンク予測のパイプラインがあり、分割、特徴、学習、評価などを構成できる。利用時は製品のバージョン・手順に従う。

## 7.7 グラフ表現学習との接続

Adamic-AdarやPreferential Attachmentは、グラフ構造から直接スコアを計算する。一方、[第8章](/tech/knowledge-graph-algorithms/08-graph-representation-learning)のNode2Vec、GraphSAGE、R-GCNでは、構造やノード特徴をベクトルに変換し、その学習表現をリンク予測に使用する。異種関係の予測にはTransE、DistMult、ComplEx、RotatEなどの知識グラフ埋め込みモデルも重要になる。

**資料**：[NetworkX Link Prediction](https://networkx.org/documentation/stable/reference/algorithms/link_prediction.html) ／ [Neo4j GDS Link Prediction](https://neo4j.com/docs/graph-data-science/current/machine-learning/linkprediction-pipelines/)
