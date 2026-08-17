/* istanbul ignore file */

import styleguideFactory from '../../../../../common/screens/Styleguide/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import StatusPage from '../StatusPage';
import Overview from './components/Overview';
import styles from './styles.legacy.css';

const Styleguide = styleguideFactory({
  StatusPage,
  StyleguideComponents: Overview,
  title: 'Styleguide',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
  setLoading,
  setScreenReady,
});

export default Styleguide;
