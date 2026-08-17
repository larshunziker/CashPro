import sponsorBannerFactory from '../../../../../common/components/SponsorBanner/factory';
import Link from '../../../../../common/components/LinkLegacy';
import styles from './styles.legacy.css';

/* istanbul ignore file */

const SponsorBanner = sponsorBannerFactory({
  Link,
  styles: {
    Wrapper: styles.Wrapper,
    Section: '',
    Container: '',
    Banner: styles.Banner,
    Label: styles.Label,
  },
});

export default SponsorBanner;
