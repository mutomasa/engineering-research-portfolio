---
title: 'VLA-JEPA Has Arrived'
description: 'Notes on VLA-JEPA, which brings the JEPA approach into VLA pretraining to address weaknesses in physical-law understanding and long-horizon tasks, with a comparison against V-JEPA2.'
pubDate: 2026-08-05
tags: ['vla', 'world-models', 'jepa', 'physical-ai']
draft: false
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/08/05/051509'
originalTitle: 'VLA-JEPAが出た'
sourceLanguage: 'ja'
---

I'm doing graduate research on robot foundation models and Physical AI.

Vision-Language-Action (VLA) models still have real challenges — they struggle to understand physical laws, and they're weak on long-horizon tasks, among other things. According to one source I came across, real-world VLA deployment success rates are apparently quite low — which matches my own sense of things as well. There are of course cases being deployed via PoCs, but I take that figure to be specifically about full production deployments, though the source and methodology behind it aren't something I've verified myself.

Now, to help address VLA's weaknesses, VLA-JEPA has arrived. For background on JEPA, see this article: [ai.meta.com](https://ai.meta.com/research/vjepa/)

That said, VLA-JEPA seems to differ from JEPA2 in the following way. As I understand it, VLA-JEPA is a new kind of VLA that incorporates JEPA's approach into VLA pretraining.

| | V-JEPA2 | VLA-JEPA |
|---|---|---|
| Purpose | World model | VLA pretraining |
| Input | Video | Video + robot data |
| Output | Future latent | Action policy |
| Planner | Yes | No |
| Policy | No | Yes |
| Use case | Planning | Manipulation |

For now, having read this, I'm going to check the code and try running it on my own GPU server next.

[sophon.at](https://sophon.at/papers/vla-jepa-enhancing-vision-language-action-model-with-latent-world-model)

---

*This is an English translation of the original Japanese post: [VLA-JEPAが出た](https://mutomasa.hatenablog.com/entry/2026/08/05/051509)*
