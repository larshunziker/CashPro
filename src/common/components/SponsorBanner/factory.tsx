import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { linkFromSponsor } from './helpers';
import TestFragment from '../../../shared/tests/components/TestFragment';
import { SponsorBannerFactoryOptions, SponsorBannerProps } from './typings';

const PREFIX_SPONSORED_BY = 'sponsored by';

const SponsorBannerFactory = ({
  Link,
  styles,
}: SponsorBannerFactoryOptions) => {
  const SponsorBanner = ({
    sponsor,
    children,
    label,
    isLabelOnTop = false,
    backgroundColor = '',
  }: SponsorBannerProps): ReactElement | null => {
    if (!children) {
      return null;
    }

    const labelJsx = (
      <div className={styles.SponsorLabelWrapper}>
        <div className={styles.Label}>
          {label === PREFIX_SPONSORED_BY ? 'Präsentiert von' : label}
        </div>
      </div>
    );

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Sponsor | undefined' is not assignable to parameter of type 'Sponsor'. */
    const sponsorImageLink = linkFromSponsor(sponsor);

    return (
      <TestFragment data-testid="sponsor-banner-wrapper">
        <Link
          /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
          path={sponsorImageLink}
          rel="sponsored"
          className={classNames('sponsor-banner', styles.Wrapper)}
        >
          <>
            <div style={{ backgroundColor: backgroundColor || '' }}>
              <div className={styles.Section}>
                <div className={styles.Banner}>
                  <div className={styles.Container}>
                    {(label && isLabelOnTop && labelJsx) || null}
                    {children}
                  </div>
                </div>
              </div>
            </div>
            {(label && !isLabelOnTop && labelJsx) || null}
          </>
        </Link>
      </TestFragment>
    );
  };

  return SponsorBanner;
};

export default SponsorBannerFactory;
