/**
 * Projects ページで GitHub の説明文の代わりに表示する、リポジトリごとの概要。
 * 各リポジトリの README・設計書を読んで書いたもの。ここにないリポジトリは GitHub の説明文を表示する。
 */

export type ProjectCategory = 'robotics' | 'vision' | 'llm' | 'graph' | 'ml' | 'infra';

export const PROJECT_CATEGORIES: Record<ProjectCategory, { en: string; ja: string }> = {
	robotics: { en: 'Robotics · Spatial AI · 3D', ja: 'ロボティクス・空間AI・3D' },
	vision: { en: 'Computer Vision', ja: 'コンピュータビジョン' },
	llm: { en: 'LLM · AI Agents', ja: 'LLM・AI Agent' },
	graph: { en: 'Graphs · Knowledge Graphs · RAG', ja: 'グラフ・知識グラフ・RAG' },
	ml: { en: 'Machine Learning · Generative Models', ja: '機械学習・生成モデル' },
	infra: { en: 'Data Platforms · Infrastructure · Tools', ja: 'データ基盤・インフラ・ツール' },
};

/** 表示順 */
export const CATEGORY_ORDER: ProjectCategory[] = ['robotics', 'vision', 'llm', 'graph', 'ml', 'infra'];

/** design: 設計書のみで実装前 / paused: 開発を中断 */
export type ProjectStatus = 'design' | 'paused';

export interface ProjectNote {
	category: ProjectCategory;
	ja: string;
	en: string;
	status?: ProjectStatus;
}

