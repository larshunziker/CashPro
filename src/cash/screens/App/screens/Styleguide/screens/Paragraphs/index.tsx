/* istanbul ignore file */

import styleguideFactory from '../../../../../../../common/screens/Styleguide/components/Default/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import Paragraphs from '../../components/Paragraphs';
import styles from './styles.legacy.css';

const Styleguide = styleguideFactory({
  StatusPage,
  StyleguideComponents: Paragraphs,
  title: 'Paragraphs',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    InputLabel: styles.InputLabel,
    Input: styles.Input,
  },
  setLoading,
  setScreenReady,
});

export default Styleguide;
