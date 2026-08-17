import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/client';
import classNames from 'classnames';
import { defaultOptions } from '../../../../../../../common/components/SmoothScroll/helpers';
import {
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../../../shared/helpers/replaceAll';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { formatPrice } from '../../../Highcharts/helpers';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../ButtonWithLoading';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import SelectField from '../../../Paragraphs/components/WebformParagraph/components/SelectField';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../Toast';
import modal from '../../../Modal';
import { rateByCurrencyApolloConfig } from './apolloConfig';
import { SCROLLABLE_DRAWER_CONTENT_ID } from '../../../../../../../common/components/ScrollableDrawerContent/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../../../Toast/constants';
import { OTHER_ASSETS_CURRENCY, OTHER_ASSETS_MARKET_TYPE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { ADD_OTHER_ASSET_INSTRUMENT } from './queries';
import styles from './styles.legacy.css';

type AddOtherAssetFormProps = {
  instrumentKey?: string;
  portfolioKey?: string;
  portfolioCurrency?: string;
  closeOverlay: () => void;
  navigate: NavigateFunction;
  origin?: string;
  drawerRef?: React.MutableRefObject<HTMLDivElement>;
  hasStickyHeader?: boolean;
  hasStickyFooter?: boolean;
};

const findCurrencyByValue = (value: string): Record<string, any> => {
  const currency = OTHER_ASSETS_CURRENCY.find((currencyItem): boolean => {
    return currencyItem.value === value;
  });
  return currency || OTHER_ASSETS_CURRENCY[2];
};
const findMarketByValue = (value: string): Record<string, any> => {
  const item = OTHER_ASSETS_MARKET_TYPE.find((item): boolean => {
    return item.label === value;
  });
  return item || OTHER_ASSETS_MARKET_TYPE[2];
};

const AddOtherAssetForm = ({
  closeOverlay,
  portfolioKey,
  portfolioCurrency,
  origin = '',
  drawerRef,
}: AddOtherAssetFormProps) => {
  const initialDate = new Date().setDate(new Date().getDate());
  const [formLoading, setFormLoading] = useState(false);
  const [currency, setCurrency] = useState(portfolioCurrency);
  const [allFieldsVisible, setAllFieldsVisible] = useState(false);
  const [isInfoTextVisible, setInfoTextVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [addOtherAssetInstrumentMutation] = useMutation(
    ADD_OTHER_ASSET_INSTRUMENT,
  );

  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };
  const { query: rateByCurrencyQuery, ...rateByCurrencyOptions } =
    rateByCurrencyApolloConfig.options({
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      params: { portfolioCurrency, currency },
    });
  const [
    getRateByCurrency,
    { data: rateByCurrencyData, loading: rateByCurrencyDataLoading },
  ] = useLazyQuery(rateByCurrencyQuery, rateByCurrencyOptions);

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

  /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
  const handleAddOtherAsset = (values): void => {
    const variables: any = {
      ...values,
      portfolioKey,
      paid: replaceAll(values.paid, /['’]/, ''),
      value: replaceAll(values.value, /['’]/, ''),
      fees: replaceAll(values.fees, /['’]/, ''),
      marketType: findMarketByValue(values?.marketType)?.value,
      type: 'BUY',
      rate: `${Number(values?.rate)}`,
    };

    if (currency === portfolioCurrency) {
      delete variables.rate;
    }

    if (submitted) {
      return;
    }
    setFormLoading(true);

    // send mutation
    addOtherAssetInstrumentMutation({
      variables,
    })
      .then(async ({ data, errors }): Promise<void> => {
        if (
          (data?.addOtherAssetInstrument &&
            data?.addOtherAssetInstrument?.error &&
            data?.addOtherAssetInstrument?.error !== null) ||
          errors
        ) {
          if (
            __CLIENT__ &&
            !toast.isActive('add-other-asset-instrument-error')
          ) {
            displayErrorToast(
              DEFAULT_ERROR_MESSAGE,
              'add-other-asset-instrument-error',
            );
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('add-other-asset-instrument-error')) {
          toast.dismiss('add-other-asset-instrument-error');
        }

        // refetch portfolio data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchPortfoliosGQL;

        setSubmitError(false);
        setSubmitted(true);
        if (refetch) {
          refetch().then(() => {
            setFormLoading(false);
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'transaction_add',
                event_category: 'portfolio',
                event_action: 'transaction_add',
                portfolio_key: portfolioKey,
                portfolio_currency: portfolioCurrency,
                instrument_other_asset: true,
                instrument_type: findMarketByValue(values?.marketType)?.value,
                instrument_currency: values?.currency || '',
                transaction_type: 'BUY',
                from: `portfolio/${origin || ''}`,
              },
            });
            closeOverlay();
            displaySuccessToast(
              `"${variables.title}" wurde angelegt.`,
              'portfolio-transaktion-submitted',
            );
          });
        } else {
          setFormLoading(false);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'transaction_add',
              event_category: 'portfolio',
              event_action: 'transaction_add',
              portfolio_key: portfolioKey,
              instrument_other_asset: true,
              transaction_type: 'BUY',
              from: `portfolio/${origin || ''}`,
            },
          });
          closeOverlay();
          displaySuccessToast(
            `"${variables.title}" wurde angelegt.`,
            'portfolio-transaktion-submitted',
          );
        }
      })
      .catch((): void => {
        if (
          !submitError &&
          !toast.isActive('add-other-asset-instrument-error')
        ) {
          displayErrorToast(
            DEFAULT_ERROR_MESSAGE,
            'add-other-asset-instrument-error',
          );
        }

        setSubmitError(true);
        setSubmitted(false);
        setFormLoading(false);
      });
  };

  const validateForm = (): void => {
    const errors: Array<boolean> = formFields.current.map(
      (formField: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return formField.validate();
      },
    );

    const filteredErrors = errors.filter((result: boolean): boolean => !result);
    if (filteredErrors.length) {
      const firstFalseIndex = errors.indexOf(false);
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      const firstErrorElementId = formFields.current[firstFalseIndex].getId();

      // smoothscroll to the first error we got in the form
      if (firstErrorElementId) {
        const scrollableContent = document.getElementById(
          SCROLLABLE_DRAWER_CONTENT_ID,
        );
        const inputelement = document.getElementById(firstErrorElementId);

        if (scrollableContent) {
          scrollableContent.scrollTo({
            left: 0,
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            top: inputelement.getBoundingClientRect().top,
            behavior: defaultOptions.behavior as ScrollBehavior,
          });
        }
      }
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
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      return values[formField.getId()];
    });

    setInfoTextVisible(false);
    handleAddOtherAsset(values);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const handleCurrencyChange = (value) => {
    if (value !== portfolioCurrency) {
      setCurrency(value);
      getRateByCurrency();
    } else {
      setCurrency(value);
    }
  };

  if (!rateByCurrencyDataLoading && formFields.current && !submitted) {
    formFields.current.forEach((field: FieldComponentProps) => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'rate' && currency !== portfolioCurrency) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(
          replaceAll(
            /* @ts-ignore TODO: TS2345 ->  Argument of type '"CUR"' is not assignable to parameter of type 'null | undefined'. */
            formatPrice(rateByCurrencyData?.getRateByCurrency?.rate, 'CUR'),
            /['’]/,
            '',
          ),
        );
      }
    });
  }

  const headerJsx = (
    <div className={styles.Title}>
      Titel manuell eintragen{' '}
      <Link
        className={styles.InfoLink}
        onClick={() => setInfoTextVisible(!isInfoTextVisible)}
      >
        <Icon type="IconCircleInfo" />
      </Link>
    </div>
  );

  const formSubmitButtonsJsx = (
    <div className={styles.ButtonWrapper}>
      <ButtonWithLoading
        variant="secondary"
        tabIndex={-1}
        ariaLabel="Abbrechen"
        onClick={closeOverlay}
        type="button"
      >
        Abbrechen
      </ButtonWithLoading>
      <ButtonWithLoading
        loading={false}
        onClick={validateForm}
        tabIndex={0}
        type="submit"
        ariaLabel={'Manueller Titel anlegen'}
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
      createPortal(<>{headerJsx}</>, stickyHeaderContainer)) ||
    null;

  const stickyFooter =
    (drawerRef?.current &&
      stickyFooterContainer &&
      createPortal(<>{formSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;

  return (
    <div className={styles.Wrapper}>
      {stickyHeader}
      <div
        className={classNames(styles.Lead, {
          [styles.Visible]: isInfoTextVisible,
        })}
      >
        <p className={styles.InfoTitle}>Wozu Titel manuell eintragen?</p>
        Falls Sie einen Titel über die Suche nach Valoren-Nummer, Symbol oder
        Name nicht finden können, wenn er nicht an einer Börse kotiert ist oder
        nicht öffentlich gehandelt wird, können Sie den Wert manuell in Ihr
        Portfolio einfügen. Beispiele: Auto, Schmuck, Kunstgegenstände,
        Hypotheken etc. Bitte beachten Sie, dass Sie den aktuellen Wert manuell
        nachtragen müssen, falls er sich ändern sollte.
      </div>
      {(formLoading && <LoadingSpinner />) ||
        (!submitted && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="title"
              disabled={formLoading}
              label="Name"
              title="title"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              initialValue={''}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'title'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'title'}
            />
            <InputField
              animatedLabel
              fieldName="quantity"
              disabled={formLoading}
              label="Anzahl"
              title="quantity"
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="number"
              initialValue={''}
              errorMessage={'Bitte wählen Sie eine Stückzahl aus'}
              id={'quantity'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'quantity'}
            />
            <InputField
              animatedLabel
              fieldName="paid"
              disabled={formLoading}
              label={`Preis in ${portfolioCurrency}`}
              title="Preis"
              required
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="text"
              initialValue={''}
              errorMessage={'Bitte geben Sie einen gültigen Preis ein'}
              id={'paid'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'paid'}
              pattern="^(([0-9'’]?)+[.])?[0-9'’]+$"
              inputmode="decimal"
            />
            <InputField
              animatedLabel
              fieldName="value"
              disabled={formLoading}
              label="Wert"
              title="Wert"
              required
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="text"
              initialValue={''}
              errorMessage={'Bitte geben Sie einen gültigen Wert ein'}
              id={'value'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'value'}
              pattern="^(([0-9'’]?)+[.])?[0-9'’]+$"
              inputmode="decimal"
            />
            {!allFieldsVisible && (
              <Link
                onClick={() => setAllFieldsVisible(true)}
                className={styles.MoreFieldsLink}
              >
                Mehr Eingabefelder anzeigen
              </Link>
            )}

            <div
              className={classNames(styles.FieldsWrapper, {
                [styles.Visible]: allFieldsVisible,
              })}
            >
              <InputField
                animatedLabel
                fieldName="date"
                disabled={formLoading}
                label={'Datum'}
                title={'Datum'}
                value={''}
                register={registerField.bind(this)}
                initialValue={formatDate(initialDate, DATE_FORMAT_SIMPLYBOOK)}
                withErrorIcon={false}
                type="date"
                errorMessage={'Bitte wählen Sie ein gültiges Datum aus'}
                id={'date'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'date'}
              />
              <SelectField
                id="marketType"
                fieldName="marketType"
                title="Typ wählen"
                type="string"
                value={OTHER_ASSETS_MARKET_TYPE[5].value}
                getValue={getValue}
                getId={() => 'marketType'}
                validate={() => validateForm}
                initialValue={OTHER_ASSETS_MARKET_TYPE[5].label}
                errorMessage=""
                label="Typ"
                options={OTHER_ASSETS_MARKET_TYPE}
                register={registerField.bind(this)}
                withErrorIcon={false}
                disabled={formLoading}
              />
              <SelectField
                id="currency"
                fieldName="currency"
                title="Währung wählen"
                type="string"
                /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                value={findCurrencyByValue(portfolioCurrency).value}
                getValue={getValue}
                getId={() => 'currency'}
                validate={() => validateForm}
                handleChange={handleCurrencyChange.bind(this)}
                /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                initialValue={findCurrencyByValue(portfolioCurrency).label}
                errorMessage=""
                label="Währung"
                options={OTHER_ASSETS_CURRENCY}
                register={registerField.bind(this)}
                withErrorIcon={false}
                disabled={formLoading || rateByCurrencyDataLoading}
              />
              <InputField
                animatedLabel
                fieldName="rate"
                disabled={formLoading}
                label="Kurs"
                title="Kurs"
                maxlength={255}
                value={''}
                register={registerField.bind(this)}
                withErrorIcon={false}
                type={(currency !== portfolioCurrency && 'text') || 'hidden'}
                initialValue={''}
                id={'rate'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'rate'}
                errorMessage=""
              />
              <InputField
                animatedLabel
                fieldName="fees"
                disabled={formLoading}
                label={`Gebühr in ${portfolioCurrency}`}
                title={`Gebühr in ${portfolioCurrency}`}
                maxlength={255}
                value={''}
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="text"
                initialValue={''}
                errorMessage={''}
                id={'fees'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'fees'}
                inputmode="decimal"
              />
              <InputField
                animatedLabel
                fieldName="comment"
                disabled={formLoading}
                label="Kommentar"
                title="Kommentar"
                value=""
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="textarea"
                errorMessage="Bitte geben Sie einen Kommentar ein"
                initialValue={''}
                id="comment"
                required={false}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'comment'}
                maxlength={200}
                maxlengthMessage=" Anzahl Zeichen aufgebraucht"
              />
              <Link
                onClick={() => setAllFieldsVisible(false)}
                className={styles.MoreFieldsLink}
              >
                Weniger Eingabefelder anzeigen
              </Link>
            </div>
            {stickyFooter}
          </form>
        )) ||
        null}
    </div>
  );
};

export const addOtherAsset = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioCurrency' implicitly has an 'any' type. */
  portfolioCurrency,
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
        <AddOtherAssetForm
          portfolioKey={portfolioKey}
          portfolioCurrency={portfolioCurrency}
          closeOverlay={close}
          navigate={navigate}
          origin="more-option-button"
          drawerRef={drawerRef}
        ></AddOtherAssetForm>
      );
    },
  });
};

export default AddOtherAssetForm;
