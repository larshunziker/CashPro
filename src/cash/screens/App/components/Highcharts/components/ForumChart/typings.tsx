export type ForumChartProps = {
  location?: ReachRouterLocation;
};

export type QueryResult = {
  getFullquotePage: GetFullquotePage;
};

export type GetFullquotePage = {
  __typename: string;
  title: string;
  mSymb: string;
  mCur: string;
  mValor: string;
  lval: string;
  iNetVperprV: string;
  iNetVperprVPr: string;
};
