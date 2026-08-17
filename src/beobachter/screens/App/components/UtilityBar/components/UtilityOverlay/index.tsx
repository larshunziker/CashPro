/* istanbul ignore file */

import classNames from 'classnames';
import utilityOverlayFactory from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/factory';
import UtilityBar from '../../../UtilityBar';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

export default utilityOverlayFactory({
  UtilityBar,
  styles: {
    Wrapper: styles.Wrapper,
    WrapperSticky: styles.WrapperSticky,
    WrapperToggle: styles.WrapperToggle,
    Title: styles.Title,
    CloseButton: styles.CloseButton,
    UtilityBarWrapper: classNames(
      'utility-bar-wrapper',
      styles.UtilityBarWrapper,
      grid.HideForPrint,
    ),
  },
});
