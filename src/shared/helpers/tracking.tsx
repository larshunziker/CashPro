import {
  LANDING_PAGE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../constants/content';
import { tealiumTrackEvent } from './tealium';

export const replaceTrackingUrlPlaceholders = (trackingUrl: string) =>
  trackingUrl.replace(/\[timestamp]/gi, Date.now().toString());

export const doHandleSearchSuggestionsClickTracking = (query: string) => {
  tealiumTrackEvent({
    payload: {
      event_name: 'search_suggestions_click',
      site_search_term: query,
    },
  });
};

export const doHandlePWATracking = (
  name: string,
  action: string,
  url: string,
) => {
  tealiumTrackEvent({
    type: 'link',
    payload: {
      event_name: name,
      event_category: 'pwa',
      event_action: action,
      event_label: url,
      event_non_interaction: 1,
    },
  });
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'action' implicitly has an 'any' type. */
export const isNativeContent = (action) =>
  action.payload.pageType === NATIVE_ADVERTISING_CONTENT_TYPE ||
  (action.payload.pageSponsor &&
    action.payload.pageType === LANDING_PAGE_CONTENT_TYPE);

export const getAmountOfDaysPublished = (date: string) =>
  Math.ceil(
    Math.abs(new Date().getTime() - new Date(date).getTime()) /
      (60 * 60 * 24 * 1000),
  );
