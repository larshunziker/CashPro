/* istanbul ignore file */
// sonar-disable

import googleNewsShowcaseProviderFactory from '../../../../../common/components/GoogleNewsShowcaseProvider/factory';
import Helmet from '../Helmet';

const GoogleNewsShowcaseProvider = googleNewsShowcaseProviderFactory({
  Helmet,
});

export default GoogleNewsShowcaseProvider;
