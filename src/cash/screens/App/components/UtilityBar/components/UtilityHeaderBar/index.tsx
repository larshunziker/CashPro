/* istanbul ignore file */

import classNames from 'classnames';
import utilityHeaderBarFactory from '../../../../../../../common/components/UtilityBar/components/UtilityHeaderBar/factory';
import UtilityBar from '../../../UtilityBar';
import UtilityOverlay from '../../../UtilityBar/components/UtilityOverlay';
import { TEASER_TITLE_LENGTH } from '../../../Teaser/constants';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

const UtilityHeaderBar = utilityHeaderBarFactory({
  UtilityBar,
  UtilityOverlay,
  truncateTitleLength: TEASER_TITLE_LENGTH,
  styles: {
    Wrapper: classNames(styles.Wrapper, grid.HideForPrint),
    Move: styles.MoveUp,
    TitleWrapper: styles.TitleWrapper,
    Title: styles.Title,
    ContentWrapper: styles.ContentWrapper,
    UtilityBarWrapper: classNames(
      'utility-bar-wrapper',
      styles.UtilityBarWrapper,
    ),
    UtilityOverlayWrapper: styles.UtilityOverlayWrapper,
  },
});

export default UtilityHeaderBar;
