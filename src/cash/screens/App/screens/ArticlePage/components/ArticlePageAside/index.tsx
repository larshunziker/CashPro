import React, { Suspense, useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { getRangeByActiveTab } from '../../../../components/Highcharts/helpers';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import InView from '../../../../../../../common/components/InView';
import Link from '../../../../../../../common/components/Link';
import AppNexus from '../../../../components/AppNexus';
import ContentBox from '../../../../components/ContentBox';
import EditorialPicks from '../../../../components/EditorialPicks';
import EsiRenderer from '../../../../components/EsiRenderer';
import HighchartsWrapper from '../../../../components/Highcharts';
import MarketTable from '../../../../components/MarketTable';
import DividendCalendar from '../../../../components/Widgets/components/DividendCalendar';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import { PIANO_CONTAINER_ARTICLE_ASIDE } from '../../../../../../../shared/constants/piano';
import { PUBLICATION_GROUP_CASH } from '../../../../../../../shared/constants/publications';
import {
  DETAILS_AD_1,
  SIDE_RIGHT_AD_1,
} from '../../../../components/AppNexus/constants';
import { HIGHCHART_LINE_CHART } from '../../../../components/Highcharts/constants';
import { SuppressAdsContext } from '../../../../constants';
import { ARTICLE_ASIDE_ORIGIN } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticlePageAsideProps } from './typings';

const ArticlePageAside = ({ article }: ArticlePageAsideProps) => {
  const { isAdSuppressed } = useContext(SuppressAdsContext);
  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state).isHybridApp,
  );
  const valorNrListWithNames = {};
  const valorNrList = article?.valors?.edges
    ?.map((valor) => {
      const valorNr = valor?.node?.valorNumber;
      const currencyId = valor?.node?.valorCurrency?.originalId;
      const marketId = valor?.node?.valorStockExchange?.originalId;

      if (!valorNr || !currencyId || !marketId) {
        return;
      }
      const listingKeys = `${valorNr}-${marketId}-${currencyId}`;

      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      valorNrListWithNames[listingKeys] = valor?.node?.valorName;

      return listingKeys;
    })
    .filter((item) => item)
    .join(',');

  return (
    <div
      className={classNames(
        styles.Wrapper,
        grid.ColXs24,
        grid.ColMd9,
        grid.ColXl8,
        grid.HideForPrint,
      )}
    >
      {/* POSITION 1 - Valor chart & list */}
      {valorNrList && (
        <>
          {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */}
          <Link path={article?.valors?.edges?.[0]?.node?.fullquoteUrl}>
            <div
              className={classNames(styles.ItemWrapperBorder, styles.ItemChart)}
            >
              <div className={styles.Title}>
                {article?.valors?.edges?.[0]?.node?.valorName}
              </div>
              <InView
                config={{
                  rootMargin: '400px',
                  threshold: 0,
                  triggerOnce: true,
                }}
              >
                {({ isInView }) =>
                  (isInView && (
                    <ClientSideOnly>
                      <Suspense fallback="">
                        <HighchartsWrapper
                          key={valorNrList}
                          isInterActiveButtonVisible={false}
                          isTabVisible={false}
                          widgetParagraph={{
                            timePeriodValues: ['threeMonths'],
                            link: {
                              path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/charts-json/timeserie/${
                                valorNrList.split(',')[0]
                              }/${getRangeByActiveTab['threeMonths']}`,
                            },
                          }}
                          origin="cash-article-aside"
                          component={HIGHCHART_LINE_CHART}
                        />
                      </Suspense>
                    </ClientSideOnly>
                  )) ||
                  null
                }
              </InView>
            </div>
          </Link>
          <div
            key={valorNrList}
            className={classNames(
              styles.ItemWrapperBorder,
              styles.ItemWrapperPadding,
              styles.ItemWrapperPaddingBottom,
            )}
          >
            <MarketTable
              instrumentKeys={valorNrList}
              fallbackNames={valorNrListWithNames}
            />
          </div>
        </>
      )}
      {/* POSITION 2 - UBS product matching (Cash hybrid app only; web booking ended 2026) */}
      {isHybridApp && valorNrList && (
        <div
          className={classNames(
            styles.ItemWrapperBorder,
            styles.ItemWrapperPadding,
          )}
        >
          <EsiRenderer
            esiSrc={`${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/integrations/news_artikel_produkt_matching/UBS/${
              valorNrList.split(',')[0]
            }`}
            publication="cash"
          />
        </div>
      )}
      {/* POSITION 3 - Ad slot (mrhpa) */}
      {!isAdSuppressed && (
        <>
          <div
            className={classNames(
              'ad-wrapper',
              styles.ItemWrapperBorder,
              styles.Ad,
              `ad-wrapper-tabletDesktop`,
            )}
          >
            <AppNexus
              slot={SIDE_RIGHT_AD_1}
              isMultiPlacement
              deviceType="tabletDesktop"
            />
          </div>
          <div
            className={classNames(
              'ad-wrapper',
              styles.ItemWrapperBorder,
              styles.Ad,
              `ad-wrapper-mobile`,
            )}
          >
            <AppNexus
              slot={DETAILS_AD_1}
              isMultiPlacement
              deviceType="mobile"
            />
          </div>
        </>
      )}
      {/* POSITION 4 - Piano template */}
      <div
        className={classNames(
          PIANO_CONTAINER_ARTICLE_ASIDE,
          styles.PianoIntegrationWrapper,
        )}
      />
      {/* POSITION 5 - Editorial Picks Content Box */}
      <div>
        <EditorialPicks
          contentBoxTitle={'EditorialBox'}
          origin={ARTICLE_ASIDE_ORIGIN}
          publication={PUBLICATION_GROUP_CASH}
          overwriteTitleWithShortTitle
        />
      </div>
      {/* POSITION 6 - Dividend Calendar */}

      <div className={styles.DividendCalendarWrapper}>
        <DividendCalendar
          origin={'articleAside'}
          widgetParagraph={{ title: 'Dividenden-Kalender' }}
        />
      </div>

      {/* POSITION 7 - Most Read Content Box -(sticky bottom) */}
      <div className={classNames(styles.MostReadBoxWrapper, styles.Sticky)}>
        <ContentBox
          component="tabs"
          node={{
            __typename: 'ContentBox',
            id: 'bm9kZTo1MDM0Mg==',
            title: 'News',
            hideTitle: false,
            contentSourceValue: 'tabs',
            linkLabel: null,
            body: [
              {
                // @ts-ignore
                __typename: 'TabParagraph',
                id: 'cGFyYWdyYXBoOnRhYjoyMTYwOTI6Mjk2NjM3',
                title: null,
                style: 'numbered_list',
                sortBy: 'most_read',
                linkLabel: null,
                mode: 'automatic',
                termReference: null,
                items: {
                  __typename: 'NodeInterfaceConnection',
                  edges: [],
                },
              },
            ],
            termReference: null,
            useNativeAdvertising: false,
            items: {
              __typename: 'NodeInterfaceConnection',
              edges: [],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ArticlePageAside;
