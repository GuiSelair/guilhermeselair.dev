import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaDev } from "react-icons/fa";
import { memo } from "react";

import style from "./styles.module.scss";
import { basicInfos } from "@configs/basicInfos";

function FooterWithoutMemo() {
	return (
		<footer className={style.container}>
			<div>
				<span>© Guilherme Selair. {new Date().getFullYear()}</span>
			</div>
			<div>
				<a
					aria-label="Github"
					href={basicInfos.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiFillGithub />
				</a>
				<a
					aria-label="Linkedin"
					href={basicInfos.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiFillLinkedin />
				</a>
				<a
					aria-label="Dev.to"
					href={basicInfos.devto}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaDev />
				</a>
			</div>
		</footer>
	);
}

export const Footer = memo(FooterWithoutMemo);
