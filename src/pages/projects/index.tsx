import { useMemo } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { CgArrowLongDown } from "react-icons/cg";

import { SEO } from "@components/shared";
import { ProjectCard } from "@components/pages/projects";
import { graphSDK } from "@services/graphql-request";
import { ProjectsQuery } from "@generated/sdk";
import styles from "@styles/pages/Projects.module.scss";

type IProjectChunk = ProjectsQuery["projects"][];

export default function Projects({ projects }: ProjectsQuery) {
	const projectsChunk = useMemo<IProjectChunk>(() => {
		const projectsBlocks = [];
		const projectPerBlock = 6;
		const chunkLimit = {
			start: 0,
			end: projectPerBlock,
		};
		const totalBlocksOfProjects = Math.ceil(projects.length / projectPerBlock);
		for (let i = 0; i < totalBlocksOfProjects; i++) {
			projectsBlocks.push(projects.slice(chunkLimit.start, chunkLimit.end));
			chunkLimit.start += projectPerBlock;
			chunkLimit.end += projectPerBlock;
		}

		return projectsBlocks;
	}, [projects]);

	const hasProject = projectsChunk.length > 0;
	const highlightProject = projects.find((project) => project.isHighlight) || projects[1];

	return (
		<>
			<SEO
				title="Projetos"
				description="Veja um pouco sobre os projetos que já participei/fiz."
			/>
			<main className={styles.container}>
				<h1>Em busca do próximo nível!</h1>
				<Link href={`/project/${highlightProject.slug}`}>
					<a className={styles.highlightContainer}>
						<Image
							src={highlightProject.cover.url}
							width={100}
							height={100}
							priority
							layout="responsive"
							className={styles.highlightImage}
							alt="Imagem capa do projeto em destaque"
						/>
						<div className={styles.highlightBadge}>DESTAQUE</div>
					</a>
				</Link>

				<div className={styles.arrowSVG}>
					<CgArrowLongDown />
				</div>

				<div className={styles.moreProjectDiviser}>
					<h2>MAIS PROJETOS</h2>
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
				<div className={styles.projectContainer}>
					{hasProject &&
						projectsChunk[1].map((project) => (
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
			</main>
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
