import { VIEWPORT_XS } from '../../../shared/actions/window';

const isMobileViewport = (viewport: Viewport) => {
  return [VIEWPORT_XS].includes(viewport.label);
};

export default isMobileViewport;
