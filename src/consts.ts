export const SITE = {
	name: 'Masahiro Muto',
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
	researchThemes: ['Robot Foundation Models', 'Spatial AI'],
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
	{ label: 'Home Lab', labelJa: 'ホームラボ', href: '/lab' },
	{ label: 'Equipment', labelJa: '機材', href: '/equipment' },
	{ label: 'Research Blog', labelJa: '研究ブログ', href: '/blog' },
	{ label: 'Papers', labelJa: '論文', href: '/papers' },
	{ label: 'Presentations', labelJa: '発表資料', href: '/presentations' },
	{ label: 'Volunteer', labelJa: 'ボランティア', href: '/volunteer' },
	{ label: 'About', labelJa: 'プロフィール', href: '/about' },
] as const;
