import React from 'react';
import TeaserLImageTile from '../TeaserLImageTile';
import { TEASER_CTA_DOSSIER } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserLDossier = (props: TeaserProps) => (
  <TeaserLImageTile {...props} cta={TEASER_CTA_DOSSIER} />
);

export default TeaserLDossier;
