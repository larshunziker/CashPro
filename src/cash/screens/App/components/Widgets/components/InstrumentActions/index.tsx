import React, { ReactElement, memo } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from '@apollo/client';
import { isListingKey } from '../../../../screens/MyCash/components/Portfolio/helpers';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import ButtonWithLoading from '../../../ButtonWithLoading';
import AddToPortfolioButton from '../../../SearchResults/components/IntegrationButtonsWrapper/components/AddToPortfolioButton';
import { selectWatchlistAndAddInstrument } from '../../../../screens/MyCash/components/Watchlist/components/AddInstrumentToWatchlist';
import { alertsFormOverlay } from '../../../AlertsForm';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../AutoUpdateProvider/queries'. '/Users/bhs/code/work/rasch-stack/s */
import { NON_SIX_MARKETS } from '../../../../constants';
/* @ts-ignore*/
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from '../../../AutoUpdateProvider/queries';
import styles from './styles.legacy.css';
import { WidgetParagraphProps } from '../../../Paragraphs/components/WidgetParagraph/typings';
import { QueryResult } from './typings';

const InstrumentActions = ({
  widgetParagraph,
}: WidgetParagraphProps): ReactElement => {
  const navigate = useStableNavigate();
  const location = useLocation();
  const origin = 'instrument-actions';
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  const listingKey =
    url?.searchParams?.get('listingKey') || url?.searchParams?.get('listingId');

  const { data, loading } = useQuery<QueryResult>(
    GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS,
    {
      variables: {
        listingKeys: listingKey,
      },
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. */
      skip: !isListingKey(listingKey),
    },
  );

  const instrument = data?.quoteList?.quoteList?.edges?.[0]?.node;

  if (!instrument || loading) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const { mName, instrumentKey, fullquoteUri, scGrouped, eusipaId, marketId } =
    instrument;

  const mId = marketId || instrumentKey?.split('-')?.[1];
  const disableAlertButton = NON_SIX_MARKETS.includes(`${mId}`);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  const isVisiblePortfolioButton = !['IND', 'INT', 'CUR'].includes(scGrouped);
  const isVisibleSimulatorButton =
    scGrouped === 'DER' &&
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<number> | undefined' is not assignable to parameter of type 'number'. */
    [2100, 2200, 2210].includes(eusipaId) &&
    !location?.pathname?.includes('/simulator');

  return (
    <div className={styles.ButtonsWrapper}>
      {isVisibleSimulatorButton && (
        <ButtonWithLoading
          iconTypeLeft="IconChartArrowUp"
          size="small"
          variant="secondary"
          onClick={() => {
            navigate(`${location.pathname}/simulator`);
          }}
        >
          Simulator
        </ButtonWithLoading>
      )}
      {!disableAlertButton && (
        <ButtonWithLoading
          iconTypeLeft="IconBell"
          size="small"
          variant="secondary"
          onClick={() =>
            alertsFormOverlay({
              alertKey: '',
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              fullquoteUri,
              navigate,
              location,
            })
          }
        >
          Alert
        </ButtonWithLoading>
      )}
      {isVisiblePortfolioButton && (
        <AddToPortfolioButton
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          listingId={instrumentKey}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          instrumentType={scGrouped}
          iconName="IconPieChart"
          origin={origin}
        >
          Portfolio
        </AddToPortfolioButton>
      )}
      <ButtonWithLoading
        iconTypeLeft="IconEye"
        size="small"
        variant="secondary"
        onClick={() => {
          selectWatchlistAndAddInstrument({
            instrumentKey,
            origin,
            instrumentName: mName,
          });
        }}
      >
        Watchlist
      </ButtonWithLoading>
    </div>
  );
};

export default memo<WidgetParagraphProps>(InstrumentActions);
