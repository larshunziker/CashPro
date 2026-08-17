import React, { ReactElement, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import Auth0Provider from '../../../../../common/components/Auth0Provider';
import BackgroundFetchProvider from '../../../../../common/components/BackgroundFetchProvider';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import HybridAppProvider from '../../../../../common/components/HybridAppProvider';
import OneSignalProvider from '../../../../../common/components/OneSignalProvider';
import PerformanceMeasureProvider from '../../../../../common/components/PerformanceMeasureProvider';
import PianoProvider from '../../../../../common/components/PianoProvider';
import TealiumProvider from '../../../../../common/components/Tealium/components/TealiumProvider';
import { pushNotificationConfig } from '../../../../config/pushNotifications';
import AppNexusProvider from '../AppNexusProvider';
import AppSetup from '../AppSetup';
import { selectWatchlistAndAddInstrument } from '../../screens/MyCash/components/Watchlist/components/AddInstrumentToWatchlist';
import { alertsFormOverlay } from '../AlertsForm';
import { selectPortfolioAndTrade } from '../PortfolioTradeForm';
import { useWidgetPage } from '../../../../shared/hooks/useWidgetPage';
import { ViafouraProvider } from '../../../../../common/components/ViafouraProvider';

const ToastContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "ToastContainer" */ '../../../../../common/components/ToastContainer'
    ),
);

const RaschProviders = ({ ignoreToastProvider = false }): ReactElement => {
  const navigate = useStableNavigate();
  const location = useRaschRouterLocation();
  const { isWidgetPage } = useWidgetPage();
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (typeof global.alertsFormOverlay === 'undefined') {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'alertKey' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'fullquoteUri' implicitly has an 'any' type. */
    global.alertsFormOverlay = ({ alertKey, fullquoteUri }) => {
      alertsFormOverlay({
        alertKey,
        fullquoteUri,
        navigate,
        location,
      });
    };
  }
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (typeof global.selectPortfolioAndTrade === 'undefined') {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
    global.selectPortfolioAndTrade = ({ instrumentKey, type, origin = '' }) => {
      selectPortfolioAndTrade({
        instrumentKey,
        type,
        origin,
      });
    };
  }
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (typeof global.selectWatchlistAndAddInstrument === 'undefined') {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.selectWatchlistAndAddInstrument = ({
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
      instrumentKey,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentName' implicitly has an 'any' type. */
      instrumentName,
      origin = '',
    }) => {
      selectWatchlistAndAddInstrument({
        instrumentKey,
        instrumentName,
        origin,
      });
    };
  }
  return (
    <>
      <AppSetup />
      {!isWidgetPage && <AppNexusProvider />}
      {!isWidgetPage && <Auth0Provider />}
      {!isWidgetPage && !isHybridApp && pushNotificationConfig && (
        <OneSignalProvider config={pushNotificationConfig} />
      )}
      {!isWidgetPage && <TealiumProvider />}
      {!isWidgetPage && <ViafouraProvider />}
      <PianoProvider />
      {!ignoreToastProvider && (
        <ClientSideOnly>
          <Suspense>
            <ToastContainer />
          </Suspense>
        </ClientSideOnly>
      )}
      {!isWidgetPage && <BackgroundFetchProvider />}
      {!isWidgetPage && <PerformanceMeasureProvider />}
      {!isWidgetPage && <HybridAppProvider />}
    </>
  );
};

export default RaschProviders;
