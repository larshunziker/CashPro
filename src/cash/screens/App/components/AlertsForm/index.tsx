import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames';
import {
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../shared/helpers/replaceAll';
import { formatPrice } from '../Highcharts/helpers';
import { skipQueryConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import ButtonWithLoading from '../ButtonWithLoading';
import LoadingSpinner from '../LoadingSpinner';
import InputField from '../Paragraphs/components/WebformParagraph/components/InputField';
import MultiField from '../Paragraphs/components/WebformParagraph/components/MultiField';
import InstrumentLatestData from '../Widgets/components/InstrumentLatestData';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { headerMapping } from '../../screens/MyCash/components/Table/components/headerMapping';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../Toast';
import modal from '../Modal';
import { alertsScreenApolloConfig } from '../../screens/MyCash/components/Alerts/apolloConfig';
import { alertsFormApolloConfig } from './apolloConfig';
import { getServiceUrl } from '../../../../../shared/helpers/serviceUrl';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
  SUBSCRIPTION_TYPE_REALTIME,
} from '../../constants';
import { AUTHORIZATION_ERROR_ID } from '../Toast/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/components/Alerts/queries'. '/Users/bhs/code/work/ra */
import { GET_ALERTS_LIST_EXTERNAL } from '../../screens/MyCash/components/Alerts/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { ADD_ALERT, EDIT_ALERT, GET_ALERT_BY_ALERTKEY } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AlertsFormOverlayProps } from './typings';

const ANCHOR_ID = 'alertform-anchor';
const DEFAULT_MARGIN = 150; // this makes sure webforms are not overlapped by headers and navi

const scrollToTopWebform = () => {
  const webformElement: HTMLElement | null =
    document && document.getElementById(`${ANCHOR_ID}`);

  // @ts-ignore
  if (global && global.scrollTo && webformElement) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // @ts-ignore
    global.scrollTo({
      left: 0,
      top:
        webformElement.getBoundingClientRect().top + scrollTop - DEFAULT_MARGIN,
      behavior: 'smooth',
    });
  }
};

// needs to be global because of form manipulation on the fields (fixes the key math.random() on form)
let formFields: FieldComponentProps[] = [];

type AlertFormProps = {
  closeOverlay: () => void;
  fullquoteUri: string;
  alertKey?: string;
  navigate: (url: string) => void;
  location: Partial<RaschRouterLocation>;
  drawerRef?: React.RefObject<HTMLDivElement>;
};

