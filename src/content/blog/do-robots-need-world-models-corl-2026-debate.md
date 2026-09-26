---
title: 'Do Robots Really Need World Models? CoRL 2026 Takes On World Models vs. End-to-End VLA Head-On'
description: 'Notes on the CoRL 2026 workshop "Do Robots Need World Models?", the debate between explicit world models and end-to-end VLA policies, and why the more useful question may be where a world model should live in a robot system.'
pubDate: 2026-09-25
tags: ['robotics', 'vla', 'world-models', 'tactile-sensing', 'physical-ai']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/25/210126'
originalTitle: 'ロボットに「世界モデル」は本当に必要なのか？──CoRL 2026で真正面から議論されるWorld Model vs End-to-End VLA'
sourceLanguage: 'ja'
---

> This is an English translation of the original Japanese article on the author's Hatena blog: [ロボットに「世界モデル」は本当に必要なのか？──CoRL 2026で真正面から議論されるWorld Model vs End-to-End VLA](https://mutomasa.hatenablog.com/entry/2026/09/25/210126).

At CoRL 2026 (Conference on Robot Learning), to be held in Austin, Texas, in November 2026, there will be a rather interesting workshop.

Its title is:

**Do Robots Need World Models?**
**A Debate on Dynamics Learning, Planning, and End-to-End Robot Learning**

In other words, it is an event that tackles head-on the question:

> "Do robots really need world models?"

The official site is here:

