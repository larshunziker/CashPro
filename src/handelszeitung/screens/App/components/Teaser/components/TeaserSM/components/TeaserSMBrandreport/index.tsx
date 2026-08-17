import React from 'react';
import TeaserSMImageTile from '../TeaserSMImageTile';
import { TEASER_SM_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserSMBrandReport = (props: TeaserFactoryProps) => (
  <TeaserSMImageTile
    {...props}
    trackingSelector={TEASER_SM_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserSMBrandReport;
