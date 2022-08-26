import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "@styles/pages/About.module.scss";
import { BannerWithCTA, SEO } from "@components/shared";
import {
	ApresentationSection,
	CoursesAndCertifications,
	Educations,
	TechnologiesWorked,
	ProfessionalExperiencesSection,
} from "@components/pages/about";

export default function About() {
	const handleRedirectToGoogleDriveFolder = () => {
		return window.open(
			"https://drive.google.com/drive/folders/1o5AbcKVycFeL5JZwFp2S4mpd_PXhhqGr?usp=sharing",
			"_blank"
		);
	};

	return (
		<>
			<SEO
				title="Sobre mim"
				description="Veja aqui um pouco da minha trajetória. Sinta-se à vontade de baixar meu currículo :D"
			/>
			<main className={styles.container}>
				<h2>Always learning!</h2>
				<ApresentationSection />
				<div className={styles.aboutContainerDesktop}>
					<CoursesAndCertifications />
					<Educations />
					<TechnologiesWorked />
					<ProfessionalExperiencesSection />
				</div>

				<div className={styles.aboutContainerMobile}>
					<Tabs className={styles.aboutContent}>
						<TabList>
							<Tab>Mais detalhes</Tab>
							<Tab>Carreira</Tab>
						</TabList>

						<TabPanel>
							<CoursesAndCertifications />
							<Educations />
							<TechnologiesWorked />
						</TabPanel>

						<TabPanel>
							<ProfessionalExperiencesSection />
						</TabPanel>
					</Tabs>
				</div>

				<BannerWithCTA
					CTAAction={handleRedirectToGoogleDriveFolder}
					CTAText="Baixar curriculo"
					title="Prefere da maneira tradicional?"
					description="Sem problemas, baixe meu currículo em PDF"
					backgroundImage="pfd-icon-group-background.png"
					backgroundPositionX="-2%"
					backgroundPositionY="50%"
					backgroundColor="#ff784b"
				/>
			</main>
		</>
	);
}
