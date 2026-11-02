---
title: 'ロボットを持ち歩かずにロボットの学習データを集める ― Universal Manipulation Interface（UMI）を読む'
description: '最近はUMIが熱い感じです。そろそろ重い腰を上げて、自分の研究でどのように関係するかを考えるために、論文を読んで色々と調べました。 この記事はAIを活用して書いている記事であることをご理解ください。 ロボット学習について調べていると、結局か…'
pubDate: 2026-08-19
tags: ['robotics', 'imitation-learning', 'physical-ai', 'umi']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/19/155220'
---
最近はUMIが熱い感じです。そろそろ重い腰を上げて、自分の研究でどのように関係するかを考えるために、論文を読んで色々と調べました。

この記事はAIを活用して書いている記事であることをご理解ください。

ロボット学習について調べていると、結局かなりの頻度で「データをどう集めるか」という問題に戻ってくる。

VLA（Vision-Language-Action Model）でも模倣学習でも、モデルの話はもちろん重要なのだが、実際にロボットを動かすには、

**「人間がどう動かしたかを、ロボットが学習できる形式で大量に記録する」**

必要がある。

ところが、これが意外と難しい。

今回読んだ **Universal Manipulation Interface（UMI）** は、このデータ収集問題に対してかなり面白いアプローチを取っている研究だった。

UMIは2024年のRobotics: Science and Systems（RSS）で発表された研究で、研究タイトルは *Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots* である。名前の通り、「実環境にロボットを持って行かなくても、実環境でロボットの教師データを集める」ことを狙っている。

## そもそも、何が問題なのか

ロボットの模倣学習で教師データを集める方法として、まず思いつくのはロボットを人間が遠隔操作する方法だ。

例えば、

-   SpaceMouse
    
-   VRコントローラ
    
-   Leader-Follower型ロボット
    
-   ALOHA
    
-   GELLO
    

などを使ってロボットを操作し、そのときの画像と関節状態、End-Effector（EE）の軌道などを記録する。

これはロボット自身からデータを取得するので、当然ながら学習データと実行時のロボットとの対応は取りやすい。

一方で問題もある。

**データを集める場所にロボット本体が必要になる。**

例えば「100軒の家で食器を片付けるデータを集めたい」と思ったら、100軒にロボットを持っていくのは現実的ではない。

逆にYouTubeなどから人間の作業動画を大量に収集する方法もある。ただし、人間の腕とロボットアームでは身体構造が違うため、

**Human Embodiment → Robot Embodiment**

という大きなEmbodiment Gapが発生する。

UMIはこの2つの間を狙っている。

## UMIの発想はかなりシンプル

UMIでは、人間がロボットを遠隔操作するのではなく、**ロボットのグリッパに似た手持ちデバイスを人間自身が持って作業する。**

ハードウェアは3DプリントされたParallel Jaw Gripperを中心としていて、手首に相当する場所にGoProが取り付けられている。

さらに、

-   155°のFish-eyeカメラ
    
-   GoPro内蔵IMU
    
-   Side Mirror
    
-   Gripper Widthを取得するFiducial Marker
    

などを組み合わせている。

面白いのは、センサーを大量に搭載するというより、

**「人間がデータを集めるときと、ロボットが実行するときの見え方をできるだけ同じにする」**

ことを重視している点だと思う。

ロボット側にも、グリッパに対して同じ位置関係になるようGoProと同じ形状のFingerを取り付ける。

すると、

```
人間がUMIを持ったとき
        ↓
Gripperから見たRGB画像

ロボットが動くとき
        ↓
Gripperから見たRGB画像
```

がかなり似たObservationになる。

UMIが解こうとしているのは単純な「安価なデータ収集」だけではない。

**Observation Embodiment Gapそのものを、ハードウェア設計によって小さくしている。**

ここがUMIの重要なポイントだと思う。

## GoPro動画からActionをどう作るのか

もちろん映像だけ撮影しても、模倣学習には使えない。

Policyを学習するには、

```
Observation → Action
```

のペアが必要になる。

UMIではGoProの映像と内蔵IMUを利用し、Visual-Inertial SLAMを用いてグリッパの6DoF Poseを推定する。実装はORB-SLAM3をベースにしている。

さらにFiducial Markerからグリッパ幅を取得する。

したがって、人間がUMIを使って作業すると、

```
GoPro MP4
   │
   ├─ RGB
   ├─ IMU
   │
   ▼
Visual-Inertial SLAM
   │
   ├─ 6DoF End-Effector Pose
   └─ Gripper Width
```

という形で、ロボット学習に必要なデータへ変換できる。

公式実装では処理後のデータをZarr datasetへ変換し、そのデータをDiffusion Policyの学習に利用している。

## Absolute ActionではなくRelative Trajectory

個人的にUMIで特に興味深かったのがAction Representationである。

例えばロボットに、

```
World座標 (x=0.42, y=0.13, z=0.25)
へ移動する
```

と学習させると、そのWorld座標系そのものに依存してしまう。

UMIではそうではなく、

**現在のEnd-Effector Poseを基準にしたRelative Trajectory**

をActionとして使う。

