import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import { SEO } from "@components/shared";
import styles from "../styles/pages/Home.module.scss";

export default function Home() {
	return (
		<>
			<SEO
				title="Guilherme Selair - Desenvolvedor de Software"
				description="Olá! Eu sou Guilherme Selair, desenvolvedor de software. Venha me conhecer melhor e dê uma olhada nos projetos que já fiz 🖖"
				shouldExcludeTitleSuffix
			/>
			<main className={styles.container}>
				<div>
					<h1>Guilherme Selair</h1>
				</div>
				<h2>Desenvolvedor de software</h2>

				<section className={styles.labelsGroup}>
					<Link href="/about">
						<a>
							<div>
								<h3>Sobre mim </h3>
								<FiExternalLink />
							</div>
							<span>
								Tenho 25 anos, sou desenvolvedor estudando para me especializar
								em Javascript.
							</span>
						</a>
					</Link>
					<Link href="/projects">
						<a>
							<div>
								<h3>Projetos realizados</h3>
								<FiExternalLink />
							</div>
							<span>
								Em busca do novo, vou seguindo meu caminho sempre almejando o
								próximo nível.
							</span>
						</a>
					</Link>
				</section>
			</main>
		</>
	);
}
