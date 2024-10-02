import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { HiOutlineClock, HiOutlineExternalLink } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

import { graphSDK } from "@services/graphql-request";
import { ProjectQuery } from "@generated/sdk";
import { SEO, ShowTechnologiesThumnails } from "@components/shared";
import { ProjectCarousel } from "@components/pages/project";
import style from "@styles/pages/Project.module.scss";

export default function Project({ project }: ProjectQuery) {
	const projectGallery = useMemo(
		() => [
			{
				src: project.cover.url,
				id: project.cover.id,
			},
			...project.gallery.map((image) => ({
				src: image.url,
				id: image.id,
			})),
		],
		[project]
	);

	return (
		<>
			<SEO
				title={project.name}
				image={project.cover.thumbnailToSEO}
				description={`${project.description.slice(0, 150)}...`}
			/>
			<div className={style.container}>
				<h1>{project.name}</h1>
				<ProjectCarousel gallery={projectGallery} />

				<div className={style.content}>
					<h2>DESCRIÇÃO</h2>
					<ReactMarkdown className={style.markdownContent}>
						{project.description}
					</ReactMarkdown>

					<div className={style.additionalSectionGridContainer}>
						<section className={style.tecnologiesUsed}>
							<h3>PRINCIPAIS TECNOLOGIAS UTILIZADAS</h3>
							<ShowTechnologiesThumnails
								size="md"
								technologies={project.technologies}
							/>
						</section>
						{(!!project.githubUrl ||
							!!project.websiteUrl ||
							project.hasDemo) && (
							<section className={style.viewMore}>
								<h3>VEJA MAIS</h3>
								<div>
									{!!project.githubUrl && (
										<a
											href={project.githubUrl}
											className={style.githubLink}
											target="_blank"
											rel="noopener noreferrer"
										>
											REPOSITORIO NO GITHUB
											<AiFillGithub />
										</a>
									)}
									{!!project.websiteUrl && !project.hasDemo && (
										<a
											href={project.websiteUrl}
											className={style.websiteLink}
											target="_blank"
											rel="noopener noreferrer"
										>
											VEJA O PROJETO
											<HiOutlineExternalLink />
										</a>
									)}
									{!!project.websiteUrl && project.hasDemo && (
										<Link href={`/project/${project.slug}/demo`} passHref>
											<a className={style.websiteLink}>
												VEJA A DEMO
												<HiOutlineExternalLink />
											</a>
										</Link>
									)}
									{project.hasDemo && !project.websiteUrl && (
										<button className={style.demoButton} disabled>
											EM BREVE DEMO
											<HiOutlineClock />
										</button>
									)}
								</div>
							</section>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { projects } = await graphSDK.SlugsOfProjects();

	return {
		paths: projects.map((project) => ({
			params: {
				slug: project.slug,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { project } = await graphSDK.Project({ slug: String(params.slug) });
	return {
		props: {
			project,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
