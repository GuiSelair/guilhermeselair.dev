import { CSSProperties, memo } from "react";

import { buildContourField } from "@utils/buildContourField";
import styles from "./styles.module.scss";

const MAIN_FIELD = buildContourField({
	cx: 1180,
	cy: 470,
	startRadius: 36,
	step: 34,
	count: 18,
	seed: 0.4,
});

const SECONDARY_FIELD = buildContourField({
	cx: 180,
	cy: 980,
	startRadius: 60,
	step: 38,
	count: 11,
	seed: 2.1,
	squash: 0.7,
});

function getLevelStyle(level: number) {
	return { "--level": level } as CSSProperties;
}

function TopographicBackgroundWithoutMemo() {
	return (
		<div className={styles.container} aria-hidden="true">
			<svg
				className={styles.svg}
				viewBox="0 0 1600 1000"
				preserveAspectRatio="xMidYMid slice"
				focusable="false"
			>
				<g className={`${styles.field} ${styles.mainField}`}>
					{MAIN_FIELD.map((path, level) => (
						<path key={path} d={path} style={getLevelStyle(level)} />
					))}
				</g>
				<g className={`${styles.field} ${styles.secondaryField}`}>
					{SECONDARY_FIELD.map((path, level) => (
						<path key={path} d={path} style={getLevelStyle(level)} />
					))}
				</g>
			</svg>
		</div>
	);
}

export const TopographicBackground = memo(TopographicBackgroundWithoutMemo);
