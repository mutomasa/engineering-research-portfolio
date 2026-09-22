---
title: 'Collecting Robot Learning Data Without Carrying a Robot: Reading the UMI Paper'
description: "Notes on Universal Manipulation Interface (UMI), a hand-held data-collection device that narrows the human-to-robot embodiment gap through hardware design, and how it relates to the author's own Vision-Tactile Latent World Model research for failure-aware VLA."
pubDate: 2026-08-19
tags: ['robotics', 'imitation-learning', 'physical-ai', 'umi']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/19/155220'
originalTitle: 'ロボットを持ち歩かずにロボットの学習データを集める ― Universal Manipulation Interface（UMI）を読む'
sourceLanguage: 'ja'
---

*The original Japanese post includes this disclosure, preserved here: "Please understand that this article was written with the help of AI."*

UMI seems to be a hot topic lately. I finally got around to reading the paper properly, to think through how it relates to my own research.

When you look into robot learning, you keep coming back to the same problem: how do you collect the data? For both VLA (Vision-Language-Action) models and imitation learning more broadly, the model itself obviously matters — but to actually move a real robot, you need to record, at scale, how a human performed a task in a format the robot can learn from. And that turns out to be surprisingly hard.

Universal Manipulation Interface (UMI), which I read this time, takes a genuinely interesting approach to this data-collection problem. UMI was presented at Robotics: Science and Systems (RSS) 2024, under the title *Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots*. As the title suggests, the goal is to collect robot teaching data in real-world environments *without* having to bring a robot into those environments.

## So What's the Actual Problem?

The most obvious way to collect demonstration data for robot imitation learning is to have a human teleoperate the robot directly — using something like a SpaceMouse, a VR controller, a leader-follower robot setup, ALOHA, or GELLO — and record the images, joint states, and end-effector (EE) trajectory during that operation.

Because this collects data directly from the robot itself, the correspondence between training data and the robot at execution time is naturally easy to maintain. But there's a catch: you need the physical robot present wherever you're collecting data. If you wanted to, say, "collect dish-tidying data from 100 different homes," bringing a robot into all 100 homes isn't realistic.

The opposite approach is to collect large amounts of human demonstration video from sources like YouTube. But since a human arm and a robot arm have different physical structures, this creates a large **embodiment gap**:

Human Embodiment → Robot Embodiment

UMI aims to sit between these two approaches.

## UMI's Idea Is Actually Quite Simple

Rather than having a human teleoperate a robot, UMI has the human hold a hand-held device shaped like the robot's own gripper and perform the task directly.

The hardware is centered on a 3D-printed parallel-jaw gripper, with a GoPro mounted roughly where a wrist would be. On top of that, it combines:

- a 155° fisheye camera
- the GoPro's built-in IMU
- a side mirror
- a fiducial marker for capturing gripper width

What I find interesting is that the emphasis isn't on packing in as many sensors as possible — it's on making what the human sees while collecting data and what the robot sees while executing as similar as possible.

On the robot side too, a finger shaped like the GoPro mount is attached in the same positional relationship to the gripper. As a result:

```
When a human holds UMI
        ↓
RGB image as seen from the gripper

When the robot moves
        ↓
RGB image as seen from the gripper
```

end up as fairly similar observations. What UMI is trying to solve isn't simply "cheap data collection" — it's narrowing the *observation* embodiment gap itself through hardware design. I think this is the key point of UMI.

## How Do You Turn GoPro Video Into Actions?

Of course, video footage alone isn't usable for imitation learning. Training a policy requires

```
Observation → Action
```

pairs. UMI uses the GoPro footage together with its built-in IMU, applying Visual-Inertial SLAM (built on ORB-SLAM3) to estimate the gripper's 6-DoF pose, and uses the fiducial marker to obtain gripper width. So when a human performs a task with UMI:

```
GoPro MP4
   │
   ├─ RGB
   ├─ IMU
   │
   ▼
Visual-Inertial SLAM
   │
   ├─ 6-DoF End-Effector Pose
   └─ Gripper Width
```

turns it into the kind of data needed for robot learning. In the official implementation, the processed data is converted into a Zarr dataset and used to train a Diffusion Policy.

## Relative Trajectory Instead of Absolute Action

One thing I personally found especially interesting about UMI is its action representation.

