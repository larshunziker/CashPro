import React from 'react';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
import VideoParagraph from '../../../Paragraphs/components/VideoParagraph';
import HeroSponsorBanner from '../shared/HeroSponsorBanner';
import styles from './styles.legacy.css';
import { VideoProps } from './typings';

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Sponsor'. */
const HeroVideo = ({ video, sponsor = null, children }: VideoProps) => {
  return (
    <div className={classNames('hero-video', styles.Wrapper)}>
      {/* @ts-ignore TODO: TS2786 ->  'HeroSponsorBanner' cannot be used as a JSX component. */}
      <HeroSponsorBanner {...sponsor} />
      <VideoParagraph video={video as VideoType} />
      {children}
    </div>
  );
};

export default HeroVideo;
