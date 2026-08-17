import { getServiceUrl } from '../../../../../shared/helpers/serviceUrl';
import {
  TYPE_INTERACTIVE_CHART,
  TYPE_SIMULATOR,
} from '../../components/TeaserGrid/constants';
import { Item } from './typings';

const getItem = (
  path: string,
  typename = 'WidgetParagraph',
  clientOnly = false,
): Item => {
  return {
    __typename: typename,
    clientOnly,
    link: {
      __typename: 'link',
      path: getServiceUrl(
        `${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/${path}`,
      ),
    },
  };
};

export const items = {
  fullquoteDerivateSimulator: [
    getItem(
      'header/?listingKey=[listingId]&mIsin=[mIsin]&subtitle=[subtitle]&mName=[mName]',
      'WidgetParagraph',
      true,
    ),
    {
      type: TYPE_SIMULATOR,
      link: {
        __typename: 'link',
        path: `https://services.derivativepartners.com/cash/simulator/v01.02/?embeded=true&symbol=[mSymb]`,
      },
    },
  ],
  fullquoteInteractiveChart: [
    getItem(
      'header/?listingKey=[listingId]&mIsin=[mIsin]&subtitle=[subtitle]&mName=[mName]',
      'WidgetParagraph',
      true,
    ),
    getItem(
      'integrations/chart_produkt_matching/BAER/[mIsin]?sponsorImage=/media/field_image/2022-08/bank_julius_bar_logo.jpg',
      'WidgetParagraph',
      true,
    ),
    {
      type: TYPE_INTERACTIVE_CHART,
      timePeriodValues: ['allIntraday', 'analyse'],
      link: {
        __typename: 'link',
        path: getServiceUrl(
          `${__FI_BOX_SERVICE_ENDPOINT__}/services/charts-json/timeserie/[listingId]`,
        ),
      },
    },
  ],
  fullquoteInteractiveChartHybrid: [
    getItem(
      'header/?listingKey=[listingId]&mIsin=[mIsin]&subtitle=[subtitle]&mName=[mName]',
      'WidgetParagraph',
      true,
    ),
    // TODO: comment back in and adjust if an integration is sold on the hybrid app
    // getItem(
    //   'integrations/chart_produkt_matching/BAER/[mIsin]?sponsorImage=/media/field_image/2022-08/bank_julius_bar_logo.jpg',
    //   'WidgetParagraph',
    //   true,
    // ),
    {
      type: TYPE_INTERACTIVE_CHART,
      timePeriodValues: ['allIntraday', 'analyse'],
      link: {
        __typename: 'link',
        path: getServiceUrl(
          `${__FI_BOX_SERVICE_ENDPOINT__}/services/charts-json/timeserie/[listingId]`,
        ),
      },
    },
  ],
};
