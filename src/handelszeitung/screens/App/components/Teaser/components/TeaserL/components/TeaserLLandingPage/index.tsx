import React from 'react';
import TeaserLImageTile from '../TeaserLImageTile';
import { TEASER_CTA_CHANNEL } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserLLandingPage = (props: TeaserProps) => (
  <TeaserLImageTile {...props} cta={TEASER_CTA_CHANNEL} />
);

export default TeaserLLandingPage;
