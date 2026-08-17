import React from 'react';
import { useSelector } from 'react-redux';
import compose from 'recompose/compose';
import {
  breadcrumbItems,
  enrichBody,
  getFullquoteHelmetNode,
} from '../../../FullquotePage/helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../../../shared/decorators/withParams';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import TeaserGrid from '../../../../components/TeaserGrid';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import { items } from '../../items';
import {
  GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART,
  GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART_HYBRID,
} from '../../../../components/TeaserGrid/gridConfigs/constants';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../../../shared/constants/structuredData';
import styles from './styles.legacy.css';
import { FullquotePageProps } from '../../typings';
import { BreadcrumbsItems } from '../../../../../../../common/components/Breadcrumbs/typings';

const ChartIntegration = ({
  data,
  location,
  valorName,
  market,
  currency,
}: FullquotePageProps) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const fullquotePage = (data?.getFullquotePage ?? {}) as unknown as Record<
    string,
    any
  >;

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const fullQuoteType = location.pathname.split(`/${valorName}`)?.[0];
  const itemCopy = structuredClone(items);
  const gridLayout =
    (isHybridApp && GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART_HYBRID) ||
    GRID_LAYOUT_FULLQUOTE_INTERACTIVE_CHART;
  const gridItems: any =
    Array.isArray(items[gridLayout]) &&
    itemCopy[gridLayout].map((item: any) => {
      item = enrichBody({
        body: item,
        data: {
          ...fullquotePage,
          valorName,
          market,
          currency,
          pageType: fullQuoteType.slice(1),
        },
      });
      return item;
    });

  const interactivBreadCrumbs = (): BreadcrumbsItems => {
    const fullquoteItems = breadcrumbItems(fullquotePage);
    fullquoteItems.count += 1;
    fullquoteItems.totalCount += 1;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const len = fullquoteItems.edges.length;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    fullquoteItems.edges[len - 1].node.link =
      global?.location?.pathname?.replace(/\/chart.*?/, '');
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    fullquoteItems.edges.push({
      node: { id: 'chart', link: null, label: 'Chart' },
    });
    return fullquoteItems;
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.PullOutWrapper}>
        <div className={styles.Breadcrumbs}>
          <Breadcrumbs
            pageUrl={location.pathname}
            items={interactivBreadCrumbs()}
          />
        </div>
        <TeaserGrid items={gridItems} layout={gridLayout} />
      </div>
    </div>
  );
};

export default compose<any, any>(
  withParams,
  withHelmet({
    getNode: getFullquoteHelmetNode,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
)(ChartIntegration);
