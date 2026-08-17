/* istanbul ignore file */

import svgIconFactory from '../../../../../common/components/SVGIcon/factory';
import { SVG_ICONS_CONFIG } from './constants';
import styles from './styles.legacy.css';

export default svgIconFactory({
  iconConfig: SVG_ICONS_CONFIG,
  styles: {
    Wrapper: styles.Wrapper,
  },
});
