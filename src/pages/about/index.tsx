import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "@styles/About.module.scss";
import Header from "components/shared/Header";
import ProfessionalExperiencesSection from "components/pages/about/ProfessionalExperiencesSection";
import TechnologiesWorked from "components/pages/about/TechnologiesWorked";
import SEO from "components/shared/SEO";
import CoursesAndCertifications from "components/pages/about/CoursesAndCertifications";
import Educations from "components/pages/about/Educations";
import Footer from "components/shared/Footer";
import BannerWithCTA from "components/shared/BannerWithCTA";

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
							Olá, eu sou Guilherme Selair mas quase todos me chamam de Selair.
							Eu tenho 24 anos
						</p>
						<p>
							Habitant erat faucibus maecenas nulla scelerisque. Sit
							sollicitudin fringilla sed nullam ut mi. Faucibus habitant
							eleifend euismod praesent suscipit et mauris adipiscing pretium.
						</p>
						<p>
							Habitant erat faucibus maecenas nulla scelerisque. Sit
							sollicitudin fringilla sed nullam ut mi.
						</p>
					</div>
				</div>

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
