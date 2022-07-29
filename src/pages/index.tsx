import Footer from "components/shared/Footer";
import Header from "components/shared/Header";
import SEO from "components/shared/SEO";
import Head from "next/head";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import styles from "../styles/pages/Home.module.scss";

export default function Home() {
	return (
		<div className={styles.backgroundWrapper}>
			<SEO
				title="Guilherme Selair - Desenvolvedor de Software"
				description="Olá! Eu sou Guilherme Selair, desenvolvedor de software. Venha me conhecer melhor e dê uma olhada nos projetos que já fiz 🖖"
				shouldExcludeTitleSuffix
			/>
			<Header />
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
								Tenho 24 anos, sou desenvolvedor estudando para me especializar
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
			<Footer />
		</div>
	);
}
