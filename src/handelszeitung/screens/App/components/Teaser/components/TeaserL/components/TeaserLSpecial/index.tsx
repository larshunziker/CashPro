import React from 'react';
import TeaserLImageTile from '../TeaserLImageTile';
import { TEASER_CTA_SPECIAL } from '../../../../constants';
import { TeaserProps } from '../../../../typings';

const TeaserLSpecial = (props: TeaserProps) => (
  <TeaserLImageTile {...props} cta={TEASER_CTA_SPECIAL} />
);

export default TeaserLSpecial;
