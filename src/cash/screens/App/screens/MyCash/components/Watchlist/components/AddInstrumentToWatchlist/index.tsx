import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMatch } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import { addInstrumentToWatchlist } from '../../helpers';
import Link from '../../../../../../../../../common/components/Link';
import AutoSuggestSearch from '../../../../../../components/AutoSuggestSearch';
import DropdownItem from '../../../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../../../components/Icon';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import { displayInfoToast } from '../../../../../../components/Toast';
import { watchlistCreate } from '../../../../../../components/WatchlistManagementForm';
import modal from '../../../../../../components/Modal';
import { watchlistScreenApolloConfig } from '../../apolloConfig';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
} from '../../../../../../components/Toast/constants';
import { ROUTE_WATCHLIST } from '../../../../../../constants';
import { SEARCH_RESULT_CONFIG } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/sc */
import { ADD_INSTRUMENT_TO_WATCHLIST } from '../../queries';
import styles from './styles.legacy.css';
import { AddInstrumentsProps } from './typings';

type WatchlistSelectionProps = {
  instrumentKey: string;
  instrumentName: string;
  closeOverlay?: () => void;
  withInstrument?: boolean;
  isExternal?: boolean;
  origin?: string;
  drawerRef?: React.MutableRefObject<HTMLDivElement | null>;
  hasStickyHeader?: boolean;
  hasStickyFooter?: boolean;
};

export const WatchlistSelection = ({
  instrumentKey,
  instrumentName,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type '() => void'. */
  closeOverlay = null,
  withInstrument = false,
  isExternal = false,
  origin,
  drawerRef,
  hasStickyHeader,
  hasStickyFooter,
}: WatchlistSelectionProps) => {
  const { query: watchlistQuery, ...watchlistOptions } =
    watchlistScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
      },
    });

  const { loading, error, data } = useQuery(watchlistQuery, watchlistOptions);
  const allWatchlists = data?.watchlists?.items || [];
  const [addInstrumentMutation] = useMutation(ADD_INSTRUMENT_TO_WATCHLIST);
  const isWatchlist = useMatch(`/${ROUTE_WATCHLIST}/*`);
  const isWatchlistOrigin = !!isWatchlist;

  const addNewWatchlistButtonJsx = (
    <div
      className={classNames(styles.DropdownWatchlistLink, styles.NewWatchlist)}
      role="link"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault();
        closeOverlay && !isExternal && closeOverlay();
        watchlistCreate({
          withInstrument,
          instrumentKey,
          instrumentName,
          origin,
        });
      }}
      onKeyDown={(event) => {
        event.preventDefault();
        closeOverlay && !isExternal && closeOverlay();
        watchlistCreate({
          withInstrument,
          instrumentKey,
          instrumentName,
          origin,
        });
      }}
    >
      <Icon type="IconPlus" /> Neue Watchlist anlegen
    </div>
  );

  const stickyHeaderContainer =
    document.getElementById('ModalStickyHeader') || null;

  const stickyFooterContainer =
    document.getElementById('ModalStickyFooter') || null;

  return (
    <div className={styles.DropdownWatchlistWrapper}>
      {(drawerRef?.current &&
        hasStickyHeader &&
        stickyHeaderContainer &&
        createPortal(
          <div className={styles.DropdownWatchlistTitle}>Hinzufügen zu</div>,
          stickyHeaderContainer,
        )) || (
        <div className={styles.DropdownWatchlistTitle}>Hinzufügen zu</div>
      )}
      {loading && <LoadingSpinner width={20} />}
      {!loading && !error && allWatchlists && Array.isArray(allWatchlists) && (
        <>
          {!allWatchlists ||
            (allWatchlists.length === 0 && (
              <div className={styles.NoWatchlist}>
                Erstellen Sie Ihre erste Watchlist
              </div>
            ))}
          {allWatchlists.map((watchlist) => {
            return (
              <DropdownItem key={`watchlist-item-${watchlist?.watchlistKey}`}>
                <Link
                  className={styles.DropdownWatchlistLink}
                  onClick={(event) => {
                    event.preventDefault();
                    closeOverlay?.();
                    addInstrumentToWatchlist({
                      watchlistKey: watchlist.watchlistKey,
                      instrumentKey,
                      instrumentName,
                      addInstrumentMutation,
                      isWatchlistOrigin,
                      origin,
                    });
                  }}
                >
                  <span>{watchlist.name}</span>
                  {watchlist.defaultPortfolio && (
                    <Icon type="IconFavouriteFill" />
                  )}
                </Link>
              </DropdownItem>
            );
          })}
        </>
      )}
      {(drawerRef?.current &&
        hasStickyFooter &&
        stickyFooterContainer &&
        createPortal(
          <>{addNewWatchlistButtonJsx}</>,
          stickyFooterContainer,
        )) || <>{addNewWatchlistButtonJsx}</>}
    </div>
  );
};

// for fibox calls to use
export const selectWatchlistAndAddInstrument = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentName' implicitly has an 'any' type. */
  instrumentName,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
}) => {
  const token = Auth0.getIdToken();
  if (!token) {
    displayInfoToast(
      AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
      AUTHORIZATION_ERROR_ID,
      {
        text: 'Hier einloggen oder registrieren.',
        onClick: () => Auth0.login(),
      },
    );
    return;
  }
  return modal({
    type: 'drawer',
    hasStickyHeader: true,
    hasStickyFooter: false,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'hasStickyHeader' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'hasStickyFooter' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef, hasStickyHeader, hasStickyFooter }) => {
      return (
        <WatchlistSelection
          instrumentKey={instrumentKey}
          instrumentName={instrumentName}
          withInstrument={true}
          closeOverlay={close}
          isExternal={true}
          origin={origin}
          drawerRef={drawerRef}
          hasStickyHeader={hasStickyHeader}
          hasStickyFooter={hasStickyFooter}
        ></WatchlistSelection>
      );
    },
  });
};

const AddInstrumentToWatchlist = ({
  closeDrawer,
  watchlistKey,
  searchResultWithBorder = false,
  searchResultHeight,
  isInsideDrawer = false,
  origin,
}: AddInstrumentsProps) => {
  const searchRef = useRef(null);

  const [addInstrumentToWatchlistMutation] = useMutation(
    ADD_INSTRUMENT_TO_WATCHLIST,
  );

  const isWatchlist = useMatch(`/${ROUTE_WATCHLIST}/*`);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'name' implicitly has an 'any' type. */
  const addToWatchlist = (event, listingId, name) => {
    event.preventDefault();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.clearInputfield();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.closeSearchResult();
    closeDrawer?.();

    addInstrumentToWatchlist({
      watchlistKey,
      instrumentKey: listingId,
      instrumentName: name,
      addInstrumentMutation: addInstrumentToWatchlistMutation,
      isWatchlistOrigin: !!isWatchlist,
      origin,
    });
  };

  return (
    <AutoSuggestSearch
      ref={searchRef}
      searchResultConfig={SEARCH_RESULT_CONFIG}
      placeholderStyle={styles.InputIcon}
      resultWithBorder={searchResultWithBorder}
      placeholder="Instrument hinzufügen"
      onClickResult={addToWatchlist}
      appInputAriaLabel="Add Instruments"
      searchResultHeight={searchResultHeight}
      isInsideDrawer={isInsideDrawer}
      origin="watchlist"
    ></AutoSuggestSearch>
  );
};

export default AddInstrumentToWatchlist;
