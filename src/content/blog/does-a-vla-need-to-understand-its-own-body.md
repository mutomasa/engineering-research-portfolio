---
title: 'Does a VLA Need to Understand Its Own Body? Thinking Through Embodiment via Whole-Body VLA, Tactile Sensing, and World Models'
description: "An exploratory essay asking whether Vision-Language-Action (VLA) models actually understand a robot's own body, distinguishing whole-body control from embodiment, and proposing an 'Embodied Latent State' and 'Body Model' as a research framing."
pubDate: 2026-08-14
tags: ['vla', 'embodiment', 'world-models', 'physical-ai', 'tactile-sensing']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/14/130000'
originalTitle: 'VLAは「自分の身体」を理解する必要があるのか？'
sourceLanguage: 'ja'
---

*Note: this post is a speculative, exploratory essay — a research framing the author is working through, not a report of experimental results. Concepts such as "Embodied Latent State" and "Body Model" below are proposed framings for further investigation, not established findings.*

I've been looking into Vision-Language-Action (VLA) models recently, and there's one thing that's been bothering me.

Does a VLA really understand the robot's own "body"?

VLA is usually explained with the structure:

Vision + Language → Action

For example, you give the instruction:

> "Pick up the red cup."

The camera recognizes the red cup, and the VLA generates the robot's action.

RT-2 was one of the pieces of research that pushed this direction forward significantly, by transferring web-scale vision-language knowledge to robot control.

But once you actually think about moving a real robot, something a little strange stands out.

What matters for a robot isn't only

"what it can see."

Things like

"where is my arm right now,"

"how far is the gripper closed,"

"am I in contact with the object,"

"how much load is on the motors,"

"is the object I'm holding starting to slip"

— its own body state — should matter too.

So in this post I want to think through:

What is embodiment for a VLA, really?

And:

Can you say a model has acquired embodiment just by making it a whole-body VLA?

## 1. Vision Alone Doesn't Tell You the Robot's State

First, consider a heavily simplified VLA:

$$a_t = \pi(I_t, l)$$

where

- $I_t$: camera image
- $l$: language instruction
- $a_t$: action

Suppose the camera shows what looks like "the robot's gripper is holding the cup."

But whether it's actually gripping correctly or not can't be determined from the image alone.

In reality, several different physical states are possible:

- gripping stably
- slipping slightly
- gripping too hard
- fingertips have only just touched the object
- contact on only one side

Yet on an RGB image, these can look very similar.

In other words:

$$\text{Observation} \neq \text{Physical State}$$

This is where there's room to think about "embodiment."

## 2. Humans Have Proprioception

Humans can tell roughly where their arm is even with their eyes closed. This is called **proprioception**.

Robots have an equivalent kind of information too. For example, we could define body state as:

$$s_t = [q_t, \dot{q}_t, I_t^{motor}, g_t, F_t, T_t]$$

where

- $q_t$: joint position
- $\dot{q}_t$: joint velocity
- $I_t^{motor}$: motor current
- $g_t$: gripper state
- $F_t$: force
- $T_t$: torque

In fact, current VLAs don't necessarily take only vision and language as input.

What matters here is that the framing is expanding from

Vision + Language

to

Vision + Language + Body State

## 3. So Is Whole-Body VLA the Answer?

This is where **whole-body VLA** comes in.

Ordinary manipulation-focused VLAs tend to deal with a relatively limited action space — things like:

- arm
- gripper

Humanoids, on the other hand, need to handle several parts simultaneously:

- head
- torso
- waist
- left arm
- right arm
- hands
- legs
- mobile base

Simplifying the action:

$$a_t = [a_t^{head}, a_t^{arm}, a_t^{hand}, a_t^{torso}, a_t^{leg}]$$

gives a high-dimensional action space.

Whole-body VLA is clearly an important direction. But one question remains:

Is controlling the entire body really the same thing as understanding the body?

## 4. Whole-Body Control and Embodiment Are Somewhat Different

I think it's worth separating these two.

What whole-body VLA mainly deals with is the question of:

> How much of the body should be controlled as action?

Whereas what's interesting about embodiment is the question of:

> What does the robot observe about its own body, what internal representation does it hold, and what can it predict?

For example, structuring things as:

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

doesn't necessarily mean the model understands

"I'm currently gripping the cup too hard"

or

"if I lift it like this, it looks like it's going to slip."

That's because the action-space problem and the body-state-representation problem are separate issues. I think this is an important distinction when thinking about embodiment.

## 5. Building a "Latent State That Includes the Body"

So let's reconsider the observation as:

