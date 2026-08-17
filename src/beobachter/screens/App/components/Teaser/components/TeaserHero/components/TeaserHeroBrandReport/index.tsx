import React, { memo } from 'react';
import classNames from 'classnames';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getFormattedElapsedDate } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture';
import {
  STYLE_1X1_280,
  STYLE_8X3_1130,
  STYLE_8X3_890,
  STYLE_SCALEH_120,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_HERO_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

type TeaserHeroBrandReportPropsInner = TeaserProps;

const TeaserHeroBrandReport = ({
  teaserImage,
  sponsor,
  trackingTeaserClick,
  preferredUri,
  title,
  authors,
  publicationDate,
  createDate,
  changeDate,
}: TeaserHeroBrandReportPropsInner) => {
  const articleImageFile = teaserImage?.image?.file || null;
  const sponsorImageFile = sponsor?.teaserImage?.image?.file || null;

  const clickHandler = (): void => {
    if (trackingTeaserClick) {
      fetch(trackingTeaserClick, { mode: 'no-cors' });
    }
  };

  const sponsorImageStyles = {
    style_320: STYLE_SCALEH_120,
  };

  const articleImageStyles = {
    style_320: STYLE_1X1_280,
    style_760: STYLE_8X3_890,
    style_960: STYLE_8X3_1130,
  };

  return (
    <div
      className={classNames(TEASER_HERO_BRANDREPORT_IDENTIFIER, styles.Wrapper)}
    >
      <Link
        path={preferredUri || ''}
        className={styles.Link}
        onClick={clickHandler}
      >
        <div className={styles.InnerWrapper}>
          {sponsorImageFile?.relativeOriginPath && (
            <Picture
              relativeOrigin={sponsorImageFile?.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              alt={sponsorImageFile?.alt}
              className={styles.SponsorImage}
              {...sponsorImageStyles}
              disableWrapperClassName
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={sponsorImageFile?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={sponsorImageFile?.focalPointY}
            />
          )}

          {articleImageFile?.relativeOriginPath && (
            <Picture
              relativeOrigin={articleImageFile?.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              alt={articleImageFile?.alt}
              className={styles.Image}
              {...articleImageStyles}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={articleImageFile?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={articleImageFile?.focalPointY}
            />
          )}
          <div className={styles.TeaserText}>
            <div className={styles.BrandReportWrapper}>
              <span className={styles.BrandReport}>BrandReport</span>
            </div>

            <div className={styles.TeaserTitleWrapper}>
              <span className={styles.TeaserTitle}>{title || ''}</span>
            </div>

            <div className={styles.AuthorWrapper}>
              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
              {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
              {authors?.edges.length > 0 &&
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                getAllAuthors({ authors: authors.edges })}{' '}
              {getFormattedElapsedDate({
                createDate: publicationDate || createDate || '',
                changeDate,
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo<TeaserHeroBrandReportPropsInner>(TeaserHeroBrandReport);
