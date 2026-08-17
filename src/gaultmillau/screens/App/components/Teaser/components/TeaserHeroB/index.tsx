import React from 'react';
import TeaserHeroA from '../TeaserHeroA';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const TeaserHeroB = (props) => <TeaserHeroA position="right" {...props} />;

export default TeaserHeroB;
