import { VIEWPORT_XS } from '../actions/window';

const isMobileViewport = (viewport: Viewport): boolean =>
  viewport.label === VIEWPORT_XS;

export default isMobileViewport;
