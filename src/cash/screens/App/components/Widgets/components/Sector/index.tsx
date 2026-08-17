import React from 'react';
import { useQuery } from '@apollo/client';
import SectorTable from './components/SectorTable';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_SECTOR_QUOTES } from './queries';
import styles from './styles.legacy.css';
import { QueryResult, SectorProps } from './typings';

const Sector = ({ widgetParagraph }: SectorProps) => {
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;

  const listingId = url?.searchParams?.get('listingId');
  const secId = url?.searchParams?.get('secId');
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  const encodedSec = encodeURI(path).split('=')[2];
  const sec = decodeURI(encodedSec.replace('&listingId', ''));

  const { data, loading, error } = useQuery<QueryResult>(GET_SECTOR_QUOTES, {
    variables: {
      publication: 'CASH',
      secId,
    },
    skip: !secId,
    ssr: false,
  });

  const instruments =
    data?.getSectorQuotes?.sectorQuotes?.edges.map((edge) => edge.node) || null;

  return (
    <div className={styles.Wrapper} id={'sector-widget-top'}>
      <div className={styles.Title}>{`Branche${
        (sec && `: ${sec}`) || ''
      } `}</div>
      {/* {(loading || error) && <TableRowSkeleton count={10} />}  This caused Hydrate root errors, could not fix!*/}
      {!loading && !error && data && (
        /* @ts-ignore TODO: TS2322 ->  Type 'Instrument[] | null' is not assignable to type 'Instrument[]'. */
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string'. */
        <SectorTable instruments={instruments} activeQuoteKey={listingId} />
      )}
    </div>
  );
};

export default Sector;
