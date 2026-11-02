---
title: 'VLAは「自分の身体」を理解する必要があるのか？'
description: 'Whole-body VLA、触覚、World Modelから考えるロボットの身体性 最近、Vision-Language-Action（VLA）について調べていて、一つ気になっていることがある。 VLAは、本当にロボット自身の「身体」を理…'
pubDate: 2026-08-14
tags: ['vla', 'embodiment', 'world-models', 'physical-ai', 'tactile-sensing']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/14/130000'
---
## Whole-body VLA、触覚、World Modelから考えるロボットの身体性

最近、Vision-Language-Action（VLA）について調べていて、一つ気になっていることがある。

**VLAは、本当にロボット自身の「身体」を理解しているのだろうか？**

VLAというと、

**Vision + Language → Action**

という構図で説明されることが多い。

例えば、

> 「赤いコップを取って」

という指示を与える。

カメラで赤いコップを認識し、VLAがロボットのActionを生成する。

RT-2は、WebスケールのVision-Language知識をロボット制御へ転移することで、この方向性を大きく前進させた研究の一つだった。

しかし、実際にロボットを動かすことを考えると、少し不思議なことに気づく。

ロボットにとって重要なのは、

「何が見えているか」

だけではない。

「自分の腕が今どこにあるのか」

「グリッパはどのくらい閉じているのか」

「物体に接触しているのか」

「モータにはどの程度負荷がかかっているのか」

「持っている物体が滑り始めていないか」

といった、**自分自身の身体状態**も重要なはずだ。

そこで今回は、

**VLAにおける身体性とは何なのか？**

そして、

**Whole-body VLAにすれば身体性を獲得したと言えるのか？**

ということを考えてみたい。

* * *

# 1\. Visionだけではロボットの状態は分からない

まず非常に単純化したVLAを考える。

$$a_t = \pi(I_t, l)$$

ここで、

-   $I_t$：カメラ画像
    
-   $l$：Language Instruction
    
-   $a_t$：Action
    

とする。

例えばカメラには、

「ロボットのグリッパがコップを掴んでいる」

ように見えているとする。

しかし、本当に正しく把持できているかは画像だけでは分からない。

実際には、

-   安定して把持している
    
-   少し滑っている
    
-   強く握りすぎている
    
-   指先が物体に触れただけ
    
-   片側しか接触していない
    

という異なる物理状態が存在する。

ところがRGB画像上では、それらが非常によく似て見える場合がある。

つまり、

$$Observation \neq Physical\ State$$

である。

ここに「身体性」を考える余地がある。

* * *

# 2\. 人間には固有受容感覚がある

人間は目を閉じても、自分の腕がどのあたりにあるかある程度分かる。

これは **proprioception（固有受容感覚）** と呼ばれる。

ロボットにも、それに相当する情報が存在する。

例えば身体状態を、

$s_t = [q_t,\dot{q}_t,I_t,g_t,F_t,T_t$  
\]

と考えることができる。

ここで、

-   $q_t$：Joint Position
    
-   $\dot{q}_t$：Joint Velocity
    
-   $I_t$：Motor Current
    
-   $g_t$：Gripper State
    
-   $F_t$：Force
    
-   $T_t$：Torque
    

である。

実際、現在のVLAは必ずしもVisionとLanguageだけを入力しているわけではない。

ここで重要なのは、

**Vision + Language**

から、

**Vision + Language + Body State**

へと考え方が広がっていることである。

* * *

# 3\. ではWhole-body VLAにすればいいのか？

ここで出てくるのが **Whole-body VLA** である。

通常のマニピュレーションVLAでは、

-   arm
    
-   gripper
    

など比較的限定されたActionを扱うことが多い。

一方、ヒューマノイドでは、

-   Head
    
-   Torso
    
-   Waist
    
-   Left Arm
    
-   Right Arm
    
-   Hands
    
-   Legs
    
-   Mobile Base
    

などを同時に扱う必要がある。

Actionを単純化すると、

$a_t =[a_t^{head},a_t^{arm},a_t^{hand},a_t^{torso},a_t^{leg}$  
\]

という高次元のAction Spaceになる。

Whole-body VLAは非常に重要な方向性だと思う。

ただし、ここで一つ疑問がある。

**身体全部を制御することと、身体を理解することは、本当に同じなのだろうか？**

