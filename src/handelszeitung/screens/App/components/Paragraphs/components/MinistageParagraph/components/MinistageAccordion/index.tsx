/* istanbul ignore file */

import classNames from 'classnames';
import ministageAccordionFactory, {
  MinistageAccordionPropsInner,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAccordion/factory';
import { mergeClasses } from '../../../../../../../../../shared/helpers/mergeClasses';
import ParagraphsRenderer from '../../../../../Paragraphs/components/ParagraphsRenderer';
import ExpansionPanel from './components/ExpansionPanelFaq';
import { ARTICLE_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import { LANDING_PAGE_TYPE } from '../../../../../../screens/LandingPage/constants';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../../../screens/PageScreen/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const getStylesByProps = ({
  headerContentType,
  origin,
  colStyle,
  isSplittedPageLayout = false,
}: MinistageAccordionPropsInner) => {
  const isArticleContentType = headerContentType === ARTICLE_CONTENT_TYPE;
  const isInLandingPage = origin === LANDING_PAGE_TYPE;
  const isMarketingLandingPage = origin === PAGESCREEN_MARKETING_TYPE;

  let innerColStyle = classNames({
    [grid.ColMd18]:
      isArticleContentType && !isSplittedPageLayout && !isInLandingPage,
    [mergeClasses([
      grid.ColOffsetXs1,
      grid.ColXs22,
      grid.ColOffsetSm1,
      grid.ColSm22,
    ])]: !isArticleContentType && !isSplittedPageLayout && !isInLandingPage,
    [grid.ColXl17]: !!headerContentType && !isSplittedPageLayout,
    [grid.ColXs24]: isSplittedPageLayout,
  });

  if (origin === PAGESCREEN_MARKETING_TYPE) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    innerColStyle = colStyle;
  }

  return {
    Wrapper: styles.Wrapper,
    FAQInner: classNames(styles.FAQInner, {
      [styles.FAQInnerPage]: !isArticleContentType,
    }),
    Title: classNames(styles.Title, {
      [styles.TitlePage]: !isArticleContentType,
    }),
    InnerWrapper: innerColStyle,
    Container: classNames({
      [grid.Container]:
        (isArticleContentType || isMarketingLandingPage || isInLandingPage) &&
        !isSplittedPageLayout,
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
