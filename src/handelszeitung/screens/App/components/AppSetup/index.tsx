/* istanbul ignore file */

import appSetupFactory from '../../../../../common/components/AppSetup/factory';
import { setScrollTop } from '../../../../../shared/actions/scroll';
import { windowResize } from '../../../../../shared/actions/window';

export const WINDOW_RESIZE_DEBOUNCE_VALUE = 1000;

export default appSetupFactory({
  setScrollTop,
  windowResize,
  windowResizeDebounceValue: WINDOW_RESIZE_DEBOUNCE_VALUE,
  isWindowStateDefinedOnClient: true,
});
