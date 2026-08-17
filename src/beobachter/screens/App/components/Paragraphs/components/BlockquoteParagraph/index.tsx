/* istanbul ignore file */

import classNames from 'classnames';
import blockquoteParagraphFactory from '../../../../../../../common/components/Paragraphs/components/BlockquoteParagraph/factory';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../shared/constants/content';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  BlockquoteParagraphFactoryOptionsStyles,
  BlockquoteParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/BlockquoteParagraph/typings';

const getStylesByProps = ({
  origin,
}: BlockquoteParagraphProps): BlockquoteParagraphFactoryOptionsStyles => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);

  return {
    Wrapper: classNames({
      [classNames([
        grid.ColOffsetSm3,
        grid.ColSm18,
        grid.ColOffsetMd2,
        grid.ColMd20,
        grid.ColOffsetXl5,
        grid.ColXl14,
      ])]: ARTICLE_TYPE_RATGEBER === origin,
      [classNames([
        grid.ColOffsetSm3,
        grid.ColSm18,
        grid.ColOffsetMd6,
        grid.ColMd12,
      ])]: isInLongFormArticle,
    }),
    Quote: styles.Quote,
    QuoteAuthor: styles.QuoteAuthor,
  };
};

const BlockquoteParagraph = blockquoteParagraphFactory({
  styles: getStylesByProps,
});

export default BlockquoteParagraph;
