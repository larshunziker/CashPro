import React from 'react';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../../common/components/Picture/helpers';
import { getAllAuthors } from '../../../../../../shared/helpers/authors';
import {
  TIME_ELAPSED_FORMAT_LONG,
  getFormattedElapsedDate,
} from '../../../../../../shared/helpers/dateTimeElapsed';
import { getMostCurrentChangeDate } from '../../../../../../shared/helpers/withHelmet';
import Img from '../../Img';
import TeaserBadge from '../components/TeaserBadge';
import TeaserIcon from './components/TeaserIcon';
import { Source } from '../../AuthorDateBlock';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_ADVERTORIAL_LABEL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_BRANDREPORT_LABEL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ADVERTISING_TYPE_NATIVE_ARTICLE_LABEL,
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_GUIDE_FALLBACK_LABEL,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_OPINION_LABEL,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import { PUBLICATION_SWISS_INSURANCE } from '../../../../../../shared/constants/publications';
import { TEASER_ICON_TYPE_VIDEO } from './components/TeaserIcon/constants';
import defaultStyles from './defaultStyles.legacy.css';
import { TeaserProps } from '../typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'hasAuthors' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'format' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'showUpdated' implicitly has an 'any' type. */
const renderDates = (node: Article, hasAuthors, format, showUpdated) => (
  <div>
    {!hasAuthors && <strong>Veröffentlicht </strong>}
    {getFormattedElapsedDate({
      createDate: node.publicationDate,
      changeDate: showUpdated && node.changeDate,
      format,
      prefix: 'am',
    })}
    {node && (node?.publicationDate || node?.createDate) && (
      <meta
        itemProp="datePublished"
        content={node?.publicationDate || node?.createDate}
      />
    )}

    {node && node.changeDate && (
      <meta
        itemProp="dateModified"
        content={getMostCurrentChangeDate(node || {})}
      />
    )}
  </div>
);

const getAuthorImages = (authors: AuthorEdge[], clientUrl: string) => {
  // check authors
  if (!authors || !Array.isArray(authors)) {
    return null;
  }

  // handle first 2 authors and ignore the others
  const authorsReduced = authors
    .slice(0, 2)
    .map((item, index) => {
      const alt = item.node?.imageParagraph?.image?.file?.alt || null;

      const url = assembleAkamaiImgUrl({
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        relativeOriginPath:
          item.node?.imageParagraph?.image?.file?.relativeOriginPath,
        width: 400, // teaser_1_1
        height: 400, // teaser_1_1
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
        focalPointX: item.node?.imageParagraph?.image?.file?.focalPointX,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
        focalPointY: item.node?.imageParagraph?.image?.file?.focalPointY,
        clientUrl,
      });

      // handle no image
      if (!url) {
        return null;
      }

      // return the image
      return (
        <Img
          addClass={classNames(defaultStyles.AuthorAvatar, {
            [defaultStyles.AuthorAvatarFirst]:
              index === 0 && authors && authors.length > 1,
            [defaultStyles.AuthorAvatarSecond]:
              index === 1 && authors && authors.length > 1,
          })}
          url={url}
          key={`author-avatar-${index}`}
          alt={alt || ''}
        />
      );
    })
    .filter((item) => !!item);

  return authorsReduced;
};

