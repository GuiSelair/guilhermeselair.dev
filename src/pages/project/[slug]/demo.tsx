import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next/types";

import Footer from "components/shared/Footer";
import Header from "components/shared/Header";
import SEO from "components/shared/SEO";
import { graphSDK } from "services/graphql-request";

import styles from "styles/pages/Demo.module.scss";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { DemoQuery } from "generated/sdk";
import { FiExternalLink } from "react-icons/fi";

const DemoProject = ({ project }: DemoQuery) => {
	return (
		<>
			<SEO
				title={project.name}
				image={project.cover.thumbnailToSEO}
				description={`${project.description.slice(0, 150)}...`}
			/>
			<Header />
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
			<Footer />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { project } = await graphSDK.Demo({ slug: String(params.slug) });

	if (!project.hasDemo || !project.websiteUrl) {
		return {
			redirect: {
				permanent: false,
				destination: `/project/${project.slug}`,
			},
		};
	}

	return {
		props: {
			project,
		},
	};
};

export default DemoProject;
