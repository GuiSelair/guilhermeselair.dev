import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "@styles/About.module.scss";
import Header from "components/shared/Header";
import ProfessionalExperiencesSection from "components/pages/about/ProfessionalExperiencesSection";
import TechnologiesWorked from "components/pages/about/TechnologiesWorkedSection";
import SEO from "components/shared/SEO";
import CoursesAndCertifications from "components/pages/about/CoursesAndCertificationsSection";
import Educations from "components/pages/about/EducationsSection";
import Footer from "components/shared/Footer";
import BannerWithCTA from "components/shared/BannerWithCTA";
import ApresentationSection from "components/pages/about/ApresentationSection";

export default function About() {
	const handleRedirectToGoogleDriveFolder = () => {
		return window.open(
			"https://drive.google.com/drive/folders/1o5AbcKVycFeL5JZwFp2S4mpd_PXhhqGr?usp=sharing",
			"_blank"
		);
	};

	return (
		<div className={styles.backgroundWrapper}>
			<SEO title="Sobre mim" />
			<Header />
			<main className={styles.container}>
				<h2>Always learning!</h2>
				<ApresentationSection/>
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
			<Footer />
		</div>
	);
}
