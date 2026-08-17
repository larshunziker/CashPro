/* istanbul ignore file */

import embedParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/factory';
import EmbedConsentBlock from './components/EmbedConsentBlock';
import styles from './styles.legacy.css';
const EmbedParagraph = embedParagraphFactory({
  styles: {
    Wrapper: styles.Wrapper,
    TitleWrapper: '',
    Title: styles.Title,
  },
  EmbedConsentBlock,
});

export default EmbedParagraph;
