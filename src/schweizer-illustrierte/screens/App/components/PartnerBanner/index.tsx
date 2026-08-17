/* istanbul ignore file */

import classNames from 'classnames';
import partnerBannerFactory from '../../../../../common/components/PartnerBanner/factory';
import styles from './styles.legacy.css';
// @ts-ignore
import grid from '@grid.legacy.css';

export default partnerBannerFactory({
  styles: {
    ImageContainer: styles.ImageContainer,
    BackgroundImageWrapper: styles.BackgroundImageWrapper,
    BackgroundImage: styles.BackgroundImage,
    PartnerLogo: styles.PartnerLogo,
    Caption: classNames(styles.Caption, grid.Container),
  },
});
