/* istanbul ignore file */

import buttonWithLoadingFactory from '../../../../../common/components/ButtonWithLoading/factory';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const ButtonWithLoading = buttonWithLoadingFactory({
  Icon,
  styles: {
    Button: styles.Button,
    ClickEffect: styles.ClickEffect,
    Primary: styles.Primary,
    Secondary: styles.Secondary,
    Tertiary: styles.Tertiary,
    Small: styles.Small,
    HighAttention: styles.HighAttention,
  },
});

export default ButtonWithLoading;
