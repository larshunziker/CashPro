import React from 'react';
import TeaserSImageTile from '../TeaserSImageTile';
import { TEASER_CTA_DOSSIER } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserSDossier = (props: TeaserFactoryProps) => (
  <TeaserSImageTile {...props} cta={TEASER_CTA_DOSSIER} />
);

export default TeaserSDossier;
