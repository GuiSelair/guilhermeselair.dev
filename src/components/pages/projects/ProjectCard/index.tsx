import Image from "next/image";
import Link from "next/link";
import Label from "components/shared/Label";
import { memo } from "react";

import ShowTechnologiesThumnails from "components/shared/ShowTechnologiesThumnails";
import styles from "./styles.module.scss";

interface IProjectCard {
	projectId: string;
	projectImage: string;
	projectName: string;
	projectType: string;
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
						placeholder="blur"
					/>
				</div>
				<div className={styles.detailContainer}>
					<span>{projectName}</span>
					<Label text={projectType} size="md" />
				</div>
				<div className={styles.techologiesContainer}>
					<ShowTechnologiesThumnails
						size="sm"
						technologies={projectTechologies}
					/>
				</div>
			</a>
		</Link>
	);
}

export default memo(ProjectCard);
