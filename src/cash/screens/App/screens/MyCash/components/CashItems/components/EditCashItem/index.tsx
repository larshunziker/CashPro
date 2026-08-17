import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { defaultOptions } from '../../../../../../../../../common/components/SmoothScroll/helpers';
import {
  DATE_FORMAT_SIMPLYBOOK,
  formatDate,
} from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';
import InputField from '../../../../../../components/Paragraphs/components/WebformParagraph/components/InputField';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
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
import { EDIT_CASH_ITEM, GET_CASH_ITEMS } from '../../queries';
import styles from './styles.legacy.css';

type EditCashItemFormProps = {
  portfolioKey?: string;
  cashItemKey?: string;
  closeOverlay: () => void;
  drawerRef: React.RefObject<HTMLDivElement>;
};

const EditCashItem = ({
  closeOverlay,
  portfolioKey,
  cashItemKey,
  drawerRef,
}: EditCashItemFormProps) => {
  const initialDate = new Date().setDate(new Date().getDate());
  const [formLoading, setFormLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [editCashItemMutation] = useMutation(EDIT_CASH_ITEM);
  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };

  const { query: cashItemsQuery, ...cashItemsOptions } =
    cashItemsApolloConfig.options({
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        portfolioKey: portfolioKey,
      },
    });

  const { data: apolloData, loading } = useQuery(
    cashItemsQuery,
    cashItemsOptions,
  );

  const cashItem = apolloData?.getCashItems?.cashItems?.edges?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    (item) => item.node.cashItemKey === cashItemKey,
  )?.node;

  if (!loading && formFields.current && !submitted && cashItem) {
    formFields.current.forEach((field: FieldComponentProps) => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'amount') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(cashItem?.amount);
      }
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'date' && cashItem?.date) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setValue(formatDate(cashItem.date, DATE_FORMAT_SIMPLYBOOK));
      }
    });
  }
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
  const handleEditCashItem = (values): void => {
    const variables: any = {
      ...values,
      portfolioKey,
      cashItemKey,
      amount: `${values.amount}`, // convert to string to avoid errors
    };

    if (submitted) {
      return;
    }
    setFormLoading(true);

    // send mutation
    editCashItemMutation({
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
          (data?.editCashItem &&
            data?.editCashItem?.error &&
            data?.editCashItem?.error !== null) ||
          errors
        ) {
          if (!toast.isActive('edit-cash-items-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'edit-cash-items-error');
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('edit-cash-items-error')) {
          toast.dismiss('edit-cash-items-error');
        }

        // refetch cash-items data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchCashItems;

        setSubmitError(false);
        setSubmitted(true);
        if (refetch) {
          refetch().then(() => {
            setFormLoading(false);
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'account_transaction_edit',
                event_category: 'portfolio',
                event_action: 'account_transaction_edit',
                portfolio_key: portfolioKey,
                from: `account_overview`,
              },
            });
            closeOverlay();
          });
        } else {
          setFormLoading(false);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'account_transaction_edit',
              event_category: 'portfolio',
              event_action: 'account_transaction_edit',
              portfolio_key: portfolioKey,
              from: `account_overview`,
            },
          });
          closeOverlay();
        }
        return;
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('edit-cash-items-error')) {
          displayErrorToast(DEFAULT_ERROR_MESSAGE, 'edit-cash-items-error');
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
    formFields.current.forEach((field: FieldComponentProps) => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      if (field.getId() === 'amount' && field.getValue() === '0') {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        field.setIsValid(false);
        errors.push(false);
      } else {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        errors.push(field.validate());
      }
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

    const values = {};
    // get the values of all registered fields within this form
    formFields.current.forEach((formField: FieldComponentProps): void => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      values[formField.getId()] = formField.getValue();
    });

    handleEditCashItem(values);
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
        ariaLabel={'Konto-Eintrag anpassen'}
      >
        Speichern
      </ButtonWithLoading>
    </div>
  );

  const stickyFooterContainer =
    document.getElementById('ModalStickyFooter') || null;

  const stickyFooter =
    (drawerRef?.current &&
      stickyFooterContainer &&
      createPortal(<>{formSubmitButtonsJsx}</>, stickyFooterContainer)) ||
    null;

  return (
    <div className={styles.Wrapper}>
      {(formLoading && <LoadingSpinner />) ||
        (!submitted && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="amount"
              disabled={formLoading}
              label="Betrag"
              title="Betrag"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              initialValue={''}
              errorMessage={'Bitte geben Sie einen gültigen betrag ein'}
              id={'amount'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'amount'}
              pattern="^-?(([0-9'’]?)+[.])?[0-9'’]+$"
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
            <div key={cashItem?.comment}>
              <InputField
                animatedLabel
                fieldName="comment"
                disabled={formLoading}
                label="Kommentar"
                title="Kommentar"
                value={cashItem?.comment || ''}
                register={registerField.bind(this)}
                withErrorIcon={false}
                type="textarea"
                errorMessage="Bitte geben Sie einen Kommentar ein"
                initialValue={cashItem?.comment || ''}
                id="comment"
                required={false}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'comment'}
                maxlength={200}
                maxlengthMessage=" Anzahl Zeichen aufgebraucht"
              />
            </div>
            {stickyFooter}
          </form>
        )) ||
        null}
    </div>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'cashItemKey' implicitly has an 'any' type. */
export const editCashItem = ({ portfolioKey, cashItemKey }) => {
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
    title: 'Konto-Eintrag anpassen',
    hasStickyHeader: true,
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <EditCashItem
          portfolioKey={portfolioKey}
          closeOverlay={close}
          cashItemKey={cashItemKey}
          drawerRef={drawerRef}
        ></EditCashItem>
      );
    },
  });
};

export default EditCashItem;