If you train a robot to move to, say,

```
world coordinates (x=0.42, y=0.13, z=0.25)
```

that training ends up depending on that specific world coordinate frame. UMI instead uses a **relative trajectory**, defined relative to the current end-effector pose, as the action. That is, the policy outputs a trajectory like:

```
current EE pose
    │
    ├── 100ms later: this relative pose
    ├── 200ms later: this relative pose
    ├── 300ms later: this relative pose
    └── ...
```

This is subtly different from a simple delta action. With delta actions, you accumulate the difference from the previous action, so error accumulates over time. UMI's relative trajectory instead expresses the future trajectory relative to the same EE pose taken at the start of inference. This reduces dependence on the world coordinate frame and makes transfer to different robots easier.

## The Policy Is Diffusion Policy, Not a VLA

Worth being clear about: UMI itself is not a VLA.

The policy's input is mainly:

```
RGB
Relative EE Pose
Gripper Width
```

and its output is:

```
Relative EE Trajectory
Gripper Width
```

So it's better understood as a framework for learning a visuomotor policy, not a Vision-Language-Action model that takes a language instruction as input. All experiments use Diffusion Policy, with a CLIP-pretrained ViT as the vision encoder. Conceptually:

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

## Latency Matching: Unglamorous but Genuinely Important

Another thing I found interesting was how UMI handles latency.

When collecting demonstration data with a hand-held UMI device, the human's motion and the video are recorded essentially simultaneously. But on a real robot, there are multiple sources of delay:

```
Camera
 ↓
image transfer
 ↓
policy inference
 ↓
command transmission
 ↓
robot controller
 ↓
motor
```

If you ignore this mismatch, especially for fast motions like tossing, the timing between observation and action stops lining up. UMI measures the observation latency for RGB, EE pose, and gripper width separately and aligns their timestamps, and also measures the execution latency of the robot and gripper, sending commands ahead of time as needed.

In fact, in the dynamic tossing task, a policy trained with latency matching achieved an 87.5% success rate, while removing latency matching was reported to cause significant jitter in the motion. It's easy for attention in robot learning to gravitate toward model architecture, but this was a good reminder that aligning the timing of the whole real system — sensor → model → controller → motor — is part of the policy design too.

## UMI's Results

UMI is evaluated on four fairly different tasks:

- cup arrangement
- dynamic tossing
- bimanual cloth folding
- dish washing

What's especially interesting is the in-the-wild cup data. Collecting and training on data gathered across multiple environments around Stanford, the policy achieved roughly a 71.7% success rate overall on evaluations involving unseen environments and unseen cups. By contrast, a policy trained on the same pretrained ViT but only with narrow, lab-only data scored 0% success in unseen environments.

In other words: using a large vision backbone doesn't automatically give you generalization — the diversity of the training data itself matters. On data-collection speed, for the cup arrangement task, UMI achieved 111 demonstrations/hour versus 35 demonstrations/hour for SpaceMouse teleoperation — more than three times faster than conventional teleoperation.

## UMI's Novelty Isn't Just "the Gripper"

My first impression of UMI was roughly "a system where a human holds a robot-style gripper to do the work." But reading the paper, the core idea turns out to be a bit broader than that.

UMI designs the following as a single, unified interface:

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

What I find particularly interesting is the idea of narrowing the human-robot embodiment gap not just at the model level, but through the data-capture device itself, its coordinate frame, and camera placement. I think this will remain an important idea for collecting large-scale VLA training data going forward.

## That Said, UMI Has Almost No "Sense of Touch"

This is where it connects to my own research theme.

UMI's observation is basically composed of:

```
Vision
+
Robot / Gripper Proprioception
```

But for contact-rich manipulation, states like

- whether the object was actually gripped properly
- whether it's starting to slip
- whether the applied force is too strong
- exactly when contact occurred
- whether the object moved within the fingers

often can't be determined from RGB alone. For example, something might visually look "gripped" while it's actually going to slip out a few hundred milliseconds later.

This connects fairly directly to what I'm researching: a **Vision-Tactile Latent World Model for Failure-Aware VLA**. My own research direction looks something like:

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

If UMI is essentially a mechanism for imitation-learning "given what I currently see, which action should I take," what I want to do additionally is predict, with a latent world model, "if I take this action, what happens next." I think this distinction matters quite a bit.

