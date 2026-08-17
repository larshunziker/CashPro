import { memo } from 'react';
import loadingSpinnerFactory from '../../../LoadingSpinner/factory';
import styles from './styles.legacy.css';

const LoadingSpinner = loadingSpinnerFactory({
  styles: {
    SpinnerWrapper: styles.SpinnerWrapper,
    Spinner: styles.Spinner,
    Path: styles.Path,
  },
});

export default memo(LoadingSpinner);
