export interface Pixel {
	x: number;
	y: number;
	flickers: boolean;
	duration: number;
	delay: number;
}

export interface PixelFieldOptions {
	width: number;
	height: number;
	cell: number;
	seed: number;
	density?: number;
	clearRadius?: number;
}

function createRandom(seed: number) {
	let state = seed >>> 0;

	return function random() {
		state = (state + 0x6d2b79f5) >>> 0;
		let value = state;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	};
}

function getEdgeDistance(x: number, y: number, width: number, height: number) {
	const dx = (x - width / 2) / (width / 2);
	const dy = (y - height / 2) / (height / 2);

	return Math.hypot(dx, dy);
}

export function buildPixelField({
	width,
	height,
	cell,
	seed,
	density = 0.32,
	clearRadius = 0.45,
}: PixelFieldOptions): Pixel[] {
	const random = createRandom(seed);
	const pixels: Pixel[] = [];

	for (let y = 0; y < height; y += cell) {
		for (let x = 0; x < width; x += cell) {
			const distance = getEdgeDistance(x, y, width, height);
			const chance = Math.min(
				Math.max((distance - clearRadius) * density, 0),
				0.3
			);

			if (random() < chance) {
				pixels.push({
					x,
					y,
					flickers: random() < 0.3,
					duration: 6 + random() * 8,
					delay: -random() * 14,
				});
			}
		}
	}

	return pixels;
}
