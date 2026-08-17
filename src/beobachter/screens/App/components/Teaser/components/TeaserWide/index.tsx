import React, { memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import { isAdvertising } from '../../../../../../shared/helpers/isAdvertising';
import { shortTitleFallback } from '../../../../screens/LegalAdvice/helpers/shortTitleFallback';
import Picture from '../../../../../../../common/components/Picture';
import Img from '../../../Img';
import TeaserIcon from '../../shared/components/TeaserIcon';
import TeaserLegalAdvice from '../TeaserLegalAdvice';
import { typesCode2Name } from '../../../../screens/LegalAdvice/legalAdviceConfig';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_OPINION,
  PRODUCT_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  SPONSOR_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_1X1_210,
  STYLE_3X4_960,
  STYLE_BANNER_SMALL,
  STYLE_BOOK_TEASER,
} from '../../../../../../../shared/constants/images';
import { TEASER_LAYOUT_WIDE } from '../../../../../../../shared/constants/teaser';
import {
  TEASER_ICON_TYPE_PLAY_BUTTON,
  TEASER_ICON_TYPE_QUOTE,
} from '../../shared/components/TeaserIcon/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/bePlus.svg';

const getStylesByProps = ({
  hasVideo,
  subtypeValue,
  __typename,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isBrandreport = type === ADVERTISING_TYPE_BRANDREPORT;
  const isAdvertisingType = isAdvertising(type);

  return {
    Wrapper: classNames(TEASER_LAYOUT_WIDE, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: classNames(styles.Title, {
      [styles.Advertising]: isAdvertisingType,
    }),
    Lead: classNames(styles.Lead, {
      [styles.Opinion]: type === ARTICLE_TYPE_OPINION,
    }),
    Summary: styles.Summary,
    Image: classNames(styles.Image, {
      [styles.Opinion]: type === ARTICLE_TYPE_OPINION,
      [styles.Portrait]: isPortrait,
    }),
    ImageWrapper: classNames(styles.ImageWrapper, grid.ColXs6, {
      [styles.Gradient]: hasVideo && type !== ARTICLE_TYPE_OPINION,
      [styles.Opinion]: type === ARTICLE_TYPE_OPINION && !isPortrait,
      [styles.Portrait]: type !== ARTICLE_TYPE_OPINION && isPortrait,
    }),
    ShortTitle: styles.ShortTitle,
    BottomLine: classNames(styles.BottomLine, {
      [styles.BottomBrandReport]: isBrandreport,
    }),
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
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isAdvertisingType = isAdvertising(type);

  if (isAdvertisingType) {
    badgeLabel = shortTitle || advertisingTypeLabel;
  }
  const isBook = type === PRODUCT_CONTENT_TYPE;

  if (isBook) {
    badgeLabel = 'Buch';
    badgeColor = 'default';
  }

  return (
    <div className={styles.ShortTitleElement}>
      {badgeLabel && (
        <div
          className={classNames(styles.BadgeLabel, {
            [styles.Red]: badgeColor === 'purple' || badgeColor === 'default',
            [styles.Green]: badgeColor === 'petrol',
            [styles.Blue]: badgeColor === 'blue',
            [styles.Black]: badgeColor === 'black',
            [styles.Advertising]: isAdvertisingType,
          })}
        >
          {badgeLabel}
        </div>
      )}
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
          {!isAdvertisingType && !isBook && shortTitle}
        </div>
      </div>
    </div>
  );
};

const getInnerContentByProps = ({
  subtypeValue,
  __typename,
  sponsor,
  authors,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const author = authors?.edges?.[0]?.node || null;

  if (type === ARTICLE_TYPE_OPINION && author) {
    return (
      <div className={styles.AuthorOpinionWrapper}>
        <div className={styles.AuthorName}>{author.name}</div>
        <div className={styles.AuthorHeadline}>{author.headline}</div>
      </div>
    );
  }

  const imageFile = sponsor?.teaserImage?.image?.file || null;

  if (type !== ADVERTISING_TYPE_BRANDREPORT || !imageFile) {
    return null;
  }

  const {
    alt = '',
    relativeOriginPath = '',
    focalPointX = null,
    focalPointY = null,
  } = imageFile;

  return (
    <Picture
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string>' is not assignable to type 'string | undefined'. */
      relativeOrigin={relativeOriginPath}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string>' is not assignable to type 'string'. */
      alt={alt}
      className={styles.SponsorLogo}
      style_320={STYLE_BANNER_SMALL}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number>' is not assignable to type 'number | undefined'. */
      focalPointX={focalPointX}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number>' is not assignable to type 'number | undefined'. */
      focalPointY={focalPointY}
    />
  );
};

const getTeaserImageStylesByProps = ({
  teaserImage,
  subtypeValue,
  __typename,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isBook = type === PRODUCT_CONTENT_TYPE;

  let style_760 = STYLE_16X9_800;

  if (isPortrait) {
    style_760 = STYLE_3X4_960;
  }
  if (isBook) {
    style_760 = STYLE_BOOK_TEASER;
  }
  if (isOpinion) {
    style_760 = STYLE_1X1_210;
  }

  return {
    style_320: STYLE_1X1_140,
    style_760,
    ignoreFocalPoint: type === SPONSOR_CONTENT_TYPE,
  };
};

const getIconByProps = ({
  subtypeValue,
  __typename,
  hasVideo,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
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
        [styles.Portrait]: isPortrait && !isOpinion,
        [styles.PlayButton]: isVideo && !isOpinion,
      })}
    >
      <TeaserIcon
        type={iconType}
        addClass={classNames({
          [styles.PlayButtonIcon]: (hasVideo || isVideo) && !isOpinion,
        })}
      />
    </div>
  );
};

const isAuthorVisibleByProps = ({
  subtypeValue,
  __typename,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  return type !== ARTICLE_TYPE_OPINION;
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
const TeaserWideDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, hasVideo, teaserImage, } */
  icon: getIconByProps,
  teaserImageStyles: getTeaserImageStylesByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, authors, teaserImage, } */
  teaserImage: getTeaserImageByProps,
  disableWrapperClassName: true,
  leadOptions: {
    suffixText: '',
  },
  shortTitleElement: getShortTitleElementByProps,
  isIconPositionOnImage: true,
  styles: getStylesByProps,
  isAuthorVisible: isAuthorVisibleByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, __typename, sponsor, authors, } */
  innerContent: getInnerContentByProps,
});
const TeaserWide = (props: any) => {
  if (
    [
      ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
      ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
    ].includes(props.subtypeValue)
  ) {
    return (
      <TeaserLegalAdvice
        {...{
          ...props,
          badgeLabel: 'Rechtsratgeber',
          shortTitle:
            typesCode2Name[props.toolType] || shortTitleFallback(props),
        }}
      />
    );
  }
  return <TeaserWideDefault {...props} />;
};
export default memo(TeaserWide);
