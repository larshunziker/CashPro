/* istanbul ignore file */

import withScrollToAnchorFactory from '../../../shared/decorators/withScrollToAnchorFactory';
import selectLocationState from '../selectors/locationStateSelector';

export default withScrollToAnchorFactory({ selectLocationState });
