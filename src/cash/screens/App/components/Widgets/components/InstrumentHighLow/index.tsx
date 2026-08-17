import React, { memo, useState } from 'react';
import { DATE_FORMAT_FULL_TIME } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { getSearchParams, useWidgetParagraphQuery } from '../../helpers';
import ChunkProgressBar from './components/ChunkProgressBar';
import Tabs from './components/Tabs';
import styles from './styles.legacy.css';
import { InstrumentHighLowProps } from './typings';

const InstrumentHighLow = ({ widgetParagraph }: InstrumentHighLowProps) => {
  const { scGrouped }: any = getSearchParams(widgetParagraph);
  const [activeTab, setActiveTab] = useState('1D');

  const { instrument, loading, error } = useWidgetParagraphQuery(
    widgetParagraph,
    [
      'lval',
      'low',
      'high',
      'yLo',
      'yHi',
      'yLoDatetime',
      'yHiDatetime',
      'prevYearHigh',
      'prevYearLow',
      'prevYearHighDatetime',
      'prevYearLowDatetime',
    ],
  );

  const isLoading = loading || !!error;
  const currentYearAsNumber = new Date().getFullYear();
  const currentYear = currentYearAsNumber.toString();
  const lastYear = (currentYearAsNumber - 1).toString();

  const disable1dData = !instrument?.low && !instrument?.high;
  const disable52wData = !instrument?.cash52wLow && !instrument?.cash52wHigh;
  const disableLastYearData =
    !instrument?.prevYearLow && !instrument?.prevYearHigh;
  const disableCurrentYearData = !instrument?.yLo && !instrument?.yHi;

  const buttons = [
    ...(disable1dData ? [] : ['1D']),
    ...(disable52wData ? [] : ['52W']),
    ...(disableLastYearData ? [] : [lastYear]),
    ...(disableCurrentYearData ? [] : [currentYear]),
  ];
  const isEmptyValues = !buttons.length;

  return isLoading || !instrument || isEmptyValues ? (
    <div className={styles.Skeleton} />
  ) : (
    <div className={styles.Wrapper}>
      <p className={styles.WidgetTitle}>Hoch / Tief</p>
      <Tabs
        activeTab={activeTab}
        setActiveTab={(tab: string) => setActiveTab(tab)}
        buttons={buttons}
      />
      <div className={styles.Row}>
        {!disable1dData && activeTab === '1D' && (
          <ChunkProgressBar
            min={parseFloat(instrument?.low || '0')}
            max={parseFloat(instrument?.high || instrument?.lval || '0')}
            current={parseFloat(instrument?.lval || '0')}
            scGrouped={scGrouped}
            startDate={instrument?.lowDate || ''}
            endDate={instrument?.highDate || ''}
            format={DATE_FORMAT_FULL_TIME}
            variant="blue"
          />
        )}
        {!disable52wData && activeTab === '52W' && (
          <ChunkProgressBar
            min={parseFloat(instrument?.cash52wLow || '0')}
            max={parseFloat(instrument?.cash52wHigh || instrument?.lval || '0')}
            current={parseFloat(instrument?.lval || '0')}
            scGrouped={scGrouped}
            startDate={instrument?.cash52wLowDatetime || ''}
            endDate={instrument?.cash52wHighDatetime || ''}
            variant="blue"
          />
        )}
        {!disableLastYearData && activeTab === lastYear && (
          <ChunkProgressBar
            min={parseFloat(instrument?.prevYearLow || '0')}
            max={parseFloat(
              instrument?.prevYearHigh || instrument?.lval || '0',
            )}
            current={parseFloat(instrument?.lval || '0')}
            scGrouped={scGrouped}
            startDate={instrument?.prevYearLowDatetime || ''}
            endDate={instrument?.prevYearHighDatetime || ''}
            variant="blue"
          />
        )}
        {!disableCurrentYearData && activeTab === currentYear && (
          <ChunkProgressBar
            min={parseFloat(instrument?.yLo || '0')}
            max={parseFloat(instrument?.yHi || instrument?.lval || '0')}
            current={parseFloat(instrument?.lval || '0')}
            scGrouped={scGrouped}
            startDate={instrument?.yLoDatetime || ''}
            endDate={instrument?.yHiDatetime || ''}
            variant="blue"
          />
        )}
      </div>
    </div>
  );
};

export default memo<InstrumentHighLowProps>(InstrumentHighLow);
