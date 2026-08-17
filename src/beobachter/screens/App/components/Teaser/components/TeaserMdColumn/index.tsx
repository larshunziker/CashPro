import React from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import TeaserIcon from '../../shared/components/TeaserIcon';
import Img from '../../../Img';
import { isAdvertising } from '../../../../../../shared/helpers/isAdvertising';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_OPINION,
  RESTRICTION_STATUS_PAID,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_700,
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_1X1_210,
  STYLE_3X4_360,
  STYLE_3X4_960,
} from '../../../../../../../shared/constants/images';
import {
  TEASER_ICON_TYPE_PLAY_BUTTON,
  TEASER_ICON_TYPE_QUOTE,
} from '../../shared/components/TeaserIcon/constants';
import { TEASER_M_DEFAULT_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/bePlus.svg';

const getStylesByProps = ({
  hasVideo,
  subtypeValue,
  __typename,
  isNumbered,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isAdvertisingType = isAdvertising(type);
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isPortraitImage = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;

  return {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, TEASER_M_DEFAULT_IDENTIFIER, {
      [styles.WrapperWhiteSpace]: !isAdvertisingType && !isOpinion,
      [styles.Numbered]: !isOpinion && isNumbered,
      [styles.Portrait]: isPortraitImage,
    }),
    ContentWrapper: styles.ContentWrapper,
    Image: classNames(styles.Image, {
      [styles.Opinion]: type === ARTICLE_TYPE_OPINION,
    }),
    ImageWrapper: classNames(styles.ImageWrapper, {
      [styles.Gradient]: hasVideo,
    }),
    Title: classNames(styles.Title, {
      [styles.Advertising]: isAdvertisingType,
    }),
    ShortTitle: styles.ShortTitle,
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
  isNumbered,
  itemIndex,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isAdvertisingType = isAdvertising(type);

  if (isAdvertisingType) {
    badgeLabel = shortTitle || advertisingTypeLabel;
  }

  return (
    <div className={styles.ShortTitleElement}>
      {!isOpinion && isNumbered && (
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        <span className={styles.ContentNumber}>{itemIndex + 1}</span>
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

      {shortTitle && !isAdvertisingType && (
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
            {shortTitle !== badgeLabel && shortTitle}
          </div>
        </div>
      )}
    </div>
  );
};

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
        [styles.PlayIcon]: isVideo && !isOpinion,
      })}
    >
      <TeaserIcon
        type={iconType}
        addClass={classNames({
          [styles.PlayButton]: (hasVideo || isVideo) && !isOpinion,
          [styles.QuoteIcon]: isOpinion,
        })}
      />
    </div>
  );
};

const getTeaserImageStylesByProps = ({
  subtypeValue,
  __typename,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isPortraitImage = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;

  if (isPortraitImage) {
    return {
      style_320: STYLE_3X4_960,
      style_760: STYLE_3X4_360,
    };
  }

  if (isOpinion) {
    return {
      style_320: STYLE_1X1_140,
      style_760: STYLE_1X1_210,
    };
  }

  return {
    style_320: STYLE_16X9_700,
    style_760: STYLE_16X9_800,
  };
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

const getInnerContentByProps = ({
  isNumbered,
  itemIndex,
  subtypeValue,
  __typename,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;

  return (
    !isOpinion &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    isNumbered && <span className={styles.ImageNumber}>{itemIndex + 1}</span>
  );
};

const TeaserMdColumn = teaserFactory({
  isIconPositionOnImage: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, hasVideo, } */
  icon: getIconByProps,
  teaserImageStyles: getTeaserImageStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, authors, teaserImage, } */
  teaserImage: getTeaserImageByProps,
  shortTitleElement: getShortTitleElementByProps,
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ isNumbered, itemIndex, subtypeValue, __typename, } */
  innerContent: getInnerContentByProps,
});

export default TeaserMdColumn;
