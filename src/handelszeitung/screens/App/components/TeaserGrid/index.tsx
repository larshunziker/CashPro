/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import teaserGridFactory from '../../../../../common/components/TeaserGrid/factory';
import AppNexus from '../AppNexus';
import ContentBox from '../ContentBox';
import Error from '../Error';
import LatestHeadlessStories from '../LatestHeadlessStories';
import Teaser from '../Teaser';
import { TeaserLayout, gridConfig } from './gridConfigs';
import { TYPE_AD } from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  PUBLICATION_GROUP_HZ,
  PUBLICATION_GROUP_SV,
} from '../../../../../shared/constants/publications';
import {
  TYPE_LATEST_HEADLESS_STORIES_DEFAULT,
  TYPE_LATEST_HEADLESS_STORIES_SWISS_INSURANCE,
} from './constants';
import styles from './styles.legacy.css';
import { EnrichedGridConfig } from '../../../../../common/components/TeaserGrid/typings';

const getGridItem = (item: EnrichedGridConfig) => {
  switch (item.type) {
    case TYPE_LATEST_HEADLESS_STORIES_DEFAULT:
      return <LatestHeadlessStories publication={PUBLICATION_GROUP_HZ} />;

    case TYPE_LATEST_HEADLESS_STORIES_SWISS_INSURANCE:
      return <LatestHeadlessStories publication={PUBLICATION_GROUP_SV} />;

    case TYPE_AD:
      return (
        <>
          {item.adConfig &&
            item.adConfig.map(
              ({ slot, isMultiPlacement = true, deviceType }, index) => (
                <div
                  key={`teaser-list-ad-${index}`}
                  className={classNames(
                    'ad-wrapper',
                    `ad-wrapper-${deviceType}`,
                    styles.AdContainer,
                  )}
                >
                  <AppNexus
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                    slot={slot}
                    isMultiPlacement={isMultiPlacement}
                    deviceType={deviceType}
                  />
                </div>
              ),
            )}
        </>
      );

    default:
      return null;
  }
};

const TeaserGrid = teaserGridFactory<Record<TeaserLayout, any>>({
  ContentBox,
  ErrorMessage: Error,
  Teaser: Teaser,
  cssGridConfig: gridConfig,
  /* @ts-ignore TODO: TS2322 ->  Type '(item */
  getGridItem,
});

export default TeaserGrid;
