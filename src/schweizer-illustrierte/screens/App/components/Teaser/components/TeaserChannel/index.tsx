/* istanbul ignore file */

import teaserChannelFactory from '../../../../../../../common/components/Teaser/components/Channel/factory';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';
import { TEASER_IMAGE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';

const TeaserChannel = teaserChannelFactory({
  teaserImageStyles: { style_320: STYLE_1X1_140 },
  imageIdentifier: TEASER_IMAGE_IDENTIFIER,
  styles,
  disableWrapperClassName: true,
});

export default TeaserChannel;
