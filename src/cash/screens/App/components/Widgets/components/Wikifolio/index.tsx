import React from 'react';
import { useQuery } from '@apollo/client';
import Link from '../../../../../../../common/components/Link';
import { headerMapping } from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { CONFIG } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_WIKIFOLIO } from './queries';
import styles from './styles.legacy.css';
import { QueryResult, WikifolioProps } from './typings';

const Wikifolio = ({ widgetParagraph }: WikifolioProps) => {
  const { isSSR } = useSSRContext();
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const rankingType = url?.searchParams?.get('rankingType').trim();
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  const config = CONFIG[rankingType];

  const { data, error, loading } = useQuery<QueryResult>(GET_WIKIFOLIO, {
    variables: {
      rankingType: config.rankingType,
      limit: 10,
    },
    skip: !rankingType,
  });

  if (!config) {
    return <div>RankingType not defined in Widget Url</div>;
  }

  if (isSSR || error || loading) {
    return <div className={styles.Skeleton}></div>;
  }

  const getValue = (portfolio: Pf) => {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const ranking = portfolio.rankings.find(
      (r) => r.name === config.rankingName,
    );
    if (config.rankingType === 'Capital') {
      return headerMapping.currentPrice.formatter(
        { value: ranking?.value, instrument: { scGrouped: 'FullNumber' } },
        true,
      );
    }
    return headerMapping.perfPercentage.formatter(
      { value: ranking?.value, instrument: null },
      true,
    );
  };

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>{config.title}</p>
      <table className={styles.Table}>
        <thead>
          <tr className={styles.Heading}>
            <th className={styles.Left}>Name</th>
            <th className={styles.Right}>{config.columnTitle}</th>
          </tr>
        </thead>
        <tbody>
          {data?.integration?.wikifolio?.portfolios.map((portfolio) => {
            return (
              <tr key={portfolio.fullquoteUri}>
                <td className={styles.Left}>
                  {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */}
                  <Link path={portfolio.fullquoteUri} className={styles.Link}>
                    {portfolio.shortDescription}
                  </Link>
                </td>
                <td className={styles.Right}>{getValue(portfolio)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Wikifolio;
