import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listIdsStateSelector from '../../../../../../../shared/selectors/listIdsStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import {
  addItemsToList,
  removeItemsFromList,
} from '../../../../../../shared/actions/listIds';
import InputField from '../../../../components/Paragraphs/components/WebformParagraph/components/InputField';
import styles from './styles.legacy.css';
import { ListCheckboxProps } from './typings';

// global lastCheckedId is used to keep track of the last checked checkbox
/* @ts-ignore TODO: TS7034 ->  Variable 'lastCheckedId' implicitly has type 'any' in some locations where its type cannot be determined. */
let lastCheckedId = null;

const DATA_LOCATOR_PREFIX = 'checkbox';

const getItemsBetweenTwoIndexes = (
  items: Array<any>,
  start: string,
  end: string,
) => {
  const startIndex = items.indexOf(start);
  const endIndex = items.indexOf(end);

  const itemsBetween =
    startIndex < endIndex
      ? items.slice(startIndex, endIndex + 1)
      : items.slice(endIndex, startIndex + 1);

  return itemsBetween.map((item) => item.split('-')[1]);
};

const ListCheckbox = ({ list, id = '' }: ListCheckboxProps) => {
  const val =
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    useSelector((state) => listIdsStateSelector(state)?.[list]).indexOf(id) >
    -1;
  const isRouteLoading = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state)?.loading,
  );
  const dispatch = useDispatch();

  /* @ts-ignore TODO: TS7006 ->  Parameter 'id' implicitly has an 'any' type. */
  const handleChange = (id) => {
    if (!val) {
      dispatch(addItemsToList({ items: [id], listName: list }));
    } else {
      dispatch(removeItemsFromList({ items: [id], listName: list }));
    }

    return val;
  };

  if (!id) {
    return null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
  function handleShiftClick(e) {
    if (e.shiftKey) {
      const checkboxes = document.querySelectorAll(
        `[data-locator*="${DATA_LOCATOR_PREFIX}-"] input`,
      );

      const ids = Array.from(checkboxes).map((checkbox) => checkbox.id);

      const inBetweenIds = getItemsBetweenTwoIndexes(
        ids,
        /* @ts-ignore TODO: TS7005 ->  Variable 'lastCheckedId' implicitly has an 'any' type. */
        lastCheckedId,
        e.target.id,
      );

      if (e.target.checked) {
        dispatch(addItemsToList({ items: inBetweenIds, listName: list }));
      } else {
        dispatch(removeItemsFromList({ items: inBetweenIds, listName: list }));
      }
    }

    lastCheckedId = e.target.id;
  }

  return (
    <div
      className={styles.CheckboxWrapper}
      data-locator={`${DATA_LOCATOR_PREFIX}-${id}`}
      onClick={handleShiftClick}
      onKeyDown={() => null}
      role="button"
      tabIndex={0}
    >
      <InputField
        id={`${list}-${id}`}
        type="checkbox"
        key={`${list}-${id}-${val}`} // to force an update of the value, because the Checkbox is used outside of a form
        disabled={isRouteLoading}
        initialValue={val}
        handleChange={() => handleChange(id)}
        errorMessage=""
        title=""
        fieldName={`list-checkbox-${list}-${id}`}
        value={val ? 'true' : 'false'}
        getValue={() => null}
        getId={() => null}
        register={() => ''}
        required={false}
        validate={() => null}
      />
    </div>
  );
};

export default ListCheckbox;
