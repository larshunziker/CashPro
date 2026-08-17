/* istanbul ignore file */

import teaserChannelFactory from '../../../../../../../common/components/Teaser/components/Channel/factory';
import { STYLE_TEASER_1_1 } from '../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';

const TeaserChannel = teaserChannelFactory({
  teaserImageStyles: { style_320: STYLE_TEASER_1_1 },
  imageIdentifier: TEASER_IMAGE_IDENTIFIER,
  styles: {
    Wrapper: styles.Wrapper,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    Image: styles.Image,
  },
});

export default TeaserChannel;
