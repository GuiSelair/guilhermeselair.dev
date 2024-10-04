import { memo } from "react";
import Image from "next/image";
import {
	AiFillGithub,
	AiFillLinkedin,
} from "react-icons/ai";
import { FaDev } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

import { basicInfos } from "@configs/basicInfos";
import styles from "./styles.module.scss";

interface ApresentationSectionProps {
	profile: string
}

function ApresentationSectionWithoutMemo({ profile }: ApresentationSectionProps) {
	return (
		<div className={styles.apresentationContainer}>
			<Image
				src="/images/profile.png"
				width={100}
				height={100}
				layout="responsive"
				className={styles.apresentationImage}
				objectFit="cover"
				alt="Uma imagem que representa Guilherme Selair apresentando seu TCC"
			/>
			<div className={styles.apresentationDetails}>
				<ReactMarkdown>
					{profile}
				</ReactMarkdown>

				<div className={styles.linksSociais}>
					<a title="Envie um email" href={`mailto:${basicInfos.email}`}>
						<FiMail />
					</a>
					<a
						aria-label="Github"
						title="Veja meu Github"
						href={basicInfos.github}
						target="_blank"
						rel="noopener noreferrer"
					>
						<AiFillGithub />
					</a>
					<a
						aria-label="Linkedin"
						title="Veja meu Linkedin"
						href={basicInfos.linkedin}
						target="_blank"
						rel="noopener noreferrer"
					>
						<AiFillLinkedin />
					</a>
					<a
						aria-label="Dev.to"
						title="Veja meu DEV.to"
						href={basicInfos.devto}
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaDev />
					</a>
				</div>
			</div>
		</div>
	);
}

export const ApresentationSection = memo(ApresentationSectionWithoutMemo);
