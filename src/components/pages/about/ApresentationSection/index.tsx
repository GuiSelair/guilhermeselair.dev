import { memo } from "react";
import Image from "next/image";
import {
	AiFillGithub,
	AiFillLinkedin,
} from "react-icons/ai";
import { FaDev } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

import { basicInfos } from "@configs/basicInfos";
import styles from "./styles.module.scss";

function ApresentationSectionWithoutMemo() {
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
				<p>
					Salve Salve 🖖, eu sou Guilherme Selair, mas pode me chamar de Selair. Sou desenvolvedor de software há 5 anos, com foco na experiência do usuário. Ao longo do tempo, já tive o privilégio de impactar mais de 10 mil pessoas por meio de projetos criativos, sempre com o objetivo de entregar experiências intuitivas, inovadores e de alta performance.
				</p>
				<p>
					Durante minha jornada, trabalhei com diversas tecnologias como PHP, Python, Javascript, NodeJS, ReactJS, React Native, NextJS, GraphQL, entre outras. Hoje, atuar no front-end é o que mais me cativa, ter uma abordagem prática, valorizando performance e uma experiência de usuário fluida. Porém como desenvolvedor busco sempre expandir meus conhecimentos explorando novas tecnologias para assim entregar aplicações de ponta-a-ponta com qualidade.
				</p>
				<p>
					Sou natural de Santa Maria, Rio Grande do Sul. Atualmente, moro na
					na capital do meu estado, Porto Alegre.
					No meu tempo livre, curto demais jogar meu Euro Truck, catar novas
					techs e ir ao cinema, comer aquela pipoquinha 😋.
				</p>

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
