/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import utilityOverlayFactory from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/factory';
import createComponentSwitch from '../../../../../../shared/decorators/componentSwitch';
import UtilityBar from '../../../UtilityBar';
import Calculator from './components/Calculator';
import Contakt from './components/Contakt';
import Default from './components/Default';
import Downloads from './components/Downloads';
import { UTILITY_BAR_OVERLAY_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import {
  UTILITY_TYPE_CALCULATOR,
  UTILITY_TYPE_CONTACT,
  UTILITY_TYPE_DOWNLOAD,
  UTILITY_TYPE_SHARE,
} from '../../../../../../../shared/constants/utilitybar';
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

const Switch = createComponentSwitch({
  [UTILITY_TYPE_CONTACT]: Contakt,
  [UTILITY_TYPE_CALCULATOR]: Calculator,
  [UTILITY_TYPE_DOWNLOAD]: Downloads,
  [UTILITY_TYPE_SHARE]: Default,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getOverlayByProps = (props) => {
  const { visibleId, isOverlayVisible } = props;
  return (
    <>
      {isOverlayVisible && (
        <button
          aria-label="Menu teilen schliessen"
          className={styles.CloseButton}
          data-testid="utility-overlay-close-button"
          onClick={() => props.toggleOverlayVisible(false)}
        />
      )}
      <Switch component={visibleId} {...props} />
    </>
  );
};

const UtilityBarOverly = utilityOverlayFactory({
  UtilityBar,
  overlay: getOverlayByProps,
  styles: getStyleByProps,
});

export default UtilityBarOverly;
