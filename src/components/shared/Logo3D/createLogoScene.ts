import type {
	Group,
	Material,
	Mesh,
	MeshPhysicalMaterial,
	PerspectiveCamera,
	Scene,
	Texture,
	WebGLRenderer,
} from "three";

type ThreeModule = typeof import("three");

const BOX_SIZE = 2.02;
const BOX_DEPTH = 0.48;
const BOX_RADIUS = 0.42;
const LETTER_DEPTH = 0.3;
const LETTER_SIZE = 0.68;
const GRADIENT_CYCLE_SECONDS = 22;

const BOX_COLOR = 0x2c2c29;

export interface LogoSceneController {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: PerspectiveCamera;
	logoGroup: Group;
	shadowMesh: Mesh;
	letterMaterial: MeshPhysicalMaterial;
	baseY: number;
	resize: (width: number, height: number) => void;
	updateGradient: (time: number) => void;
	dispose: () => void;
}

function createStudioEnvMap(THREE: ThreeModule, renderer: WebGLRenderer) {
	const envScene = new THREE.Scene();
	const bulbs = [
		{ color: 0xffffff, position: [3.4, 4.6, 2.4], size: 1.5 },
		{ color: 0xf4f6f8, position: [-3.6, 2.2, 3.1], size: 1.1 },
		{ color: 0xe8eef6, position: [0.2, 1.6, -4.2], size: 1.2 },
		{ color: 0xd9e2f0, position: [-2.4, -1.2, -2.2], size: 0.85 },
	];

	bulbs.forEach((bulb) => {
		const mesh = new THREE.Mesh(
			new THREE.SphereGeometry(bulb.size, 16, 16),
			new THREE.MeshBasicMaterial({ color: bulb.color })
		);
		mesh.position.set(bulb.position[0], bulb.position[1], bulb.position[2]);
		envScene.add(mesh);
	});

	const pmrem = new THREE.PMREMGenerator(renderer);
	const envMap = pmrem.fromScene(envScene, 0.03).texture;
	pmrem.dispose();

	envScene.traverse((object) => {
		const mesh = object as Mesh;
		if (!mesh.isMesh) return;
		mesh.geometry.dispose();
		(mesh.material as Material).dispose();
	});

	return envMap;
}

function createShadowTexture(THREE: ThreeModule) {
	const canvas = document.createElement("canvas");
	canvas.width = 256;
	canvas.height = 256;
	const context = canvas.getContext("2d");

	if (!context) {
		return new THREE.CanvasTexture(canvas);
	}

	const gradient = context.createRadialGradient(128, 128, 12, 128, 128, 128);
	gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
	gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.2)");
	gradient.addColorStop(0.72, "rgba(0, 0, 0, 0.06)");
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
	context.fillStyle = gradient;
	context.fillRect(0, 0, 256, 256);

	const texture = new THREE.CanvasTexture(canvas);
	texture.needsUpdate = true;
	return texture;
}

function createBoxMaterial(THREE: ThreeModule, envMap: Texture) {
	return new THREE.MeshPhysicalMaterial({
		color: BOX_COLOR,
		metalness: 0.22,
		roughness: 0.48,
		clearcoat: 0.22,
		clearcoatRoughness: 0.45,
		envMap,
		envMapIntensity: 0.7,
		reflectivity: 0.4,
	});
}

function createHeadingGradientTexture(THREE: ThreeModule) {
	const size = 512;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const context = canvas.getContext("2d");
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 8;

	function update(time: number) {
		if (!context) return;

		const pan =
			0.5 -
			0.5 *
				Math.cos(
					((time % GRADIENT_CYCLE_SECONDS) / GRADIENT_CYCLE_SECONDS) *
						Math.PI *
						2
				);
		const angle = (109.6 * Math.PI) / 180;
		const length = size * 2.6;
		const shift = (pan - 0.5) * size * 1.8;
		const dx = Math.cos(angle);
		const dy = Math.sin(angle);
		const cx = size / 2 + dx * shift;
		const cy = size / 2 + dy * shift;
		const gradient = context.createLinearGradient(
			cx - dx * (length / 2),
			cy - dy * (length / 2),
			cx + dx * (length / 2),
			cy + dy * (length / 2)
		);
		gradient.addColorStop(0.112, "rgb(232, 252, 252)");
		gradient.addColorStop(0.562, "rgb(252, 215, 134)");
		gradient.addColorStop(1, "#ff784b");
		context.fillStyle = gradient;
		context.fillRect(0, 0, size, size);
		texture.needsUpdate = true;
	}

	update(0);
	return { texture, update };
}

function createLetterMaterial(
	THREE: ThreeModule,
	envMap: Texture,
	gradientMap: Texture
) {
	return new THREE.MeshPhysicalMaterial({
		color: 0xffffff,
		map: gradientMap,
		emissive: 0xffffff,
		emissiveMap: gradientMap,
		emissiveIntensity: 0.58,
		metalness: 0.08,
		roughness: 0.38,
		clearcoat: 0.18,
		clearcoatRoughness: 0.4,
		envMap,
		envMapIntensity: 0.28,
	});
}

