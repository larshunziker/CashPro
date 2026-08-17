import React, { ReactElement, Suspense, lazy } from 'react';
import Auth0Provider from '../../../../../common/components/Auth0Provider';
import BackgroundFetchProvider from '../../../../../common/components/BackgroundFetchProvider';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import OneSignalProvider from '../../../../../common/components/OneSignalProvider';
import PianoProvider from '../../../../../common/components/PianoProvider';
import TealiumProvider from '../../../../../common/components/Tealium/components/TealiumProvider';
import AppNexusProvider from '../AppNexusProvider';
import AppSetup from '../AppSetup';
import PerformanceMeasureProvider from './../../../../../common/components/PerformanceMeasureProvider';

const ToastContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "ToastContainer" */ '../../../../../common/components/ToastContainer'
    ),
);

const RaschProviders = (): ReactElement => {
  return (
    <>
      <AppSetup />
      <AppNexusProvider />
      <Auth0Provider />
      <BackgroundFetchProvider />
      <PianoProvider />
      <OneSignalProvider />
      <PerformanceMeasureProvider />
      <ClientSideOnly>
        <Suspense>
          <ToastContainer />
        </Suspense>
      </ClientSideOnly>
      <TealiumProvider />
    </>
  );
};

export default RaschProviders;
