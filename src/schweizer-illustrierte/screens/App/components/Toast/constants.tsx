import { ROUTE_ALERTS, ROUTE_BOOKMARKS } from '../../../App/constants';

export const AUTHORIZATION_ERROR_MESSAGE =
  'Deine Sitzung ist abgelaufen. Bitte melde dich neu an.  ';
export const AUTHORIZATION_ERROR_ID = 'toast/authorization-error';
export const AUTHORIZATION_LINK_TEXT = 'Zum Login';
export const AUTHORIZATION_INFO_MESSAGE =
  'Bitte melde dich an um Themen zu folgen: ';
export const AUTHORIZATION_INFO_ID = 'toast/authorization-info';

export const LIMIT_EXCEEDED_ERROR_MESSAGE =
  'Du hast das Limit von 100 abonnierten Themen erreicht. Bitte lösche Themen bevor du neue abonnierst. ';
export const LIMIT_EXCEEDED_ERROR_LINK_TEXT = 'Zu den E-Mail-Alerts';
export const LIMIT_EXCEEDED_ERROR_LINK_PATH = ROUTE_ALERTS;
export const LIMIT_EXCEEDED_ERROR_ID = 'toast/limit-exceeded-error';

export const BOOKMARKS_ADD_SUCCESS_MESSAGE =
  'Artikel zur Merkliste hinzugefügt. ';
export const BOOKMARKS_ADD_SUCCESS_ID = 'toast/bookmarks-add-success';
export const BOOKMARKS_REMOVE_SUCCESS_MESSAGE =
  'Artikel aus Merkliste entfernt. ';
export const BOOKMARKS_REMOVE_SUCCESS_ID = 'toast/bookmarks-remove-success';
export const BOOKMARKS_PATH = ROUTE_BOOKMARKS;
export const BOOKMARKS_AUTHORIZATION_INFO_MESSAGE =
  'Bitte melde dich an, um den Artikel deiner Merkliste hinzuzufügen. ';
export const BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE =
  'Limit von 100 gespeicherten Artikeln auf deiner Merkliste erreicht. Bitte entferne zuerst Artikel von deiner Merkliste, bevor du neue hinzufügst. ';
export const BOOKMARKS_LIMIT_EXCEEDED_ERROR_LINK_TEXT = 'Zur Merkliste';
export const BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID =
  'toast/bookmarks-limit-exceeded-error';
export const BOOKMARKS_LINK_TEXT = 'Zur Merkliste';

export const DEFAULT_ERROR_MESSAGE =
  'Es ist etwas schief gelaufen. Bitte versuche es später nochmals.';