$$o_t = \{I_t^{RGB}, q_t, \dot{q}_t, I_t^{motor}, T_t^{tactile}\}$$

That is, bundling together:

- RGB
- joint position
- joint velocity
- motor current
- tactile

as the current observation. Then, via a multimodal encoder, we form a latent representation:

$$z_t = E(o_t)$$

Let's tentatively call this $z_t$ an **Embodied Latent State**.

What matters is that it isn't just

$$z_t = \text{Vision Feature}$$

but rather should be thought of as

$$z_t = \text{World} + \text{Robot Body} + \text{Interaction}$$

In other words: the state of the world, the robot's own body state, and the interaction between body and world, all represented together in a single latent representation. I think this is an important point when thinking about embodiment.

## 6. Adding a World Model on Top

This is where it gets even more interesting.

From the current state $z_t$ and action $a_t$, we predict:

$$\hat{z}_{t+1} = f_\theta(z_t, a_t)$$

That is, we have the model predict:

> "If I execute this action, what will happen next to my body and the environment?"

Structurally, this might look like:

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

If we think of an ordinary VLA as

see → act,

this model becomes

see → recognize body state → predict the result of moving → act.

This is the point of incorporating a World Model into a VLA.

## 7. Why Tactile Sensing Matters

Take a peg-in-hole task as an example.

If it were purely vision-centric:

```
recognize hole
      |
      v
move peg
      |
      v
insert
```

But in the real world, it's not that simple:

```
recognize hole
      |
      v
move peg
      |
      v
contact
      |
      v
observe force / tactile
      |
      v
slightly misaligned
      |
      v
correct pose
      |
      v
contact again
      |
      v
insert
```

This becomes a closed-loop interaction. Here, action isn't simply a coordinate output — the interaction between body and world itself becomes a new observation.

"It felt hard when I touched it."

"I pushed, but it didn't move."

"I grabbed it, but it slipped."

This kind of information is hard to fully obtain from vision alone.

## 8. Are More Sensors Always Better?

This raises another question. Should we just include everything —

- RGB
- depth
- LiDAR
- IMU
- force
- torque
- tactile
- joint state
- motor current

I think, as a research question, it's actually the opposite that's interesting:

Which body information is actually necessary?

For example, an ablation study like this could be considered:

| Model | Vision | Joint | Motor Current | Tactile |
|---|---|---|---|---|
| A | ✓ | | | |
| B | ✓ | ✓ | | |
| C | ✓ | ✓ | ✓ | |
| D | ✓ | ✓ | ✓ | ✓ |

and then comparing:

- grasp success rate
- slip detection
- failure prediction
- generalization
- recovery success rate

This lets you get beyond just "adding more sensors improved performance," toward the question of *which* body information is needed to understand *which* physical phenomenon.

## 9. Where's the Novelty?

This part matters a lot as a research question.

Research already exists on:

- vision + proprioception
- robot learning that uses tactile sensing
- whole-body VLA
- world models

So "I added tactile sensing to a VLA" is, by itself, a weak claim to novelty. So let's reframe the question itself:

### What bodily information does a VLA actually need?

In other words: how much does a VLA need to know about "itself" in order to act in the physical world?

For example, adding body information step by step:

```
Vision
  ↓
Vision + Proprioception
  ↓
Vision + Proprioception + Motor Current
  ↓
Vision + Proprioception + Motor Current + Tactile
```

and evaluating, at each stage of the latent state, how far into the future contact, slip, and grasp failure can be predicted.

I think there may be a research angle here around **Minimal Sufficient Embodiment** — that is:

> What is the minimal body information a VLA needs in order to act stably in the physical world?

## 10. What This Could Help Solve

This framing could potentially help with a few problems.

**Visually ambiguous contact states.** Even when RGB shows what looks like the same "gripping" state, it could actually be stable, slipping, a weak grasp, or excessive force. Proprioception, motor current, and tactile sensing might make it possible to distinguish between these.

**Failure prediction.** Rather than detecting failure after it happens, predict

$$P(\text{Failure}_{t+k} \mid z_t, a_t)$$

— that is, predict the future of "if I keep lifting this, it looks like it's going to fall."

**Failure recovery.** Beyond prediction, connect it to action:

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

This would be a shift from "a robot that detects failure" to "a robot that predicts failure and corrects its own action."

## 11. Related Work

A few pieces of research are especially relevant here:

