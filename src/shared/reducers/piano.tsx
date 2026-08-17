import {
  PianoStateAction,
  SET_CHATBOT_HIDDEN_STATE,
  SET_PAYWALL_DRAWER_VISIBLE_STATE,
  SET_PIANO_BROWSER_META_DATA,
  SET_PIANO_EXTERNAL_SUBSCRIPTION,
  SET_PIANO_METER_ACTIVE_DATA,
  SET_PIANO_PAGE_META_DATA,
  SET_PIANO_USER_META_DATA,
  SET_PIANO_WEBINAR_ACCESS,
} from '../actions/piano';

export const initialState: PianoState = {
  pageMetadata: {
    channelsHierarchy: [],
    contentType: null,
    publication: '',
    isPrintArticle: false,
    isNativeContent: false,
    pathname: '/',
    publicationDate: '',
    restrictionStatus: null,
    section: '',
    tags: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    gcid: null,
    subType: '',
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    mainChannel: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    page: null,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    webinarId: null,
    notInitialized: false, // we should set it to true for all publications
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    cliffhangerTitle: null,
    cliffhangerBulletpoints: [],
  },
  userMetadata: {
    idToken: '',
    externalSubscription: [],
    subscriptions: [],
    initialAuthRequest: false,
  },
  browserMetadata: {
    browserMode: 'normal',
    isPushNotificationsSupported: false,
    isPushNotificationsEnabled: false,
    notificationsPermission: 'default',
  },
  isAccessGranted: false,
  webinarAccessGranted: false,
  isChatbotHidden: false,
};

const PianoStateReducer = (
  state: PianoState = initialState,
  action: PianoStateAction<
    | PianoPageMetadata
    | PianoUserMetadata
    | PianoBrowserMetadata
    | boolean
    | string
  >,
): PianoState => {
  switch (action.type) {
    case SET_PIANO_PAGE_META_DATA:
      const {
        channelsHierarchy,
        contentType,
        publication,
        isNativeContent,
        pathname,
        publicationDate,
        restrictionStatus,
        section,
        tags,
        isPrintArticle,
        subType,
        gcid,
        mainChannel,
        webinarId,
        page,
        cliffhangerTitle,
        cliffhangerBulletpoints,
      } = action.payload as PianoPageMetadata;

      return {
        ...state,
        pageMetadata: {
          channelsHierarchy,
          contentType,
          publication,
          isNativeContent,
          pathname,
          publicationDate,
          restrictionStatus,
          section,
          tags,
          isPrintArticle,
          subType,
          gcid,
          mainChannel,
          webinarId,
          notInitialized: false,
          page,
          cliffhangerTitle,
          cliffhangerBulletpoints,
        },
        isAccessGranted: false,
        webinarAccessGranted: false,
      };
    case SET_PIANO_USER_META_DATA:
      return {
        ...state,
        userMetadata: {
          idToken:
            (action.payload as PianoUserMetadata).idToken ||
            initialState.userMetadata.idToken,
          externalSubscription:
            (action.payload as PianoUserMetadata).externalSubscription ||
            state.userMetadata.externalSubscription ||
            initialState.userMetadata.externalSubscription,
          subscriptions:
            (action.payload as PianoUserMetadata).subscriptions ||
            state.userMetadata.subscriptions ||
            initialState.userMetadata.subscriptions,
          initialAuthRequest:
            (action.payload as PianoUserMetadata).initialAuthRequest ??
            initialState.userMetadata.initialAuthRequest,
        },
      };
    case SET_PIANO_BROWSER_META_DATA:
      return {
        ...state,
        browserMetadata: {
          browserMode: (action.payload as PianoBrowserMetadata).browserMode,
          isPushNotificationsSupported: (action.payload as PianoBrowserMetadata)
            .isPushNotificationsSupported,
          isPushNotificationsEnabled: (action.payload as PianoBrowserMetadata)
            .isPushNotificationsEnabled,
          notificationsPermission: (action.payload as PianoBrowserMetadata)
            .notificationsPermission,
        },
      };
    case SET_PIANO_METER_ACTIVE_DATA:
      return {
        ...state,
        isAccessGranted: action.payload as boolean,
      };
    case SET_PIANO_WEBINAR_ACCESS:
      return {
        ...state,
        webinarAccessGranted: action.payload as boolean,
      };
    case SET_PIANO_EXTERNAL_SUBSCRIPTION:
      return {
        ...state,
        userMetadata: {
          idToken: state.userMetadata.idToken,
          externalSubscription: Array.isArray(action.payload)
            ? (action.payload as Record<string, any>[])
            : [],
          subscriptions: state.userMetadata.subscriptions || [],
          initialAuthRequest: state.userMetadata.initialAuthRequest,
        },
      };
    case SET_CHATBOT_HIDDEN_STATE:
      return {
        ...state,
        isChatbotHidden: action.payload as boolean,
      };
    case SET_PAYWALL_DRAWER_VISIBLE_STATE:
      return {
        ...state,
        isPaywallDrawerVisible: action.payload as boolean,
      };
    default:
      return state;
  }
};

export default PianoStateReducer;
