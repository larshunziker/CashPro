import React from 'react';
import { FormattedMessage, IntlShape, defineMessages } from 'react-intl';
import classNames from 'classnames';
import camelCase from 'lodash.camelcase';
import grid from '../../../../../../common/assets/styles/grid.legacy.css';
export const AUTHOR_PREFIX_FROM = 'by';
export const AUTHOR_PREFIX_TEXT = 'Text';
export const AUTHOR_PREFIX_VIDEO = 'Video';
export const AUTHOR_PREFIX_FOTOS = 'Fotos';
export const AUTHOR_PREFIX_INTERVIEW = 'Interview';
export const AUTHOR_PREFIX_EDITORS = 'Redaktion';
export const AUTHORS_LAST_SEPARATOR = 'und';
export const AUTHORS_PREFIX_COMMENT_OF = 'Comment of';
export const AUTHORS_PREFIX_RECIPE_OF = 'Recipe of';

const MESSAGES_KEY_PREFIX = 'app.author.prefix';

const messages = defineMessages({
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_FROM)}`]: {
    id: 'app.author.prefix.by',
    description: 'Prefix for article author',
    defaultMessage: 'von',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_TEXT)}`]: {
    id: 'app.author.prefix.text',
    description: 'Prefix for text author',
    defaultMessage: 'Text:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_VIDEO)}`]: {
    id: 'app.author.prefix.video',
    description: 'Prefix for video author',
    defaultMessage: 'Video:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_FOTOS)}`]: {
    id: 'app.author.prefix.fotos',
    description: 'Prefix for foto author',
    defaultMessage: 'Fotos:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_INTERVIEW)}`]: {
    id: 'app.author.prefix.interview',
    description: 'Prefix for interview author',
    defaultMessage: 'Interview:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHORS_LAST_SEPARATOR)}`]: {
    id: 'app.authors.separator.und',
    description: 'Last separator for authors listing up',
    defaultMessage: 'und',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHOR_PREFIX_EDITORS)}`]: {
    id: 'app.author.prefix.redaktion',
    description: 'Prefix for editors',
    defaultMessage: 'Redaktion:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHORS_PREFIX_COMMENT_OF)}`]: {
    id: 'app.author.prefix.kommentar_von',
    description: 'Prefix for comment od author',
    defaultMessage: 'Kommentar von:',
  },
  [`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHORS_PREFIX_RECIPE_OF)}`]: {
    id: 'app.author.prefix.rezept_von',
    description: 'Prefix for recipe of author',
    defaultMessage: 'Rezept von:',
  },
});

/**
 * get translated prefix
 *
 * @desc    render all authors
 */
export const getTranslatedPrefix = (authorPrefix: string, intl: IntlShape) => {
  if (!authorPrefix) {
    return '';
  }

  if (messages[`${MESSAGES_KEY_PREFIX}.${camelCase(authorPrefix)}`]) {
    return intl.formatMessage(
      messages[`${MESSAGES_KEY_PREFIX}.${camelCase(authorPrefix)}`],
    );
  }
  return '';
};

/**
 * get all authors
 *
 * @desc    render all authors
 */
export const getAllAuthors = (
  article: Article | Recipe,
  authors: (AuthorEdge | PersonEdge)[],
  intl: IntlShape,
  displayPrefix = true,
) =>
  authors &&
  authors.map((item: AuthorEdge | PersonEdge, key) =>
    renderAuthors(
      item,
      key,
      key === 0,
      key === authors.length - 1,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
      article.authorPrefix || null,
      displayPrefix,
      intl,
    ),
  );

/**
 * render authors
 *
 * @desc    render one author
 */
export const renderAuthors = (
  item: AuthorEdge | PersonEdge,
  index: number,
  isFirst: boolean,
  isLast: boolean,
  authorPrefix: string,
  displayPrefix: boolean,
  intl: IntlShape,
) => (
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  <span key={`${item.node.id}-${index}`}>
    {(displayPrefix &&
      isFirst &&
      `${getTranslatedPrefix(authorPrefix, intl)} `) ||
      null}
    {(displayPrefix && !isFirst && !isLast && ', ') || null}
    {(displayPrefix &&
      isLast &&
      !isFirst &&
      ` ${intl.formatMessage(
        messages[`${MESSAGES_KEY_PREFIX}.${camelCase(AUTHORS_LAST_SEPARATOR)}`],
      )} `) ||
      null}

    <span>
      {item.node?.name ||
        (item.node && 'title' in item.node && item.node.title) ||
        ''}
    </span>
  </span>
);

/**
 * render sponsored or short title
 *
 * @desc  returns short title and as fallback sponsored by XY or the channel name
 */
export const renderSponsoredOrShortTitle = (node: Article, addClass: string) =>
  (!!(node.sponsor && node.sponsor.id) && (
    <div className={addClass}>
      <FormattedMessage
        id="app.article.lead.sponsoredStory"
        description="Flags on article lead (type headless) to show that a story is sponsored"
        defaultMessage="Sponsored Story"
      />
    </div>
  )) ||
  (node.shortTitle && node.title !== node.shortTitle && (
    <div className={addClass}>{node.shortTitle}</div>
  )) ||
  (node.channel?.title && (
    <div className={addClass}>{node.channel.title}</div>
  )) ||
  null;

export const articleColStyle = classNames(
  grid.ColSm20,
  grid.ColOffsetSm2,
  grid.ColXl14,
  grid.ColOffsetXl5,
);
