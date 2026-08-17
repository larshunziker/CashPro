import React, { Suspense } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import ExtendedChart from '../../components/Highcharts/components/ExtendedChart';
import ForumChart from '../../components/Highcharts/components/ForumChart';
import MarketCombo from '../../components/Widgets/components/MarketCombo';
import MarketOverview from '../../components/Widgets/components/MarketOverview';
import {
  EXTERNAL_CHART,
  FORUM_CHART,
  MARKET_COMBO,
  MARKET_OVERVIEW,
} from './constants';
import { WidgetPageProps } from './typings';

const WidgetPage = ({ location }: WidgetPageProps) => {
  const component = location?.pathname?.split('/')[2];

  if (!component) {
    return;
  }

  return (
    <Suspense>
      <Switch component={component} location={location} />
    </Suspense>
  );
};

const Switch = createComponentSwitch({
  [EXTERNAL_CHART]: ExtendedChart,
  [FORUM_CHART]: ForumChart,
  [MARKET_OVERVIEW]: MarketOverview,
  [MARKET_COMBO]: MarketCombo,
});

export default WidgetPage;
