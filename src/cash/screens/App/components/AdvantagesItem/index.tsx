/* istanbul ignore file */

import advantagesItemFactory from '../../../../../common/components/AdvantagesItem/factory';
import styles from './styles.legacy.css';

const AdvantagesParagraph = advantagesItemFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Icon: styles.Icon,
    Text: styles.Text,
  },
});

export default AdvantagesParagraph;
