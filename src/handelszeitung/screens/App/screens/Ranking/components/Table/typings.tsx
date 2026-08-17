export type TableHeaders = Array<{
  label: string;
  type:
    | 'rankingPosition'
    | 'name'
    | 'rankingValue'
    | 'rankingIndustry'
    | 'rankingState';
}>;

export type TableProps = {
  year: number;
  rows: Array<Maybe<Rankings>>;
};
