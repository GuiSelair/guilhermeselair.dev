import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { SEO } from "@components/shared";
import { useHome } from "@hooks/useHome";
import styles from "@styles/pages/Home.module.scss";

export default function Home() {
	const { name, roles, navItems } = useHome();

	return (
		<>
			<SEO
				title="Guilherme Selair - Desenvolvedor de Software e Líder Técnico"
				description="Olá! Eu sou Guilherme Selair, desenvolvedor de software e líder técnico. Venha me conhecer melhor e dê uma olhada nos projetos que já fiz 🖖"
				shouldExcludeTitleSuffix
			/>
			<main className={styles.container}>
				<p className={styles.roles}>{roles}</p>
				<h1 className={styles.name}>{name}</h1>

				<nav aria-label="Seções principais" className={styles.nav}>
					<ol className={styles.index}>
						{navItems.map((item) => (
							<li key={item.id}>
								<Link href={item.href}>
									<a className={styles.indexLink}>
										<span className={styles.indexNumber} aria-hidden="true">
											{item.index}
										</span>
										<span className={styles.indexTitle}>{item.title}</span>
										<span className={styles.indexDescription}>
											{item.description}
										</span>
										<FiArrowRight
											className={styles.indexArrow}
											aria-hidden="true"
										/>
									</a>
								</Link>
							</li>
						))}
					</ol>
				</nav>
			</main>
		</>
	);
}
