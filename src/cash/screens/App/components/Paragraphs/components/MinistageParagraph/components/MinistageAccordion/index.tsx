/* istanbul ignore file */

import classNames from 'classnames';
import ministageAccordionFactory, {
  MinistageAccordionPropsInner,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAccordion/factory';
import ParagraphsRenderer from '../../../../../Paragraphs/components/ParagraphsRenderer';
import ExpansionPanel from './components/ExpansionPanelFaq';
import { ARTICLE_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../../../screens/PageScreen/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const getStylesByProps = ({
  headerContentType,
  origin,
  colStyle,
}: MinistageAccordionPropsInner) => {
  let innerColStyle = classNames({
    [grid.ColMd18]: headerContentType === ARTICLE_CONTENT_TYPE,
    [grid.ColOffsetXs1]: headerContentType !== ARTICLE_CONTENT_TYPE,
    [grid.ColXs22]: headerContentType !== ARTICLE_CONTENT_TYPE,
    [grid.ColOffsetSm1]: headerContentType !== ARTICLE_CONTENT_TYPE,
    [grid.ColSm22]: headerContentType !== ARTICLE_CONTENT_TYPE,
    [grid.ColXl17]: headerContentType !== undefined,
  });

  if (origin === PAGESCREEN_MARKETING_TYPE) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    innerColStyle = colStyle;
  }
  return {
    Wrapper: styles.Wrapper,
    FAQInner: styles.FAQInner,
    Title: styles.Title,
    InnerWrapper: innerColStyle,
    Container: classNames({
      [grid.Container]:
        headerContentType === ARTICLE_CONTENT_TYPE ||
        origin === PAGESCREEN_MARKETING_TYPE,
    }),
    Paragraphs: styles.Paragraphs,
    Row: grid.Row,
  };
};

const MinistageAccordion = ministageAccordionFactory({
  ExpansionPanel,
  paragraphsRenderer: () => ParagraphsRenderer,
  fallbackTitle: 'Die häufigsten Fragen',
  styles: getStylesByProps,
});

export default MinistageAccordion;