* * *

# 4\. Whole-body controlとEmbodimentは少し違う

私はここを分けて考えた方がよいと思っている。

Whole-body VLAが主に扱っているのは、

> **身体のどこまでをActionとして制御するか**

という問題である。

一方、身体性として興味深いのは、

> **ロボットが自分の身体について何を観測し、何を内部表現として持ち、何を予測できるのか**

という問題である。

例えば、

```
Whole-body VLA

Vision + Language
       |
       v
      VLA
       |
       v
Arm + Hand + Waist + Leg + Head
```

にしたからといって、

「自分はいまコップを強く握りすぎている」

「このまま持ち上げると滑りそうだ」

ということまでモデルが理解しているとは限らない。

これは**Action Spaceの問題と身体状態のRepresentationの問題は別だから**である。

ここは身体性を考える上で重要な区別だと思う。

* * *

# 5\. 「身体を含んだLatent State」を作る

そこで、観測を次のように考えてみる。

$$o_t ={I_t^{RGB},q_t,\dot{q}_t,I_t^{motor},T_t^{tactile}}$$

つまり、

-   RGB
    
-   Joint Position
    
-   Joint Velocity
    
-   Motor Current
    
-   Tactile
    

をまとめて現在のObservationとする。

そしてMultimodal Encoderによって、

$$z_t = E(o_t)$$

というlatent representationを作る。

この $z_t$ を、仮に

**Embodied Latent State**

と呼んでみる。

重要なのは、

$$z_t = Vision\ Feature$$

だけではなく、

$$z_t =World + Robot\ Body + Interaction$$

として考えることである。

つまり、

**世界の状態、自分自身の身体状態、身体と世界との相互作用を、一つのlatent representationとして表現する。**

ここに身体性の重要なポイントがあるのではないかと思う。

* * *

# 6\. さらにWorld Modelを入れる

ここからさらに面白くなる。

現在の状態 $z_t$ とAction $a_t$ から、

\[tex:\\hat{z}*{t+1}=f*\\theta(z\_t,a\_t)\]

を予測する。

つまり、

> 「このActionを実行したら、自分の身体と環境は次にどうなるのか？」

をモデルに予測させる。

構造としては、例えば次のようになる。

```
RGB ───────────────┐
Joint Position ────┤
Motor Current ─────┤
Tactile ───────────┤
Language ──────────┤
                   v
            Multimodal Encoder
                   |
                   v
            Embodied Latent
                  z_t
                   |
          +--------+--------+
          |                 |
          v                 v
     World Model           VLA
          |                 |
    z_(t+1) prediction    Action
          |                 |
          +--------+--------+
                   |
                   v
              next action
```

普通のVLAを、

**見る → 動く**

と考えるなら、このモデルは、

**見る → 身体状態を認識する → 動いた結果を予測する → 動く**

となる。

ここにWorld ModelをVLAへ組み込む意味がある。

* * *

# 7\. Tactileが重要になる理由

例えばpeg-in-holeを考えてみる。

Vision中心なら、

```
穴を認識
   |
   v
Pegを移動
   |
   v
挿入
```

となる。

しかし、実世界ではそんなに簡単ではない。

```
穴を認識
   |
   v
Pegを移動
   |
   v
接触
   |
   v
Force / Tactileを観測
   |
   v
少しずれている
   |
   v
姿勢を補正
   |
   v
再び接触
   |
   v
挿入
```

というclosed-loop interactionになる。

ここではActionは単なる座標出力ではない。

**身体と世界との相互作用そのものが、新しいObservationになる。**

「触ったら硬かった」

「押したが動かなかった」

「掴んだが滑った」

こうした情報は、Visionだけから完全に取得するのが難しい。

* * *

# 8\. センサーは多ければいいのか？

ここでもう一つ疑問が出る。

それなら、

-   RGB
    
-   Depth
    
-   LiDAR
    
-   IMU
    
-   Force
    
-   Torque
    
-   Tactile
    
-   Joint
    
-   Motor Current
    

を全部入れればよいのだろうか。

私は、研究としてはむしろ逆だと思っている。

面白いのは、

**どの身体情報が本当に必要なのか？**

という問いである。

例えば次のようなAblation Studyが考えられる。

