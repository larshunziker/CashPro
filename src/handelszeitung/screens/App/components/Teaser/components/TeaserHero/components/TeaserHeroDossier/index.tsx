import React from 'react';
import TeaserHeroImageTile from '../TeaserHeroImageTile';
import { TEASER_CTA_DOSSIER } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserHeroDossier = (props: TeaserProps) => (
  <TeaserHeroImageTile {...props} cta={TEASER_CTA_DOSSIER} />
);

export default TeaserHeroDossier;
