import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import debounce from 'lodash.debounce';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import handleWysiwygLink from '../../../shared/helpers/handleWysiwygLink';
import withNavigate, {
  WithNavigateProps,
} from '../../../shared/decorators/withNavigate';
import {
  VIEWPORT_XS,
  getCurrentViewport,
} from '../../../shared/actions/window';
import { PIANO_CONTAINER_ANIMATED_WRAPPER } from '../../../shared/constants/piano';
import { AppSetupFactoryOptions } from './typings';

type AppSetupPropsInner = AppSetupFactoryOptions &
  WithNavigateProps & {
    dispatchWindowResizeEvent: (props: AppSetupPropsInner) => void;
    dispatchWindowScrollEvent: (props: AppSetupPropsInner) => void;
  };
const sendResizeMessage = () => {
  const pianoAnimatedWrapper = document.getElementById(
    PIANO_CONTAINER_ANIMATED_WRAPPER,
  );

  if (pianoAnimatedWrapper) {
    const viewportSize = getCurrentViewport(window.innerWidth)?.label;
    const iframe = pianoAnimatedWrapper.getElementsByTagName('iframe')[0];

    if (!iframe) {
      return;
    }

    iframe?.contentWindow?.postMessage(
      {
        type: 'resize',
        viewport: viewportSize === VIEWPORT_XS ? 'mobile' : 'desktop',
      },
      __PIANO_ENDPOINT__?.replace('/api/v3', ''),
    );
  }
};

const sendViewportMessage = () => {
  const nodes = document.querySelectorAll(`div[class*="piano-template-"]`);
  Array.from(nodes).forEach((node: Record<string, any>): void => {
    const iframe = node.getElementsByTagName('iframe')[0];
    sendViewportToIframe(iframe);
  });
};

const handleMessageEvent = (event: MessageEvent) => {
  if (
    event.origin === __PIANO_ENDPOINT__?.replace('/api/v3', '') &&
    (event.data === 'piano-template-loaded' ||
      event.data.type === 'piano-template-loaded')
  ) {
    if (
      event.data.id === 'piano-animated' ||
      event.data.id === 'piano-animated-resized'
    ) {
      recalculateAnimatedWrapperPosition(event.data);
    } else {
      sendViewportMessage();
    }
  }
};

const sendViewportToIframe = (iframe: HTMLIFrameElement) => {
  const viewportSize = getCurrentViewport(window.innerWidth)?.label;
  if (!iframe) {
    return;
  }

  iframe?.contentWindow?.postMessage(
    viewportSize === VIEWPORT_XS ? 'mobile' : 'desktop',
    __PIANO_ENDPOINT__?.replace('/api/v3', ''),
  );
};

const recalculateAnimatedWrapperPosition = (data: any) => {
  const pianoAnimatedWrapper = document.getElementById(
    PIANO_CONTAINER_ANIMATED_WRAPPER,
  );
  if (pianoAnimatedWrapper) {
    const iframe = pianoAnimatedWrapper.getElementsByTagName('iframe')[0];
    sendViewportToIframe(iframe);

    const gridWrapper = document.getElementById('footer') || null;

    const contentWrapper =
      gridWrapper?.firstElementChild?.getBoundingClientRect() || null;
    const isContentBiggerThanWrapper =
      (contentWrapper && contentWrapper?.width <= data.width) || false;

    if (isContentBiggerThanWrapper || !contentWrapper) {
      pianoAnimatedWrapper.style.left = '0';
      pianoAnimatedWrapper.style.width = `100%`;
      iframe.style.width = `100%`;
    } else {
      const calculatedPosition =
        (contentWrapper && Math.ceil(contentWrapper.right) - data.width) || 0;
      pianoAnimatedWrapper.style.left = `${calculatedPosition}px`;
      pianoAnimatedWrapper.style.width = `${data.width}px`;
    }
  }
};

export default ({
  setScrollTop,
  windowResize,
  windowResizeDebounceValue,
  isWindowStateDefinedOnClient = false,
}: AppSetupFactoryOptions) => {
  const getDebouncedWindowResizeFn: (props: AppSetupPropsInner) => any = (
    props: AppSetupPropsInner,
  ) => debounce(props.dispatchWindowResizeEvent, windowResizeDebounceValue);

  const performInitialDispatches = (props: AppSetupPropsInner) => {
    if (__CLIENT__) {
      // just dispatch this on client, because server side detects window size based on varnish headers
      props.windowResize(window);
    }
  };

  let supportsPassive: boolean;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
      },
    });
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    window.addEventListener('test', null, opts);
  } catch (e) {
    supportsPassive = false;
  }

  const getScrollThrottleFn = (props: AppSetupPropsInner) =>
    throttle(props.dispatchWindowScrollEvent, 16);

  const bindListeners = (props: AppSetupPropsInner) => {
    window.addEventListener('resize', getDebouncedWindowResizeFn(props));
    window.addEventListener(
      'scroll',
      getScrollThrottleFn(props),
      supportsPassive ? { passive: true } : false,
    );

    window.onbeforeprint = () => {
      const images: NodeListOf<HTMLImageElement> = document.querySelectorAll(
        'img[loading="lazy"]',
      );

      images.forEach((image: any) => {
        image.loading = 'eager';
      });
    };

    window.addEventListener('message', (event) => {
      handleMessageEvent(event);
    });
  };

  const unbindListeners = (props: AppSetupPropsInner) => {
    window.removeEventListener('resize', getDebouncedWindowResizeFn(props));
    window.removeEventListener('scroll', getScrollThrottleFn(props));
    window.removeEventListener('message', (event) => {
      handleMessageEvent(event);
    });
  };

  const mapDispatchToProps = {
    setScrollTop,
    windowResize,
  };

  const withStoreConnection = connect(undefined, mapDispatchToProps);

  const withExtendedHandlers = withHandlers({
    dispatchWindowResizeEvent: (props: AppSetupPropsInner) => () => {
      if (__CLIENT__) {
        sendViewportMessage();
        sendResizeMessage();
        return props.windowResize(window);
      }

      return;
    },
    dispatchWindowScrollEvent: (props: AppSetupPropsInner) => () =>
      props.setScrollTop(),
  });

  const withLifecycle = lifecycle<any, any>({
    componentDidMount() {
      window.handleWysiwygLink = (event) =>
        handleWysiwygLink(event, this.props.navigate);
      window.dispatchEvent(new Event('handleWysiwygLink-initialized'));
      bindListeners(this.props);

      // just dispatch the resize event on client, if we hydrate
      // the window state from ssr (is not the case after x-device removal)
      if (!isWindowStateDefinedOnClient) {
        performInitialDispatches(this.props);
      }
    },
    componentWillUnmount() {
      unbindListeners(this.props);
    },
  });

  const AppSetup = () => null;

  return compose<any, any>(
    withNavigate,
    withStoreConnection,
    withExtendedHandlers,
    withLifecycle,
  )(AppSetup);
};
