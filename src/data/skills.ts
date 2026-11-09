/** 英語・日本語のペア */
export type L = { en: string; ja: string };

export interface Skill {
	area: L;
	/** 技術・製品名（固有名詞は両言語共通） */
	name: L;
	years: L;
	/** 第1カテゴリは主な経験、第2カテゴリ以降は習熟度 */
	detail: L;
}

export interface SkillCategory {
	id: string;
	title: L;
	/** detail 列の見出し */
	detailLabel: L;
	skills: Skill[];
}

const same = (s: string): L => ({ en: s, ja: s });
const y = (n: number | string): L =>
	typeof n === 'number'
		? { en: `${n} yr${n === 1 ? '' : 's'}`, ja: `${n}年` }
		: n === '<1'
			? { en: '< 1 yr', ja: '1年未満' }
			: { en: `${n.replace('+', '')}+ yrs`, ja: `${n.replace('+', '')}年以上` };

export const LEVELS = {
	advanced: { en: 'Advanced', ja: '上級' },
	intermediate: { en: 'Intermediate', ja: '中級' },
	beginner: { en: 'Beginner', ja: '初級' },
	research: { en: 'Research / PoC', ja: '研究・検証' },
	learning: { en: 'Learning', ja: '学習・検証' },
} as const satisfies Record<string, L>;

export const LEVEL_DEFINITIONS: { level: L; definition: L }[] = [
	{
		level: LEVELS.advanced,
		definition: {
			en: 'Can design, implement, operate, select technologies and mentor others',
			ja: '設計・実装・運用・技術選定・指導が可能',
		},
	},
	{
		level: LEVELS.intermediate,
		definition: {
			en: 'Can design, implement and solve problems independently',
			ja: '自力で設計・実装・課題解決が可能',
		},
	},
	{
		level: LEVELS.beginner,
		definition: { en: 'Can handle basic implementation and configuration', ja: '基本的な実装や設定が可能' },
	},
	{
		level: LEVELS.research,
		definition: {
			en: 'Experience with literature review, PoCs, experiments and evaluation',
			ja: '論文調査、PoC、実験・評価の経験がある',
		},
	},
	{
		level: LEVELS.learning,
		definition: {
			en: 'Understands the core concepts and is actively learning and experimenting',
			ja: '基本概念を理解し、学習や試行を進めている',
		},
	},
];

type Row = [area: L | string, name: L | string, years: number | string, level: keyof typeof LEVELS];
const toL = (v: L | string): L => (typeof v === 'string' ? same(v) : v);
const rows = (list: Row[]): Skill[] =>
	list.map(([area, name, years, level]) => ({
		area: toL(area),
		name: toL(name),
		years: y(years),
		detail: LEVELS[level],
	}));

const LEVEL_LABEL: L = { en: 'Proficiency', ja: '習熟度' };

/** スキルシート（myskill/skill_sheet.md）の内容。更新時はここを編集する。 */
export const SKILLS_UPDATED = { en: 'November 8, 2026', ja: '2026年11月8日' };

