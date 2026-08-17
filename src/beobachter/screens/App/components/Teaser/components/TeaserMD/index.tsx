import React from 'react';
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
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_700,
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_1X1_210,
  STYLE_3X4_360,
  STYLE_3X4_960,
} from '../../../../../../../shared/constants/images';
import { TEASER_LAYOUT_MD } from '../../../../../../../shared/constants/teaser';
import {
  TEASER_ICON_TYPE_PLAY_BUTTON,
  TEASER_ICON_TYPE_QUOTE,
} from '../../shared/components/TeaserIcon/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../assets/graphics/bePlus.svg';
import { TeaserProps } from '../../typings';

const getStylesByProps = ({
  hasVideo,
  subtypeValue,
  __typename,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isPortraitImage = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isBrandReport = type === ADVERTISING_TYPE_BRANDREPORT;
  const isAdvertisingType = isAdvertising(type);

  return {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(TEASER_LAYOUT_MD, styles.Wrapper, {
      [styles.TextCenter]: isPortraitImage || isOpinion,
    }),
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.TextCenter]: isPortraitImage || isOpinion,
    }),
    Title: classNames(styles.Title, {
      [styles.Opinion]: isOpinion,
      [styles.Advertising]: isAdvertisingType,
    }),
    Image: classNames(styles.Image, {
      [styles.Opinion]: isOpinion,
      [styles.Portrait]: isPortraitImage,
    }),
    ImageWrapper: classNames(styles.ImageWrapper, {
      [styles.Gradient]: hasVideo && !isOpinion,
      [styles.Opinion]: isOpinion,
      [styles.Portrait]: isPortraitImage,
      [grid.ColXs12]: isPortraitImage || isOpinion,
    }),
    ShortTitle: styles.ShortTitle,
    BottomLine: classNames(styles.BottomLine, {
      [styles.BottomBrandReport]: isBrandReport,
    }),
  };
};

const getShortTitleElementByProps = ({
  advertisingTypeLabel,
  shortTitle,
  restrictionStatus,
  badgeColor,
  badgeLabel,
  subtypeValue,
  teaserImage,
  __typename,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isPortraitImage = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isAdvertisingType = isAdvertising(type);

  if (isAdvertisingType) {
    badgeLabel = shortTitle || advertisingTypeLabel;
  }

  return (
    <div
      className={classNames(styles.ShortTitleElement, {
        [styles.TextCenter]: isPortraitImage || isOpinion,
      })}
    >
      {badgeLabel && (
        <span
          className={classNames(styles.BadgeLabel, {
            [styles.Red]: badgeColor === 'purple' || badgeColor === 'default',
            [styles.Green]: badgeColor === 'petrol',
            [styles.Blue]: badgeColor === 'blue',
            [styles.Black]: badgeColor === 'black',
            [styles.TextCenter]: isPortraitImage || isOpinion,
            [styles.Advertising]: isAdvertisingType,
          })}
        >
          {badgeLabel}
        </span>
      )}

      {!isAdvertisingType && (
        <div className={styles.ShortTitleWrapper}>
          <div
            className={classNames(styles.ShortTitle, {
              [styles.TextCenter]: isPortraitImage || isOpinion,
            })}
          >
            {restrictionStatus === RESTRICTION_STATUS_PAID && (
              <Img
                addClass={classNames(styles.BeoPlusLogo, {
                  [styles.TextCenter]: isPortraitImage || isOpinion,
                })}
                alt="Beobachter Plus"
                width={26}
                height={13}
                url={beobachterPlus}
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

const isIconPositionOnImage = ({
  __typename,
  hasVideo,
  subtypeValue,
}: TeaserProps) =>
  (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
  __typename === VIDEO_CONTENT_TYPE ||
  subtypeValue === ARTICLE_TYPE_OPINION;

const getIconByProps = ({
  subtypeValue,
  __typename,
  hasVideo,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isVideo = __typename === VIDEO_CONTENT_TYPE;

  let iconType = TEASER_ICON_TYPE_PLAY_BUTTON;

  if (
    !((__typename === ARTICLE_CONTENT_TYPE && hasVideo) || isVideo || isOpinion)
  ) {
    return null;
  }

  if (isOpinion) {
    iconType = TEASER_ICON_TYPE_QUOTE;
  }

  return (
    <div
      className={classNames(styles.Icon, {
        [styles.Quote]: isOpinion,
        [styles.PlayIcon]: isVideo,
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

  if (isOpinion) {
    return {
      style_320: STYLE_1X1_140,
      style_760: STYLE_1X1_210,
    };
  }

  if (isPortraitImage) {
    return {
      style_320: STYLE_3X4_960,
      style_760: STYLE_3X4_360,
    };
  }

  return {
    style_320: STYLE_16X9_700,
    style_760: STYLE_16X9_800,
  };
};

const getInnerContentByProps = ({
  subtypeValue,
  __typename,
  authors,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isOpinion = type === ARTICLE_TYPE_OPINION;

  if (isOpinion) {
    return (
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      authors?.edges?.length > 0 && (
        <div className={styles.BottomLine}>
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
          {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */}
          {authors.edges.map(({ node }) => (
            <>
              <div>{node.name}</div>
              {node.headline && (
                <div className={styles.AuthorHeadline}>{node.headline}</div>
              )}
            </>
          ))}
        </div>
      )
    );
  }
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

const TeaserMDDefault = teaserFactory({
  isIconPositionOnImage: isIconPositionOnImage,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, hasVideo, } */
  icon: getIconByProps,
  teaserImageStyles: getTeaserImageStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, authors, teaserImage, } */
  teaserImage: getTeaserImageByProps,
  shortTitleElement: getShortTitleElementByProps,
  styles: getStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, authors, } */
  innerContent: getInnerContentByProps,
  isAuthorVisible: false,
});

export default TeaserMDDefault;
