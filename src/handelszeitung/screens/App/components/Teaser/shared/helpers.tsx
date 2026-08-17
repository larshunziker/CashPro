import React from 'react';
import classNames from 'classnames';
// import { IfFeatureEnabled } from '@growthbook/growthbook-react';
import { getAllAuthors } from '../../../../../../shared/helpers/authors';
import {
  TIME_ELAPSED_FORMAT_LONG,
  formatElapsedDate,
  getFormattedElapsedDate,
} from '../../../../../../shared/helpers/dateTimeElapsed';
import { isRestrictedContent } from '../../../../../../shared/helpers/restrictedContent';
import Picture from '../../../../../../common/components/Picture';
import Img from '../../Img';
import Logo from '../../Logo';
import TeaserBadge from '../components/TeaserBadge';
import TeaserIcon from '../components/TeaserIcon';
import IfFeatureDisabled from '../../../../../../common/components/IfFeatureDisabled';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_ADVERTORIAL_LABEL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_BRANDREPORT_LABEL,
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_ASSOCIATION,
  ARTICLE_TYPE_ASSOCIATION_LABEL,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_LONG_READ_LABEL,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_OPINION_LABEL,
  ARTICLE_TYPE_SEATCHANGE,
  ARTICLE_TYPE_SEATCHANGE_LABEL,
  CHANNEL_TYPE_SPECIAL,
  CHANNEL_TYPE_SPECIAL_LABEL,
  CONTENT_SOURCE_TICKER,
  DOSSIER_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE_LABEL,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import { STYLE_1X1_140 } from '../../../../../../shared/constants/images';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../shared/constants/publications';
import { LOGO_HZ_BRAND_REPORT } from '../../Logo/constants';
import {
  TEASER_ICON_TYPE_GALLERY,
  TEASER_ICON_TYPE_VIDEO,
} from '../components/TeaserIcon/constants';
import { TEASER_IMAGE_IDENTIFIER } from '../constants';
import { ABO_BADGE_REMOVAL_FEATURE } from '../../../constants';
import defaultStyles from './defaultStyles.legacy.css';
import nativeAdvertisingSVG from '../../../assets/graphics/nativeAdvertisingSVG/nativeAdvertising.svg';
import publireportageSVG from '../../../assets/graphics/publireportageSVG/publireportage.svg';
import { TeaserFactoryProps } from '../../../../../../common/components/Teaser/typings';

const isLongRead = ({ subtypeValue }: TeasableInterfaceNode) =>
  subtypeValue === ARTICLE_TYPE_LONG_READ;

const getAuthorImages = (authors: Pick<TeaserFactoryProps, 'authors'>) => {
  // check authors
  if (!authors || !Array.isArray(authors) || authors.length === 0) {
    return null;
  }

  // handle first 2 authors and ignore the others
  const authorsReduced = authors
    .slice(0, 2)
    .map((item, index) => {
      const alt = item?.node?.imageParagraph?.image?.file?.alt || '';

      const img =
        item?.node?.imageParagraph?.image?.file?.relativeOriginPath || null;
      const focalPointX =
        item?.node?.imageParagraph?.image?.file?.focalPointX || null;
      const focalPointY =
        item?.node?.imageParagraph?.image?.file?.focalPointY || null;

      // handle no image
      if (!img) {
        return null;
      }

      return (
        (img && (
          <Picture
            key={`author-image-${index}`}
            relativeOrigin={img}
            focalPointX={focalPointX}
            focalPointY={focalPointY}
            alt={alt}
            className={classNames(defaultStyles.AuthorAvatar)}
            style_320={STYLE_1X1_140}
          />
        )) ||
        null
      );
    })
    .filter((item) => !!item);

  return authorsReduced;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
export const ensureTeaserInterfaceItem = (item, index?: number) => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  const subtypeValue = item.subtypeValue || item.node?.subtypeValue;
  const publication = item.publication || item.node?.publication;
  const teaserImage = item.teaserImage || item.node?.teaserImage;
  // the link path is mapped on the preferredUri because of the tealium tracking for external teasers
  const preferredUri =
    item.preferredUri ||
    item.link?.path ||
    item.node?.preferredUri ||
    item.node?.link?.path ||
    '';
  const channelTitle =
    (item.channel && item.channel.title) ||
    (item.node?.channel && item.node?.channel.title);

  return {
    itemIndex: index,
    ...item,
    ...(item?.node || {}),
    createDate: item.createDate || item.node?.createDate || '',
    title: item?.title || item.node?.title || '',
    shortTitle:
      item.shortTitle ||
      item.node?.shortTitle ||
      (subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE &&
        NATIVE_ADVERTISING_CONTENT_TYPE_LABEL) ||
      ((subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
        subtypeValue === ADVERTISING_TYPE_LONGFORM) &&
        ADVERTISING_TYPE_ADVERTORIAL_LABEL) ||
      (publication === PUBLICATION_BIL && PUBLICATION_BIL) ||
      (publication === PUBLICATION_SWISS_INSURANCE && 'HZ Insurance') ||
      (publication === PUBLICATION_HZB && 'HZ Banking') ||
      (subtypeValue === ARTICLE_TYPE_OPINION && ARTICLE_TYPE_OPINION_LABEL) ||
      (subtypeValue === ARTICLE_TYPE_ASSOCIATION &&
        ARTICLE_TYPE_ASSOCIATION_LABEL) ||
      channelTitle ||
      '',
    teaserImage: (!item?.isHeadless && teaserImage) || null,
    preferredUri,
  };
};

