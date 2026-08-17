import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useFeature } from '@growthbook/growthbook-react';
import { setAiaibotInitialized } from '../../../../../shared/actions/chatbot';
import { configureStore } from '../../../../../shared/configureStore';
import { initialStates } from '../../../../../shared/reducers';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import BottomBar, { BOTTOM_BAR_ID } from '../index';
import { getBottomBarIframeStyles } from '../aiaibotActions';
import { BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID } from '../useBottomBarActiveIndicator';

const RESET_IFRAME_STYLES = {
  bottom: '0',
  height: '100dvh',
};

const renderBottomBarTree = (
  routeOverrides: Record<string, unknown> = {},
  pathname = '/',
  isAiaibotInitialized = true,
) => {
  const initialState = {
    route: { ...routeInitialState, ...routeOverrides },
    auth: { isAuthenticated: false, isChatbotAllowed: false },
    chatbot: { isAiaibotInitialized },
  };

  return (
    <MemoryRouter initialEntries={[pathname]}>
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <BottomBar />
        </SSRContextProvider>
      </ReduxProvider>
    </MemoryRouter>
  );
};

const renderBottomBar = (
  routeOverrides: Record<string, unknown> = {},
  pathname = '/',
  isAiaibotInitialized = true,
) => {
  return render(
    renderBottomBarTree(routeOverrides, pathname, isAiaibotInitialized),
  );
};
jest.mock('../../../../../../common/components/ClientSideOnly', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../../../../../shared/helpers/utils.tsx', () => ({
  ...jest.requireActual('../../../../../../shared/helpers/utils.tsx'),
  getMobileOperatingSystem: jest.fn(() => 'iOS'),
}));

jest.mock('@growthbook/growthbook-react', () => ({
  useFeature: jest.fn(),
}));

jest.mock('../useScrollDirection', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../useVirtualKeyboardVisible', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock('../useBottomBarConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useScrollDirection from '../useScrollDirection';
import useVirtualKeyboardVisible from '../useVirtualKeyboardVisible';
import useBottomBarConfig from '../useBottomBarConfig';
import * as utils from '../../../../../../shared/helpers/utils.tsx';
import { BOTTOM_BAR_HEIGHT_PX, BOTTOM_BAR_NAV_ITEMS } from '../constants';
import styles from '../styles.legacy.css';

const BOTTOM_BAR_ACTIVE_CLASS = 'bottom-bar-active';
const CHATBOT_LOADING_TEST_ID = 'bottom-bar-chatbot-loading-spinner';
const mockAiaibotState = {
  ready: true,
  visible: true,
  triggered: false,
  open: false,
  fullscreen: false,
  loaded: true,
  conversation: false,
};
const mockAiaibot = {
  open: jest.fn().mockImplementation(() => {
    mockAiaibotState.open = true;
  }),
  close: jest.fn().mockImplementation(() => {
    mockAiaibotState.open = false;
    mockAiaibotState.fullscreen = false;
  }),
  hide: jest.fn(),
  show: jest.fn(),
  setIframeStyle: jest.fn(),
  state: mockAiaibotState,
};
const mockIntersectionObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
  takeRecords: jest.fn(() => []),
  root: null,
  rootMargin: '0px',
  thresholds: [0],
};

const renderBottomBarWithStore = (
  storeOverrides: Record<string, unknown> = {},
  pathname = '/',
) => {
  const store = configureStore({
    ...initialStates,
    route: { ...routeInitialState },
    auth: {
      ...initialStates.auth,
      isAuthenticated: false,
      isChatbotAllowed: false,
    },
    chatbot: { isAiaibotInitialized: false },
    ...storeOverrides,
  });

  const view = render(
    <MemoryRouter initialEntries={[pathname]}>
      <Provider store={store}>
        <SSRContextProvider>
          <BottomBar />
        </SSRContextProvider>
      </Provider>
    </MemoryRouter>,
  );

  return { ...view, store };
};

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
};

