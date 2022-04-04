import { CgArrowLongDown } from 'react-icons/cg';
import { GetStaticProps } from "next";

import SEO from 'components/shared/SEO';
import styles from 'styles/pages/Project.module.scss';
import Header from 'components/shared/Header';
import ProjectCard from 'components/pages/projects/ProjectCard';
import BannerWithCTA from 'components/shared/BannerWithCTA';
import { graphSDK } from "services/graphql-request";
import { ProjectsQuery } from "generated/sdk";

export default function Projects({ projects }: ProjectsQuery) {
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
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                projectId={project.slug}
                projectImage={project.cover.url}
                projectName={project.name}
                projectType={project.type}
                projectTechologies={project.technologies}
              />
            ))}

          </div>
          <BannerWithCTA
            CTAAction={() => console.log('OPA')}
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

export const getStaticProps: GetStaticProps = async () => {
  const { projects } = await graphSDK.Projects();
  console.log(projects);
  return {
    props: {
      projects,
    },
    revalidate: 60 * 60,
  };
};
