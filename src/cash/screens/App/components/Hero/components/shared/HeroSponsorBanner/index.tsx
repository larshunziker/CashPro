/* istanbul ignore file */

import React from 'react';
import sponsorBannerFactory from '../../../../../../../../common/components/SponsorBanner/factory';
import Link from '../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../common/components/Picture';
import { STYLE_SCALEW_280 } from '../../../../../../../../shared/constants/images';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../App/assets/styles/variables.legacy.css'. '/Users/bhs/co */
import variables from '../../../../../../App/assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';

const SponsorBanner = sponsorBannerFactory({
  Link,
  styles: {
    Wrapper: '',
    Section: styles.InnerWrapper,
    Banner: styles.Banner,
    Container: styles.InnerBanner,
    SponsorLabelWrapper: styles.SponsorLabelWrapper,
    Label: styles.Label,
  },
});

const HeroSponsorBanner = (sponsor: Sponsor) => {
  return (
    sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
      <SponsorBanner
        isLabelOnTop
        sponsor={sponsor}
        label={sponsor?.prefix || 'Präsentiert von'}
        backgroundColor={sponsor?.colorCode || variables.white}
      >
        <Picture
          style_320={STYLE_SCALEW_280}
          relativeOrigin={sponsor?.teaserImage?.image?.file.relativeOriginPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX={sponsor?.teaserImage?.image?.file.focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY={sponsor?.teaserImage?.image?.file.focalPointY}
          alt={sponsor?.teaserImage?.image?.file?.alt || ''}
          className={styles.SponsorBannerLogo}
        />
      </SponsorBanner>
    )
  );
};

export default HeroSponsorBanner;
