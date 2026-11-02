---
title: 'ロボットに「世界モデル」は本当に必要なのか？──CoRL 2026で真正面から議論されるWorld Model vs End-to-End VLA'
description: '2026年11月、米国テキサス州オースティンで開催される CoRL 2026（Confere…'
pubDate: 2026-09-25
tags: ['robotics', 'vla', 'world-models', 'tactile-sensing', 'physical-ai']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/25/210126'
---
ロボットに「世界モデル」は本当に必要なのか？──CoRL 2026で真正面から議論されるWorld Model vs End-to-End VLA

2026年11月、米国テキサス州オースティンで開催される **CoRL 2026（Conference on Robot Learning）** で、かなり興味深いワークショップが開催されます。

そのタイトルは、

**Do Robots Need World Models? A Debate on Dynamics Learning, Planning, and End-to-End Robot Learning**

です。

つまり、真正面から

> **「ロボットにWorld Modelは本当に必要なのか？」**

を議論するイベントです。

公式サイトはこちらです。

[https://do-robots-need-world-models.github.io/](https://do-robots-need-world-models.github.io/)

個人的に面白いのは、単純に「World Modelをどう作るか」を議論するのではなく、

> **そもそも明示的なWorld Modelを作る必要があるのか？**

というところまで議論を戻している点です。

## World Model派 vs End-to-End派

World Modelの基本的な考え方は、ロボットが行動する前に、

```
現在の状態
    ↓
行動
    ↓
世界がどう変化するか予測
    ↓
望ましい未来になる行動を選択
```

というように、**行動によって未来の世界がどのように変化するかを予測するモデル**を持たせることです。

動画生成モデル、Latent World Model、Dynamics Model、Learned Simulator、World Action Modelなども、広い意味ではこの流れに入ります。

一方で、最近のVLA（Vision-Language-Action）は、

```
Vision + Language
        ↓
       VLA
        ↓
      Action
```

というEnd-to-Endの方向へ進んでいます。

この場合、

**独立したWorld Modelを作らなくても、Policy内部の潜在表現に物理世界の構造や予測能力を学習できるのではないか**

という考え方があります。

今回のワークショップでは、まさにこの点が大きな論点になっています。

## Physical Intelligence側が「Against World Models」

特に興味深いのが、Physical Intelligence共同創業者の **Chelsea Finn** が登壇することです。

公式サイトでは、

**Against world models / implicit / end-to-end**

という側の登壇者として配置されています。

これはPhysical Intelligenceの方向性を考えると、とても面白いです。

Physical Intelligenceは、π0、π0.5などのGeneralist VLAを開発しており、大量かつ多様なRobot Dataから、さまざまなロボット・タスク・環境に適応するPolicyを学習する方向を進めています。

発想としては、

```
World Modelを別に作る
        ↓
未来を予測
        ↓
Planner
        ↓
Action
```

という構成よりも、

```
大量のRobot Experience
        ↓
Generalist VLA
        ↓
内部にPhysical Knowledgeを獲得
        ↓
Action
```

という方向です。

つまり、

**世界を予測するための独立したモデルを明示的に用意しなくても、大規模なPolicyの内部に必要な世界理解を獲得できるのではないか**

という考え方です。

ただし、ここには注意が必要です。

今回のイベントは「Debate」、つまり討論形式です。

そのため、

**「Chelsea FinnやPhysical IntelligenceがWorld Modelそのものを完全否定している」**

と断定するのは少し強すぎます。

より正確には、

> **明示的なWorld ModelをPolicyとは別のモジュールとして持つ必要があるのか？**

という問題提起として見るのがよいと思います。

## このイベントの論点がかなり面白い

公式サイトを見ると、議論は複数のMotionに分けられています。

その中でも特に重要なのは、次のような問いです。

| 論点 | 問い |
| --- | --- |
| End-to-End | Policy内部に予測能力を持たせれば十分なのか |
| Generalization | Explicit World Modelは未知のGoalへの一般化に有利なのか |
| Scaling | General-purpose World ModelよりGeneral-purpose Policyの方がスケールしやすいのか |
| Safety | World Modelは安全性やPolicy Evaluationに必要なのか |
| Architecture | 問題はWorld Modelが必要かではなく「どこに置くか」ではないか |
| Benchmark | 現在のBenchmarkでWorld Modelの価値を正しく評価できているのか |

私は特に、

**「World Modelを使うかどうかではなく、どこに置くのか」**

という論点が重要だと思っています。

## World ModelはPolicyの前に置く必要はない

World Modelというと、

```
Robot
  ↓
World Model
  ↓
Planner
  ↓
Action
```

という古典的なModel-Based Controlを想像しがちです。

しかし、World Modelは必ずしもこの位置に置く必要はありません。

例えば、

```
Training Data Generator
Simulation
Policy Evaluation
Failure Prediction
Safety Monitor
Representation Learning
Planning
```

など、さまざまな使い方があります。

つまり、

**World Model vs VLA**

という二者択一ではなく、

**World Modelをロボットシステムのどこに配置するのか**

という設計問題になっているように思います。

## 私のVision-Tactile JEPA研究との関係

この議論は、私が研究テーマとして考えている

**Vision-Tactile JEPA World Models for Failure-Aware Long-Horizon Robotic Manipulation**

ともかなり関係があります。

私の研究でWorld Modelに期待しているのは、リアルな未来画像を生成することそのものではありません。

例えば、

```
Vision
  +
Tactile
  +
Action
   ↓
JEPA World Model
   ↓
Future Latent State
   ↓
Slip / Contact Loss / Failure
```

のように、

**将来の失敗につながる状態を潜在空間で予測すること**

が重要です。

つまりWorld Modelを、行動そのものを生成するPolicyとして使うのではなく、

**行動の結果を予測するFailure Predictor**

として利用します。

例えば、

```
VLA
 ↓
Action Proposal
 ↓
Vision-Tactile World Model
 ↓
Failure Prediction
 ↓
Execute / Replan / Recovery
```

という構成です。

この場合、VLAとWorld Modelは競合しません。

むしろ、

-   VLA：行動を生成する
-   World Model：行動の結果を予測する
-   Failure Model：失敗リスクを評価する
-   Planner：必要なら再計画する

という役割分担ができます。

## Long-Horizon ManipulationではWorld Modelの価値が出るかもしれない

短いタスクであれば、

```
Observation → Action
```

というEnd-to-End Policyだけでも十分かもしれません。

しかしLong-Horizon Manipulationでは、

```
Action 1
 ↓
Action 2
 ↓
Action 3
 ↓
小さな誤差
 ↓
状態がずれる
 ↓
Action 8で失敗
```

という問題が起こります。

そこで、

```
現在状態
  ↓
候補Action
  ↓
Future Latent State
  ↓
Failure Risk
```

を予測できれば、

**失敗する前にRecoveryやReplanningを実行できる**

可能性があります。

特に、

-   滑り
-   接触状態
-   把持状態
-   Object Poseのずれ
-   Gripperの失敗

などは、VisionだけでなくTactileが有効になる可能性があります。

ここが、私のVision-Tactile JEPA World Modelで検証したいポイントでもあります。

## World Model vs VLAではなくなるかもしれない

今後のPhysical AIでは、

```
World Model
vs
VLA
```

という単純な競争ではなく、

```
            Foundation VLA
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      Action    Memory   World Model
                           │
                     Failure / Safety
```

のような構成になっていく可能性があります。

End-to-End VLAには、データとモデルサイズを増やして能力を高められるという大きな魅力があります。

一方で、

-   Long-Horizon Task
-   Unknown Environment
-   Failure Recovery
-   Safety
-   Contact-Rich Manipulation

を考えると、

> **「このActionを実行すると次に何が起きるのか？」**

を明示的に問い合わせられるWorld Modelにも価値があります。

## まとめ

今回のCoRL 2026のイベントは、

**「World Modelをどう作るか」ではなく、「そもそもWorld Modelは必要なのか」**

を真正面から議論している点が面白いです。

Physical IntelligenceのようなEnd-to-End VLAの方向と、JEPAやWorld Action Modelのような予測モデルの方向は、一見すると対立しているように見えます。

しかし最終的には、

```
Policy
+
World Model
+
Memory
+
Planner
+
Failure Detection
```

のように役割分担される可能性もあります。

その意味では、本当に重要な問いは、

> **Do Robots Need World Models?**

というYes / Noではなく、

> **Where should the World Model live?**

なのかもしれません。

私の研究でも、World Modelを巨大な未来画像生成器として作るのではなく、

**VisionとTactileから将来の潜在状態と失敗を予測し、VLAのActionを補助するモデル**

として位置づけることが、一つの重要な方向だと考えています。

今後、Physical IntelligenceのEnd-to-End VLAと、JEPA系World Modelがどこで交わっていくのか。

CoRL 2026でのこの議論は、Physical AIやVLA研究を追う上でも注目したいイベントです。

## 参考

-   Do Robots Need World Models? [https://do-robots-need-world-models.github.io/](https://do-robots-need-world-models.github.io/)
    
-   Physical Intelligence [https://www.pi.website/](https://www.pi.website/)
