/* istanbul ignore file */

import classNames from 'classnames';
import utilityOverlayFactory from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/factory';
import UtilityBar from '../../../UtilityBar';
import { UTILITY_BAR_OVERLAY_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import styles from './styles.legacy.css';
import {
  UtilityOverlayFactoryOptionsStyles,
  UtilityOverlayProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/typings';

const getStyleByProps = ({
  origin,
}: UtilityOverlayProps): UtilityOverlayFactoryOptionsStyles => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperHeaderOverlay]:
        origin === UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
      [styles.WrapperPageOverlay]: origin !== UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
    }),
    WrapperToggle: styles.WrapperToggle,
    WrapperSticky: styles.WrapperSticky,
    Title: styles.Title,
    CloseButton: styles.CloseButton,
    UtilityBarWrapper: classNames(
      'utility-bar-wrapper',
      styles.UtilityBarWrapper,
    ),
  };
};

export default utilityOverlayFactory({
  UtilityBar,
  styles: getStyleByProps,
});
