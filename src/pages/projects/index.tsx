import { CgArrowLongDown } from "react-icons/cg";

import SEO from "components/shared/SEO";
import styles from "styles/pages/Project.module.scss";
import Header from "components/shared/Header";
import ProjectCard from "components/pages/projects/ProjectCard";
import BannerWithCTA from "components/shared/BannerWithCTA";

export default function Projects() {
  return (
    <>
      <SEO title="Projetos" />
      <div className={styles.backgroundContainer}>
        <Header />
        <main className={styles.container}>
          <h1>
            Em busca
            <br />
            do próximo
            <b> nível!</b>
          </h1>
          <div className={styles.arrowSVG}>
            <CgArrowLongDown />
          </div>

          <div className={styles.projectContainer}>
            <ProjectCard
              projectId="1"
              projectImage="/images/project-thumbnail-example.png"
              projectName="Windfit"
              projectType="web"
              projectTechologies={["react"]}
            />
            <ProjectCard
              projectId="2"
              projectImage="/images/project-thumbnail-example.png"
              projectName="Opa! Ganhei - Plataforma de sorteios online"
              projectType="mobile"
              projectTechologies={["react"]}
            />
            <ProjectCard
              projectId="3"
              projectImage="/images/project-thumbnail-example.png"
              projectName="Move.it - NLW#04"
              projectType="desktop"
              projectTechologies={["react", "typescript"]}
            />
          </div>
          <BannerWithCTA
            CTAAction={() => console.log("OPA")}
            CTAText="Entrar em contato"
            title="Procurando um desenvolvedor front-end?"
            description="Seus problemas acabaram!"
            backgroundColor="#2D2C2A"
            backgroundImage="message-icon.png"
            backgroundPositionX="3%"
            backgroundPositionY="110%"
          />
        </main>
      </div>
    </>
  );
}
