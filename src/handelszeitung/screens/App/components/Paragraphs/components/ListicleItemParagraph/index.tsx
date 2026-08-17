/* istanbul ignore file */

import classNames from 'classnames';
import listicleItemParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/factory';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  ListicleItemParagraphFactoryOptionsStyles,
  ListicleItemParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/typings';

const getStylesByProps = ({
  listicleIndex,
  pageLayoutType,
}: ListicleItemParagraphProps): ListicleItemParagraphFactoryOptionsStyles => {
  const isEven = listicleIndex % 2 === 0;
  const isSplittedPageLayout = pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE;

  return {
    ContentBox: classNames(grid.ColXs24, grid.ColSm12, {
      [grid.ColOffsetSm1]: isEven,
    }),
    ImageBox: classNames(grid.ColXs24, grid.ColSm11, styles.ImageBox, {
      [grid.ColOffsetSm1]: !isEven,
    }),
    InnerWrapper: classNames({
      [mergeClasses([grid.ColOffsetXl4, grid.ColXs24, grid.ColXl16])]:
        !isSplittedPageLayout,
    }),
    Wrapper: classNames({
      [styles.Wrapper]: !isSplittedPageLayout,
      [styles.WrapperWithRightColumn]: isSplittedPageLayout,
    }),
    Title: styles.Title,
    Content: styles.Content,
    Footer: styles.Footer,
    Even: classNames(styles.Even, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
    }),
    Odd: classNames(styles.Odd, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
    }),
    ListicleItemWrapper: styles.ListicleItemWrapper,
    ListicleItemInnerWrapper: classNames(styles.ListicleItemInnerWrapper, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
    }),
    Image: styles.Image,
    IsNested: styles.IsNested,
  };
};

const ListicleItemParagraph = listicleItemParagraphFactory({
  styles: getStylesByProps,
});

export default ListicleItemParagraph;
