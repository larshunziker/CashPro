import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import InputField from '../Paragraphs/components/WebformParagraph/components/InputField';
import MultiField from '../Paragraphs/components/WebformParagraph/components/MultiField';
import SelectField from '../Paragraphs/components/WebformParagraph/components/SelectField';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { portfolioTrade } from '../PortfolioTradeForm';
import { displayErrorToast, displayInfoToast } from '../Toast';
import modal from '../Modal';
import {
  portfolioByKeyApolloConfig,
  portfolioScreenApolloConfig,
} from '../../screens/MyCash/components/Portfolio/apolloConfig';
import { portfoliosCalculatedScreenApolloConfig } from '../../screens/MyCash/components/Portfolios/apolloConfig';
import {
  DEFAULT_VIEW,
  LIMIT_VIEW,
  MONITOR_VIEW,
  ORIGINAL_CURRENCY_VIEW,
  PERFORMANCE_VIEW,
  SPECIAL_INFO_VIEW,
} from '../../screens/MyCash/components/Table/constants';
import { PORTFOLIO_TRADE_FORM_TYPE_BUY } from '../PortfolioTradeForm/constants';
import {
  AUTHORIZATION_DEFAULT_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_ID,
  DEFAULT_ERROR_MESSAGE,
} from '../Toast/constants';
import { PORTFOLIO_ADD_FORM, PORTFOLIO_EDIT_FORM } from './constants';
import {
  ADD_PORTFOLIO,
  EDIT_PORTFOLIO,
  GET_PORTFOLIOS,
  GET_PORTFOLIO_BY_KEY,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/queries'. '/Users/bhs/code/work/rasch-stack/src/cash */
} from '../../screens/MyCash/components/Portfolio/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/queries'. '/Users/bhs/code/work/rasch-stack/src/cash */
import { GET_PORTFOLIOS_CALCULATED } from '../../screens/MyCash/components/Portfolios/queries';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/MyCash/queries'. '/Users/bhs/code/work/rasch-stack/src/cash */
import { EDIT_DEFAULTS } from '../../screens/MyCash/queries';
import styles from './styles.legacy.css';

type PortfolioCreateEditFormProps = {
  formType?: typeof PORTFOLIO_ADD_FORM | typeof PORTFOLIO_EDIT_FORM;
  withTransaction?: boolean;
  instrumentKey?: string;
  portfolioKey?: string;
  portfolioName?: string;
  isDefaultPortfolio?: boolean;
  closeOverlay: () => void;
  navigate: NavigateFunction;
  origin?: string;
  drawerRef?: React.MutableRefObject<HTMLDivElement>;
};

const hasSameNamedPortfolio = (
  portfolioList: Portfolio[],
  portfolioName: string,
) => {
  return portfolioList?.some(
    (portfolio: Portfolio) => portfolio.name === portfolioName,
  );
};

