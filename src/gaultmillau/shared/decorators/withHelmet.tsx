/* istanbul ignore file */

import { compose } from 'redux';
import { STRUCTURED_META_DATA } from '../helpers/metaData';
import withHelmetFactory from '../../../shared/decorators/withHelmetFactory';
import Helmet from '../../screens/App/components/Helmet';
import { WithHelmet } from './withHelmet';
import { PUBLICATION_GM_SEO_TITLE as PUBLISHER } from '../../../shared/constants/publications';
import gmLogo from '../../screens/App/assets/graphics/logo-gaultmillau.png';
export { generateMetaLinks } from '../../../shared/helpers/withHelmet';

export type {
  WithHelmetProps,
  WithHelmet,
  WithHelmetNodeProps,
} from '../../../shared/decorators/@types/withHelmetFactory';

const withHelmet = withHelmetFactory({
  Helmet,
  getPublisher: () => PUBLISHER,
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  getPublisherLogo: () => `${global.locationOrigin}${gmLogo}`,
  getPublisherLogoDimensions: () => ({ width: 600, height: 90 }),
});

const WithHelmetComponent = (props: WithHelmet) =>
  compose<any>(
    withHelmet({
      ...props,
      structuredDefaultData: STRUCTURED_META_DATA,
    }),
  );

export default WithHelmetComponent;