const NAV_ITEM_LAYOUT_OFFSETS: Record<string, number> = {
  home: 0,
  beratung: 80,
  tools: 240,
  profil: 320,
};

const mockBottomBarLayoutRects = () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  Element.prototype.getBoundingClientRect = function mockGetBoundingClientRect(
    this: Element,
  ) {
    if (this.getAttribute('data-testid') === BOTTOM_BAR_ID) {
      return {
        left: 0,
        top: 0,
        width: 400,
        height: 76,
        right: 400,
        bottom: 76,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    }

    if (this.tagName === 'LI') {
      const link = this.querySelector('a');
      const label = link?.getAttribute('aria-label')?.toLowerCase() ?? '';
      const left = NAV_ITEM_LAYOUT_OFFSETS[label] ?? 0;

      return {
        left,
        top: 0,
        width: 80,
        height: 76,
        right: left + 80,
        bottom: 76,
        x: left,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect;
    }

    return originalGetBoundingClientRect.call(this);
  };

  return () => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  };
};

describe('[Component] BottomBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset state mock to defaults before each test
    mockAiaibotState.visible = true;
    mockAiaibotState.fullscreen = false;
    mockAiaibotState.open = false;
    // Re-apply implementations after clearAllMocks resets them
    mockAiaibot.open.mockImplementation(() => {
      mockAiaibotState.open = true;
    });
    mockAiaibot.close.mockImplementation(() => {
      mockAiaibotState.open = false;
      mockAiaibotState.fullscreen = false;
    });
    (useFeature as jest.Mock).mockReturnValue({ on: true });
    (useScrollDirection as jest.Mock).mockReturnValue(null);
    (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(false);
    (utils.getMobileOperatingSystem as jest.Mock).mockReturnValue('iOS');
    (useBottomBarConfig as jest.Mock).mockReturnValue({
      isBottomBarActive: true,
      isLandscapeOrientation: false,
      navItems: BOTTOM_BAR_NAV_ITEMS,
    });
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: jest.fn(() => mockIntersectionObserver),
    });
    Object.defineProperty(window, 'aiaibot', {
      configurable: true,
      writable: true,
      value: mockAiaibot,
    });
    setViewportWidth(375);
    document.body.classList.remove(BOTTOM_BAR_ACTIVE_CLASS);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.classList.remove(BOTTOM_BAR_ACTIVE_CLASS);
    jest.useRealTimers();
  });

  describe('rendering', () => {
    it('renders the bottom bar when the flag is on', () => {
      renderBottomBar();
      expect(screen.getByTestId(BOTTOM_BAR_ID)).toBeInTheDocument();
    });

    it('does not render in hybrid app', () => {
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });
      renderBottomBar({ isHybridApp: true });
      expect(screen.queryByTestId(BOTTOM_BAR_ID)).toBeNull();
    });

    it('does not render when GrowthBook flag is off', () => {
      const g = globalThis as typeof globalThis & {
        __TESTING__?: boolean;
        __ENABLE_GROWTHBOOK__?: boolean;
        __DEVELOPMENT__?: boolean;
      };
      const prevTesting = g.__TESTING__;
      const prevGb = g.__ENABLE_GROWTHBOOK__;
      const prevDevelopment = g.__DEVELOPMENT__;
      g.__TESTING__ = false;
      g.__ENABLE_GROWTHBOOK__ = true;
      g.__DEVELOPMENT__ = false;
      (useFeature as jest.Mock).mockReturnValue({ on: false });
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });

      renderBottomBar();

      expect(screen.queryByTestId(BOTTOM_BAR_ID)).toBeNull();

      g.__TESTING__ = prevTesting;
      g.__ENABLE_GROWTHBOOK__ = prevGb;
      g.__DEVELOPMENT__ = prevDevelopment;
    });

    it('renders all 5 navigation items', () => {
      renderBottomBar();
      const nav = screen.getByTestId(BOTTOM_BAR_ID);
      // 4 nav links + 1 chatbot button
      expect(nav.querySelectorAll('a')).toHaveLength(4);
      expect(nav.querySelectorAll('button')).toHaveLength(1);
    });

    it('renders the Chatbot FAB button', () => {
      renderBottomBar();
      expect(
        screen.getByRole('button', { name: /chatbot/i }),
      ).toBeInTheDocument();
    });

    it('renders label from GrowthBook for matching id when feature is active', () => {
      const g = globalThis as typeof globalThis & {
        __TESTING__?: boolean;
        __ENABLE_GROWTHBOOK__?: boolean;
        __DEVELOPMENT__?: boolean;
      };
      const prevTesting = g.__TESTING__;
      const prevGb = g.__ENABLE_GROWTHBOOK__;
      const prevDevelopment = g.__DEVELOPMENT__;
      g.__TESTING__ = false;
      g.__ENABLE_GROWTHBOOK__ = true;
      g.__DEVELOPMENT__ = false;

      const customNavItems = [
        {
          id: 'home',
          label: 'Start',
          url: '/start',
          activePath: '/start',
          iconType: 'svg-icons/type/bottom-bar-home',
        },
        ...BOTTOM_BAR_NAV_ITEMS.slice(1),
      ];
      (useFeature as jest.Mock).mockReturnValue({
        on: true,
        value: [
          {
            id: 'home',
            label: 'Start',
            url: '/start',
            icon: 'home',
          },
        ],
      });
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: true,
        navItems: customNavItems,
      });

      renderBottomBar();

      expect(screen.getByRole('link', { name: /start/i })).toBeInTheDocument();

      g.__TESTING__ = prevTesting;
      g.__ENABLE_GROWTHBOOK__ = prevGb;
      g.__DEVELOPMENT__ = prevDevelopment;
    });
  });

  describe('active state', () => {
    it('marks Home as active on the root path', () => {
      renderBottomBar({}, '/');
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass(styles.NavLinkActive);
    });

    it('marks Beratung as active on /beratung path', () => {
      renderBottomBar({}, '/beratung');
      const beratungLink = screen.getByRole('link', { name: /beratung/i });
      expect(beratungLink).toHaveClass(styles.NavLinkActive);
    });

    it('marks Profil as active on /profile path', () => {
      renderBottomBar({}, '/profile');
      const profilLink = screen.getByRole('link', { name: /profil/i });
      expect(profilLink).toHaveClass(styles.NavLinkActive);
    });

    it('marks Home as active on an unrelated path', () => {
      renderBottomBar({}, '/some-article');
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass(styles.NavLinkActive);
    });

    it('marks no link as active on engagement paths', () => {
      renderBottomBar({}, '/engagement/newsletter');
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).not.toHaveClass(styles.NavLinkActive);
      });
    });

    it('does not mark Home as active on /beratung path', () => {
      renderBottomBar({}, '/beratung');
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).not.toHaveClass(styles.NavLinkActive);
    });
  });

  describe('active indicator', () => {
    it('shows the sliding indicator when Home is active', () => {
      renderBottomBar({}, '/');
      const indicator = screen.getByTestId(BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID);

      expect(indicator).toHaveClass(styles.ActiveIndicatorVisible);
    });

    it('hides the sliding indicator on engagement paths', () => {
      renderBottomBar({}, '/engagement/newsletter');
      const indicator = screen.getByTestId(BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID);

      expect(indicator).not.toHaveClass(styles.ActiveIndicatorVisible);
    });

    it('hides the sliding indicator when chatbot is open', () => {
      renderBottomBar();
      fireEvent.click(screen.getByRole('button', { name: /chatbot/i }));

      const indicator = screen.getByTestId(BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID);
      expect(indicator).not.toHaveClass(styles.ActiveIndicatorVisible);
    });

    it('updates indicator transform when the active route changes', () => {
      const restoreLayoutRects = mockBottomBarLayoutRects();

      const RouteHarness = ({ pathname }: { pathname: string }) => (
        <MemoryRouter key={pathname} initialEntries={[pathname]}>
          <ReduxProvider
            initialState={{
              route: { ...routeInitialState },
              auth: { isAuthenticated: false, isChatbotAllowed: false },
              chatbot: { isAiaibotInitialized: true },
            }}
          >
            <SSRContextProvider>
              <BottomBar />
            </SSRContextProvider>
          </ReduxProvider>
        </MemoryRouter>
      );

      try {
        const { rerender } = render(<RouteHarness pathname="/" />);
        const indicator = screen.getByTestId(
          BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID,
        );
        expect(indicator.style.transform).toBe('translateX(12px)');

        rerender(<RouteHarness pathname="/beratung" />);
        expect(
          screen.getByTestId(BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID).style
            .transform,
        ).toBe('translateX(92px)');
      } finally {
        restoreLayoutRects();
      }
    });
  });

  describe('body class side effect', () => {
    it('adds the active class to body when feature is on and viewport is mobile', () => {
      renderBottomBar();
      expect(document.body.classList.contains(BOTTOM_BAR_ACTIVE_CLASS)).toBe(
        true,
      );
    });

    it('does not add the active class to body on desktop viewport', () => {
      (utils.getMobileOperatingSystem as jest.Mock).mockReturnValue('');
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });
      setViewportWidth(1200);

      renderBottomBar();

      expect(document.body.classList.contains(BOTTOM_BAR_ACTIVE_CLASS)).toBe(
        false,
      );
    });

    it('does not add the active class to body in hybrid app', () => {
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });
      renderBottomBar({ isHybridApp: true });
      expect(document.body.classList.contains(BOTTOM_BAR_ACTIVE_CLASS)).toBe(
        false,
      );
    });

    it('does not sync aiaibot visibility on desktop viewport (BottomBar inactive)', () => {
      (utils.getMobileOperatingSystem as jest.Mock).mockReturnValue('');
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });
      setViewportWidth(1200);

      renderBottomBar();

      expect(mockAiaibot.hide).not.toHaveBeenCalled();
    });
  });

  describe('scroll hide behavior', () => {
    it('adds Hidden class when scrolling down', () => {
      (useScrollDirection as jest.Mock).mockReturnValue('down');

      renderBottomBar();
      const nav = screen.getByTestId(BOTTOM_BAR_ID);
      expect(nav.className).toContain('Hidden');
    });

    it('does not add Hidden class when scrolling up', () => {
      (useScrollDirection as jest.Mock).mockReturnValue('up');

      renderBottomBar();
      const nav = screen.getByTestId(BOTTOM_BAR_ID);
      expect(nav.className).not.toContain('Hidden');
    });
  });

  describe('landscape hide behavior', () => {
    it('keeps BottomBar rendered but hidden in landscape orientation', () => {
      (useBottomBarConfig as jest.Mock).mockReturnValue({
        isBottomBarActive: true,
        isLandscapeOrientation: true,
        navItems: BOTTOM_BAR_NAV_ITEMS,
      });

      renderBottomBar();
      const nav = screen.getByTestId(BOTTOM_BAR_ID);
      expect(nav.className).toContain('Hidden');
    });
  });

  describe('virtual keyboard hide behavior', () => {
    it('adds Hidden class when the virtual keyboard is visible', () => {
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);

      renderBottomBar();
      const nav = screen.getByTestId(BOTTOM_BAR_ID);
      expect(nav.className).toContain('Hidden');
    });
  });

  describe('virtual keyboard iframe offset behavior', () => {
    it('resets iframe offset when keyboard opens while chatbot is open', () => {
      jest.useFakeTimers();
      const view = renderBottomBar();
      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });

      fireEvent.click(chatbotButton);
      act(() => {
        jest.advanceTimersByTime(100);
      });

      mockAiaibot.setIframeStyle.mockClear();
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);
      view.rerender(renderBottomBarTree());

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
        RESET_IFRAME_STYLES,
      );
    });

    it('restores iframe offset when keyboard closes while chatbot is open', () => {
      jest.useFakeTimers();
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);
      const view = renderBottomBar();
      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });

      fireEvent.click(chatbotButton);

      mockAiaibot.setIframeStyle.mockClear();
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(false);
      view.rerender(renderBottomBarTree());

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
        getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
      );
    });

    it('does not change iframe offset when keyboard toggles and chatbot is closed', () => {
      const view = renderBottomBar();

      mockAiaibot.setIframeStyle.mockClear();
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);
      view.rerender(renderBottomBarTree());

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();
    });

    it('opens chatbot with reset iframe offset when keyboard is already visible', () => {
      jest.useFakeTimers();
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);

      renderBottomBar();
      fireEvent.click(screen.getByRole('button', { name: /chatbot/i }));

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
        RESET_IFRAME_STYLES,
      );
      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalledWith(
        getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
      );
    });

    it('does not apply delayed offset when keyboard opens before timeout elapses', () => {
      jest.useFakeTimers();
      const view = renderBottomBar();

      fireEvent.click(screen.getByRole('button', { name: /chatbot/i }));
      (useVirtualKeyboardVisible as jest.Mock).mockReturnValue(true);
      view.rerender(renderBottomBarTree());

      mockAiaibot.setIframeStyle.mockClear();
      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalledWith(
        getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
      );
    });
  });

  describe('chatbot FAB', () => {
    it('closes chatbot on second click without opening again', () => {
      renderBottomBar();
      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });

      fireEvent.click(chatbotButton);
      fireEvent.click(chatbotButton);

      expect(mockAiaibot.open).toHaveBeenCalledTimes(1);
      expect(mockAiaibot.hide).toHaveBeenCalled();
      expect(mockAiaibot.close).toHaveBeenCalledTimes(1);
    });

    it('issues show command on first click and hide command on second click', () => {
      renderBottomBar();
      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });

      fireEvent.click(chatbotButton);
      expect(mockAiaibot.show).toHaveBeenCalled();

      fireEvent.click(chatbotButton);
      expect(mockAiaibot.hide).toHaveBeenCalled();
    });

    it('closes chatbot when it was opened externally (aiaibot.state.open is true)', () => {
      // Simulate externally-triggered open — state.open is true before BottomBar click
      mockAiaibotState.open = true;

      renderBottomBar();

      fireEvent.click(screen.getByRole('button', { name: /chatbot/i }));

      // Should close, not open again
      expect(mockAiaibot.open).not.toHaveBeenCalled();
      expect(mockAiaibot.hide).toHaveBeenCalled();
      expect(mockAiaibot.close).toHaveBeenCalled();
    });

    it('offsets ai-bot iframe above BottomBar on open (Q16 / Part 7 — ai-bot input spacing)', () => {
      jest.useFakeTimers();
      // Verify that setIframeStyle is called after the delayed offset update.
      renderBottomBar();
      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });

      fireEvent.click(chatbotButton);

      expect(mockAiaibot.setIframeStyle).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(mockAiaibot.setIframeStyle).toHaveBeenCalledWith(
        getBottomBarIframeStyles(BOTTOM_BAR_HEIGHT_PX),
      );
    });

    it('shows a loading spinner and opens chatbot after Redux chatbot initialization', () => {
      Object.defineProperty(window, 'aiaibot', {
        configurable: true,
        writable: true,
        value: undefined,
      });
      const { store } = renderBottomBarWithStore();

      const chatbotButton = screen.getByRole('button', { name: /chatbot/i });
      fireEvent.click(chatbotButton);

      expect(screen.getByTestId(CHATBOT_LOADING_TEST_ID)).toBeInTheDocument();

      Object.defineProperty(window, 'aiaibot', {
        configurable: true,
        writable: true,
        value: mockAiaibot,
      });
      act(() => {
        store.dispatch(setAiaibotInitialized());
      });

      expect(mockAiaibot.open).toHaveBeenCalled();
      expect(screen.queryByTestId(CHATBOT_LOADING_TEST_ID)).toBeNull();
    });
  });
});