/**
 * ensure teaser interface
 *
 * @desc    makes sure, that all required props for teaser renderings are present
 * @param   {Array<any>} nodes
 * @returns {Array<TeasableInterfaceGraphListItem>}
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nodes' implicitly has an 'any' type. */
export const ensureTeaserInterface = (nodes) => {
  if (!nodes || typeof nodes !== 'object' || nodes.length < 1) {
    return nodes;
  }

  // ensure that all required fields are present
  return nodes.map(ensureTeaserInterfaceItem);
};

export const hasSameChannelAsLandingPage = (
  node: TeasableInterfaceNode,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'headerState' implicitly has an 'any' type. */
  headerState,
) => {
  const landingPageChannel =
    (headerState &&
      headerState.contentType === LANDING_PAGE_CONTENT_TYPE &&
      headerState.title) ||
    null;
  return node?.channel?.title === landingPageChannel || false;
};

export const renderDateTime = (
  node: TeasableInterfaceNode,
  /* @ts-ignore TODO: TS7006 ->  Parameter '_hasAuthors' implicitly has an 'any' type. */
  _hasAuthors,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'format' implicitly has an 'any' type. */
  format,
) => {
  if (!node || (!node.publicationDate && !node.changeDate)) {
    return;
  }

  const showModificationDate = node?.showUpdated || false;

  const date = getFormattedElapsedDate({
    createDate: node.publicationDate,
    changeDate: node.changeDate,
    maxHours: 11,
    format,
    prefix: '',
    showModificationDate,
  });

  return <>{date}</>;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'hasAuthors' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'format' implicitly has an 'any' type. */
const renderDates = (node: TeasableInterfaceNode, hasAuthors, format) => {
  const isTypeLongRead = isLongRead(node);

  return (
    <div
      className={classNames({
        [defaultStyles.HasImage]: !isTypeLongRead && node.sponsor,
      })}
    >
      {!hasAuthors && (node.changeDate || node.publicationDate) && (
        <strong>
          {(node.publicationDate && 'Veröffentlicht') || 'Aktualisiert'}{' '}
        </strong>
      )}
      <span>
        {getFormattedElapsedDate({
          createDate: node.publicationDate,
          changeDate: node.changeDate,
          format,
          maxHours: 11,
          prefix: 'am',
        })}
      </span>
    </div>
  );
};

export const Source = ({ source }: Pick<ImageFile, 'source'>) =>
  (source && <div>{`Quelle: ${source}`}</div>) || null;

export const renderAuthorsAndDateElement = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
  node,
  format = TIME_ELAPSED_FORMAT_LONG,
) => {
  const authorsNodes = node?.authors?.edges || null;
  const authorImages = getAuthorImages(authorsNodes);
  const isTypeLongRead = isLongRead(node);
  const hasImage =
    (authorImages && authorImages.length > 0) ||
    (!isTypeLongRead && node.sponsor);
  const authorPrefix: string = node?.authorPrefix || '';

  // just show date if no authors are available
  if (!authorsNodes || authorsNodes.length < 1) {
    return (
      <div
        className={classNames({
          [defaultStyles.ArticleAuthorWrapper]: !isTypeLongRead,
          [defaultStyles.LongReadAuthorWrapper]: isTypeLongRead,
          [defaultStyles.IsOpinion]:
            node?.subtypeValue === ARTICLE_TYPE_OPINION,
        })}
      >
        {renderDates(node, false, format)}
        <Source source={node?.source} />
      </div>
    );
  }

  // show date and authors
  return (
    <div
      className={classNames(defaultStyles.HasAuthorsImages, {
        [defaultStyles.ArticleAuthorWrapper]: !isTypeLongRead,
        [defaultStyles.LongReadAuthorWrapper]: isTypeLongRead,
        [defaultStyles.IsOpinion]: node?.subtypeValue === ARTICLE_TYPE_OPINION,
      })}
    >
      {authorImages || null}

      <div
        className={classNames(defaultStyles.AuthorWrapperInner, {
          [defaultStyles.HasImage]: hasImage,
          [defaultStyles.HasArticleImage]: hasImage && !isTypeLongRead,
        })}
      >
        <div className={defaultStyles.AuthorNameWrapper}>
          {getAllAuthors({ authors: authorsNodes, isBold: true, authorPrefix })}
        </div>
        {renderDates(node, true, format)}
        <Source source={node?.source} />
      </div>
    </div>
  );
};

