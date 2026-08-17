import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { defaultOptions } from '../../../../../../../common/components/SmoothScroll/helpers';
import { replaceAll } from '../../../../../../../shared/helpers/replaceAll';
import { formatPrice } from '../../../Highcharts/helpers';
import ButtonWithLoading from '../../../ButtonWithLoading';
import LoadingSpinner from '../../../LoadingSpinner';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import SelectField from '../../../Paragraphs/components/WebformParagraph/components/SelectField';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { displayErrorToast, displayInfoToast } from '../../../Toast';
import modal from '../../../Modal';
import { transactionInfoApolloConfig } from '../../../PortfolioTradeForm/apolloConfig';
import { SCROLLABLE_DRAWER_CONTENT_ID } from '../../../../../../../common/components/ScrollableDrawerContent/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../../../Toast/constants';
import {
  OTHER_ASSETS_CURRENCY,
  OTHER_ASSETS_MARKET_TYPE,
} from '../AddOtherAssetForm/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { EDIT_OTHER_ASSET_INSTRUMENT } from './queries';
import styles from './styles.legacy.css';

type EditOtherAssetFormProps = {
  instrumentKey?: string;
  portfolioKey?: string;
  portfolioCurrency?: string;
  closeOverlay: () => void;
  navigate: NavigateFunction;
  drawerRef?: React.MutableRefObject<HTMLElement>;
};

const findCurrencyByValue = (value: string): Record<string, any> => {
  const currency = OTHER_ASSETS_CURRENCY.find((currencyItem): boolean => {
    return currencyItem.value === value || currencyItem.label === value;
  });
  return currency || OTHER_ASSETS_CURRENCY[2];
};
const findMarketByValue = (value: string): Record<string, any> => {
  const item = OTHER_ASSETS_MARKET_TYPE.find((item): boolean => {
    return item.label === value || item.value === value;
  });
  return item || OTHER_ASSETS_MARKET_TYPE[5];
};