[https://do-robots-need-world-models.github.io/](https://do-robots-need-world-models.github.io/)

What I personally find interesting is that it does not simply discuss "how to build a world model," but takes the discussion all the way back to:

> Do we need to build an explicit world model in the first place?

## The world-model camp vs. the end-to-end camp

The basic idea of a world model is to give the robot a model that predicts how the world will change as a result of its actions, before it acts:

```text
Current state
    ↓
Action
    ↓
Predict how the world will change
    ↓
Choose the action that leads to the desired future
```

Video generation models, latent world models, dynamics models, learned simulators, and World Action Models all fall into this line of work in a broad sense.

Recent VLA (Vision-Language-Action) models, on the other hand, are moving in an end-to-end direction:

```text
Vision + Language
        ↓
       VLA
        ↓
      Action
```

Here, the underlying idea is:

> Even without building a separate world model, perhaps the structure of the physical world and the ability to predict it can be learned in the policy's internal latent representations.

This is exactly one of the major points of contention at this workshop.

## Physical Intelligence on the "Against World Models" side

Particularly interesting is that Chelsea Finn, co-founder of Physical Intelligence, is among the speakers.

On the official site, she is listed as a speaker on the side of:

> Against world models / implicit / end-to-end

Given the direction Physical Intelligence has taken, this is very interesting.

Physical Intelligence develops generalist VLAs such as π0 and π0.5, pursuing the approach of learning policies that adapt to a wide range of robots, tasks, and environments from large amounts of diverse robot data.

Rather than an architecture like:

```text
Build a separate world model
        ↓
Predict the future
        ↓
Planner
        ↓
Action
```

the idea is closer to:

```text
Large-scale robot experience
        ↓
Generalist VLA
        ↓
Acquires physical knowledge internally
        ↓
Action
```

That is:

> Even without explicitly providing a separate model for predicting the world, perhaps the necessary understanding of the world can be acquired inside a large-scale policy.

However, some caution is needed here.

This event is a "debate."

So it would be a bit too strong to conclude that "Chelsea Finn or Physical Intelligence completely rejects world models themselves."

More accurately, I think it is best seen as raising the question:

> Is it necessary to have an explicit world model as a module separate from the policy?

## The points of debate are quite interesting

Looking at the official site, the discussion is divided into several motions.

Among them, the following questions seem particularly important:

| Topic | Question |
| --- | --- |
| End-to-End | Is it sufficient to give the policy an internal predictive capability? |
| Generalization | Do explicit world models help with generalization to unseen goals? |
| Scaling | Do general-purpose policies scale more easily than general-purpose world models? |
| Safety | Are world models necessary for safety and policy evaluation? |
| Architecture | Is the real question not whether a world model is needed, but *where to put it*? |
| Benchmark | Do current benchmarks correctly measure the value of world models? |

I think the point that is especially important is this one:

> The question is not whether to use a world model, but where to put it.

## A world model does not have to sit in front of the policy

When we hear "world model," we tend to picture classical model-based control like this:

```text
Robot
  ↓
World Model
  ↓
Planner
  ↓
Action
```

But a world model does not necessarily have to be placed in that position.

For example, it can be used in many different ways:

```text
Training Data Generator
Simulation
Policy Evaluation
Failure Prediction
Safety Monitor
Representation Learning
Planning
```

In other words, rather than a binary choice of

> World Model vs. VLA

it seems to have become a design problem of

> Where in the robot system should the world model be placed?

## Relation to my Vision-Tactile JEPA research

This debate is also closely related to the research theme I am working on:

**Vision-Tactile JEPA World Models for Failure-Aware Long-Horizon Robotic Manipulation**

What I expect from a world model in my research is not generating realistic future images per se.

For example:

```text
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

What matters is:

> Predicting, in latent space, states that will lead to future failure.

That is, rather than using the world model as a policy that generates actions itself, I use it as:

> A failure predictor that predicts the consequences of actions.

For example, an architecture like:

```text
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

In this case, the VLA and the world model do not compete.

Rather, the roles can be divided as follows:

- **VLA**: generates actions
- **World model**: predicts the outcomes of actions
- **Failure model**: evaluates failure risk
- **Planner**: replans when necessary

## World models may show their value in long-horizon manipulation

For short tasks, an end-to-end policy of

```text
Observation → Action
```

may well be sufficient.

In long-horizon manipulation, however, problems like this occur:

```text
Action 1
 ↓
Action 2
 ↓
Action 3
 ↓
Small errors
 ↓
The state drifts
 ↓
Failure at Action 8
```

If we can predict

```text
Current state
  ↓
Candidate action
  ↓
Future latent state
  ↓
Failure risk
```

then it may be possible to

> execute recovery or replanning before the failure occurs.

In particular, for things like:

- Slip
- Contact state
- Grasp state
- Object pose drift
- Gripper failures

tactile sensing, not just vision, may be effective.

This is also a point I want to verify with my Vision-Tactile JEPA world model.

## It may stop being "World Model vs. VLA"

In future Physical AI, rather than a simple competition of

```text
World Model
vs
VLA
```

systems may evolve toward an architecture like this:

```text
            Foundation VLA
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      Action    Memory   World Model
                           │
                     Failure / Safety
```

End-to-end VLAs have the great appeal that their capabilities can be improved by scaling data and model size.

On the other hand, when considering:

- Long-horizon tasks
- Unknown environments
- Failure recovery
- Safety
- Contact-rich manipulation

there is also value in a world model that can be explicitly queried with:

> "What will happen next if I execute this action?"

## Summary

What makes this CoRL 2026 event interesting is that it squarely debates

> not "how to build a world model," but "whether a world model is needed at all."

The end-to-end VLA direction, as pursued by Physical Intelligence, and the predictive-model direction, such as JEPA and World Action Models, may at first glance seem to be in opposition.

Ultimately, however, the roles may be divided like this:

```text
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

In that sense, the truly important question may not be the yes/no question

> Do Robots Need World Models?

but rather

> Where should the World Model live?

In my own research, too, I believe one important direction is to position the world model not as a giant generator of future images, but as

> a model that predicts future latent states and failures from vision and touch, and assists the VLA's actions.

Where will Physical Intelligence's end-to-end VLAs and JEPA-style world models intersect?

This debate at CoRL 2026 is an event I want to watch closely as I follow Physical AI and VLA research.

## References

- Do Robots Need World Models?
  [https://do-robots-need-world-models.github.io/](https://do-robots-need-world-models.github.io/)
- Physical Intelligence
  [https://www.pi.website/](https://www.pi.website/)

---

*Original Japanese article: [ロボットに「世界モデル」は本当に必要なのか？──CoRL 2026で真正面から議論されるWorld Model vs End-to-End VLA](https://mutomasa.hatenablog.com/entry/2026/09/25/210126)*
