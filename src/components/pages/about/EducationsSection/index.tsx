import { memo } from 'react'
import { AboutQuery } from '@generated/sdk'

import { Badge } from '@components/shared/Badge'
import styles from './styles.module.scss'

interface EducationsProps {
	educations: AboutQuery['abouts'][0]['educationSection']
}

function EducationsWithoutMemo({ educations }: EducationsProps) {
	return (
		<section className={styles.container}>
			<h3>Formação Educacional</h3>
			<ul>
				{educations.map(education => (
					<li key={education.id}>
						<strong>
							{education.name}
							<Badge text={education.level} />
						</strong>
						<span>{education.educationalCompany}</span>
					</li>
				))}
			</ul>
		</section>
	)
}

export const EducationsSection = memo(EducationsWithoutMemo)
