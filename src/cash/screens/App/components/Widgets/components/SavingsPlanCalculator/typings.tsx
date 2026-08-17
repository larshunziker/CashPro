export type ChartDataRows = {
  yearsArray: string[];
  returnsSavingsAccount: number[];
  returnsProduct: number[];
  investmentsArray: number[];
};

export type ChartLastValues = {
  investments: string;
  returnsSavingsAccount: string;
  returnsProduct: string;
};

export type ChartData = {
  dataRows: ChartDataRows;
  lastValues: ChartLastValues;
};

export type MappedFormFields = {
  productReturn: string;
  initialInvestment: string;
  additionalInvestment: string;
  intervalInMonths: string;
  investmentPeriod: string;
  savingsAccountReturn: string;
};

export type FormField = {
  name: string;
  label: string;
  value: string;
  unit: string;
  step: number;
  inputMode: string;
  roundingDigits: number;
  explanation?: string;
  tooltip?: string;
  min?: number;
  options?: any[];
};

export type EnrichedFormField = FormField & {
  idx: number;
  handleChange: Function;
};

export type SavingsPlanCalculatorProps = {
  widgetParagraph: WidgetParagraph;
};
