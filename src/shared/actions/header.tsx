import { initialState } from '../reducers/header';

type HeaderStateActionTypes =
  | 'header/set-header-data'
  | 'header/reset-header-data'
  | 'header/reset-header-breadcrumbs-data'
  | 'header/set-props';

export type HeaderStateAction<T> = {
  type: HeaderStateActionTypes;
  payload: T;
};

// set header data
export const setHeaderData = (
  data: HeaderState,
): HeaderStateAction<HeaderState> => ({
  type: 'header/set-header-data',
  payload: data,
});

// reset header data
export const resetHeaderData = (
  data: HeaderState,
): HeaderStateAction<HeaderState> => ({
  type: 'header/reset-header-data',
  payload: data,
});

// reset header data
export const resetHeaderBreadcrumbsData = (
  data: HeaderState,
): HeaderStateAction<HeaderState> => ({
  type: 'header/reset-header-breadcrumbs-data',
  payload: data,
});

// set header props
export const setHeaderProps = (
  payload: HeaderState = initialState,
): HeaderStateAction<HeaderState> => ({
  type: 'header/set-props',
  payload,
});