export const skillCategories: SkillCategory[] = [
	{
		id: 'management',
		title: {
			en: 'Technical Management, Architecture & R&D',
			ja: '技術マネジメント・アーキテクチャ・研究開発',
		},
		detailLabel: { en: 'Key experience', ja: '主な経験・対応領域' },
		skills: [
			{
				area: { en: 'Architecture', ja: 'アーキテクチャ' },
				name: { en: 'IT architecture design', ja: 'ITアーキテクチャ設計' },
				years: y(10),
				detail: {
					en: 'End-to-end system design, technology selection, distributed systems, cloud and AI platform design',
					ja: 'システム全体設計、技術選定、分散システム、クラウド・AI基盤設計',
				},
			},
			{
				area: { en: 'Technology strategy', ja: '技術戦略' },
				name: { en: 'Technology strategy planning', ja: '技術戦略策定' },
				years: y(6),
				detail: {
					en: 'Technology roadmaps, technology investment decisions, R&D direction',
					ja: '技術ロードマップ、技術投資判断、研究開発方針',
				},
			},
			{
				area: { en: 'Technical leadership', ja: '技術リーダーシップ' },
				name: { en: 'Tech lead', ja: 'テックリード' },
				years: y(3),
				detail: {
					en: 'Technical decision-making, design reviews, solving technical challenges, mentoring',
					ja: '技術的意思決定、設計レビュー、技術課題解決、育成',
				},
			},
			{
				area: { en: 'R&D', ja: '研究開発' },
				name: { en: 'Research & development', ja: '研究開発（R&D）' },
				years: y(4),
				detail: {
					en: 'AI and machine learning research, emerging technology surveys, PoCs, technical validation',
					ja: 'AI・機械学習の研究、先端技術調査、PoC、技術検証',
				},
			},
			{
				area: { en: 'Pre-sales', ja: 'プリセールス' },
				name: { en: 'Technical sales', ja: '技術営業' },
				years: y(2),
				detail: {
					en: 'Technical proposals, customer problem analysis, PoC proposals, solution design',
					ja: '技術提案、顧客課題分析、PoC提案、ソリューション設計',
				},
			},
			{
				area: { en: 'Project management', ja: 'プロジェクト管理' },
				name: { en: 'Project management', ja: 'プロジェクトマネジメント' },
				years: y(15),
				detail: {
					en: 'Requirements definition, planning, progress / quality / risk management, stakeholder coordination',
					ja: '要件定義、計画策定、進捗・品質・リスク管理、関係者調整',
				},
			},
		],
	},
	{
		id: 'software',
		title: { en: 'IT & Software Development', ja: 'IT・ソフトウェア開発' },
		detailLabel: LEVEL_LABEL,
		skills: rows([
			[{ en: 'Language', ja: '言語' }, 'Python', 8, 'advanced'],
			[{ en: 'Language', ja: '言語' }, 'C / C++', 20, 'advanced'],
			[{ en: 'Language', ja: '言語' }, 'Java', 3, 'intermediate'],
			[{ en: 'Language', ja: '言語' }, 'TypeScript', 5, 'intermediate'],
			[{ en: 'Language', ja: '言語' }, 'SQL', 8, 'advanced'],
			['OS', 'Linux / Ubuntu', '20+', 'advanced'],
			['OS', 'Windows / macOS', '15+', 'advanced'],
			[{ en: 'Containers', ja: 'コンテナ' }, 'Docker / Docker Compose', 7, 'advanced'],
			[{ en: 'Orchestration', ja: 'オーケストレーション' }, 'Kubernetes / Helm', 5, 'advanced'],
			['API', 'REST / FastAPI', 5, 'advanced'],
			['CI/CD', 'GitHub Actions / GitLab CI', 8, 'intermediate'],
			['DB', 'PostgreSQL / MySQL', 15, 'advanced'],
			['NoSQL', 'Redis / MongoDB', 3, 'intermediate'],
			[{ en: 'Design', ja: '設計' }, { en: 'Modeling (UML, etc.)', ja: 'UMLなどのモデリング' }, 8, 'advanced'],
		]),
	},
	{
		id: 'ai',
		title: { en: 'AI, Machine Learning & Generative AI', ja: 'AI・機械学習・生成AI' },
		detailLabel: LEVEL_LABEL,
		skills: rows([
			[{ en: 'Machine learning', ja: '機械学習' }, 'scikit-learn', 7, 'advanced'],
			[{ en: 'Deep learning', ja: '深層学習' }, 'PyTorch', 6, 'advanced'],
			[{ en: 'Deep learning', ja: '深層学習' }, 'TensorFlow / Keras', 3, 'intermediate'],
			[{ en: 'Generative AI', ja: '生成AI' }, 'LLM / Transformer', 3, 'advanced'],
			[{ en: 'Generative AI', ja: '生成AI' }, 'Hugging Face Transformers', 3, 'advanced'],
			[{ en: 'LLM inference', ja: 'LLM推論' }, 'vLLM / Ollama', 2, 'advanced'],
			['AI Agent', 'LangGraph / LangChain', 2, 'advanced'],
			['RAG', 'ChromaDB / FAISS / OpenSearch', 3, 'advanced'],
			['MLOps', 'MLflow / Langfuse', 2, 'advanced'],
			[{ en: 'Model evaluation', ja: 'モデル評価' }, 'RAGAS / DeepEval', 2, 'intermediate'],
			[{ en: 'Computer vision', ja: '画像認識' }, 'OpenCV / YOLO', 5, 'advanced'],
			[{ en: 'Reinforcement learning', ja: '強化学習' }, 'Gymnasium / Stable-Baselines3', 2, 'intermediate'],
			['VLA', { en: 'SmolVLA / π0 family', ja: 'SmolVLA / π0系' }, '<1', 'research'],
			['World Model', 'JEPA / Cosmos', '<1', 'research'],
		]),
	},
	{
		id: 'gpu',
		title: { en: 'GPU, HPC & AI Infrastructure', ja: 'GPU・HPC・AIインフラ' },
		detailLabel: LEVEL_LABEL,
		skills: rows([
			['GPU', 'NVIDIA H100', 1, 'intermediate'],
			['GPU', 'NVIDIA H200', 1, 'intermediate'],
			['GPU', { en: 'NVIDIA RTX series', ja: 'NVIDIA RTXシリーズ' }, 5, 'advanced'],
			[{ en: 'GPU programming', ja: 'GPUプログラミング' }, 'CUDA / CUDA Toolkit', 3, 'intermediate'],
			[{ en: 'GPU computing', ja: 'GPU計算' }, 'cuDNN / NCCL', 2, 'intermediate'],
			[{ en: 'Distributed training', ja: '分散学習' }, 'DeepSpeed', 1, 'intermediate'],
			[{ en: 'Distributed computing', ja: '分散処理' }, 'Ray', 1, 'intermediate'],
			[{ en: 'Inference platform', ja: '推論基盤' }, 'vLLM', 3, 'advanced'],
			[{ en: 'Model serving', ja: 'モデルサービング' }, 'KServe', 1, 'intermediate'],
			[{ en: 'GPU containers', ja: 'GPUコンテナ' }, 'NVIDIA Container Toolkit', 3, 'advanced'],
			[{ en: 'GPU operations', ja: 'GPU運用' }, 'nvidia-smi / DCGM', 3, 'advanced'],
			[{ en: 'GPU clusters', ja: 'GPUクラスタ' }, 'Kubernetes GPU Scheduling', 2, 'intermediate'],
		]),
	},
	{
		id: 'cloud',
		title: { en: 'Cloud & Data Platforms', ja: 'クラウド・データ基盤' },
		detailLabel: LEVEL_LABEL,
		skills: rows([
			[{ en: 'Cloud', ja: 'クラウド' }, 'AWS / Azure / GCP', 15, 'advanced'],
			[{ en: 'Generative AI platform', ja: '生成AI基盤' }, 'Amazon Bedrock / Microsoft Foundry', 2, 'intermediate'],
			[{ en: 'Containers', ja: 'コンテナ' }, 'EKS / ECS', 6, 'advanced'],
			[{ en: 'Serverless', ja: 'サーバーレス' }, 'Lambda / Step Functions', 6, 'advanced'],
			[{ en: 'Data platform', ja: 'データ基盤' }, 'Snowflake', '<1', 'learning'],
			[{ en: 'Data platform', ja: 'データ基盤' }, 'Databricks', '<1', 'learning'],
			['IaC', 'Terraform', 3, 'intermediate'],
			[{ en: 'Monitoring', ja: '監視' }, 'Prometheus / Grafana', 4, 'advanced'],
			[{ en: 'Distributed tracing', ja: '分散トレーシング' }, 'OpenTelemetry', 2, 'intermediate'],
		]),
	},
	{
		id: 'robotics',
		title: { en: 'Robotics & Physical AI', ja: 'ロボティクス・Physical AI' },
		detailLabel: LEVEL_LABEL,
		skills: rows([
			[{ en: 'Robot middleware', ja: 'ロボットミドルウェア' }, 'ROS 2', 1, 'intermediate'],
			[{ en: 'Robot simulation', ja: 'ロボットシミュレーション' }, 'Isaac Sim / Isaac Lab', 1, 'research'],
			[{ en: 'Simulation', ja: 'シミュレーション' }, 'MuJoCo / CoppeliaSim', '<1', 'research'],
			[{ en: 'Manipulator', ja: 'マニピュレータ' }, 'SO-ARM101', '<1', 'research'],
			[{ en: 'Mobile robot', ja: '移動ロボット' }, 'TurtleBot3', '<1', 'research'],
			[{ en: 'Sensors', ja: 'センサ' }, 'RealSense / LiDAR', 1, 'intermediate'],
			['Physical AI', 'VLA / World Model', '<1', 'research'],
			[{ en: 'Spatial AI', ja: '空間AI' }, 'Scene Graph / 3DGS', '<1', 'research'],
		]),
	},
];
