import Image from "next/image";

import styles from "./styles.module.scss";

export default function ApresentationSection() {
	return (
		<div className={styles.apresentationContainer}>
			<Image
				src={"https://github.com/guiselair.png"}
				width={100}
				height={100}
				layout="responsive"
				className={styles.apresentationImage}
			/>
			<div className={styles.apresentationDetails}>
				<p>
					Salve salve 🖖, eu sou Guilherme Selair mas pode me chamar de Selair ou SeuLair, tenho 24 anos e sou gaúcho. Eu comecei a desenvolver em 2018, trabalhando com Python.
				</p>
				<p>
					Atualmente eu sou desenvolvedor front-end na Getrak e está sendo uma aventura desafiadora e incrível. Durante minha jornada já impactei mais de 6000 pessoas com aplicações criativas e funcionais. Estou sempre a procura do próximo nível 🚀, buscando enriquecer minha experiência como desenvolvedor como objetivo de me tornar um especialista na linguagem Javascript.
				</p>
				<p>
					Sou natural de Santa Maria, Rio Grande do Sul. Atualmente, moro na minha cidade natal em um apezinho com minha namorada espetacular 🥰. No meu tempo livre, curto demais jogar meu Euro Truck, catar novas techs e ir ao cinema, comer aquela pipoquinha 😋.
				</p>
			</div>
		</div>
	)
}
