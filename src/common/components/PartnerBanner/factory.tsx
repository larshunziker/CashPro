import React, { ReactElement, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { linkFromSponsor } from '../SponsorBanner/helpers';
import CSSPicture from '../CSSPicture';
import Link from '../Link';
import Picture from '../Picture';
import {
  STYLE_BANNER_LARGE,
  STYLE_BANNER_MEDIUM,
  STYLE_BANNER_SMALL,
  STYLE_SCALEH_120,
} from '../../../shared/constants/images';
import {
  PartnerBannerComponent,
  PartnerBannerFactoryOptions,
  PartnerBannerProps,
} from './typings';

type PartnerBannerPropsInner = PartnerBannerProps & {
  routePathname: string;
  routeScreenReady: string;
};

const PartnerBannerFactory = ({ styles }: PartnerBannerFactoryOptions) => {
  const PartnerBanner: PartnerBannerComponent = ({
    sponsors = [],
  }: PartnerBannerPropsInner): ReactElement => {
    const [randomNumber, setRandomNumber] = useState(0);
    const hasSponsors =
      sponsors &&
      Array.isArray(sponsors) &&
      sponsors.length > 0 &&
      Object.keys(sponsors[0]).length > 0;

    useEffect(() => {
      const sponsorsNumber = hasSponsors ? sponsors.length : 0;
      setRandomNumber(Math.floor(Math.random() * sponsorsNumber));
    }, [hasSponsors, sponsors]);

    if (!hasSponsors) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <>
        <div className={styles.ImageContainer}>
          <div className={styles.BackgroundImageWrapper}>
            <CSSPicture
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              relativeOriginPath={
                sponsors?.[randomNumber]?.node?.backgroundImage?.file
                  ?.relativeOriginPath
              }
              style_320={STYLE_BANNER_SMALL}
              style_540={STYLE_BANNER_MEDIUM}
              style_1680={STYLE_BANNER_LARGE}
            >
              {({ className }) => {
                return (
                  <Link
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<Sponsor> | undefined' is not assignable to parameter of type 'Sponsor'. */
                    path={linkFromSponsor(sponsors?.[randomNumber].node)}
                    rel="sponsored"
                    className={classNames(styles.BackgroundImage, className)}
                    aria-label={`Sponsor: ${
                      sponsors?.[randomNumber]?.node?.title || ''
                    }`}
                  >
                    <Picture
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                      relativeOrigin={
                        sponsors?.[randomNumber]?.node?.teaserImage?.image?.file
                          ?.relativeOriginPath
                      }
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                      focalPointX={
                        sponsors?.[randomNumber]?.node?.teaserImage?.image?.file
                          ?.focalPointX
                      }
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                      focalPointY={
                        sponsors?.[randomNumber]?.node?.teaserImage?.image?.file
                          ?.focalPointY
                      }
                      style_320={STYLE_SCALEH_120}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                      alt={sponsors?.[randomNumber]?.node?.title}
                      className={styles.PartnerLogo}
                      disableWrapperClassName
                    />
                  </Link>
                );
              }}
            </CSSPicture>
          </div>
        </div>

        <span
          className={styles.Caption}
          dangerouslySetInnerHTML={{
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | TrustedHTML'. */
            __html: sponsors[randomNumber]?.node?.teaserImage?.caption,
          }}
        />
      </>
    );
  };

  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    routePathname: state.route.locationBeforeTransitions.pathname,
    routeScreenReady: state.route.screenReady,
  });

  function arePropsEqual(
    prevProps: PartnerBannerPropsInner,
    nextProps: PartnerBannerPropsInner,
  ) {
    return (
      (prevProps.routePathname &&
        nextProps.routePathname &&
        prevProps.routePathname === nextProps.routePathname) ||
      (prevProps.routeScreenReady && !nextProps.routeScreenReady) ||
      (!prevProps.routeScreenReady && !nextProps.routeScreenReady)
    );
  }

  return connect(mapStateToProps)(memo(PartnerBanner, arePropsEqual));
};

export default PartnerBannerFactory;
