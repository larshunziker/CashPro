/* istanbul ignore file */

import { compose } from 'redux';
import {
  STRUCTURED_META_DATA,
  softwareApplicationSchema,
} from '../helpers/metaData';
import { WithHelmet } from '../../../shared/decorators/@types/withHelmetFactory';
import withHelmetFactory from '../../../shared/decorators/withHelmetFactory';
import Helmet from '../../screens/App/components/Helmet';
import { PUBLICATION_BEO_SEO_TITLE as PUBLISHER } from '../../../shared/constants/publications';
import beoLogo from '../../screens/App/assets/graphics/logo-beobachter.png';

export type WithHelmetNode = {
  title: string;
  link: Array<Record<string, any>>;
  meta: Array<{ name: string; content: string }>;
  script: Array<Record<string, any>>;
  socialMetaValues: Record<string, any>;
};

const withHelmet = withHelmetFactory({
  Helmet,
  getPublisher: () => PUBLISHER,
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  getPublisherLogo: () => `${global.locationOrigin}${beoLogo}`,
  getPublisherLogoDimensions: () => ({ width: 600, height: 122 }),
  whiteListedParams: { page: true, q: true, tools: true, sort: true },
});

const WithHelmetComponent = (props: WithHelmet) =>
  compose<any>(
    withHelmet({
      ...props,
      structuredDefaultData: STRUCTURED_META_DATA,
      androidAppSchema: softwareApplicationSchema('ANDROID'),
      iOSAppSchema: softwareApplicationSchema('IOS'),
    }),
  );

export default WithHelmetComponent;
