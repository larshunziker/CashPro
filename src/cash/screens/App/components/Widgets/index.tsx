import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import AwpAnalyser from './components/AwpAnalyser';
import CorporateActions from './components/CorporateActions';
import CurrencyCalculator from './components/CurrencyCalculator';
import DividendCalendar from './components/DividendCalendar';
import FullquoteHeader from './components/FullquoteHeader';
import InstrumentActions from './components/InstrumentActions';
import InstrumentGenericData from './components/InstrumentGenericData';
import InstrumentHighLow from './components/InstrumentHighLow';
import InstrumentLatestData from './components/InstrumentLatestData';
import InstrumentLatestDataInArticle from './components/InstrumentLatestDataInArticle';
import InstrumentMarketPlaces from './components/InstrumentMarketPlaces';
import InstrumentPerformance from './components/InstrumentPerformance';
import MultipleInstrumentsGenericData from './components/MultipleInstrumentsGenericData';
import MultipleInstrumentsGenericDataWithCallback from './components/MultipleInstrumentsGenericDataWithCallback';
import Orderbook from './components/Orderbook';
import QuoteList from './components/QuoteList';
import SavingsPlanCalculator from './components/SavingsPlanCalculator';
import Sector from './components/Sector';
import Timeseries from './components/Timeseries';
import TopFlop from './components/TopFlop';
import TrendRadar from './components/TrendRadar';
import TrendRadarOverview from './components/TrendRadarOverview';
import VolumeTurnover from './components/VolumeTurnover';
import Wikifolio from './components/Wikifolio';
import FullQuoteHeaderBNP from './components/FullQuoteHeaderBNP';
import {
  WIDGET_AWP_ANALYSER,
  WIDGET_CHART_TIMESERIES,
  WIDGET_CORPORATE_ACTIONS,
  WIDGET_CURRENCY_CALCULATOR,
  WIDGET_DIVIDEND_CALENDAR,
  WIDGET_FULLQUOTE_HEADER,
  WIDGET_INSTRUMENT_ACTIONS,
  WIDGET_INSTRUMENT_GENERIC_DATA,
  WIDGET_INSTRUMENT_HIGH_LOW,
  WIDGET_INSTRUMENT_LATEST_DATA,
  WIDGET_INSTRUMENT_LATEST_DATA_IN_ARTICLE,
  WIDGET_INSTRUMENT_MARKET_PLACES,
  WIDGET_INSTRUMENT_PERFORMANCE,
  WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA,
  WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA_CALLBACK,
  WIDGET_ORDERBOOK,
  WIDGET_QUOTELIST,
  WIDGET_SAVINGS_PLAN_CALCULATOR,
  WIDGET_SECTOR,
  WIDGET_TOP_FLOP,
  WIDGET_TREND_RADAR,
  WIDGET_TREND_RADAR_OVERVIEW,
  WIDGET_VOLUME_TURNOVER,
  WIDGET_WIKIFOLIO,
  WIDGET_FULLQUOTE_HEADER_BNP,
} from './constants';
import { WidgetsProps } from './typings';

const Switch = createComponentSwitch({
  [WIDGET_QUOTELIST]: QuoteList,
  [WIDGET_AWP_ANALYSER]: AwpAnalyser,
  [WIDGET_ORDERBOOK]: Orderbook,
  [WIDGET_SAVINGS_PLAN_CALCULATOR]: SavingsPlanCalculator,
  [WIDGET_INSTRUMENT_ACTIONS]: InstrumentActions,
  [WIDGET_CHART_TIMESERIES]: Timeseries,
  [WIDGET_FULLQUOTE_HEADER]: FullquoteHeader,
  [WIDGET_TOP_FLOP]: TopFlop,
  [WIDGET_SECTOR]: Sector,
  [WIDGET_INSTRUMENT_LATEST_DATA]: InstrumentLatestData,
  [WIDGET_INSTRUMENT_LATEST_DATA_IN_ARTICLE]: InstrumentLatestDataInArticle,
  [WIDGET_INSTRUMENT_PERFORMANCE]: InstrumentPerformance,
  [WIDGET_VOLUME_TURNOVER]: VolumeTurnover,
  [WIDGET_INSTRUMENT_MARKET_PLACES]: InstrumentMarketPlaces,
  [WIDGET_TREND_RADAR]: TrendRadar,
  [WIDGET_INSTRUMENT_HIGH_LOW]: InstrumentHighLow,
  [WIDGET_INSTRUMENT_GENERIC_DATA]: InstrumentGenericData,
  [WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA]: MultipleInstrumentsGenericData,
  [WIDGET_MULTIPLE_INSTRUMENTS_GENERIC_DATA_CALLBACK]:
    MultipleInstrumentsGenericDataWithCallback,
  [WIDGET_CORPORATE_ACTIONS]: CorporateActions,
  [WIDGET_TREND_RADAR_OVERVIEW]: TrendRadarOverview,
  [WIDGET_CURRENCY_CALCULATOR]: CurrencyCalculator,
  [WIDGET_WIKIFOLIO]: Wikifolio,
  [WIDGET_FULLQUOTE_HEADER_BNP]: FullQuoteHeaderBNP,
  [WIDGET_DIVIDEND_CALENDAR]: DividendCalendar,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Widgets = (props): ReactElement => {
  return <Switch component={props.component} {...props} />;
};

export default memo<WidgetsProps>(Widgets);
