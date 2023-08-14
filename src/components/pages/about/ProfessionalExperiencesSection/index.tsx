import { useState, memo, useRef } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./styles.module.scss";

const PROFESSIONAL_EXPERIENCES = [
	{
		office: "Desenvolvedor Front-end e Mobile",
		companyName: "Freelancer",
		duration: "Junho/2023 - Atual",
		description: `Ingressei nesse projeto a fim de entregar uma solução simples, funcional e criativa para redes de combustivéis. Utilizando React Native e React foram construídos uma plataforma de gestão e um aplicativo prático e rápido para ser utilizado por frentistas e consumidor.`,
		hasCompany: false,
	},
	{
		office: "Desenvolvedor Front-end Pleno",
		companyName: "Getrak",
		duration: "Abril/2022 - Atual",
		description: `Criação, manutenção e integração de micro-frontends construídos
		com React a micro-serviços faziam parte do meu dia-a-dia.
		Utilizando PHP e Javascript realizei diversas manutenções no
		principal sistema legado da empresa. Participei ativamente da
		criação do design system da empresa, criando os principais
		componentes que seriam utilizados por devs de todos os squads.`,
		hasCompany: true,
	},
	{
		office: "Desenvolvedor Full-stack",
		companyName: "Easy Auth Sistemas",
		hasCompany: true,
		duration: "Julho/2021 - Abril/2022",
		description: `Utilizando Javascript de ponta-a-ponta auxiliei na construção de
		uma plataforma de eventos esportivos. Integração com gateways de
		pagamentos como Stripe, armazenamento de dados e envio de
		emails/SMS através da AWS e utilização de GraphQL para obtenção
		de dados foram algumas tecnologias e ferramentas utilizadas.
		<br />
		Com a plataforma em produção, ela já conta com mais de 1000
		atletas inscritos em diferentes eventos distribuídos em todo o
		estado do Rio Grande do Sul.`,
	},
	{
		office: "Estágio - Desenvolvedor Front-end",
		companyName: "Lunix Tecnologia",
		hasCompany: true,
		duration: "Janeiro/2020 - Julho/2021",
		description: `
		Ingressei na empresa como estagiário a fim de solucionar um
		problema de escalabilidade existente na criação de relatórios de
		desempenho. Como alternativa utilizando python foi desenvolvido
		uma ferramenta que trouxe alta escalabilidade e automação para a
		empresa. Com a ferramenta foi possível reduzir o tempo de
		criação de relatórios de 3 dias para segundos, poupando tempo e
		mão de obra.
		<br/>
		Após a conclusão da ferramenta de automação, fiquei responsável
		pela construção do front-end da plataforma de sorteios online da
		empresa. Utilizando React com NextJS, a plataforma atingiu a
		marca de 5000 sorteios realizados em 3 meses.
		`,
	},
	{
		office: "Estágio - Suporte técnico",
		companyName: "Sistemas & Informações",
		hasCompany: true,
		duration: "Setembro, 2019 - Dezembro, 2019",
		description: `Entrei na empresa para auxiliar a equipe de suporte com o
		aumento da demanda de solicitações. Como resultado a empresa
		conseguiu suprir a demanda e eu adquiri experiência em falar com
		o público.`,
	},
	{
		office: "Estágio - Desenvolvedor Full-stack",
		companyName: "Escola de Ensino Médio Professora Maria Rocha",
		hasCompany: true,
		duration: "Junho, 2019 - Agosto, 2019",
		description: `Utilizando PHP, Javascript e MYSQL construí um projeto com objetivo de facilitar a comunicação da escola com professores e estudantes. Para isso foi modernizado o site da escola e implementado um portal do aluno, com notas, frequências e notícias importantes.`,
	},
	{
		office: "Auxiliar Administrativo",
		companyName: "Supermercado Bertagnolli",
		hasCompany: true,
		duration: "Abril, 2018 - Abril, 2019",
		description: `Ingressei na empresa para auxiliar a equipe administrativa com o
		crescimento do supermercado. Entretanto minha saída foi
		necessária para encontrar uma experiência na área de tecnologia
		e começar a cursar faculdade.`,
	},
];
const EXPERIENCES_PER_SLIDE = 3;

interface IProfessionalExperience {
	office: string;
	companyName: string;
	duration: string;
	description: string;
	hasCompany: boolean;
}

function ProfessionalExperiencesSectionWithoutMemo() {
	const [currentSelectedSlide, setCurrentSelectedSlide] = useState(0);
	const sectionRef = useRef<HTMLDivElement>(null);

	const handleUpdateCurrentSelectedSlide = (slideIndex: number) => {
		if (slideIndex !== currentSelectedSlide)
			setCurrentSelectedSlide(slideIndex);
	};

	const goToSectionTop = () => {
		sectionRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	};
	const handleNextSlide = () => {
		goToSectionTop();
		setCurrentSelectedSlide((old) => old + 1);
	};
	const handlePreviousSlide = () => {
		goToSectionTop();
		setCurrentSelectedSlide((old) => old - 1);
	};
	const chunkExperiencesInSlides = (): IProfessionalExperience[][] => {
		const experiences = [...PROFESSIONAL_EXPERIENCES];
		const slides = [];

		while (experiences.length > 0) {
			slides.push(experiences.splice(0, EXPERIENCES_PER_SLIDE));
		}

		return slides;
	};

	const experiencesSlides = chunkExperiencesInSlides();
	const hasPreviousSlide = currentSelectedSlide === 0;
	const hasNextSlide = currentSelectedSlide === experiencesSlides.length - 1;

	return (
		<section ref={sectionRef} className={styles.experiencias}>
			<h3>Carreira</h3>
			<Carousel
				autoPlay={false}
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				showIndicators={false}
				swipeable={false}
				onChange={handleUpdateCurrentSelectedSlide}
				selectedItem={currentSelectedSlide}
			>
				{experiencesSlides.map((experiences) => (
					<div
						key={experiences?.[0]?.office}
						className={styles.experiencesSectionContainer}
					>
						<ul>
							{experiences.map((experience) => (
								<li key={`${experience.office}-${experience.companyName}`}>
									<strong>{experience.office}</strong>
									<span className={styles.companyName}>
										{experience.hasCompany && "Empresa: "}
										{experience.companyName}
									</span>
									<span className={styles.duration}>{experience.duration}</span>
									<p
										dangerouslySetInnerHTML={{ __html: experience.description }}
									/>
								</li>
							))}
						</ul>
					</div>
				))}
			</Carousel>

			<div className={styles.controlSlidesButtonsEndSection}>
				<button
					className={styles.previousButton}
					type="button"
					title="Anterior"
					onClick={handlePreviousSlide}
					disabled={hasPreviousSlide}
				>
					<BsArrowLeftShort />
				</button>
				<button
					className={styles.nextButton}
					type="button"
					title="Proximo"
					onClick={handleNextSlide}
					disabled={hasNextSlide}
				>
					<BsArrowRightShort />
				</button>
			</div>
		</section>
	);
}

export const ProfessionalExperiencesSection = memo(
	ProfessionalExperiencesSectionWithoutMemo
);
