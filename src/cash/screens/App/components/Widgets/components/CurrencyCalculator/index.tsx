import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { formatPrice, getRangeByActiveTab } from '../../../Highcharts/helpers';
import {
  convertDateToIsoString,
  getCurrentListingKey,
  getPickedDateRange,
} from './helpers';
import HighchartsWrapper from '../../../Highcharts/component';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import DatePicker from './components/DatePicker';
import SelectField from './components/SelectField';
import SwitchIcon from './components/SwitchIcon';
import { currencyCalculatorApolloConfig } from './apolloConfig';
import { HIGHCHART_LINE_CHART } from '../../../Highcharts/constants';
import { currencySelectOptions, listingKeysMapping } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_CURRENCY_CALCULATOR_DATA } from './queries';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.SwissFlag, styles.Flag];

type CurrencyCalculatorProps = {
  widgetParagraph: WidgetParagraph;
};

const CurrencyCalculator = ({ widgetParagraph }: CurrencyCalculatorProps) => {
  const [instruments, setInstruments] = useState(null);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [useSmallLayout, setUseSmallLayout] = useState(null);
  const [useColumnLayout, setUseColumnLayout] = useState(null);
  const [inputInfo, setInputInfo] = useState({
    value: '100',
    type: 'fromInput',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [pickedDateRange, setPickedDateRange] = useState('threeMonths');
  const [activeState, setActiveState] = useState({
    activeListingKey: null,
    fromCurrency: null,
    toCurrency: null,
    activeDate: null,
    value: null,
  });

  const wrapperRef = useRef(null);
  const formWrapperRef = useRef(null);
  const datePickerRef = useRef(null);

  const widgetParagraphUrl =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | URL'. */
    widgetParagraph && new URL(widgetParagraph.link.path);

  const listingKey =
    (widgetParagraphUrl?.searchParams?.get('listingKey') === '[listingId]' &&
      // default CHF/EUR listingKey
      '968880-149-814') ||
    widgetParagraphUrl?.searchParams?.get('listingKey');

  const disableChart =
    widgetParagraphUrl?.searchParams?.get('disableChart') === 'true' || false;

  const currentDate = convertDateToIsoString(new Date(Date.now()));

  // Get all listingKeys to fetch from the config listingKeysMapping
  const listingKeys = Object.keys(listingKeysMapping).join(',');
  listingKeys.substring(1);

  const { data, loading, error } = useQuery(GET_CURRENCY_CALCULATOR_DATA, {
    variables: { listingKeys },
    skip: !listingKeys,
  });

  const { query: currencyCalculatorQuery, ...currencyCalculatorOptions } =
    currencyCalculatorApolloConfig.options({
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
        listingKey,
        from: currentDate,
        to: currentDate,
        max: '1',
      },
    });

  const [getDatePickerData] = useLazyQuery(currencyCalculatorQuery, {
    ...currencyCalculatorOptions,
  });

  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
  const onChangeDate = async (value) => {
    let newValue = null;
    if (value) {
      if (value === currentDate) {
        newValue = {
          date: currentDate,
          /* @ts-ignore TODO: TS2339 ->  Property 'lval' does not exist on type 'never'. */
          last: currentInstrument?.lval,
        };
      } else {
        newValue = await fetchNewData(
          `${activeState?.fromCurrency}/${activeState?.toCurrency}`,
        );
      }
    }

    const pickedDateRange = getPickedDateRange(newValue);
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'SetStateAction<string>'. */
    setPickedDateRange(pickedDateRange);
    setActiveState({ ...activeState, value: newValue, activeDate: value });
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'identifier' implicitly has an 'any' type. */
  const fetchNewData = async (identifier) => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    const datePickerInputValue = datePickerRef.current.value;

    const isSameDate = datePickerInputValue === currentDate;
    const currentListingKey = getCurrentListingKey(identifier);
    let newValue = null;

    if (!isSameDate) {
      const { data } = await getDatePickerData({
        variables: {
          listingKey: currentListingKey,
          from: datePickerInputValue,
          to: datePickerInputValue,
          max: '1',
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-only',
        ssr: false,
      });

      newValue = data?.integration?.solid?.chart?.hiku?.prices?.[0];
    } else {
      /* @ts-ignore TODO: TS2339 ->  Property 'find' does not exist on type 'never'. */
      const currentInstrument = instruments?.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
        (instrument) => instrument?.node?.instrumentKey === currentListingKey,
      );
      newValue = { date: currentDate, last: currentInstrument?.lval };
    }

    return newValue;
  };

  /* @ts-ignore TODO: TS7031 ->  Binding element 'currency' implicitly has an 'any' type. */
  const handleFromSelectFieldChange = async ({ currency }) => {
    const identifier = `${currency}/${activeState?.toCurrency}`;
    const newData = await fetchNewData(identifier);

    setActiveState({
      ...activeState,
      fromCurrency: currency,
      value: newData,
    });
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: `currency_change_from`,
        event_category: 'currency_calculator',
        event_action: `currency_change_from`,
        from: `${currency}`,
        to: `${activeState.fromCurrency}`,
      },
    });
  };

  /* @ts-ignore TODO: TS7031 ->  Binding element 'currency' implicitly has an 'any' type. */
  const handleToSelectFieldChange = async ({ currency }) => {
    const identifier = `${activeState?.fromCurrency}/${currency}`;
    const newData = await fetchNewData(identifier);

    setActiveState({
      ...activeState,
      toCurrency: currency,
      value: newData,
    });

    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: `currency_change_to`,
        event_category: 'currency_calculator',
        event_action: `currency_change_to`,
        from: `${activeState.fromCurrency}`,
        to: `${currency}`,
      },
    });
  };

  const handleInputValue = (type: string, value: string) => {
    setInputInfo({ value, type });
  };

  const getCalculatedValue = useCallback(() => {
    if (currentInstrument) {
      /* @ts-ignore TODO: TS2339 ->  Property 'last' does not exist on type 'never'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'lval' does not exist on type 'never'. */
      const value = activeState?.value?.last || currentInstrument?.lval;
      const calculatedVal =
        (Number(inputInfo?.value) * Number(value)) /
        /* @ts-ignore TODO: TS2339 ->  Property 'pricingamt' does not exist on type 'never'. */
        currentInstrument.pricingamt;

      return calculatedVal;
    }
  }, [currentInstrument, inputInfo, activeState]);

  const handleFormUpdate = useCallback(() => {
    const identifier =
      (inputInfo.type === 'fromInput' &&
        `${activeState.fromCurrency}/${activeState.toCurrency}`) ||
      `${activeState.toCurrency}/${activeState.fromCurrency}`;

    const currentListingKey = getCurrentListingKey(identifier);

    /* @ts-ignore TODO: TS2339 ->  Property 'find' does not exist on type 'never'. */
    const currentInstrument = instruments?.find(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
      (instrument) => instrument?.node?.instrumentKey === currentListingKey,
    );

    setCurrentInstrument(currentInstrument?.node);

    const isSameCurrency = activeState.fromCurrency === activeState.toCurrency;

    const inputField = formFields?.current?.find(
      (field: FieldComponentProps): boolean => {
        const identifier =
          (inputInfo.type === 'fromInput' && 'toInputField') ||
          'fromInputField';
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === identifier;
      },
    );

    if (isSameCurrency) {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      inputField.setValue(inputInfo?.value);
    } else {
      const calculatedValue = getCalculatedValue();
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      inputField.setValue(formatPrice(calculatedValue));
    }
  }, [getCalculatedValue, inputInfo, activeState, instruments]);

  const formWrapperWidth =
    /* @ts-ignore TODO: TS2339 ->  Property 'getBoundingClientRect' does not exist on type 'never'. */
    formWrapperRef?.current?.getBoundingClientRect?.()?.width || null;

  const wrapperWidth =
    /* @ts-ignore TODO: TS2339 ->  Property 'getBoundingClientRect' does not exist on type 'never'. */
    wrapperRef?.current?.getBoundingClientRect?.()?.width || null;

  useEffect(() => {
    if (formWrapperWidth && wrapperRef) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean' is not assignable to parameter of type 'SetStateAction<null>'. */
      setUseSmallLayout(formWrapperWidth < 500 || wrapperWidth <= 500);
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean' is not assignable to parameter of type 'SetStateAction<null>'. */
      setUseColumnLayout(wrapperWidth <= 500);
    }
    if (data && activeState.fromCurrency && activeState.toCurrency) {
      setInstruments(data?.quoteList?.quoteList?.edges);
      handleFormUpdate();
    }
  }, [
    handleFormUpdate,
    data,
    listingKeys,
    formWrapperWidth,
    wrapperWidth,
    activeState.fromCurrency,
    activeState.toCurrency,
  ]);

  useEffect(() => {
    if (listingKey && !isDirty) {
      const valor = listingKey.split('-').at(0);
      const currency = listingKey.split('-').at(-1);
      let fromToCurrencies = 'CHF/EUR';
      const regex = new RegExp(`${valor}-.*-${currency}`, 'g');

      Object.entries(listingKeysMapping).map((item) => {
        if (item[0].match(regex)) {
          fromToCurrencies = item[1];
        }
      });

      const [from, to] = fromToCurrencies?.split('/');
      /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'null'. */
      /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'null'. */
      setActiveState({ ...activeState, fromCurrency: from, toCurrency: to });
      setIsDirty(true);
    }
  }, [listingKey, isDirty, currentInstrument, activeState]);

  const formFields = useRef<FieldComponentProps[]>([]);
  const registerField = (formField: FieldComponentProps): void => {
    formFields.current.push(formField);
  };

  const handleSwitchIconClick = async () => {
    const values = {} as any;

    formFields.current.forEach((formField: FieldComponentProps): void => {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      values[formField.getId()] = formField.getValue();
    });

    const fromSelectField = formFields?.current?.find(
      (field: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === 'fromSelectField';
      },
    );

    const toSelectField = formFields?.current?.find(
      (field: FieldComponentProps): boolean => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return field.getId() === 'toSelectField';
      },
    );

    const identifier = `${values.toSelectField.currency}/${values.fromSelectField.currency}`;
    const newData = await fetchNewData(identifier);

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
    toSelectField.setValue(values.fromSelectField);
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
    fromSelectField.setValue(values.toSelectField);

    setActiveState({
      ...activeState,
      fromCurrency: values.toSelectField.currency,
      toCurrency: values.fromSelectField.currency,
      value: newData,
    });

    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: `switch_currencies`,
        event_category: 'currency_calculator',
        event_action: `switch_currencies`,
        from: `${values.toSelectField.currency}`,
        to: `${values.fromSelectField.currency}`,
      },
    });
  };

  const findInitialSelect = (type: string) => {
    const currencyToCompare =
      (type === 'from' && activeState.fromCurrency) || activeState.toCurrency;
    const initialSelectOption = currencySelectOptions.find((option) => {
      return option.currency === currencyToCompare;
    });

    return initialSelectOption;
  };

  if (!data || loading || error) {
    return <div className={styles.SkeletonWrapper} />;
  }

  return (
    <div className={styles.Wrapper} ref={wrapperRef}>
      <div className={styles.Title}>Währungsrechner</div>
      <div
        className={classNames(styles.ContentWrapper, {
          [styles.ColumnLayout]: useColumnLayout,
        })}
      >
        {currentInstrument && !disableChart && pickedDateRange && (
          <div
            className={classNames(styles.ChartWrapper, {
              [styles.FullWidth]: useColumnLayout,
            })}
          >
            <HighchartsWrapper
              /* @ts-ignore TODO: TS2339 ->  Property 'instrumentKey' does not exist on type 'never'. */
              key={`currency-calculator-chart-${currentInstrument?.instrumentKey}-${pickedDateRange}`}
              isInterActiveButtonVisible={false}
              isTabVisible={false}
              widgetParagraph={{
                timePeriodValues: [pickedDateRange],
                link: {
                  path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/charts-json/timeserie/${
                    /* @ts-ignore TODO: TS2339 ->  Property 'instrumentKey' does not exist on type 'never'. */
                    currentInstrument?.instrumentKey || ''
                    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ intraday */
                  }/${getRangeByActiveTab[pickedDateRange]}`,
                },
              }}
              origin="cash-currency-calculator"
              component={HIGHCHART_LINE_CHART}
            />
          </div>
        )}
        <div
          className={classNames(styles.FormWrapper, {
            [styles.FullWidth]: disableChart || useColumnLayout,
          })}
        >
          <form ref={formWrapperRef} noValidate lang="de-CH">
            <div
              className={classNames(styles.InputRow, {
                [styles.SmallLayout]: !useSmallLayout,
              })}
            >
              <div
                className={classNames(styles.InputFieldWrapper, {
                  [styles.SmallLayout]: useSmallLayout,
                })}
              >
                <InputField
                  animatedLabel
                  fieldName="amount"
                  id="fromInputField"
                  disabled={false}
                  label="Betrag"
                  title="fromInputField"
                  handleChange={handleInputValue.bind(this, 'fromInput')}
                  maxlength={50}
                  value={'100'}
                  register={registerField.bind(this)}
                  withErrorIcon={false}
                  type="string"
                  initialValue={'100'}
                  errorMessage={'Bitte geben Sie einen gültigen Betrag ein'}
                  required
                  getId={() => 'fromInputField'}
                  inputmode="decimal"
                  validate={() => null}
                  getValue={() => null}
                />
              </div>

              <div className={styles.SelectFieldWrapper}>
                <SelectField
                  id="fromSelectField"
                  name="fromSelectField"
                  register={registerField.bind(this)}
                  label="Von"
                  /* @ts-ignore TODO: TS2322 ->  Type '{ currency */
                  initialSelect={findInitialSelect('from')}
                  onChange={handleFromSelectFieldChange.bind(this)}
                  hasError={false}
                  /* @ts-ignore TODO: TS2322 ->  Type '{ currency */
                  disabledOption={findInitialSelect('to')}
                  options={currencySelectOptions}
                />
              </div>
            </div>
            <div
              className={classNames(styles.SwitchIconWrapper, {
                [styles.SmallLayout]: useSmallLayout,
                [styles.Hidden]: !useSmallLayout,
              })}
            >
              <SwitchIcon clickHandler={handleSwitchIconClick} />
            </div>
            <div
              className={classNames(styles.InputRow, {
                [styles.SmallLayout]: !useSmallLayout,
              })}
            >
              <div
                className={classNames(styles.InputFieldWrapper, {
                  [styles.SmallLayout]: useSmallLayout,
                })}
              >
                <InputField
                  animatedLabel
                  id="toInputField"
                  fieldName="toInputField"
                  handleChange={handleInputValue.bind(this, 'toInput')}
                  disabled={false}
                  label="Betrag"
                  title="toInputField"
                  maxlength={50}
                  value={''}
                  register={registerField.bind(this)}
                  withErrorIcon={false}
                  type="string"
                  initialValue={'0'}
                  errorMessage={'Bitte geben Sie einen gültigen Betrag ein'}
                  getId={() => 'toInputField'}
                  inputmode="decimal"
                  validate={() => null}
                  getValue={() => null}
                />
              </div>
              <div className={styles.SelectFieldWrapper}>
                <SelectField
                  id="toSelectField"
                  name="toSelectField"
                  register={registerField.bind(this)}
                  label="Nach"
                  /* @ts-ignore TODO: TS2322 ->  Type '{ currency */
                  initialSelect={findInitialSelect('to')}
                  onChange={handleToSelectFieldChange.bind(this)}
                  /* @ts-ignore TODO: TS2322 ->  Type '{ currency */
                  disabledOption={findInitialSelect('from')}
                  hasError={false}
                  options={currencySelectOptions}
                />
              </div>
            </div>
          </form>
          {currentInstrument && (
            <>
              <DatePicker
                /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'boolean'. */
                useSmallLayout={useSmallLayout}
                currentInstrument={currentInstrument}
                activeState={activeState}
                onChangeDate={onChangeDate}
                datePickerRef={datePickerRef}
              />
            </>
          )}
        </div>

        <div
          className={classNames(styles.SwitchIconWrapper, {
            [styles.SmallLayout]: useSmallLayout,
            [styles.Hidden]: useSmallLayout,
          })}
        >
          <SwitchIcon clickHandler={handleSwitchIconClick} />
        </div>
      </div>
    </div>
  );
};

export default memo(CurrencyCalculator);
