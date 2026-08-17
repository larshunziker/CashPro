/* istanbul ignore file */

import teaserChannelFactory from '../../../../../../../common/components/Teaser/components/Channel/factory';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';

const TeaserChannel = teaserChannelFactory({
  imageIdentifier: TEASER_IMAGE_IDENTIFIER,
  styles: {
    Wrapper: styles.Wrapper,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserChannel;
