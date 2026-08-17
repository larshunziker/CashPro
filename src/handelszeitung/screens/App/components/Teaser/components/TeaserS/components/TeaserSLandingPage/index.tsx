import React from 'react';
import TeaserSImageTile from '../TeaserSImageTile';
import { TEASER_CTA_CHANNEL } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserSLandingPage = (props: TeaserFactoryProps) => (
  <TeaserSImageTile {...props} cta={TEASER_CTA_CHANNEL} />
);

export default TeaserSLandingPage;
