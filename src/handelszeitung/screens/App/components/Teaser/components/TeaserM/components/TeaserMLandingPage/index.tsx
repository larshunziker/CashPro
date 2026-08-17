import React from 'react';
import TeaserMImageTile from '../../components/TeaserMImageTile';
import { TEASER_CTA_CHANNEL } from '../../../../constants';
import type { TeaserProps } from '../../../../typings';

const TeaserMLandingPage = (props: TeaserProps) => (
  <TeaserMImageTile {...props} cta={TEASER_CTA_CHANNEL} />
);

export default TeaserMLandingPage;
