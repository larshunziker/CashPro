/* istanbul ignore file */

import alertItemFactory from '../../../../../common/components/AlertItem/factory';
import styles from './styles.legacy.css';

const AlertItem = alertItemFactory({
  styles: {
    AlertItemImageWrapper: styles.AlertItemImageWrapper,
    AlertItemImage: styles.AlertItemImage,
    AlertItemWrapper: styles.AlertItemWrapper,
    Text: styles.Text,
    ChildWrapper: styles.ChildWrapper,
  },
});

export default AlertItem;
