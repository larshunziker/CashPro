/* istanbul ignore file */

import { compose } from 'redux';
import { STRUCTURED_META_DATA } from '../helpers/metaData';
import { WithHelmet } from '../../../shared/decorators/@types/withHelmetFactory';
import withHelmetFactory from '../../../shared/decorators/withHelmetFactory';
import Helmet from '../../screens/App/components/Helmet';
import { PUBLICATION_SI_SEO_TITLE as PUBLISHER } from '../../../shared/constants/publications';
import siLogo from '../../screens/App/assets/graphics/logo-si.png';
import syLogo from '../../screens/App/assets/graphics/style_logo.png';

export type {
  WithHelmetProps,
  WithHelmet,
} from '../../../shared/decorators/@types/withHelmetFactory';

const getPublisherLogo = (): string => {
  const pathName = global?.location?.pathname || '';
  const publisherLogoPath =
    pathName.startsWith('/body-health') || pathName.startsWith('/style')
      ? syLogo
      : siLogo;
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  return `${global.locationOrigin}${publisherLogoPath}`;
};

const withHelmet = withHelmetFactory({
  Helmet,
  getPublisher: () => PUBLISHER,
  getPublisherLogo,
});

const WithHelmetComponent = (props: WithHelmet) =>
  compose<any>(
    withHelmet({
      ...props,
      structuredDefaultData: STRUCTURED_META_DATA,
    }),
  );

export default WithHelmetComponent;
