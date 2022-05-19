import Image from "next/image";
import { getThumbnailFilename } from "utils/getThumbnailFilename";
import styles from "./styles.module.scss";

export default function TechnologiesWorked() {
	const technologiesList = [
		"Typescript",
		"ReactJS",
		"NextJS",
		"Javascript",
		"NodeJS",
		"Axios",
		"Firebase",
		"GraphQL",
		"GraphCMS",
		"ReactNative",
	];

	return (
		<section className={styles.tecnologiasTrabalhadas}>
			<h4>Tecnologias trabalhadas</h4>
			<div>
				{technologiesList.map((technology) => (
					<Image
						src={`/images/thumbnails/${getThumbnailFilename(
							technology.toLowerCase()
						)}`}
						width={49}
						height={49}
						title={technology}
						key={technology}
					/>
				))}
			</div>
		</section>
	);
}