| Model | Vision | Joint | Motor Current | Tactile |
| --- | --- | --- | --- | --- |
| A | ○ |  |  |  |
| B | ○ | ○ |  |  |
| C | ○ | ○ | ○ |  |
| D | ○ | ○ | ○ | ○ |

そして、

-   Grasp Success Rate
    
-   Slip Detection
    
-   Failure Prediction
    
-   Generalization
    
-   Recovery Success Rate
    

などを比較する。

こうすれば、

「センサーを増やしたら性能が上がった」

だけではなく、

**どの身体情報が、どの物理現象を理解するために必要なのか**

という問いに踏み込める。

* * *

# 9\. 新規性はどこにあるのか

ここは研究としてかなり重要だと思う。

すでに、

-   Vision + Proprioception
    
-   Tactileを利用するロボット学習
    
-   Whole-body VLA
    
-   World Model
    

という研究は存在している。

したがって、

**「VLAにTactileを追加しました」**

だけでは新規性として弱い。

そこで、問いそのものを変えてみる。

## What bodily information does a VLA actually need?

つまり、

**VLAが物理世界で行動するためには、どこまで「自分自身」を知る必要があるのか？**

という問いである。

例えば、

```
Vision
  ↓
Vision + Proprioception
  ↓
Vision + Proprioception + Motor Current
  ↓
Vision + Proprioception + Motor Current + Tactile
```

と段階的に身体情報を追加する。

そして、それぞれのLatent Stateから、

**どこまで将来の接触・滑り・把持失敗を予測できるのか**

を評価する。

私はここに、

**Minimal Sufficient Embodiment**

という研究の切り口があるのではないかと思っている。

つまり、

> VLAが物理世界で安定して行動するために必要な、最小限の身体情報は何なのか？

という問いである。

* * *

# 10\. 何を解決できるのか

この考え方によって、いくつかの問題を扱える可能性がある。

## 視覚的に曖昧な接触状態

RGBでは同じように見える「掴んでいる」という状態でも、

-   Stable
    
-   Slipping
    
-   Weak grasp
    
-   Excessive force
    

という違いがある。

Proprioception、Motor Current、Tactileを使えば、これらを区別できる可能性がある。

## Failure Prediction

失敗してから検出するのではなく、

$$P(Failure_{t+k} \mid z_t,a_t)$$

を予測する。

つまり、

> 「このまま持ち上げると落としそう」

という未来を予測する。

## Failure Recovery

予測だけではなく、

```
slip predicted
      |
      v
gripper adjustment
      |
      v
re-grasp
      |
      v
continue task
```

までVLAにつなげる。

これは「失敗を検出するロボット」から、

**「失敗を予測して、自分で行動を修正するロボット」**

への変化になる。

* * *

# 11\. 関連する研究

このテーマを考える上で、以下の研究は特に参考になる。

## RT-2

**Vision-Language-Action Models Transfer Web Knowledge to Robotic Control**

VLMの知識をAction生成へ接続したVLAの代表的研究。

