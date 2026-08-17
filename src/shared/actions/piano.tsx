// Page Metadata action type.
export const SET_PIANO_PAGE_META_DATA = 'piano/set-page-meta-data';
// Authentication action type.
export const SET_PIANO_USER_META_DATA = 'piano/set-user-meta-data';
// Browser settings action type.
export const SET_PIANO_BROWSER_META_DATA = 'piano/set-browser-meta-data';
// State reported from piano
export const SET_PIANO_METER_ACTIVE_DATA = 'piano/set-piano-meter-active-data';
// State reported from piano
export const SET_PIANO_WEBINAR_ACCESS = 'piano/set-piano-webinar-access';
//from web app
export const SET_PIANO_EXTERNAL_SUBSCRIPTION =
  'piano/set-piano-external-subscription';
// from
export const SET_CHATBOT_HIDDEN_STATE = 'piano/set-chatbot-hidden-state';
export const SET_PAYWALL_DRAWER_VISIBLE_STATE =
  'piano/set-paywall-drawer-visible-state';

type PianoStateActionTypes =
  | 'piano/set-page-meta-data'
  | 'piano/set-user-meta-data'
  | 'piano/set-browser-meta-data'
  | 'piano/set-piano-meter-active-data'
  | 'piano/set-piano-access-list-data'
  | 'piano/set-piano-webinar-access'
  | 'piano/set-piano-external-subscription'
  | 'piano/set-chatbot-hidden-state'
  | 'piano/set-paywall-drawer-visible-state';

export type PianoStateAction<T> = {
  type: PianoStateActionTypes;
  payload: T;
};

export type SetPianoBrowserMetadata = (
  props: PianoBrowserMetadata,
) => PianoStateAction<PianoBrowserMetadata>;

export type SetPianoAccesGranted = (isAccessGranted: boolean) => void;

export type SetPianoWebinarAccesGranted = (
  webinarAccessGranted: boolean,
) => void;

// Page Metadata action creator.
export const setPianoPageMetadata = ({
  contentType,
  publication,
  isNativeContent,
  pathname,
  publicationDate,
  restrictionStatus,
  section,
  channelsHierarchy,
  tags,
  isPrintArticle,
  subType,
  gcid,
  mainChannel = '',
  webinarId,
  page,
  cliffhangerTitle,
  cliffhangerBulletpoints,
}: PianoPageMetadata): PianoStateAction<PianoPageMetadata> => ({
  type: SET_PIANO_PAGE_META_DATA,
  payload: {
    contentType,
    publication,
    isNativeContent,
    pathname,
    publicationDate,
    restrictionStatus,
    section,
    channelsHierarchy,
    tags,
    isPrintArticle,
    subType,
    gcid,
    mainChannel,
    webinarId,
    page,
    cliffhangerTitle,
    cliffhangerBulletpoints,
  },
});

export const setPianoUserMetadata = ({
  idToken,
  externalSubscription,
  subscriptions,
  initialAuthRequest,
}: PianoUserMetadata): PianoStateAction<PianoUserMetadata> => ({
  type: SET_PIANO_USER_META_DATA,
  payload: {
    idToken,
    externalSubscription,
    subscriptions,
    initialAuthRequest,
  },
});

export const setPianoBrowserMetadata = ({
  browserMode,
  isPushNotificationsSupported,
  isPushNotificationsEnabled,
  notificationsPermission,
}: PianoBrowserMetadata): PianoStateAction<PianoBrowserMetadata> => ({
  type: SET_PIANO_BROWSER_META_DATA,
  payload: {
    browserMode,
    isPushNotificationsSupported,
    isPushNotificationsEnabled,
    notificationsPermission,
  },
});

export const setPianoAccesGranted = (
  isAccessGranted: boolean,
): PianoStateAction<boolean> => ({
  type: SET_PIANO_METER_ACTIVE_DATA,
  payload: isAccessGranted,
});

export const setPianoWebinarAccesGranted = (
  webinarAccessGranted: boolean,
): PianoStateAction<boolean> => ({
  type: SET_PIANO_WEBINAR_ACCESS,
  payload: webinarAccessGranted,
});

export const setExternalSubscription = (
  externalSubscription: Record<string, any>[],
): PianoStateAction<Record<string, any>[]> => ({
  type: SET_PIANO_EXTERNAL_SUBSCRIPTION,
  payload: externalSubscription,
});

export const setChatbotHiddenState = (
  isChatbotHidden: boolean,
): PianoStateAction<boolean> => ({
  type: SET_CHATBOT_HIDDEN_STATE,
  payload: isChatbotHidden,
});

export const setPaywallDrawerVisibleState = (
  isPaywallDrawerVisible: boolean,
): PianoStateAction<boolean> => ({
  type: SET_PAYWALL_DRAWER_VISIBLE_STATE,
  payload: isPaywallDrawerVisible,
});
