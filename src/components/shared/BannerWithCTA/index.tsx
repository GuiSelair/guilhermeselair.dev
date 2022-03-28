import { memo } from 'react';

import styles from './styles.module.scss';

type IBannerWithCTA = {
	title: string
	description?: string
	CTAText: string
	CTAAction: () => void
	backgroundImage?: string
	backgroundPositionX?: string
	backgroundPositionY?: string
	backgroundColor: string
	classNameContainer?: React.CSSProperties
}

function BannerWithCTA({
  CTAAction,
  CTAText,
  title,
  backgroundImage,
  backgroundPositionX,
  backgroundPositionY,
  description,
  classNameContainer,
  backgroundColor,
}: IBannerWithCTA) {
  return (
    <div
      className={`${styles.container} ${classNameContainer}`}
      style={{
        backgroundImage: `url("/images/${backgroundImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX,
        backgroundPositionY,
        backgroundColor,
      }}
    >
      <div>
        <h4>{title}</h4>
        <span>{description}</span>
      </div>
      <button type="button" onClick={CTAAction}>
        {CTAText}
      </button>
    </div>
  );
}

export default memo(BannerWithCTA);
