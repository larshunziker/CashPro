/* istanbul ignore file */

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import utilityBarFactory from '../../../../../common/components/UtilityBar/factory';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import UtilityLink from './components/UtilityLink';
import { DEFAULT_LANGUAGE } from '../Navigation/components/LanguageSwitch';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../shared/constants/utilitybar';
import { AVAILABLE_UTILITIES, AVAILABLE_UTILITIES_FR } from './constants';
import styles from './styles.legacy.css';
import {
  GetAvailableUtilitiesProps,
  UtilityBarFactoryOptionsStyles,
  UtilityBarProps,
} from '../../../../../common/components/UtilityBar/typings';

const UtilityBookmarkLink = () => null;
const commentStateSelector = () => ({ count: -1 });

const getStyleByProps = ({
  origin,
}: UtilityBarProps): UtilityBarFactoryOptionsStyles => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
    }),
  };
};

type AvailableUtilitiesPropsInner = UtilityBarProps & {
  language: string;
};

const getAvailableUtilitiesByProps: GetAvailableUtilitiesProps<
  AvailableUtilitiesPropsInner
> = ({ language }) => {
  if (language === DEFAULT_LANGUAGE) {
    return AVAILABLE_UTILITIES;
  } else return AVAILABLE_UTILITIES_FR;
};

const UtilityBar = utilityBarFactory({
  UtilityLink,
  UtilityBookmarkLink,
  headerStateSelector,
  locationStateSelector,
  commentStateSelector,
  availableUtilities: getAvailableUtilitiesByProps,
  styles: getStyleByProps,
});

/**
 * map state to props
 *
 * @desc    maps the redux store to props
 * @param   {Object} - state   - current state
 * @returns {Object}
 */
export const mapStateToProps = (state: Object): Object => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(connect(mapStateToProps))(UtilityBar);