つまり、

```
現在のEE Pose
    │
    ├── 100ms後：この相対Pose
    ├── 200ms後：この相対Pose
    ├── 300ms後：この相対Pose
    └── ...
```

という軌道をPolicyが出力する。

これは単純なDelta Actionとも少し違う。

Deltaでは一つ前のActionからの差分を積み重ねるので誤差も蓄積する。一方UMIのRelative Trajectoryは、推論開始時の同じEE Poseを基準に将来の軌道を表現する。

これによってWorld座標系への依存が減り、異なるロボットへのTransferもしやすくなる。

## PolicyはVLAではなくDiffusion Policy

ここは区別しておいた方がいい。

UMIそのものはVLAではない。

Policyへの入力は主に、

```
RGB
Relative EE Pose
Gripper Width
```

で、出力は、

```
Relative EE Trajectory
Gripper Width
```

である。

言語命令を入力するVision-Language-Action Modelではなく、**Visuomotor Policyを学習するフレームワーク**と考えた方が分かりやすい。

全実験ではDiffusion Policyを利用しており、Vision EncoderにはCLIPで事前学習したViTが使われている。

概念的には、

```
RGB
Relative EE Pose
Gripper Width
       │
       ▼
Vision Encoder
  CLIP ViT
       │
       ▼
Diffusion Policy
       │
       ▼
Relative EE Trajectory
Gripper Width
```

という構成になる。

## 地味だが非常に重要なLatency Matching

もう一つ面白いのがLatencyの扱いだった。

教師データを手持ちUMIで収集するときには、人間の動きと映像はほぼ同時に記録される。

しかし実際のロボットでは、

```
Camera
 ↓
画像転送
 ↓
Policy推論
 ↓
Command送信
 ↓
Robot Controller
 ↓
Motor
```

と複数の遅延が入る。

このズレを無視してしまうと、特にTossingのような高速動作ではObservationとActionのタイミングが一致しない。

UMIはRGB、EE Pose、Gripper WidthそれぞれのObservation Latencyを計測して時刻をそろえ、さらにRobotとGripperのExecution Latencyも計測して、必要なCommandを先行して送る。

実際、Dynamic TossingではLatency Matchingを行ったPolicyが87.5%の成功率を記録し、Latency Matchingを外した場合には動作が大きくJitterすることが報告されている。

ロボット学習ではモデルのArchitectureに目が向きがちだが、

**Sensor → Model → Controller → Motor**

という実システム全体の時間軸を合わせることもPolicyの一部なのだ、と改めて感じた。

## UMIの結果

UMIでは、

-   Cup Arrangement
    
-   Dynamic Tossing
    
-   Bimanual Cloth Folding
    
-   Dish Washing
    

という、かなり性質の違う4つのタスクを評価している。

特に面白いのがIn-the-Wildで集めたCupデータである。

Stanford周辺の複数環境でデータを収集して学習すると、未知の環境や未知のCupを含む評価で全体約71.7%の成功率を示した。

一方、同じ事前学習済みViTを使っていても、Lab内の狭いデータだけで学習したPolicyは未知環境では成功率0%だった。

つまり、

**大きなVision Backboneを使えば自動的にGeneralizationするわけではなく、学習データ自体の多様性が重要**

という結果でもある。

データ収集速度についてもCup ArrangementではUMIが111 demonstrations/hour、SpaceMouseによるTeleoperationが35 demonstrations/hourとなっており、従来型Teleoperationより3倍以上高速だった。

## UMIの新規性は「グリッパ」だけではない

最初にUMIを見たときには、

「人間がロボット用のグリッパを持って作業するシステム」

くらいに思っていた。

しかし論文を読むと、本質はもう少し広い。

UMIでは、

```
Physical Interface
        +
Observation Representation
        +
Action Representation
        +
Time Synchronization
        +
Policy
```

を一つのInterfaceとして設計している。

特に、

**人間とロボットのEmbodiment Gapを、モデルだけではなくデータ取得装置・座標系・カメラ配置まで含めて小さくする**

という考え方が面白い。

これは今後VLAの学習データを大規模に集める上でも重要な考え方になると思う。

## ただし、UMIには「触った感覚」がほとんどない

ここから自分の研究テーマとの関係になる。

UMIのObservationは基本的に、

```
Vision
+
Robot / Gripper Proprioception
```

で構成される。

一方、接触を伴うManipulationでは、

-   物体をちゃんと把持したか
    
-   滑り始めているか
    
-   押し付ける力が強すぎないか
    
-   接触した瞬間はいつか
    
-   物体がFingerの中で移動したか
    

といった状態は、RGBだけでは分からない場合がある。

例えば見た目としては「掴めている」ように見えていても、数百ms後には滑り落ちるかもしれない。

ここが、自分が研究している **Vision-Tactile Latent World Model for Failure-Aware VLA** とかなりつながってくる。

自分の研究では、

```
RGB
Tactile
Robot State
Language
   │
   ▼
Multimodal Encoder
   │
   ▼
Latent State z_t
   │
   ▼
Latent World Model
   │
   ▼
Future Latent State z_{t+1:t+H}
   │
   ├─ Contact
   ├─ Slip
   ├─ Failure probability
   │
   ▼
VLA Policy
   │
   ▼
Action
```

