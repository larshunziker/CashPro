import React from 'react';
import TeaserMImageTile from '../../components/TeaserMImageTile';
import { TEASER_M_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import type { TeaserProps } from '../../../../typings';

const TeaserMBrandReport = (props: TeaserProps) => (
  <TeaserMImageTile
    {...props}
    trackingSelector={TEASER_M_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserMBrandReport;
