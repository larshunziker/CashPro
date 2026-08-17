import { VIEWPORT_MD, VIEWPORT_SM, VIEWPORT_XS } from '../actions/window';

export default (state: Record<string, any>): WindowState => state.window;

export const imageBreakpointLabelSelector = (
  state: Record<string, any>,
): ImageBreakpointLabel => {
  // TODO: remove the fallback, as soon as GM uses the windowState from shared
  return state.window?.imageBreakpoint?.label || state.window?.viewport?.label;
};

export const viewportLabelSelector = (
  state: Record<string, any>,
): ViewportLabel => state.window?.viewport?.label;

export const isTouchDeviceSelector = (state: Record<string, any>): boolean =>
  state.window.viewport.label === VIEWPORT_XS ||
  state.window.viewport.label === VIEWPORT_SM ||
  state.window.viewport.label === VIEWPORT_MD;
