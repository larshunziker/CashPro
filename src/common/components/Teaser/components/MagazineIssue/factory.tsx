import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../Link';
import Picture from '../../../Picture';
import {
  STYLE_2X1_PLACEHOLDER_DATA,
  STYLE_SCALEW_140,
} from '../../../../../shared/constants/images';
import {
  TRACKING_CLASS_PRINT_TEASER,
  TRACKING_PARAMS_SHOP,
} from '../../../../../shared/constants/tracking';
import skeletonStyles from './skeleton.legacy.css';
import {
  TeaserMagazineIssueComponent,
  TeaserMagazineIssueFactoryOptions,
  TeaserMagazineIssueFactoryOptionsStyles,
  TeaserMagazineIssueProps,
} from './typings';

const defaultStyles: TeaserMagazineIssueFactoryOptionsStyles = {
  Wrapper: '',
  ImageContentWrapper: '',
  ImageWrapper: '',
  Image: '',
  SpecialOfferWrapper: '',
  SpecialOfferText: '',
  ContentWrapper: '',
  IssuePublishedText: '',
  IssueLink: '',
  MagazineText: '',
  CTAWrapper: '',
  CTAWrapperDesktop: '',
  SkeletonButton: '',
  SkeletonTitle: '',
  SkeletonIssuePublished: '',
};

type SkeletonProps = {
  styles: TeaserMagazineIssueFactoryOptionsStyles;
  isOuterCTAWrapperShown: boolean;
};

const Skeleton = ({
  styles,
  isOuterCTAWrapperShown,
}: SkeletonProps): ReactElement => (
  <div className={classNames(styles.Wrapper, skeletonStyles.SkeletonWrapper)}>
    <div className={styles.ImageContentWrapper}>
      <div className={styles.ImageWrapper}>
        <img
          src={STYLE_2X1_PLACEHOLDER_DATA}
          className={skeletonStyles.SkeletonPlaceholderImage}
          alt=""
        />
      </div>
      <div
        className={classNames(
          styles.ContentWrapper,
          skeletonStyles.SkeletonContentWrapper,
        )}
      >
        <div className={styles.SkeletonIssuePublished}></div>
        <div className={styles.SkeletonTitle}></div>
        <div className={styles.CTAWrapperDesktop}>
          <div className={styles.SkeletonButton} />
        </div>
      </div>
    </div>
    {isOuterCTAWrapperShown && (
      <div className={styles.CTAWrapper}>
        <div className={styles.SkeletonButton} />
      </div>
    )}
  </div>
);

const TeaserMagazineIssueFactory = ({
  CTAButton,
  articleBoxFallbackText,
  isOuterCTAWrapperShown = false,
  styles: appStyles,
}: TeaserMagazineIssueFactoryOptions<TeaserMagazineIssueProps>): TeaserMagazineIssueComponent => {
  const MagazineIssueSection: TeaserMagazineIssueComponent = (
    props: TeaserMagazineIssueProps,
  ): ReactElement | null => {
    const { issue, isLoading } = props;

    const styles: TeaserMagazineIssueFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    if (isLoading) {
      return (
        <Skeleton
          styles={styles}
          isOuterCTAWrapperShown={isOuterCTAWrapperShown}
        />
      );
    }

    if (!issue) {
      return null;
    }

    const relativeOriginPath = issue.image?.file?.relativeOriginPath || '';
    const focalPointX = issue.image?.file?.focalPointX;
    const focalPointY = issue.image?.file?.focalPointY;

    const calltoActionButtonText =
      issue.magazine?.link?.label || 'Jetzt abonnieren';

    const shopLink =
      (issue.magazine?.link?.path &&
        `${issue.magazine?.link?.path}${TRACKING_PARAMS_SHOP}`) ||
      '';

    return (
      <div className={styles.Wrapper}>
        <div className={styles.ImageContentWrapper}>
          <div className={styles.ImageWrapper}>
            <Link
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              path={issue.link?.path}
              className={TRACKING_CLASS_PRINT_TEASER}
            >
              <Picture
                relativeOrigin={relativeOriginPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                style_320={STYLE_SCALEW_140}
                alt={issue.image?.file?.alt || 'Magazincover'}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                title={issue.image?.file?.alt}
                className={styles.Image}
                disableWrapperClassName
              />
            </Link>
            {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
            {(issue.magazine.isSpecialOffer &&
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              issue.magazine.specialOfferText &&
              shopLink && (
                <Link
                  path={shopLink}
                  className={classNames(
                    TRACKING_CLASS_PRINT_TEASER,
                    styles.SpecialOfferWrapper,
                  )}
                >
                  <div className={styles.SpecialOfferText}>
                    {issue.magazine?.specialOfferText}
                  </div>
                </Link>
              )) ||
              null}
          </div>
          <div className={styles.ContentWrapper}>
            <p className={styles.IssuePublishedText}>
              <span>Dieser Artikel erschien in der </span>
              {(issue.link?.path && (
                <Link
                  className={classNames(
                    TRACKING_CLASS_PRINT_TEASER,
                    styles.IssueLink,
                  )}
                  path={issue.link?.path}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                  label={issue.title}
                />
              )) || (
                <span data-testid="teaser-magazine-issue_issue-title-without-link">
                  {issue.title}
                </span>
              )}
            </p>
            <p
              className={styles.MagazineText}
              data-testid="teaser-magazine-issue_articleboxtext"
            >
              {issue.magazine?.articleBoxText || articleBoxFallbackText}
            </p>
            {(shopLink && (
              <div className={styles.CTAWrapperDesktop}>
                <CTAButton
                  link={{
                    path: shopLink,
                  }}
                  props={props}
                >
                  {calltoActionButtonText}
                </CTAButton>
              </div>
            )) ||
              null}
          </div>
        </div>
        {(isOuterCTAWrapperShown && shopLink && (
          <div className={styles.CTAWrapper}>
            <CTAButton
              link={{
                path: shopLink,
              }}
            >
              {calltoActionButtonText}
            </CTAButton>
          </div>
        )) ||
          null}
      </div>
    );
  };

  return MagazineIssueSection;
};

export default TeaserMagazineIssueFactory;
