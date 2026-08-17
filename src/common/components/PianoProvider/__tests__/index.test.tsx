import React from 'react';
import { render } from '@testing-library/react';
import { tealiumTrackEvent } from '../../../../shared/helpers/tealium';
import { Piano } from '../index';

jest.mock('../../../../shared/helpers/tealium', () => ({
  tealiumTrackEvent: jest.fn(),
}));

type MockPianoHandler = (payload: Record<string, any>) => void;

const createProps = () => ({
  isScriptLoaded: true,
  isScriptLoadSucceed: true,
  pageMetadata: {
    channelsHierarchy: [],
    contentType: 'article',
    publication: 'beobachter',
    isNativeContent: false,
    pathname: '/',
    publicationDate: '2026-01-01',
    restrictionStatus: 'registered',
    section: 'home',
    tags: [],
    isPrintArticle: false,
    gcid: 'gcid-1',
  },
  userMetadata: {
    idToken: '',
    externalSubscription: [],
    subscriptions: [],
    initialAuthRequest: true,
  },
  browserMetadata: {
    browserMode: 'normal',
    isPushNotificationsSupported: false,
    isPushNotificationsEnabled: false,
    notificationsPermission: 'default',
  },
  setPianoBrowserMetadata: jest.fn(),
  setPianoAccesGranted: jest.fn(),
  setPianoWebinarAccesGranted: jest.fn(),
  setChatbotHiddenState: jest.fn(),
  setPaywallDrawerVisibleState: jest.fn(),
  screenReady: true,
  isCrawler: false,
  isPrintArticle: false,
  isHybridApp: false,
  navigate: jest.fn(),
});

describe('[Component] PianoProvider', () => {
  beforeEach(() => {
    (window as any).tp = {
      push: jest.fn(),
      user: {
        isUserValid: jest.fn().mockReturnValue(false),
      },
    };

    jest
      .spyOn(Piano.prototype as any, '_getBrowserMetadata')
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const props = createProps();
    const { container } = render(<Piano {...(props as any)} />);

    expect(container.firstChild).toBeNull();
  });

  it('runs componentDidMount and configures Piano bootstrap commands', () => {
    const props = createProps();
    const component = new Piano(props as any);

    component.componentDidMount();

    expect((window as any).tp.push).toHaveBeenCalledWith([
      'setUseTinypassAccounts',
      false,
    ]);
    expect((window as any).tp.push).toHaveBeenCalledWith([
      'setAid',
      __PIANO_AID__,
    ]);
    expect((window as any).tp.push).toHaveBeenCalledWith([
      'setEndpoint',
      __PIANO_ENDPOINT__,
    ]);
  });

  it('posts Abo Overview messages only to iframes under the abo-overview container', () => {
    const props = createProps();
    const component = new Piano(props as any);
    const pianoEndpoint = 'https://sandbox.tinypass.com/api/v3';
    const pianoOrigin = 'https://sandbox.tinypass.com';
    const previousEndpoint = (global as any).__PIANO_ENDPOINT__;
    (global as any).__PIANO_ENDPOINT__ = pianoEndpoint;

    const targetPostMessage = jest.fn();
    const otherPostMessage = jest.fn();

    const container = document.createElement('div');
    container.className = 'piano-abo-overview';
    const targetIframe = document.createElement('iframe');
    targetIframe.setAttribute('src', `${pianoOrigin}/template`);
    Object.defineProperty(targetIframe, 'contentWindow', {
      value: { postMessage: targetPostMessage },
    });
    container.appendChild(targetIframe);

    const otherIframe = document.createElement('iframe');
    otherIframe.setAttribute('src', `${pianoOrigin}/other`);
    Object.defineProperty(otherIframe, 'contentWindow', {
      value: { postMessage: otherPostMessage },
    });

    document.body.appendChild(container);
    document.body.appendChild(otherIframe);

    const message = {
      type: 'piano-abo-overview-subscriptions',
      subscriptions: ['gid-1'],
    };
    (component as any)._postToPianoFrames(message);

    expect(targetPostMessage).toHaveBeenCalledWith(message, pianoOrigin);
    expect(otherPostMessage).not.toHaveBeenCalled();

    container.remove();
    otherIframe.remove();
    (global as any).__PIANO_ENDPOINT__ = previousEndpoint;
  });

  it('handles openChatbot conversion and sends Tealium event', () => {
    const props = createProps();
    const handlers: Record<string, MockPianoHandler> = {};

    (window as any).tp = {
      push: jest.fn((args: [string, any, any]) => {
        const [command, eventName, payload] = args;

        if (command === 'init') {
          eventName();
          return;
        }

        if (command === 'addHandler' && typeof payload === 'function') {
          handlers[eventName] = payload;
        }
      }),
      experience: {
        init: jest.fn(),
        execute: jest.fn(),
      },
      offer: {
        closeInline: jest.fn(),
      },
      scrollDepth: {
        clearMaxScrolledPosition: jest.fn(),
      },
      user: {
        isUserValid: jest.fn().mockReturnValue(false),
      },
    };

    const openChatbotListener = jest.fn();
    document.addEventListener(
      'RASCH-CUSTOM-openChatbot',
      openChatbotListener as EventListener,
    );

    const component = new Piano(props as any);
    component._initialize();

    handlers.checkoutCustomEvent({
      eventName: 'openChatbot',
      params: {},
    });

    expect(openChatbotListener).toHaveBeenCalledTimes(1);
    expect(tealiumTrackEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'link',
        payload: expect.objectContaining({
          event_name: 'checkoutCustomEvent',
        }),
      }),
    );
  });
});
