import React from 'react';
import TeaserLImageTile from '../TeaserLImageTile';
import { TEASER_L_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserLBrandReport = (props: TeaserProps) => (
  <TeaserLImageTile
    {...props}
    trackingSelector={TEASER_L_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserLBrandReport;
