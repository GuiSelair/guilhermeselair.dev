export interface HomeNavItem {
	id: string;
	index: string;
	title: string;
	description: string;
	href: string;
}

const NAV_ITEMS: HomeNavItem[] = [
	{
		id: "about",
		index: "01",
		title: "Sobre mim",
		description:
			"Eterno aprendiz de desenvolvedor, com foco no ecossistema Javascript.",
		href: "/about",
	},
	{
		id: "projects",
		index: "02",
		title: "Projetos",
		description:
			"Busco sempre expandir meus conhecimentos explorando novas tecnologias para assim entregar aplicações de ponta-a-ponta com qualidade.",
		href: "/projects",
	},
];

const ROLES = ["Desenvolvedor de software", "Líder técnico"];

export function useHome() {
	return {
		name: "Guilherme Selair",
		roles: ROLES.join(" · "),
		navItems: NAV_ITEMS,
	};
}
