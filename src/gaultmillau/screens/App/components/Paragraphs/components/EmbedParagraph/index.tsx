/* istanbul ignore file */

import embedParagraphFactory from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/factory';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import EmbedConsentBlock from './components/EmbedConsentBlock';
import styles from './styles.legacy.css';
export default embedParagraphFactory({
  windowStateSelector,
  styles: {
    Wrapper: styles.Wrapper,
    TitleWrapper: '',
    Title: styles.Title,
  },
  EmbedConsentBlock,
});
