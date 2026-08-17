/* istanbul ignore file */

import offlineFactory from './../../../../../common/screens/Offline/factory';
import Helmet from './../../components/Helmet';
import SVGIcon from './../../components/SVGIcon';
import { SVG_ICONS_TYPE_OFFLINE } from '../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';

const Offline = offlineFactory({
  Helmet,
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
    Description: styles.Description,
    Icon: styles.Icon,
  },
  SVGIcon,
  iconType: SVG_ICONS_TYPE_OFFLINE,
});

export default Offline;
