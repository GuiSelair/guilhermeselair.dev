import Head from "next/head";
import { CgArrowLongDown } from "react-icons/cg";
import Image from "next/image";

import styles from "@styles/About.module.scss";
import Header from "components/Header";
import Label from "components/Label";

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

        <div className={styles.aboutContainer}>
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
          <section className={styles.experiencias}>
            <h4>Experiências na área de desenvolvimento</h4>
            <ul>
              <li>
                <strong>Desenvolvedor Full-stack</strong>
                <span className={styles.companyName}>
                  Empresa: Easy Auth Sistemas
                </span>
                <span className="duration">Julho/2021 - Atual</span>
                <p>
                  Utilizando Javascript de ponta-a-ponta auxiliei na construção de uma plataforma de eventos esportivos. Integração com gateways de pagamentos como Stripe, armazenamento de dados e envio de emails/SMS através da AWS e utilização de GraphQL para obtenção de dados foram algumas tecnologias e ferramentas utilizadas.
                </p>
                <p>Com a plataforma em produção, ela já conta com mais de 1000 atletas inscritos em diferentes eventos distribuídos em todo o estado do Rio Grande do Sul.</p>
              </li>
              <li>
                <strong>Estágio - Desenvolvedor Front-end</strong>
                <span className={styles.companyName}>
                  Empresa: Lunix Tecnologia
                </span>
                <span className="duration">Janeiro/2020 - Julho/2021</span>
                <p>
                  Ingressei na empresa como estagiário a fim de solucionar um problema de escalabilidade existente na criação de relatórios de desempenho. Como alternativa utilizando python foi desenvolvido uma ferramenta que trouxe alta escalabilidade e automação para a empresa. Com a ferramenta foi possível reduzir o tempo de criação de relatórios de 3 dias para segundos, poupando tempo e mão de obra.
                </p>
                <p>
                  Após a conclusão da ferramenta de automação, fiquei responsável pela construção do front-end da plataforma de sorteios online da empresa. Utilizando React com NextJS, a plataforma atingiu a marca de 5000 sorteios realizados em 3 meses.
                </p>
              </li>
              <li>
                <strong>Estágio - Desenvolvedor Full-stack</strong>
                <span className="company">
                  Escola de Ensino Médio Professora Maria Rocha
                </span>
                <span className="duration">Junho, 2019 - Agosto, 2019</span>
                <p>
                  Utilizando PHP, Javascript e MYSQL construí um projeto com objetivo de facilitar a comunicação da escola com professores e estudantes. Para isso foi modernizado o site da escola e implementado um portal cujo o objetivo principal era facilitar o acesso as informações para os estudantes, como notas, frequências e notícias importantes. Após algumas entrevistas com alunos e professores sobre usabilidade e interface, alunos, professores e a equipe diretiva conseguiram se comunicar mais facilmente através da plataforma sendo utilizada até hoje.
                </p>

              </li>
            </ul>
          </section>
        </div>

        <div className={styles.downloadProfessionalResume}>
          <div>
            <h4>Prefere da maneira tradicional?</h4>
            <span>Sem problemas, baixe meu currículo em PDF</span>
          </div>
          <button type="button">Baixar currículo</button>
        </div>
      </main>
      {/* <span>© Guilherme Selair. 2021</span> */}
    </div>
  );
}
