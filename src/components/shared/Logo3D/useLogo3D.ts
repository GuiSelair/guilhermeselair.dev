import { useEffect, useRef, useState } from "react";

import { createLogoScene } from "./createLogoScene";
import type { LogoSceneController } from "./createLogoScene";

function lerp(start: number, end: number, amount: number) {
	return start + (end - start) * amount;
}

export function useLogo3D() {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;

		if (!canvas || !container) return undefined;
		if (typeof window === "undefined") return undefined;

		const state = {
			disposed: false,
			frame: 0,
			controller: null as LogoSceneController | null,
		};

		const mouse = { x: 0, y: 0 };
		const mouseTarget = { x: 0, y: 0 };
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		function handlePointerMove(event: PointerEvent) {
			mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouseTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
		}

		function handleResize() {
			if (!state.controller || !container) return;
			state.controller.resize(container.clientWidth, container.clientHeight);
		}

		function syncReflection(
			controller: LogoSceneController,
			time: number,
			intro: number
		) {
			const { logoGroup, reflectionGroup, shadowMesh, baseY } = controller;
			const floatOffset = reduceMotion ? 0 : Math.sin(time * 0.7) * 0.045;

			reflectionGroup.position.set(
				logoGroup.position.x,
				-(baseY + floatOffset),
				logoGroup.position.z
			);
			reflectionGroup.rotation.set(
				-logoGroup.rotation.x,
				logoGroup.rotation.y,
				-logoGroup.rotation.z
			);

			const shadowMaterial = shadowMesh.material as {
				opacity: number;
			};
			shadowMesh.position.x = logoGroup.position.x;
			shadowMesh.position.z = logoGroup.position.z + 0.12;
			shadowMesh.scale.setScalar(0.92 + floatOffset * 0.8);
			shadowMaterial.opacity = intro * (0.7 - floatOffset * 1.4);
		}

		function renderFrame(
			controller: LogoSceneController,
			clock: { getElapsedTime: () => number }
		) {
			if (state.disposed) return;

			const time = clock.getElapsedTime();
			const intro = reduceMotion ? 1 : 1 - (1 - Math.min(time / 1.65, 1)) ** 3;

			mouse.x = lerp(mouse.x, mouseTarget.x, 0.045);
			mouse.y = lerp(mouse.y, mouseTarget.y, 0.045);

			const idleY = reduceMotion ? 0.42 : time * 0.22 + 0.42;
			const idleX = reduceMotion ? -0.16 : Math.sin(time * 0.45) * 0.08;
			const floatY = reduceMotion ? 0 : Math.sin(time * 0.7) * 0.045;

			controller.logoGroup.rotation.y = idleY + mouse.x * 0.32;
			controller.logoGroup.rotation.x = idleX - 0.12 + mouse.y * 0.18;
			controller.logoGroup.rotation.z = reduceMotion
				? 0.04
				: Math.sin(time * 0.35) * 0.03;
			controller.logoGroup.position.y = controller.baseY + floatY;
			controller.logoGroup.scale.setScalar(0.92 + intro * 0.08);

			syncReflection(controller, time, intro);

			controller.renderer.render(controller.scene, controller.camera);
			state.frame = requestAnimationFrame(() => renderFrame(controller, clock));
		}

		async function setup() {
			const THREE = await import("three");
			if (state.disposed) return;

			const controller = await createLogoScene(canvas, container, THREE);

			if (state.disposed) {
				controller.dispose();
				return;
			}

			state.controller = controller;
			setIsVisible(true);

			const clock = new THREE.Clock();
			renderFrame(controller, clock);
		}

		setup();

		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		window.addEventListener("resize", handleResize);

		const observer = new ResizeObserver(handleResize);
		observer.observe(container);

		function handleVisibility() {
			if (document.hidden || !state.controller) return;
			handleResize();
		}

		document.addEventListener("visibilitychange", handleVisibility);

		return () => {
			state.disposed = true;
			cancelAnimationFrame(state.frame);
			observer.disconnect();
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("visibilitychange", handleVisibility);
			state.controller?.dispose();
		};
	}, []);

	return {
		containerRef,
		canvasRef,
		isVisible,
	};
}
