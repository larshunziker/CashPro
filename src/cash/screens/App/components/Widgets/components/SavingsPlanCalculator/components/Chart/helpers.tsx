import { ChartData, FormField, MappedFormFields } from '../../typings';

export const mapFormFields = (formFields: FormField[]) =>
  formFields.reduce((acc, curr) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
    acc[curr.name] = curr.value;
    return acc;
  }, {});

export const calculateChartData = (formFields: FormField[]): ChartData => {
  /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'ChartData'. */
  if (!formFields) return;

  const {
    productReturn,
    initialInvestment,
    additionalInvestment,
    intervalInMonths,
    investmentPeriod,
    savingsAccountReturn,
  } = mapFormFields(formFields) as MappedFormFields;

  const yearsArray = getYearsArray(investmentPeriod);
  const monthlyInvestment =
    parseInt(additionalInvestment) / parseInt(intervalInMonths);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'arr' implicitly has an 'any' type. */
  const getLastValue = (arr) => arr[arr.length - 1];

  const dataRows = {
    yearsArray,
    returnsSavingsAccount: getInterestArray(
      savingsAccountReturn,
      initialInvestment,
      monthlyInvestment,
      yearsArray,
    ),
    returnsProduct: getInterestArray(
      productReturn,
      initialInvestment,
      monthlyInvestment,
      yearsArray,
    ),
    investmentsArray: getInvestmentsArray(
      initialInvestment,
      monthlyInvestment,
      yearsArray,
    ),
  };

  return {
    dataRows,
    lastValues: {
      investments: getLastValue(dataRows.investmentsArray),
      returnsSavingsAccount: getLastValue(dataRows.returnsSavingsAccount),
      returnsProduct: getLastValue(dataRows.returnsProduct),
    },
  };
};

const getYearsArray = (investmentPeriod: string) => {
  const num = parseInt(investmentPeriod);

  return [...Array(num)].map((_, i) => (i + 1).toString());
};

const getInvestmentsArray = (
  initialInvestment: string,
  monthlyInvestment: number,
  yearsArray: string[],
) =>
  yearsArray.map(
    (year) =>
      parseInt(initialInvestment) + monthlyInvestment * 12 * parseInt(year),
  );

const getInterestArray = (
  yearlyReturn: string,
  initialInvestment: string,
  monthlyInvestment: number,
  yearsArray: string[],
) => {
  const interest = (num: number) => (num / 100) * parseFloat(yearlyReturn);
  const yearlyInvestment = monthlyInvestment * 12;

  let totalInvestments = parseFloat(initialInvestment);
  let totalInterest = 0;

  return yearsArray.map((year, idx) => {
    const yearsBetween = parseInt(year) - parseInt(yearsArray[idx - 1] || '0');
    for (let i = 1; i <= yearsBetween; i++) {
      const yearlyInterest = interest(totalInvestments + yearlyInvestment);
      totalInvestments += yearlyInvestment + yearlyInterest;
      totalInterest += yearlyInterest;
    }

    return totalInterest;
  });
};
