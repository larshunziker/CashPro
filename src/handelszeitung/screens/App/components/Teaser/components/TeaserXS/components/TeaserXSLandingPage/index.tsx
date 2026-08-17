import React from 'react';
import TeaserXSImageTile from '../TeaserXSImageTile';
import { TEASER_CTA_CHANNEL } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserXSLandingPage = (props: TeaserFactoryProps) => (
  <TeaserXSImageTile {...props} cta={TEASER_CTA_CHANNEL} />
);

export default TeaserXSLandingPage;
