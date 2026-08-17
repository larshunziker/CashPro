import { configureClientStore, configureServerStore } from '../configureStore';

window.__INITIAL_STATE__ = {
  route: {
    locationBeforeTransitions: {
      pathname: '/',
      search: '',
      hash: '',
      action: 'PUSH',
      key: null,
      query: {},
    },
    vertical: 'vertical/home',
    screenReady: true,
    isInitialPage: true,
    loading: false,
    isCrawler: false,
  },
  scroll: {
    direction: '',
    scrollTop: 0,
  },
  navigation: {
    tree: null,
    visibleNavigation: null,
    activePublication: null,
  },
  header: {
    articleData: {},
    title: '',
    isSinglePage: false,
    contentType: '',
    noHeader: false,
  },
  comment: {
    count: 0,
  },
  piano: {
    pageMetadata: {
      channelsHierarchy: [],
      contentType: 'LandingPage',
      publication: 'beobachter',
      isNativeContent: false,
      pathname: '/home',
      publicationDate: '2016-11-24T08:03:38.000Z',
      restrictionStatus: null,
      section: 'HOME',
      tags: [],
      isPrintArticle: false,
      subType: '',
      gcid: '',
      mainChannel: '',
      webinarId: null,
      notInitialized: false,
      page: null,
    },
    userMetadata: {
      idToken: '',
      externalSubscription: '',
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
  },
  auth: {
    username: null,
    givenName: null,
    familyName: null,
    email: null,
    isAuthenticated: false,
    hasSubscriptions: false,
    initialAuthRequest: false,
    subscriptions: null,
    address: null,
    birthday: null,
    mobileNumber: null,
    gpNumber: null,
  },
  alertList: {},
  bookmarkList: {},
};

describe('[Function] configureStore', () => {
  it('Should render configureClientStore', () => {
    const configureStore = configureClientStore();
    expect(configureStore.getState()).toMatchSnapshot();
  });

  it('Should render configureServerStore', () => {
    const url = '/arbeit';
    const configureStore = configureServerStore({ url });
    expect(configureStore.getState()).toMatchSnapshot();
  });

  it('Should render configureServerStore with vertical home', () => {
    const url = '/';
    const configureStore = configureServerStore({ url });
    expect(configureStore.getState()).toMatchSnapshot();
  });
});
