/* istanbul ignore file */

import appNexusProviderFactory from '../../../../../common/components/AppNexusProvider/factory';
import { mapViewportToAdViewport } from '../AppNexus';

const AppNexusProvider = appNexusProviderFactory({
  mapViewportToAdViewport,
});

export default AppNexusProvider;
