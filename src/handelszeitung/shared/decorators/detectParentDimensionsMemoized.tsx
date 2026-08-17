/* istanbul ignore file */

import windowStateSelector from '../../../shared/selectors/windowStateSelector';
import detectParentDimensionsMemoizedFactory from '../../../shared/decorators/detectParentDimensionsMemoizedFactory';

export {
  INLINE_GALLERY_WIDTH,
  CONTAINER_WIDTH,
  NA_CAROUSEL_PARAGRAPH_WIDTH,
} from '../../../shared/decorators/detectParentDimensionsMemoizedFactory';

export default detectParentDimensionsMemoizedFactory({ windowStateSelector });
