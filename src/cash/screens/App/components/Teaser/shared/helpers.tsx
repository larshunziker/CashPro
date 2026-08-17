import React from 'react';
import classNames from 'classnames';
import { getAllAuthors } from '../../../../../../shared/helpers/authors';
import {
  TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
  getFormattedElapsedDate,
} from '../../../../../../shared/helpers/dateTimeElapsed';
import Icon from '../../Icon';
import Logo from '../../Logo';
import TeaserBadge from '../components/TeaserBadge';
import TeaserIcon from '../components/TeaserIcon';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_ADVERTORIAL_LABEL,
  ADVERTISING_TYPE_EXTERNAL,
  ADVERTISING_TYPE_LONGFORM,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_CONTENT_TYPE,
  CONTENT_SOURCE_TICKER,
  IMAGE_GALLERY_CONTENT_TYPE,
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE_LABEL,
  PAGE_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../shared/constants/content';
import {
  CHANNEL_TYPE_NEUEMISSIONEN,
  NON_VISIBLE_AUTHORS,
} from '../../../constants';
import { SCREEN_SEARCH_RESULTS } from '../../SearchResults/constants';
import {
  TEASER_ICON_TYPE_GALLERY,
  TEASER_ICON_TYPE_VIDEO,
} from '../components/TeaserIcon/constants';
import defaultStyles from './defaultStyles.legacy.css';

export const ensureTeaserInterfaceItem = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  item,
  index?: number,
  origin?: string,
) => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  const subtypeValue = item.subtypeValue || item.node?.subtypeValue;
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

  const shouldDisplayTeaserImage =
    channelTitle !== CHANNEL_TYPE_NEUEMISSIONEN && !item?.isHeadless;

  return {
    itemIndex: index,
    ...item,
    ...(item?.node || {}),
    createDate: item.createDate || item.node?.createDate || '',
    title:
      origin === SCREEN_SEARCH_RESULTS
        ? ''
        : item?.title || item.node?.title || '',
    lead:
      origin === SCREEN_SEARCH_RESULTS
        ? item?.title || item.node.title
        : item.lead || item.node?.lead || '',
    shortTitle:
      item.shortTitle ||
      item.node?.shortTitle ||
      (subtypeValue === ADVERTISING_TYPE_NATIVE_ARTICLE &&
        NATIVE_ADVERTISING_CONTENT_TYPE_LABEL) ||
      ((subtypeValue === ADVERTISING_TYPE_ADVERTORIAL ||
        subtypeValue === ADVERTISING_TYPE_LONGFORM) &&
        ADVERTISING_TYPE_ADVERTORIAL_LABEL) ||
      (item.__typename !== LANDING_PAGE_CONTENT_TYPE &&
        item.__typename !== PAGE_CONTENT_TYPE &&
        channelTitle) ||
      '',
    teaserImage: (shouldDisplayTeaserImage && teaserImage) || null,
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

export const renderDates = (
  node: TeasableInterfaceNode,
  /* @ts-ignore TODO: TS7006 ->  Parameter '_hasAuthors' implicitly has an 'any' type. */
  _hasAuthors,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'format' implicitly has an 'any' type. */
  format,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
  origin?,
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

  return (
    <>
      <span
        className={classNames(
          {
            [defaultStyles.SearchPublicationDate]:
              origin === SCREEN_SEARCH_RESULTS,
          },
          defaultStyles.BottomLine,
        )}
      >
        {date}
      </span>
    </>
  );
};

export const Source = ({ source }: Pick<ImageFile, 'source'>) =>
  (source && <div>{`Quelle: ${source}`}</div>) || null;

export const renderAuthorsAndDateElement = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
  node,
  format = TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
) => {
  const authorsNodes = node?.authors?.edges || null;
  const hasImage = false;
  const publicationDate = renderDates(node, true, format);
  const authorPrefix: string = node?.authorPrefix || '';

  const isAuthorVisible = isAuthorVisibleByProps(node);

  if (!isAuthorVisible || !authorsNodes || authorsNodes.length < 1) {
    return (
      <div className={defaultStyles.ArticleAuthorWrapper}>
        {publicationDate}
        <Source source={node?.source} />
      </div>
    );
  }

  // show date and authors
  return (
    <div
      className={classNames(
        defaultStyles.HasAuthorsImages,
        defaultStyles.ArticleAuthorWrapper,
      )}
    >
      <div
        className={classNames(defaultStyles.AuthorWrapperInner, {
          [defaultStyles.HasImage]: hasImage,
        })}
      >
        {publicationDate}
        <div className={defaultStyles.AuthorNameWrapper}>
          {getAllAuthors({
            authors: authorsNodes,
            isBold: false,
            authorPrefix,
          })}
        </div>
        <Source source={node?.source} />
      </div>
    </div>
  );
};

// Current state is that we always show date and time on cash teasers
// I left it here since this could maybe change for other teasers
export const getIsPublicationDateVisibleByProps = ({
  subtypeValue,
}: TeasableInterfaceNode) =>
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  ![ADVERTISING_TYPE_EXTERNAL].includes(subtypeValue);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export const getFormattedPublicationDateByProps = (props) => {
  const node = props?.node || props || null;

  if (
    !node?.publicationDate ||
    Number.isNaN(Date.parse(node?.publicationDate))
  ) {
    return null;
  }

  return renderDates(
    node,
    false,
    TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
    props.origin,
  );
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

export const getInnerContentByProps = () => {
  const getInnerContentByProps = (props: TeasableInterfaceNode) => {
    const label = getLabelByProps(props);

    if (!label) {
      return null;
    }

    return <div>{label}</div>;
  };
  return getInnerContentByProps;
};

export const getBadgeByProps = (BadgeStyle: string) => {
  const getBadgeByProps = ({ subtypeValue, link }: TeasableInterfaceNode) => {
    let label = '';

    //@TODO: enrich with cash logic when badges will be shown
    if (subtypeValue === LANDING_PAGE_CONTENT_TYPE) {
      label = 'Optional Badge';
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

export const getTitleBadgeByProps = () => {
  const getTitleBadgeByProps = ({
    /* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxType' implicitly has an 'any' type. */
    contentBoxType,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'publicationDate' implicitly has an 'any' type. */
    publicationDate,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
    subtypeValue,
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
        subtypeValue === ADVERTISING_TYPE_EXTERNAL && (
          <Icon type="IconArrowRightUpFromSquare" />
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
  const getShortTitleElementByProps = ({ subtypeValue }) => {
    if (
      ![ADVERTISING_TYPE_NATIVE_ARTICLE, ADVERTISING_TYPE_ADVERTORIAL].includes(
        subtypeValue,
      )
    ) {
      return null;
    }

    return (
      <div className={ShortTitleWrapperStyle}>
        <Logo />
      </div>
    );
  };
  return getShortTitleElementByProps;
};

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

// @ts-ignore TODO: TS7006 ->  Parameter 'authors' implicitly has an 'any' type.
export const isAuthorVisibleByProps = ({ authors }: AuthorsConnection) =>
  (authors?.edges && authors.edges.length > 1) ||
  (authors?.edges &&
    authors.edges.length === 1 &&
    !NON_VISIBLE_AUTHORS.includes(
      authors?.edges?.[0]?.node?.name?.toLowerCase() || '',
    ));
