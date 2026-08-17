/* istanbul ignore file */

import classNames from 'classnames';
import monsterSkyFactory from '../../../../../common/components/MonsterSky/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import scrollStateSelector from '../../../../../shared/selectors/scrollStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import AppNexus from '../AppNexus';
import { SBA_1 } from '../../../../../shared/constants/adZone';
import {
  MONSTER_SKY_MIN_MARGIN_TOP,
  MONSTER_SKY_MIN_WINDOW_WIDTH,
} from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
// eslint-disable-next-line
import styles from './styles.legacy.css';

const MonsterSky = monsterSkyFactory({
  AppNexus,
  scrollStateSelector,
  windowStateSelector,
  locationStateSelector,
  slot: SBA_1,
  monsterSkyMinWindowWidth: MONSTER_SKY_MIN_WINDOW_WIDTH,
  monsterSkyMinMarginTop: MONSTER_SKY_MIN_MARGIN_TOP,
  styles: {
    Wrapper: sections.Section,
    WrapperInner: classNames(styles.Container, grid.Container),
    AdWrapper: styles.AdWrapper,
    Ad: styles.Ad,
    Sticky: styles.Sticky,
  },
});

export default MonsterSky;
