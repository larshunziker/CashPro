import React from 'react';
import { ensureTeaserInterfaceItem } from './shared/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import LandingPagesStatic from './components/LandingPagesStatic';
import TeaserHeroA from './components/TeaserHeroA';
import TeaserHeroB from './components/TeaserHeroB';
import TeaserHeroMain from './components/TeaserHeroMain';
import TeaserML from './components/TeaserML';
import TeaserRecipe from './components/TeaserRecipe';
import TeaserVideo from './components/TeaserVideo';
import {
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_HERO_A,
  TEASER_LAYOUT_HERO_B,
  TEASER_LAYOUT_INLINE_RECIPE,
  TEASER_LAYOUT_LANDING_PAGES_STATIC,
  TEASER_LAYOUT_ML,
  TEASER_LAYOUT_VIDEO,
} from '../../../../../shared/constants/teaser';

const Switch = createComponentSwitch({
  [TEASER_LAYOUT_HERO]: TeaserHeroMain,
  [TEASER_LAYOUT_ML]: TeaserML,
  [TEASER_LAYOUT_HERO_A]: TeaserHeroA,
  [TEASER_LAYOUT_HERO_B]: TeaserHeroB,
  [TEASER_LAYOUT_VIDEO]: TeaserVideo,
  [TEASER_LAYOUT_INLINE_RECIPE]: TeaserRecipe,
  [TEASER_LAYOUT_LANDING_PAGES_STATIC]: LandingPagesStatic,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Teaser = (props) => (
  <Switch {...ensureTeaserInterfaceItem({ ...props, ...props.node })} />
);

export default Teaser;
