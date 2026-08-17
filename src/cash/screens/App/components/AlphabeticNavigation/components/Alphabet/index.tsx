/* istanbul ignore file */

import alphabetFactory from '../../../../../../../common/components/AlphabeticNavigation/components/Alphabet/factory';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

const Alphabet = alphabetFactory({
  Link,
  styles: {
    ActiveLink: styles.ActiveLink,
    Link: styles.Link,
    MobileWrapper: styles.MobileWrapper,
    Wrapper: styles.Wrapper,
  },
});

export default Alphabet;
