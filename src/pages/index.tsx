import Head from "next/head";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.backgroundWrapper}>
      <Head>
        <title>Início - Guilherme Selair</title>
      </Head>
      <main className={styles.container}>
        <h1>Guilherme Selair</h1>
        <h3>Desenvolvedor Front-end</h3>

        <section className={styles.labelsGroup}>
          <Link href="/about">
            <a>
              <div>
                <h4>Sobre mim 👋</h4>
                <FiExternalLink />
              </div>
              <span>
                Tenho 23 anos, sou desenvolvedor Front-end estudando para me
                tornar Full Stack.
              </span>
            </a>
          </Link>
          <Link href="/projects">
            <a>
              <div>
                <h4>Projetos realizados</h4>
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
      <span>© Guilherme Selair. 2021</span>
    </div>
  );
}
