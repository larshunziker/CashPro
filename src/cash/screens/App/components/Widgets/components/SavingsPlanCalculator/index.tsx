import React, { useMemo, useState } from 'react';
import { calculateChartData, mapFormFields } from './components/Chart/helpers';
import CalculationResult from './components/CalculationResult';
import Chart from './components/Chart';
import Input from './components/Input';
import InputToggle from './components/InputToggle';
import InfoBox, { DefaultInfoBoxContent } from './components/InfoBox';
import { defaultFormFields } from './constants';
import styles from './styles.legacy.css';
import { MappedFormFields } from './typings';

const SavingsPlanCalculator = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const InfoBoxContent = useMemo(() => DefaultInfoBoxContent(), []);

  const handleInputChange = (idx: number, value: string, type?: string) => {
    const newFormFields = [...formFields];
    if (type === 'toggle') {
      const val = parseInt(value);
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      newFormFields[idx].options = newFormFields[idx].options.map(
        (option, optionIdx) => ({
          ...option,
          active: optionIdx === val,
        }),
      );
      newFormFields[idx].value = val === 0 ? '1' : '3';
    } else {
      newFormFields[idx].value = value;
    }
    setFormFields(newFormFields);
  };

  const enrichedFormFields = formFields.map((field, idx) => ({
    ...field,
    idx,
    handleChange: handleInputChange,
  }));
  const chartData = calculateChartData(formFields);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Content}>
        <p className={styles.Description}>
          Dieser Sparplan-Rechner gibt Ihnen einen ersten Überblick über die
          Entwicklung Ihres Vermögens bei einer langfristigen Anlage im
          Vergleich zum herkömmlichen Sparkonto.
        </p>
      </div>

      <div className={styles.Content}>
        <div>
          <div className={styles.FormWrapper}>
            <div className={styles.ProductSelectionWrapper}>
              <Input {...enrichedFormFields[0]} />
              <InfoBox title="Historische Wertentwicklung">
                {InfoBoxContent}
              </InfoBox>
            </div>

            <Input {...enrichedFormFields[1]} />
            <Input {...enrichedFormFields[2]} />
            <InputToggle {...enrichedFormFields[3]} />
            <Input {...enrichedFormFields[4]} />
            <Input {...enrichedFormFields[5]} />
          </div>
        </div>
        <div className={styles.ChartWithResultsWrapper}>
          <Chart data={chartData.dataRows} />
          <CalculationResult
            chartData={chartData.lastValues}
            mappedFormFields={mapFormFields(formFields) as MappedFormFields}
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanCalculator;
