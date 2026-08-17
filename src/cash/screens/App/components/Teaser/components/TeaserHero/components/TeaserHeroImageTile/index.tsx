import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import {
  TIME_ELAPSED_FORMAT_LONG,
  getFormattedElapsedDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import {
  getBadgeByProps,
  getShortTitleElementByProps,
  getSponsorImageByProps,
} from '../../../../shared/helpers';
import Icon from '../../../../../Icon';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_AUTO,
} from '../../../../../SponsorImage';
import {
  STYLE_1X1_640,
  STYLE_8X3_1130,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../../Teaser/constants';
import styles from './styles.legacy.css';

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_AUTO,
});

const getInnerContentByProps = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'authors' implicitly has an 'any' type. */
  authors,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'cta' implicitly has an 'any' type. */
  cta,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'createDate' implicitly has an 'any' type. */
  createDate,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'changeDate' implicitly has an 'any' type. */
  changeDate,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'publicationDate' implicitly has an 'any' type. */
  publicationDate,
}) => {
  const hasAuthors =
    authors?.edges && Array.isArray(authors.edges) && authors.edges.length > 0;

  if (cta) {
    return (
      <div className={styles.DedicatedPageLink}>
        {cta}
        <span className={styles.ArrowWrap}>
          <Icon type="IconArrowRight" />
        </span>
      </div>
    );
  }

  if (!hasAuthors) {
    return null;
  }

  return (
    <div className={styles.AuthorWrapper}>
      {getAllAuthors({ authors: authors.edges })}{' '}
      {getFormattedElapsedDate({
        createDate: publicationDate || createDate,
        changeDate: changeDate,
        format: TIME_ELAPSED_FORMAT_LONG,
        maxHours: 11,
        prefix: 'am',
      })}
    </div>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'sponsor' implicitly has an 'any' type. */
const getStylesByProps = ({ sponsor }) => ({
  Wrapper: classNames(styles.Wrapper, styles.Link, {
    [styles.WrapperWithSponsor]: sponsor,
  }),
  ContentWrapper: classNames(styles.TeaserText, styles.InnerWrapper),
  Title: styles.TeaserTitleWrapper,
  TitleInner: styles.TeaserTitle,
  BottomLine: styles.AuthorWrapper,
  ImageWrapper: styles.ImageWrapper,
  Image: classNames(TEASER_IMAGE_IDENTIFIER, styles.Image),
});

const TeaserHeroImageTile = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, link } */
  badge: getBadgeByProps(styles.Badge),
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: {
    style_320: STYLE_1X1_640,
    style_540: STYLE_1X1_640,
    style_760: STYLE_8X3_1130,
    style_960: STYLE_8X3_1130,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitleWrapper),
  /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor } */
  sponsorImage: getSponsorImageByProps(
    styles.SponsorImageWrapper,
    SponsorImage,
  ),
  /* @ts-ignore TODO: TS2322 ->  Type '({ authors, cta, createDate, changeDate, publicationDate, } */
  innerContent: getInnerContentByProps,
  isShortTitleHidden: false,
  styles: getStylesByProps,
});

const withUpdatePolicy = shouldUpdate<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  (props, nextProps) => props.title !== nextProps.title,
);

export default compose<any, any>(withUpdatePolicy)(TeaserHeroImageTile);
