import { memo } from 'react'

import styles from './styles.module.scss'

function CoursesAndCertifications() {
	return (
		<section className={styles.container}>
			<h4>Cursos e Certificações</h4>
			<ul>
				<li>
					<strong>Ignite - Trilha React</strong>
					<span>Rocketseat</span>
					<span>Conclusão: 2021</span>
				</li>
				<li>
					<strong>Bootcamp GoStack</strong>
					<span>Rocketseat</span>
					<span>Conclusão: 2021</span>
				</li>
				<li>
					<strong>JavaScript - Curso COMPLETO</strong>
					<span>HCode (Udemy)</span>
					<span>Conclusão: 2020</span>
				</li>
			</ul>
		</section>
	)
}

export default memo(CoursesAndCertifications)
