import React from 'react';
import TeaserSImageTile from '../TeaserSImageTile';
import { TEASER_S_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserSBrandReport = (props: TeaserFactoryProps) => (
  <TeaserSImageTile
    {...props}
    trackingSelector={TEASER_S_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserSBrandReport;
