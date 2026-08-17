import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import { enableAutoFocus } from '../../../../../../components/AutoSuggestSearch/helpers';
import { handleDeleteAlert } from '../../helpers';
import listIdsStateSelector from '../../../../../../../../../shared/selectors/listIdsStateSelector';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import {
  addItemsToList,
  clearListByName,
} from '../../../../../../../../shared/actions/listIds';
import { setLoading } from '../../../../../../../../shared/actions/route';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import Dropdown from '../../../../../../components/Dropdown';
import DropdownItem from '../../../../../../components/Dropdown/components/DropdownItem';
import Icon from '../../../../../../components/Icon';
import AddInstrumentToAlerts from './AddInstrumentToAlerts';
import modal from '../../../../../../components/Modal';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/sc */
import { DELETE_ALERTS } from '../../queries';
import styles from './styles.legacy.css';

type FilterOptionValue = 'none' | 'all' | 'active' | 'expired' | 'broken';

const SELECT_FILTER_OPTIONS: { label: string; value: FilterOptionValue }[] = [
  {
    label: 'Keine',
    value: 'none',
  },
  {
    label: 'Alle',
    value: 'all',
  },
  {
    label: 'Ausgelöste Alerts',
    value: 'broken',
  },
  {
    label: 'Abgelaufene Alerts',
    value: 'expired',
  },
  {
    label: 'Aktive Alerts',
    value: 'active',
  },
];

/* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
const AlertActions = ({ items }) => {
  const itemsRef = useRef([]);
  const isRouteLoading = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state)?.loading,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const isLoading = isRouteLoading && isDeleting; // added additional loading state to prevent loading spinner from showing up when the sorting is changes (thus triggering the redux loading state to be true)

  const alertKeyList = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => listIdsStateSelector(state)?.['alerts'],
  );
  const dispatch = useDispatch();
  const [deleteAlertMutation] = useMutation(DELETE_ALERTS);

  const [alertSelectFilter, setAlertSelectFilter] =
    useState<FilterOptionValue>('none');

  itemsRef.current = items || [];
  useEffect(() => {
    const listIds = itemsRef.current
      .filter((item) => {
        if (alertSelectFilter === 'none' || !alertSelectFilter) {
          return false;
        } else if (alertSelectFilter === 'broken') {
          /* @ts-ignore TODO: TS2339 ->  Property 'status' does not exist on type 'never'. */
          return item?.status === 'BROKEN';
        } else if (alertSelectFilter === 'active') {
          /* @ts-ignore TODO: TS2339 ->  Property 'status' does not exist on type 'never'. */
          return item?.status === 'ACTIVE';
        } else if (alertSelectFilter === 'expired') {
          return (
            new Date().setHours(0, 0, 0, 0) >=
            /* @ts-ignore TODO: TS2339 ->  Property 'expiration' does not exist on type 'never'. */
            new Date(item.expiration).getTime()
          );
        } else {
          return true;
        }
      })
      ?.map((item) => {
        /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type 'never'. */
        return item?.id;
      });

    dispatch(addItemsToList({ items: listIds, listName: 'alerts' }));

    // reset alert list ids when component unmounts
    return () => {
      dispatch(clearListByName('alerts'));
    };
  }, [dispatch, alertSelectFilter]);

  // reset filter if no item is selected
  useEffect(() => {
    if (alertKeyList.length === 0) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'SetStateAction<FilterOptionValue>'. */
      setAlertSelectFilter(null);
    }
  }, [alertKeyList]);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const handleIconClick = (event) => {
    if (
      (event.type === 'keydown' && event.key === 'Enter') ||
      event.type === 'click'
    ) {
      if (alertKeyList.length > 0) {
        setAlertSelectFilter('none');
      } else {
        setAlertSelectFilter('all');
      }
    }
  };

  const handleDeleteAlerts = () => {
    if (alertKeyList.length > 0) {
      modal({
        title: 'Ausgewählte Alerts löschen',
        closeOnClickOutside: false,
        closeOnLocationChange: true,
        content: `Sind Sie sicher, dass Sie alle ausgewählten Alerts löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`,
        buttons: [
          {
            children: 'Abbrechen',
          },
          {
            variant: 'secondary',
            children: 'Löschen',
            iconTypeLeft: 'IconTrash',
            onClick: () => {
              handleDeleteAlert({
                alertKey: alertKeyList.join(','),
                deleteAlertMutation,
                startLoadingCallback: () => {
                  setIsDeleting(true);
                  dispatch(setLoading(true));
                },
                stopLoadingCallback: () => {
                  dispatch(setLoading(false));
                  setIsDeleting(false);
                  dispatch(clearListByName('alerts'));
                },
              });
            },
          },
        ],
      });
    }
  };

  return (
    <div className={styles.AlertActionsWrapper}>
      <div
        className={classNames(styles.SelectCheckbox, {
          [styles.SelectCheckboxActive]:
            (alertSelectFilter !== 'none' && alertKeyList.length > 0) ||
            alertKeyList.length > 0,
          [styles.SelectCheckboxDisabled]:
            isLoading || itemsRef?.current?.length === 0,
        })}
        tabIndex={0}
        role="button"
        onClick={handleIconClick}
        onKeyDown={handleIconClick}
      >
        <Icon
          addClass={styles.SelectCheckboxIcon}
          type={
            itemsRef.current?.length !== alertKeyList?.length
              ? 'MinusThin'
              : 'IconCheck'
          }
        />
      </div>

      <Dropdown
        iconTypeRight="IconChevronDown"
        iconTypeRightActive="IconChevronUp"
        variant="secondary"
        size="small"
        loading={isLoading}
        isDisabled={itemsRef?.current?.length === 0}
      >
        <>
          {SELECT_FILTER_OPTIONS.map((item, index) => {
            return (
              <DropdownItem key={`dropdown-item-${index}`} label={item.label}>
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                {({ label, setIsOpen }) => (
                  <div
                    className={styles.DropdownItem}
                    role="link"
                    tabIndex={0}
                    onClick={(event) => {
                      event.preventDefault();
                      setAlertSelectFilter(item.value);
                      setIsOpen(false);
                    }}
                    onKeyDown={(event) => {
                      event.preventDefault();
                      setAlertSelectFilter(item.value);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </div>
                )}
              </DropdownItem>
            );
          })}
        </>
      </Dropdown>
      <ButtonWithLoading
        tabIndex={0}
        size="small"
        loading={isLoading}
        addClass={classNames({
          [styles.ButtonDeleteDisabled]: alertKeyList.length === 0 || isLoading,
        })}
        onClick={handleDeleteAlerts}
        ariaLabel={alertKeyList.length > 1 ? 'Alert löschen' : 'Alerts löschen'}
      >
        <Icon addClass={styles.IconTrashClass} type="IconTrash" />
      </ButtonWithLoading>
      <div
        onClick={(event: React.MouseEvent) => {
          enableAutoFocus(event);
        }}
        onKeyUp={(event: React.KeyboardEvent) => {
          event.stopPropagation();

          if (event.key === 'Enter') {
            enableAutoFocus(event);
          }
        }}
        role="presentation"
        className="add-alert-button"
      >
        <Dropdown iconTypeRight="IconPlus" variant="primary">
          <DropdownItem>
            {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
            {({ setIsOpen }) => {
              return (
                <div className={styles.SearchWrapperDrawer}>
                  <AddInstrumentToAlerts
                    portfolioKey={''}
                    closeDrawer={setIsOpen}
                    isInsideDrawer
                    origin="alerts/add-instrument/plus-icon"
                  />
                </div>
              );
            }}
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

export default AlertActions;
