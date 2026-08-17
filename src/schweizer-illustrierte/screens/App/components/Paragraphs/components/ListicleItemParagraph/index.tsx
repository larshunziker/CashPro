/* istanbul ignore file */

import classNames from 'classnames';
import listicleItemParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/factory';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  ListicleItemParagraphFactoryOptionsStyles,
  ListicleItemParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/typings';

const getStylesByProps = ({
  listicleIndex,
  isNested,
}: ListicleItemParagraphProps): ListicleItemParagraphFactoryOptionsStyles => {
  const isEven = listicleIndex % 2 === 0;

  return {
    ContentBox: classNames(grid.ColXs24, grid.ColSm12, {
      [grid.ColOffsetSm1]: isEven,
    }),
    ImageBox: classNames(grid.ColXs24, grid.ColSm11, styles.ImageBox, {
      [grid.ColOffsetSm1]: !isEven,
    }),
    InnerWrapper: classNames(grid.ColXs24, {
      [grid.ColOffsetXl4]: !isNested,
      [grid.ColXl16]: !isNested,
    }),
    Wrapper: classNames(styles.Wrapper, {
      [grid.Container]: !isNested,
    }),
    Title: styles.Title,
    Content: styles.Content,
    Footer: styles.Footer,
    Even: styles.Even,
    Odd: styles.Odd,
    ListicleItemWrapper: styles.ListicleItemWrapper,
    ListicleItemInnerWrapper: styles.ListicleItemInnerWrapper,
    Image: styles.Image,
    IsNested: styles.IsNested,
  };
};

const ListicleItemParagraph = listicleItemParagraphFactory({
  styles: getStylesByProps,
});

export default ListicleItemParagraph;
