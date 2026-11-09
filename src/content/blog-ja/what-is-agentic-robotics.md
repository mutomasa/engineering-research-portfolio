---
title: 'Agentic Roboticsとは何か？ ロボットが自ら考え、失敗から回復する時代へ'
description: '最近、Physical AIやVLA（Vision-Language-Action）の研究が急速に進んでいます。その中で注目しているのが、Agentic Robotics（エージェント型ロボティクス）です。従来のロボットは、決められた動作を正確に実行することが中心でした。…'
pubDate: 2026-11-03
tags: ['robotics', 'physical-ai']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/11/03/202554'
---
### はじめに

最近、Physical AIやVLA（Vision-Language-Action）の研究が急速に進んでいます。

その中で注目しているのが、\*\*Agentic Robotics（エージェント型ロボティクス）\*\*です。

従来のロボットは、決められた動作を正確に実行することが中心でした。VLAの登場によって、画像と言語から動作を生成できるようになりました。

Agentic Roboticsは、その先にある考え方です。

**ロボット自身が目標を理解し、計画を立て、行動し、結果を確認して、必要なら計画を修正する。**

生成AIのAI Agentで進んできた技術が、現実の物理世界へ広がり始めています。

### Agentic Roboticsの簡単な歴史

Agentic Roboticsという呼び方は比較的新しいものですが、その基礎は従来のAIやロボットの自律計画・制御研究にあります。

近年の流れを振り返ると、いくつかの転換点があります。

-   **2022年：SayCan（Google）**  
    LLMを使って自然言語の指示から行動を計画。ロボットが実行可能なスキルと組み合わせることで、言語と実世界の行動を結びつけました。
    
-   **2023年：RT-2（Google DeepMind）**  
    Vision-Language-Action（VLA）が登場。画像と言語の理解をロボットの動作生成に直接結びつけ、未知の物体や指示への汎化を進めました。
    
-   **2024〜2025年：汎用VLAの発展**  
    OpenVLA、π0、Gemini Roboticsなどが登場。ロボットの動作を大規模データから学習する研究が加速しました。
    
-   **2025年：Gemini Robotics 1.5**  
    高レベルの推論モデルが計画を担当し、VLAが動作を実行する構成が明確になりました。ツール呼び出しや複数ステップのタスクにも対応しています。
    
-   **2026年：Gemini Robotics 2 / ER 2**  
    長時間のタスク実行、進捗確認、失敗からの自己修正、複数ロボットの協調へと発展しています。
    

この流れを単純化すると、

**Robot Control → Robot Learning → VLA → Agentic Robotics**

となります。

ただし、Agentic Roboticsは単にVLAを高性能化することではありません。計画、記憶、世界の予測、実行の検証などを組み合わせるシステム全体の進化だと考えています。

## 2026年の研究動向

2026年10月には、[Towards Agentic Robots: Model, Data, Environment, and Harness](https://arxiv.org/abs/2610.20442)というサーベイ論文が公開されました。

この論文では、Agentic Robotsの研究を次の4つの領域で整理しています。

-   **Model**：VLAや世界モデルを含むロボットの知能
    
-   **Data**：データ収集、生成、改善の自動化
    
-   **Environment**：学習や評価に使う環境・タスクの構築
    
-   **Harness**：モデル、ツール、記憶、実行、検証をつなぐ仕組み
    

特に面白いのがHarnessという考え方です。

2026年の[Harness VLA](https://arxiv.org/abs/2607.08448)では、学習済みVLAを動作スキルとして利用しながら、記憶、失敗モデル、実行検証を組み合わせています。

VLAを毎回再学習するのではなく、外側のエージェントが実行を制御して信頼性を高めるアプローチです。

これはAI Coding Agentで使われるHarness Engineeringとも共通する発想ですね。

今後の重要なテーマは、次の3つだと思っています。

1.  **Long-Horizon Planning**：複数の作業を長時間にわたって実行する
    
2.  **Failure Detection & Recovery**：失敗を検知し、自律的に回復する
    
3.  **World Models & Memory**：環境の変化を予測し、過去の経験を次の行動に活用する
    

## 自分の研究との関係

現在、JAISTで取り組んでいる研究テーマは、

**Vision-Tactile JEPA World Models for Failure-Aware Long-Horizon Robotic Manipulation**

です。

画像と触覚を組み合わせたJEPAベースの世界モデルを利用して、ロボットの接触状態や失敗を予測し、長時間の操作タスクを安定して実行することを目指しています。

Agentic Roboticsとの関係はかなり深いと感じています。

例えば、ロボットが物体を把持して別の場所へ移動する場面を考えます。

通常のVLAでは、画像や言語から次の動作を生成します。

しかし、把持中に物体が滑り始めたらどうなるでしょうか。

画像だけでは滑りの初期兆候を捉えにくく、物体を落としてしまう可能性があります。

そこで、触覚センサーと世界モデルを利用します。

```
User Goal
    ↓
AI Agent（タスク計画）
    ↓
VLA（動作生成）
    ↓
Robot + Vision / Tactile Sensors
    ↓
JEPA World Model
    ↓
将来の接触状態・失敗リスクを予測
    ↓
成功確認 / 失敗回復 / 再計画
    └──→ AI Agent / VLA
```

JEPAは、将来の観測画像をそのまま生成するのではなく、潜在表現の中で将来状態を予測するアプローチです。

この仕組みで接触や滑りの変化を予測できれば、失敗する前に把持力を調整したり、別の把持方法を選択したりできる可能性があります。

2026年の[ForeTac-VLA](https://arxiv.org/abs/2609.20980)でも、将来の触覚状態を予測してVLAの動作生成に利用する研究が報告されています。

私の研究では、ここからさらに**失敗予測をAgentの再計画や回復行動につなげる**ことに関心があります。

例えば、SmolVLAを動作生成に使い、その上位にタスク計画Agentを配置。Vision-Tactile JEPAが失敗リスクを評価し、必要に応じてAgentがリトライや別スキルへの切り替えを判断する構成です。

まずはSO-ARM-101と触覚センサーを使い、通常のVLA、触覚を加えたVLA、失敗予測と再計画を組み込んだ構成で、タスク成功率や失敗からの回復率を比較してみたいと考えています。

## 今後の展望

これまでのロボット研究では、いかに正確に動かすかが重要な課題でした。

これからは、**失敗を前提として、どう判断し、どう回復し、どうタスクを完遂するか**が、ますます重要になると思っています。

VLAは動作を生成する能力、World Modelは将来を予測する能力、AI Agentは目標達成のために計画を調整する能力を担います。

この3つを組み合わせることで、単なる動作生成モデルから、より自律的なロボットシステムへと発展していきます。

現在のVision-Tactile JEPA研究も、将来的にはAgentic Roboticsの失敗予測・回復を支える基盤技術につなげたいと考えています。

## 参考文献

-   [SayCan: Do As I Can, Not As I Say（2022）](https://research.google/pubs/do-as-i-can-not-as-i-say-grounding-language-in-robotic-affordances/)
    
-   [RT-2: Vision-Language-Action Models（2023）](https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/)
    
-   [Gemini Robotics ER 2（2026）](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/)
    
-   [Harness VLA（2026）](https://arxiv.org/abs/2607.08448)
    
-   [ForeTac-VLA（2026）](https://arxiv.org/abs/2609.20980)
    
-   [Towards Agentic Robots: Model, Data, Environment, and Harness（2026）](https://arxiv.org/abs/2610.20442)
