import factory from '../../../TeaserML/components/TeaserMLImageTile/factory';
import {
  STYLE_1X1_280,
  STYLE_1x2_218,
  STYLE_2X3_280,
  STYLE_2X3_360,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

export default factory({
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
    style_540: STYLE_2X3_360,
    style_760: STYLE_1x2_218,
    style_1680: STYLE_2X3_280,
  },
  styles: { MinimumHeight: styles.MinimumHeightImageTile },
});
