import { initialState } from '../reducers/header';

type HeaderStateActionTypes =
  | 'header/set-title'
  | 'header/set-header-data'
  | 'header/reset-header-data'
  | 'header/set-props'
  | 'singlepage/is-single-page';

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

// set vertical title
export const setVerticalTitle = (
  title: string,
): HeaderStateAction<{ title: string }> => ({
  type: 'header/set-title',
  payload: {
    title,
  },
});

// set single page state
export const setIsSinglePage = (
  isSinglePage: boolean,
): HeaderStateAction<{ isSinglePage: boolean }> => ({
  type: 'singlepage/is-single-page',
  payload: {
    isSinglePage,
  },
});

// set header props
export const setHeaderProps = (
  payload: HeaderState = initialState,
): HeaderStateAction<HeaderState> => ({
  type: 'header/set-props',
  payload,
});
