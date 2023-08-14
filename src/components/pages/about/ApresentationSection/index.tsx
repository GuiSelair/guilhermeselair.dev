import { memo } from "react";
import Image from "next/image";
import {
	AiFillGithub,
	AiFillLinkedin,
	AiOutlineWhatsApp,
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
					Salve Salve 🖖, eu sou Guilherme Selair mas pode me chamar de Selair
					ou SeuLair, tenho 25 anos e sou gaúcho. Eu comecei a desenvolver em
					2019, trabalhando com Python.
				</p>
				<p>
					Atualmente eu sou desenvolvedor front-end na Getrak e está sendo uma
					aventura desafiadora e incrível. Durante minha jornada já impactei
					mais de 6000 pessoas com aplicações criativas e funcionais. Estou
					sempre a procura do próximo nível 🚀, buscando enriquecer minha
					experiência como desenvolvedor com o objetivo de me tornar um
					especialista na linguagem Javascript.
				</p>
				<p>
					Sou natural de Santa Maria, Rio Grande do Sul. Atualmente, moro na
					minha cidade natal em um apezinho com minha namorada espetacular 🥰.
					No meu tempo livre, curto demais jogar meu Euro Truck, catar novas
					techs e ir ao cinema, comer aquela pipoquinha 😋.
				</p>

				<div className={styles.linksSociais}>
					<a title="Envie um email" href={`mailto:${basicInfos.email}`}>
						<FiMail />
					</a>
					<a
						title="Entrar em contato por Whatsapp"
						href={`${basicInfos.whatsapp}?phone=${basicInfos.phone}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<AiOutlineWhatsApp />
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
