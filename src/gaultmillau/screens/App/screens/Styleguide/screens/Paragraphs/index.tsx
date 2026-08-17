/* istanbul ignore file */

import styleguideFactory from '../../../../../../../common/screens/Styleguide/components/Default/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import Paragraphs from '../../components/Paragraphs';
import styles from '../../styles.legacy.css';

const StyleguideParagraphs = styleguideFactory({
  StyleguideComponents: Paragraphs,
  title: 'Paragraphs',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
  setLoading,
  setScreenReady,
});

export default StyleguideParagraphs;
