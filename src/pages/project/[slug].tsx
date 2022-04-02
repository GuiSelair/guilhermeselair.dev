import SEO from "components/shared/SEO";

type IProject = {
	projectSlug: string;
}

export default function Project({ projectSlug }: IProject) {
  return (
    <SEO
      title="Projeto"
    />
  );
}
