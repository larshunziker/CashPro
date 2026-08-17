/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import utilityBarFactory from '../../../../../common/components/UtilityBar/factory';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import commentStateSelector from '../../../../../shared/selectors/commentStateSelector';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import UtilityBookmarkLink from './components/UtilityBookmarkLink';
import UtilityLink from './components/UtilityLink';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { IMAGE_GALLERY_CONTENT_TYPE } from '../../../../../shared/constants/content';
import {
  UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
  UTILITY_BAR_ORIGIN_OVERLAY,
} from '../../../../../shared/constants/utilitybar';
import { AVAILABLE_UTILITIES } from './constants';
import styles from './styles.legacy.css';
import {
  UtilityBarFactoryOptionsStyles,
  UtilityBarProps,
} from '../../../../../common/components/UtilityBar/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type UtilityBarPropsInner = UtilityBarProps & {
  activeMainChannel: ActiveMainChannel;
  headerContentType: string;
};

const getStyleByProps = ({
  origin,
  activeMainChannel,
  headerContentType,
}: UtilityBarPropsInner): UtilityBarFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperOverlay]:
        origin === UTILITY_BAR_ORIGIN_OVERLAY ||
        origin === UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
      [styles.Header]: origin === UTILITY_BAR_ORIGIN_HEADER,
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('Wrapper')]:
        headerContentType !== IMAGE_GALLERY_CONTENT_TYPE,
    }),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(
  utilityBarFactory({
    UtilityLink,
    UtilityBookmarkLink,
    headerStateSelector,
    locationStateSelector,
    commentStateSelector,
    availableUtilities: AVAILABLE_UTILITIES,
    styles: getStyleByProps,
  }),
);
