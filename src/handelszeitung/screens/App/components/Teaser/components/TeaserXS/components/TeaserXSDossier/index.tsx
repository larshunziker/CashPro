import React from 'react';
import TeaserXSImageTile from '../TeaserXSImageTile';
import { TEASER_CTA_DOSSIER } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserXSDossier = (props: TeaserFactoryProps) => (
  <TeaserXSImageTile {...props} cta={TEASER_CTA_DOSSIER} />
);

export default TeaserXSDossier;
