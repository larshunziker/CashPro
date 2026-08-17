import React, { useRef } from 'react';
import AutoSuggestSearch from '../../../../../../components/AutoSuggestSearch';
import { portfolioTrade } from '../../../../../../components/PortfolioTradeForm';
import { PORTFOLIO_TRADE_FORM_TYPE_BUY } from '../../../../../../components/PortfolioTradeForm/constants';
import { SEARCH_RESULT_CONFIG } from '../../constants';
import styles from './styles.legacy.css';
import { AddInstrumentsProps } from './typings';

const AddInstrumentToPortfolio = ({
  closeDrawer,
  portfolioKey,
  searchResultWithBorder = false,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'number'. */
  instrumentCount = null,
  searchResultHeight,
  isInsideDrawer = false,
  origin,
}: AddInstrumentsProps) => {
  const searchRef = useRef(null);
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
  const addToPortfolio = (event, listingId) => {
    event.preventDefault();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.clearInputfield();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.closeSearchResult();
    closeDrawer?.();

    portfolioTrade({
      portfolioKey: portfolioKey,
      /* @ts-ignore TODO: TS2322 ->  Type 'number' is not assignable to type 'null | undefined'. */
      instrumentCount,
      instrumentKey: listingId,
      type: PORTFOLIO_TRADE_FORM_TYPE_BUY,
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
      onClickResult={addToPortfolio}
      appInputAriaLabel="Add Instruments"
      searchResultHeight={searchResultHeight}
      isInsideDrawer={isInsideDrawer}
      origin="portfolio"
    />
  );
};

export default AddInstrumentToPortfolio;
