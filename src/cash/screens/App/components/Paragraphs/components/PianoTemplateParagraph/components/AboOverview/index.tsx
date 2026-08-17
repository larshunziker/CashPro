import React from 'react';
import DesktopView from './components/DesktopView';
import MobileView from './components/MobileView';
import { AboOverviewProps } from './typings';

const AboOverview = ({ desktopData, mobileData, id }: AboOverviewProps) => {
  return (
    <div>
      <DesktopView {...desktopData} />
      <MobileView {...mobileData} id={id} />
    </div>
  );
};

export default AboOverview;
