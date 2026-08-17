import classNames from 'classnames';
import multiColumnParagraphFactory from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/factory';
import Paragraphs from '../../../Paragraphs';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  GetGridColsByProps,
  MultiColumnParagraphFactoryOptionsStyles,
  MultiColumnParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/typings';

const getGridColsByProps: GetGridColsByProps = ({ multiColumnParagraph }) => {
  return multiColumnParagraph?.style &&
    multiColumnParagraph.style.indexOf('three') !== -1
    ? grid.ColSm8
    : grid.ColSm12;
};

export const getStyleByProps = ({
  origin,
}: MultiColumnParagraphProps): MultiColumnParagraphFactoryOptionsStyles => {
  const isInLongFormArticle = isInLongFormArticleBody(origin);

  return {
    Container: classNames({
      [mergeClasses([grid.ColMd20, grid.ColOffsetMd2])]: isInLongFormArticle,
    }),
    Row: classNames(grid.Row, styles.Wrapper),
  };
};

const MultiColumnParagraph = multiColumnParagraphFactory({
  styles: getStyleByProps,
  paragraphsRenderer: () => Paragraphs,
  getGridColsByProps,
});

export default MultiColumnParagraph;
