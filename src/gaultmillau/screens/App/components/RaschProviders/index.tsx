import React, { ReactElement } from 'react';
import PerformanceMeasureProvider from '../../../../../common/components/PerformanceMeasureProvider';
import TealiumProvider from '../../../../../common/components/Tealium/components/TealiumProvider';
import AppNexusProvider from '../AppNexusProvider';
import AppSetup from '../AppSetup';

const RaschProviders = (): ReactElement => {
  return (
    <>
      <AppSetup />
      <AppNexusProvider />
      <TealiumProvider />
      <PerformanceMeasureProvider />
    </>
  );
};

export default RaschProviders;
