import { useMemo } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLongDown } from "react-icons/cg";

import SEO from "components/shared/SEO";
import styles from "styles/pages/Projects.module.scss";
import Header from "components/shared/Header";
import ProjectCard from "components/pages/projects/ProjectCard";
import BannerWithCTA from "components/shared/BannerWithCTA";
import { graphSDK } from "services/graphql-request";
import { ProjectsQuery } from "generated/sdk";
import Footer from "components/shared/Footer";

type IProjectChunk = ProjectsQuery["projects"][];

export default function Projects({ projects }: ProjectsQuery) {
	const projectsChunk = useMemo<IProjectChunk>(() => {
		const projectsBlocks = [];
		const projectPerBlock = 6;
		const chunkLimit = {
			start: 0,
			end: projectPerBlock,
		};
		const blocksOfProjects = Math.ceil(projects.length / projectPerBlock);
		for (let i = 0; i < blocksOfProjects; i++) {
			projectsBlocks.push(projects.slice(chunkLimit.start, chunkLimit.end));
			chunkLimit.start += projectPerBlock;
		}
		return projectsBlocks;
	}, [projects]);

	const hasProject = projectsChunk.length > 0;

	const highlightProject = projects[0];

	return (
		<>
			<SEO title="Projetos" />
			<div className={styles.backgroundContainer}>
				<Header />
				<main className={styles.container}>
					<h1>Em busca do próximo nível!</h1>
					<Link href={`/project/${highlightProject.slug}`}>
						<a className={styles.highlightContainer}>
							<Image
								src={highlightProject.cover.url}
								width={100}
								height={100}
								layout="responsive"
								className={styles.highlightImage}
							/>
							<div className={styles.highlightBadge}>DESTAQUE</div>
						</a>
					</Link>

					<div className={styles.arrowSVG}>
						<CgArrowLongDown />
					</div>

					<div className={styles.moreProjectDiviser}>
						<h4>MAIS PROJETOS</h4>
					</div>

					<div className={styles.projectContainer}>
						{hasProject &&
							projectsChunk[0].map((project) => (
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
						CTAAction={() => {}}
						CTAText="Entrar em contato"
						title="Procurando um desenvolvedor front-end?"
						description="Seus problemas acabaram!"
						backgroundColor="#2D2C2A"
						backgroundImage="message-icon.png"
						backgroundPositionX="3%"
						backgroundPositionY="110%"
					/>
				</main>
				<Footer />
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const { projects } = await graphSDK.Projects();
	return {
		props: {
			projects,
		},
		revalidate: 60 * 60 * 24, // 24 hours,
	};
};