**RT-2** — *Vision-Language-Action Models Transfer Web Knowledge to Robotic Control*. A representative VLA study connecting VLM knowledge to action generation. [arxiv.org/abs/2307.15818](https://arxiv.org/abs/2307.15818)

**LLaVA-VLA** — *A Simple Yet Powerful Vision-Language-Action Model*. A VLA that generates action from vision, language, and proprioception. [github.com/OpenHelix-Team/LLaVA-VLA](https://github.com/OpenHelix-Team/LLaVA-VLA)

**Tactile-VLA** — *Unlocking Vision-Language-Action Model's Physical Knowledge for Tactile Generalization*. Very close to the theme discussed here, in the sense of integrating tactile information into a VLA. [arxiv.org/abs/2507.09160](https://arxiv.org/abs/2507.09160)

**LeVERB** — *Humanoid Whole-Body Control with Latent Vision-Language Instruction*. Connects vision-language with whole-body humanoid control. [arxiv.org/abs/2506.13751](https://arxiv.org/abs/2506.13751)

**WOLF-VLA** — *Whole-Body Humanoid Optimal Locomotion Framework for Vision-Language-Action Learning*. Deals with whole-body locomotion and VLA. [arxiv.org/abs/2606.25591](https://arxiv.org/abs/2606.25591)

**VLA Survey** — useful for getting an overview of the VLA landscape. [vla-survey.github.io](https://vla-survey.github.io/)

*(Editorial note: the arXiv IDs above are as given in the original Japanese post and have not been independently re-verified during translation.)*

## 12. Beyond Whole-Body VLA

Having worked through all this, I think I've managed to organize my thinking a bit.

When thinking about a robot's embodiment, whole-body VLA isn't necessarily the final answer. What whole-body VLA mainly addresses is the action-side question of how much of the body to control.

Embodiment, on the other hand, involves at least several distinct problems:

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

- **Observation** — how much of its own body does it observe?
- **Representation** — how is the relationship between body and environment represented internally?
- **Prediction** — how will the body and environment change if it moves?
- **Action** — which parts of the body move, and how?

I think it's better to consider these four separately. Among them, I find **Representation + Prediction** especially interesting.

## 13. What Does It Mean to Be "an AI with a Body"?

LLMs have no body. VLMs, essentially, still just observe the world.

With VLA, a loop emerged:

```
Perception
    |
    v
Action
```

But can that alone be called "an AI with a body"? I don't think it's quite enough yet.

If it truly had a body, I think it would need a loop like:

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
    +-------> back to the next Perception
```

The part that matters most, in particular, is:

```
Action
   |
   v
Physical Interaction
   |
   v
Sensation
```

Touched the object. It was heavy. It slipped. Pushed it, but it didn't move. Gripped too hard.

And then, changing the next action based on that result. Only once you get here, I think, can you really say you're "embodied and interacting with the environment."

## 14. Discussion: Maybe What's Needed Isn't Just a World Model, but a Body Model

Current VLA research is progressing along several fronts at once — large-scale robot datasets, action chunking, diffusion, flow matching, cross-embodiment, whole-body control, and more.

Among these, I think one thing that's going to matter next is a **Body Model**.

If a World Model is something that models

> "how does the world change?",

then a Body Model, by contrast, would model

> "how does my own body change within that world?"

But actually, separating World and Body may itself be unnatural. If a robot pushes an object, the object moves — and at the same time, a reaction force returns to the robot's joints. If a robot grips an object, the object's state changes — and at the same time, the gripper's motor current and tactile readings change too.

In other words, what should really be predicted isn't just the world:

$$(\text{World}_{t+1}, \text{Body}_{t+1}) = f(\text{World}_t, \text{Body}_t, \text{Action}_t)$$

Thought about this way, rather than "World Model + Body Model," it might be more natural to call it an **Embodied World Model**.

Vision, proprioception, motor current, force, and tactile sensing then stop being mere "sensor inputs" — they become the observations a robot uses to estimate the relationship between itself and the world.

## 15. Closing

In the end, the question I find most interesting is very simple:

> How much embodiment does a VLA need?

How much does a VLA need to know about its own body? Is vision alone enough? Is joint state necessary? Is motor current necessary? Is tactile sensing decisive? Is full whole-body state necessary?

And, by forming a body representation from all this and projecting it into the future with a world model — can a robot move from "reacting after it fails" to "changing its action before it fails"?

I don't think this is simply a question of improving VLA performance. Behind it is a more fundamental question for embodied AI:

> What does it actually mean for an AI to have a body?

Personally, more than whole-body VLA itself, what I'm curious about right now is the question that comes before it:

"How does a robot represent its own body?"

---

*This is an English translation of the original Japanese post: [VLAは「自分の身体」を理解する必要があるのか？](https://mutomasa.hatenablog.com/entry/2026/08/14/130000)*
