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
	researchAreas: ['Physical AI', 'World Models', 'AI Agents', 'Knowledge Science'],
} as const;

export const NAV = [
	{ label: 'Home', href: '/' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Home Lab', href: '/lab' },
	{ label: 'Research Blog', href: '/blog' },
	{ label: 'Papers', href: '/papers' },
	{ label: 'Presentations', href: '/presentations' },
	{ label: 'About', href: '/about' },
] as const;
