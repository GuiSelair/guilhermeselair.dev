import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GetStaticProps } from "next";
import { graphSDK } from "@services/graphql-request";
import { AboutQuery } from "@generated/sdk";

import styles from "@styles/pages/About.module.scss";
import { BannerWithCTA, SEO } from "@components/shared";
import {
	ApresentationSection,
	CoursesAndCertificationsSection,
	EducationsSection,
	TechnologiesWorkedSection,
	ProfessionalExperiencesSection,
} from "@components/pages/about";

interface AboutPageProps {
	about: AboutQuery['abouts'][0]
}

export default function AboutPage({ about }: AboutPageProps) {
	const handleRedirectToGoogleDriveFolder = () => {
		return window.open(
			about.cvUrl,
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
				<h2>Eterno aprendiz!</h2>
				<ApresentationSection profile={about.profile} />

				<div className={styles.aboutContainerDesktop}>
					<div className={styles.flexColumn}>
						<CoursesAndCertificationsSection courses={about.coursesSection} />
						<EducationsSection educations={about.educationSection} />
						<TechnologiesWorkedSection />
					</div>
					<ProfessionalExperiencesSection experiences={about.experiencesSection} />
				</div>

				<div className={styles.aboutContainerMobile}>
					<Tabs className={styles.aboutContent} defaultIndex={1}>
						<TabList>
							<Tab>Mais detalhes</Tab>
							<Tab>Carreira</Tab>
						</TabList>

						<TabPanel>
							<CoursesAndCertificationsSection courses={about.coursesSection} />
							<EducationsSection educations={about.educationSection} />
							<TechnologiesWorkedSection />
						</TabPanel>

						<TabPanel>
							<ProfessionalExperiencesSection experiences={about.experiencesSection} />
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

export const getStaticProps: GetStaticProps = async () => {
	const { abouts } = await graphSDK.About();
	return {
		props: {
			about: abouts[0],
		},
		revalidate: 60 * 60 * 24, // 24 hours,
	};
}
