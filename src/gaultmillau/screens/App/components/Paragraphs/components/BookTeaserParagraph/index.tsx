/* istanbul ignore file */

import bookTeaserFactory from '../../../../../../../common/components/Paragraphs/components/BookTeaserParagraph/factory';
import Icon from '../../../Icon';
import { STYLE_TEASER_M_480 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

export default bookTeaserFactory({
  Icon,
  style_320: STYLE_TEASER_M_480,
  truncateTitle: true,
  isDescriptionVisible: true,
  callToAction: 'Mehr erfahren',
  hasInlineCTA: true,
  styles: {
    Wrapper: styles.Wrapper,
    InnerContainer: styles.InnerContainer,
    TextColumn: styles.Caption,
    Title: styles.Title,
    ImageColumn: styles.ImageColumn,
    CallToAction: styles.CallToAction,
  },
});
