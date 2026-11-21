import { basicInfos } from "@configs/basicInfos";

export interface HomeNavItem {
	id: string;
	index: string;
	title: string;
	href: string;
}

const NAV_ITEMS: HomeNavItem[] = [
	{
		id: "about",
		index: "01",
		title: "Sobre mim",
		href: "/about",
	},
	{
		id: "projects",
		index: "02",
		title: "Projetos",
		href: "/projects",
	},
];

const ROLES = ["Desenvolvedor de software", "Líder técnico"];

const SUMMARY =
	"Eterno aprendiz de desenvolvedor, com foco no ecossistema Javascript.";

export function useHome() {
	return {
		name: "Guilherme Selair",
		roles: ROLES.join(" · "),
		summary: SUMMARY,
		email: basicInfos.email,
		navItems: NAV_ITEMS,
	};
}
