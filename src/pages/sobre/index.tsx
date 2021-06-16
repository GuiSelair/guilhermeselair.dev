import Head from 'next/head';
import { CgArrowLongDown } from 'react-icons/cg';

import styles from '@styles/About.module.scss';

export default function About() {
  return (
    <div className={styles.backgroundWrapper}>
      <Head>
        <title>Início - Guilherme Selair</title>
      </Head>
      <main className={styles.container}>
        <h2>
          Construindo a melhor
          <b> experiência </b>
          para seus clientes!
        </h2>
        <CgArrowLongDown />
      </main>
      <span>© Guilherme Selair. 2021</span>
    </div>
  );
}
