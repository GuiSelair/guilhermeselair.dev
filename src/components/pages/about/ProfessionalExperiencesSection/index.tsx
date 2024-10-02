import { useState, memo, useRef } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./styles.module.scss";

const PROFESSIONAL_EXPERIENCES = [
	{
		office: "Desenvolvedor Front-end Pleno",
		companyName: "Getrak",
		duration: "Abril/2022 - Setembro/2024",
		description: `Atuei na criação, manutenção e integração de micro-frontends utilizando React, conectando-os a micro-serviços. Trabalhei ativamente no principal sistema legado da empresa, realizando manutenções com PHP e JavaScript, o que resultou em melhorias significativas na estabilidade e performance do sistema. Além disso, participei da criação do design system, desenvolvendo do zero componentes centrais que foram adotados por todos os squads, garantindo consistência e eficiência no desenvolvimento de interfaces`,
		hasCompany: true,
	},
	{
		office: "Desenvolvedor Full-stack",
		companyName: "Easy Auth Sistemas",
		hasCompany: true,
		duration: "Julho/2021 - Abril/2022",
		description: `Contribuí para o desenvolvimento de uma plataforma de eventos esportivos utilizando JavaScript em toda a stack. Realizei integrações com gateways de pagamento, como Stripe, e implementei soluções de armazenamento de dados e envio de emails/SMS com AWS. Além disso, utilizei GraphQL para otimizar a obtenção de dados, garantindo uma comunicação eficiente entre o front-end e o back-end da aplicação`,
	},
	{
		office: "Estágio - Desenvolvedor Front-end",
		companyName: "Lunix Tecnologia",
		hasCompany: true,
		duration: "Janeiro/2020 - Julho/2021",
		description: `
		Entrei na Lunix para solucionar problemas de escalabilidade na criação de relatórios de desempenho. Desenvolvi uma ferramenta em Python e PHP que automatizou esse processo, resultando em maior eficiência e escalabilidade para a empresa. Após a conclusão deste projeto, fui responsável pela construção do front-end da plataforma de sorteios online, utilizando ReactJS para entregar uma interface moderna e de alta performance.
		`,
	},
	{
		office: "Estágio - Suporte técnico",
		companyName: "Sistemas & Informações",
		hasCompany: true,
		duration: "Setembro, 2019 - Dezembro, 2019",
		description: `Atuei na equipe de suporte para ajudar a lidar com o aumento da demanda de solicitações dos clientes. Isso me permitiu desenvolver habilidades de comunicação, além de aprimorar minha capacidade de resolução de problemas em tempo real.`,
	},
	{
		office: "Estágio - Desenvolvedor Full-stack",
		companyName: "Escola de Ensino Médio Professora Maria Rocha",
		hasCompany: true,
		duration: "Junho, 2019 - Agosto, 2019",
		description: `Desenvolvi um projeto para modernizar o site da escola e facilitar a comunicação entre professores, estudantes e a instituição. A principal entrega foi a criação de um portal que permitia aos estudantes acessar facilmente informações como notas, frequência e notícias importantes. O projeto trouxe uma interface mais intuitiva e uma navegação otimizada, melhorando a experiência dos usuários.`,
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
			block: "start",
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
