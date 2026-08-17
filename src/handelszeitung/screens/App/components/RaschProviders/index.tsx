import React, { ReactElement, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import Auth0Provider from '../../../../../common/components/Auth0Provider';
import BackgroundFetchProvider from '../../../../../common/components/BackgroundFetchProvider';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import HybridAppProvider from '../../../../../common/components/HybridAppProvider';
import OneSignalProvider from '../../../../../common/components/OneSignalProvider';
import PerformanceMeasureProvider from '../../../../../common/components/PerformanceMeasureProvider';
import PianoProvider from '../../../../../common/components/PianoProvider';
import TealiumProvider from '../../../../../common/components/Tealium/components/TealiumProvider';
import AppNexusProvider from '../AppNexusProvider';
import AppSetup from '../AppSetup';
import { ViafouraProvider } from '../../../../../common/components/ViafouraProvider';

const ToastContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "ToastContainer" */ '../../../../../common/components/ToastContainer'
    ),
);

const RaschProviders = (): ReactElement => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  return (
    <>
      <AppSetup />
      <AppNexusProvider />
      <Auth0Provider />
      {!isHybridApp && <OneSignalProvider />}
      <TealiumProvider />
      <PianoProvider />
      <ViafouraProvider />
      <ClientSideOnly>
        <Suspense>
          <ToastContainer />
        </Suspense>
      </ClientSideOnly>
      <BackgroundFetchProvider />
      <PerformanceMeasureProvider />
      <HybridAppProvider />
    </>
  );
};

export default RaschProviders;
