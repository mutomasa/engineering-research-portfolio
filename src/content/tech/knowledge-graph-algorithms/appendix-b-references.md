---
title: '参考文献・論文・公式ドキュメント'
description: '本書で扱ったアルゴリズムの原典論文と、NetworkX・Neo4j GDS・igraph・PyTorch Geometric などの公式ドキュメントの一覧。'
updated: 2026-11-17
series: knowledge-graph-algorithms
order: 99
label: '付録B'
tags: ['References']
---

本書で扱った代表的なアルゴリズムの原典、および実装の確認に役立つ公式ドキュメントを挙げる。ウェブ資料は更新されるため、実装時には使用するバージョンのドキュメントを優先する。

## B.1 グラフ理論・経路探索・中心性

1. Dijkstra, E. W. (1959). *A Note on Two Problems in Connexion with Graphs*. Numerische Mathematik, 1, 269–271. https://doi.org/10.1007/BF01386390
2. Ford, L. R., Jr. (1956). *Network Flow Theory*. RAND Corporation, Paper P-923.
3. Bellman, R. (1958). *On a Routing Problem*. Quarterly of Applied Mathematics, 16(1), 87–90. https://doi.org/10.1090/qam/102435
4. Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths*. IEEE Transactions on Systems Science and Cybernetics, 4(2), 100–107. https://doi.org/10.1109/TSSC.1968.300136
5. Page, L., Brin, S., Motwani, R., & Winograd, T. (1999). *The PageRank Citation Ranking: Bringing Order to the Web*. Stanford InfoLab Technical Report 1999-66. http://ilpubs.stanford.edu:8090/422/
6. Haveliwala, T. H. (2002). *Topic-Sensitive PageRank*. WWW 2002, 517–526. https://doi.org/10.1145/511446.511513
7. Brandes, U. (2001). *A Faster Algorithm for Betweenness Centrality*. Journal of Mathematical Sociology, 25(2), 163–177. https://doi.org/10.1080/0022250X.2001.9990249

## B.2 コミュニティ検出

8. Newman, M. E. J., & Girvan, M. (2004). *Finding and Evaluating Community Structure in Networks*. Physical Review E, 69, 026113. https://doi.org/10.1103/PhysRevE.69.026113
9. Fortunato, S., & Barthélemy, M. (2007). *Resolution Limit in Community Detection*. PNAS, 104(1), 36–41. https://doi.org/10.1073/pnas.0605965104
10. Blondel, V. D., Guillaume, J.-L., Lambiotte, R., & Lefebvre, E. (2008). *Fast Unfolding of Communities in Large Networks*. Journal of Statistical Mechanics: Theory and Experiment, 2008, P10008. https://doi.org/10.1088/1742-5468/2008/10/P10008 （arXiv: https://arxiv.org/abs/0803.0476）
11. Traag, V. A., Van Dooren, P., & Nesterov, Y. (2011). *Narrow Scope for Resolution-Limit-Free Community Detection*. Physical Review E, 84, 016114. https://doi.org/10.1103/PhysRevE.84.016114
12. Traag, V. A., Waltman, L., & van Eck, N. J. (2019). *From Louvain to Leiden: Guaranteeing Well-Connected Communities*. Scientific Reports. https://doi.org/10.1038/s41598-019-41695-z
13. Raghavan, U. N., Albert, R., & Kumara, S. (2007). *Near Linear Time Algorithm to Detect Community Structures in Large-Scale Networks*. Physical Review E. https://doi.org/10.1103/PhysRevE.76.036106

## B.3 類似性・リンク予測

14. Jaccard, P. (1901). *Étude comparative de la distribution florale dans une portion des Alpes et des Jura*. Bulletin de la Société Vaudoise des Sciences Naturelles.
15. Jeh, G., & Widom, J. (2002). *SimRank: A Measure of Structural-Context Similarity*. KDD. https://doi.org/10.1145/775047.775126
16. Adamic, L. A., & Adar, E. (2003). *Friends and Neighbors on the Web*. Social Networks. https://doi.org/10.1016/S0378-8733(03)00009-1
17. Barabási, A.-L., & Albert, R. (1999). *Emergence of Scaling in Random Networks*. Science. https://doi.org/10.1126/science.286.5439.509
18. Liben-Nowell, D., & Kleinberg, J. (2007). *The Link-Prediction Problem for Social Networks*. Journal of the American Society for Information Science and Technology. https://doi.org/10.1002/asi.20591

## B.4 グラフ表現学習と知識グラフ埋め込み

