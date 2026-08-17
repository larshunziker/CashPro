import React from 'react';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
import Picture from '../../../../../../../common/components/Picture';
import VideoParagraph from '../../../Paragraphs/components/VideoParagraph';
import SponsorBanner from '../shared/SponsorBanner';
import { STYLE_SCALEW_280 } from '../../../../../../../shared/constants/images';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../App/assets/styles/variables.legacy.css'. '/Users/bhs/code/ */
import variables from '../../../../../App/assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { VideoProps } from './typings';

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Sponsor'. */
const HeroVideo = ({ video, sponsor = null, children }: VideoProps) => (
  <div className={classNames('hero-video', styles.Wrapper)}>
    {sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
      <SponsorBanner
        isLabelOnTop
        sponsor={sponsor}
        label={sponsor?.prefix || 'Präsentiert von'}
        backgroundColor={sponsor?.colorCode || variables.white}
      >
        <Picture
          style_320={STYLE_SCALEW_280}
          relativeOrigin={sponsor.teaserImage.image.file.relativeOriginPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX={sponsor.teaserImage.image.file.focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY={sponsor.teaserImage.image.file.focalPointY}
          alt={sponsor?.teaserImage?.image?.file?.alt || ''}
          className={styles.SponsorBannerLogo}
        />
      </SponsorBanner>
    )}
    <VideoParagraph video={video as VideoType} addClass={styles.Video} />
    {children}
  </div>
);

export default HeroVideo;
