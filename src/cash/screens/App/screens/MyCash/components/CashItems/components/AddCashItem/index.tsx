import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { defaultOptions } from '../../../../../../../../../common/components/SmoothScroll/helpers';
import {
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { replaceAll } from '../../../../../../../../../shared/helpers/replaceAll';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import { formatPrice } from '../../../../../../components/Highcharts/helpers';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';
import InputField from '../../../../../../components/Paragraphs/components/WebformParagraph/components/InputField';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../../../../components/Toast';
import modal from '../../../../../../components/Modal';
import { cashItemsApolloConfig } from '../../apolloConfig';
import { SCROLLABLE_DRAWER_CONTENT_ID } from '../../../../../../../../../common/components/ScrollableDrawerContent/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../../../../../../components/Toast/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/sc */
import { ADD_CASH_ITEM, GET_CASH_ITEMS } from '../../queries';
import styles from './styles.legacy.css';

type AddCashItemFormProps = {
  portfolioKey?: string;
  portfolioCurrency?: string;
  closeOverlay: () => void;
  navigate: NavigateFunction;
  origin?: string;
  type?: 'deposit' | 'withdraw';
  drawerRef?: React.MutableRefObject<HTMLElement>;
};

const AddCashItem = ({
  closeOverlay,
  portfolioKey,
  portfolioCurrency,
  origin = '',
  type,
  drawerRef,
}: AddCashItemFormProps) => {
  const initialDate = new Date().setDate(new Date().getDate());
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [addCashItemMutation] = useMutation(ADD_CASH_ITEM);
  const formFields = useRef<FieldComponentProps[]>([]);
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
  const handleAddCashItem = (values): void => {
    const amount = `${type === 'deposit' ? '' : '-'}${values.amount}`;
    const variables: any = {
      ...values,
      portfolioKey,
      amount: replaceAll(amount, /['’]/, ''), // convert to string to avoid errors
    };

    if (submitted) {
      return;
    }
    setFormLoading(true);

    const { ...cashItemsOptions } = cashItemsApolloConfig.options({
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        portfolioKey: portfolioKey,
      },
    });

    // send mutation
    addCashItemMutation({
      variables,
      refetchQueries: [
        {
          query: GET_CASH_ITEMS,
          variables: {
            ...cashItemsOptions.variables,
          },
        },
      ],
    })
      .then(async ({ data, errors }): Promise<void> => {
        if (
          (data?.addCashItem &&
            data?.addCashItem?.error &&
            data?.addCashItem?.error !== null) ||
          errors
        ) {
          if (!toast.isActive('add-cash-items-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'add-cash-items-error');
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('add-cash-items-error')) {
          toast.dismiss('add-cash-items-error');
        }

        // refetch cash-items data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchCashItems;

        setSubmitError(false);
        setSubmitted(true);
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        if (global.refetchPortfoliosGQL) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.refetchPortfoliosGQL();
        }
        if (refetch) {
          refetch().then(() => {
            setFormLoading(false);
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'account_transaction_add',
                event_category: 'portfolio',
                event_action: 'account_transaction_add',
                portfolio_key: portfolioKey,
                transaction_type: type,
                from: `${origin || ''}`,
              },
            });
            closeOverlay();
          });
        } else {
          setFormLoading(false);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'account_transaction_add',
              event_category: 'portfolio',
              event_action: 'account_transaction_add',
              portfolio_key: portfolioKey,
              transaction_type: type,
              from: `${origin || ''}`,
            },
          });
          closeOverlay();
          displaySuccessToast(
            `${formatPrice(variables.amount)} ${portfolioCurrency} wurde ${
              (type === 'deposit' && 'eingezahlt') || 'abgehoben'
            }.`,
            'cash-items-submitted',
            {
              text: 'Zur Kontoübersicht',
              path: `/portfolio/${portfolioKey}/konto`,
            },
          );
        }
        return;
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('add-cash-items-error')) {
          displayErrorToast(DEFAULT_ERROR_MESSAGE, 'add-cash-items-error');
        }

        setSubmitError(true);
        setSubmitted(false);
        setFormLoading(false);
        return;
      });
  };

  const validateForm = (): void => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    event.preventDefault();

    /* @ts-ignore TODO: TS7034 ->  Variable 'errors' implicitly has type 'any[]' in some locations where its type cannot be determined. */
    const errors = [];
    const values = {};

    // get the values of all registered fields within this form
    formFields.current.forEach((formField: FieldComponentProps) => {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      const value = formField.getValue();
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      const id = formField.getId();

      if (id === 'amount' && value === '0') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formField.setIsValid(false);
        errors.push(false);
      } else {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        errors.push(formField.validate());
      }
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      values[id] = id === 'amount' ? replaceAll(value, /['’]/, '') : value;
    });

    /* @ts-ignore TODO: TS7005 ->  Variable 'errors' implicitly has an 'any[]' type. */
    const filteredErrors = errors.filter((result: boolean): boolean => !result);
    if (filteredErrors.length) {
      /* @ts-ignore TODO: TS7005 ->  Variable 'errors' implicitly has an 'any[]' type. */
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

    handleAddCashItem(values);
  };

  const headerJsx = (
    <div className={styles.Title}>
      {(type === 'deposit' && 'Einzahlung') || 'Abhebung'}
    </div>
  );

  const forumSubmitButtonsJsx = (
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
        ariaLabel={`Cash ${(type === 'deposit' && 'einzahlen') || 'abheben'}`}
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
      createPortal(<>{forumSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;

  return (
    <div className={styles.Wrapper}>
      {stickyHeader}

      {(formLoading && <LoadingSpinner />) ||
        (!submitted && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="amount"
              disabled={formLoading}
              label="Betrag"
              title="amount"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              initialValue={''}
              errorMessage={'Bitte geben Sie einen gültigen Betrag ein'}
              id={'amount'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'amount'}
              pattern="^(([0-9'’]?)+[.])?[0-9'’]+$"
              inputmode="decimal"
            />
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
            {stickyFooter}
          </form>
        )) ||
        null}
    </div>
  );
};

export const addCashItem = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioCurrency' implicitly has an 'any' type. */
  portfolioCurrency,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
  navigate,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  type,
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
        <AddCashItem
          portfolioKey={portfolioKey}
          portfolioCurrency={portfolioCurrency}
          closeOverlay={close}
          navigate={navigate}
          origin={origin}
          type={type}
          drawerRef={drawerRef}
        ></AddCashItem>
      );
    },
  });
};

export default AddCashItem;
