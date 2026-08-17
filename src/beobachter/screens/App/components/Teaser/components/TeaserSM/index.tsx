import React, { memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import Img from '../../../Img';
import TeaserIcon from '../../shared/components/TeaserIcon';
import { isAdvertising } from '../../../../../../shared/helpers/isAdvertising';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_OPINION,
  RESTRICTION_STATUS_PAID,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';
import { TEASER_LAYOUT_SM } from '../../../../../../../shared/constants/teaser';
import {
  TEASER_ICON_TYPE_PLAY_BUTTON,
  TEASER_ICON_TYPE_QUOTE,
} from '../../shared/components/TeaserIcon/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/bePlus.svg';

const getIconByProps = ({
  subtypeValue,
  __typename,
  hasVideo,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isVideo = __typename === VIDEO_CONTENT_TYPE;

  if (
    !((__typename === ARTICLE_CONTENT_TYPE && hasVideo) || isVideo || isOpinion)
  ) {
    return null;
  }

  const iconType = isOpinion
    ? TEASER_ICON_TYPE_QUOTE
    : TEASER_ICON_TYPE_PLAY_BUTTON;

  return (
    <div
      className={classNames(styles.Icon, {
        [styles.Quote]: isOpinion,
        [styles.PlayButton]: isVideo && !isOpinion,
      })}
    >
      <TeaserIcon
        type={iconType}
        addClass={classNames({
          [styles.PlayIcon]: (hasVideo || isVideo) && !isOpinion,
          [styles.IconQuote]: isOpinion,
        })}
      />
    </div>
  );
};

const getTeaserImageByProps = ({
  subtypeValue,
  __typename,
  authors,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  const isOpinion = type === ARTICLE_TYPE_OPINION;

  if (isOpinion) {
    return authors?.edges?.[0]?.node?.imageParagraph;
  }

  return teaserImage;
};

const getStylesByProps = ({
  hasVideo,
  subtypeValue,
  __typename,
  isNumbered,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isAdvertisingType = isAdvertising(type);

  return {
    Wrapper: classNames(TEASER_LAYOUT_SM, styles.Wrapper),
    ContentWrapper: classNames(styles.ContentWrapper, grid.ColXs18, {
      [styles.Numbered]: isNumbered,
    }),
    Title: classNames(styles.Title, {
      [styles.Advertising]: isAdvertisingType,
    }),
    Image: classNames(styles.Image, {
      [styles.Opinion]: isOpinion,
    }),
    ImageWrapper: classNames(styles.ImageWrapper, grid.ColXs6, {
      [styles.Gradient]: hasVideo && !isOpinion,
    }),
    ShortTitle: styles.ShortTitle,
    SkeletonWrapper: styles.SkeletonWrapper,
    SkeletonContentWrapper: styles.SkeletonContentWrapper,
    SkeletonShortTitle: styles.SkeletonShortTitle,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

const getShortTitleElementByProps = ({
  advertisingTypeLabel,
  shortTitle,
  restrictionStatus,
  badgeColor,
  badgeLabel,
  subtypeValue,
  __typename,
  itemIndex,
  isNumbered,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isAdvertisingType = isAdvertising(type);
  const isBrandreport = type === ADVERTISING_TYPE_BRANDREPORT;

  if (isAdvertisingType) {
    badgeLabel = shortTitle || advertisingTypeLabel;
  }

  return (
    <>
      {isNumbered && (
        <div
          className={classNames(styles.Index, {
            [styles.CustomIndex]: isBrandreport || badgeLabel,
          })}
        >
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {itemIndex + 1}
        </div>
      )}
      {badgeLabel && (
        <span
          className={classNames(styles.BadgeLabel, {
            [styles.Red]: badgeColor === 'purple' || badgeColor === 'default',
            [styles.Green]: badgeColor === 'petrol',
            [styles.Blue]: badgeColor === 'blue',
            [styles.Black]: badgeColor === 'black',
            [styles.Advertising]: isAdvertisingType,
          })}
        >
          {badgeLabel}
        </span>
      )}

      {!isAdvertisingType && (shortTitle || restrictionStatus) && (
        <div className={styles.ShortTitleWrapper}>
          <div className={styles.ShortTitle}>
            {restrictionStatus === RESTRICTION_STATUS_PAID && (
              <Img
                addClass={styles.BeoPlusLogo}
                alt="Beobachter Plus"
                url={beobachterPlus}
                width={26}
                height={13}
                ignoreLandscapeClass
              />
            )}
            {!isAdvertisingType && shortTitle}
          </div>
        </div>
      )}
    </>
  );
};

const TeaserSM = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, hasVideo, } */
  icon: getIconByProps,
  teaserImageStyles: {
    style_320: STYLE_1X1_140,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, authors, teaserImage, } */
  teaserImage: getTeaserImageByProps,
  shortTitleElement: getShortTitleElementByProps,
  isIconPositionOnImage: true,
  styles: getStylesByProps,
});

export default memo(TeaserSM);
