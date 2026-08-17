import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import {
  getRenderErrorWasShown,
  setWidgetRenderErrorWasShown,
} from '../../../../shared/helpers/widgetRenderError';
import { setInstrumentKeysAnonymous } from '../../../../shared/actions/autoUpdate';
import Skeleton from '../Skeleton';
import { headerMapping } from '../../screens/MyCash/components/Table/components/headerMapping';
import { displayErrorToast } from '../Toast';
import { WIDGET_RENDER_ERROR_MESSAGE } from '../EsiRenderer/constants';
import { MARKET_TABLE_ORIGIN, MARKET_TABLE_OVERWRITE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_MARKET_TABLE_DATA } from './queries';
import styles from './styles.legacy.css';
import { MarketTableProps } from './typings';

const fallbackInstrumentKeyList =
  '998089-4-1,998750-4-1,846480-353-814,998032-830-814,998313-75021-333,985336-1135-333,897789-148-1,275000-148-1,1190007-244-1,274207-2913-333,274702-176-333,999999915312-9910014-333';

const TableRowSkeleton = ({ count = 1 }) => {
  const repeat = new Array(count).fill(0);

  return (
    <>
      {repeat.map((_, index) => (
        <tr key={index} className={styles.Skeleton}>
          <td className={styles.TrendArrow}></td>
          <td className={styles.Name}>
            <span>&nbsp;</span>
          </td>
          <td className={styles.Price}>
            <span>&nbsp;</span>
          </td>
          <td className={styles.Percentage}>
            <span>&nbsp;</span>
          </td>
        </tr>
      ))}
    </>
  );
};

const MarketTable = ({
  widgetParagraph,
  instrumentKeys = fallbackInstrumentKeyList,
  fallbackNames = {},
  isExtended = false,
}: MarketTableProps) => {
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | URL'. */
  const url = widgetParagraph && new URL(widgetParagraph.link.path);
  const listingKeys =
    instrumentKeys ||
    url?.searchParams.get('instrumentKeys') ||
    fallbackInstrumentKeyList;

  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_MARKET_TABLE_DATA, {
    variables: {
      listingKeys,
    },
  });

  if (error && !getRenderErrorWasShown()) {
    setWidgetRenderErrorWasShown();
    displayErrorToast(WIDGET_RENDER_ERROR_MESSAGE, 'esi-widget-error');
  }

  const marketTableEdges = data?.quoteList?.quoteList?.edges;
  // Memoize so the auto-update dispatch below only fires when the underlying
  // instruments actually change, not on every render. An unmemoized value here
  // dispatches on each render and, together with the open/closed reclassification
  // in AutoUpdateProvider, causes a request flood.
  const listingKeysForAutoupdate = useMemo(
    () =>
      marketTableEdges && marketTableEdges.length > 0
        ? marketTableEdges
            .filter((edge: any) => !!edge.node)
            .map(({ node }: any) => ({
              listingKey: node.instrumentKey,
              isMarketOpen: node.isMarketOpen,
            }))
        : null,
    [marketTableEdges],
  );

  useEffect(() => {
    if (listingKeysForAutoupdate) {
      dispatch(setInstrumentKeysAnonymous(listingKeysForAutoupdate));
    }
  }, [dispatch, listingKeysForAutoupdate]);

  return (
    <div className={styles.Wrapper}>
      {isExtended && <h2 className={styles.Title}>Marktübersicht</h2>}
      <Skeleton show={!!error} />
      <table className={styles.MarketTable}>
        <thead>
          <tr>
            <th className={styles.TrendArrow}></th>
            <th className={styles.Name}>Name</th>
            <th className={styles.Price}>Aktuell</th>
            <th className={styles.Percentage}>+/-%</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <TableRowSkeleton count={instrumentKeys?.split(',').length} />
          )}
          {!loading &&
            data?.quoteList?.quoteList?.edges
              ?.filter((edge: any) => !!edge.node)
              ?.map(({ node }: { node: Instrument }) => {
                const updatedNodeforMNameOverwrite = {
                  ...node,
                  mName:
                    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
                    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
                    MARKET_TABLE_OVERWRITE?.[node?.instrumentKey]?.name ||
                    node.mName ||
                    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
                    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
                    fallbackNames?.[node?.instrumentKey],
                  fullquoteUri:
                    /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
                    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
                    MARKET_TABLE_OVERWRITE?.[node?.instrumentKey]?.link ||
                    node.fullquoteUri,
                };
                return (
                  <tr
                    key={`market-table-row-${node?.instrumentKey}-${node.id}`}
                  >
                    <td className={styles.TrendArrow}>
                      {headerMapping['trendArrowPerfPercentage'].formatter({
                        value: node?.perfPercentage,
                        instrument: node,
                      })}
                    </td>
                    <td className={styles.Name}>
                      {headerMapping['mName'].formatter({
                        value: updatedNodeforMNameOverwrite?.mName,
                        instrument: updatedNodeforMNameOverwrite,
                        origin: MARKET_TABLE_ORIGIN,
                      })}
                      <p>
                        <span>
                          {headerMapping['trendArrowPerfPercentage'].formatter({
                            value: node?.perfPercentage,
                            instrument: node,
                          })}
                        </span>
                        <span>
                          {headerMapping['mCur'].formatter({
                            value: node?.mCur,
                            instrument: node,
                          })}
                        </span>
                        <span>
                          {headerMapping['market'].formatter({
                            value: node?.market,
                          })}
                        </span>
                      </p>
                    </td>
                    <td className={styles.Price}>
                      {headerMapping['currentPrice'].formatter({
                        value: node?.currentPrice,
                        instrument: node,
                      })}

                      <p>
                        <span>
                          {headerMapping['lvalDatetime'].formatter({
                            value: node?.lvalDatetime,
                            instrument: node,
                          })}
                        </span>
                      </p>
                    </td>

                    <td className={styles.Percentage}>
                      {headerMapping['perfPercentage'].formatter({
                        value: node?.perfPercentage,
                        instrument: node,
                      })}
                      <p>
                        <span>
                          {headerMapping['iNetVperprV'].formatter({
                            value: node?.iNetVperprV,
                            instrument: node,
                          })}
                        </span>
                      </p>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo<MarketTableProps>(MarketTable);
