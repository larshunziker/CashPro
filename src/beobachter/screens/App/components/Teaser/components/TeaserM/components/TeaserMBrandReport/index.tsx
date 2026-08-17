import React, { memo } from 'react';
import classNames from 'classnames';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getFormattedElapsedDate } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture/index';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_AUTO,
} from '../../../../../SponsorImage';
import {
  STYLE_1X1_280,
  STYLE_1X1_410,
  STYLE_2X3_210,
  STYLE_2X3_280,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

const TeaserMBrandReport = ({
  sponsor,
  teaserImage,
  trackingTeaserClick,
  preferredUri,
  title,
  authors,
  publicationDate,
  createDate,
  changeDate,
}: TeaserProps) => {
  const sponsorImageFile = sponsor?.teaserImage?.image?.file || null;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const teaserImageFile = teaserImage.image.file || null;

  const SponsorImage = sponsorImageFactory({
    position: SPONSOR_IMAGE_POSITION_AUTO,
  });

  const clickHandler = () => {
    if (trackingTeaserClick) {
      fetch(trackingTeaserClick, { mode: 'no-cors' });
    }
  };

  const teaserImageStyles = {
    style_320: STYLE_1X1_280,
    style_760: STYLE_2X3_210,
    style_960: STYLE_2X3_280,
    style_1680: STYLE_1X1_410,
  };

  return (
    <div
      className={classNames(TEASER_M_BRANDREPORT_IDENTIFIER, styles.Wrapper)}
    >
      <Link
        path={preferredUri || ''}
        className={styles.Link}
        onClick={clickHandler}
      >
        <div className={styles.InnerWrapper}>
          {sponsorImageFile?.relativeOriginPath && (
            <div className={styles.SponsorImageWrapper}>
              {/* @ts-ignore TODO: TS2322 ->  Type '(MetatagProviderInterface & NodeInterface & RouteObjectInterface & { __typename? */}
              <SponsorImage sponsor={sponsor} />
            </div>
          )}

          {teaserImageFile?.relativeOriginPath && (
            <Picture
              relativeOrigin={teaserImageFile.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              alt={teaserImageFile.alt}
              className={styles.Image}
              {...teaserImageStyles}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={teaserImageFile.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={teaserImageFile.focalPointY}
            />
          )}

          <div className={styles.TeaserText}>
            <div className={styles.BrandReportWrapper}>
              <span className={styles.BrandReport}>BrandReport</span>
            </div>

            <h2 className={styles.TeaserTitleWrapper}>
              <span className={styles.TeaserTitle}>{title || ''}</span>
            </h2>

            <div className={styles.AuthorWrapper}>
              {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
              {authors?.edges?.length > 0 &&
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

export default memo(TeaserMBrandReport);
