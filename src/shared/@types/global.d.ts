import { LinkStackElement } from 'src/shared/hooks/useScrollToLinkElement';
import type {
  OneSignalV16Client,
  WebPushNotificationsGlobal,
} from 'src/shared/helpers/oneSignal/types';
export {};

declare global {
  const __ALERTS_SERVICE_ENDPOINT__: string;
  const __BOOKMARKS_SERVICE_ENDPOINT__: string;
  const __AD_PUBLISHER__: string;
  const __TAG_MANAGER_URL__: string;
  const __TAG_MANAGER_URL_FR__: string;
  const __APP_NAME__: string;
  const __MEDIA_ASSETS_HOST__: string;
  const __DATADOG_CLIENT_TOKEN__: string;
  const __DATADOG_APP_ID__: string;
  const __DATADOG_SERVICE_NAME__: string;
  const __DATADOG_ENV__: string;
  const __DATADOG_SAMPLE_RATE__: string;
  const __DATADOG_APP_VERSION__: string;
  const __APP__: string;
  const __DOT_ENV__: string;
  const __ONESIGNAL_APP_ID__: string | false;
  const __DEV_ONESIGNAL_APP_ID__: string | false;
  const __USE_DEBUG_TRACING__: boolean;
  const __USE_STRICT_MODE__: boolean;
  const __AUTH0_CLIENT_ID__: string;
  const __AUTH_SERVICE_URL__: string;
  const __AUTH0_SERVICES_URI__: string;
  const __AUTH_LOGIN_OFFLINE_ENABLED__: boolean;
  const __SERVER__: boolean;
  const __CLIENT__: boolean;
  const __DEVELOPMENT__: boolean;
  const __TESTING__: boolean;
  const __PRODUCTION__: boolean;
  const __RECOS_ENDPOINT__: string;
  const __COMMERCE_SERVICE_ENDPOINT__: string;
  const __LEGAL_ADVICE_SEARCH_ENDPOINT__: string;
  const __ATTACHMENTS_ENDPOINT__: string;
  const __WEBFORM_FILES_SERVICE_ENDPOINT__: string;
  const __SAP_SERVICE_ENDPOINT__: string;
  const __DATATRANS_ENDPOINT__: string;
  const __PIANO_AID__: string;
  const __PIANO_API_TOKEN__: string;
  const __PIANO_CXENSE_ID__: string;
  const __PIANO_ENDPOINT__: string;
  const __PIANO_FORCE_DISABLE__: string;
  const __PIANO_ENV__: string;
  const __PIANO_LOGIN_CASE__: string;
  const __PIANO_LOGIN_CASE_FULLNAME_REQUIRED__: string;
  const __PIANO_AD_FREE_RESOURCES__: string;
  const __PIANO_SERVICE_ENDPOINT__: string;
  const __RINGIER_CONNECT_ENABLED__: boolean;
  const __SOVENDUS_API_KEY__: string;
  const __SOVENDUS_API_URL__: string;
  const __SOVENDUS_EXTERNAL_ID__: string;
  const __USE_LOCAL_ESI_PROCESSING__: boolean;
  const __FORCE_PREVIEW_REQUESTS__: boolean;
  const __TEALIUM_ACCOUNT__: string;
  const __TEALIUM_PROFILE__: string;
  const __TEALIUM_ENV__: string;
  const __GA_SID__: string;
  const __FI_BOX_SERVICE_ENDPOINT__: string;
  const __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID__: string;
  const __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL__: string;
  const __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__: string;
  const __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL__: string;
  const __HYBRID_APP_URL__: string;
  const __ONE_TRUST_ID__: string;
  const __BUILD_DATE_TIME__: string;
  const __GRAPHQL_HOST_LOADER__: string;
  const __FEATURES__: string;
  const __VIAFOURA_DATE__: string;
  const __GTM_AUTH__: string;
  const __GTM_PREVIEW__: string;
  const __ENABLE_GOOGLE_NEWS_SHOWCASE__: boolean;
  const __ENABLE_GROWTHBOOK__: boolean;
  const __WEB_PUSH_ENABLED__: boolean;
  const __GROWTHBOOK_API_HOST__: string;
  const __GROWTHBOOK_CLIENT_KEY__: string;
  const __FR_HOME_NODE_ID__: string;
  var vfQ: any[];
  var vfLoaded: boolean;
  var vf: any; // Viafoura global object
  var __CENTINEL_ANALYTICA_SITE_KEY__: string;

  var location: Location;
  var locationOrigin: string;
  var history: History;
  var apolloClient: ApolloClient;
  var Ads: Ads;
  var admTagMan: any;
  var Datatrans: any;
  var dlApi: any;
  var localStorage: Storage | null;
  var sessionStorage: Storage | null;
  var isFullscreenGallery: boolean;
  var __GRAPHQL_HOST__: string;
  var __PREVIEW_GRAPHQL_HOST__: string;
  var __INITIAL_STATE__: string;
  var apolloInitialErrorStatus: any;
  var addEventListener: (
    type: string,
    listener: (ev: any) => any,
    useCapture?: boolean,
  ) => void;
  var removeEventListener: (
    type: string,
    listener: (ev: any) => any,
    useCapture?: boolean,
  ) => void;
  var imageObserver: IntersectionObserver;
  var bc: (el: HTMLVideoElement) => BrightcovePlayer; // brightcove
  var videojs: any;

  var OneSignal: any;
  var OneSignalDeferred: Array<
    (oneSignal: OneSignalV16Client) => void | Promise<void>
  >;
  var webPushNotifications: WebPushNotificationsGlobal | undefined;
  var __oneSignalInitQueued: boolean | undefined;
  var tp: any;
  var loadedImages: Record<string, any>;
  var loadedImagesArray: Array<string>;
  var olid: '0' | '1' | '2';
  var navigator: Navigator & { share: any; standalone: boolean };
  var __LINK_ELEMENT_STACK__: LinkStackElement[];
  namespace Express {
    interface Request {
      startTimeStamp: number;
      isAkamaiRequest: boolean;
    }
  }
  namespace NodeJS {
    interface Global {
      scrollTo?: Function;
      refetchGQL?: Function | null;
      socialMetaValues?: {
        field_short_title: string;
        field_short_description: string;
        field_heroimage: string;
        field_lead: string;
      };
    }
  }

  declare type ImageStylesObject = {
    style_320: string;
    style_480?: string;
    style_540?: string;
    style_760?: string;
    style_960?: string;
    style_1680?: string;
  };

  type noop = () => null;

  type RequestIdleCallbackHandle = any;
  type RequestIdleCallbackOptions = {
    timeout: number;
  };
  type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
  };

  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    __REDUX_DEVTOOLS_EXTENSION__: () => void;
    __APOLLO_STATE__: any;
    __INITIAL_STATE__: any;
    __INITIAL_ADS_CONFIG__: AdsConfig;
    __GRAPHQL_HOST__: string;
    __PREVIEW_GRAPHQL_HOST__: string;
    __GRAPHQL_ORIGIN__: string;
    twttr?: {
      widgets: {
        load: () => any;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => any;
      };
    };
    Ads: Ads;
    admTagMan: any;
    brandingDayPaddingTop: number;
    utag_cfg_ovrd: any;
    tp: any;
    webkitRequestFileSystem: any;
    RequestFileSystem: any;
    openDatabase: Function;
    setRaschGridVisible: (isVisible: boolean) => void;
    Tealium: {
      isLoaded: boolean;
      queue: Array<any>;
    };
    handleWysiwygLink: (event: MouseEvent) => void;
    alertsFormOverlay: () => void;
    utag_data: any;
    utag: any;
    setOneTrustConsentForAll: () => void;
    toggleConsentInfoDisplay: () => void;
    OneTrust?: any;
    OneSignalDeferred?: Array<
      (oneSignal: OneSignalV16Client) => void | Promise<void>
    >;
    webPushNotifications?: WebPushNotificationsGlobal;
    olid?: string;
    getBrandingDayCss?: ({
      imageUrls,
      bgColor,
      bgFixed,
      paddingTop,
      bgCover,
      hideHpa,
      debug,
      isImageUrlPresent,
    }) => {
      brandingDayCss: string;
      largeImageCss: string;
      smallImageCss: string;
      expandTopClickWrapper: () => void;
    };
    dataLayer: any[];
    eventQueueDataLayer: any[];
    aiaibot?: {
      trigger: (id: string, delay: number, flag: boolean) => Promise<void>;
      setVariables: (variables: Record<string, string | boolean>) => void;
      onReady: (callback: () => void) => void;
      onTriggered: (callback: () => void) => void;
      onMessage: (
        callback: (payload: { type: string; id: string }) => void,
      ) => void;
      onEvent: (event: string, callback: (payload: unknown) => void) => void;
      sendUserInput: (id: string, input: string) => void;
      state: {
        ready: boolean;
        visible: boolean;
        triggered: boolean;
        open: boolean;
        fullscreen: boolean;
        loaded: boolean;
        conversation: boolean;
      };
      toggleFullscreen: () => void;
      hide: () => void;
      show: () => void;
      close: () => void;
      open: () => void;
      teardown: () => void;
      bootstrap: () => void;
      onUserInput: (
        inputCallback: (input: {
          type: string;
          value: { label: string; value: string };
        }) => void,
      ) => void;
      setIframeStyle: (param: Record<string, string>) => void;
      frame: HTMLIFrameElement;
    };
  }

  namespace jest {
    interface Matchers<R> {
      toContainValidRecommendations(): R;
      toBeWithinRange(received: number, floor: number, ceiling?: number): R;
    }
  }
}
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'vf-tray-trigger': {
        floating?: boolean;
      };
      'vf-conversations': {
        'vf-container-id'?: string;
        'reply-limit'?: number;
        'pagination-reply-limit'?: number;
        'initial-height'?: number;
      };
      'vf-conversations-count': {
        'vf-container-id'?: string;
      };
    }
  }
}
