import React, { ReactElement } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CityOption extends Option {
  alort: string;
}

export interface AddressFieldWrapperState {
  loading?: boolean;
  street?: Option;
  streets: Option[];
  country: Option;
  city?: CityOption;
  cities: CityOption[];
  zipCode?: string;
  requireStreetNo?: boolean;
  notFound: {
    city: boolean;
    street: boolean;
  };
  openSelect: {
    city: boolean;
    street: boolean;
  };
  autoSelectOn: {
    city: boolean;
    street: boolean;
  };
}

export interface AddressFieldWrapperProps {
  id: string;
  withErrorIcon: boolean;
  required?: boolean;
  disabled?: boolean;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  register: (FieldComponentProps) => void;
  disableCountry?: boolean;
}

export interface AddressFieldWrapperFactoryProps {
  InputField: React.ComponentType<any>;
  SelectField: React.ComponentType<any>;
  defaultErrorMessages?: {
    countryLabel: ReactElement;
    zipCodeLabel: ReactElement;
    cityLabel: ReactElement;
    streetLabel: ReactElement;
    streetNumberLabel: ReactElement;
    streetLinkLabel: ReactElement;
    placeHolderLabel: ReactElement;
    noStreetNumberLabel: ReactElement;
  };
  language?: 'de' | 'fr';
  styles?: {
    Link: string;
  };
}

export type AddressFieldWrapperComponent = (
  props: AddressFieldWrapperProps,
) => ReactElement<AddressFieldWrapperProps>;
