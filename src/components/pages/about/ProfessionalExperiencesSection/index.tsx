import { useState, memo, useRef } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AboutQuery } from "@generated/sdk";

import styles from "./styles.module.scss";

const EXPERIENCES_PER_SLIDE = 3;

type ProfessionalExperiences = AboutQuery['abouts'][0]['experiencesSection']

interface ProfessionalExperiencesSectionProps {
	experiences: ProfessionalExperiences
}

function ProfessionalExperiencesSectionWithoutMemo({ experiences }: ProfessionalExperiencesSectionProps) {
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

	const chunkExperiencesInSlides = (): ProfessionalExperiences[] => {
		const exps = [...experiences];
		const slides = [];

		while (exps.length > 0) {
			slides.push(exps.splice(0, EXPERIENCES_PER_SLIDE));
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
				{experiencesSlides.map((experiencesChuck) => (
					<div
						key={experiencesChuck?.[0]?.office}
						className={styles.experiencesSectionContainer}
					>
						<ul>
							{experiencesChuck.map((experience) => (
								<li key={`${experience.office}-${experience.company}`}>
									<strong>{experience.office}</strong>
									<span className={styles.companyName}>
										{experience.hasCompany && "Empresa: "}
										{experience.company}
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
