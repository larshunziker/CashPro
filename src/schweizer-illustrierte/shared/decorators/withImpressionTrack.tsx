/* istanbul ignore file */

import withImpressionTrackFactory from '../../../shared/decorators/withImpressionTrackFactory';
import locationStateSelector from '../selectors/locationStateSelector';

export default withImpressionTrackFactory({
  locationStateSelector,
});
