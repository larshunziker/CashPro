/* istanbul ignore file */

import { compose } from 'redux';
import {
  STRUCTURED_META_DATA,
  softwareApplicationSchema,
} from '../helpers/metaData';
import { WithHelmet } from '../../../shared/decorators/@types/withHelmetFactory';
import withHelmetFactory from '../../../shared/decorators/withHelmetFactory';
import Helmet from '../../screens/App/components/Helmet';
import { PUBLICATION_CASH_SEO_TITLE as PUBLISHER } from '../../../shared/constants/publications';
import cashLogo from '../../screens/App/assets/graphics/logo-cash.png';

const PUBLISHER_LOGO_DIMENSIONS = { width: 600, height: 231 };

export const getPublisherLogoDimensions = () => PUBLISHER_LOGO_DIMENSIONS;

export type {
  WithHelmetProps,
  WithHelmet,
  WithHelmetNodeProps,
} from '../../../shared/decorators/@types/withHelmetFactory';

const withHelmet = withHelmetFactory({
  Helmet,
  getPublisher: () => PUBLISHER,
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  getPublisherLogo: () => `${global.locationOrigin}${cashLogo}`,
  getPublisherLogoDimensions,
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