const AlertsForm = ({
  closeOverlay,
  fullquoteUri,
  alertKey,
  navigate,
  location,
  drawerRef,
}: AlertFormProps) => {
  const isEditForm = !!alertKey;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );

  useEffect(() => {
    // Todo: fix focus issue when clickin on a percentage button
    // // set initially focus on price input field
    // const priceInput = document.getElementById('price');
    // if (priceInput) {
    //   priceInput.focus();
    // }
    return () => {
      formFields = [];
    };
  }, []);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'sub' implicitly has an 'any' type. */
  const checkAbo = (sub) =>
    [
      SUBSCRIPTION_TYPE_ANLEGER,
      SUBSCRIPTION_TYPE_PROFI,
      SUBSCRIPTION_TYPE_REALTIME,
      SUBSCRIPTION_TYPE_BANKING,
    ].includes(sub);

  const smsAlertEnabled = subscriptions?.some(checkAbo) || false;

  const [addMutation] = useMutation(ADD_ALERT);
  const [editMutation] = useMutation(EDIT_ALERT);

  const validateForm = (): void => {
    const errors: Array<boolean> = formFields
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      .map((formField: FieldComponentProps): boolean => formField.validate())
      .filter((result: boolean): boolean => !result);

    if (errors.length) {
      scrollToTopWebform();
      return;
    }

    const values = {};
    // get the values of all registered fields within this form
    formFields.forEach((formField: FieldComponentProps): void => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      return (values[formField.getId()] =
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        typeof formField.getValue() === 'string' ||
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formField.getValue() instanceof String
          ? /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            replaceAll(formField.getValue(), '’', '')
          : /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
            formField.getValue());
    });

    const type = (isEditForm && 'editAlert') || 'addAlert';
    handleSubmit(values, type);
  };

  const registerField = (formField: FieldComponentProps): void => {
    formFields.push(formField);
  };

  const getValue = (id: string): string => {
    const formField = formFields.find((field: FieldComponentProps): boolean => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      return field.getId() === id;
    });
    /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
    return formField ? formField.getValue() : '';
  };

  const { query, ...options } =
    (alertsFormApolloConfig.options({
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Record<string, any> | RaschRouterLocation | undefined'. */
      location: null,
      params: {
        fullquoteUri,
      },
    }) as any) || skipQueryConfig;

  const {
    data: fullquoteData,
    refetch,
    loading: fullquoteDataLoading,
  } = useQuery(query, options);
  const { loading: loadingAlertsByAlertsKey, data: alertData } = useQuery(
    GET_ALERT_BY_ALERTKEY,
    {
      variables: {
        alertKey,
      },
      fetchPolicy: 'network-only',
      skip: !alertKey,
    },
  );

  /* @ts-ignore TODO: TS7034 ->  Variable 'currentAlert' implicitly has type 'any' in some locations where its type cannot be determined. */
  let currentAlert = null;
  if (!loadingAlertsByAlertsKey && alertData) {
    currentAlert = alertData?.getAlertByAlertKey;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
  const handleSubmit = (values, type): void => {
    const isEditAlert = type === 'editAlert';
    let mutation = null;
    const variables: any = {
      listingKey: values.listingId,
      type: '',
      value: replaceAll(values.price, /['’]/, ''),
      expiration: `${new Date(values.date).getTime()}`,
      useProfileMobile:
        (values.alertOption && values.alertOption.includes('sms')) || false,
      useProfileEmail:
        (values?.alertOption && values.alertOption.includes('email')) ||
        (values?.alertOption && values.alertOption.length === 0) ||
        false,
      comment: values.comment || '',
    };

    if (isEditAlert) {
      mutation = editMutation;
      /* @ts-ignore TODO: TS7005 ->  Variable 'currentAlert' implicitly has an 'any' type. */
      variables.alertKey = `${currentAlert?.alertKey}`;
    } else {
      mutation = addMutation;
    }

    if (submitted || loading || !mutation) {
      return;
    }

    setLoading(true);
    const errorMsg =
      'Für den Versand von Alerts via SMS muss eine Handynummer in Ihrem Profil hinterlegt sein. ';

    const { variables: alertScreenVariables } =
      alertsScreenApolloConfig.options({
        location,
      });

    // send mutation
    mutation({
      variables,
      refetchQueries: [
        {
          query: GET_ALERTS_LIST_EXTERNAL,
          variables: alertScreenVariables,
        },
      ],
    })
      .then(async ({ data }): Promise<void> => {
        if (
          (data?.addAlert &&
            data?.addAlert?.error &&
            data?.addAlert?.error !== null) ||
          (data?.updateAlert &&
            data?.updateAlert?.error &&
            data?.updateAlert?.error !== null)
        ) {
          if (!toast.isActive('alert-error')) {
            displayErrorToast(errorMsg, 'alert-error', {
              text: 'Zu Ihrem Profil',
              onClick: () =>
                window.open(
                  `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
                ),
            });
          }
          setSubmitError(true);
          setLoading(false);
          return;
        }

        if (toast.isActive('alert-error')) {
          toast.dismiss('alert-error');
        }

        setSubmitError(false);
        setSubmitted(true);

        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchAlertOverview = global.refetchAlertListGQL;

        // only refetch if we already are on the alerts overview
        if (refetchAlertOverview && location.pathname === '/alerts') {
          refetchAlertOverview().then(() => {
            closeOverlay();
            setLoading(false);
            displaySuccessToast(
              (isEditAlert && 'Alert erfolgreich bearbeitet. ') ||
                'Alert erfolgreich hinzugefügt. ',
              'alert-submitted',
            );
          });
        } else {
          closeOverlay();
          setLoading(false);
          displaySuccessToast(
            (isEditAlert && 'Alert erfolgreich bearbeitet. ') ||
              'Alert erfolgreich hinzugefügt. ',
            'alert-submitted',
            {
              text: 'Zur Alert-Übersicht',
              onClick: () => navigate('/alerts'),
            },
          );
        }
        return;
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('alert-error')) {
          displayErrorToast(errorMsg, 'alert-error', {
            text: 'Zu Ihrem Profil',
            onClick: () =>
              window.open(
                `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
              ),
          });
        }

        setSubmitError(true);
        setSubmitted(false);
        setLoading(false);
        return;
      })
      .finally(() => {
        scrollToTopWebform();
      });
  };

  const precentSelectors = [
    {
      id: 'percent-button-20',
      label: '-20%',
      value: -20,
    },
    {
      id: 'percent-button-10',
      label: '-10%',
      value: -10,
    },
    {
      id: 'percent-button-5',
      label: '-5%',
      value: -5,
    },
    {
      id: 'percent-button5',
      label: '+5%',
      value: 5,
    },
    {
      id: 'percent-button10',
      label: '+10%',
      value: 10,
    },
    {
      id: 'percent-button20',
      label: '+20%',
      value: 20,
    },
  ];

  /* @ts-ignore TODO: TS7006 ->  Parameter 'selector' implicitly has an 'any' type. */
  const handlePercentSelection = (selector) => {
    const buttons = document.querySelectorAll(`[id^="percent-button"]`);

    // set button as active. We can not use setState here because this
    // would re-initialize our form and delete all current values
    buttons.forEach((button) => {
      if (button.id === selector?.id) {
        button.classList.add(styles.Active);
      } else {
        button.classList.remove(styles.Active);
      }
    });

    if (!selector) {
      return;
    }

    refetch().then(({ data }) => {
      const currentPrice = data?.getFullquotePage?.currentPrice || '';
      const newValue =
        parseFloat(currentPrice) +
        (parseFloat(currentPrice) / 100) * selector.value;

      // get the values of all registered fields within this form
      formFields.forEach((formField: FieldComponentProps): void => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        if (formField.getId() === 'price') {
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          return formField.setValue(
            formatPrice(newValue, data?.getFullquotePage?.scGrouped),
          );
        }
      });
    });
  };

  const initialDate = new Date().setDate(new Date().getDate() + 90);

  if (
    (isEditForm && loadingAlertsByAlertsKey) ||
    submitted ||
    fullquoteDataLoading
  ) {
    return <LoadingSpinner />;
  }

  const headerJsx = (
    <div className={styles.Heading}>
      Alert setzen für {fullquoteData?.getFullquotePage?.mName || ''}
      {headerMapping['iNetVperprVPr'].formatter({
        value: fullquoteData?.getFullquotePage?.iNetVperprVPr,
        instrument: fullquoteData?.getFullquotePage,
      })}
      {headerMapping['iNetVperprV'].formatter({
        value: fullquoteData?.getFullquotePage?.iNetVperprV,
        instrument: fullquoteData?.getFullquotePage,
      })}
    </div>
  );

  const formSubmitButtonsJsx = (
    <div className={styles.ButtonWrapper}>
      <ButtonWithLoading
        onClick={closeOverlay}
        variant="secondary"
        ariaLabel="Abbrechen"
        type="button"
        tabIndex={-1}
      >
        Abbrechen
      </ButtonWithLoading>
      <ButtonWithLoading
        type="submit"
        tabIndex={0}
        onClick={validateForm}
        ariaLabel={`${
          (isEditForm && 'Preise Alert editieren') || 'Preise Alert setzen'
        }`}
      >
        Alert Speichern
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
      createPortal(<>{headerJsx}</>, stickyHeaderContainer)) ||
    null;

  const stickyFooter =
    (drawerRef?.current &&
      stickyFooterContainer &&
      createPortal(<>{formSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;
  return (
    <>
      {stickyHeader}
      {(!submitted && (
        <>
          <form onSubmit={validateForm.bind(this)} noValidate>
            <div className={styles.InputTextWrapper}>
              <InputField
                animatedLabel
                fieldName="listingId"
                disabled={true}
                label={'listingId'}
                title={'listingId'}
                maxlength={255}
                value={fullquoteData?.getFullquotePage?.listingId}
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="hidden"
                initialValue={fullquoteData?.getFullquotePage?.listingId}
                errorMessage={'Bitte wählen Sie eine Option aus'}
                id={'listingId'}
                required={true}
                validate={() => true}
                getValue={getValue}
                getId={() => 'listingId'}
              />
              <div className={styles.WidgetWrapper}>
                {fullquoteData?.getFullquotePage?.listingId && (
                  <InstrumentLatestData
                    widgetParagraph={
                      {
                        link: {
                          path: `https://cdn.fi-box.service.cash.ch/services/esi-widgets/latest-data/${fullquoteData?.getFullquotePage?.listingId}?caller=setAlert`,
                        },
                      } as WidgetParagraph
                    }
                  />
                )}
              </div>
              <div className={styles.InputFieldTitle}>Zielpreis</div>
              <InputField
                animatedLabel
                fieldName="price"
                disabled={loading}
                label={'Zielpreis eingeben'}
                title={'Zielpreis eingeben'}
                maxlength={255}
                value={
                  (currentAlert?.value && formatPrice(currentAlert.value)) || ''
                }
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="textfield"
                errorMessage={'Bitte wählen Sie einen gültigen Preis aus'}
                initialValue={
                  (currentAlert?.value &&
                    /* @ts-ignore TODO: TS2345 ->  Argument of type '"UserInput"' is not assignable to parameter of type 'null | undefined'. */
                    formatPrice(currentAlert.value, 'UserInput')) ||
                  ''
                }
                id={'price'}
                required={true}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'price'}
                handleChange={(value) => {
                  if (value) {
                    handlePercentSelection(null);
                  }
                }}
                pattern="^(([0-9]+[.])?[0-9]+|([0-9]+['’])?([0-9]+[.])?[0-9])+$"
                inputmode="decimal"
              />
              <div className={styles.PercentSelectorWrapper}>
                {precentSelectors.map((selector, index) => {
                  return (
                    <button
                      id={selector.id}
                      key={`percent-item-${selector.label}-${index}`}
                      onClick={() => handlePercentSelection(selector)}
                      tabIndex={-1}
                      type="button"
                      className={classNames(
                        styles.PercentItem,
                        {
                          [styles.PositiveValues]: selector.label.includes('+'),
                        },
                        {
                          [styles.NegativeValues]: selector.label.includes('-'),
                        },
                      )}
                    >
                      {selector.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={classNames(styles.CheckboxWrapper, grid.Row)}>
              <div className={grid.ColXs24}>
                <MultiField
                  fieldName="alertOption"
                  disabled={loading}
                  label={'Alert erhalten per'}
                  title={'Alert erhalten per'}
                  displayOptionsInline
                  maxlength={255}
                  value={''}
                  options={[
                    {
                      label: 'E-Mail',
                      value: 'email',
                      initiallyChecked:
                        (isEditForm && currentAlert?.useProfileEmail === true
                          ? true
                          : false) ||
                        (!isEditForm && true),
                    },
                    {
                      label: `SMS ${
                        (!smsAlertEnabled && `nur mit Börsenabo`) || ''
                      }`,
                      value: 'sms',
                      disabled: !smsAlertEnabled,
                      initiallyChecked: currentAlert?.useProfileMobile || false,
                    },
                  ]}
                  register={registerField.bind(this)}
                  type="checkboxes"
                  errorMessage={'Bitte wählen Sie eine Option aus'}
                  id={'alertOption'}
                  validate={() => validateForm}
                  getValue={getValue}
                  getId={() => 'alertOption'}
                />
              </div>
            </div>
            {!smsAlertEnabled && (
              <div className={styles.SmsAlertDisabledInfo}>
                Versand per E-Mail. Mit einem Börsenabo profitieren Sie von
                kostenlosen SMS-Alerts.
              </div>
            )}
            <div className={styles.InputTextWrapper}>
              <InputField
                animatedLabel
                fieldName="date"
                disabled={loading}
                label={'Gültig bis'}
                title={'Gültig bis'}
                value={''}
                register={registerField.bind(this)}
                dateMin={'2days'}
                initialValue={formatDate(
                  (isEditForm && currentAlert?.expiration) || initialDate,
                  DATE_FORMAT_SIMPLYBOOK,
                )}
                withErrorIcon={false}
                type="date"
                errorMessage={'Bitte wählen Sie ein gültiges Datum aus'}
                id={'date'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'date'}
              />
            </div>
            <div className={styles.InputTextWrapper}>
              <InputField
                animatedLabel
                fieldName="comment"
                disabled={loading}
                label={'Meine Notiz zu diesem Alert (optional)'}
                title={'Meine Notiz zu diesem Alert (optional)'}
                value={currentAlert?.comment || ''}
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="textarea"
                errorMessage={'Bitte wählen Sie eine Option aus'}
                initialValue={currentAlert?.comment || ''}
                id={'comment'}
                required={false}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'comment'}
                maxlength={200}
                maxlengthMessage={' Anzahl Zeichen aufgebraucht'}
              />
            </div>
            <p className={styles.InformationText}>
              Sie erhalten einmalig eine Benachrichtigung, wenn der Preis, den
              von Ihnen gesetzten Zielpreis erreicht.
            </p>
            {stickyFooter}
          </form>
        </>
      )) ||
        null}
    </>
  );
};

export const alertsFormOverlay = ({
  alertKey,
  fullquoteUri,
  navigate,
  location,
}: AlertsFormOverlayProps) => {
  const token = Auth0.getIdToken();
  if (!token) {
    displayInfoToast(
      'Kursalerts sind nur im eingeloggten Zustand verfügbar. ',
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
        <div className={styles.Wrapper}>
          <AlertsForm
            fullquoteUri={fullquoteUri}
            alertKey={alertKey}
            closeOverlay={close}
            navigate={navigate}
            location={location}
            drawerRef={drawerRef}
          ></AlertsForm>
        </div>
      );
    },
  });
};

export default AlertsForm;
