import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import styles from "./styles.module.scss";

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
          <div className={styles.label}>
            {projectType}
          </div>
        </div>
        <div className={styles.techologiesContainer} />
      </a>
    </Link>
  );
}

export default memo(ProjectCard);
