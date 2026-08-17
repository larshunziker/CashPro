import sponsorBannerFactory from '../../../../../common/components/SponsorBanner/factory';
import Link from '../../../../../common/components/LinkLegacy';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';

/* istanbul ignore file */

const SponsorBanner = sponsorBannerFactory({
  Link,
  styles: {
    Wrapper: styles.Wrapper,
    Section: sections.Section,
    Container: grid.Container,
    Banner: styles.Banner,
    Label: styles.Label,
  },
});

export default SponsorBanner;
