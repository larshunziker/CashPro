//@TODO: improve typings here
export type TablePropsData = {
  value: any;
  date: any;
  perfValue?: any;
  perfPercentage?: any;
};

export type TableProps = {
  isLoading: boolean;
  data: TablePropsData[];
};
