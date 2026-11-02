---
title: 'LLMの出力を制御するロジットマスキングとは？Hugging FaceとvLLMで理解する'
description: '今さながら、ロジットマスキングについて実装などを調べた。 LLMの生成結果を制御する方法というと、まずプロンプトエンジニアリングを思い浮かべます。 しかし、次のようなケースでは、プロンプトだけでは完全に制御できません。 特定のトークンを絶対…'
pubDate: 2026-10-16
tags: ['llm', 'vllm', 'hugging-face', 'ai-engineering']
originalUrl: 'https://mutomasa.hatenablog.com/entry/2026/10/16/105853'
---
今さながら、ロジットマスキングについて実装などを調べた。 LLMの生成結果を制御する方法というと、まずプロンプトエンジニアリングを思い浮かべます。

しかし、次のようなケースでは、プロンプトだけでは完全に制御できません。

-   特定のトークンを絶対に生成させたくない
-   JSON生成中に使用可能なトークンを制限したい
-   状態に応じて次に生成可能なトークンを変えたい
-   特定の語彙だけを使わせたい

そこで使える方法の一つが、**ロジットマスキング（Logit Masking）**です。

* * *

## ロジットとは何か

LLMは、次のトークンを直接出力しているわけではありません。

例えば、現在の文章に対して次の候補があるとします。

```
AI
robot
apple
banana
...
```

モデルは、それぞれのトークンに対して次のようなスコアを出力します。

```
AI      : 8.2
robot   : 7.1
apple   : 3.2
banana  : 2.5
```

このSoftmaxを適用する前のスコアが、**logit（ロジット）**です。

生成処理を単純化すると、次のような流れになります。

```
LLM
 ↓
logits
 ↓
Logits Processor
 ↓
Softmax
 ↓
確率分布
 ↓
Sampling / Greedy Decoding
 ↓
次のtoken
```

つまり、LLMは語彙に含まれるすべてのトークンについてロジットを計算し、その値から次に生成するトークンを決めています。

vLLMでも、Logits Processorはモデルが出力したロジットを受け取り、それを変更してからSampling処理へ渡す仕組みになっています。

* * *

## ロジットマスキングの基本

例えば、モデルが次のロジットを出力したとします。

```
AI      : 8.2
robot   : 7.1
apple   : 3.2
banana  : 2.5
```

ここで `apple` を絶対に生成させたくない場合、

```
apple : -inf
```

に変更します。

すると、

```
AI      : 8.2
robot   : 7.1
apple   : -inf
banana  : 2.5
```

となります。

Softmaxは概念的には次の計算を行います。

```
P(token_i)
=
exp(logit_i)
/
sum(exp(logit_j))
```

ここで、

```
exp(-inf) = 0
```

となるため、

```
P(apple) = 0
```

になります。

つまり、**対象トークンの生成確率を0にすることで、生成候補から完全に排除できます。**

これがロジットマスキングの基本的な考え方です。

Hugging Faceでも `SuppressTokensLogitsProcessor` が用意されており、対象トークンのロジットを `-inf` にすることで生成対象から除外できます。

* * *

## Hugging Faceで実装する

Python版のTransformersでは、`LogitsProcessor` を継承することで独自の処理を実装できます。

```python
import torch
from transformers import (
    LogitsProcessor,
    LogitsProcessorList,
    AutoModelForCausalLM,
    AutoTokenizer,
)

class CustomMaskingProcessor(LogitsProcessor):
    def __init__(self, bad_token_ids):
        self.bad_token_ids = bad_token_ids

    def __call__(
        self,
        input_ids: torch.LongTensor,
        scores: torch.FloatTensor,
    ) -> torch.FloatTensor:

        for token_id in self.bad_token_ids:
            scores[:, token_id] = -float("inf")

        return scores
```

`__call__()` に渡される `scores` は、基本的には次のような形です。

```
[batch_size, vocab_size]
```

例えば、

```python
scores[:, token_id] = -float("inf")
```

という処理は、

```
すべてのbatchについて
指定したtoken_idのscoreを -inf にする
```

という意味です。

つまり、

```
指定token
 ↓
logit = -inf
 ↓
確率 = 0
 ↓
生成されない
```

という処理になります。

* * *

## 実際にモデル生成へ組み込む

例えばGPT-2を使う場合は、次のように利用できます。

