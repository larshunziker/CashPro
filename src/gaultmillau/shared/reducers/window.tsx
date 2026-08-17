/**
 * @TODO
 *
 * 1. Consider using the map reducer stuff.
 * 2. Use state.set() instead of merge().
 */
import { getCurrentViewport, WindowStateActionGM } from '../actions/window';

// Initial window state
export const initialState: WindowState = {
  height: global.innerHeight,
  viewport: getCurrentViewport(global.innerWidth),
  imageBreakpoint: {
    // TODO: ugly hack solution to make imageBreakpoint selector work from factories in GM (since GM has no imageBreakpoint)
    // @ts-ignore
    label: getCurrentViewport(global.innerWidth).label,
  },
  width: global.innerWidth,
};

/**
 * Merge browser window state into the global application state.
 */
export default (
  state: WindowState = initialState,
  action: WindowStateActionGM<WindowState>,
): WindowState => {
  switch (action.type) {
    case 'window/resize':
      return {
        ...state,
        height: action.payload.height,
        viewport: action.payload.viewport,
        imageBreakpoint: {
          // TODO: ugly hack solution to make imageBreakpoint selector work from factories in GM (since GM has no imageBreakpoint)
          // @ts-ignore
          label: action.payload.viewport.label,
        },
        width: action.payload.width,
      };

    default:
      return state;
  }
};