export const PROJECT_NOTES: Record<string, ProjectNote> = {
	// ── ロボティクス・空間AI・3D ──
	'gaussian-sam-studio': {
		category: 'robotics',
		ja: 'テキストで指定した対象を、動画と 3D Gaussian Splatting のシーンからセグメンテーションする Streamlit アプリ。3D シーンを動画に描画して SAM 3.1 にかけ、その結果を深度とカメラ姿勢で 3D に戻す。推論と 3DGS の学習はすべてローカル GPU（8GB VRAM）で行う。',
		en: 'Streamlit app that segments a text-specified object in video and in a 3D Gaussian Splatting scene. The 3D scene is rendered to video, segmented with SAM 3.1, and lifted back to 3D using depth and camera poses. Inference and 3DGS training run entirely on a local 8 GB GPU.',
	},
	'3DGS': {
		category: 'robotics',
		ja: 'gsplat を使った Gaussian Splatting の比較デモ。Mip-NeRF 360 のデータから、COLMAP の点群をそのまま使う方法と、画像で学習する方法の 2 通りで Gaussian を作り、three.js のビューアで左右に並べて比べる。学習途中の Gaussian を再生する機能もある。',
		en: 'Gaussian Splatting comparison demo with gsplat. From Mip-NeRF 360 data it builds Gaussians two ways (directly from the COLMAP point cloud, and by training on posed images) and shows them side by side in a three.js viewer, with playback of intermediate training snapshots.',
	},
	turtlebot3_spatial_ai: {
		category: 'robotics',
		ja: 'TurtleBot3 の 2D LiDAR と RGB-D カメラで観測した物体を、位置・意味・空間関係・観測履歴を持つ Spatial Scene Graph にまとめ、LLM で自然言語の指示から物体を特定して Nav2 で移動する研究プロジェクト。設計書と研究計画書を公開している。',
		en: 'Research project that builds a Spatial Scene Graph (position, semantics, spatial relations, observation history) from a TurtleBot3’s 2D LiDAR and RGB-D camera, then uses an LLM to resolve natural-language instructions to objects and Nav2 to navigate. Design document and research plan are published.',
		status: 'design',
	},
	'questbot-xr': {
		category: 'robotics',
		ja: 'Unity と ROS 2 をつなぎ、Meta Quest 3 で TurtleBot3 Burger の LiDAR・地図・カメラを表示する VR/MR アプリ。最初の目標は、実機の LiDAR スキャンを VR 空間に実寸で表示すること。',
		en: 'VR/MR app that connects Unity and ROS 2 to display a TurtleBot3 Burger’s LiDAR, map and camera on a Meta Quest 3. The first milestone is showing the real LiDAR scan at true scale in VR.',
		status: 'design',
	},
	quantum_policy_gradient: {
		category: 'robotics',
		ja: 'グリッド上で障害物と危険区域を避けてゴールへ向かうロボットの経路探索を題材に、変分量子回路（VQC）による方策勾配法と、古典ニューラルネットワークによる方策勾配法を同じ条件で学習して比べるデモ。量子ビット数・回路の深さ・ショット数・ノイズを変えられる。',
		en: 'Robot path-finding on a grid with obstacles and hazards, used to train and compare a variational-quantum-circuit policy (Quantum REINFORCE) against a classical neural-network policy under the same conditions. Qubit count, circuit depth, shots and noise are configurable.',
	},
	'smart-3d-ecosystem': {
		category: 'robotics',
		ja: '数千匹の魚が 3D の水中で群れを作り、捕食者から逃げて餌を探す Boids のデモ。群れの意思決定をルールベースと PyTorch / PPO の学習済み方策で切り替え、同じ条件での違いを Streamlit のダッシュボードで数値比較する。描画は Three.js と Web Worker。',
		en: '3D fish-school ecosystem with thousands of Boids that flee predators and forage. Collective decisions switch between rule-based and PyTorch/PPO policies, compared numerically under identical conditions in a Streamlit dashboard. Rendering uses Three.js and a Web Worker.',
	},
	lerobot: {
		category: 'robotics',
		ja: 'Hugging Face のロボット学習ライブラリ LeRobot のフォーク。',
		en: 'Fork of Hugging Face LeRobot, a library for end-to-end robot learning.',
	},

	// ── コンピュータビジョン ──
	grounding_sam2_app: {
		category: 'vision',
		ja: 'Grounding DINO と SAM 2 を組み合わせ、テキストで指定した物体を動画の中で検出・セグメンテーション・追跡する Streamlit アプリ。',
		en: 'Streamlit app combining Grounding DINO and SAM 2 to detect, segment and track text-specified objects in video.',
	},
	glip_app: {
		category: 'vision',
		ja: 'Microsoft の GLIP（Swin Transformer バックボーン）で、テキストのクエリに対応する物体を画像から検出する Streamlit アプリ。',
		en: 'Streamlit app that uses Microsoft GLIP (Swin Transformer backbone) to detect and ground objects in an image from a text query.',
	},
	'owl-vit-app': {
		category: 'vision',
		ja: 'OWL-ViT によるオープンボキャブラリ物体検出の Streamlit アプリ。テキストのクエリと、例として与えた画像のどちらでも検出でき、モジュールを単一責任で分けて設計している。',
		en: 'Open-vocabulary object detection with OWL-ViT in Streamlit, using either text queries or an example image. Modules are split by single responsibility for reuse and testability.',
	},
	structure_clip_owl_vit_app: {
		category: 'vision',
		ja: 'Structure-CLIP の CLIP 互換実装によるテキストと画像の類似度計算、OWL-ViT によるゼロショット検出、主語・関係・目的語のシーングラフ可視化をまとめた Streamlit アプリ。',
		en: 'Streamlit app combining text–image similarity with Structure-CLIP’s CLIP-compatible model, zero-shot detection with OWL-ViT, and subject–relation–object scene-graph visualization.',
	},
	detr_app: {
		category: 'vision',
		ja: 'Transformer による物体検出モデル DETR の検出結果に加え、アテンション、オブジェクトクエリ、隠れ状態を可視化する Streamlit アプリ。',
		en: 'Streamlit app that visualizes DETR detections together with its attention maps, object queries and hidden states.',
	},
	segformer_app: {
		category: 'vision',
		ja: 'SegFormer（B0〜B5、ADE20K・Cityscapes）によるセマンティックセグメンテーションと、モデル内部の動作を可視化する Streamlit アプリ。',
		en: 'Semantic segmentation with SegFormer (B0–B5, ADE20K and Cityscapes) plus visualization of the model’s internals, in Streamlit.',
	},
	yoro_app: {
		category: 'vision',
		ja: 'YOLOv8 で画像の物体を検出し、検出結果の統計と YOLOv8 のアーキテクチャ図を表示する Streamlit アプリ。',
		en: 'Streamlit app for YOLOv8 object detection with detection statistics and diagrams of the YOLOv8 architecture.',
	},
	deepsort_app: {
		category: 'vision',
		ja: 'YOLOv8 の検出結果を DeepSORT で追跡し、動画の複数の物体に ID を付けて表示する Streamlit アプリ。動画ファイルとウェブカメラに対応する。',
		en: 'Multi-object tracking in Streamlit: YOLOv8 detections tracked with DeepSORT and labeled with IDs, for video files and webcam input.',
	},
	scene_graph_app: {
		category: 'vision',
		ja: 'Graph R-CNN（ECCV 2018）を参考に、Mask R-CNN の検出結果から関係の候補を選び、アテンションで関係スコアを調整して、画像からシーングラフを作る最小実装。',
		en: 'Minimal scene-graph generation inspired by Graph R-CNN (ECCV 2018): Mask R-CNN detections, relation proposals, and attention-based refinement of relation scores.',
	},
	vitmae: {
		category: 'vision',
		ja: 'ViTMAE で画像の 75% をマスクし、残りの 25% から元の画像を再構築して、元画像・マスク・再構築結果を並べて表示する Streamlit アプリ。',
		en: 'Streamlit app that masks 75% of an image with ViTMAE, reconstructs it from the remaining 25%, and shows the original, mask and reconstruction side by side.',
	},
	simclr_app: {
		category: 'vision',
		ja: '対照学習 SimCLR のデータ拡張、特徴抽出、t-SNE による埋め込み空間、コサイン類似度行列を可視化する Streamlit アプリ。',
		en: 'Streamlit app visualizing SimCLR contrastive learning: augmentations, feature extraction, t-SNE embedding space and cosine-similarity matrices.',
	},
	mmaction1_app: {
		category: 'vision',
		ja: 'MMAction2（TSN・SlowFast）で、アップロードした動画の行動を認識し、上位のラベルとスコアの推移を表示する Streamlit アプリ。',
		en: 'Action recognition on uploaded video with MMAction2 (TSN and SlowFast), showing top-K labels and score timelines in Streamlit.',
	},
	pyslowfast_app: {
		category: 'vision',
		ja: 'Meta の SlowFast モデル（Kinetics-400 で学習済み）で、アップロードした動画の行動を認識する Streamlit の最小構成。',
		en: 'Minimal Streamlit app for action recognition on uploaded video with Meta’s SlowFast model pretrained on Kinetics-400.',
	},
	'qwen-vl-caption': {
		category: 'vision',
		ja: 'vLLM 上の Qwen2.5-VL で画像のキャプションを生成し、人が正解・不正解を付けて正解率を集計する評価アプリ。',
		en: 'Image-captioning evaluation app: Qwen2.5-VL on vLLM generates captions, a person marks them correct or incorrect, and accuracy is tallied.',
	},
	manipulate_image_lists: {
		category: 'vision',
		ja: '幾何変換、色・明るさの変換、ノイズとフィルタ、機械学習用の前処理の 4 種類の画像処理を、パラメータを変えながら試せる Streamlit アプリ。',
		en: 'Streamlit toolkit for trying four groups of image operations (geometric, color/brightness, noise/filters, ML preprocessing) with adjustable parameters.',
	},

	// ── LLM・AI Agent ──
	ignisolate: {
		category: 'llm',
		ja: 'AI Agent が生成したコードやツール呼び出しを、Firecracker の microVM の中で隔離して実行するサンドボックス基盤。1 セッションに 1 つの microVM を割り当て、リソース制限とネットワーク制御を行う。',
		en: 'Sandbox platform that runs AI-agent-generated code and tool calls inside Firecracker microVMs, one microVM per agent session, with resource limits and network control.',
	},
	'jev-decision-router-demo': {
		category: 'llm',
		ja: 'Jev を意思決定のレイヤー、ローカル vLLM を生成のレイヤーとして組み合わせた Agentic Mesh の Decision Plane の PoC。リクエストの分類結果と確信度を型付きの値として受け取り、確信度が低いものや危険なものは生成の前に人の確認に回す。',
		en: 'Decision Plane PoC for an Agentic Mesh: Jev classifies requests and returns typed choices with confidence, and a local vLLM generates per route. Low-confidence or risky requests go to human review before any generation.',
	},
	'lean-agent-verification-lab': {
		category: 'llm',
		ja: 'ローカルの vLLM + Qwen3-1.7B で動く AI Agent と OR-Tools の出力を、手書きの Lean 4 の形式検証で確かめる 3 つのデモ（送金・RBAC・人員配置）。',
		en: 'Three demos (fund transfer, RBAC, staff scheduling) that check the output of a local vLLM + Qwen3-1.7B agent and OR-Tools with hand-written Lean 4 proofs.',
	},
	'phoenix-llm-observability-demo': {
		category: 'llm',
		ja: 'Arize Phoenix とローカルの Qwen3 + vLLM で、LLM as a Judge による回答の採点と、LangGraph Agent の実行トレースを確かめるデモ。',
		en: 'Demo of LLM-as-a-Judge scoring and LangGraph agent tracing with Arize Phoenix and a local Qwen3 + vLLM.',
	},
	prompt_optimaizer: {
		category: 'llm',
		ja: 'プロンプトを YAML / TOML で管理し、LLM as a Judge で評価しながら最適化するフレームワーク。RAG 向けに引用と忠実性を重視した評価ループを持ち、LangChain / LangGraph から使える。',
		en: 'Prompt-optimization framework with YAML/TOML-managed prompts and an LLM-as-a-Judge loop that emphasizes citation and faithfulness for RAG; usable from LangChain/LangGraph.',
	},
	'clojure-agent-evolution': {
		category: 'llm',
		ja: 'LLM エージェントの振る舞い（ツールの使い方、慎重さ、プロンプトの断片など）を遺伝子として表し、遺伝的アルゴリズムで世代ごとに進化させるプロトタイプ。Clojure の標準ライブラリだけで書いている。',
		en: 'Prototype that encodes LLM-agent behavior (tool bias, caution, prompt fragments) as genes and evolves it with a genetic algorithm across generations, written with only the Clojure standard library.',
	},
	'openbot-crewai-agent-mesh-demo': {
		category: 'llm',
		ja: 'OpenBot・AG-UI・CrewAI・ローカル vLLM（Qwen）を組み合わせ、複数の Agent が協調し、人が途中で確認・承認できる Multi-Agent デモ。最初のユースケースは提案書のレビュー。Agentic Mesh の PoC へ段階的に発展させる計画。',
		en: 'Multi-agent demo combining OpenBot, AG-UI, CrewAI and a local vLLM (Qwen), where agents collaborate and a person can review and approve along the way. The first use case is proposal review; it is planned to grow into an Agentic Mesh PoC.',
		status: 'design',
	},
	model_dl_vllm_server: {
		category: 'llm',
		ja: 'Hugging Face のモデルをダウンロードし、OpenAI 互換 API の vLLM サーバーを起動するツール一式。8GB の GPU で動くモデルの一覧つき。',
		en: 'Tools to download Hugging Face models and start an OpenAI-compatible vLLM server, with a list of models that fit an 8 GB GPU.',
	},
	dlt_genenrate_pptx: {
		category: 'llm',
		ja: 'テキストのテーマから、レイアウト生成と vLLM による本文生成を組み合わせて PowerPoint のスライドを作るシステム。レイアウト生成は現時点ではルールベースのテンプレートで実装している。',
		en: 'Generates PowerPoint slides from a text theme by combining layout generation with content written by a vLLM-served LLM. Layout generation is currently a rule-based template.',
	},
	research_os: {
		category: 'llm',
		ja: '文献検索から論文レビュー、知識グラフ、仮説、実験の実行までを 1 つの TUI でつなぐ研究開発 IDE の構想。Paperpile を文献 DB、Claude Code を Research Agent、MCP を外部サービスとの接続に使う。',
		en: 'Concept for a research IDE that connects literature search, paper review, knowledge graphs, hypotheses and experiment runs in one TUI, using Paperpile as the literature DB, Claude Code as the research agent and MCP for external services.',
	},
	paper_research_agent: {
		category: 'llm',
		ja: 'Robot Foundation Model 関連の論文を定期的に集め、ローカル vLLM + Qwen で構造化して TUI で読むためのツール。開発を中断し、機能は Research OS に統合する予定。',
		en: 'Tool that periodically collects robot-foundation-model papers, structures them with a local vLLM + Qwen, and shows them in a TUI. Development is paused; its features are moving into Research OS.',
		status: 'paused',
	},
	'Research-Nexus': {
		category: 'llm',
		ja: '研究メモ、X で見つけた情報、論文、Paperpile、Notion に分かれている研究情報を、1 つのデスクトップアプリで集めて関連づける研究情報管理アプリの設計（Electron + React + TypeScript）。',
		en: 'Design for a desktop app (Electron + React + TypeScript) that gathers and links research notes, posts found on X, papers, Paperpile and Notion in one place.',
		status: 'design',
	},
	deep_research_design: {
		category: 'llm',
		ja: 'Open Deep Research を拡張し、ネットワーク分析と知識グラフの機能を加えて市場分析・アイデア分析を行うシステムの実装設計書。',
		en: 'Implementation design that extends Open Deep Research with network analysis and knowledge-graph features for market and idea analysis.',
		status: 'design',
	},
	yohaku_os: {
		category: 'llm',
		ja: 'Claude Code と Zapier でメールの仕分け、情報収集、議事録整理、タスク登録などの定型業務を自動化し、人にしかできない仕事に時間を戻す「日常業務 OS」の構想。',
		en: 'Concept for a “daily work OS” that automates routine work such as email triage, information gathering, meeting notes and task entry with Claude Code and Zapier, to give time back to work only people can do.',
		status: 'design',
	},
	jaea_search_skill: {
		category: 'llm',
		ja: 'JAEA の特許と報告書を DuckDB に取り込み、Codex や Claude Code から jaea-search コマンドで関連資料を探すローカル RAG 検索システム。外部 API に頼らない文字 n-gram の埋め込みで日本語と英語の混ざった文書を検索し、根拠となった本文の断片を示す。',
		en: 'Local RAG search over JAEA patents and reports loaded into DuckDB, callable as the jaea-search command from Codex or Claude Code. Uses character n-gram embeddings with no external API to handle mixed Japanese/English text, and shows the matching passages as evidence.',
	},
	'gpt-oss': {
		category: 'llm',
		ja: 'OpenAI のオープンウェイトモデル gpt-oss（120b・20b）のフォーク。',
		en: 'Fork of OpenAI gpt-oss (120b and 20b), open-weight language models.',
	},

	// ── グラフ・知識グラフ・RAG ──
	'security-attack-graph-3d': {
		category: 'graph',
		ja: '企業システムの資産・脆弱性・権限・シークレット・データを知識グラフで表し、「どの経路で顧客データまで到達できるか」を自然言語で質問して 3D で確かめるプロトタイプ（Neo4j・Qwen・Three.js・Streamlit）。',
		en: 'Prototype that models assets, vulnerabilities, permissions, secrets and data as a knowledge graph, so you can ask in natural language which paths reach customer data and inspect them in 3D (Neo4j, Qwen, Three.js, Streamlit).',
	},
	graph_rag_app: {
		category: 'graph',
		ja: 'Neo4j と vLLM サーバーを LangChain でつないだ Graph RAG アプリ。グラフの可視化つき。',
		en: 'Graph RAG app connecting Neo4j and a vLLM server through LangChain, with graph visualization.',
	},
	graph_rag_video: {
		category: 'graph',
		ja: 'Whisper の音声認識と YOLO の物体検出で動画の内容を取り出し、Neo4j の知識グラフに入れて Graph RAG で検索・回答する動画分析システム。',
		en: 'Video analysis system that extracts content with Whisper speech recognition and YOLO detection, stores it in a Neo4j knowledge graph, and answers questions with Graph RAG.',
	},
	create_knowledge_graph_neo4j: {
		category: 'graph',
		ja: '日本語のテキストから固有表現と簡単な関係を取り出し、Neo4j に知識グラフを作るツール。固有表現抽出は日本語 DeBERTa のモデル、関係は Sudachi で取り出した動詞を使う。',
		en: 'Builds a Neo4j knowledge graph from Japanese text using named-entity recognition (Japanese DeBERTa) and simple verb-based relations extracted with Sudachi.',
	},
	gnn_visualization_app: {
		category: 'graph',
		ja: 'PyTorch Geometric の R-GCN を Cora データセットで学習・評価し、学習曲線とグラフ構造を Streamlit で可視化するアプリ。',
		en: 'Trains and evaluates an R-GCN on the Cora dataset with PyTorch Geometric and visualizes learning curves and graph structure in Streamlit.',
	},
	node2vec_gcn_app: {
		category: 'graph',
		ja: 'NetworkX のグラフに Node2Vec で埋め込みを作り、2 層の GCN を通した後の表現と並べて 2 次元で比べる Streamlit アプリ。',
		en: 'Streamlit app that embeds a NetworkX graph with Node2Vec and compares it in 2D with the representation after a two-layer GCN.',
	},
	network_indicator_visualization: {
		category: 'graph',
		ja: 'PyTorch Geometric のデータセットで、中心性・クラスタ係数・直径などのネットワーク指標と Node2Vec の埋め込みを計算・可視化する Streamlit アプリ。',
		en: 'Streamlit app that computes and visualizes network metrics (centralities, clustering coefficients, diameter) and Node2Vec embeddings on PyTorch Geometric datasets.',
	},

	// ── 機械学習・生成モデル ──
	'embeddinggemma-multimodal-lab': {
		category: 'ml',
		ja: 'google/embeddinggemma-2 で、テキスト・画像・動画の意味検索と、Matryoshka の次元（128〜768）ごとの精度・速度・保存量の違いをローカルで比べるデモ。正解ラベル付きの評価セットで数値を出す。',
		en: 'Local demo of text, image and video semantic search with google/embeddinggemma-2, comparing accuracy, speed and storage across Matryoshka dimensions (128–768) on a labeled evaluation set.',
	},
	cnn_unet_diffusion_transformer_app: {
		category: 'ml',
		ja: '拡散モデルの CNN ベースの U-Net と、Transformer ベースの DiT を実装し、アーキテクチャと性能の違いを可視化して比べる。',
		en: 'Implements a CNN-based U-Net and a Transformer-based DiT for diffusion models and visualizes how their architectures and performance differ.',
	},
	'graph-diffusion-quantum-molecular': {
		category: 'ml',
		ja: 'E(3) 等変なグラフ拡散モデルで分子を生成し、量子計算（VQE）で基底状態エネルギーや HOMO-LUMO ギャップを求める創薬支援のデモ。',
		en: 'Drug-discovery demo that generates molecules with an E(3)-equivariant graph diffusion model and computes ground-state energy and HOMO–LUMO gaps with VQE quantum computation.',
	},
	simple_gpt_for_learning: {
		category: 'ml',
		ja: '学習用に PyTorch で書いたシンプルな GPT。Hugging Face のトークナイザーを使い、学習とテキスト生成ができる。',
		en: 'A simple GPT in PyTorch for learning purposes, using a Hugging Face tokenizer, with training and text generation.',
	},
	bert_umap_hdbscan_clustering: {
		category: 'ml',
		ja: 'BERT の埋め込み、UMAP の次元削減、HDBSCAN の密度ベースクラスタリングを組み合わせて、テキストを自動で分類・可視化する Streamlit アプリ。',
		en: 'Streamlit app that clusters and visualizes text by combining BERT embeddings, UMAP dimensionality reduction and HDBSCAN density-based clustering.',
	},
	clap_app: {
		category: 'ml',
		ja: 'CLAP で音声ファイルとテキストのクエリの類似度を計算し、波形・スペクトログラム・MFCC と合わせて可視化する Streamlit アプリ。',
		en: 'Streamlit app that scores audio against text queries with CLAP and visualizes waveforms, spectrograms and MFCCs.',
	},
	whisper_app: {
		category: 'ml',
		ja: '日本語の音声を Whisper で文字起こしし、波形の表示と spaCy による形態素解析まで行うデモアプリ。',
		en: 'Demo app that transcribes Japanese speech with Whisper, shows the waveform, and runs morphological analysis with spaCy.',
	},
	pca_nmf_app: {
		category: 'ml',
		ja: 'グレースケール画像に対する主成分分析（PCA）と非負値行列因子分解（NMF）を、基底と再構成画像を見ながら比べて学ぶ Streamlit アプリ。',
		en: 'Streamlit app for learning PCA and NMF on grayscale images by comparing their bases and reconstructions.',
	},
	random_forest_app: {
		category: 'ml',
		ja: 'ランダムフォレストの決定境界が、木の本数を増やすにつれてどう変わるかをアニメーションで見る Streamlit アプリ。',
		en: 'Streamlit app that animates how a random forest’s decision boundary changes as the number of trees grows.',
	},

	// ── データ基盤・インフラ・ツール ──
	'snowflake-iot-cortex-rag': {
		category: 'infra',
		ja: 'Snowflake・dbt・Cortex Search・Cortex AI で、IoT センサーデータの収集・加工・異常検知から、RAG による原因分析までを通して実演する設備保全デモの設計書。',
		en: 'Design for an end-to-end predictive-maintenance demo on Snowflake, dbt, Cortex Search and Cortex AI: IoT data ingestion, transformation, anomaly detection and RAG-based root-cause analysis.',
		status: 'design',
	},
	cloudflare_basin_iceberg: {
		category: 'infra',
		ja: 'Cloudflare Workers で受けたリクエストをイベントとして Pipelines に送り、R2 上の Apache Iceberg テーブルに貯めて SQL で集計するサンプル。',
		en: 'Sample that sends Cloudflare Workers requests as events through Pipelines into an Apache Iceberg table on R2 and aggregates them with SQL.',
	},
	kafka_visualize_stream_app: {
		category: 'infra',
		ja: 'ローカルの Kafka に流した 3D 座標の JSON ストリームを、Streamlit と Plotly でリアルタイムに描画するアプリ。',
		en: 'Streams 3D-coordinate JSON through a local Kafka and renders it in real time with Streamlit and Plotly.',
	},
	simple_object_storage: {
		category: 'infra',
		ja: 'Go と Raft で S3 互換のオブジェクトストレージを自作するための設計メモ。メタデータ層・データ層・API 層の構成と MVP の範囲をまとめている。',
		en: 'Design notes for building an S3-compatible object store in Go with Raft, covering the metadata, data and API layers and the MVP scope.',
		status: 'design',
	},
	go_visualize_raft_app: {
		category: 'infra',
		ja: 'Raft のリーダー選出とハートビートを擬似的に生成し、Mermaid のシーケンス図としてブラウザに表示する Go の学習用デモ。',
		en: 'Go learning demo that simulates Raft leader election and heartbeats and draws them as a Mermaid sequence diagram in the browser.',
	},
	websocket_whiteboard_app: {
		category: 'infra',
		ja: 'TypeScript・Express・WebSocket で作った、複数の人が同時に描けるリアルタイム共有ホワイトボード。',
		en: 'Real-time collaborative whiteboard built with TypeScript, Express and WebSocket.',
	},
	git_uncommit_checker: {
		category: 'infra',
		ja: '指定したディレクトリの下にある Git リポジトリを探し、コミットしていないファイルを一覧にする Go の CLI。',
		en: 'Go CLI that finds Git repositories under a directory and lists their uncommitted files.',
	},
	go_todo_db_terminal: {
		category: 'infra',
		ja: 'Go と Redis で作ったターミナルの Todo アプリ。Docker Compose で動く。',
		en: 'Terminal Todo app in Go backed by Redis, run with Docker Compose.',
	},
	'green-moments': {
		category: 'infra',
		ja: '植物の観察日記アプリ（Flutter Web PWA・Firebase・Genkit）の設計書と実装計画。',
		en: 'Design and implementation plan for a plant-observation journal app (Flutter Web PWA, Firebase, Genkit).',
		status: 'design',
	},
	my_dev_environment: {
		category: 'infra',
		ja: 'Ghostty を中心に、ファイル操作・編集・Git・Docker・API・データベース・AI Coding Agent をターミナルで完結させる開発環境の構成。',
		en: 'Terminal-centric development environment built around Ghostty, covering files, editing, Git, Docker, APIs, databases and AI coding agents.',
	},
	'engineering-research-portfolio': {
		category: 'infra',
		ja: 'このポートフォリオサイト。Astro の静的出力で作り、GitHub Actions から Hugging Face Spaces にデプロイしている。',
		en: 'This portfolio site, built as a static Astro site and deployed to Hugging Face Spaces from GitHub Actions.',
	},
};
