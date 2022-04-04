import { GetStaticPaths, GetStaticProps } from "next";

import { graphSDK } from "services/graphql-request";
import { ProjectQuery } from "generated/sdk";
import SEO from "components/shared/SEO";

export default function Project({ project }: ProjectQuery) {
  return (
    <>
      <SEO
        title={project.name}
        image={project.cover.thumbnailToSEO}
        description={project.description.slice(0, 150)}
      />
      <h1>{project.name}</h1>
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
    fallback: false,
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
