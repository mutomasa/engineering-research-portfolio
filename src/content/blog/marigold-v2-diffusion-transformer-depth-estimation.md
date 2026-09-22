---
title: 'Looking into Marigold V2: Depth Estimation with a Diffusion Transformer'
description: 'Notes on Marigold V2, a monocular depth estimation model from HUAWEI Bayer Lab, EPFL, and the University of Bologna that repurposes an image-generation Diffusion Transformer for single-step dense prediction, and what it suggests about reusing generative foundation models to understand the world.'
pubDate: 2026-09-14
tags: ['computer-vision', 'diffusion-models', 'depth-estimation', 'foundation-models']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/14/094007'
originalTitle: 'Diffusion TransformerでDepth推定するMarigold V2を調べた'
sourceLanguage: 'ja'
---

> This is an English translation of the original Japanese article on the author's Hatena blog: [Diffusion TransformerでDepth推定するMarigold V2を調べた](https://mutomasa.hatenablog.com/entry/2026/09/14/094007).

Something I found interesting recently is **Marigold V2**.

[Marigold V2: Revisiting Diffusion Transformers for Monocular Depth Estimation — a Hugging Face Space by huawei-bayerlab](https://huggingface.co/spaces/huawei-bayerlab/marigold-v2-web)

This is a computer vision model that estimates high-resolution depth from a single RGB image. It comes from research by HUAWEI Bayer Lab, EPFL, and the University of Bologna, and has been accepted at SIGGRAPH Asia 2026 / ACM Transactions on Graphics.

What I find especially interesting about Marigold V2 is that, rather than simply building a model dedicated to depth estimation, it **repurposes an image-generation Diffusion Transformer (DiT) for dense prediction**.

It's built on Qwen-Image-Edit-2509 as a base, fine-tuned with 4-bit quantization and LoRA. Depth estimation can also now be run **in a single step**, without needing to repeat denoising many times the way a typical diffusion model does.

This gives the impression that the work is aimed not just at research, but quite deliberately at practical use as well.

Another interesting point is how it represents fine boundaries.

In depth estimation, thin structures such as hair, fur, foliage, fences, and wires tend to come out blurry, but Marigold V2 is able to reconstruct the boundaries of such objects quite sharply.

On KITTI and ETH3D, it is reported to improve AbsRel by 16–26% compared to previous best methods.

It's also interesting that training uses only synthetic data, and the model is applied zero-shot to real photographs.

Personally, I found the direction of

**"reusing the understanding of the world held by an image-generation model for depth estimation and 3D understanding"**

very compelling.

When people talk about generative AI, attention tends to go toward "creating" images and video. But going forward, I think we'll see more of a trend toward using these kinds of foundation models as **models for understanding the world** — for depth estimation, surface normals, 3D perception, and robot vision.
