import React from 'react';

export const DEFAULT_AUTHOR_PREFIX_LANGUAGE = 'de';
const LAST_AUTHOR_SEPARATOR = 'last_separator';

export const authorPrefixConfig = {
  by: {
    de: 'Von ',
    fr: 'Par ',
  },
  Fotos: {
    de: 'Fotos: ',
    fr: 'Photos: ',
  },
  Video: {
    de: 'Video: ',
    fr: 'Vidéo: ',
  },
  Interview: {
    de: 'Interview: ',
    fr: 'Interview: ',
  },
  Text: {
    de: 'Text: ',
    fr: 'Texte: ',
  },
  Redaktion: {
    de: 'Redaktion: ',
    fr: 'Rédaction: ',
  },
  'Recipe of': {
    de: 'Rezept von: ',
    fr: 'Recette de:  ',
  },
  'Comment of': {
    de: 'Kommentar von: ',
    fr: 'Commenté par:  ',
  },
  [LAST_AUTHOR_SEPARATOR]: {
    de: ' und ',
    fr: ' et ',
  },
};

type GetAllAuthorsParams = {
  authors: AuthorEdge[];
  isBold?: boolean;
  authorPrefix?: string;
  language?: 'de' | 'fr';
};

/**
 * get all authors
 *
 * @desc    render all authors with given prefix
 * @returns {Array<Element<any>>|null}
 */
export const getAllAuthors = ({
  authors,
  isBold = false,
  authorPrefix = '',
  language = DEFAULT_AUTHOR_PREFIX_LANGUAGE,
}: GetAllAuthorsParams) =>
  authors &&
  authors?.map((item, index) =>
    renderAuthors(
      item,
      index,
      index === 0,
      index === authors.length - 1,
      language,
      isBold,
      authorPrefix,
    ),
  );

const renderAuthors = (
  item: AuthorEdge,
  index: number,
  isFirst: boolean,
  isLast: boolean,
  language: 'de' | 'fr',
  isBold = false,
  authorPrefix: string,
) => {
  if (!item.node || !item.node.name) {
    return null;
  }
  return (
    <span key={`author-item-${item.node.id}-${index}`}>
      {(isFirst &&
        authorPrefix &&
        language &&
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ by */
        authorPrefixConfig[authorPrefix][language]) ||
        null}
      {!isFirst && !isLast && ', '}
      {isLast &&
        !isFirst &&
        authorPrefixConfig[LAST_AUTHOR_SEPARATOR][language]}
      {isBold && <strong>{item.node.name}</strong>}
      {!isBold && <span>{item.node.name}</span>}
    </span>
  );
};
