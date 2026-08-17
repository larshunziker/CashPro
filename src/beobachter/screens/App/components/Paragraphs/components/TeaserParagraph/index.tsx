import React, { FC } from 'react';
import TeaserParagraph from './render';
import {
  ARTICLE_CONTENT_TYPE,
  PRODUCT_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { TeaserParagraphProps } from './typings';

export const BOOK_TEASER_PARAGRAPH = PRODUCT_CONTENT_TYPE;
export const INLINE_TEASER_PARAGRAPH = ARTICLE_CONTENT_TYPE;

// Wrap the original component so we don't need to alter it.
const TeaserParagraphWrapper: FC<TeaserParagraphProps> = (props) => (
  <TeaserParagraph {...props} />
);

export default TeaserParagraphWrapper;
