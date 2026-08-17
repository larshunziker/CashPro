import React from 'react';
import TeaserHeroImageTile from '../TeaserHeroImageTile';
import { TEASER_CTA_SPECIAL } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserHeroSpecial = (props: TeaserProps) => (
  <TeaserHeroImageTile {...props} cta={TEASER_CTA_SPECIAL} />
);

export default TeaserHeroSpecial;