export const getIsBottomLineVisibleByProps = ({
  subtypeValue,
}: TeasableInterfaceNode) =>
  ![
    ADVERTISING_TYPE_ADVERTORIAL,
    ADVERTISING_TYPE_NATIVE_ARTICLE,
    ADVERTISING_TYPE_EXTERNAL,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(subtypeValue);

/* @ts-ignore TODO: TS7031 ->  Binding element 'publicationDate' implicitly has an 'any' type. */
export const getFormattedPublicationDateByProps = ({ publicationDate }) => {
  if (!publicationDate || Number.isNaN(Date.parse(publicationDate))) {
    return null;
  }
  return formatElapsedDate(publicationDate);
};
export const getLabelByProps = ({ subtypeValue }: TeasableInterfaceNode) =>
  [
    ADVERTISING_TYPE_ADVERTORIAL,
    ADVERTISING_TYPE_NATIVE_ARTICLE,
    ADVERTISING_TYPE_EXTERNAL,
    ADVERTISING_TYPE_LONGFORM,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ].includes(subtypeValue)
    ? ADVERTISING_TYPE_ADVERTORIAL_LABEL
    : '';

export const getInnerContentByProps = (SponsoredContent: string) => {
  const getInnerContentByProps = (props: TeasableInterfaceNode) => {
    const label = getLabelByProps(props);

    if (!label) {
      return null;
    }

    return <div className={SponsoredContent}>{label}</div>;
  };
  return getInnerContentByProps;
};

export const getBadgeByProps = (BadgeStyle: string) => {
  const getBadgeByProps = ({
    subtypeValue,
    __typename,
    channel,
    link,
  }: TeasableInterfaceNode) => {
    let label = '';

    if (channel?.channelType === CHANNEL_TYPE_SPECIAL) {
      label = CHANNEL_TYPE_SPECIAL_LABEL;
    } else if (__typename === DOSSIER_CONTENT_TYPE) {
      label = DOSSIER_CONTENT_TYPE;
    } else if (subtypeValue === ARTICLE_TYPE_LONG_READ) {
      label = ARTICLE_TYPE_LONG_READ_LABEL;
    } else if (subtypeValue === ARTICLE_TYPE_SEATCHANGE) {
      label = ARTICLE_TYPE_SEATCHANGE_LABEL;
    } else if (subtypeValue === ARTICLE_TYPE_ASSOCIATION) {
      label = ARTICLE_TYPE_ASSOCIATION_LABEL;
    } else if (subtypeValue === ADVERTISING_TYPE_EXTERNAL) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      label = link?.label || getDomain(link?.path);
    }

    if (!label) {
      return null;
    }

    return (
      <div className={BadgeStyle}>
        <TeaserBadge label={label} />
      </div>
    );
  };

  return getBadgeByProps;
};

export const getDomain = (url: string) => (url && new URL(url).hostname) || '';

export const getTitleBadgeByProps = (badgeOption: string) => {
  const getTitleBadgeByProps = ({
    /* @ts-ignore TODO: TS7031 ->  Binding element 'restrictionStatus' implicitly has an 'any' type. */
    restrictionStatus,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxType' implicitly has an 'any' type. */
    contentBoxType,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'publicationDate' implicitly has an 'any' type. */
    publicationDate,
  }) => {
    if (contentBoxType === CONTENT_SOURCE_TICKER) {
      return (
        <span className={defaultStyles.TickerBoxTitleBadge}>
          <span className={defaultStyles.PublicationTime}>
            {getPublicationTime(publicationDate)}
          </span>
        </span>
      );
    } else {
      return (
        isRestrictedContent(restrictionStatus) &&
        badgeOption && (
          <IfFeatureDisabled feature={ABO_BADGE_REMOVAL_FEATURE}>
            <Logo type={badgeOption} isInline />
          </IfFeatureDisabled>
        )
      );
    }
  };
  return getTitleBadgeByProps;
};

