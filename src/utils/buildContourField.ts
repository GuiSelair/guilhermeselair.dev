type Point = [number, number];

export interface ContourFieldOptions {
	cx: number;
	cy: number;
	startRadius: number;
	step: number;
	count: number;
	seed: number;
	squash?: number;
}

const POINTS_PER_CONTOUR = 48;
const FULL_TURN = Math.PI * 2;

function getContourPoints(
	{ cx, cy, seed, squash = 0.78 }: ContourFieldOptions,
	radius: number,
	level: number
): Point[] {
	const phase = seed + level * 0.32;

	return Array.from({ length: POINTS_PER_CONTOUR }, (_, index) => {
		const angle = (index / POINTS_PER_CONTOUR) * FULL_TURN;
		const wobble =
			1 +
			0.11 * Math.sin(3 * angle + phase) +
			0.06 * Math.sin(5 * angle + phase * 1.7) +
			0.03 * Math.sin(7 * angle + phase * 0.6);
		const r = radius * wobble;

		return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r * squash];
	});
}

function formatPoint([x, y]: Point) {
	return `${x.toFixed(1)} ${y.toFixed(1)}`;
}

function toSmoothClosedPath(points: Point[]) {
	const total = points.length;
	const at = (index: number) => points[(index + total) % total];

	const segments = points.map((current, index) => {
		const previous = at(index - 1);
		const next = at(index + 1);
		const afterNext = at(index + 2);
		const controlStart: Point = [
			current[0] + (next[0] - previous[0]) / 6,
			current[1] + (next[1] - previous[1]) / 6,
		];
		const controlEnd: Point = [
			next[0] - (afterNext[0] - current[0]) / 6,
			next[1] - (afterNext[1] - current[1]) / 6,
		];

		return `C${formatPoint(controlStart)} ${formatPoint(
			controlEnd
		)} ${formatPoint(next)}`;
	});

	return `M${formatPoint(points[0])} ${segments.join(" ")} Z`;
}

export function buildContourField(options: ContourFieldOptions) {
	return Array.from({ length: options.count }, (_, level) => {
		const radius = options.startRadius + level * options.step;

		return toSmoothClosedPath(getContourPoints(options, radius, level));
	});
}
