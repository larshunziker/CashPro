export type TopFlopTableProps = {
  instruments: Instrument[];
  order: 'asc' | 'desc';
  limit: number;
  addPutsCallsLinks?: boolean;
  sponsorImage?: string;
  sponsorImageUrl?: string;
};
