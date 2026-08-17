import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigateFunction, useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { addInstrumentToWatchlist } from '../../screens/MyCash/components/Watchlist/helpers';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import InputField from '../Paragraphs/components/WebformParagraph/components/InputField';
import MultiField from '../Paragraphs/components/WebformParagraph/components/MultiField';
import SelectField from '../Paragraphs/components/WebformParagraph/components/SelectField';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { displayErrorToast, displayInfoToast } from '../Toast';
import modal from '../Modal';
import { watchlistScreenApolloConfig } from '../../screens/MyCash/components/Watchlist/apolloConfig';
import { ROUTE_WATCHLIST } from '../../constants';
import {
  DEFAULT_VIEW,
  LIMIT_VIEW,
  MONITOR_VIEW,
  PERFORMANCE_VIEW,
  TRADER_VIEW,
} from '../../screens/MyCash/components/Table/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../Toast/constants';
import { WATCHLIST_ADD_FORM, WATCHLIST_EDIT_FORM } from './constants';
import {
  ADD_INSTRUMENT_TO_WATCHLIST,
  ADD_WATCHLIST,
  EDIT_WATCHLIST,
  GET_WATCHLISTS,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/components/Watchlist/queries'. '/Users/bhs/code/work */
} from '../../screens/MyCash/components/Watchlist/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/queries'. '/Users/bhs/code/work/rasch-stack/src/cash */
import { EDIT_DEFAULTS } from '../../screens/MyCash/queries';
import styles from './styles.legacy.css';

type WatchlistCreateEditFormProps = {
  formType?: typeof WATCHLIST_ADD_FORM | typeof WATCHLIST_EDIT_FORM;
  withInstrument?: boolean;
  instrumentKey?: string;
  instrumentName?: string;
  watchlistKey?: string;
  watchlistName?: string;
  isStandardWatchlist?: boolean;
  closeOverlay: () => void;
  navigate: NavigateFunction;
  origin?: string;
  drawerRef?: React.RefObject<HTMLDivElement>;
};

const hasSameNamedWatchlist = (
  watchlistCollection: Watchlist[],
  watchlistName: string,
) => {
  return watchlistCollection?.some(
    (watchlist: Watchlist) => watchlist.name === watchlistName,
  );
};

const defaultViewSelectiontOptions = [
  {
    label: 'Standard Ansicht (empfohlen)',
    value: 'Standard Ansicht (empfohlen)',
  },
  {
    label: 'Trader Ansicht',
    value: 'Trader Ansicht',
  },
  {
    label: 'Limiten Ansicht',
    value: 'Limiten Ansicht',
  },
  {
    label: 'Performance Ansicht',
    value: 'Performance Ansicht',
  },
  {
    label: 'Spezial-Info',
    value: 'Spezial-Info',
  },
  {
    label: 'Monitor Ansicht',
    value: 'Monitor Ansicht',
  },
];