[https://arxiv.org/abs/2307.15818](https://arxiv.org/abs/2307.15818)

## LLaVA-VLA

**A Simple Yet Powerful Vision-Language-Action Model**

Vision、Language、ProprioceptionからActionを生成するVLA。

[https://github.com/OpenHelix-Team/LLaVA-VLA](https://github.com/OpenHelix-Team/LLaVA-VLA)

## Tactile-VLA

**Unlocking Vision-Language-Action Model's Physical Knowledge for Tactile Generalization**

触覚情報をVLAへ統合するという意味で、今回考えているテーマに非常に近い研究。

[https://arxiv.org/abs/2507.09160](https://arxiv.org/abs/2507.09160)

## LeVERB

**Humanoid Whole-Body Control with Latent Vision-Language Instruction**

Vision-LanguageとWhole-body humanoid controlを接続する研究。

[https://arxiv.org/abs/2506.13751](https://arxiv.org/abs/2506.13751)

## WOLF-VLA

**Whole-Body Humanoid Optimal Locomotion Framework for Vision-Language-Action Learning**

Whole-body locomotionとVLAを扱う研究。

[https://arxiv.org/abs/2606.25591](https://arxiv.org/abs/2606.25591)

## VLA Survey

VLA全体を整理する際に参考になる。

[https://vla-survey.github.io/](https://vla-survey.github.io/)

* * *

# 12\. Whole-body VLAの先にあるもの

ここまで考えて、自分の中では少し整理できた。

ロボットの身体性を考えるとき、

**Whole-body VLAが最終回答とは限らない。**

Whole-body VLAが扱うのは主に、

> 身体のどこまでを制御するか

という**Action**の問題である。

一方、身体性には少なくとも、

```
              Embodiment
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
  Observation Representation Prediction
       |           |           |
       v           v           v
    Sensor    Latent State  World Model
       |           |           |
       +-----------+-----------+
                   |
                   v
                 Action
                   |
                   v
          Whole-body Control
```

という複数の問題がある。

つまり、

**Observation**

自分の身体をどこまで観測するのか。

**Representation**

身体と環境の関係をどう内部表現するのか。

**Prediction**

自分が動いたら身体と環境がどう変化するのか。

**Action**

身体のどこを、どう動かすのか。

という4つを分けて考えた方がよい。

私は、この中でも特に

**Representation + Prediction**

が面白いと思っている。

* * *

# 13\. 「身体を持つAI」とは何なのか

LLMには身体がない。

VLMも基本的には世界を観察する。

VLAになって、

```
Perception
    |
    v
Action
```

というループが生まれた。

しかし、それだけで「身体を持ったAI」と呼べるのだろうか。

私はまだ足りないと思っている。

本当に身体を持つのであれば、

```
Perception
    |
    v
Body State
    |
    v
Prediction
    |
    v
Action
    |
    v
Physical Interaction
    |
    v
Sensation
    |
    +-------> 次のPerceptionへ
```

というループが必要なのではないか。

特に重要なのは、

```
Action
   |
   v
Physical Interaction
   |
   v
Sensation
```

という部分である。

物体を触った。

重かった。

滑った。

押したら動かなかった。

強く握りすぎた。

そして、その結果によって次のActionを変える。

ここまで来て初めて「身体を持って環境と相互作用している」と言えるのではないか。

* * *

# 14\. 考察：World ModelだけではなくBody Modelが必要なのではないか

現在のVLAでは、

-   大規模ロボットデータ
    
-   Action Chunking
    
-   Diffusion
    
-   Flow Matching
    
-   Cross-Embodiment
    
-   Whole-body control
    

など様々な方向の研究が進んでいる。

その中で、次に重要になるものの一つが、

**Body Model**

なのではないかと考えている。

World Modelが、

> 「世界はどう変化するのか」

をモデル化するものだとする。

それに対してBody Modelは、

> 「その世界の中で、自分の身体はどう変化するのか」

をモデル化する。

しかし、実際にはWorldとBodyを分離することすら不自然なのかもしれない。

ロボットが物体を押せば、

**物体が動く。**

同時に、

**ロボットの関節に反力が返る。**

ロボットが物体を掴めば、

**物体の状態が変化する。**

同時に、

**グリッパのMotor CurrentやTactileも変化する。**

つまり、本来予測すべきものは世界だけではない。

# \[tex:(World\_{t+1}, Body\_{t+1})

f(World\_t,Body\_t,Action\_t)\]

なのではないか。

そう考えると、

**World Model + Body Model**

というより、

**Embodied World Model**

と呼んだ方が自然なのかもしれない。

Vision、Proprioception、Motor Current、Force、Tactileも単なる「センサー入力」ではなくなる。

それらは、

**ロボットが自分自身と世界との関係を推定するための観測**

になる。

* * *

# 15\. 最後に

最終的に私が面白いと思っている問いは、とてもシンプルである。

> **How much embodiment does a VLA need?**

VLAはどこまで自分の身体を知らなければならないのか。

Visionだけで十分なのか。

Joint Stateが必要なのか。

Motor Currentまで必要なのか。

Tactileが決定的なのか。

Whole-body Stateまで必要なのか。

そして、それらから形成された身体表現をWorld Modelで未来へ展開することで、

**「失敗してから反応する」のではなく、「失敗する前に行動を変える」**

ことができるのか。

これは単なるVLAの性能向上の問題ではないと思っている。

その先には、

> **「AIが身体を持つとはどういうことなのか？」**

というEmbodied AIの根本的な問いがある。

個人的には、Whole-body VLAそのものよりも、その手前にある、

**「ロボットは自分の身体をどう表現しているのか？」**

という問題の方が、今は気になっている。
