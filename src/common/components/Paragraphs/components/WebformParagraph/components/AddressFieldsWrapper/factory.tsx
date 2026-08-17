import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from '../../../../../Link';
import { countries } from './constants';
import grid from '../../../../../../assets/styles/grid.legacy.css';
import commonStyles from './styles.legacy.css';
import {
  AddressFieldWrapperFactoryProps,
  AddressFieldWrapperProps,
  AddressFieldWrapperState,
} from './typings';

const transformData = (data: any, alort: string) => {
  data = data?.extra;
  if (Boolean(alort)) {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'd' implicitly has an 'any' type. */
    data = data?.map((d) => ({ value: d, label: d }));
  } else {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'd' implicitly has an 'any' type. */
    data = data?.map((d) => ({
      ...d,
      value: d.name,
      label: d.name,
    }));
  }
  return data || [];
};

const fetchAddress = async ({
  updateAddress,
  alort,
  zipCode,
}: {
  updateAddress: (data: any[]) => void;
  alort?: string;
  zipCode: string;
}) => {
  const response = await fetch(
    `${__SAP_SERVICE_ENDPOINT__}/webform-helper/address?zipCode=${zipCode}${
      alort ? `&alort=${alort}` : ''
    }`,
  );
  const data = await response.json();
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  updateAddress(transformData(data, alort));
};

const labels = {
  de: {
    countryLabel: 'Land',
    zipCodeLabel: 'PLZ',
    cityLabel: 'Ort',
    streetLabel: 'Strasse',
    streetNumberLabel: 'Nr.',
    streetLinkLabel: 'Strasse nicht gefunden?',
    placeHolderLabel: 'Bitte wählen',
    noStreetNumberLabel: 'Ohne Strassen-Nr. erfassen',
  },
  fr: {
    countryLabel: 'Pays',
    zipCodeLabel: 'NPA',
    cityLabel: 'Ville',
    streetLabel: 'Rue',
    streetNumberLabel: 'Numéro',
    streetLinkLabel: 'Vous ne trouvez pas votre rue?',
    placeHolderLabel: 'Veuillez choisir',
    noStreetNumberLabel: 'Saisir sans numéro de rue',
  },
};

