import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useWidgetParagraphQuery } from '../../helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import Link from '../../../../../../../common/components/Link';
import Table from './components/Table';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { ROUTE_BOERSEN_ABOS } from '../../../../constants';
import styles from './styles.legacy.css';
import { TablePropsData } from './components/Table/typings';
import { InstrumentPerformanceProps } from './typings';

const InstrumentPerformance = ({
  widgetParagraph,
}: InstrumentPerformanceProps) => {
  const { isSSR } = useSSRContext();
  const { fields, loading, error, instrument } = useWidgetParagraphQuery(
    widgetParagraph,
    [
      'lval',
      'lvalDatetime',
      'dayBefore',
      'dayBeforeDate',
      'iNetVperprV',
      'iNetVperprVPr',
      'cashClose1w',
      'cashClose1wDatetime',
      'perf1wVPerPRV',
      'perf1wVPerPRVPr',
      'cashClose4w',
      'cashClose4wDatetime',
      'perf4wVPerPRV',
      'perf4wVPerPRVPr',
      'cashClose12w',
      'cashClose12wDatetime',
      'perf12wVPerPRV',
      'perf12wVPerPRVPr',
      'cashClose52w',
      'cashClose52wDatetime',
      'perf52wVPerPRV',
      'perf52wVPerPRVPr',
      'cashCloseYTD',
      'cashCloseYTDDatetime',
      'perfYTDVPerPRV',
      'perfYTDVPerPRVPr',
      'scGrouped',
    ],
  );

  const isCCR = instrument?.scGrouped?.includes('CCR');

  const isRealTimeUser = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).realtime,
  );

  const isLoading = loading || !!error;
  const data: TablePropsData[] = (!isCCR && [
    { value: fields.lval, date: fields.lvalDatetime },
    {
      value: fields.dayBefore,
      date: fields.dayBeforeDate,
      perfValue: fields.iNetVperprV,
      perfPercentage: fields.iNetVperprVPr,
    },
    {
      value: fields.cashClose1w,
      date: fields.cashClose1wDatetime,
      perfValue: fields.perf1wVPerPRV,
      perfPercentage: fields.perf1wVPerPRVPr,
    },
    {
      value: fields.cashClose4w,
      date: fields.cashClose4wDatetime,
      perfValue: fields.perf4wVPerPRV,
      perfPercentage: fields.perf4wVPerPRVPr,
    },
    {
      value: fields.cashClose12w,
      date: fields.cashClose12wDatetime,
      perfValue: fields.perf12wVPerPRV,
      perfPercentage: fields.perf12wVPerPRVPr,
    },
    {
      value: fields.cashClose52w,
      date: fields.cashClose52wDatetime,
      perfValue: fields.perf52wVPerPRV,
      perfPercentage: fields.perf52wVPerPRVPr,
    },
    {
      value: fields.cashCloseYTD,
      date: fields.cashCloseYTDDatetime,
      perfValue: fields.perfYTDVPerPRV,
      perfPercentage: fields.perfYTDVPerPRVPr,
    },
  ]) || [
    { value: fields.lval, date: fields.lvalDatetime },
    {
      value: fields.dayBefore,
      date: fields.dayBeforeDate,
      perfValue: fields.iNetVperprV,
      perfPercentage: fields.iNetVperprVPr,
    },
  ];

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Title}>Kursentwicklung</div>
      <div className={styles.Row}>
        {(!isSSR && <Table isLoading={isLoading} data={data} />) || null}
      </div>

      {!isRealTimeUser && (
        <>
          <span className={styles.InfoText}>
            Sie erhalten verzögerte Kurse.
          </span>
          <Link
            key={`get-realtime-data`}
            className={styles.Link}
            path={`/${ROUTE_BOERSEN_ABOS}`}
            label={'Jetzt Realtime Daten erhalten'}
          />
        </>
      )}
    </div>
  );
};

export default memo<InstrumentPerformanceProps>(InstrumentPerformance);
