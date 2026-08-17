/* istanbul ignore file */

import loadingSpinnerFactory from '../../../../../common/components/LoadingSpinner/factory';
import styles from './styles.legacy.css';

export default loadingSpinnerFactory({
  styles: {
    SpinnerWrapper: styles.SpinnerWrapper,
    Spinner: styles.Spinner,
    Path: styles.Path,
  },
});
