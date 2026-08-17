import React, { useRef } from 'react';
import { useStableNavigate } from '../../../../../../../../../../shared/hooks/useStableNavigateContext';
import AutoSuggestSearch from '../../../../../../../components/AutoSuggestSearch';
import { alertsFormOverlay } from '../../../../../../../components/AlertsForm';
import { SEARCH_RESULT_CONFIG } from '../../../constants';
import styles from './styles.legacy.css';
import { AddInstrumentsProps } from './typings';

const AddInstrumentToAlerts = ({
  closeDrawer,
  searchResultWithBorder = false,
  searchResultHeight,
  isInsideDrawer = false,
}: AddInstrumentsProps) => {
  const navigate = useStableNavigate();
  const searchRef = useRef(null);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'listingId' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  const addToAlerts = (event, listingId, title, item) => {
    event.preventDefault();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.clearInputfield();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    searchRef.current.closeSearchResult();
    closeDrawer?.();

    alertsFormOverlay({
      alertKey: '',
      fullquoteUri: item?.link,
      navigate,
      location,
    });
  };

  return (
    <AutoSuggestSearch
      ref={searchRef}
      searchResultConfig={SEARCH_RESULT_CONFIG}
      placeholderStyle={styles.InputIcon}
      resultWithBorder={searchResultWithBorder}
      placeholder="Instrument hinzufügen"
      onClickResult={addToAlerts}
      appInputAriaLabel="Add Instruments"
      searchResultHeight={searchResultHeight}
      isInsideDrawer={isInsideDrawer}
      origin="alerts"
    />
  );
};

export default AddInstrumentToAlerts;
