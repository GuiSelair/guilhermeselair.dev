import styles from './styles.module.scss';

export function BackgroundBlur() {
	return (
		<div className={styles.backgroundBlur}>
			<svg 
				viewBox="0 0 200 200" 
				xmlns="http://www.w3.org/2000/svg"
				className={`${styles.blob} ${styles.blob2}`}
			>
				<path 
					fill="var(--background-orange)" 
					d="M20.7,-38C31.7,-29.4,49.1,-33.9,55.5,-29.7C62,-25.5,57.5,-12.8,55.4,-1.2C53.3,10.3,53.4,20.6,48.8,27.9C44.2,35.2,34.8,39.6,25.8,44.9C16.9,50.2,8.4,56.6,-2.4,60.8C-13.3,65,-26.6,67,-39.9,64.2C-53.1,61.4,-66.4,53.7,-72.9,42.2C-79.4,30.6,-79.2,15.3,-72,4.2C-64.8,-7,-50.6,-14,-42.5,-22.7C-34.3,-31.5,-32.3,-42,-26.2,-53.4C-20.2,-64.9,-10.1,-77.4,-2.6,-72.8C4.8,-68.3,9.6,-46.6,20.7,-38Z" 
					transform="translate(100 100)" 
				/>
			</svg>
		</div>
	);
}