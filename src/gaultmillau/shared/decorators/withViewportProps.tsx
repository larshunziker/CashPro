import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withViewportPropsFactory'. '/Users/bhs/code/wo */
import withViewportPropsFactory from '../../../shared/decorators/withViewportPropsFactory';
import {
  VIEWPORT_LG,
  VIEWPORT_MD,
  VIEWPORT_SM,
  VIEWPORT_XL,
  VIEWPORT_XS,
} from '../actions/window';

export default withViewportPropsFactory({
  VIEWPORT_XS,
  VIEWPORT_SM,
  VIEWPORT_MD,
  VIEWPORT_LG,
  VIEWPORT_XL,
  windowStateSelector,
});
