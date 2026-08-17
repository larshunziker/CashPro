import classNames from 'classnames';
import multiColumnParagraphFactory from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/factory';
import Paragraphs from '../../../Paragraphs';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { GetGridColsByProps } from '../../../../../../../common/components/Paragraphs/components/MultiColumnParagraph/typings';

const getGridColsByProps: GetGridColsByProps = ({ multiColumnParagraph }) => {
  return multiColumnParagraph?.style &&
    multiColumnParagraph.style.indexOf('three') !== -1
    ? grid.ColSm8
    : grid.ColSm12;
};

const MultiColumnParagraph = multiColumnParagraphFactory({
  styles: {
    Container: '',
    Row: classNames(grid.Row, styles.Wrapper),
  },
  paragraphsRenderer: () => Paragraphs,
  getGridColsByProps,
});

export default MultiColumnParagraph;