async function createLetterMeshes(
	THREE: ThreeModule,
	envMap: Texture,
	gradientMap: Texture
) {
	const { FontLoader } = await import(
		"three/examples/jsm/loaders/FontLoader.js"
	);
	const { TextGeometry } = await import(
		"three/examples/jsm/geometries/TextGeometry.js"
	);

	const font = await new FontLoader().loadAsync(
		"/fonts/helvetiker_bold.typeface.json"
	);

	const geometry = new TextGeometry("S", {
		font,
		size: LETTER_SIZE,
		height: LETTER_DEPTH,
		curveSegments: 16,
		bevelEnabled: true,
		bevelThickness: 0.042,
		bevelSize: 0.026,
		bevelOffset: 0,
		bevelSegments: 5,
	});
	geometry.center();
	geometry.computeBoundingBox();

	const bounds = geometry.boundingBox;
	const uvAttr = geometry.getAttribute("uv");
	const posAttr = geometry.getAttribute("position");
	if (bounds && uvAttr) {
		const sizeX = bounds.max.x - bounds.min.x || 1;
		const sizeY = bounds.max.y - bounds.min.y || 1;
		for (let i = 0; i < posAttr.count; i++) {
			uvAttr.setXY(
				i,
				(posAttr.getX(i) - bounds.min.x) / sizeX,
				(posAttr.getY(i) - bounds.min.y) / sizeY
			);
		}
		uvAttr.needsUpdate = true;
	}

	const material = createLetterMaterial(THREE, envMap, gradientMap);
	const front = new THREE.Mesh(geometry, material);
	front.position.z = BOX_DEPTH / 2 + LETTER_DEPTH / 2 - 0.015;

	const back = new THREE.Mesh(geometry, material);
	back.rotation.y = Math.PI;
	back.position.z = -(BOX_DEPTH / 2 + LETTER_DEPTH / 2 - 0.015);

	return { front, back, material };
}

export async function createLogoScene(
	canvas: HTMLCanvasElement,
	container: HTMLElement,
	THREE: ThreeModule
): Promise<LogoSceneController> {
	const { RoundedBoxGeometry } = await import(
		"three/examples/jsm/geometries/RoundedBoxGeometry.js"
	);

	const renderer = new THREE.WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true,
		powerPreference: "high-performance",
	});
	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.04;

	const scene = new THREE.Scene();
	const envMap = createStudioEnvMap(THREE, renderer);
	scene.environment = envMap;

	const headingGradient = createHeadingGradientTexture(THREE);

	const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
	camera.position.set(0.62, 0.16, 3.55);
	camera.lookAt(0, 0.02, 0.08);

	scene.add(new THREE.AmbientLight(0xf2f2f2, 0.48));

	const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
	keyLight.position.set(2.4, 3.6, 5.4);
	scene.add(keyLight);

	const fillLight = new THREE.DirectionalLight(0xe8edf4, 0.42);
	fillLight.position.set(-4.2, 1.4, 2.6);
	scene.add(fillLight);

	const depthLight = new THREE.DirectionalLight(0xffffff, 0.28);
	depthLight.position.set(-2.2, 1.8, -3.4);
	scene.add(depthLight);

	const sparkLight = new THREE.PointLight(0xffffff, 0.32, 10);
	sparkLight.position.set(1.2, 1.8, 2.8);
	scene.add(sparkLight);

	const logoGroup = new THREE.Group();
	const boxGeometry = new RoundedBoxGeometry(
		BOX_SIZE,
		BOX_SIZE,
		BOX_DEPTH,
		5,
		BOX_RADIUS
	);
	const box = new THREE.Mesh(boxGeometry, createBoxMaterial(THREE, envMap));
	logoGroup.add(box);

	const letters = await createLetterMeshes(
		THREE,
		envMap,
		headingGradient.texture
	);
	logoGroup.add(letters.front, letters.back);

	const baseY = 0;
	logoGroup.position.y = baseY;
	logoGroup.rotation.set(-0.08, 0.22, 0.015);
	scene.add(logoGroup);

	const shadowTexture = createShadowTexture(THREE);
	const shadowMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(2.8, 2.8),
		new THREE.MeshBasicMaterial({
			map: shadowTexture,
			transparent: true,
			opacity: 0.32,
			depthWrite: false,
		})
	);
	shadowMesh.rotation.x = -Math.PI / 2;
	shadowMesh.position.y = -BOX_SIZE / 2 - 0.04;
	scene.add(shadowMesh);

	function frameCamera(width: number, height: number) {
		const isCompact = width < 540 || height < 420;
		if (isCompact) {
			camera.position.set(0.52, 0.14, 3.85);
			camera.lookAt(0, 0.02, 0.08);
			return;
		}

		camera.position.set(0.64, 0.16, 3.48);
		camera.lookAt(0, 0.02, 0.08);
	}

	function resize(width: number, height: number) {
		const safeWidth = Math.max(width, 1);
		const safeHeight = Math.max(height, 1);
		camera.aspect = safeWidth / safeHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(safeWidth, safeHeight, false);
		frameCamera(safeWidth, safeHeight);
	}

	function updateGradient(time: number) {
		headingGradient.update(time);
	}

	resize(container.clientWidth, container.clientHeight);

	function dispose() {
		scene.traverse((object) => {
			const mesh = object as Mesh;
			if (!mesh.isMesh) return;
			mesh.geometry.dispose();
			const materials = Array.isArray(mesh.material)
				? mesh.material
				: [mesh.material];
			materials.forEach((material) => {
				const physical = material as MeshPhysicalMaterial;
				physical.map?.dispose();
				physical.dispose();
			});
		});
		envMap.dispose();
		shadowTexture.dispose();
		headingGradient.texture.dispose();
		renderer.dispose();
	}

	return {
		renderer,
		scene,
		camera,
		logoGroup,
		shadowMesh,
		letterMaterial: letters.material,
		baseY,
		resize,
		updateGradient,
		dispose,
	};
}
