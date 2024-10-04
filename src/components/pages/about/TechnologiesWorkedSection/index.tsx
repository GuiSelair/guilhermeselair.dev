import Image from "next/image";
import { memo } from "react";
import { getThumbnailFilename, TECHOLOGIES_IMAGES_NAME } from "@utils/getThumbnailFilename";
import styles from "./styles.module.scss";

function TechnologiesWorkedWithoutMemo() {
	return (
		<section className={styles.tecnologiasTrabalhadas}>
			<h3>Tecnologias trabalhadas</h3>
			<div>
				{Object.keys(TECHOLOGIES_IMAGES_NAME).map((technology) => (
					<Image
						src={`/images/thumbnails/${getThumbnailFilename(
							technology
						)}`}
						width={49}
						height={49}
						title={technology.toLocaleUpperCase()}
						alt={`${technology.toLocaleUpperCase()} logo`}
						key={technology}
					/>
				))}
			</div>
		</section>
	);
}

export const TechnologiesWorkedSection = memo(TechnologiesWorkedWithoutMemo)
