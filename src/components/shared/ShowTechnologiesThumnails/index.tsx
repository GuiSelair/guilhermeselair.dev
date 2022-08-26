import { memo } from "react";
import Image from "next/image";

import { getThumbnailFilename } from "@utils/getThumbnailFilename";
import styles from "./styles.module.scss";

type IShowTechnologiesThumnails = {
	size: "sm" | "md";
	technologies: string[];
};

export function ShowTechnologiesThumnails({
	size,
	technologies,
}: IShowTechnologiesThumnails) {
	return (
		<ul className={styles.container}>
			{technologies.map((technology) => (
				<li key={technology} title={technology.toUpperCase()}>
					<Image
						src={`/images/thumbnails/${getThumbnailFilename(technology)}`}
						width={size === "md" ? 44 : 30}
						height={size === "md" ? 44 : 30}
						alt={technology}
					/>
				</li>
			))}
		</ul>
	);
}
