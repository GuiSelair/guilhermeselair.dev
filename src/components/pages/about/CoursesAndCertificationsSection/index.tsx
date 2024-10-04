import { memo } from "react";
import { AboutQuery } from "@generated/sdk";

import styles from "./styles.module.scss";

interface CoursesAndCertificationsProps {
	courses: AboutQuery['abouts'][0]['coursesSection']
}

function CoursesAndCertificationsWithoutMemo({ courses }: CoursesAndCertificationsProps) {
	return (
		<section className={styles.container}>
			<h3>Cursos e Certificações</h3>
			<ul>
				{courses.map(course => (
					<li key={course.id}>
						<strong>{course.name}</strong>
						<span>{course.educationalCompany}</span>
						<span>Conclusão: {course.conclusion}</span>
					</li>
				))}
			</ul>
		</section>
	);
}

export const CoursesAndCertificationsSection = memo(CoursesAndCertificationsWithoutMemo);
