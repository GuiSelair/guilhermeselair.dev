import { useLogo3D } from "./useLogo3D";
import styles from "./styles.module.scss";

export function Logo3D() {
	const { containerRef, canvasRef, isVisible } = useLogo3D();
	const className = isVisible
		? `${styles.container} ${styles.isVisible}`
		: styles.container;

	return (
		<div ref={containerRef} className={className} aria-hidden="true">
			<canvas ref={canvasRef} className={styles.canvas} />
		</div>
	);
}
