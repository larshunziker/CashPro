import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { STYLE_SCALEW_280 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

const TeaserSponsor = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_SCALEW_280,
  },
  styles: {
    Wrapper: '',
    OuterWrapper: styles.Wrapper,
    Title: styles.Title,
    SkeletonWrapper: styles.SkeletonImage,
    SkeletonShortTitle: styles.Title,
    Image: styles.SponsorImage,
  },
});

export default TeaserSponsor;