const WatchlistCreateEditForm = ({
  closeOverlay,
  formType,
  watchlistKey,
  watchlistName,
  isStandardWatchlist,
  navigate,
  withInstrument,
  instrumentKey,
  instrumentName,
  origin,
  drawerRef,
}: WatchlistCreateEditFormProps) => {
  // needed to fetch watchlistCollection here to check if there already are watchlists or if it's the first one
  const { query: watchlistQuery, ...watchlistOptions } =
    watchlistScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
      },
    });
  const { data, loading } = useQuery(watchlistQuery, watchlistOptions);
  const [formLoading, setFormLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [openDefaultViewInfo, setOpenDefaultViewInfo] = useState(false);
  const [addWatchlistMutation] = useMutation(ADD_WATCHLIST);
  const [addInstrumentToWatchlistMutation] = useMutation(
    ADD_INSTRUMENT_TO_WATCHLIST,
  );
  const [editWatchlistMutation] = useMutation(EDIT_WATCHLIST);
  const [editWatchlistSettingsMutation] = useMutation(EDIT_DEFAULTS);
  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };
  const isWatchlist = useMatch(`/${ROUTE_WATCHLIST}/*`);
  const isWatchlistOrigin = !!isWatchlist;

  useEffect(() => {
    if (!loading) {
      setFormLoading(false);
    }
  }, [loading]);

  const isFirstWatchlist = !data?.watchlists || data?.watchlists?.count === 0;
  const isAddWatchlistForm = formType === WATCHLIST_ADD_FORM;

  const tooltipContent = `Ansichten unterscheiden sich durch die zur Verfügung stehenden Spalten. Wenn Sie unsicher sind, empfehlen wir die Standard-Ansicht. Sie können die Ansicht später jederzeit ändern.`;

  const getValue = (id: string): string => {
    const formField = formFields.current.find(
      (field: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === id;
      },
    );
    /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
    return formField ? formField.getValue() : '';
  };

  const getTitle = (formType: string, watchlistName?: string): string => {
    switch (formType) {
      case WATCHLIST_ADD_FORM:
        return 'Neue Watchlist anlegen';
      case WATCHLIST_EDIT_FORM:
        return `"${watchlistName}" umbenennen`;
      default:
        return '';
    }
  };

  const getViewTypeByValue = (value: string) => {
    switch (value) {
      case 'Trader Ansicht':
        return TRADER_VIEW;
      case 'Performance Ansicht':
        return PERFORMANCE_VIEW;
      case 'Limiten Ansicht':
        return LIMIT_VIEW;
      case 'Monitor Ansicht':
        return MONITOR_VIEW;
      case 'Standard Ansicht (empfohlen)':
      default:
        return DEFAULT_VIEW;
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
  const handleAddEditWatchlist = (values): void => {
    let mutation = null;
    const variables: any = {
      name: values.watchlistName,
      standard:
        (Array.isArray(values.standardWatchlist) &&
          values.standardWatchlist.length > 0) ||
        isStandardWatchlist ||
        false,
      description: values.description || '',
    };

    mutation =
      (isAddWatchlistForm && addWatchlistMutation) || editWatchlistMutation;

    if (!isAddWatchlistForm) {
      variables.watchlistKey = watchlistKey;
    }

    if (submitted || !mutation) {
      return;
    }
    setFormLoading(true);

    // send mutation
    mutation({
      variables,
      refetchQueries: [
        {
          query: GET_WATCHLISTS,
          variables: {
            ...watchlistOptions.variables,
          },
        },
      ],
    })
      .then(async ({ data }): Promise<void> => {
        if (
          (data?.addWatchlist &&
            data?.addWatchlist?.error &&
            data?.addWatchlist?.error !== null) ||
          (data?.editWatchlist &&
            data?.editWatchlist?.error &&
            data?.editWatchlist?.error !== null)
        ) {
          if (!toast.isActive('watchlist-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'watchlist-error');
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('watchlist-error')) {
          toast.dismiss('watchlist-error');
        }

        if (isAddWatchlistForm) {
          const viewType = getViewTypeByValue(values.viewType);

          editWatchlistSettingsMutation({
            variables: {
              key: data.addWatchlist.watchlistKey,
              view: viewType || '',
              grouping: '',
              settingsType: 'watchlist',
            },
          }).then(
            async ({ data: saveWatchlistSettingsData }): Promise<void> => {
              if (
                saveWatchlistSettingsData?.editDefaults &&
                saveWatchlistSettingsData?.editDefaults?.error &&
                saveWatchlistSettingsData?.editDefaults?.error !== null
              ) {
                if (
                  __CLIENT__ &&
                  !toast.isActive('watchlist-edit-defaults-error')
                ) {
                  displayErrorToast(
                    DEFAULT_ERROR_MESSAGE,
                    'watchlist-edit-defaults-error',
                  );
                }
                setSubmitError(true);
                setFormLoading(false);
                return;
              }

              // update MiniWatchlist component as well
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              if (global.MiniWatchlistRefetch) {
                /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                global.MiniWatchlistRefetch();
              }
            },
          );
        }

        // refetch watchlist data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchWatchlistsGQL;

        //refetch list for watchlist selection dropdown
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchWatchlistCollection = global.refetchAllWatchlistsGQL;

        setSubmitError(false);
        setSubmitted(true);
        if (refetch && refetchWatchlistCollection && !isFirstWatchlist) {
          refetch().then(() => {
            refetchWatchlistCollection().then(() => {
              setFormLoading(false);
              // track tealium event on successful portfolio creation
              if (isAddWatchlistForm) {
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'watchlist_create',
                    event_category: 'watchlist',
                    event_action: 'watchlist_create',
                    watchlist_key: data?.addWatchlist?.watchlistKey,
                  },
                });
              }
              if (!withInstrument) {
                closeOverlay();
              }
              if (isAddWatchlistForm && !withInstrument) {
                navigate(`/watchlist/${data?.addWatchlist?.watchlistKey}`);
              } else if (
                withInstrument &&
                instrumentKey &&
                data?.addWatchlist?.watchlistKey
              ) {
                closeOverlay();
                return addInstrumentToWatchlist({
                  watchlistKey: data?.addWatchlist?.watchlistKey,
                  instrumentKey,
                  instrumentName,
                  addInstrumentMutation: addInstrumentToWatchlistMutation,
                  isWatchlistOrigin,
                  origin,
                });
              }
            });
          });
        } else {
          setFormLoading(false);
          if (
            withInstrument &&
            instrumentKey &&
            data?.addWatchlist?.watchlistKey
          ) {
            closeOverlay();
            return addInstrumentToWatchlist({
              watchlistKey: data?.addWatchlist?.watchlistKey,
              instrumentKey,
              instrumentName,
              addInstrumentMutation: addInstrumentToWatchlistMutation,
              isWatchlistOrigin,
              origin,
            });
          } else {
            closeOverlay();
          }
        }

        if (isFirstWatchlist && refetchWatchlistCollection) {
          refetchWatchlistCollection();
        }
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('watchlist-error')) {
          displayErrorToast(DEFAULT_ERROR_MESSAGE, 'watchlist-error');
        }

        setSubmitError(true);
        setSubmitted(false);
        setFormLoading(false);
      });
  };

  const validateForm = (): void => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    event.preventDefault();
    const errors: Array<boolean> = formFields.current
      .map((formField: FieldComponentProps): boolean => {
        if (
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          'watchlistName' === formField.getId() &&
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          hasSameNamedWatchlist(data?.watchlists?.items, formField.getValue())
        ) {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          formField.setIsValid(false, 'Dieser Name ist bereits vergeben');
          return false;
        }
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return formField.validate();
      })
      .filter((result: boolean): boolean => !result);

    if (errors.length) {
      return;
    }

    const values = {};
    // get the values of all registered fields within this form
    formFields.current.forEach((formField: FieldComponentProps): void => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      values[formField.getId()] = formField.getValue();
    });

    handleAddEditWatchlist(values);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const handleChange = (value) => {
    if (!value) {
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      formFields.current.forEach((formField: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        if ('watchlistName' === formField.getId()) {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          formField.setIsValid(false, 'Bitte geben Sie einen Namen an');
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          formField.validate();
          return false;
        }
      });
    }

    /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
    formFields.current.forEach((formField: FieldComponentProps): boolean => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if ('watchlistName' === formField.getId()) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formField.setIsValid(true);
        return true;
      }
    });
  };

  const formSubmitButtonsJsx = (
    <div className={styles.ButtonWrapper}>
      <ButtonWithLoading
        variant="secondary"
        tabIndex={-1}
        onClick={closeOverlay}
        ariaLabel="Abbrechen"
        type="button"
      >
        Abbrechen
      </ButtonWithLoading>
      <ButtonWithLoading
        loading={false}
        onClick={validateForm}
        tabIndex={0}
        type="submit"
        ariaLabel={'Watchlist anlegen'}
      >
        Speichern
      </ButtonWithLoading>
    </div>
  );

  const stickyHeaderContainer =
    document.getElementById('ModalStickyHeader') || null;

  const stickyFooterContainer =
    document.getElementById('ModalStickyFooter') || null;

  const stickyHeader =
    (drawerRef?.current &&
      stickyHeaderContainer &&
      createPortal(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        <div className={styles.Title}>{getTitle(formType, watchlistName)}</div>,
        stickyHeaderContainer,
      )) ||
    null;

  const stickyFooter =
    (drawerRef?.current &&
      stickyFooterContainer &&
      createPortal(<>{formSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;

  return (
    <div className={styles.Wrapper}>
      {stickyHeader}
      {(formLoading && <LoadingSpinner />) ||
        (!submitted && isAddWatchlistForm && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="watchlistName"
              disabled={false}
              label="Watchlist Bezeichnung"
              title="watchlistName"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              initialValue={''}
              handleChange={handleChange.bind(this)}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'watchlistName'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'watchlistName'}
            />
            <div className={styles.SelectionFieldWrapper}>
              <SelectField
                id="viewType"
                fieldName="viewType"
                title="ViewType Selection"
                type="string"
                value={defaultViewSelectiontOptions[0].value}
                getValue={getValue}
                getId={() => 'viewType'}
                validate={() => validateForm}
                initialValue={defaultViewSelectiontOptions[0].value}
                errorMessage={
                  'Bitte wählen Sie eine Ansicht für ihr Watchlist aus'
                }
                label={`Ansicht`}
                options={defaultViewSelectiontOptions}
                register={registerField.bind(this)}
                required={true}
                withErrorIcon={false}
                disabled={false}
              />
            </div>
            <div className={styles.DefaultViewInfoWrapper}>
              <Icon
                type={openDefaultViewInfo ? 'IconXMark' : 'IconCircleInfo'}
                onClick={(): void =>
                  setOpenDefaultViewInfo(!openDefaultViewInfo)
                }
              />
              {openDefaultViewInfo && (
                <div className={styles.DefaultViewInfoTextWrapper}>
                  {tooltipContent}
                </div>
              )}
            </div>
            <MultiField
              fieldName="standardWatchlist"
              disabled={isFirstWatchlist || false}
              label={'Als Standard Watchlist setzen'}
              title={'Als Standard Watchlist setzen'}
              displayOptionsInline
              maxlength={255}
              value={''}
              options={[
                {
                  label: 'Als Standard Watchlist setzen',
                  value: 'true',
                  initiallyChecked:
                    isStandardWatchlist || isFirstWatchlist || false,
                },
              ]}
              register={registerField.bind(this)}
              type="checkboxes"
              errorMessage={'Bitte wählen Sie eine Option aus'}
              id={'standardWatchlist'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'standardWatchlist'}
            />
            <p>Ihre Standard-Watchlist wird z.B. als Mini-Vorschau angezeigt</p>
            {stickyFooter}
          </form>
        )) ||
        (!submitted && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="watchlistName"
              disabled={false}
              label="Watchlist Bezeichnung"
              title="watchlistName"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              handleChange={handleChange.bind(this)}
              initialValue={watchlistName || ''}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'watchlistName'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'watchlistName'}
            />
            <div className={styles.Hidden}>
              <MultiField
                fieldName="standardWatchlist"
                disabled={false}
                label={'Als Standard Watchlist setzen'}
                title={'Als Standard Watchlist setzen'}
                displayOptionsInline
                maxlength={255}
                type="checkboxes"
                value=""
                options={[
                  {
                    label: 'Als Standard Watchlist setzen',
                    value: 'true',
                    initiallyChecked: isStandardWatchlist || false,
                  },
                ]}
                register={registerField.bind(this)}
                errorMessage={'Bitte wählen Sie eine Option aus'}
                id={'standardWatchlist'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'standardWatchlist'}
              />
            </div>
            {stickyFooter}
          </form>
        ))}
    </div>
  );
};

