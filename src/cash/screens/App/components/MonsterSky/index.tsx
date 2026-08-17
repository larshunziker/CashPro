/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import monsterSkyFactory from '../../../../../common/components/MonsterSky/factory';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import scrollStateSelector from '../../../../../shared/selectors/scrollStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import AppNexus from '../AppNexus';
import { RIGHT_AD_1 } from '../AppNexus/constants';
import {
  MONSTER_SKY_MIN_MARGIN_TOP,
  MONSTER_SKY_MIN_WINDOW_WIDTH,
  MONSTER_SKY_POSITION_FIXED,
} from './constants';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'isAuthenticated' & 'headerArticleData' implicitly has an 'any' type. */
const getStylesByProps = ({ isAuthenticated, headerArticleData }) => {
  return {
    Wrapper: sections.Section,
    WrapperInner: classNames(styles.Container, sections.Container),
    AdWrapper: classNames(styles.AdWrapper, {
      [styles.UtilityBarPresent]: Object.keys(headerArticleData)?.length > 0,
      [styles.MiniWidgetsPresent]: isAuthenticated,
    }),
    Ad: styles.Ad,
    Sticky: styles.Sticky,
    Children: styles.Children,
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
const appShouldUpdate = (props, nextProps) => {
  return props.isAuthenticated !== nextProps.isAuthenticated;
};

const MonsterSky = monsterSkyFactory({
  AppNexus,
  scrollStateSelector,
  windowStateSelector,
  locationStateSelector,
  slot: RIGHT_AD_1,
  monsterSkyMinWindowWidth: MONSTER_SKY_MIN_WINDOW_WIDTH,
  monsterSkyMinMarginTop: MONSTER_SKY_MIN_MARGIN_TOP,
  styles: getStylesByProps,
  shouldUpdate: appShouldUpdate,
  positionModeOverride: MONSTER_SKY_POSITION_FIXED,
});

const mapStateToProps = (state: ReduxState) => ({
  isAuthenticated: authStateSelector(state).isAuthenticated,
  headerArticleData: headerStateSelector(state).articleData,
});
export default connect(mapStateToProps, null)(MonsterSky);
