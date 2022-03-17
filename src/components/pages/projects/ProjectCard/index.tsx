import Image from "next/image";

import styles from "./styles.module.scss";

interface IProjectCard {
	projectImage: string;
	projectName: string;
	projectType: "web" | "mobile" | "desktop";
	projectTechologies: string[];
}

export default function ProjectCard({
  projectImage,
  projectName,
  projectType,
  projectTechologies,
}: IProjectCard) {
  return (
    <div className={styles.container}>
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
          web
        </div>
      </div>
      <div className={styles.techologiesContainer} />
    </div>
  );
}
