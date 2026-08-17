/**
 *
 */

/* istanbul ignore file */

import withApolloScreenHandlerFactory from '../../../shared/decorators/withApolloScreenHandlerFactory';
import { setScreenReady } from '../actions/route';

export default withApolloScreenHandlerFactory({ setScreenReady });
