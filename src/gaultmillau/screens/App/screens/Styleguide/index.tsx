/* istanbul ignore file */

import styleguideFactory from '../../../../../common/screens/Styleguide/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Overview from '../../../../../common/screens/Styleguide/components/Overview';
import styles from './styles.legacy.css';

const Styleguide = styleguideFactory({
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
