import { ChartLastValues, MappedFormFields } from '../../typings';

export type CalculationResultProps = {
  chartData: ChartLastValues;
  mappedFormFields: MappedFormFields;
};

export type GroupRowProps = {
  title: string;
  circleColor: string;
  value: string;
  isTitle?: boolean;
  highlighted?: boolean;
};
