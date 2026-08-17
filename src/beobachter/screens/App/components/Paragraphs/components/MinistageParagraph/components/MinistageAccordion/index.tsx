import classNames from 'classnames';
import ministageAccordionFactory, {
  MinistageAccordionPropsInner,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAccordion/factory';
import { mergeClasses } from '../../../../../../../../../shared/helpers/mergeClasses';
import { isInLongFormArticleBody } from '../../../../../../../../shared/helpers/isInLongFormArticleBody';
import { isInRatgeberArticleBody } from '../../../../../../../../shared/helpers/checkArticleType';
import ParagraphsRenderer from '../../../../../Paragraphs/components/ParagraphsRenderer';
import ExpansionPanel from './components/ExpansionPanelFaq';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../../../screens/PageScreen/constants';
import { ACCORDION_PAGE } from './constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

export const getStylesByProps = ({
  origin,
  colStyle,
}: MinistageAccordionPropsInner) => {
  let innerColStyle = classNames({
    [mergeClasses([grid.ColXl18, grid.ColOffsetXl3])]:
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      isInRatgeberArticleBody(origin),
    [mergeClasses([
      grid.ColSm20,
      grid.ColOffsetSm2,
      grid.ColOffsetMd4,
      grid.ColXl16,
      grid.ColOffsetXl4,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    ])]: isInLongFormArticleBody(origin),
  });

  if (origin === PAGE_SCREEN_MARKETING_TYPE) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    innerColStyle = colStyle;
  }

  return {
    FAQInner: '',
    Title: styles.Title,
    InnerWrapper: innerColStyle,
    Row: '',
    Paragraphs: styles.Paragraphs,
  };
};

const MinistageAccordion = ministageAccordionFactory({
  ExpansionPanel,
  paragraphsRenderer: () => ParagraphsRenderer,
  fallbackTitle: 'Die häufigsten Fragen',
  origin: ACCORDION_PAGE,
  styles: getStylesByProps,
});

export default MinistageAccordion;
