import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/client';
import classnames from 'classnames';
import { formatPrice } from '../../../Highcharts/helpers';
import { getSearchParams } from '../../helpers';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { headerMapping } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { MARKETPLACES_LIMIT } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_QUOTE_ALTERNATIVE_MARKETS } from './queries';
import styles from './styles.legacy.css';
import { InstrumentMarketPlacesProps, QueryResult } from './typings';

const TableRowSkeleton = () => (
  <>
    {new Array(MARKETPLACES_LIMIT).fill(0).map((_, index) => (
      <tr className={styles.TableRow} key={index}>
        <td className={styles.Skeleton}>
          <span />
        </td>
        <td className={classnames(styles.Skeleton, styles.Right)}>
          <span />
        </td>
        <td className={classnames(styles.Skeleton, styles.Right)}>
          <span />
        </td>
        <td className={classnames(styles.Skeleton, styles.Right)}>
          <span />
        </td>
      </tr>
    ))}
  </>
);

const InstrumentMarketPlaces = ({
  widgetParagraph,
}: InstrumentMarketPlacesProps) => {
  const { isSSR } = useSSRContext();
  const [showMore, setShowMore] = useState(false);
  const searchParams = getSearchParams(widgetParagraph);
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"valor"' can't be used to index type '{ config */
  const valor = searchParams['valor'];
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"scGrouped"' can't be used to index type '{ config */
  const scGrouped = searchParams['scGrouped'];

  const { data, loading, error } = useQuery<QueryResult>(
    GET_QUOTE_ALTERNATIVE_MARKETS,
    {
      variables: {
        publication: 'CASH',
        valor,
        scGrouped,
      },
      skip: !valor || !scGrouped,
    },
  );

  const items = data?.getInstrumentsByValor?.items?.filter(
    (item) => Number(item.lval) > 0,
  );

  const isLoading = loading || !!error;

  if (isSSR || (!isLoading && !items)) {
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>Börsenplätze</p>
      <table>
        <thead>
          <tr>
            <th className={styles.TableHead}>Börse</th>
            <th className={classnames(styles.TableHead, styles.Right)}>Whg.</th>
            <th className={classnames(styles.TableHead, styles.Right)}>+/-%</th>
            <th className={classnames(styles.TableHead, styles.Right)}>
              Umsatz
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <TableRowSkeleton />}
          {items?.map((item, index) => {
            if (!showMore && index >= MARKETPLACES_LIMIT) {
              return null;
            }

            return (
              <tr key={item.market} className={styles.TableRow}>
                <td className={styles.TableValue}>
                  <Link path={item.fullquoteUri}>{item.market}</Link>
                </td>
                <td className={classnames(styles.TableValue, styles.Right)}>
                  <span>{item.mCur}</span>
                </td>
                <td className={classnames(styles.TableValue, styles.Right)}>
                  <span>
                    {headerMapping['iNetVperprVPr'].formatter({
                      value: item.iNetVperprVPr,
                      instrument: {},
                    })}
                  </span>
                </td>
                <td className={classnames(styles.TableValue, styles.Right)}>
                  {/* @ts-ignore TODO: TS2345 ->  Argument of type '"FullNumber"' is not assignable to parameter of type 'null | undefined'. */}
                  <span>{formatPrice(item.tur, 'FullNumber')}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
      {items?.length > MARKETPLACES_LIMIT && (
        <div className={styles.ButtonWrapper}>
          <button
            className={styles.CollapseButton}
            onClick={() => setShowMore(!showMore)}
          >
            <span>
              {(showMore && 'Weniger anzeigen') || 'Mehr anzeigen'}
              <Icon type={showMore ? 'IconChevronUp' : 'IconChevronDown'} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default memo<InstrumentMarketPlacesProps>(InstrumentMarketPlaces);
