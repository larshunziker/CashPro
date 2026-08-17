/* istanbul ignore file */

import React from 'react';
import teaserGridFactory from '../../../../../common/components/TeaserGrid/factory';
import Error from '../Error';
import HomeSlider from '../HomeSlider';
import Teaser from '../Teaser';
import { TeaserLayout, gridConfig } from './gridConfigs';
import { TYPE_STATIC } from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TYPE_DIVIDER,
  TYPE_HEROSLIDER_HOME,
  PIANO_CONTAINER,
} from './gridConfigs/constants';
import styles from './styles.legacy.css';
import { EnrichedGridConfig } from '../../../../../common/components/TeaserGrid/typings';

const getGridItem = (item: EnrichedGridConfig) => {
  switch (item.type) {
    case TYPE_HEROSLIDER_HOME: {
      /* @ts-ignore TODO: TS2322 ->  Type 'GridConfigItem[] | null | undefined' is not assignable to type 'GridConfigItem[]'. */
      return <HomeSlider teaserList={item.items} />;
    }
    case TYPE_DIVIDER: {
      return <div className={styles.Divider} />;
    }
    case TYPE_STATIC: {
      return <Teaser component={item.teaserType} />;
    }
    case PIANO_CONTAINER: {
      return <div id="partner-banner" />;
    }
    default:
      return null;
  }
};

const TeaserGrid = teaserGridFactory<Record<TeaserLayout, any>>({
  ErrorMessage: Error,
  Teaser,
  cssGridConfig: gridConfig,
  /* @ts-ignore TODO: TS2322 ->  Type '(item */
  getGridItem,
});

export default TeaserGrid;
