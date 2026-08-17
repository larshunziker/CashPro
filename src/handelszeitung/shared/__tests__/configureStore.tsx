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
    vertical: 'vertical/politic',
    screenReady: true,
    isInitialPage: true,
    isRefetchingData: false,
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
  search: {
    visible: false,
    searchQuery: '',
  },
  comment: {
    count: 0,
  },
  piano: {
    pageMetadata: {
      channelsHierarchy: [],
      contentType: 'LandingPage',
      publication: 'handelszeitung',
      isNativeContent: false,
      pathname: '/politik',
      publicationDate: '',
      restrictionStatus: null,
      section: 'POLITIC',
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
    deviceId: '',
    isAuthenticated: false,
    hasSubscriptions: false,
    initialAuthRequest: false,
    subscriptions: null,
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
    const url = '/politik';
    // @ts-ignore
    const configureStore = configureServerStore({ url });
    expect(configureStore.getState()).toMatchSnapshot();
  });

  it('Should render configureServerStore with vertical home', () => {
    const url = '/';
    // @ts-ignore
    const configureStore = configureServerStore({ url });
    expect(configureStore.getState()).toMatchSnapshot();
  });
});
