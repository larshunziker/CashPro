// @ts-ignore
import variables from 'variables.legacy.css';

// Viewport constants
export const VIEWPORT_XS = 'viewport/xs';
export const VIEWPORT_SM = 'viewport/sm';
export const VIEWPORT_MD = 'viewport/md';
export const VIEWPORT_LG = 'viewport/lg';
export const VIEWPORT_XL = 'viewport/xl';
export const VIEWPORT_XXL = 'viewport/xxl';

type WindowStateActionTypesGM = 'window/resize';

export type WindowStateActionGM<T> = {
  type: WindowStateActionTypesGM;
  payload: T;
};

const viewports: Array<Viewport> = [
  {
    label: VIEWPORT_XS,
    from: 0,
    to: parseInt(variables.xsBreakpointTo, 10),
  },
  {
    label: VIEWPORT_SM,
    from: parseInt(variables.smBreakpoint, 10),
    to: parseInt(variables.smBreakpointTo, 10),
  },
  {
    label: VIEWPORT_MD,
    from: parseInt(variables.mdBreakpoint, 10),
    to: parseInt(variables.mdBreakpointTo, 10),
  },
  {
    label: VIEWPORT_LG,
    from: parseInt(variables.lgBreakpoint, 10),
    to: parseInt(variables.lgBreakpointTo, 10),
  },
  {
    label: VIEWPORT_XL,
    from: parseInt(variables.xlBreakpoint, 10),
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

// Resize action creator.
export const windowResize = (
  window: Window,
): WindowStateActionGM<WindowState> => ({
  type: 'window/resize',
  payload: {
    width: window.innerWidth,
    viewport: getCurrentViewport(window.innerWidth),
    imageBreakpoint: {
      // TODO: ugly hack solution to make imageBreakpoint selector work from factories in GM (since GM has no imageBreakpoint)
      // @ts-ignore
      label: getCurrentViewport(window.innerWidth).label,
    },
    height: window.innerHeight,
  },
});
