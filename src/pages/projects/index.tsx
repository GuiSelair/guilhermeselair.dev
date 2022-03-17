import { CgArrowLongDown } from "react-icons/cg";

import SEO from "components/shared/SEO";
import styles from "styles/pages/Project.module.scss";
import Header from "components/shared/Header";
import ProjectCard from "components/pages/projects/ProjectCard";

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
            {' '}
            do próximo
            <b> nível!</b>
          </h1>
          <div className={styles.arrowSVG}>
            <CgArrowLongDown />
          </div>

          <div className={styles.projectContainer}>
            <ProjectCard
              projectImage="/images/project-thumbnail-example.png"
              projectName="Windfit"
              projectType="web"
              projectTechologies={["reactjs"]}
            />
            <ProjectCard
              projectImage="/images/project-thumbnail-example.png"
              projectName="Windfit"
              projectType="web"
              projectTechologies={["reactjs"]}
            />
            <ProjectCard
              projectImage="/images/project-thumbnail-example.png"
              projectName="Windfit"
              projectType="web"
              projectTechologies={["reactjs"]}
            />
          </div>
        </main>
      </div>
    </>
  );
}
