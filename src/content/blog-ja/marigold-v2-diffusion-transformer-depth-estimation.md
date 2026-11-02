---
title: 'Diffusion TransformerでDepth推定するMarigold V2を調べた'
description: '最近見ていて面白かったのが、Marigold V2 です。 huggingface.co これは、1枚のRGB画像から高精細なDepth（奥行き）を推定するComputer Visionモデルです。HUAWEI Bayer Lab、EPFL…'
pubDate: 2026-09-14
tags: ['computer-vision', 'diffusion-models', 'depth-estimation', 'foundation-models']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/14/094007'
---
最近見ていて面白かったのが、**Marigold V2** です。

[Marigold V2: Revisiting Diffusion Transformers for Monocular Depth Estimation - a Hugging Face Space by huawei-bayerlab](https://huggingface.co/spaces/huawei-bayerlab/marigold-v2-web)

これは、1枚のRGB画像から高精細なDepth（奥行き）を推定するComputer Visionモデルです。HUAWEI Bayer Lab、EPFL、University of Bolognaによる研究で、SIGGRAPH Asia 2026 / ACM Transactions on Graphicsに採択されています。

Marigold V2で特に面白いのは、単純にDepth推定専用のモデルを作っているわけではなく、**画像生成向けのDiffusion Transformer（DiT）をDense Predictionに転用している**ところです。

ベースにはQwen-Image-Edit-2509を使い、4bit量子化とLoRAでファインチューニングしています。さらにDepth推定は**1ステップで実行**できるようになっていて、一般的なDiffusionモデルのように何度もdenoisingを繰り返す必要がありません。

このあたりは、研究だけでなく実利用もかなり意識されている印象です。

もう一つ興味深いのが、細かい境界の表現です。

Depth推定では、髪の毛や毛皮、木の葉、柵、ワイヤーのような細い構造はどうしてもぼやけやすいのですが、Marigold V2では、こうした物体の境界をかなりシャープに復元できます。

KITTIやETH3Dでは、従来のベスト手法と比較してAbsRelを16〜26%改善したと報告されています。

また、学習にはSynthetic Dataのみを使い、実写画像に対してZero-shotで適用している点も面白いです。

個人的には、

**「画像生成モデルが持っている世界の理解を、Depth推定や3D理解に再利用する」**

という方向性がとても興味深いと感じました。

生成AIというと画像や動画を「作る」用途に目が行きがちですが、今後はこうしたFoundation Modelを、Depth推定、Surface Normal、3D認識、ロボット視覚などの**世界を理解するためのモデルとして使う流れ**がさらに増えていきそうです。
