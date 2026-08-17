/* istanbul ignore file */

import sponsorBannerFactory from '../../../../../../../../common/components/SponsorBanner/factory';
import Link from '../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

export default sponsorBannerFactory({
  Link,
  styles: {
    Wrapper: '',
    Section: styles.InnerWrapper,
    Banner: styles.Banner,
    Container: styles.InnerBanner,
    SponsorLabelWrapper: styles.SponsorLabelWrapper,
    Label: styles.Label,
  },
});