19. Mikolov, T., Sutskever, I., Chen, K., Corrado, G., & Dean, J. (2013). *Distributed Representations of Words and Phrases and their Compositionality*. NIPS 2013. https://arxiv.org/abs/1310.4546
20. Grover, A., & Leskovec, J. (2016). *node2vec: Scalable Feature Learning for Networks*. KDD 2016. https://arxiv.org/abs/1607.00653
21. Dong, Y., Chawla, N. V., & Swami, A. (2017). *metapath2vec: Scalable Representation Learning for Heterogeneous Networks*. KDD 2017. https://doi.org/10.1145/3097983.3098036
22. Hamilton, W. L., Ying, R., & Leskovec, J. (2017). *Inductive Representation Learning on Large Graphs*. NIPS 2017. https://arxiv.org/abs/1706.02216
23. Schlichtkrull, M., et al. (2018). *Modeling Relational Data with Graph Convolutional Networks*. ESWC 2018. https://arxiv.org/abs/1703.06103
24. Bordes, A., et al. (2013). *Translating Embeddings for Modeling Multi-Relational Data*. NIPS 2013. https://papers.nips.cc/paper/5071-translating-embeddings-for-modeling-multi-relational-data
25. Yang, B., et al. (2015). *Embedding Entities and Relations for Learning and Inference in Knowledge Bases*. ICLR 2015. https://arxiv.org/abs/1412.6575
26. Trouillon, T., et al. (2016). *Complex Embeddings for Simple Link Prediction*. ICML 2016. https://arxiv.org/abs/1606.06357
27. Sun, Z., et al. (2019). *RotatE: Knowledge Graph Embedding by Relational Rotation in Complex Space*. ICLR 2019. https://arxiv.org/abs/1902.10197

## B.5 オントロジー・知識表現

28. W3C. *RDF Schema 1.1*. https://www.w3.org/TR/rdf-schema/
29. W3C. *OWL 2 Web Ontology Language Document Overview*. https://www.w3.org/TR/owl2-overview/
30. W3C. *Shapes Constraint Language (SHACL)*. https://www.w3.org/TR/shacl/
31. W3C. *SPARQL 1.1 Query Language*. https://www.w3.org/TR/sparql11-query/
32. W3C. *RDF 1.1 Concepts and Abstract Syntax*. https://www.w3.org/TR/rdf11-concepts/

## B.6 GraphRAG

33. Microsoft. *GraphRAG Documentation*. https://microsoft.github.io/graphrag/
34. Microsoft. *GraphRAG GitHub Repository*. https://github.com/microsoft/graphrag
35. Edge, D., et al. (2024). *From Local to Global: A Graph RAG Approach to Query-Focused Summarization*. https://arxiv.org/abs/2404.16130

## B.7 実装ライブラリ

36. NetworkX Documentation. https://networkx.org/documentation/stable/
37. NetworkX Shortest Paths. https://networkx.org/documentation/stable/reference/algorithms/shortest_paths.html
38. NetworkX Centrality. https://networkx.org/documentation/stable/reference/algorithms/centrality.html
39. NetworkX Link Prediction. https://networkx.org/documentation/stable/reference/algorithms/link_prediction.html
40. NetworkX SimRank. https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.similarity.simrank_similarity.html
41. Neo4j Graph Data Science. https://neo4j.com/docs/graph-data-science/current/
42. Neo4j Graph Data Science Algorithms. https://neo4j.com/docs/graph-data-science/current/algorithms/
43. Neo4j Node Similarity. https://neo4j.com/docs/graph-data-science/current/algorithms/node-similarity/
44. Neo4j Link Prediction Pipeline. https://neo4j.com/docs/graph-data-science/current/machine-learning/linkprediction-pipelines/
45. python-igraph. https://python.igraph.org/
46. PyTorch Geometric Documentation. https://pytorch-geometric.readthedocs.io/
47. Deep Graph Library (DGL). https://github.com/dmlc/dgl
48. RDFLib Documentation. https://rdflib.readthedocs.io/
49. Amazon Neptune Analytics. https://docs.aws.amazon.com/neptune-analytics/latest/userguide/what-is-neptune-analytics.html

## B.8 参考文献の読み進め方

- 経路探索を学ぶ：Dijkstra、A*、NetworkXのShortest Paths。
- 中心性の理論を学ぶ：PageRank、Brandes。
- コミュニティを学ぶ：Louvain、Leidenの順に読む。
- 類似度・リンク予測を学ぶ：SimRank、Adamic-Adar、Link Predictionの原典。
- GNNを学ぶ：Node2Vec、GraphSAGE、R-GCN、PyTorch Geometric。
- KGの意味論を学ぶ：W3CのRDF、OWL、SHACL、SPARQL。
- GraphRAGを実践する：Microsoft GraphRAG公式資料とEdgeらの論文。