const EditOtherAssetForm = ({
  closeOverlay,
  portfolioKey,
  instrumentKey,
  portfolioCurrency,
  drawerRef,
}: EditOtherAssetFormProps) => {
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [editOtherAssetInstrumentMutation] = useMutation(
    EDIT_OTHER_ASSET_INSTRUMENT,
  );
  const formFields = useRef<FieldComponentProps[]>([]);

  const apolloParams = {
    portfolioKey: portfolioKey,
    instrumentKey: instrumentKey,
    isOtherAsset: 'true',
    portfolioCurrency,
  };

  const { query: transactionInfoQuery, ...transactionInfoOptions } =
    transactionInfoApolloConfig.options({
      /* @ts-ignore TODO: TS2322 ->  Type '{ portfolioKey */
      params: apolloParams,
    });
  const { data: transactionInfoData, loading: transactionInfoLoading } =
    useQuery(transactionInfoQuery, transactionInfoOptions);

  const isLoading = transactionInfoLoading || formLoading;

  if (!isLoading && formFields.current && !submitted) {
    formFields.current.forEach((field: FieldComponentProps) => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'title') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(transactionInfoData?.getTransactionInfo?.name);
      }
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'value') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(
          formatPrice(transactionInfoData?.getTransactionInfo?.price),
        );
      }
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'fees') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(
          transactionInfoData?.getTransactionInfo?.fees?.replace(',', '.'),
        );
      }
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'marketType') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(
          findMarketByValue(transactionInfoData?.getTransactionInfo?.type)
            .label,
        );
      }

      if (
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.getId() === 'currency' &&
        portfolioCurrency !==
          transactionInfoData?.getTransactionInfo?.instrumentCurrency
      ) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(
          findCurrencyByValue(
            transactionInfoData?.getTransactionInfo?.instrumentCurrency,
          ).label,
        );
      }
    });
  }

  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };

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
  const handleEditOtherAsset = (values): void => {
    const variables: any = {
      ...values,
      paid: replaceAll(values.paid || '', /['’]/, ''),
      value: replaceAll(values.value || '', /['’]/, ''),
      fees: replaceAll(values.fees || '', /['’]/, ''),
      portfolioKey,
      instrumentKey,
      marketType: findMarketByValue(values.marketType).value,
      currency: findCurrencyByValue(values.currency).value,
    };

    if (submitted || !editOtherAssetInstrumentMutation) {
      return;
    }
    setFormLoading(true);

    // send mutation
    editOtherAssetInstrumentMutation({
      variables,
    })
      .then(async ({ data, errors }): Promise<void> => {
        if (
          (data?.editOtherAssetInstrument &&
            data?.editOtherAssetInstrument?.error &&
            data?.editOtherAssetInstrument?.error !== null) ||
          errors
        ) {
          if (
            __CLIENT__ &&
            !toast.isActive('edit-other-asset-instrument-error')
          ) {
            displayErrorToast(
              DEFAULT_ERROR_MESSAGE,
              'edit-other-asset-instrument-error',
            );
          }

          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('edit-other-asset-instrument-error')) {
          toast.dismiss('edit-other-asset-instrument-error');
        }

        // refetch portfolio data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchPortfoliosGQL;

        //refetch list for portfolio selection dropdown
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchPortfolioList = global.refetchAllPortfoliosGQL;

        setSubmitError(false);
        setSubmitted(true);
        if (refetch && refetchPortfolioList) {
          refetch().then(() => {
            refetchPortfolioList().then(() => {
              setFormLoading(false);
              closeOverlay();
            });
          });
        } else {
          setFormLoading(false);
          closeOverlay();
        }
      })
      .catch((): void => {
        if (
          !submitError &&
          !toast.isActive('edit-other-asset-instrument-error')
        ) {
          displayErrorToast(
            DEFAULT_ERROR_MESSAGE,
            'edit-other-asset-instrument-error',
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
    });

    handleEditOtherAsset(values);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const handleChange = (value) => {
    if (!value) {
      /* @ts-ignore TODO: TS2366 ->  Function lacks ending return statement and return type does not include 'undefined'. */
      formFields.current.forEach((formField: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        if ('portfolioName' === formField.getId()) {
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
      if ('portfolioName' === formField.getId()) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formField.setIsValid(true);
        return true;
      }
    });
  };

  const headerJsx = (
    <div className={styles.Title}>
      Bearbeiten
      {(transactionInfoData?.getTransactionInfo?.name &&
        ` - ${transactionInfoData?.getTransactionInfo?.name}`) ||
        null}
    </div>
  );

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
        tabIndex={0}
        onClick={validateForm}
        type="submit"
        ariaLabel={'Portfolio anlegen'}
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
              handleChange={handleChange.bind(this)}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'title'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'title'}
            />
            <InputField
              animatedLabel
              fieldName="value"
              disabled={formLoading}
              label={`Wert in ${portfolioCurrency}`}
              title="Wert"
              required
              maxlength={255}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="text"
              initialValue={''}
              errorMessage={'Bitte wählen Sie einen Wert aus'}
              id={'value'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'value'}
              pattern="^(([0-9'’]?)+[.])?[0-9'’]+$"
              inputmode="decimal"
            />
            <SelectField
              id="marketType"
              fieldName="marketType"
              title="typ wählen"
              type="string"
              value={
                findMarketByValue(transactionInfoData?.getTransactionInfo?.type)
                  .value
              }
              getValue={getValue}
              getId={() => 'marketType'}
              validate={() => validateForm}
              initialValue={
                findMarketByValue(transactionInfoData?.getTransactionInfo?.type)
                  .label
              }
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
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              initialValue={findCurrencyByValue(portfolioCurrency).label}
              errorMessage=""
              label="Währung"
              options={OTHER_ASSETS_CURRENCY}
              register={registerField.bind(this)}
              withErrorIcon={false}
              disabled={true}
            />
            {stickyFooter}
          </form>
        )) ||
        null}
    </div>
  );
};

export const editOtherAssetInstrument = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioCurrency' implicitly has an 'any' type. */
  portfolioCurrency,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'instrumentKey' implicitly has an 'any' type. */
  instrumentKey,
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
        <EditOtherAssetForm
          portfolioKey={portfolioKey}
          portfolioCurrency={portfolioCurrency}
          instrumentKey={instrumentKey}
          closeOverlay={close}
          navigate={navigate}
          drawerRef={drawerRef}
        ></EditOtherAssetForm>
      );
    },
  });
};

export default EditOtherAssetForm;
