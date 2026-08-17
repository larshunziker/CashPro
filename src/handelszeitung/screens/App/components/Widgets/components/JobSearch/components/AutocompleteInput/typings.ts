import { FormValues } from '../../typings';

export type AutocompleteInputProps = {
  values: FormValues;
  setValues: (values: FormValues) => void;
  placeholder: string;
  type: 'term' | 'location';
};

export interface QueryResponse {
  data: Data;
}

export interface Data {
  integration: Integration;
}

export interface Integration {
  jobsCH: JobsCh;
}

export interface JobsCh {
  autocompleteLocation: AutocompleteLocation;
  autocompleteTerm: AutocompleteTerm;
}

export interface AutocompleteLocation {
  result: Result[];
}

export interface Result {
  name?: Name;
  short_name?: Name;
  long_name?: Name;
}

export interface Name {
  de: string;
}

export interface AutocompleteTerm {
  terms: Term[];
}

export interface Term {
  name_display: string;
}