// returns the publicationTime (example: 10:30) from the PublicationDate
/* @ts-ignore TODO: TS7006 ->  Parameter 'publicationDate' implicitly has an 'any' type. */
export const getPublicationTime = (publicationDate) => {
  if (!publicationDate) {
    return '';
  }
  const publicationTime: string = publicationDate.split('T')[1].split(':');
  return `${publicationTime[0]}:${publicationTime[1]} `;
};

export const getSponsorImageByProps = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'SponsorImageWrapperStyle' implicitly has an 'any' type. */
  SponsorImageWrapperStyle,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'SponsorImage' implicitly has an 'any' type. */
  SponsorImage,
) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'sponsor' implicitly has an 'any' type. */
  const getSponsorImageByProps = ({ sponsor }) => {
    if (!sponsor?.teaserImage?.image?.file?.relativeOriginPath) {
      return null;
    }
    return (
      <div className={SponsorImageWrapperStyle}>
        <SponsorImage sponsor={sponsor} />
      </div>
    );
  };
  return getSponsorImageByProps;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'ShortTitleWrapperStyle' implicitly has an 'any' type. */
export const getShortTitleElementByProps = (ShortTitleWrapperStyle) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'shortTitle' implicitly has an 'any' type. */
  const getShortTitleElementByProps = ({ subtypeValue, shortTitle }) => {
    const isBrandreport = subtypeValue === ADVERTISING_TYPE_BRANDREPORT;
    const isNativeArticle = subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE;
    const isAdvertorial = subtypeValue === ADVERTISING_TYPE_ADVERTORIAL;

    const shouldRenderShortTitleElement =
      isBrandreport || isNativeArticle || isAdvertorial;

    if (!shouldRenderShortTitleElement) {
      return null;
    }

    if (shortTitle && shouldRenderShortTitleElement && !isBrandreport) {
      return (
        <div
          className={classNames(ShortTitleWrapperStyle, {
            [defaultStyles.ShortTitleDNativeArticle]:
              subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE,
            [defaultStyles.ShortTitleDAdvertorial]:
              subtypeValue === ADVERTISING_TYPE_ADVERTORIAL,
          })}
        >
          {shortTitle}
        </div>
      );
    }

    if (isNativeArticle) {
      return (
        <div className={ShortTitleWrapperStyle}>
          <Img
            url={nativeAdvertisingSVG}
            width={131}
            height={20}
            alt={ADVERTISING_TYPE_ADVERTORIAL_LABEL}
          />
        </div>
      );
    }

    if (isAdvertorial) {
      return (
        <div className={ShortTitleWrapperStyle}>
          <Img
            url={publireportageSVG}
            width={111}
            height={20}
            alt={ADVERTISING_TYPE_BRANDREPORT_LABEL}
          />
        </div>
      );
    }

    return (
      <div className={ShortTitleWrapperStyle}>
        <Logo
          type={LOGO_HZ_BRAND_REPORT}
          isInline
          origin={TEASER_IMAGE_IDENTIFIER}
        />
      </div>
    );
  };
  return getShortTitleElementByProps;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
export const getIsShortTitleHiddenByProps = ({ subtypeValue }) =>
  subtypeValue !== ADVERTISING_TYPE_BRANDREPORT;

/* @ts-ignore TODO: TS7006 ->  Parameter 'iconStyle' implicitly has an 'any' type. */
export const getIconByProps = (iconStyle) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasVideo' implicitly has an 'any' type. */
  const getIconByProps = ({ __typename, hasVideo }) => {
    if (__typename === IMAGE_GALLERY_CONTENT_TYPE) {
      return (
        <div className={iconStyle}>
          <TeaserIcon type={TEASER_ICON_TYPE_GALLERY} />
        </div>
      );
    } else if (
      (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
      __typename === VIDEO_CONTENT_TYPE
    ) {
      return (
        <div className={iconStyle}>
          <TeaserIcon type={TEASER_ICON_TYPE_VIDEO} />
        </div>
      );
    } else {
      return null;
    }
  };
  return getIconByProps;
};
