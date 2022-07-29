import { useState, memo } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import styles from "./styles.module.scss";

function ProfessionalExperiencesSection() {
	const [currentSelectedSlide, setCurrentSelectedSlide] = useState(0);

	const handleUpdateCurrentSelectedSlide = (slideIndex: number) => {
		if (slideIndex !== currentSelectedSlide)
			setCurrentSelectedSlide(slideIndex);
	};

	const handleNextSlide = () => setCurrentSelectedSlide((old) => old + 1);

	const handlePreviousSlide = () => setCurrentSelectedSlide((old) => old - 1);

	return (
		<section className={styles.experiencias}>
			<h3>Carreira</h3>
			<Carousel
				autoPlay={false}
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				showIndicators={false}
				swipeable={false}
				className={styles.carouselContainer}
				onChange={handleUpdateCurrentSelectedSlide}
				selectedItem={currentSelectedSlide}
			>
				<div>
					<ul>
						<li>
							<strong>Desenvolvedor Front-end Pleno</strong>
							<span className={styles.companyName}>Empresa: Getrak</span>
							<span className="duration">Abril/2022 - Atual</span>
							<p></p>
						</li>
						<li>
							<strong>Desenvolvedor Full-stack</strong>
							<span className={styles.companyName}>
								Empresa: Easy Auth Sistemas
							</span>
							<span className="duration">Julho/2021 - Abril/2022</span>
							<p>
								Utilizando Javascript de ponta-a-ponta auxiliei na construção de
								uma plataforma de eventos esportivos. Integração com gateways de
								pagamentos como Stripe, armazenamento de dados e envio de
								emails/SMS através da AWS e utilização de GraphQL para obtenção
								de dados foram algumas tecnologias e ferramentas utilizadas.
							</p>
							<p>
								Com a plataforma em produção, ela já conta com mais de 1000
								atletas inscritos em diferentes eventos distribuídos em todo o
								estado do Rio Grande do Sul.
							</p>
						</li>
						<li>
							<strong>Estágio - Desenvolvedor Front-end</strong>
							<span className={styles.companyName}>
								Empresa: Lunix Tecnologia
							</span>
							<span className="duration">Janeiro/2020 - Julho/2021</span>
							<p>
								Ingressei na empresa como estagiário a fim de solucionar um
								problema de escalabilidade existente na criação de relatórios de
								desempenho. Como alternativa utilizando python foi desenvolvido
								uma ferramenta que trouxe alta escalabilidade e automação para a
								empresa. Com a ferramenta foi possível reduzir o tempo de
								criação de relatórios de 3 dias para segundos, poupando tempo e
								mão de obra.
							</p>
							<p>
								Após a conclusão da ferramenta de automação, fiquei responsável
								pela construção do front-end da plataforma de sorteios online da
								empresa. Utilizando React com NextJS, a plataforma atingiu a
								marca de 5000 sorteios realizados em 3 meses.
							</p>
						</li>
						<li>
							<strong>Estágio - Suporte técnico</strong>
							<span className={styles.companyName}>
								Empresa: Sistemas & Informações
							</span>
							<span className="duration">Setembro, 2019 - Dezembro, 2019</span>
							<p>
								Entrei na empresa para auxiliar a equipe de suporte com o
								aumento da demanda de solicitações. Como resultado a empresa
								conseguiu suprir a demanda e eu adquiri experiência em falar com
								o público.
							</p>
						</li>
					</ul>
				</div>
				<div>
					<ul>
						<li>
							<strong>Estágio - Desenvolvedor Full-stack</strong>
							<span className={styles.companyName}>
								Escola de Ensino Médio Professora Maria Rocha
							</span>
							<span className="duration">Junho, 2019 - Agosto, 2019</span>
							<p>
								Utilizando PHP, Javascript e MYSQL construí um projeto com
								objetivo de facilitar a comunicação da escola com professores e
								estudantes. Para isso foi modernizado o site da escola e
								implementado um portal cujo o objetivo principal era facilitar o
								acesso as informações para os estudantes, como notas,
								frequências e notícias importantes. Após algumas entrevistas com
								alunos e professores sobre usabilidade e interface, alunos,
								professores e a equipe diretiva conseguiram se comunicar mais
								facilmente através da plataforma sendo utilizada até hoje.
							</p>
						</li>
						<li>
							<strong>Auxiliar Administrativo</strong>
							<span className={styles.companyName}>
								Empresa: Supermercado Bertagnolli
							</span>
							<span className="duration">Abril, 2018 - Abril, 2019</span>
							<p>
								Ingressei na empresa para auxiliar a equipe administrativa com o
								crescimento do supermercado. Entretanto minha saída foi
								necessária para encontrar uma experiência na área de tecnologia
								e começar a cursar faculdade.
							</p>
						</li>
					</ul>
				</div>
			</Carousel>
			<div className={styles.controlSlidesButtonsEndSection}>
				<button
					className={styles.previousButton}
					type="button"
					title="Anterior"
					onClick={handlePreviousSlide}
				>
					<BsArrowLeftShort />
				</button>
				<button
					className={styles.nextButton}
					type="button"
					title="Proximo"
					onClick={handleNextSlide}
				>
					<BsArrowRightShort />
				</button>
			</div>
		</section>
	);
}

export default memo(ProfessionalExperiencesSection);
