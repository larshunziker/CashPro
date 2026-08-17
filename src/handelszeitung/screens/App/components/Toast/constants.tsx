import {
  ROUTE_ALERTS,
  ROUTE_BOOKMARKS,
  ROUTE_SUBSCRIPTIONS,
} from '../../../App/constants';

export const AUTHORIZATION_ERROR_MESSAGE =
  'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich neu an. ';
export const AUTHORIZATION_ERROR_ID = 'toast/authorization-error';
export const AUTHORIZATION_LINK_TEXT = 'Zum Login';
export const AUTHORIZATION_INFO_MESSAGE =
  'Bitte melden Sie sich an um Themen zu folgen: ';
export const AUTHORIZATION_INFO_ID = 'toast/authorization-info';

export const RESTRICTED_ERROR_MESSAGE =
  'In HZ Abo Artikeln steht diese Funktion nur Abonnenten zur Verfügung. ';
export const RESTRICTED_ERROR_LINK_TEXT = 'Zur Aboübersicht';
export const RESTRICTED_ERROR_LINK_PATH = ROUTE_SUBSCRIPTIONS;
export const RESTRICTED_ERROR_ID = 'toast/restricted-info';

export const LIMIT_EXCEEDED_ERROR_MESSAGE =
  'Sie haben das Limit von 100 abonnierten Themen erreicht. Bitte löschen Sie Themen bevor Sie neue abonnieren. ';
export const LIMIT_EXCEEDED_ERROR_LINK_TEXT = 'Zu den E-Mail-Alerts';
export const LIMIT_PUSH_EXCEEDED_ERROR_LINK_TEXT = 'Zu den Push-Alerts';
export const LIMIT_EXCEEDED_ERROR_LINK_PATH = ROUTE_ALERTS;
export const LIMIT_EXCEEDED_ERROR_ID = 'toast/limit-exceeded-error';

export const BOOKMARKS_PATH = ROUTE_BOOKMARKS;
export const BOOKMARKS_AUTHORIZATION_INFO_MESSAGE =
  'Bitte melden Sie sich an, um den Artikel Ihrer Merkliste hinzuzufügen. ';
export const BOOKMARKS_ADD_SUCCESS_MESSAGE =
  'Artikel zur Merkliste hinzugefügt. ';
export const BOOKMARKS_ADD_SUCCESS_ID = 'toast/bookmarks-add-success';
export const BOOKMARKS_REMOVE_SUCCESS_MESSAGE =
  'Artikel aus Merkliste entfernt. ';
export const BOOKMARKS_REMOVE_SUCCESS_ID = 'toast/bookmarks-remove-success';

export const BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE =
  'Sie haben das Limit von 100 gespeicherten Artikeln auf Ihrer Merkliste erreicht. Bitte entfernen Sie zuerst Artikel von Ihrer Merkliste, bevor Sie neue hinzufügen. ';
export const BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID =
  'toast/bookmarks-limit-exceeded-error';
export const BOOKMARKS_LINK_TEXT = 'Zur Merkliste';

export const DEFAULT_ERROR_MESSAGE =
  'Es ist etwas schief gelaufen. Bitte versuchen Sie es später nochmals.';
