import React from 'react';
import classNames from 'classnames';
import teaserGridFactory from '../../../../../common/components/TeaserGrid/factory';
import AppNexus from '../AppNexus';
import Error from '../Error';
import HeroSlider from '../HeroSlider';
import Teaser from '../Teaser';
import { TeaserLayout, gridConfig } from './gridConfigs';
import { TYPE_AD } from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TYPE_DIVIDER,
  TYPE_HEROSLIDER_HOME,
  TYPE_HEROSLIDER_HOME_BODY_HEALTH,
  TYPE_HEROSLIDER_HOME_FAMILY,
  TYPE_HEROSLIDER_HOME_PEOPLE,
  TYPE_HEROSLIDER_HOME_STYLE,
} from './gridConfigs/constants';
import styles from './styles.legacy.css';
import { EnrichedGridConfig } from '../../../../../common/components/TeaserGrid/typings';

const getGridItem = (item: EnrichedGridConfig) => {
  switch (item.type) {
    case TYPE_HEROSLIDER_HOME:
    case TYPE_HEROSLIDER_HOME_PEOPLE:
    case TYPE_HEROSLIDER_HOME_STYLE:
    case TYPE_HEROSLIDER_HOME_FAMILY:
    case TYPE_HEROSLIDER_HOME_BODY_HEALTH: {
      const sliderItems = {
        type: item.type,
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        items: item.items.map((i) => {
          return {
            type: i.teaserType,
          };
        }),
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        data: item.items.map((i) => i.data),
      };
      return <HeroSlider item={sliderItems as any} />;
    }
    case TYPE_DIVIDER: {
      return <div className={styles.Divider} />;
    }

    case TYPE_AD: {
      const adSlot =
        item.adConfig &&
        Array.isArray(item.adConfig) &&
        item.adConfig.map(
          ({ slot, isMultiPlacement = true, deviceType }, index: number) => (
            <div
              className={classNames('ad-wrapper', `ad-wrapper-${deviceType}`)}
              key={`teaser-grid-ad-${index}`}
            >
              <AppNexus
                /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                slot={slot}
                isMultiPlacement={isMultiPlacement}
                deviceType={deviceType}
              />
            </div>
          ),
        );
      return <>{adSlot}</>;
    }

    default:
      return null;
  }
};

const TeaserGrid = teaserGridFactory<Record<TeaserLayout, any>>({
  ErrorMessage: Error,
  Teaser: Teaser,
  cssGridConfig: gridConfig,
  /* @ts-ignore TODO: TS2322 ->  Type '(item */
  getGridItem: getGridItem,
});

export default TeaserGrid;
