import React from 'react';
import TeaserMImageTile from '../../components/TeaserMImageTile';
import { TEASER_CTA_DOSSIER } from '../../../../constants';
import type { TeaserProps } from '../../../../typings';

const TeaserMDossier = (props: TeaserProps) => (
  <TeaserMImageTile {...props} cta={TEASER_CTA_DOSSIER} />
);

export default TeaserMDossier;
