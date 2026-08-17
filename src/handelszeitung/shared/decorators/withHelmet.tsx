/* istanbul ignore file */

import { compose } from 'redux';
import {
  STRUCTURED_META_DATA,
  softwareApplicationSchema,
} from '../helpers/metaData';
import withHelmetFactory from '../../../shared/decorators/withHelmetFactory';
import Helmet from '../../screens/App/components/Helmet';
import { WithHelmet } from './withHelmet';
import {
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../shared/constants/publications';
import { PUBLISHER } from '../../screens/App/screens/Article/constants';
import hzLogo from '../../screens/App/assets/graphics/logo-handelszeitung.png';
import insuranceLogo from '../../screens/App/assets/graphics/logo-insurance.png';

export type {
  WithHelmetProps,
  WithHelmet,
} from '../../../shared/decorators/@types/withHelmetFactory';

export const PUBLISHER_TO_LOGO = {
  [PUBLICATION_HZ]: hzLogo,
  [PUBLICATION_SWISS_INSURANCE]: insuranceLogo,
  [PUBLICATION_HZB]: hzLogo,
};

const withHelmet = withHelmetFactory({
  Helmet,
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ handelszeitung */
  getPublisher: (node) => PUBLISHER[node?.publication || PUBLICATION_HZ],
  getPublisherLogo: (node) =>
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    `${global.locationOrigin}${
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ handelszeitung */
      PUBLISHER_TO_LOGO[node?.publication || PUBLICATION_HZ]
    }`,
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