const PortfolioCreateEditForm = ({
  closeOverlay,
  formType,
  portfolioKey,
  portfolioName,
  isDefaultPortfolio,
  navigate,
  withTransaction,
  instrumentKey,
  origin,
  drawerRef,
}: PortfolioCreateEditFormProps) => {
  const location = useRaschRouterLocation();
  // needed to fetch portfolioList here to check if there already are portfolios or if it's the first one
  const { query: porfolioQuery, ...portfolioOptions } =
    portfolioScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true',
      },
    });
  const { data, loading } = useQuery(porfolioQuery, portfolioOptions);
  const [formLoading, setFormLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [openDefaultViewInfo, setOpenDefaultViewInfo] = useState(false);
  const [addPortfolioMutation] = useMutation(ADD_PORTFOLIO);
  const [editPortfolioMutation] = useMutation(EDIT_PORTFOLIO);
  const [editPortfolioSettingsMutation] = useMutation(EDIT_DEFAULTS);
  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };

  useEffect(() => {
    if (!loading) {
      setFormLoading(false);
    }
  }, [loading]);

  const isFirstPortfolio = !data?.portfolios || data?.portfolios?.count === 0;
  const isAddPortfolioForm = formType === PORTFOLIO_ADD_FORM;

  const currencySelectOptions = [
    {
      label: 'CHF',
      value: 'CHF',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
  ];

  const defaultViewSelectiontOptions = [
    {
      label: 'Standard Ansicht (empfohlen)',
      value: 'Standard Ansicht (empfohlen)',
    },
    {
      label: 'Original-Währung Ansicht',
      value: 'Original-Währung Ansicht',
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

  const getViewTypeByValue = (value: string) => {
    switch (value) {
      case 'Original-Währung Ansicht':
        return ORIGINAL_CURRENCY_VIEW;
      case 'Performance Ansicht':
        return PERFORMANCE_VIEW;
      case 'Limiten Ansicht':
        return LIMIT_VIEW;
      case 'Spezial-Info':
        return SPECIAL_INFO_VIEW;
      case 'Monitor Ansicht':
        return MONITOR_VIEW;
      case 'Standard Ansicht (empfohlen)':
      default:
        return DEFAULT_VIEW;
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
  const handleAddEditPortfolio = (values): void => {
    let mutation = null;
    const variables: any = {
      name: values.portfolioName,
      defaultPortfolio:
        (Array.isArray(values.defaultPortfolio) &&
          values.defaultPortfolio.length > 0) ||
        isDefaultPortfolio ||
        false,
    };

    mutation =
      (isAddPortfolioForm && addPortfolioMutation) || editPortfolioMutation;

    if (isAddPortfolioForm) {
      variables.currency = values.currency;
    } else {
      variables.portfolioKey = portfolioKey;
    }

    if (submitted || !mutation) {
      return;
    }
    setFormLoading(true);

    const { ...portfoliosCalculatedOptions } =
      portfoliosCalculatedScreenApolloConfig.options({
        location,
        params: {
          isAuthenticated: 'true',
          withTransaction: 'false',
        },
      });
    const { ...portfolioByKeyOptions } = portfolioByKeyApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        portfolioKey,
        withTransaction: 'false',
      },
    });
    const refetchQueries = [
      {
        query: GET_PORTFOLIOS,
        variables: {
          ...portfolioOptions.variables,
        },
      },
      {
        query: GET_PORTFOLIOS_CALCULATED,
        variables: {
          ...portfoliosCalculatedOptions.variables,
        },
      },
    ];
    if (portfolioKey) {
      refetchQueries.push({
        query: GET_PORTFOLIO_BY_KEY,
        variables: {
          ...portfolioByKeyOptions.variables,
        },
      });
    }
    // send mutation
    mutation({
      variables,
      refetchQueries,
    })
      .then(async ({ data }): Promise<void> => {
        if (
          (data?.addPortfolio &&
            data?.addPortfolio?.error &&
            data?.addPortfolio?.error !== null) ||
          (data?.editPortfolio &&
            data?.editPortfolio?.error &&
            data?.editPortfolio?.error !== null)
        ) {
          if (!toast.isActive('portfolio-error')) {
            displayErrorToast(DEFAULT_ERROR_MESSAGE, 'portfolio-error');
          }
          setSubmitError(true);
          setFormLoading(false);
          return;
        }

        if (toast.isActive('portfolio-error')) {
          toast.dismiss('portfolio-error');
        }

        if (isAddPortfolioForm) {
          const viewType = getViewTypeByValue(values.viewType);

          editPortfolioSettingsMutation({
            variables: {
              key: data.addPortfolio.portfolioKey,
              view: viewType || '',
              grouping: '',
              settingsType: 'portfolio',
            },
          }).then(
            async ({ data: savePortfolioSettingsData }): Promise<void> => {
              if (
                savePortfolioSettingsData?.editDefaults &&
                savePortfolioSettingsData?.editDefaults?.error &&
                savePortfolioSettingsData?.editDefaults?.error !== null
              ) {
                if (!toast.isActive('portfolio-edit-defaults-error')) {
                  displayErrorToast(
                    DEFAULT_ERROR_MESSAGE,
                    'portfolio-edit-defaults-error',
                  );
                }
                setSubmitError(true);
                setFormLoading(false);
              }
            },
          );
        }

        // refetch portfolio data
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetch = global.refetchPortfoliosGQL;

        //refetch list for portfolio selection dropdown
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        const refetchPortfolioList = global.refetchAllPortfoliosGQL;

        setSubmitError(false);
        setSubmitted(true);
        if (refetch && refetchPortfolioList && !isFirstPortfolio) {
          refetch().then(() => {
            refetchPortfolioList().then(() => {
              setFormLoading(false);

              // track tealium event on successful portfolio creation
              if (isAddPortfolioForm) {
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'portfolio_create',
                    event_category: 'portfolio',
                    event_action: 'portfolio_create',
                    portfolio_key: data?.addPortfolio?.portfolioKey,
                    from: origin,
                  },
                });
              }

              if (!withTransaction) {
                closeOverlay();
              }
              if (isAddPortfolioForm && !withTransaction) {
                navigate(`/portfolio/${data?.addPortfolio?.portfolioKey}`);
              } else if (
                withTransaction &&
                instrumentKey &&
                data?.addPortfolio?.portfolioKey
              ) {
                return portfolioTrade({
                  portfolioKey: data?.addPortfolio?.portfolioKey,
                  instrumentKey: instrumentKey,
                  type: PORTFOLIO_TRADE_FORM_TYPE_BUY,
                  withNewPortfolio: true,
                  preventRefetch: isFirstPortfolio,
                  origin: 'portfolio-management-form',
                });
              }
            });
          });
        } else {
          setFormLoading(false);
          // track tealium event on successful portfolio creation
          if (isAddPortfolioForm) {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'portfolio_create',
                event_category: 'portfolio',
                event_action: 'portfolio_create',
                portfolio_key: data?.addPortfolio?.portfolioKey,
              },
            });
          }
          if (!withTransaction) {
            closeOverlay();
          }
          if (isAddPortfolioForm && !withTransaction) {
            navigate(`/portfolio/${data?.addPortfolio?.portfolioKey}`);

            if (isFirstPortfolio && refetchPortfolioList) {
              refetchPortfolioList();
            }
          }
          if (
            withTransaction &&
            instrumentKey &&
            data?.addPortfolio?.portfolioKey
          ) {
            return portfolioTrade({
              portfolioKey: data?.addPortfolio?.portfolioKey,
              instrumentKey: instrumentKey,
              type: PORTFOLIO_TRADE_FORM_TYPE_BUY,
              withNewPortfolio: true,
              preventRefetch: isFirstPortfolio,
              origin: 'portfolio-management-form',
            });
          }
        }
      })
      .catch((): void => {
        if (!submitError && !toast.isActive('portfolio-error')) {
          displayErrorToast(DEFAULT_ERROR_MESSAGE, 'portfolio-error');
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
          'portfolioName' === formField.getId() &&
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          hasSameNamedPortfolio(data?.portfolios?.items, formField.getValue())
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

    handleAddEditPortfolio(values);
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

  const formSubmitButtonsJsx = (
    <div className={styles.ButtonWrapper}>
      <ButtonWithLoading
        tabIndex={-1}
        onClick={closeOverlay}
        variant="secondary"
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
        ariaLabel={'Portfolio umbenennen'}
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
        (!submitted && isAddPortfolioForm && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="portfolioName"
              disabled={false}
              label="Portfolio Bezeichnung"
              title="portfolioName"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              initialValue={''}
              handleChange={handleChange.bind(this)}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'portfolioName'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'portfolioName'}
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
                errorMessage="Bitte wählen Sie eine Ansicht für ihr Portfolio aus"
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
            <SelectField
              id="currency"
              fieldName="currency"
              title="Currency Selection"
              type="string"
              value={''}
              getValue={getValue}
              getId={() => 'currency'}
              validate={() => validateForm}
              errorMessage="Bitte wählen Sie eine Währung für ihr Portfolio aus"
              label={`Währung`}
              options={currencySelectOptions}
              register={registerField.bind(this)}
              required={true}
              withErrorIcon={false}
              helperText={'Kann später nicht mehr geändert werden'}
              disabled={false}
            />
            <MultiField
              fieldName="defaultPortfolio"
              disabled={isFirstPortfolio || false}
              label={'Als Standard Portfolio setzen'}
              title={'Als Standard Portfolio setzen'}
              displayOptionsInline
              maxlength={255}
              value={''}
              options={[
                {
                  label: 'Als Standard Portfolio setzen',
                  value: 'true',
                  initiallyChecked:
                    isDefaultPortfolio || isFirstPortfolio || false,
                },
              ]}
              register={registerField.bind(this)}
              type="checkboxes"
              errorMessage={'Bitte wählen Sie eine Option aus'}
              id={'defaultPortfolio'}
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'defaultPortfolio'}
            />
            <p>Ihr Standard-Portfolio wird z.B. als Mini-Vorschau angezeigt</p>
            {stickyFooter}
          </form>
        )) ||
        (!submitted && (
          <form onSubmit={validateForm.bind(this)} noValidate lang="de-CH">
            <InputField
              animatedLabel
              fieldName="portfolioName"
              disabled={false}
              label="Portfolio Bezeichnung"
              title="portfolioName"
              maxlength={50}
              value={''}
              register={registerField.bind(this)}
              withErrorIcon={false}
              type="string"
              handleChange={handleChange.bind(this)}
              initialValue={portfolioName || ''}
              errorMessage={'Bitte geben Sie einen Namen an'}
              id={'portfolioName'}
              required
              validate={() => validateForm}
              getValue={getValue}
              getId={() => 'portfolioName'}
            />
            <div className={styles.Hidden}>
              <MultiField
                fieldName="defaultPortfolio"
                disabled={false}
                label={'Als Standard Portfolio setzen'}
                title={'Als Standard Portfolio setzen'}
                displayOptionsInline
                maxlength={255}
                type="checkboxes"
                value=""
                options={[
                  {
                    label: 'Als Standard Portfolio setzen',
                    value: 'true',
                    initiallyChecked: isDefaultPortfolio || false,
                  },
                ]}
                register={registerField.bind(this)}
                errorMessage={'Bitte wählen Sie eine Option aus'}
                id={'defaultPortfolio'}
                validate={() => validateForm}
                getValue={getValue}
                getId={() => 'defaultPortfolio'}
              />
            </div>
            {stickyFooter}
          </form>
        ))}
    </div>
  );
};