export const renderAuthorsAndDateElement = (
  node: Partial<Article & { subtypeValue: string }>,
  format = TIME_ELAPSED_FORMAT_LONG,
  clientUrl = '',
  showUpdated = true,
) => {
  const authorsNodes = node?.authors?.edges || null;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<AuthorEdge>[] | null' is not assignable to parameter of type 'AuthorEdge[]'. */
  const authorImages = getAuthorImages(authorsNodes, clientUrl);
  const isLongRead = node?.subtypeValue === ARTICLE_TYPE_LONG_READ;
  const isOpinion = node?.subtypeValue === ARTICLE_TYPE_OPINION;

  // just show date if no authors are available
  if (!authorsNodes || authorsNodes.length < 1) {
    return (
      <div
        className={classNames({
          [defaultStyles.LongReadDateWrapper]: isLongRead,
        })}
      >
        {renderDates(node, false, format, showUpdated)}
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | null'. */}
        <Source source={node?.source} />
      </div>
    );
  }

  // show date and authors
  return (
    <div
      className={classNames({
        [defaultStyles.LongReadDateAuthorWrapper]: isLongRead,
      })}
    >
      {authorImages || null}

      <div
        className={classNames(defaultStyles.AuthorWrapperInner, {
          [defaultStyles.hasImage]:
            (authorImages && authorImages.length > 0) ||
            (!isLongRead && node.sponsor),
        })}
      >
        {isOpinion && <div>Kommentar &nbsp;</div>}
        {(authorsNodes &&
          getAllAuthors({
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */
            authors: authorsNodes,
            isBold: true,
          })) ||
          null}
        {renderDates(node, true, format, showUpdated)}
        {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | null'. */}
        <Source source={node?.source} />
      </div>
    </div>
  );
};

export const getBadgeByProps = (badgeStyle: string) => {
  const getBadgeByProps = ({ articleType }: TeaserProps) => {
    const label =
      (articleType === ARTICLE_TYPE_OPINION && ARTICLE_TYPE_OPINION_LABEL) ||
      '';

    if (!label) {
      return null;
    }

    return (
      <div className={badgeStyle}>
        <TeaserBadge label={label} />
      </div>
    );
  };
  return getBadgeByProps;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
export const ensureTeaserInterfaceItem = (item, index?: number) => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  const teaserImage = item.teaserImage || item.node?.teaserImage;
  // the link path is mapped on the preferredUri because of the tealium tracking for external teasers
  const preferredUri =
    item.preferredUri ||
    item.link?.path ||
    item.node?.preferredUri ||
    item.node?.link?.path ||
    '';

  return {
    itemIndex: index,
    ...item,
    ...(item?.node || {}),
    createDate: item.createDate || item.node?.createDate || '',
    title: item?.title || item.node?.title || '',
    shortTitle: item.shortTitle || item.node?.shortTitle || '',
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

/**
 * get style by type
 *
 * @desc    get the right style by it's type
 * @param   {TeasableInterfaceNode} node
 * @returns {Array<TeasableInterfaceGraphListItem>}
 */
export const getStyleByType = ({
  subtypeValue,
  publication,
  __typename,
}: {
  subtypeValue?: string;
  publication?: string;
  __typename?: string;
}) => {
  if (publication === PUBLICATION_SWISS_INSURANCE) {
    return 'IsSwissInsurance';
  }

  if (__typename === NATIVE_ADVERTISING_CONTENT_TYPE) {
    switch (subtypeValue) {
      case ADVERTISING_TYPE_NATIVE_ARTICLE:
      case ADVERTISING_TYPE_ADVERTORIAL:
        return 'IsSponsoredArticle';
      case ADVERTISING_TYPE_BRANDREPORT:
        return 'IsBrandReport';
      default:
        return '';
    }
  }

  return '';
};

export const getIconByProps = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'iconStyle' implicitly has an 'any' type. */
  iconStyle,
  iconType = TEASER_ICON_TYPE_VIDEO,
  addClass = '',
) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasVideo' implicitly has an 'any' type. */
  const getIconByProps = ({ __typename, hasVideo }) => {
    if (
      !(
        (__typename === ARTICLE_CONTENT_TYPE && hasVideo) ||
        __typename === VIDEO_CONTENT_TYPE
      )
    ) {
      return null;
    }

    return (
      <div className={iconStyle}>
        <TeaserIcon type={iconType} addClass={addClass} />
      </div>
    );
  };
  return getIconByProps;
};

export const getShortTitleByProps = ({
  subtypeValue,
  __typename,
}: TeaserProps) => {
  const type = subtypeValue || __typename;

  switch (type) {
    case ADVERTISING_TYPE_NATIVE_ARTICLE:
      return ADVERTISING_TYPE_NATIVE_ARTICLE_LABEL;
    case ADVERTISING_TYPE_LONGFORM:
    case ADVERTISING_TYPE_ADVERTORIAL:
      return ADVERTISING_TYPE_ADVERTORIAL_LABEL;
    case ADVERTISING_TYPE_BRANDREPORT:
      return ADVERTISING_TYPE_BRANDREPORT_LABEL;
    case ARTICLE_TYPE_GUIDE:
      return ARTICLE_TYPE_GUIDE_FALLBACK_LABEL;
    case ARTICLE_TYPE_OPINION:
      return ARTICLE_TYPE_OPINION_LABEL;
    default:
      return '';
  }
};

export const getShortTitleElementByProps = (ShortTitleWrapperStyle: string) => {
  const getShortTitleElementByProps = ({
    shortTitle,
    link,
    ...props
  }: TeaserProps) => {
    const label = link?.label || shortTitle || getShortTitleByProps(props);

    return label ? <div className={ShortTitleWrapperStyle}>{label}</div> : null;
  };
  return getShortTitleElementByProps;
};
