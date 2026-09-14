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

const BOX_SIZE = 1.62;
const BOX_DEPTH = 0.46;
const BOX_RADIUS = 0.34;
const LETTER_DEPTH = 0.12;

const BOX_COLOR = 0x2c2c29;
const LETTER_COLOR = 0xf7f1e8;
const RIM_COLOR = 0xff784b;

export interface LogoSceneController {
	renderer: WebGLRenderer;
	scene: Scene;
	camera: PerspectiveCamera;
	logoGroup: Group;
	reflectionGroup: Group;
	shadowMesh: Mesh;
	baseY: number;
	resize: (width: number, height: number) => void;
	dispose: () => void;
}

function createStudioEnvMap(THREE: ThreeModule, renderer: WebGLRenderer) {
	const envScene = new THREE.Scene();
	const bulbs = [
		{ color: 0xffffff, position: [3.4, 4.6, 2.4], size: 1.5 },
		{ color: 0xffe2c8, position: [-3.6, 2.2, 3.1], size: 1.1 },
		{ color: RIM_COLOR, position: [0.2, 1.6, -4.2], size: 1.35 },
		{ color: 0xd5e2ff, position: [-2.4, -1.2, -2.2], size: 0.85 },
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
	const envMap = pmrem.fromScene(envScene, 0.05).texture;
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
	gradient.addColorStop(0, "rgba(0, 0, 0, 0.62)");
	gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.28)");
	gradient.addColorStop(0.72, "rgba(0, 0, 0, 0.08)");
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
		metalness: 0.52,
		roughness: 0.3,
		clearcoat: 0.78,
		clearcoatRoughness: 0.2,
		envMap,
		envMapIntensity: 1.15,
		reflectivity: 0.7,
	});
}

function createLetterMaterial(THREE: ThreeModule, envMap: Texture) {
	return new THREE.MeshPhysicalMaterial({
		color: LETTER_COLOR,
		metalness: 0.14,
		roughness: 0.36,
		clearcoat: 0.4,
		clearcoatRoughness: 0.28,
		emissive: 0x2a241c,
		emissiveIntensity: 0.18,
		envMap,
		envMapIntensity: 0.55,
	});
}

function fadeMaterial(material: Material) {
	const faded = (material as MeshPhysicalMaterial).clone();
	faded.transparent = true;
	faded.opacity = 0.28;
	faded.depthWrite = false;
	faded.roughness = Math.min(1, faded.roughness + 0.28);
	faded.envMapIntensity = faded.envMapIntensity * 0.35;
	faded.emissiveIntensity = faded.emissiveIntensity * 0.25;
	return faded;
}

async function createLetterMeshes(THREE: ThreeModule, envMap: Texture) {
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
		size: 0.78,
		height: LETTER_DEPTH,
		curveSegments: 14,
		bevelEnabled: true,
		bevelThickness: 0.018,
		bevelSize: 0.014,
		bevelOffset: 0,
		bevelSegments: 3,
	});
	geometry.center();
	geometry.computeBoundingBox();

	const material = createLetterMaterial(THREE, envMap);
	const front = new THREE.Mesh(geometry, material);
	front.position.z = BOX_DEPTH / 2 - 0.03;
	front.castShadow = false;

	const back = new THREE.Mesh(geometry, material);
	back.rotation.y = Math.PI;
	back.position.z = -(BOX_DEPTH / 2 - 0.03);

	return { front, back };
}

function createReflectionGroup(THREE: ThreeModule, source: Group) {
	const reflection = source.clone(true);

	reflection.traverse((child) => {
		const mesh = child as Mesh;
		if (!mesh.isMesh) return;

		if (Array.isArray(mesh.material)) {
			mesh.material = mesh.material.map((item) => fadeMaterial(item));
			return;
		}

		mesh.material = fadeMaterial(mesh.material);
	});

	reflection.scale.y = -1;
	return reflection;
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
	renderer.toneMappingExposure = 1.08;

	const scene = new THREE.Scene();
	const envMap = createStudioEnvMap(THREE, renderer);
	scene.environment = envMap;

	const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40);
	camera.position.set(0.15, 0.72, 4.55);
	camera.lookAt(0, 0.08, 0);

	scene.add(new THREE.AmbientLight(0xf3eee6, 0.32));

	const keyLight = new THREE.DirectionalLight(0xfff6ea, 1.32);
	keyLight.position.set(3.4, 5.4, 4.2);
	scene.add(keyLight);

	const fillLight = new THREE.DirectionalLight(0xb9c8e4, 0.32);
	fillLight.position.set(-4.4, 1.6, 2.4);
	scene.add(fillLight);

	const rimLight = new THREE.DirectionalLight(RIM_COLOR, 0.58);
	rimLight.position.set(-1.4, 2.6, -4.8);
	scene.add(rimLight);

	const bounceLight = new THREE.DirectionalLight(0xffc8a8, 0.18);
	bounceLight.position.set(0.4, -3.2, 1.4);
	scene.add(bounceLight);

	const sparkLight = new THREE.PointLight(0xffffff, 0.7, 10);
	sparkLight.position.set(1.5, 2.3, 2.6);
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

	const letters = await createLetterMeshes(THREE, envMap);
	logoGroup.add(letters.front, letters.back);

	const baseY = BOX_SIZE / 2 + 0.12;
	logoGroup.position.y = baseY;
	logoGroup.rotation.set(-0.16, 0.42, 0.04);
	scene.add(logoGroup);

	const reflectionGroup = createReflectionGroup(THREE, logoGroup);
	reflectionGroup.position.set(
		logoGroup.position.x,
		-logoGroup.position.y,
		logoGroup.position.z
	);
	reflectionGroup.rotation.set(
		-logoGroup.rotation.x,
		logoGroup.rotation.y,
		-logoGroup.rotation.z
	);
	scene.add(reflectionGroup);

	const shadowTexture = createShadowTexture(THREE);
	const shadowMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(3.4, 3.4),
		new THREE.MeshBasicMaterial({
			map: shadowTexture,
			transparent: true,
			opacity: 0.72,
			depthWrite: false,
		})
	);
	shadowMesh.rotation.x = -Math.PI / 2;
	shadowMesh.position.y = 0.001;
	scene.add(shadowMesh);

	function resize(width: number, height: number) {
		const safeWidth = Math.max(width, 1);
		const safeHeight = Math.max(height, 1);
		camera.aspect = safeWidth / safeHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(safeWidth, safeHeight, false);
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
		renderer.dispose();
	}

	return {
		renderer,
		scene,
		camera,
		logoGroup,
		reflectionGroup,
		shadowMesh,
		baseY,
		resize,
		dispose,
	};
}
