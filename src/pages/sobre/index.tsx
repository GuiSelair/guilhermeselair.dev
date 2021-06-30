import Head from "next/head";
import { CgArrowLongDown } from "react-icons/cg";

import styles from "@styles/About.module.scss";

export default function About() {
  return (
    <div className={styles.backgroundWrapper}>
      <Head>
        <title>Sobre mim - Guilherme Selair</title>
      </Head>
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
                <strong>Tecnólogo em Redes de Computadores</strong>
                <span>Universidade Federal de Santa Maria | Ensino Médio</span>
              </li>
              <li>
                <strong>Técnico em Informática</strong>
                <span>
                  Escola Estadual de Ensino Médio Professora Maria Rocha |
                  Ensino Técnico
                </span>
              </li>
            </ul>
          </section>
          <section className={styles.tecnologiasTrabalhadas}>
            <h4>Tecnologias trabalhadas</h4>
            <div />
          </section>
          <section className={styles.experiencias}>
            <h4>Experiências na área de desenvolvimento</h4>
            <ul>
              <li>
                <strong>Estágio - Desenvolvedor Front-end</strong>
                <span className={styles.companyName}>
                  Empresa: Lunix Tecnologia
                </span>
                <span className="duration">Janeiro/2020 - Atual</span>
                <p>
                  Ingressei na empresa como estágiario a fim de solucionar um
                  problema de escalabilidade existente na criação de relatórios
                  de desempenho. Como alternativa foi desenvolvido uma
                  ferramenta que trouxe alta escalabilidade e automação para a
                  empresa.
                </p>
                <ul>
                  <li>
                    Selecionei Python como linguagem de programação visando seu
                    uso em Machine Learning e IA na análise de dados;
                  </li>
                  <li>
                    Junto com a equipe de desenvolvedores montamos uma REST API
                    flexível e escalável para obtenção dos dados necessários
                    para os relatórios;
                  </li>
                  <li>
                    <strong>
                      Com a ferramenta pronta foi possivel reduzir o tempo de
                      criação de relatórios de 3 dias para segundos, poupando
                      tempo e mão de obra.
                    </strong>
                  </li>
                </ul>
                <p>
                  Após a conclusão da ferramenta de automação, fiquei
                  responsavel pela construção do front-end da plataforma de
                  sorteios online da empresa.
                </p>
                <ul>
                  <li>
                    Escolhi utilizar o framework NextJS para a construção da
                    interface da plataforma devido ao seu foco em performance e
                    SEO.
                  </li>
                  <li>
                    Utilizei ContextAPI do ReactJS para a autenticação e
                    compartilhamento de informações dentro da plataforma.
                  </li>
                  <li>
                    <strong>
                      Com a plataforma em produção concluimos a marca de 2000
                      sorteios realizados no período de 1 meses.
                    </strong>
                  </li>
                </ul>
              </li>
              <hr />
              <li>
                <strong>Estágio - Desenvolvedor Full-stack</strong>
                <span className="company">
                  Escola de Ensino Médio Professora Maria Rocha
                </span>
                <span className="duration">Junho, 2019 - Agosto, 2019</span>
                <p>
                  Construi este projeto com objetivo de facilitar a comunicação
                  da escola com professores e estudantes. Para isso foi
                  modernizado o site da escola e implementado um portal cujo o
                  objetivo principal era facilitar o acesso as informações para
                  os estudantes, como notas, frequências e noticías importantes.
                </p>
                <ul>
                  <li>
                    Realizei diversas pesquisas com estudantes e professores
                    para encontrar a melhor experiência para usuário possível;
                  </li>
                  <li>
                    PHP foi a linguagem de programação utilizada e teve como
                    objetivo facilitar futuras implementações pelos
                    orientadores;
                  </li>
                  <li>
                    <strong>
                      Com o site atualizado, os alunos conseguiram consultar a
                      grade de cada curso disponível além de ficarem sabendo as
                      noticiais gerais da escola.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Após o portal finalizado, estudantes e professores
                      conseguiram melhorar sua comunicação.
                    </strong>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </main>
      {/* <span>© Guilherme Selair. 2021</span> */}
    </div>
  );
}
