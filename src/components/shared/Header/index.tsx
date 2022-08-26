import {
	AiOutlineWhatsApp,
	AiFillGithub,
	AiFillLinkedin,
} from "react-icons/ai";
import { HiArrowNarrowLeft, HiOutlineLockClosed } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";

import { basicInfos } from "@configs/basicInfos";
import style from "./style.module.scss";

export function Header() {
	const router = useRouter();
	const isSubPage = router.pathname.includes("/project/");

	function goBack() {
		const isDemoPage = router.asPath.endsWith("/demo");

		if (isDemoPage) return router.push(`/project/${router.query.slug}`);

		return router.push(`/projects`);
	}

	return (
		<header className={style.container}>
			<div className={style.leftSide}>
				{isSubPage ? (
					<button type="button" title="Voltar" onClick={goBack}>
						<HiArrowNarrowLeft />
					</button>
				) : (
					<Link href="/">
						<a>S</a>
					</Link>
				)}
			</div>
			<nav className={style.centerNav}>
				<ul>
					<li>
						<Link href="/">
							<a className={router.pathname === "/" ? style.isSelected : ""}>
								<span>HOME</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="/about">
							<a
								className={router.pathname === "/about" ? style.isSelected : ""}
							>
								<span>SOBRE</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="/projects">
							<a
								className={
									router.pathname === "/projects" || isSubPage
										? style.isSelected
										: ""
								}
							>
								<span>PROJETOS</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="#">
							<a className={style.isDisabled} tabIndex={-1}>
								<span>
									ARTIGOS
									<HiOutlineLockClosed />
								</span>
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			<div className={style.rightSide}>
				<a
					title="Entrar em contato por Whatsapp"
					href={`${basicInfos.whatsapp}?phone=${basicInfos.phone}`}
					target="_blank"
					rel="noreferrer"
				>
					<AiOutlineWhatsApp />
				</a>
				<a
					title="Veja meu Linkedin"
					href={basicInfos.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					<AiFillLinkedin />
				</a>
				<a
					title="Veja meu Github"
					href={basicInfos.github}
					target="_blank"
					rel="noreferrer"
				>
					<AiFillGithub />
				</a>
			</div>
		</header>
	);
}
