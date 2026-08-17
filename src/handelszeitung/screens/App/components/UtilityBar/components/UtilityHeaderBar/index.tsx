/* istanbul ignore file */

import classNames from 'classnames';
import utilityHeaderBarFactory from '../../../../../../../common/components/UtilityBar/components/UtilityHeaderBar/factory';
import UtilityBar from '../../../UtilityBar';
import UtilityOverlay from '../../../UtilityBar/components/UtilityOverlay';
import { TEASER_TITLE_LENGTH } from '../../../Teaser/constants';
import styles from './styles.legacy.css';

export default utilityHeaderBarFactory({
  UtilityBar,
  UtilityOverlay,
  truncateTitleLength: TEASER_TITLE_LENGTH,
  styles: {
    Wrapper: styles.Wrapper,
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
