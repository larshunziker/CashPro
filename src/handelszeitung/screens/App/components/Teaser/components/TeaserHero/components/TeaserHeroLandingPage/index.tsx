import React from 'react';
import TeaserHeroImageTile from '../TeaserHeroImageTile';
import { TEASER_CTA_CHANNEL } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserHeroLandingPage = (props: TeaserProps) => (
  <TeaserHeroImageTile {...props} cta={TEASER_CTA_CHANNEL} />
);

export default TeaserHeroLandingPage;
