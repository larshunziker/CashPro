import { Dispatch, SetStateAction } from 'react';

export type RestaurantsPagerProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<any>>;
};
