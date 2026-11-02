---
title: 'VLA-JEPAが出た'
description: '大学院でロボット基盤モデルやフィジカルAIみたいなことを研究している。 VLA(Vision Language Action)はまだまだ課題(物理法則の理解が苦手、長期タスクも辛いなど）があるし、 ある機関によると、VLAの導入成功率はかな…'
pubDate: 2026-08-05
tags: ['vla', 'world-models', 'jepa', 'physical-ai']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/05/051509'
---
大学院でロボット基盤モデルやフィジカルAIみたいなことを研究している。

VLA(Vision Language Action)はまだまだ課題(物理法則の理解が苦手、長期タスクも辛いなど）があるし、

ある機関によると、VLAの導入成功率はかなり低いらいしい。これは自分の肌感とも一致するという。もちろんPoCなどで導入している例はあると思うが、本格導入しているケースの数字を言っているんだろう。

さて、VLAの弱点を克服するために、VLA-JEPAがでた。JEPAについて以下の記事を参照する。

[Introducing V-JEPA 2](https://ai.meta.com/research/vjepa/)

ただ、VLA-JEPAはJEPA2と以下の違いがあるようだ。VLA-JEPAはVLAの事前学習（Pretraining）にJEPAの考え方を取り入れた新しいVLAという位置付けだと思う。

|  | V-JEPA2 | VLA-JEPA |
| --- | --- | --- |
| 目的 | 世界モデル | VLA事前学習 |
| 入力 | 動画 | 動画＋ロボットデータ |
| 出力 | 未来latent | Action Policy |
| Planner | あり | なし |
| Policy | なし | あり |
| 用途 | Planning | Manipulation |

今、ここを読んでひとまずコードを確認して、自分のGPUサーバで動かそうと思っている。

[VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model](https://sophon.at/papers/vla-jepa-enhancing-vision-language-action-model-with-latent-world-model)
