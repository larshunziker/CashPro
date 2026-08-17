// INFO: currently in use for SI. The goal is the use this for all publications

import {
  getCurrentImageBreakpoint,
  getCurrentViewport,
  WindowStateAction,
} from '../actions/window';

// Initial window state
export const windowInitialState: WindowState = {
  height: global.innerHeight,
  viewport: getCurrentViewport(global.innerWidth),
  width: global.innerWidth,
  imageBreakpoint: getCurrentImageBreakpoint(global.innerWidth),
};

const WindowStateReducer = (
  state: WindowState = windowInitialState,
  action: WindowStateAction<WindowState>,
): WindowState => {
  switch (action.type) {
    case 'window/resize':
      return {
        ...state,
        height: action.payload.height,
        viewport: action.payload.viewport,
        width: action.payload.width,
        imageBreakpoint: action.payload.imageBreakpoint,
      };

    default:
      return state;
  }
};

export default WindowStateReducer;