export const watchlistCreate = ({
  navigate = null,
  withInstrument = false,
  instrumentKey = '',
  instrumentName = '',
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
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <WatchlistCreateEditForm
          formType={WATCHLIST_ADD_FORM}
          closeOverlay={close}
          isStandardWatchlist={false}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'NavigateFunction'. */
          navigate={navigate}
          withInstrument={withInstrument}
          instrumentKey={instrumentKey}
          instrumentName={instrumentName}
          origin={origin}
          drawerRef={drawerRef}
        ></WatchlistCreateEditForm>
      );
    },
  });
};

export const watchlistEdit = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'watchlistKey' implicitly has an 'any' type. */
  watchlistKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'watchlistName' implicitly has an 'any' type. */
  watchlistName,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isStandardWatchlist' implicitly has an 'any' type. */
  isStandardWatchlist,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
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
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <WatchlistCreateEditForm
          formType={WATCHLIST_EDIT_FORM}
          watchlistKey={watchlistKey}
          watchlistName={watchlistName}
          isStandardWatchlist={isStandardWatchlist}
          closeOverlay={close}
          navigate={navigate}
          origin={'watchlist-edit'}
          drawerRef={drawerRef}
        ></WatchlistCreateEditForm>
      );
    },
  });
};

export default WatchlistCreateEditForm;
