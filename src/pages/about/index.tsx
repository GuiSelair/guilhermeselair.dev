import Head from "next/head";
import { CgArrowLongDown } from "react-icons/cg";
import Image from "next/image";
import {
  Tab, Tabs, TabList, TabPanel,
} from "react-tabs";

import styles from "@styles/About.module.scss";
import Header from "components/shared/Header";
import Label from "components/shared/Label";
import ProfessionalExperiencesSection from "components/pages/about/ProfessionalExperiencesSection";
import DownloadProfessionalResumeBanner from "components/pages/about/DownloadProfessionalResumeBanner";
import TechnologiesWorked from "components/pages/about/TechnologiesWorked";

export default function About() {
  return (
    <div className={styles.backgroundWrapper}>
      <Head>
        <title>Sobre mim - Guilherme Selair</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h2>
          Construindo a melhor
          <b> experiência </b>
          para seus clientes!
        </h2>

        <div className={styles.arrowSVG}>
          <CgArrowLongDown />
        </div>

        <div className={styles.aboutContainerDesktop}>
          <section className={styles.declaracoesPessoais}>
            <h4>Declarações pessoais</h4>
            <p>
              Trabalho com programação desde 2018 e já desenvolvi diversos
              projetos web que impactaram mais de 3000 pessoas. Dentro da área,
              experiência do usuário e estatisticas sobre desempenho me
              interessam.
            </p>
          </section>
          <section className={styles.cursosCertificacoes}>
            <h4>Cursos e Certificações</h4>
            <ul>
              <li>
                <strong>Ignite - Trilha React</strong>
                <span>Rocketseat</span>
                <span>Conclusão: 2021</span>
              </li>
              <li>
                <strong>Bootcamp GoStack</strong>
                <span>Rocketseat</span>
                <span>Conclusão: 2021</span>
              </li>
              <li>
                <strong>JavaScript - Curso COMPLETO</strong>
                <span>HCode (Udemy)</span>
                <span>Conclusão: 2020</span>
              </li>
            </ul>
          </section>
          <section className={styles.formacaoEducacional}>
            <h4>Formação Educacional</h4>
            <ul>
              <li>
                <strong>
                  Tecnólogo em Redes de Computadores
                  <Label text="Ensino Superior" />
                </strong>
                <span>Universidade Federal de Santa Maria</span>
              </li>
              <li>
                <strong>
                  Técnico em Informática
                  <Label text="Ensino Técnico" />
                </strong>
                <span>
                  Escola Estadual de Ensino Médio Professora Maria Rocha
                </span>
              </li>
            </ul>
          </section>
          <TechnologiesWorked />
          <ProfessionalExperiencesSection />
        </div>

        <div className={styles.aboutContainerMobile}>
          <Tabs className={styles.aboutContent}>
            <TabList>
              <Tab>Sobre mim</Tab>
              <Tab>Minhas experiências</Tab>
            </TabList>

            <TabPanel>
              <section className={styles.declaracoesPessoais}>
                <h4>Declarações pessoais</h4>
                <p>
                  Trabalho com programação desde 2018 e já desenvolvi diversos
                  projetos web que impactaram mais de 3000 pessoas. Dentro da área,
                  experiência do usuário e estatisticas sobre desempenho me
                  interessam.
                </p>
              </section>
              <section className={styles.cursosCertificacoes}>
                <h4>Cursos e Certificações</h4>
                <ul>
                  <li>
                    <strong>Ignite - Trilha React</strong>
                    <span>Rocketseat</span>
                    <span>Conclusão: 2021</span>
                  </li>
                  <li>
                    <strong>Bootcamp GoStack</strong>
                    <span>Rocketseat</span>
                    <span>Conclusão: 2021</span>
                  </li>
                  <li>
                    <strong>JavaScript - Curso COMPLETO</strong>
                    <span>HCode (Udemy)</span>
                    <span>Conclusão: 2020</span>
                  </li>
                </ul>
              </section>
              <section className={styles.formacaoEducacional}>
                <h4>Formação Educacional</h4>
                <ul>
                  <li>
                    <strong>
                      Tecnólogo em Redes de Computadores
                      <Label text="Ensino Superior" />
                    </strong>
                    <span>Universidade Federal de Santa Maria</span>
                  </li>
                  <li>
                    <strong>
                      Técnico em Informática
                      <Label text="Ensino Técnico" />
                    </strong>
                    <span>
                      Escola Estadual de Ensino Médio Professora Maria Rocha
                    </span>
                  </li>
                </ul>
              </section>
              <section className={styles.tecnologiasTrabalhadas}>
                <h4>Tecnologias trabalhadas</h4>
                <div>
                  <Image
                    src="/images/thumbnails/Typescript-Thumb.png"
                    width={49}
                    height={49}
                    title="Typescript"
                  />
                  <Image
                    src="/images/thumbnails/React-Thumb.png"
                    width={49}
                    height={49}
                    title="ReactJS"
                  />
                  <Image
                    src="/images/thumbnails/NextJS-Thumb.png"
                    width={49}
                    height={49}
                    title="NextJS"
                  />
                  <Image
                    src="/images/thumbnails/Typescript-Thumb.png"
                    width={49}
                    height={49}
                    title="Typescript"
                  />
                  <Image
                    src="/images/thumbnails/Typescript-Thumb.png"
                    width={49}
                    height={49}
                    title="Typescript"
                  />
                  <Image
                    src="/images/thumbnails/Typescript-Thumb.png"
                    width={49}
                    height={49}
                    title="Typescript"
                  />
                </div>
              </section>
            </TabPanel>
            <TabPanel>
              <ProfessionalExperiencesSection />
            </TabPanel>
          </Tabs>
        </div>

        <DownloadProfessionalResumeBanner />
      </main>
      {/* <span>© Guilherme Selair. 2021</span> */}
    </div>
  );
}
