/* istanbul ignore file */

import React, { Suspense, useContext } from 'react';
import classNames from 'classnames';
import teaserGridFactory from '../../../../../common/components/TeaserGrid/factory';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import InView from '../../../../../common/components/InView';
import Link from '../../../../../common/components/Link';
import AppNexus from '../AppNexus';
import ButtonWithLoading from '../ButtonWithLoading';
import ContentBox from '../ContentBox';
import Error from '../Error';
import HighchartsWrapper from '../Highcharts';
import WidgetParagraph from '../Paragraphs/components/WidgetParagraph';
import Teaser from '../Teaser';
import { TeaserLayout, gridConfig } from './gridConfigs';
import {
  TYPE_AD,
  TYPE_ESI_WIDGET_PARAGRAPH,
} from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { PIANO_TRADING_TEASER_WIDGET } from '../../../../../shared/constants/piano';
import { TEASER_LAYOUT_TRADING } from '../../../../../shared/constants/teaser';
import { SuppressAdsContext } from '../../constants';
import { HIGHCHART_INTERACTIVE_CHART } from '../Highcharts/constants';
import { TYPE_INTERACTIVE_CHART, TYPE_SIMULATOR } from './constants';
import styles from './styles.legacy.css';
import { EnrichedGridConfig } from '../../../../../common/components/TeaserGrid/typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
const getGridItem = (item: EnrichedGridConfig, origin) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAdSuppressed } = useContext(SuppressAdsContext);

  switch (item.type) {
    case TYPE_AD: {
      if (isAdSuppressed) {
        // needed to ad an empty fragment here otherwise the grid had issues with enriching the correct items
        // somehow wrong data was enriched in wrong placements
        return <></>;
      }
      return (
        <>
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {item?.adConfig.map(
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
    }

    case TYPE_ESI_WIDGET_PARAGRAPH: {
      const widgetParagraph = item.data as WidgetParagraph;

      if (!widgetParagraph) {
        return null;
      }

      return (
        <WidgetParagraph widgetParagraph={widgetParagraph} origin={origin} />
      );
    }

    case TYPE_INTERACTIVE_CHART: {
      const widgetParagraph = item.data as WidgetParagraph;
      return (
        <InView
          config={{ rootMargin: '400px', threshold: 0, triggerOnce: true }}
        >
          {({ isInView }) =>
            (isInView && (
              <>
                <Link
                  path={global?.location?.pathname?.replace(/\/chart.*?/, '')}
                  className={styles.BackButton}
                >
                  <ButtonWithLoading
                    size="small"
                    variant="secondary"
                    iconTypeLeft="IconChevronLeft"
                  >
                    zurück
                  </ButtonWithLoading>
                </Link>
                <ClientSideOnly>
                  <Suspense fallback="">
                    <HighchartsWrapper
                      activeState={1}
                      origin={origin}
                      widgetParagraph={widgetParagraph as any}
                      component={HIGHCHART_INTERACTIVE_CHART}
                    />
                  </Suspense>
                </ClientSideOnly>
              </>
            )) ||
            null
          }
        </InView>
      );
    }

    case TEASER_LAYOUT_TRADING: {
      return <div className={PIANO_TRADING_TEASER_WIDGET} />;
    }

    case TYPE_SIMULATOR: {
      return (
        <>
          <Link
            path={global?.location?.pathname?.replace(/\/simulator.*?/, '')}
            className={styles.BackButton}
          >
            <ButtonWithLoading
              size="small"
              variant="secondary"
              iconTypeLeft="IconChevronLeft"
            >
              zurück
            </ButtonWithLoading>
          </Link>
          <iframe
            key={`iframe-${Math.random()}`}
            title="Simulator"
            width="100%"
            height="530"
            // @ts-ignore
            src={item.data?.link.path}
            allowFullScreen
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </>
      );
    }

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
  appValidDataTypes: [
    TYPE_ESI_WIDGET_PARAGRAPH,
    TYPE_SIMULATOR,
    TYPE_INTERACTIVE_CHART,
  ],
});

export default TeaserGrid;
