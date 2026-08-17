/* istanbul ignore file */

import { memo } from 'react';
import svgIconFactory from '../../../../../common/components/SVGIcon/factory';
import { SVG_ICONS_CONFIG } from './constants';
import styles from './styles.legacy.css';

const SVGIcon = svgIconFactory({
  iconConfig: SVG_ICONS_CONFIG,
  styles: {
    Wrapper: styles.Wrapper,
  },
});

export default memo(SVGIcon);
