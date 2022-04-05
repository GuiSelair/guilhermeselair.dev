import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { Carousel } from "react-responsive-carousel";
import ReactMarkdown from "react-markdown";
import { HiArrowNarrowLeft, HiArrowNarrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";

import { graphSDK } from "services/graphql-request";
import { ProjectQuery } from "generated/sdk";
import SEO from "components/shared/SEO";
import Header from "components/shared/Header";
import Footer from "components/shared/Footer";
import style from "styles/pages/Project.module.scss";
import { getThumbnailFilename } from "utils/getThumbnailFilename";

export default function Project({ project }: ProjectQuery) {
  const projectGallery = useMemo(
    () => [project.cover.url, ...project.gallery.map((image) => image.url)],
    [project],
  );

  const hasProjectGalleryImages = project.gallery.length;

  return (
    <>
      <SEO
        title={project.name}
        image={project.cover.thumbnailToSEO}
        description={`${project.description.slice(0, 150)}...`}
      />
      <Header />
      <div className={style.container}>
        <h1>{project.name}</h1>
        {hasProjectGalleryImages
          ? (
            <Carousel
              centerMode={!isMobile}
              centerSlidePercentage={!isMobile ? 60 : 65}
              autoPlay
              infiniteLoop={!isMobile}
              showThumbs={false}
              showArrows
              showStatus={false}
              showIndicators
              className={style.carouselContainer}
              renderArrowNext={(clickHandler) => (
                <button
                  className={style.nextImageArrowContainer}
                  type="button"
                  onClick={clickHandler}
                >
                  <HiArrowNarrowRight />
                </button>
              )}
              renderArrowPrev={(clickHandler) => (
                <button
                  className={style.previousImageArrowContainer}
                  type="button"
                  onClick={clickHandler}
                >
                  <HiArrowNarrowLeft />
                </button>
              )}
              renderIndicator={(clickHandler, isSelected, index) => (
                <button
                  className={style.dot}
                  onClick={clickHandler}
                  data-selected={String(isSelected)}
                  type="button"
                  aria-label={`Indicador ${index}`}
                />
              )}
            >
              {projectGallery.map((projectImage) => (
                <div className={style.carouselImagesContainer} key={projectImage}>
                  <Image
                    src={projectImage}
                    layout="responsive"
                    priority
                    width={100}
                    height={100}
                  />
                </div>
              ))}

            </Carousel>
          )
          : (
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              showArrows={false}
              className={style.carouselContainer}
            >
              {projectGallery.map((projectImage) => (
                <div className={style.carouselShowOnlyCoverContainer} key={projectImage}>
                  <Image
                    src={projectImage}
                    layout="responsive"
                    priority
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </Carousel>
          )}

        <div className={style.content}>
          <h2>DESCRIÇÃO</h2>
          <ReactMarkdown
            className={style.markdownContent}
          >
            {project.description}
          </ReactMarkdown>

          <div className={style.additionalSectionGridContainer}>
            <section className={style.tecnologiesUsed}>
              <h3>PRINCIPAIS TECNOLOGIAS UTILIZADAS</h3>
              <ul>
                {project.technologies.map((technology) => (
                  <li>
                    <Image
                      src={`/images/thumbnails/${getThumbnailFilename(technology)}`}
                      width={30}
                      height={30}
                      layout="responsive"
                    />
                  </li>
                ))}
              </ul>
            </section>
            <section className={style.viewMore}>
              <h3>VEJA MAIS</h3>
              <div>
                <a
                  href={project.githubUrl || "#"}
                  className={style.githubLink}
                >
                  REPOSITORIO NO GITHUB
                  <AiFillGithub />
                </a>
                <a
                  href={project.websiteUrl || "#"}
                  className={style.websiteLink}
                >
                  VEJA A DEMO
                  <HiOutlineExternalLink />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
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
