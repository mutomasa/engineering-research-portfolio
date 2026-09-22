---
title: 'Gaussian Splatting: From "Seeing" 3D to a "Touchable" World'
description: "Notes on World Labs' Splat World case study, where Gaussian Splatting is turned into a physically reactive VR material rather than a static background, and what that could mean for robot simulation and digital twins."
pubDate: 2026-09-03
tags: ['physical-ai', 'gaussian-splatting', '3d-representation', 'vr']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/09/03/222210'
originalTitle: 'Gaussian Splattingが「見る3D」から「触れる世界」へ'
sourceLanguage: 'ja'
---

I came across an article with the following title, a bit belatedly: "[The Splat World: Exploring New Dimensions of Gaussian Splatting in VR](https://www.worldlabs.ai/case-studies/1-splat-world)"

World Labs' "Splat World" case study is fascinating. Developer Daniel Skaale took a 3D space generated with Marble, brought it into Unity, and built a VR experience you can walk around in on a Meta Quest 3.

What stands out is that Gaussian Splatting isn't being used as mere background dressing here. He built a custom C# tool that changes light, density, color, and transparency in real time — when the player touches or shoots something, the surface ripples, breaks apart, and scatters like particles. In effect, "a space that was just a collection of points" turns into a material that reacts physically.

It's also interesting that a realistic house and a vivid, abstract world — two contrasting kinds of space — can both come out of the same production pipeline. Rather than just viewing a generated 3D world, you can enter it, act on it, and change it. This doesn't seem limited to games and VR — it feels like it could extend into robot simulation and digital twins as well.

I own a Meta Quest 3, so I'd like to try this out myself.

Gaussian Splatting may be moving from "a technology that faithfully reproduces reality" toward "a technology that drives a new world."

---

*This is an English translation of the original Japanese post: [Gaussian Splattingが「見る3D」から「触れる世界」へ](https://mutomasa.hatenablog.com/entry/2026/09/03/222210)*
