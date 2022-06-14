import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaDev } from "react-icons/fa";

import style from "./styles.module.scss";
import { basicInfos } from "config/basicInfos";


export default function Footer() {
	return (
		<footer className={style.container}>
			<div>
				<span>© Guilherme Selair. 2022</span>
			</div>
			<div>
				<a
					href={basicInfos.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiFillGithub />
				</a>
				<a
					href={basicInfos.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiFillLinkedin />
				</a>
				<a
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
