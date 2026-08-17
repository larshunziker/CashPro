import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import Link from '../../../../../../../common/components/Link';
import Helmet from '../../../../../../../handelszeitung/screens/App/components/Helmet';
import Table from '../../../../screens/MyCash/components/Table';
import AutoSuggestSearch from '../../../AutoSuggestSearch';
import Icon from '../../../Icon';
import { apolloConfig } from './apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { CHART_COMPARISION_HASH } from '../../../../../../shared/constants/chartOverlay';
import { CHART_COMPARISON_TABLE } from '../../../../screens/MyCash/components/Table/constants';
import { CHART_COMPARISON_ORIGIN, TABLE_HEADERS } from './constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'currentListingId' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'listingIds' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
const ChartComparison = ({ currentListingId, listingIds, location }) => {
  const navigate = useStableNavigate();
  const listingIdRef = useRef(listingIds);
  const ref = useRef(null);
  const maxComparableItems = 7;
  const isMaxComparableItems = listingIds.length >= maxComparableItems;
  const queryConfig = apolloConfig.options({
    params: {
      listingKeys: listingIdRef?.current?.join?.(',') || '',
    },
  });
  const { data } = useQuery(queryConfig.query, {
    variables: queryConfig.variables,
  });

  const tableData = JSON.parse(
    JSON.stringify({
      items: data
        ? Object.values(
            /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
            data?.quoteList?.quoteList?.edges?.map(({ node }) => node) || [],
          )
        : [],
    }),
  );

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
  const addToCompare = (event, listingId) => {
    event.preventDefault();
    listingIds.push(listingId);
    /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
    listingIds = listingIds.filter((id) => id !== currentListingId);
    const newPath =
      location.pathname +
      `?comparisons=${listingIds.join(',')}${CHART_COMPARISION_HASH}`;

    // reset colors
    /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    const colorIndexMap = listingIds.reduce((acc, listingId, index) => {
      acc[listingId] = index + 1;
      return acc;
    }, {});
    // @ts-ignore
    window.chartUpdateColors(colorIndexMap);
    navigate(newPath);
    return null;
  };

  return (
    <div className={styles.Wrapper}>
      <Helmet
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      ></Helmet>
      <div className={styles.Title}>
        Chartvergleich
        <Link
          className={styles.ClearLink}
          path={`${location.pathname}${CHART_COMPARISION_HASH}`}
        >
          <span className={styles.Label}>Vergleich löschen</span>
          <Icon type="IconTrash" />
        </Link>
      </div>

      <div className={styles.FormWrapper}>
        <AutoSuggestSearch
          ref={ref}
          onClickResult={addToCompare}
          appInputAriaLabel={'Chart Comparison'}
          showErrorMessage={isMaxComparableItems}
          placeholder={'Suche nach Name, Symbol oder Valor'}
          isDisabled={isMaxComparableItems}
          placeholderStyle={styles.InputIcon}
          errorMessage="Maximal verfügbare Vergleiche erreicht."
          searchResultHeight={250}
          origin="chart-comparison"
        ></AutoSuggestSearch>
      </div>

      {tableData?.items?.length > 0 && (
        <Table
          data={tableData}
          component={CHART_COMPARISON_TABLE}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
          isDirtySortTableRef={null}
          groupType={'no-grouping'}
          type={'chart-comparison'}
          origin={CHART_COMPARISON_ORIGIN}
          tableHeaders={TABLE_HEADERS}
          location={location}
        />
      )}
    </div>
  );
};

export default ChartComparison;