const AddressFieldsWrapperFactory = ({
  InputField,
  SelectField,
  styles,
  language = 'de',
  defaultErrorMessages,
}: AddressFieldWrapperFactoryProps) => {
  const AddressFieldsWrapper: FC<AddressFieldWrapperProps> = ({
    id,
    register,
    disabled,
    required,
    withErrorIcon,
    disableCountry = false,
  }) => {
    const cityRef = useRef(null);
    const cityInputRef = useRef(null);
    const streetRef = useRef(null);
    const streetInputRef = useRef(null);
    const streetNumberRef = useRef(null);

    const [state, setState] = useState<AddressFieldWrapperState>({
      country: countries[0],
      cities: [],
      streets: [],
      notFound: {
        city: false,
        street: false,
      },
      openSelect: {
        city: false,
        street: false,
      },
      autoSelectOn: {
        city: false,
        street: false,
      },
      requireStreetNo: required,
    });

    const {
      countryLabel,
      zipCodeLabel,
      cityLabel,
      streetLabel,
      streetNumberLabel,
      streetLinkLabel,
      placeHolderLabel,
      noStreetNumberLabel,
    } = defaultErrorMessages || labels[language];

    const {
      country,
      openSelect,
      autoSelectOn,
      city,
      street,
      streets,
      cities,
      zipCode,
      loading,
      notFound,
      requireStreetNo,
    } = state;
    const canAutoFill = country?.value === 'Schweiz/Liechtenstein';

    useEffect(() => {
      if (autoSelectOn.city && city) {
        setState((state) => {
          return {
            ...state,
            openSelect: {
              ...state.openSelect,
              city: state.cities.length > 1,
            },
            autoSelectOn: {
              ...state.autoSelectOn,
              city: false,
            },
          };
        });
      }
    }, [autoSelectOn.city, city]);

    useEffect(() => {
      if (autoSelectOn.street) {
        setState((state) => {
          return {
            ...state,
            openSelect: {
              ...state.openSelect,
              street: streets.length > 1 && !state.openSelect.city,
            },
            autoSelectOn: {
              ...state.autoSelectOn,
              street: false,
            },
          };
        });
      }
    }, [autoSelectOn.street, streets]);

    useEffect(() => {
      const handleCityChange = async (city: any) => {
        setIsLoading();
        await fetchAddress({
          alort: city.alort,
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          zipCode,
          updateAddress: (streets) => {
            const street = streets.length === 1 && streets[0];
            setState((state) => {
              return {
                ...state,
                city,
                street,
                streets,
                loading: false,
                autoSelectOn: {
                  ...state.autoSelectOn,
                  street: true,
                },
              };
            });
          },
        });
      };
      if (city?.alort && !notFound.city) {
        handleCityChange(city);
      }
    }, [city, notFound.city, zipCode]);

    useEffect(() => {
      if (
        streetInputRef?.current &&
        !state.notFound.city &&
        state.notFound.street
      ) {
        /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
        streetInputRef.current.focus();
      } else if (cityInputRef?.current && state.notFound.city) {
        /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
        cityInputRef?.current?.focus();
      }
    }, [state.notFound]);

    const handleChangeAddress = async (zipCode: string) => {
      if (zipCode?.length >= 4 && canAutoFill) {
        /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
        cityRef?.current?.focus?.();
        setIsLoading();
        await fetchAddress({
          zipCode,
          updateAddress: (cities) => {
            const city = cities[0];
            setState((state) => {
              return {
                ...state,
                city,
                cities,
                zipCode,
                loading: false,
                autoSelectOn: {
                  ...state.autoSelectOn,
                  city: true,
                },
                notFound: {
                  street: !city,
                  city: !city,
                },
              };
            });
          },
        });
      }
    };

    const handleChangeStreet = (value: string) => {
      const street = streets.find((s) => s.value === value);
      if (street?.value) {
        setState((state) => {
          return {
            ...state,
            street,
            openSelect: {
              ...state.openSelect,
              street: false,
            },
          };
        });
        /* @ts-ignore TODO: TS2339 ->  Property 'focus' does not exist on type 'never'. */
        streetNumberRef?.current?.focus();
      }
    };

    const setIsLoading = () => {
      setState((state) => {
        return {
          ...state,
          loading: true,
        };
      });
    };

    const handleChangeCountry = (value: string) => {
      const country = countries.find((c) => c.value === value);
      /* @ts-ignore TODO: TS2345 ->  Argument of type '(state */
      setState((state) => {
        return {
          ...state,
          country,
        };
      });
    };

    const handleClick = () => {
      setState((state) => {
        return {
          ...state,
          notFound: {
            ...state.notFound,
            street: true,
          },
        };
      });
    };

    const handleChangeCity = (value: string) => {
      setState((state) => {
        const city = state.cities.find((c) => c.value === value);
        return {
          ...state,
          city,
        };
      });
    };

    const handleCheckbox = (value: boolean) => {
      setState((state) => ({
        ...state,
        requireStreetNo: !value,
      }));
    };

    const getId = (fieldId: string) => {
      return `${id}.${fieldId}`;
    };

    return (
      <div className={commonStyles.Wrapper}>
        <SelectField
          id={getId('country')}
          label={countryLabel}
          fieldName={getId('country')}
          initialValue={country?.value}
          options={countries}
          register={register}
          required={required}
          value={country?.value}
          handleChange={handleChangeCountry}
          withErrorIcon={withErrorIcon}
          canFilter={true}
          disabled={disabled || disableCountry}
        />
        <div className={classNames(grid.Row, commonStyles.Row)}>
          <div className={classNames(grid.Col24, grid.ColMd8)}>
            <InputField
              animatedLabel
              id={getId('zip_code')}
              label={zipCodeLabel}
              fieldName={getId('zip_code')}
              type="text"
              register={register}
              required={required}
              handleChange={handleChangeAddress}
              skipValidation={!canAutoFill}
              disabled={disabled}
            />
          </div>
          <div className={classNames(grid.Col24, grid.ColMd16)}>
            {canAutoFill && !notFound.city ? (
              <SelectField
                id={getId('city')}
                label={cityLabel}
                fieldName={getId('city')}
                options={cities}
                required={required}
                register={register}
                innerRef={cityRef}
                value={city?.value || ''}
                handleChange={handleChangeCity}
                withErrorIcon={withErrorIcon}
                canFilter={true}
                isOpen={openSelect.city}
                disabled={loading || disabled}
              />
            ) : (
              <InputField
                animatedLabel
                id={getId('city')}
                label={cityLabel}
                fieldName={getId('city')}
                type="text"
                register={register}
                required={required}
                innerRef={cityInputRef}
                skipValidation={true}
                disabled={disabled}
              />
            )}
          </div>
          <div className={classNames(grid.Col16)}>
            {canAutoFill && !notFound.street ? (
              <div>
                <SelectField
                  id={getId('street')}
                  label={streetLabel}
                  fieldName={getId('street')}
                  options={streets}
                  required={required}
                  register={register}
                  innerRef={streetRef}
                  value={street?.value || ''}
                  handleChange={handleChangeStreet}
                  withErrorIcon={withErrorIcon}
                  canFilter={true}
                  isOpen={openSelect.street}
                  disabled={loading || disabled}
                  placeholder={streets.length > 1 && placeHolderLabel}
                />
                <Link
                  className={classNames(commonStyles.Link, styles?.Link)}
                  onClick={handleClick}
                >
                  {streetLinkLabel}
                </Link>
              </div>
            ) : (
              <InputField
                animatedLabel
                id={getId('street')}
                label={streetLabel}
                fieldName={getId('street')}
                type="text"
                register={register}
                required={required}
                innerRef={streetInputRef}
                skipValidation={true}
                disabled={disabled}
              />
            )}
          </div>
          <div className={classNames(grid.Col8)}>
            <InputField
              animatedLabel
              id={getId('street_number')}
              label={streetNumberLabel}
              fieldName={getId('street_number')}
              type="text"
              register={register}
              required={requireStreetNo}
              innerRef={streetNumberRef}
              skipValidation={true}
              disabled={disabled}
            />
            <div className={commonStyles.NoStreetNumberCheckbox}>
              <InputField
                id="toggle-street-number-required"
                label={noStreetNumberLabel}
                type="checkbox"
                disabled={disabled}
                initialValue={!requireStreetNo}
                handleChange={handleCheckbox}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return AddressFieldsWrapper;
};

export default AddressFieldsWrapperFactory;
