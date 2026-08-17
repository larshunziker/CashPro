import React from 'react';
import TeaserMImageTile from '../../components/TeaserMImageTile';
import { TEASER_CTA_SPECIAL } from '../../../../constants';
import type { TeaserProps } from '../../../../typings';

const TeaserMSpecial = (props: TeaserProps) => (
  <TeaserMImageTile {...props} cta={TEASER_CTA_SPECIAL} />
);

export default TeaserMSpecial;
