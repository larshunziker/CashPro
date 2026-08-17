import React from 'react';
import TeaserXSImageTile from '../TeaserXSImageTile';
import { TEASER_XS_BRANDREPORT_IDENTIFIER } from '../../../../constants';

const TeaserXSBrandReport = ({ node }: TeasableInterfaceGraphListItem) => (
  <TeaserXSImageTile
    {...node}
    trackingSelector={TEASER_XS_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserXSBrandReport;
