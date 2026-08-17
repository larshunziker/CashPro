// INFO: currently in use for SI, BEO and HZ. The goal is the use this for all publications

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BREAKPOINTS: cssBreakpoints } = require('@variablesDefault.legacy.css');

const BREAKPOINTS = cssBreakpoints as CssBreakpoints;

type CssBreakpoints = {
  xsBreakpoint: string;
  xsBreakpointTo: string;
  smBreakpoint: string;
  smBreakpointTo: string;
  mdBreakpoint: string;
  mdBreakpointTo: string;
  lgBreakpoint: string;
  lgBreakpointTo: string;
  xlBreakpoint: string;
  xlBreakpointTo: string;
  xxlBreakpoint: string;
};

type WindowStateActionTypes = 'window/resize';

export type WindowStateAction<T> = {
  type: WindowStateActionTypes;
  payload: T;
};

// Viewport constants
export const VIEWPORT_XS = 'viewport/xs';
export const VIEWPORT_SM = 'viewport/sm';
export const VIEWPORT_MD = 'viewport/md';
export const VIEWPORT_LG = 'viewport/lg';
export const VIEWPORT_XL = 'viewport/xl';
export const VIEWPORT_XXL = 'viewport/xxl';

export const desktopViewports = [VIEWPORT_XL, VIEWPORT_XXL];
export const mobileTabletViewports = [
  VIEWPORT_XS,
  VIEWPORT_SM,
  VIEWPORT_MD,
  VIEWPORT_LG,
];

export const BADGE_BREAKPOINTS: Array<string> = [
  VIEWPORT_XS,
  VIEWPORT_SM,
  VIEWPORT_MD,
  VIEWPORT_LG,
  VIEWPORT_XL,
  VIEWPORT_XXL,
];

// Image breakpoint constants
export const IMAGE_BREAKPOINT_0 = 0;
export const IMAGE_BREAKPOINT_480 = 480;
export const IMAGE_BREAKPOINT_540 = 540;
export const IMAGE_BREAKPOINT_760 = 760;
export const IMAGE_BREAKPOINT_960 = 960;
export const IMAGE_BREAKPOINT_1680 = 1680;

const viewports: Array<Viewport> = [
  {
    label: VIEWPORT_XS,
    from: 0,
    to: parseInt(BREAKPOINTS.xsBreakpointTo, 10),
  },
  {
    label: VIEWPORT_SM,
    from: parseInt(BREAKPOINTS.smBreakpoint, 10),
    to: parseInt(BREAKPOINTS.smBreakpointTo, 10),
  },
  {
    label: VIEWPORT_MD,
    from: parseInt(BREAKPOINTS.mdBreakpoint, 10),
    to: parseInt(BREAKPOINTS.mdBreakpointTo, 10),
  },
  {
    label: VIEWPORT_LG,
    from: parseInt(BREAKPOINTS.lgBreakpoint, 10),
    to: parseInt(BREAKPOINTS.lgBreakpointTo, 10),
  },
  {
    label: VIEWPORT_XL,
    from: parseInt(BREAKPOINTS.xlBreakpoint, 10),
    to: parseInt(BREAKPOINTS.xlBreakpointTo, 10),
  },
  {
    label: VIEWPORT_XXL,
    from: parseInt(BREAKPOINTS.xxlBreakpoint, 10),
    to: 99999,
  },
];

const imageBreakpoints: Array<ImageBreakpoint> = [
  {
    label: '0',
    from: IMAGE_BREAKPOINT_0,
    to: IMAGE_BREAKPOINT_480 - 1,
  },
  {
    label: '480',
    from: IMAGE_BREAKPOINT_480,
    to: IMAGE_BREAKPOINT_540 - 1,
  },
  {
    label: '540',
    from: IMAGE_BREAKPOINT_540,
    to: IMAGE_BREAKPOINT_760 - 1,
  },
  {
    label: '760',
    from: IMAGE_BREAKPOINT_760,
    to: IMAGE_BREAKPOINT_960 - 1,
  },
  {
    label: '960',
    from: IMAGE_BREAKPOINT_960,
    to: IMAGE_BREAKPOINT_1680 - 1,
  },
  {
    label: '1680',
    from: IMAGE_BREAKPOINT_1680,
    to: 99999,
  },
];

export const getCurrentViewport = (windowWidth: number): Viewport => {
  let viewport: Viewport = viewports[0];

  for (let i = 0; i < viewports.length; i += 1) {
    if (viewports[i].from <= windowWidth && viewports[i].to >= windowWidth) {
      viewport = viewports[i];
      break;
    }
  }

  return viewport;
};

export const getCurrentImageBreakpoint = (
  windowWidth: number,
): ImageBreakpoint => {
  let imageBreakpoint: ImageBreakpoint = imageBreakpoints[0];

  for (let i = 0; i < imageBreakpoints.length; i += 1) {
    if (
      imageBreakpoints[i].from <= windowWidth &&
      imageBreakpoints[i].to >= windowWidth
    ) {
      imageBreakpoint = imageBreakpoints[i];
      break;
    }
  }

  return imageBreakpoint;
};

// Resize action creator.
export const windowResize = (
  window: Window,
): WindowStateAction<WindowState> => ({
  type: 'window/resize',
  payload: {
    width: window.innerWidth,
    viewport: getCurrentViewport(window.innerWidth),
    height: window.innerHeight,
    imageBreakpoint: getCurrentImageBreakpoint(window.innerWidth),
  },
});