```python
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

inputs = tokenizer(
    "Artificial intelligence is",
    return_tensors="pt",
)

bad_token_id = tokenizer.encode(
    " robot",
    add_special_tokens=False,
)[0]

logits_processor = LogitsProcessorList([
    CustomMaskingProcessor([bad_token_id])
])

outputs = model.generate(
    **inputs,
    max_new_tokens=50,
    logits_processor=logits_processor,
)

print(tokenizer.decode(outputs[0]))
```

生成処理の内部では、概念的に次の処理が繰り返されます。

```
Model
   ↓
logits
   ↓
CustomMaskingProcessor
   ↓
特定token = -inf
   ↓
sampling
   ↓
次のtoken
```

つまり、モデルそのものを再学習しなくても、**推論時に生成可能なトークン空間を制御できます。**

* * *

## 単語とトークンは同じではない

ここで非常に重要な注意点があります。

例えば、

```python
bad_ids = [
    tokenizer.encode(
        "NGワード",
        add_special_tokens=False
    )[0]
]
```

とすると、「NGワード」という単語全体を禁止しているように見えます。

しかし、Tokenizerによっては、

```
"NGワード"

↓ Tokenize

[1234, 5678, 9012]
```

のように、1つの単語が複数のトークンへ分割される可能性があります。

この場合、

```python
[0]
```

だけを取得すると、

```
1234
```

という最初のトークンしか禁止していません。

そのため、

**単純なtoken maskingと、文字列や単語そのものの禁止は区別する必要があります。**

* * *

## 複数トークンからなる単語を禁止する

Hugging Faceには、この用途向けに `NoBadWordsLogitsProcessor` があります。

例えば次のように使えます。

```python
from transformers import NoBadWordsLogitsProcessor

bad_words = [
    "NGワード",
    "禁止ワード",
]

bad_words_ids = [
    tokenizer(
        word,
        add_special_tokens=False
    ).input_ids
    for word in bad_words
]

processor = NoBadWordsLogitsProcessor(
    bad_words_ids=bad_words_ids,
    eos_token_id=tokenizer.eos_token_id,
)
```

`bad_words_ids` は次のようなトークン列になります。

```
[
    [token1, token2],
    [token3, token4, token5]
]
```

`NoBadWordsLogitsProcessor` は、単純に1つのトークンを禁止するのではありません。

それまでに生成されたトークン列を確認しながら、

```
このtokenを次に生成すると
禁止されたtoken列が完成してしまう
```

という場合に、そのトークンを生成候補から除外します。

ここが、

```python
scores[:, token_id] = -float("inf")
```

という単純なマスキングとの大きな違いです。

* * *

## Hard MaskとSoft Penalty

ロジットの制御方法は、大きく分けるとHardな制御とSoftな制御があります。

| 方法 | 処理 | 効果 |
| --- | --- | --- |
| Hard Mask | `logit = -inf` | 完全に禁止する |
| Soft Penalty | `logit -= penalty` | 出にくくする |
| Boost | `logit += bonus` | 出やすくする |
| Allow List | 許可token以外を `-inf` | 出力可能な語彙を限定する |

例えば、完全に禁止するのではなく、「できれば生成してほしくない」程度であれば、

```python
scores[:, token_id] -= 5.0
```

のような処理もできます。

例えば、

```
Before

robot = 8.0
```

だったロジットを、

```
After

robot = 3.0
```

に下げるイメージです。

この場合、`robot` は生成候補として残っていますが、他のトークンと比較して選択されにくくなります。

* * *

## 許可されたトークンだけを生成する

ロジットマスキングでは、禁止するだけではなく、逆に**許可されたトークンだけを残す**こともできます。

例えば、現在の生成状態では次の記号しか許可したくないとします。

```
{
"
:
,
}
```

その場合は、一度すべてのトークンを `-inf` にします。

```python
masked_scores = torch.full_like(
    scores,
    -float("inf")
)
```

その後、許可されたトークンだけ元のロジットへ戻します。

```python
masked_scores[:, allowed_ids] = scores[:, allowed_ids]

return masked_scores
```

イメージとしては、

```
Vocabulary

100,000 tokens

      ↓ Masking

Allowed

20 tokens
```

となります。

この仕組みは、**Structured OutputやConstrained Decoding**の基本的な考え方にもつながります。

* * *

## JSON生成にも使える

例えばLLMに次のようなJSONを必ず生成させたいとします。

```json
{
  "name": "robot",
  "status": "running"
}
```

