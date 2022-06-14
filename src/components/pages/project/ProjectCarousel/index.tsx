import "react-awesome-lightbox/build/style.css";
import { Carousel } from "react-responsive-carousel";
import { isMobile } from "react-device-detect";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Lightbox from "react-awesome-lightbox";
import Image from "next/image";
import { memo, useState } from "react";

import style from "./styles.module.scss";

type IProjectCarousel = {
	gallery: {
		src: string;
		alt?: string;
		id: string;
	}[];
};

function ProjectCarousel({ gallery }: IProjectCarousel) {
	const [lightboxProps, setLightboxProps] = useState({
		isOpen: false,
		currentImage: "",
	});
	const hasProjectGalleryImages = gallery.length > 1;

	function handleOpenLightbox(imageSrc: string): void {
		setLightboxProps({
			isOpen: true,
			currentImage: imageSrc,
		});
	}

	function handleCloseLightBox(): void {
		setLightboxProps({
			isOpen: false,
			currentImage: "",
		});
	}

	if (!hasProjectGalleryImages) {
		return (
			<>
				<Carousel
					showThumbs={false}
					showStatus={false}
					showIndicators={false}
					showArrows={false}
					className={style.carouselContainer}
				>
					{gallery.map((image) => (
						<div
							className={style.carouselShowOnlyCoverContainer}
							key={image.id}
							onClick={() => handleOpenLightbox(image.src)}
						>
							<Image
								src={image.src}
								alt={image.alt}
								layout="responsive"
								priority
								width={100}
								height={100}
							/>
						</div>
					))}
				</Carousel>
				<Lightbox
					image={lightboxProps.currentImage}
					onClose={handleCloseLightBox}
				/>
			</>
		);
	}
	return (
		<>
			<Carousel
				centerMode={!isMobile}
				centerSlidePercentage={!isMobile ? 59.5 : 65}
				autoPlay
				infiniteLoop={!isMobile}
				showThumbs={false}
				showArrows
				showStatus={false}
				showIndicators
				className={style.carouselContainer}
				renderArrowNext={(clickHandler) => (
					<button
						className={style.nextImageArrowContainer}
						type="button"
						onClick={clickHandler}
						aria-label="Próxima imagem"
					>
						<HiArrowNarrowRight />
					</button>
				)}
				renderArrowPrev={(clickHandler) => (
					<button
						className={style.previousImageArrowContainer}
						type="button"
						onClick={clickHandler}
						aria-label="Imagem anterior"
					>
						<HiArrowNarrowLeft />
					</button>
				)}
				renderIndicator={(clickHandler, isSelected, index) => (
					<li>
						<button
							className={style.dot}
							onClick={clickHandler}
							data-selected={String(isSelected)}
							type="button"
							aria-label={`Indicador ${index}`}
						/>
					</li>
				)}
			>
				{gallery.map((image) => (
					<div
						className={style.carouselImagesContainer}
						key={image.id}
						onClick={() => handleOpenLightbox(image.src)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							layout="responsive"
							priority
							width={100}
							height={100}
							blurDataURL={image.src}
						/>
					</div>
				))}
			</Carousel>
			<Lightbox
				image={lightboxProps.currentImage}
				onClose={handleCloseLightBox}
			/>
		</>
	);
}

export default memo(ProjectCarousel);