export const portfolioCreate = ({
  navigate = null,
  withTransaction = false,
  instrumentKey = '',
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
    title: 'Neues Portfolio anlegen',
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <PortfolioCreateEditForm
          formType={PORTFOLIO_ADD_FORM}
          closeOverlay={close}
          isDefaultPortfolio={false}
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'NavigateFunction'. */
          navigate={navigate}
          withTransaction={withTransaction}
          instrumentKey={instrumentKey}
          origin={origin}
          drawerRef={drawerRef}
        ></PortfolioCreateEditForm>
      );
    },
  });
};

export const portfolioEdit = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioKey' implicitly has an 'any' type. */
  portfolioKey,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'portfolioName' implicitly has an 'any' type. */
  portfolioName,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isDefaultPortfolio' implicitly has an 'any' type. */
  isDefaultPortfolio,
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
    title: 'Portfolio umbenennen',
    hasStickyHeader: true,
    hasStickyFooter: true,
    hideDefaultButtons: true,
    closeOnClickOutside: false,
    closeOnLocationChange: true,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
    customUi: ({ close, drawerRef }) => {
      return (
        <PortfolioCreateEditForm
          formType={PORTFOLIO_EDIT_FORM}
          portfolioKey={portfolioKey}
          portfolioName={portfolioName}
          isDefaultPortfolio={isDefaultPortfolio}
          closeOverlay={close}
          navigate={navigate}
          drawerRef={drawerRef}
        />
      );
    },
  });
};

export default PortfolioCreateEditForm;