For example, if you can predict:

```
now
object gripped
       │
       ▼
World Model
       │
       ├─ stable with this grip
       │
       └─ will slip in 500ms with this grip
```

then, before failing, the policy might be able to choose actions like

```
close the gripper further
adjust the pose
re-grasp
```

To put it in table form:

| Aspect | SO-101 Teleoperation | UMI |
|---|---|---|
| Initial setup | Easy | Requires building a device |
| Action acquisition | Direct from SO-101's own actions | Needs conversion for SO-101 |
| Using XELA sensors | Straightforward | Needs its own mounting design for UMI |
| Sim2Real | Relatively straightforward | Embodiment gap is introduced |
| Large-scale data collection | Fair | Strong |
| Feasibility for a master's project | Strong | Moderate |
| Focus on the core research | Strong | Weaker |

## And TacUMI Has Come Very Close

Something else I found very interesting while looking into this is **TacUMI**, published in 2026. TacUMI extends UMI's philosophy toward contact-rich manipulation: it adds a ViTac sensor, a force-torque sensor, and a pose tracker to a UMI-style gripper, and captures all of them in sync.

The authors themselves cite, as motivation, the observation that vision and proprioception alone can fail to sufficiently capture event transitions during physical interaction. On a cable-mounting task, they report over 90% accuracy for task segmentation using their multimodal data.

This is an important piece of prior work for my own research. Simply "adding tactile sensing to UMI" is no longer novel by itself — TacUMI already exists. That said, what TacUMI mainly focuses on is multimodal demonstration collection and contact-event-based task segmentation, which is a bit different from the direction I want to pursue.

To summarize:

| | UMI | TacUMI | My research |
|---|---|---|---|
| Vision | ✓ | ✓ | ✓ |
| Proprioception | ✓ | ✓ | ✓ |
| Tactile / Force | partial | ✓ | ✓ |
| Language | ✗ | ✗ | ✓ |
| Policy learning | Diffusion Policy | mainly data collection / segmentation | VLA |
| World model | ✗ | ✗ | ✓ |
| Future contact prediction | ✗ | ✗ | ✓ |
| Failure-aware action | ✗ | ✗ | ✓ |

In other words, building on UMI/TacUMI's idea of "collect good demonstration data," what I want to research is connecting a latent world model — one that predicts the future state of vision + tactile signals — to a VLA's action generation. I think that's the most interesting part of this, research-wise.

## What I Want to Bring From UMI Into My Own Research

What I want to carry over from reading UMI isn't so much the model itself as its interface-design philosophy.

In robot learning,

```
a good model
```

isn't enough on its own. You need to design all the way through:

```
good data
   +
good observation
   +
good action representation
   +
correct time synchronization
   +
good policy / world model
```

If I'm collecting data with an SO-101 and a vision-based tactile sensor, I can't just dump

```
RGB
Tactile Image
Joint State
Gripper Position
Motor Current
Action
Timestamp
```

into a rosbag — I also need to think carefully about whether every sensor is observing the same physical event at the same point in time. Since slip and contact can change state on the order of hundreds of milliseconds, UMI's latency-matching philosophy seems like it's going to matter quite a bit for my own Vision-Tactile World Model too.

## Closing

What stuck with me most from reading UMI is that the "data-collection device" itself is a legitimate research object in robot learning.

When you're researching VLA or world models, attention naturally gravitates toward the model side — Transformers, diffusion, flow matching, JEPA, and so on. But the world a model learns is ultimately built from data coming in through sensors.

UMI feels like one answer to the question: "what kind of body do you need to observe the world with, in order to transfer human experience to a robot?" And for my own research, I want to push that question one step further: "if we represent the world not just through vision but through touch as well, and can predict a little bit into the future how that world will change, can a robot change its action before it fails?"

UMI → TacUMI → Vision-Tactile World Model → Failure-Aware VLA. Placing my own research within that progression, what I want to study has become noticeably clearer to me than before.

---

*This is an English translation of the original Japanese post: [ロボットを持ち歩かずにロボットの学習データを集める ― Universal Manipulation Interface（UMI）を読む](https://mutomasa.hatenablog.com/entry/2026/08/19/155220)*
