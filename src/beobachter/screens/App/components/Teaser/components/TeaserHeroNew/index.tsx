import React, { memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import Picture from '../../../../../../../common/components/Picture';
import AuthorPicture from '../../../../../../../common/components/Teaser/components/Author/components/AuthorPicture';
import Img from '../../../Img';
import TeaserIcon from '../../shared/components/TeaserIcon';
import { isAdvertising } from '../../../../../../shared/helpers/isAdvertising';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_OPINION,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_440,
  STYLE_16X9_800,
  STYLE_3X4_960,
  STYLE_BANNER_SMALL,
} from '../../../../../../../shared/constants/images';
import {
  TEASER_HERO_ADVERTORIAL_IDENTIFIER,
  TEASER_HERO_BRANDREPORT_IDENTIFIER,
  TEASER_HERO_DEFAULT_IDENTIFIER,
  TEASER_HERO_EXPLAINING_IDENTIFIER,
  TEASER_HERO_OPINION_IDENTIFIER,
  TEASER_HERO_PORTRAIT_IDENTIFIER,
} from '../../constants';
import { TEASER_ICON_TYPE_PLAY_BUTTON } from '../../shared/components/TeaserIcon/constants';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/bePlus.svg';

const getStylesByProps = ({
  hasVideo,
  subtypeValue,
  __typename,
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  const isBrandReport = type === ADVERTISING_TYPE_BRANDREPORT;
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isOpinion = type === ARTICLE_TYPE_OPINION;
  const isExplainingArticle = type === EXPLAINING_ARTICLE_CONTENT_TYPE;
  const isAdvertisingType = isAdvertising(type);

  const isDefault =
    !isAdvertisingType && !isOpinion && !isPortrait && !isExplainingArticle;

  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.Portrait]: isPortrait,
      [TEASER_HERO_ADVERTORIAL_IDENTIFIER]: isAdvertisingType && !isBrandReport,
      [TEASER_HERO_BRANDREPORT_IDENTIFIER]: isBrandReport,
      [TEASER_HERO_OPINION_IDENTIFIER]: isOpinion,
      [TEASER_HERO_PORTRAIT_IDENTIFIER]: isPortrait,
      [TEASER_HERO_EXPLAINING_IDENTIFIER]: isExplainingArticle,
      [TEASER_HERO_DEFAULT_IDENTIFIER]: isDefault,
    }),
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.Portrait]: isPortrait,
    }),
    Title: classNames(styles.Title, {
      [styles.Advertising]: isAdvertisingType,
    }),
    Lead: classNames(styles.Lead, {
      [styles.Opinion]: isOpinion,
    }),
    Image: styles.Image,
    ImageWrapper: classNames(styles.ImageWrapper, {
      [styles.Gradient]: hasVideo,
      [styles.Portrait]: isPortrait,
    }),
    ShortTitle: styles.ShortTitle,
    BottomLineWrapper: classNames(styles.BottomLineWrapper, {
      [styles.BottomBrandReport]: isBrandReport,
    }),
    BottomLine: styles.BottomLine,
    AuthorPicture: styles.AuthorPicture,
    AuthorHeadline: styles.AuthorHeadline,
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
  teaserImage,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';
  const isAdvertisingType = isAdvertising(type);
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;

  if (isAdvertisingType) {
    badgeLabel = shortTitle || advertisingTypeLabel;
  }
  return (
    <div
      className={classNames(styles.ShortTitleElement, {
        [styles.Portrait]: isPortrait,
      })}
    >
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
          {!isAdvertisingType && shortTitle}
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
        <AuthorPicture
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ImageParagraph> | undefined' is not assignable to type 'ImageParagraph'. */
          imageParagraph={author.imageParagraph}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          name={author.name}
          className={styles.AuthorPicture}
        />
        <div>
          <div className={styles.AuthorName}>{author.name}</div>
          <div className={styles.AuthorHeadline}>{author.headline}</div>
        </div>
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

const isAuthorVisibleByProps = ({
  subtypeValue,
  __typename,
}: TeaserFactoryProps) => {
  const type = subtypeValue || __typename || '';

  return type !== ARTICLE_TYPE_OPINION;
};

const getTeaserImageStyles = ({ teaserImage }: TeaserFactoryProps) => {
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;

  return {
    style_320: isPortrait ? STYLE_3X4_960 : STYLE_16X9_440,
    style_960: isPortrait ? STYLE_3X4_960 : STYLE_16X9_800,
  };
};

const getIconByProps = ({
  __typename,
  hasVideo,
  teaserImage,
}: TeaserFactoryProps) => {
  const isPortrait = teaserImage?.format === IMAGE_FORMAT_PORTRAIT;
  const isVideo = __typename === VIDEO_CONTENT_TYPE;

  if (!((__typename === ARTICLE_CONTENT_TYPE && hasVideo) || isVideo)) {
    return null;
  }

  return (
    <div
      className={classNames(styles.Icon, {
        [styles.Portrait]: isPortrait,
        [styles.PlayButton]: isVideo && !isPortrait,
      })}
    >
      <TeaserIcon
        type={TEASER_ICON_TYPE_PLAY_BUTTON}
        addClass={classNames({
          [styles.PlayIcon]: isVideo && !isPortrait,
        })}
      />
    </div>
  );
};

const TeaserHeroDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo, teaserImage, } */
  icon: getIconByProps,
  teaserImageStyles: getTeaserImageStyles,
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

export default memo(TeaserHeroDefault);
