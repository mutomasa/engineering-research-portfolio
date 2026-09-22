---
title: 'Rethinking Next-Generation VLA from MolmoAct 2: Combining Tactile Sensing and World Models'
description: "A comparison between Allen Institute for AI's MolmoAct 2 robot foundation model and the author's master's research on a Vision-Tactile JEPA World Model for long-horizon VLA, exploring how tactile sensing and future-state prediction could help robots recover from failure."
pubDate: 2026-09-20
tags: ['robotics', 'vla', 'world-models', 'tactile-sensing', 'physical-ai']
draft: true
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/20/125823'
originalTitle: 'MolmoAct 2から考える、触覚とWorld Modelを組み合わせた次世代VLA'
sourceLanguage: 'ja'
---

> This is an English translation of the original Japanese article on the author's Hatena blog: [MolmoAct 2から考える、触覚とWorld Modelを組み合わせた次世代VLA](https://mutomasa.hatenablog.com/entry/2026/09/20/125823).

In May 2026, the Allen Institute for AI (Ai2) released MolmoAct 2, a robot foundation model. On May 28, it was also integrated into Hugging Face's LeRobot, which should further accelerate open robotics research.

Here I compare it with the "Vision-Tactile JEPA World Model for Long-Horizon VLA" that I am working on for my master's research, and think through where my own research direction should go next.

## What is MolmoAct 2?

MolmoAct 2 is an Action Reasoning Model (ARM) that understands its environment from images and language and generates robot actions.

Built on the vision-language model Molmo 2-ER, an Action Expert using Flow Matching generates the robot's motions.

Its distinguishing feature is that it can reason about 3D space while deciding on actions. In addition, inference speed has improved up to 37x over previous models, and it supports several robots, including the SO-101.

## Differences from my research

The main difference between the two comes down to this:

**Understanding space and acting on it, versus predicting future states and responding to failure.**

| Aspect | MolmoAct 2 | My research |
| --- | --- | --- |
| Primary inputs | Vision, language, robot state | Vision, touch, language, robot state |
| Understanding the world | 3D spatial reasoning | Predicting future latent states via JEPA |
| Action generation | Flow Matching | Coupling a VLA with a World Model |
| Research focus | Adapting to a wide variety of tasks | Failure prediction, recovery, and long-horizon tasks |

MolmoAct 2 does have some capability for handling long-horizon tasks. However, according to the official write-up, because it generates and executes actions in batches of 10–30 steps, it is noted as a limitation that the model cannot immediately respond to unexpected changes that occur mid-execution.

In my research, I want to combine tactile sensing with a JEPA-based World Model to address exactly this point.

For example, when grasping an object, vision alone sometimes cannot accurately capture whether the object is slipping or how it is being contacted. If we can observe contact state through touch and use a World Model to predict future states, it may become possible to correct grip force or motion before the object is dropped.

## Looking ahead

What I find particularly notable is that MolmoAct 2 has been integrated into LeRobot and supports the SO-101. Since I use the SO-101 in my own research, there may be an opportunity to run comparative experiments with it.

Going forward, I would like to use MolmoAct 2 as a baseline and verify the following three points:

1. Does adding tactile sensing improve the success rate of manipulation tasks that involve grasping or contact?
2. Can a JEPA World Model detect early signs of failure?
3. Can replanning after a failure improve the completion rate of long-horizon tasks?

From a "VLA that can act" to a "VLA that can predict failure and recover from it."

As open foundation models like MolmoAct 2 continue to develop, it is becoming easier to build research on top of them — adding capabilities such as tactile sensing and future prediction — rather than developing models entirely from scratch.

In my own master's research, I want to move beyond evaluating simple task success rates, and also evaluate the ability to recover from failure, working toward robots that can operate autonomously over the long term.

**References:**

- [MolmoAct 2 official announcement](https://allenai.org/blog/molmoact2)
- [GitHub](https://github.com/allenai/molmoact2)
