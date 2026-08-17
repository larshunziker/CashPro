import React from 'react';
import TeaserXSImageTile from '../TeaserXSImageTile';
import { TEASER_CTA_SPECIAL } from '../../../../constants';
import { TeaserFactoryProps } from '../../../../../../../../../common/components/Teaser/typings';

const TeaserXSSpecial = (props: TeaserFactoryProps) => (
  <TeaserXSImageTile {...props} cta={TEASER_CTA_SPECIAL} />
);

export default TeaserXSSpecial;
