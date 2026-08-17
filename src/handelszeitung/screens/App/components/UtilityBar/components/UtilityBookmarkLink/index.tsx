/* istanbul ignore file */

import classNames from 'classnames';
import utilityBookmarkLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityBookmarkLink/factory';
import Link from '../../../../../../../common/components/LinkLegacy';
import SVGIcon from '../../../SVGIcon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../Toast';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../../../shared/constants/utilitybar';
import {
  AUTHORIZATION_ERROR_ID,
  AUTHORIZATION_ERROR_MESSAGE,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_LINK_TEXT,
  BOOKMARKS_ADD_SUCCESS_ID,
  BOOKMARKS_ADD_SUCCESS_MESSAGE,
  BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ScaleAnimation];

const getStyleByProps = ({
  origin,
}: UtilityBookmarkLinkProps): UtilityBookmarkLinkFactoryOptionsStyles => {
  return {
    Link: classNames(styles.Link, {
      [styles.LinkOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.LinkHeader]: origin === UTILITY_BAR_ORIGIN_HEADER,
    }),
    Label: styles.Label,
    Icon: styles.Icon,
    Animating: styles.Animating,
    Restricted: styles.Restricted,
  };
};

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
        text: BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
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

const utilityBookmarkLink = utilityBookmarkLinkFactory({
  Link,
  SVGIcon,
  ToastService: getToastInstanceByProps,
  styles: getStyleByProps,
});

export default utilityBookmarkLink;
