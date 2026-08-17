import React from 'react';
import TeaserHeroImageTile from '../TeaserHeroImageTile';
import { TEASER_HERO_BRANDREPORT_IDENTIFIER } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserHeroBrandReport = (props: TeaserProps) => (
  <TeaserHeroImageTile
    {...props}
    trackingSelector={TEASER_HERO_BRANDREPORT_IDENTIFIER}
  />
);

export default TeaserHeroBrandReport;
