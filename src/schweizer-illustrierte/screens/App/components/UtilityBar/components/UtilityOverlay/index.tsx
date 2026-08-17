/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import utilityOverlayFactory from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import UtilityBar from '../../../UtilityBar';
import { UTILITY_BAR_OVERLAY_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { IMAGE_GALLERY_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import {
  UtilityOverlayFactoryOptionsStyles,
  UtilityOverlayProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type UtilityOverlayPropsInner = UtilityOverlayProps & {
  activeMainChannel: ActiveMainChannel;
  headerContentType: string;
};

const getStyleByProps = ({
  activeMainChannel,
  origin,
  headerContentType,
}: UtilityOverlayPropsInner): UtilityOverlayFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperHeaderOverlay]:
        origin === UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
      [styles.WrapperInPageOverlay]:
        origin !== UTILITY_BAR_OVERLAY_ORIGIN_HEADER,
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('WrapperPageOverlay')]:
        origin !== UTILITY_BAR_OVERLAY_ORIGIN_HEADER &&
        headerContentType !== IMAGE_GALLERY_CONTENT_TYPE,
    }),
    WrapperSticky: styles.WrapperSticky,
    WrapperToggle: styles.WrapperToggle,
    Title: styles.Title,
    CloseButton: styles.CloseButton,
    UtilityBarWrapper: classNames(
      'utility-bar-wrapper',
      styles.UtilityBarWrapper,
    ),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
  headerContentType: headerStateSelector(state).contentType,
});

export default connect(mapStateToProps)(
  utilityOverlayFactory({
    UtilityBar,
    styles: getStyleByProps,
  }),
);
