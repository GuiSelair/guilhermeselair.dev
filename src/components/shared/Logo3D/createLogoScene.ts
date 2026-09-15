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
const BOX_DEPTH = 0.4;
const BOX_RADIUS = 0.34;
const LETTER_DEPTH = 0.32;

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
		{ color: 0xf3f1ea, position: [-3.6, 2.2, 3.1], size: 1.1 },
		{ color: 0xdfe8f6, position: [0.2, 1.6, -4.2], size: 1.2 },
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
		metalness: 0.48,
		roughness: 0.32,
		clearcoat: 0.7,
		clearcoatRoughness: 0.22,
		envMap,
		envMapIntensity: 1.05,
		reflectivity: 0.62,
	});
}

function attachHeadingGradient(
	material: MeshPhysicalMaterial
): MeshPhysicalMaterial {
	material.onBeforeCompile = (shader) => {
		shader.uniforms.uGradientShift = { value: 0.35 };
		material.userData.gradientUniform = shader.uniforms.uGradientShift;

		shader.vertexShader = shader.vertexShader
			.replace(
				"#include <common>",
				`#include <common>
				varying vec3 vGradientPos;`
			)
			.replace(
				"#include <begin_vertex>",
				`#include <begin_vertex>
				vGradientPos = position;`
			);

		shader.fragmentShader = shader.fragmentShader
			.replace(
				"#include <common>",
				`#include <common>
				uniform float uGradientShift;
				varying vec3 vGradientPos;`
			)
			.replace(
				"#include <color_fragment>",
				`#include <color_fragment>
				vec3 c1 = vec3(0.9098, 0.9882, 0.9882);
				vec3 c2 = vec3(0.9882, 0.8431, 0.5255);
				vec3 c3 = vec3(1.0, 0.4706, 0.2941);
				float angle = 1.9129;
				float axis = vGradientPos.x * cos(angle) + vGradientPos.y * sin(angle);
				float g = clamp(axis * 0.72 + uGradientShift, 0.0, 1.0);
				vec3 grad = mix(c1, c2, smoothstep(0.112, 0.562, g));
				grad = mix(grad, c3, smoothstep(0.562, 1.0, g));
				diffuseColor.rgb *= grad;`
			);
	};

	material.customProgramCacheKey = function customProgramCacheKey() {
		return "heading-gradient-s";
	};

	return material;
}

function createLetterMaterial(THREE: ThreeModule, envMap: Texture) {
	const material = new THREE.MeshPhysicalMaterial({
		color: 0xffffff,
		metalness: 0.12,
		roughness: 0.34,
		clearcoat: 0.28,
		clearcoatRoughness: 0.3,
		envMap,
		envMapIntensity: 0.4,
	});

	return attachHeadingGradient(material);
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
		size: 0.82,
		height: LETTER_DEPTH,
		curveSegments: 16,
		bevelEnabled: true,
		bevelThickness: 0.038,
		bevelSize: 0.024,
		bevelOffset: 0,
		bevelSegments: 4,
	});
	geometry.center();
	geometry.computeBoundingBox();

	const material = createLetterMaterial(THREE, envMap);
	const front = new THREE.Mesh(geometry, material);
	front.position.z = BOX_DEPTH / 2 + LETTER_DEPTH / 2 - 0.02;

	const back = new THREE.Mesh(geometry, material);
	back.rotation.y = Math.PI;
	back.position.z = -(BOX_DEPTH / 2 + LETTER_DEPTH / 2 - 0.02);

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

	const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
	camera.position.set(0.55, 0.28, 4.15);
	camera.lookAt(0, 0.02, 0);

	scene.add(new THREE.AmbientLight(0xf4f1ea, 0.42));

	const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.18);
	keyLight.position.set(2.8, 4.2, 5.2);
	scene.add(keyLight);

	const fillLight = new THREE.DirectionalLight(0xd5deea, 0.38);
	fillLight.position.set(-4.2, 1.4, 2.6);
	scene.add(fillLight);

	const depthLight = new THREE.DirectionalLight(0xf2f2f0, 0.42);
	depthLight.position.set(-2.2, 1.8, -3.4);
	scene.add(depthLight);

	const sparkLight = new THREE.PointLight(0xffffff, 0.45, 10);
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

	const letters = await createLetterMeshes(THREE, envMap);
	logoGroup.add(letters.front, letters.back);

	const baseY = 0;
	logoGroup.position.y = baseY;
	logoGroup.rotation.set(-0.12, 0.32, 0.03);
	scene.add(logoGroup);

	const shadowTexture = createShadowTexture(THREE);
	const shadowMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(2.8, 2.8),
		new THREE.MeshBasicMaterial({
			map: shadowTexture,
			transparent: true,
			opacity: 0.48,
			depthWrite: false,
		})
	);
	shadowMesh.rotation.x = -Math.PI / 2;
	shadowMesh.position.y = -BOX_SIZE / 2 - 0.04;
	scene.add(shadowMesh);

	function frameCamera(width: number, height: number) {
		const isCompact = width < 540 || height < 420;
		if (isCompact) {
			camera.position.set(0.42, 0.22, 4.55);
			camera.lookAt(0, 0.02, 0);
			return;
		}

		camera.position.set(0.58, 0.3, 4.05);
		camera.lookAt(0, 0.02, 0);
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
		const gradientUniform = letters.material.userData.gradientUniform as
			| { value: number }
			| undefined;
		if (!gradientUniform) return;

		const cycle = (time % 6) / 6;
		gradientUniform.value =
			0.18 + 0.64 * (0.5 - 0.5 * Math.cos(cycle * Math.PI * 2));
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
		shadowMesh,
		letterMaterial: letters.material,
		baseY,
		resize,
		updateGradient,
		dispose,
	};
}
