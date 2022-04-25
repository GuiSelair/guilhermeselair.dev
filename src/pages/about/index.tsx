import Head from 'next/head'
import { CgArrowLongDown } from 'react-icons/cg'
import Image from 'next/image'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import styles from '@styles/About.module.scss'
import Header from 'components/shared/Header'
import Label from 'components/shared/Label'
import ProfessionalExperiencesSection from 'components/pages/about/ProfessionalExperiencesSection'
import DownloadProfessionalResumeBanner from 'components/pages/about/DownloadProfessionalResumeBanner'
import TechnologiesWorked from 'components/pages/about/TechnologiesWorked'
import SEO from 'components/shared/SEO'
import CoursesAndCertifications from 'components/pages/about/CoursesAndCertifications'
import Educations from 'components/pages/about/Educations'

export default function About() {
	return (
		<div className={styles.backgroundWrapper}>
			<SEO title="Sobre mim" />
			<Header />
			<main className={styles.container}>
				<h2>Always learning!</h2>
				<div className={styles.apresentationContainer}>
					<Image
						src={'https://github.com/guiselair.png'}
						width={100}
						height={100}
						layout="responsive"
						className={styles.apresentationImage}
					/>
					<div className={styles.apresentationDetails}>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
							pellentesque velit augue elementum condimentum arcu aliquet
							adipiscing sagittis.
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

				<DownloadProfessionalResumeBanner />
			</main>
			{/* <span>© Guilherme Selair. 2021</span> */}
		</div>
	)
}
