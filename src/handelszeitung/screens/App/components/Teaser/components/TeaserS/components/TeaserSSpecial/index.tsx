import React from 'react';
import TeaserSImageTile from '../TeaserSImageTile';
import { TEASER_CTA_SPECIAL } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserSSpecial = (props: TeaserFactoryProps) => (
  <TeaserSImageTile {...props} cta={TEASER_CTA_SPECIAL} />
);

export default TeaserSSpecial;