という方向を考えている。

UMIが主に、

**「今見えている状態から、どのActionを実行するか」**

を模倣学習する仕組みだとすると、自分の研究ではさらに、

**「このActionをすると、この先どうなるのか」**

をLatent World Modelで予測したい。

この違いはかなり重要だと思っている。

例えば、

```
現在
物体を把持した
       │
       ▼
World Model
       │
       ├─ この把持なら安定
       │
       └─ この把持なら500ms後にSlip
```

まで予測できれば、Policyは失敗する前に、

```
Gripperを閉じる
Poseを修正する
一旦持ち直す
```

といったActionを選択できる可能性がある。

表で整理すると、

| 観点 | SO-101テレオペ | UMI |
| --- | --- | --- |
| 初期構築 | **簡単** | 装置製作が必要 |
| Action取得 | **SO-101のactionを直接取得** | SO-101用へ変換が必要 |
| XELA利用 | **そのまま可能** | UMI側にも取付設計が必要 |
| Sim2Real | 比較的素直 | embodiment差が入る |
| 大量データ収集 | △ | **◎** |
| 修士の実現性 | **◎** | ○ |
| 研究本体への集中 | **◎** | △ |

## そしてTacUMIがかなり近いところまで来ている

この点について調べていて非常に興味深かったのが、2026年に発表された **TacUMI** である。

TacUMIはUMIの思想をContact-Rich Manipulationへ拡張した研究で、UMI型のGripperに、

-   ViTac Sensor
    
-   Force-Torque Sensor
    
-   Pose Tracker
    

を追加し、これらを同期して収集する。

著者ら自身も、VisionとProprioceptionだけでは物理的なInteractionにおけるEvent Transitionを十分捉えられない場合があることを研究動機として挙げている。Cable Mounting Taskでは、マルチモーダルデータを使ったTask Segmentationで90%以上の精度を報告している。

これは自分の研究を考える上でも重要な先行研究だと思う。

単純に、

**「UMIに触覚を追加しました」**

だけでは、すでにTacUMIが存在する。

一方でTacUMIが主眼としているのは、Multimodal Demonstration Collectionと、接触イベントを利用したTask Segmentationである。

自分が取り組みたい方向とは少し違う。

整理すると、

|  | UMI | TacUMI | 自分の研究 |
| --- | --- | --- | --- |
| Vision | ○ | ○ | ○ |
| Proprioception | ○ | ○ | ○ |
| Tactile / Force | △ | ○ | ○ |
| Language | × | × | ○ |
| Policy Learning | Diffusion Policy | 主にデータ収集・Segmentation | VLA |
| World Model | × | × | **○** |
| Future Contact Prediction | × | × | **○** |
| Failure-Aware Action | × | × | **○** |

つまり自分の研究では、UMI/TacUMIのような「良いDemonstration Dataを集める」という考えを土台にしながら、

**Vision + Tactileの将来状態を予測するLatent World ModelをVLAのAction Generationへ接続する**

ところを研究したい。

ここが研究として一番面白い部分だと思っている。

## UMIから自分の研究に持ち込みたい考え

UMIを読んでいて、自分の研究にも取り入れたいと思ったのは、モデルそのものよりもむしろInterface Designの思想だった。

ロボット学習では、

```
良いモデル
```

だけでは足りない。

```
良いデータ
   +
良いObservation
   +
良いAction Representation
   +
正しいTime Synchronization
   +
良いPolicy / World Model
```

まで含めて設計しなければならない。

自分の場合もSO-101とVision-Based Tactile Sensorを使ってデータを取得するなら、

```
RGB
Tactile Image
Joint State
Gripper Position
Motor Current
Action
Timestamp
```

を単にrosbagへ保存するだけでなく、

**「全部のセンサーが同じ物理現象を同じ時刻として見ているか」**

まで考える必要がある。

特にSlipやContactは数百ms単位で状態が変化する可能性があるので、UMIのLatency Matchingの考え方は、自分のVision-Tactile World Modelでもかなり重要になると思う。

## 最後に

UMIを読んで一番印象に残ったのは、

**ロボット学習における「データ収集装置」も研究対象なのだ**

ということだった。

VLAやWorld Modelを研究していると、Transformer、Diffusion、Flow Matching、JEPAなどモデル側に目が向きやすい。

しかし、そのモデルが学習する世界は結局Sensorから入ってきたデータで作られる。

UMIは、

**「どういう身体で世界を観測すれば、人間の経験をロボットへ移せるのか」**

という問いに対する一つの答えだと思う。

そして自分の研究では、その問いをもう一歩進めて、

**「視覚だけではなく触覚まで含めて世界を表現し、その世界が少し先にどう変化するかを予測できれば、ロボットは失敗する前に行動を変えられるのではないか」**

という問いを考えてみたい。

UMI → TacUMI → Vision-Tactile World Model → Failure-Aware VLA。

自分の研究をこの流れの中に置いてみると、研究したいことが以前よりかなり明確に見えてきた。
