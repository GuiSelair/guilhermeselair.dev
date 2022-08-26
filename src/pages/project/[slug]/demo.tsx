import React from "react";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineArrowSmDown } from "react-icons/hi";

import { SEO } from "@components/shared";
import { graphSDK } from "@services/graphql-request";
import { DemoQuery } from "@generated/sdk";
import styles from "@styles/pages/Demo.module.scss";

const DemoProject = ({ project }: DemoQuery) => {
	return (
		<>
			<SEO
				title={project.name}
				image={project.cover.thumbnailToSEO}
				description={`${project.description.slice(0, 150)}...`}
			/>
			<div className={styles.container}>
				<h1>{project.name}</h1>
				<span>
					<HiOutlineArrowSmDown />
					Abaixo esta uma demonstração navegavel do projeto em questão.
					<HiOutlineArrowSmDown />
				</span>
				<iframe
					className={styles.iframeContainer}
					src={project.websiteUrl}
					frameBorder="0"
					loading="lazy"
				/>
				<a
					href={project.websiteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.linkToDemo}
				>
					Ir até link da demonstração
					<FiExternalLink />
				</a>
			</div>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const { projects } = await graphSDK.ProjectsWithDemo();

	return {
		paths: projects.map((project) => ({
			params: {
				slug: project.slug,
			},
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { project } = await graphSDK.Demo({ slug: String(params.slug) });

	if (!project.hasDemo || !project.websiteUrl) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			project,
		},
		revalidate: 60 * 60 * 24, // 24hours
	};
};

export default DemoProject;
