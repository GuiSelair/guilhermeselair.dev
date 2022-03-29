import React from 'react';
import { GetServerSideProps } from "next";

type IProject = {
	projectSlug: string;
}

export default function Project({ projectSlug }: IProject) {
  return (
    <div>
      Project-
      {projectSlug}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;
  console.log(slug);
  return {
    props: {
      projectSlug: slug,
    },
  };
};
