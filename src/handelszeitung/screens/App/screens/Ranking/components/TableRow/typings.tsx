export type TableRowProps = Maybe<Omit<Rankings, '__typename'>> & {
  index: number;
  year: number;
};
