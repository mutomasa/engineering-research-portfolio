export const SITE = {
	name: 'Masahiro Muto',
	nameJa: '武藤雅裕',
	title: 'AI Engineer & Robotics Researcher · Quantum Technology Enthusiast',
	titleJa: 'AIエンジニア・ロボティクス研究者・量子技術愛好家',
	description:
		'Research portfolio of Masahiro Muto: Physical AI, World Models, AI Agents and Knowledge Science.',
	github: {
		user: 'mutomasa',
		url: 'https://github.com/mutomasa',
		reposUrl: 'https://github.com/mutomasa?tab=repositories',
	},
	speakerdeck: {
		user: 'mutomasa',
		url: 'https://speakerdeck.com/mutomasa',
	},
	huggingface: {
		user: 'mutomasa',
		url: 'https://huggingface.co/mutomasa',
		spacesUrl: 'https://huggingface.co/mutomasa/spaces',
	},
	researchThemes: ['Robot Foundation Models', 'Spatial AI', 'Agentic Robotics'],
	researchAreas: [
		'Robot Foundation Models',
		'Vision-Language-Action (VLA)',
		'World Models',
		'Tactile Sensing',
		'Spatial AI',
		'Scene Graphs',
		'Gaussian Splatting',
	],
} as const;

export const NAV = [
	{ label: 'Home', labelJa: 'ホーム', href: '/' },
	{ label: 'Projects', labelJa: 'プロジェクト', href: '/projects' },
	{ label: 'Portfolio', labelJa: 'ポートフォリオ', href: '/portfolio' },
	{ label: 'AI/IT Tech', labelJa: 'AI/IT技術', href: '/tech' },
	{ label: 'Research', labelJa: '研究内容', href: '/research' },
	{ label: 'Research Blog', labelJa: '研究ブログ', href: '/blog' },
	{ label: 'Presentations', labelJa: '発表資料', href: '/presentations' },
	{ label: 'Skills', labelJa: 'スキル', href: '/skills' },
	{ label: 'Home Lab', labelJa: 'ホームラボ', href: '/lab' },
	{ label: 'Equipment', labelJa: '機材', href: '/equipment' },
	{ label: 'Volunteer', labelJa: 'ボランティア', href: '/volunteer' },
	{ label: 'About', labelJa: 'プロフィール', href: '/about' },
] as const;
