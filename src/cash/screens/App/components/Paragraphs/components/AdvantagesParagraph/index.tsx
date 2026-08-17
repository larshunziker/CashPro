import classNames from 'classnames';
import advantagesParagraphFactory from '../../../../../../../common/components/Paragraphs/components/AdvantagesParagraph/factory';
import AdvantagesItem from '../../../AdvantagesItem';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const AdvantagesParagraph = advantagesParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ ...props } */
  AdvantagesItem,
  styles: {
    Title: classNames(styles.Title, grid.ColOffsetXl4, grid.ColXl16),
    Wrapper: classNames(grid.Row, styles.Link),
    OuterWrapper: grid.Container,
  },
});

export default AdvantagesParagraph;
