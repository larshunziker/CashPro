/* istanbul ignore file */

import teaserMLImageTileFactory from '../../../TeaserML/components/TeaserMLImageTile/factory';
import {
  STYLE_1X1_495,
  STYLE_1X1_660,
  STYLE_2X3_960,
} from '../../../../../../../../../shared/constants/images';
import styles from '../../styles.legacy.css';

const TeaserMLImageTile = teaserMLImageTileFactory({
  teaserImageStyles: {
    style_320: STYLE_1X1_495,
    style_760: STYLE_2X3_960,
    style_960: STYLE_2X3_960,
    style_1680: STYLE_1X1_660,
  },
  styles: { MinimumHeight: styles.MinimumHeight },
});

export default TeaserMLImageTile;
