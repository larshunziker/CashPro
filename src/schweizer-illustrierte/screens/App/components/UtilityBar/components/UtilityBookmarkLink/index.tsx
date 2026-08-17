/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import utilityBookmarkLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityBookmarkLink/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/LinkLegacy';
import SVGIcon from '../../../SVGIcon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../Toast';
import {
  UTILITY_BAR_ORIGIN_OVERLAY,
  UTILITY_BAR_THEME_LIGHT,
} from '../../../../../../../shared/constants/utilitybar';
import {
  AUTHORIZATION_ERROR_ID,
  AUTHORIZATION_ERROR_MESSAGE,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_LINK_TEXT,
  BOOKMARKS_ADD_SUCCESS_ID,
  BOOKMARKS_ADD_SUCCESS_MESSAGE,
  BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_LINK_TEXT,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
  BOOKMARKS_LINK_TEXT,
  BOOKMARKS_PATH,
  BOOKMARKS_REMOVE_SUCCESS_ID,
  BOOKMARKS_REMOVE_SUCCESS_MESSAGE,
} from '../../../Toast/constants';
import styles from './styles.legacy.css';
import {
  UtilityBookmarkLinkFactoryOptionsStyles,
  UtilityBookmarkLinkProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityBookmarkLink/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type UtilityBookmarkLinkPropsInner = UtilityBookmarkLinkProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStyleByProps = ({
  origin,
  activeMainChannel,
  theme,
}: UtilityBookmarkLinkPropsInner): UtilityBookmarkLinkFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Link: classNames(styles.Link, getThemedClass('LinkHover'), {
      [styles.LinkOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.LinkLight]: theme === UTILITY_BAR_THEME_LIGHT,
    }),
    Label: styles.Label,
    Icon: styles.Icon,
    Animating: styles.Animating,
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const getToastInstanceByProps = ({ trackingSource = '' }) => ({
  displayDefaultSuccessToast: () =>
    displaySuccessToast(
      BOOKMARKS_ADD_SUCCESS_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: BOOKMARKS_LINK_TEXT,
        path: BOOKMARKS_PATH,
      },
      BOOKMARKS_ADD_SUCCESS_ID,
    ),
  displayRemoveSuccessToast: () =>
    displaySuccessToast(
      BOOKMARKS_REMOVE_SUCCESS_MESSAGE,
      null,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '"toast/bookmarks-remove-success"' is not assignable to parameter of type 'null | undefined'. */
      BOOKMARKS_REMOVE_SUCCESS_ID,
    ),
  displayDefaultErrorToast: () => displayErrorToast(),
  displayAuthenticationErrorToast: () =>
    displayErrorToast(
      AUTHORIZATION_ERROR_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, trackingSource),
      },
      AUTHORIZATION_ERROR_ID,
    ),
  displayLimitExceededToast: () =>
    displayErrorToast(
      BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: BOOKMARKS_LIMIT_EXCEEDED_ERROR_LINK_TEXT,
        path: BOOKMARKS_PATH,
      },
      BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
    ),
  displayAuthenticationInfoToast: () =>
    displayInfoToast(
      BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, trackingSource),
      },
      AUTHORIZATION_INFO_ID,
    ),
});

export default connect(mapStateToProps)(
  utilityBookmarkLinkFactory({
    Link,
    SVGIcon,
    ToastService: getToastInstanceByProps,
    styles: getStyleByProps,
  }),
);