単純にプロンプトで、

```
必ずJSONで回答してください。
```

と指示しても、LLMが次のような文章を追加してしまう可能性があります。

```
Here is the JSON:

{
  ...
}
```

一方で、生成状態ごとに使用可能なトークンを制限すると、より強く形式を制御できます。

例えば、

```
State 1

↓
{ のみ許可

State 2

↓
" を許可

State 3

↓
key候補を許可

...

State N

↓
} を許可
```

というように、現在の文法状態に応じてロジットをマスクします。

構成としては、

```
LLM
 +
State Machine / Grammar
 +
Logit Masking
```

となります。

これにより、**文法的に不正なトークンそのものを生成候補から除外できます。**

* * *

## Hugging Faceには多くのLogits Processorがある

ロジット操作は、NGワードを禁止するだけの仕組みではありません。

Hugging Faceには、例えば次のようなLogits Processorがあります。

```
SuppressTokensLogitsProcessor
NoBadWordsLogitsProcessor
NoRepeatNGramLogitsProcessor
ForcedBOSTokenLogitsProcessor
ForcedEOSTokenLogitsProcessor
MinLengthLogitsProcessor
```

例えば、

```
NoRepeatNGramLogitsProcessor
```

は、それまでに生成されたn-gramを確認します。

そして、

```
次にこのtokenを生成すると
同じn-gramが完成してしまう
```

という場合、そのトークンを禁止します。

つまりLogits Processorは単純な固定マスクだけではありません。

```
過去の生成token
+
現在の状態
+
生成ルール

↓

次に許可するtokenを決定
```

という、**動的な生成制御**にも利用できます。

* * *

## vLLMではどうなっているのか

大量のLLMリクエストを処理する場合、Hugging Faceで1リクエストずつ生成する場合よりも少し複雑になります。

vLLMでは、複数のリクエストをbatchとしてまとめて処理します。

ロジットは概念的には次のようになります。

```
[num_requests, vocab_size]
```

例えば、

```
Request A ─┐
Request B ─┼→ Dynamic Batch
Request C ─┘
              ↓
             LLM
              ↓
          Batch logits
              ↓
       Logits Processor
              ↓
           Sampler
```

という流れです。

Logits Processorによってbatch全体のロジットを変換してから、Samplingを行います。

大量リクエストを処理するServing環境では、こうしたbatch処理の効率が重要になります。

* * *

## vLLMのBatchUpdateとは何か

vLLMで特徴的なのが、Dynamic Batchingです。

LLMサーバでは、

```
Request A
Request B
Request C
```

というbatchが常に固定されているわけではありません。

例えばRequest Aの生成が終了すると、そこに新しいRequest Dが入る可能性があります。

```
[A, B, C]

↓

[D, B, C]
```

さらに内部処理の都合で、batch内の位置が変更されることもあります。

```
[B, D, C]
```

ここで、Logits Processorがリクエストごとの状態を持っていると問題が発生します。

例えば、

```
index 0 = Request Aの状態
```

と保持していた場合、Request Aが終了してRequest Dへ置き換わったあとも、その状態を使ってしまうと正しく動作しません。

そこでvLLMでは、batchの変更情報を管理する仕組みが用意されています。

概念的には、

```
removed
added
moved
```

といった変更をProcessor側へ通知します。

Processorは、その情報を使って内部状態を更新します。

イメージとしては、

```
Batch Update
     ↓
Processor State Update
     ↓
Model
     ↓
logits
     ↓
Logits Processor
     ↓
Sampling
```

となります。

これは単純なロジットマスキングというよりも、

**高スループットなLLM Serving環境で、Statefulな生成制約をどう維持するか**

という問題です。

* * *

## Hugging FaceとvLLMの違い

大まかに整理すると次のようになります。

| 観点 | Hugging Face Transformers | vLLM |
| --- | --- | --- |
| 主な用途 | モデル実験・推論 | 高性能LLM Serving |
| ロジット | `scores` | batch単位のlogits |
| カスタム処理 | `LogitsProcessor` | Logits Processor |
| リクエスト状態 | `input_ids`から判断しやすい | リクエストごとの状態管理が重要 |
| Dynamic Batch | 通常はあまり意識しない | 非常に重要 |
| Batch状態管理 | 比較的単純 | Batch更新への対応が必要 |
| 大規模Serving | 主目的ではない | 主目的 |

ただし、基本的な考え方は共通しています。

