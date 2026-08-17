import classNames from 'classnames';
import ministageAccordionFactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAccordion/factory';
import ParagraphsRenderer from '../../../../../Paragraphs/components/ParagraphsRenderer';
import ExpansionPanel from './components/ExpansionPanelFaq';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../../../screens/PageScreen/constants';
import { ACCORDION_PAGE } from './constants';
import styles from './styles.legacy.css';
import { MinistageAccordionFactoryOptionStyles } from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAccordion/typings';

const getStylesByProps = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
}): MinistageAccordionFactoryOptionStyles => ({
  FAQInner: styles.AccordionInner,
  Title: classNames(styles.Title, {
    [styles.MarketingPage]: origin === PAGE_SCREEN_MARKETING_TYPE,
  }),
  Paragraphs: styles.Paragraphs,
});

const MinistageAccordion = ministageAccordionFactory({
  ExpansionPanel,
  paragraphsRenderer: () => ParagraphsRenderer,
  fallbackTitle: 'Die häufigsten Fragen',
  origin: ACCORDION_PAGE,
  styles: getStylesByProps,
});

export default MinistageAccordion;
