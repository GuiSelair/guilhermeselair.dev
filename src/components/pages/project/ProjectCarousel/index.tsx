import { Carousel } from "react-responsive-carousel";
import { isMobile } from "react-device-detect";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import { memo } from "react";

import style from "./styles.module.scss";

type IProjectCarousel = {
	gallery: {
		src: string;
		alt?: string;
		id: string;
	}[];
};

function ProjectCarousel({ gallery }: IProjectCarousel) {
	const hasProjectGalleryImages = gallery.length > 1;

	if (!hasProjectGalleryImages) {
		return (
			<Carousel
				showThumbs={false}
				showStatus={false}
				showIndicators={false}
				showArrows={false}
				className={style.carouselContainer}
			>
				{gallery.map((image) => (
					<div className={style.carouselShowOnlyCoverContainer} key={image.id}>
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
		);
	}
	return (
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
				>
					<HiArrowNarrowRight />
				</button>
			)}
			renderArrowPrev={(clickHandler) => (
				<button
					className={style.previousImageArrowContainer}
					type="button"
					onClick={clickHandler}
				>
					<HiArrowNarrowLeft />
				</button>
			)}
			renderIndicator={(clickHandler, isSelected, index) => (
				<button
					className={style.dot}
					onClick={clickHandler}
					data-selected={String(isSelected)}
					type="button"
					aria-label={`Indicador ${index}`}
				/>
			)}
		>
			{gallery.map((image) => (
				<div className={style.carouselImagesContainer} key={image.id}>
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
	);
}

export default memo(ProjectCarousel);