```
Model logits
      ↓
Logits Processor
      ↓
Modified logits
      ↓
Sampling
```

つまり、**Samplingの直前でモデルの出力分布を変更する**という考え方です。

* * *

## ロジットマスキングはどこで役立つのか

個人的には、単なるNGワード対策よりも、次のような用途の方が重要だと思います。

```
Logit Masking
│
├── 禁止語制御
│
├── Structured Output
│   ├── JSON
│   └── XML
│
├── Grammar Constraint
│
├── Tool Calling
│
├── State Machine
│
├── Domain Vocabulary
│
└── Agent / Robot Action Constraint
```

例えばAI Agentなら、

```
現在の状態では

search
read
write

だけ実行可能
```

という場合に、それ以外のAction Tokenをマスクできます。

例えば、

```
現在のAgent State
       ↓
利用可能Toolを計算
       ↓
許可されたAction Token
       ↓
Logit Masking
       ↓
LLMがActionを生成
```

という構成です。

* * *

## ロボット制御にも応用できる

この考え方は、AI Agentだけでなくロボットにも応用できます。

例えば、

```
現在のRobot State
       ↓
Ontology / Business Rule
       ↓
許可されたAction
       ↓
Logit Masking
       ↓
Action Token
```

という構成です。

例えばロボットが物体をまだ把持していない状態では、

```
place
release
```

といったActionを禁止する、といった制約を入れられます。

逆に、

```
grasp
move
observe
```

だけを許可することもできます。

つまり、

```
LLM / VLA
+
Environment State
+
Rule
+
Logit Masking
```

という形です。

ロジットマスキングは単なる「禁止ワード機能」ではなく、

**LLMの確率的な生成と、外部の決定論的なルールを接続するポイント**

として考えると面白い技術です。

* * *

## ロジットマスキングだけで安全性は保証できない

一方で、NGワード対策として利用する場合には注意が必要です。

例えば、

```
危険な単語A
```

というトークン列を禁止しても、モデルが別の表現や言い換えを生成する可能性があります。

さらにTokenizerによって、

```
word
 word
WORD
word.
```

などが異なるトークン列として扱われる場合もあります。

そのため、安全対策としてはロジットマスキングだけに依存するべきではありません。

例えば、

```
Prompt / Policy
       +
Structured Constraints
       +
Logit Masking
       +
Output Validation
```

のように、複数のレイヤで制御する方が安全です。

* * *

## まとめ

ロジットマスキングの基本原理は非常にシンプルです。

```
生成したくないtoken

↓

logit = -inf

↓

Softmax後の確率 = 0

↓

生成されない
```

しかし、この考え方を発展させると、

```
禁止token
↓
禁止token sequence
↓
状態依存mask
↓
Grammar Constraint
↓
Structured Output
↓
Agent Action Constraint
```

へとつながります。

特に重要なのは、

**LLM自身に「ルールを守って」とお願いするのではなく、生成可能な選択肢そのものを外部から制御できる**

という点です。

Hugging Faceでは `LogitsProcessor` を利用して比較的簡単に実験できます。

一方、vLLMのようなLLM Serving基盤では、Dynamic Batchingやリクエストごとの状態管理まで含めて考える必要があります。

LLMやAI Agentを実システムへ組み込む場合、

```
Prompt
```

だけで制御するのではなく、

```
Prompt
+
State
+
Rules
+
Logits Processor
+
Validation
```

という構成で考えることが重要になります。

ロジットマスキングは、その中でも**「生成時の制約レイヤ」**として利用できる仕組みです。

* * *

## 参考資料

-   Hugging Face Transformers: LogitsProcessor / Generation Utilities
-   Hugging Face Transformers.js: Logits Processors
-   vLLM: Logits Processors Design
    
    -   [https://docs.vllm.ai/en/latest/design/logits\_processors/](https://docs.vllm.ai/en/latest/design/logits_processors/)
-   Hugging Face Transformers.js
    
    -   [https://huggingface.co/docs/transformers.js/api/generation/logits\_process](https://huggingface.co/docs/transformers.js/api/generation/logits_process)

※今回のHugging FaceのリンクはTransformers.js向けAPIです。一方、この記事中のサンプルコードはPython版の `transformers` を利用しています。

APIの形は異なりますが、

```
Model
 ↓
Logits
 ↓
Logits Processor
 ↓
Sampling
```

という基本的な考え方は共通しています。
