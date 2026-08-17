/* istanbul ignore file */

import buttonFactory from '../../../../../common/components/Button/factory';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const Button = buttonFactory({
  Icon,
  styles: {
    Button: styles.Button,
    IconLeft: styles.IconLeft,
    IconRight: styles.IconRight,
  },
});

export default Button;
