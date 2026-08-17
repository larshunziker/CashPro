declare type ReduxState = {
  route: LocationState;
  auth: AuthState;
  chatbot: ChatbotState;
  navigation: NavigationState;
  window: WindowState;
  piano: PianoState;
  search: SearchState;
  header: HeaderState;
  charts: ChartsState;
  autoUpdate: AutoUpdateState;
};

type AutoUpdateState = {
  instrumentKeysAnonymous: {
    listingKey: string;
    isMarketOpen: boolean;
    constituents?: boolean;
  }[];
  instrumentKeysCustom: {
    listingKey: string;
    isMarketOpen: boolean;
    constituents?: boolean;
  }[];
  isAutoUpdateEnabled: boolean;
  data: Record<string, any>;
};

// TODO: add all possible types and type them accurate!!!

type NavigationState = {
  visibleNavigation?: string | null;
  activePublication?: string; // HZ only!
  tree?: MenuResolvers | null; // BEO only!
  activeVerticalMenu?: string | null; // for now CASH only - for flyout menu on desktop
};

type ChatbotState = {
  isAiaibotInitialized: boolean; // BEO only
};

type AuthState = {
  username: string | null;
  givenName: null | string;
  familyName: null | string;
  email: string | null;
  // when set to false we know that user is not authenticated when initialAuthRequest is set to true
  isAuthenticated: boolean;
  hasSubscriptions: boolean;
  registrationTimestamp: number | null;
  subscriptionTimestamp: number | null;
  // we have information about user authentication - we've checked it in auth service
  initialAuthRequest: boolean;
  subscriptions?: string[] | null;
  gpNumber?: string | null;
  address?: Auth0Address | null;
  birthday?: string | null;
  mobileNumber?: string | null;
  deviceId?: string; // hybridApp
  realtime?: boolean | null; // cash only
  hasLegalAdviceAccess?: boolean; // beo only
  legalAdviceSubscriptions?: string[] | null; // beo only
  subscriptionsEndDates?: string[] | null; // beo only
  userId?: string | null;
  isChatbotAllowed?: boolean;
  isAbotAllowed?: boolean;
};

type Auth0Address = {
  gender?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
};

declare type AlertListState = {
  [key: string]: {
    timestamp: number;
    label?: string;
    subscribed?: boolean;
    recommended?: boolean;
  };
};

declare type BookingState = {
  phoneNumber?: string;
  description?: string;
  attachment?: string;
  time?: string;
  weekdayFormat?: string;
};

declare type BookmarkListState = {
  [key: string]: Bookmark;
};

declare type ScrollState = {
  scrollTop: number;
  direction?: '' | 'up' | 'down';
  directionChangePosition?: number;
};

declare type WindowState = {
  height: number;
  viewport: Viewport;
  width: number;
  imageBreakpoint: ImageBreakpoint;
};

declare type PianoState = {
  pageMetadata: PianoPageMetadata;
  userMetadata: PianoUserMetadata;
  browserMetadata: PianoBrowserMetadata;
  isAccessGranted?: boolean;
  webinarAccessGranted?: boolean;
  isChatbotHidden?: boolean;
  isPaywallDrawerVisible?: boolean;
};

declare type PianoPageMetadata = {
  channelsHierarchy?: string[];
  contentType: string | null;
  publication: string | null;
  isNativeContent: boolean;
  pathname: string;
  publicationDate: string;
  restrictionStatus: string | null;
  section: string;
  tags: Array<string> | null;
  isPrintArticle: boolean;
  gcid: string;
  subType?: string;
  mainChannel?: string;
  notInitialized?: boolean;
  webinarId?: string;
  page?: string;
  cliffhangerTitle?: string;
  cliffhangerBulletpoints?: string[];
};

declare type PianoUserMetadata = {
  idToken: string;
  externalSubscription: Record<string, any>[];
  /** Auth0 / OneLog subscription gids — used by Abo Overview and similar templates */
  subscriptions?: string[];
  initialAuthRequest: boolean;
};

declare type PianoBrowserMetadata = {
  browserMode: string;
  isPushNotificationsSupported: boolean;
  isPushNotificationsEnabled: boolean;
  notificationsPermission: string;
};

declare type ArticleData = {
  gcid: string;
  title: string;
  shortTitle: string;
  lead: string;
  subtypeValue?: string;
  channel: Channel;
  commentStatus: string;
  preferredUri: string;
  socialMediaTitle: string;
  restrictionStatus: 'paid|registered|null';
  activeMenuTrail: any;
  id: string;
  createDate: string;
};

declare type SsrState = {
  statusCode: number;
  redirectUri: string;
};

declare type HeaderState = {
  articleData?: ArticleData | Record<string, any>;
  breadcrumbsData?: any;
  title?: string;
  isSinglePage?: boolean;
  contentType?: string;
  noHeader?: boolean;
  link?: string;
  label?: string;
  id?: string | null;
};

declare type ViewportLabel =
  | 'viewport/xs'
  | 'viewport/sm'
  | 'viewport/md'
  | 'viewport/lg'
  | 'viewport/xl'
  | 'viewport/xxl';

declare type Viewport = {
  label: ViewportLabel;
  from: number;
  to: number;
};

declare type ImageBreakpointLabel =
  | '0'
  | '480'
  | '540'
  | '760'
  | '960'
  | '1680';

declare type ImageBreakpoint = {
  label: ImageBreakpointLabel;
  from: number;
  to: number;
};

declare type WindowStateSelector = (state: any) => WindowState;

declare type CommentState = {
  count: number;
};

declare type SearchState = {
  visible: boolean;
  searchQuery: string;
};

declare type SettingsState = {
  activeMainChannel?: string; // SI only
  activeContentType?: string; // SI only
  language?: string; // GM only
};

declare type LocationState = {
  locationBeforeTransitions: LocationBeforeTransitions;
  screenReady: boolean;
  vertical: string;
  isRefetchingData?: boolean;
  isInitialPage?: boolean;
  loading?: boolean; // TODO: remove optionaly mark after all apps are moved to the same logic
  isCrawler?: boolean;
  isHybridApp?: boolean;
  clientUrl?: string;
  hasCustomTracking?: boolean;
};

declare type PriceWithAutoupdateState = {
  price: ExtendedPrice;
  isNew: boolean;
};

declare type ChartsState = {
  data: PriceWithAutoupdateState[];
  initialized: boolean;
};

declare type LocationBeforeTransitions = {
  action: string;
  hash: string;
  key: string | null;
  pathname: string;
  query: { [key: string]: any };
  search: string;
  state?: any;
};

declare type CommentStateSelector = (state: any) => CommentState;
declare type SettingsStateSelector = (state: any) => SettingsState;
declare type LocationStateSelector = (state: any) => LocationState;
declare type ScrollStateSelector = (state: any) => ScrollState;
declare type HeaderStateSelector = (state: any) => HeaderState;
declare type AuthStateSelector = (state: any) => AuthState;

declare type NavigationStateSelector = (state: any) => NavigationState;
