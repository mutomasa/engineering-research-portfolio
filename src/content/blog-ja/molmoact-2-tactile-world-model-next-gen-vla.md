---
title: 'MolmoAct 2から考える、触覚とWorld Modelを組み合わせた次世代VLA'
description: '2026年5月、Allen Institute for AI（Ai2）がロボット基盤モデル「MolmoAct 2」を公開しました。5月28日にはHugging FaceのLeRobotにも統合され、オープンなロボティクス研究がさらに進みそう…'
pubDate: 2026-09-20
tags: ['robotics', 'vla', 'world-models', 'tactile-sensing', 'physical-ai']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/20/125823'
---
2026年5月、Allen Institute for AI（Ai2）がロボット基盤モデル「MolmoAct 2」を公開しました。5月28日にはHugging FaceのLeRobotにも統合され、オープンなロボティクス研究がさらに進みそうです。

私が修士研究で取り組んでいる「Vision-Tactile JEPA World Model for Long-Horizon VLA」と比較しながら、今後の研究の方向性を考えてみます。

## MolmoAct 2とは？

MolmoAct 2は、画像と言語から環境を理解し、ロボットの行動を生成するAction Reasoning Model（ARM）です。

視覚・言語モデルのMolmo 2-ERを基盤に、Flow Matchingを用いたAction Expertがロボットの動作を生成します。

特徴は、3D空間を推論しながら行動を決定できることです。さらに、推論速度が従来モデルから最大37倍に向上し、SO-101を含む複数のロボットに対応しています。

## 私の研究との違い

両者の大きな違いは、空間を理解して行動することと、未来の状態を予測して失敗に対応することにあります。

| 観点 | MolmoAct 2 | 私の研究 |
| --- | --- | --- |
| 主要入力 | 視覚・言語・ロボット状態 | 視覚・触覚・言語・ロボット状態 |
| 世界の理解 | 3D空間推論 | JEPAによる未来の潜在状態予測 |
| 行動生成 | Flow Matching | VLAとWorld Modelの連携 |
| 研究の焦点 | 多様なタスクへの適応 | 失敗予測・回復・長期タスク |

MolmoAct 2にも長期タスクへの対応能力はあります。ただし、公式記事では、10〜30ステップの行動をまとめて生成・実行するため、実行途中の予期しない変化に即座に対応できないことが課題として挙げられています。

私の研究では、ここに触覚とJEPAベースのWorld Modelを組み合わせたいと考えています。

例えば、物体を把持したとき、画像だけでは滑りや接触状態を正確に把握できない場合があります。触覚から接触状態を観測し、World Modelで未来の状態を予測できれば、物体を落とす前に把持力や動作を修正できるかもしれません。

## 今後の展望

特に注目しているのは、MolmoAct 2がLeRobotに統合され、SO-101にも対応していることです。研究で使用するSO-101を使って、比較実験を進められる可能性があります。

今後はMolmoAct 2をベースラインとして、次の3点を検証したいと考えています。

-   触覚を追加することで、把持や接触を伴う操作の成功率は向上するか。
    
-   JEPA World Modelによって、失敗の予兆を検出できるか。
    
-   失敗後の再計画によって、長期タスクの完遂率を改善できるか。
    

「行動できるVLA」から「失敗を予測し、回復できるVLA」へ。

MolmoAct 2のようなオープンな基盤モデルの発展によって、モデルをゼロから開発するのではなく、その上に触覚や未来予測を組み合わせる研究が進めやすくなっています。

私の修士研究でも、単純なタスク成功率だけでなく、失敗からの回復能力まで評価することで、長期的に自律動作できるロボットの実現につなげていきたいと思います。

参考：[MolmoAct 2公式記事](https://allenai.org/blog/molmoact2)  / [GitHub](https://github.com/allenai/molmoact2)
