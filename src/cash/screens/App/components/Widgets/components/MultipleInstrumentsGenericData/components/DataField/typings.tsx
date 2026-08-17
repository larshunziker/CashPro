export type DataFieldProps = {
  isLoading: boolean;
  field: JSX.Element | string | null;
  logo?: string | null;
  addClass?: any;
};

export type MarketCaps = {
  listingKey: string;
  marketCap: number;
}[];
