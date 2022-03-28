import Image from "next/image";
import Link from "next/link";
import Label from "components/shared/Label";
import { memo } from "react";

import styles from "./styles.module.scss";

const TECHOLOGIES_IMAGES_NAME = {
  react: "React-Thumb.png",
  typescript: "Typescript-Thumb.png",
  javascript: "Javascript-Thumb.png",
  Next: "NextJS-Thumb.png",
};

interface IProjectCard {
	projectId: string;
	projectImage: string;
	projectName: string;
	projectType: "web" | "mobile" | "desktop";
	projectTechologies: string[];
}

function ProjectCard({
  projectId,
  projectImage,
  projectName,
  projectType,
  projectTechologies,
}: IProjectCard) {
  return (
    <Link href={`/project/${projectId}`}>
      <a className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={projectImage}
            alt={projectName}
            width={200}
            height={140}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={styles.detailContainer}>
          <span>{projectName}</span>
          <Label text={projectType} size="md" />
        </div>
        <div className={styles.techologiesContainer}>
          {projectTechologies.map((techology) => (
            <Image
              src={`/images/thumbnails/${TECHOLOGIES_IMAGES_NAME[techology || "react"]}`}
              width={30}
              height={30}
              key={techology}
            />
          ))}
        </div>
      </a>
    </Link>
  );
}

export default memo(ProjectCard);
