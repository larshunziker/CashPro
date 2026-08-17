import classNames from 'classnames';
import ListicleItemParagraphFactory from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/factory';
import { isInsideColumn } from '../../../../../../shared/helpers/isInsideColumn';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import { STYLE_16X9_800 } from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  ListicleItemParagraphFactoryOptionsStyles,
  ListicleItemParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/ListicleItemParagraph/typings';

const getStylesByProps = ({
  isNested,
  origin,
  listicleIndex,
}: ListicleItemParagraphProps): ListicleItemParagraphFactoryOptionsStyles => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInColumn = isInsideColumn(origin);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);
  const isInLongFormSection = origin === 'SectionParagraph_longread';

  const isEven = listicleIndex % 2 === 0;

  return {
    ContentBox: classNames(grid.ColXs24, grid.ColSm12, {
      [grid.ColOffsetSm1]: isEven,
    }),
    ImageBox: classNames(grid.ColXs24, grid.ColSm11, styles.ImageBox, {
      [grid.ColOffsetSm1]: !isEven,
    }),
    InnerWrapper: classNames(grid.ColXs24, {
      [grid.ColXl24]: !isNested,
    }),
    Wrapper: classNames(styles.Wrapper, {
      [grid.Container]: !isInColumn && !isNested && !isInLongFormSection,
      [styles.WrapperFirst]: listicleIndex === 0,
      [classNames([
        grid.ColSm20,
        grid.ColOffsetSm2,
        grid.ColXl16,
        grid.ColOffsetXl4,
      ])]: isInLongFormArticle,
    }),
    Title: styles.Title,
    Content: styles.Content,
    Footer: styles.Footer,
    Even: '',
    Odd: styles.Odd,
    ListicleItemWrapper: styles.ListicleItemWrapper,
    ListicleItemInnerWrapper: styles.ListicleItemInnerWrapper,
    Image: styles.Image,
    IsNested: styles.IsNested,
    ContentWrapper: classNames({
      [grid.Container]: isInLongFormArticle,
    }),
  };
};

const ListicleItemParagraph = ListicleItemParagraphFactory({
  styles: getStylesByProps,
  pictureStyle: [STYLE_16X9_800, STYLE_16X9_800],
});

export default ListicleItemParagraph;
