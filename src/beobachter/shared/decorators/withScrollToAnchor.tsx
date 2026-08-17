/* istanbul ignore file */

import withScrollToAnchorFactory from '../../../shared/decorators/withScrollToAnchorFactory';
import selectLocationState from '../../../shared/selectors/locationStateSelector';

export default withScrollToAnchorFactory({ selectLocationState });
