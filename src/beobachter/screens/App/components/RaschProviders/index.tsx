import React, { ReactElement, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import { usePianoEmbedCheckoutCloseScroll } from '../../../../shared/hooks/usePianoEmbedCheckoutCloseScroll';
import Auth0Provider from '../../../../../common/components/Auth0Provider';
import BackgroundFetchProvider from '../../../../../common/components/BackgroundFetchProvider';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import HybridAppProvider from '../HybridAppProvider';
import OneSignalProvider from '../../../../../common/components/OneSignalProvider';
import PerformanceMeasureProvider from '../../../../../common/components/PerformanceMeasureProvider';
import PianoProvider from '../../../../../common/components/PianoProvider';
import TealiumProvider from '../../../../../common/components/Tealium/components/TealiumProvider';
import AIAIProvider from '../AIAIProvider';
import AppNexusProvider from '../AppNexusProvider';
import AppSetup from '../AppSetup';
import { ViafouraProvider } from '../../../../../common/components/ViafouraProvider';
import { PianoHideElementProvider } from '../PianoHideElementProvider';

const ToastContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "ToastContainer" */ '../../../../../common/components/ToastContainer'
    ),
);

const RaschProviders = (): ReactElement => {
  usePianoEmbedCheckoutCloseScroll();

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  return (
    <>
      <AppSetup />
      <AppNexusProvider />
      <Auth0Provider />
      <BackgroundFetchProvider />
      <AIAIProvider />
      <PianoProvider />
      {!isHybridApp && <OneSignalProvider />}
      <PerformanceMeasureProvider />
      <ViafouraProvider />
      <ClientSideOnly>
        <Suspense>
          <ToastContainer />
        </Suspense>
      </ClientSideOnly>
      <TealiumProvider />
      <HybridAppProvider />
      <PianoHideElementProvider />
    </>
  );
};

export default RaschProviders;
