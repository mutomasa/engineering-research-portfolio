export const SITE = {
	name: 'Masahiro Muto',
	title: 'AI Engineer & Robotics Researcher · Quantum Technology Enthusiast',
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
	{ label: 'Home', href: '/' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Home Lab', href: '/lab' },
	{ label: 'Equipment', href: '/equipment' },
	{ label: 'Research Blog', href: '/blog' },
	{ label: 'Papers', href: '/papers' },
	{ label: 'Presentations', href: '/presentations' },
	{ label: 'About', href: '/about' },
] as const;
