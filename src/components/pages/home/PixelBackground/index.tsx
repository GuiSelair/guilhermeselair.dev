import { CSSProperties, memo } from "react";

import { buildPixelField, Pixel } from "@utils/buildPixelField";
import styles from "./styles.module.scss";

const PIXEL_SIZE = 7;

const PIXELS = buildPixelField({
	width: 1600,
	height: 1000,
	cell: 20,
	seed: 1306,
});

function getPixelStyle({ duration, delay }: Pixel) {
	return {
		"--duration": `${duration.toFixed(2)}s`,
		"--delay": `${delay.toFixed(2)}s`,
	} as CSSProperties;
}

function PixelBackgroundWithoutMemo() {
	return (
		<div className={styles.container} aria-hidden="true">
			<svg
				className={styles.svg}
				viewBox="0 0 1600 1000"
				preserveAspectRatio="xMidYMid slice"
				focusable="false"
			>
				{PIXELS.map((pixel) => (
					<rect
						key={`${pixel.x}-${pixel.y}`}
						className={pixel.flickers ? styles.flicker : undefined}
						x={pixel.x}
						y={pixel.y}
						width={PIXEL_SIZE}
						height={PIXEL_SIZE}
						style={pixel.flickers ? getPixelStyle(pixel) : undefined}
					/>
				))}
			</svg>
		</div>
	);
}

export const PixelBackground = memo(PixelBackgroundWithoutMemo);
