import { memo } from 'react'

import { Label } from '@components/shared/Label'
import styles from './styles.module.scss'

function EducationsWithoutMemo() {
	return (
		<section className={styles.container}>
			<h3>Formação Educacional</h3>
			<ul>
				<li>
					<strong>
						Tecnólogo em Redes de Computadores
						<Label text="Ensino Superior" />
					</strong>
					<span>Universidade Federal de Santa Maria</span>
				</li>
				<li>
					<strong>
						Técnico em Informática
						<Label text="Ensino Técnico" />
					</strong>
					<span>Escola Estadual de Ensino Médio Professora Maria Rocha</span>
				</li>
			</ul>
		</section>
	)
}

export const Educations = memo(EducationsWithoutMemo)
