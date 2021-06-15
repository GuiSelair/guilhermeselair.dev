import Head from 'next/head';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

import styles from '../styles/pages/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Início - Guilherme Selair</title>
      </Head>
      <div className={styles.container}>
        <h1>Guilherme Selair</h1>
        <h3>Desenvolvedor Front-end</h3>

        <section className={styles.labelsGroup}>
          <Link href="/sobre">
            <a>
              <div>
                <h4>
                  Sobre mim
                </h4>
                <FiExternalLink />
              </div>
              <span>
                Olá, eu sou Guilherme Selair 👋
                Tenho 23 anos, sou desenvolvedor Front-end estudando para me tornar Full Stack.
              </span>
            </a>
          </Link>
          <Link href="/projetos">
            <a>
              <div>
                <h4>
                  Projetos realizados
                </h4>
                <FiExternalLink />
              </div>
              <span>
                A fome pelo aprendizado me guia constantemente pelo mundo das tecnologias.
                Em busca do novo, vou seguindo meu caminho sempre almejando o próximo nível.
              </span>
            </a>
          </Link>
        </section>
      </div>
    </>
  );
}
