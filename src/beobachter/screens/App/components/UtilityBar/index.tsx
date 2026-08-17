/* istanbul ignore file */

import classNames from 'classnames';
import utilityBarFactory from '../../../../../common/components/UtilityBar/factory';
import commentStateSelector from '../../../../../shared/selectors/commentStateSelector';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import UtilityBookmarkLink from './components/UtilityBookmarkLink';
import UtilityLink from './components/UtilityLink';
import { displayErrorToast } from '../Toast';
import UtilityGiftLink from './components/UtilityGiftLink';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../shared/constants/utilitybar';
import {
  RESTRICTED_ERROR_ID,
  RESTRICTED_ERROR_LINK_PATH,
  RESTRICTED_ERROR_LINK_TEXT,
  RESTRICTED_ERROR_MESSAGE,
} from '../Toast/constants';
import { AVAILABLE_UTILITIES } from './constants';
import styles from './styles.legacy.css';
import {
  UtilityBarFactoryOptionsStyles,
  UtilityBarProps,
} from '../../../../../common/components/UtilityBar/typings';

const getStyleByProps = ({
  origin,
}: UtilityBarProps): UtilityBarFactoryOptionsStyles => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.Header]: origin === UTILITY_BAR_ORIGIN_HEADER,
    }),
  };
};

export default utilityBarFactory({
  UtilityLink,
  UtilityBookmarkLink,
  UtilityGiftLink,
  headerStateSelector,
  locationStateSelector,
  commentStateSelector,
  availableUtilities: AVAILABLE_UTILITIES,
  styles: getStyleByProps,
  ToastService: {
    displaySubscriptionOnlyInfoToast: () =>
      displayErrorToast(
        RESTRICTED_ERROR_MESSAGE,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
        {
          text: RESTRICTED_ERROR_LINK_TEXT,
          path: RESTRICTED_ERROR_LINK_PATH,
        },
        RESTRICTED_ERROR_ID,
      ),
  },
});
