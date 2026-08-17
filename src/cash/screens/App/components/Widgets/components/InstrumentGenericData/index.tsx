import React, { memo } from 'react';
import {
  mapTooltip,
  mapFields,
} from '../../../../screens/MyCash/components/Table/components/headerMapping';
import { getSearchParams, useWidgetParagraphQuery } from '../../helpers';
import DataField from './components/DataField';
import { defaultConfig } from './defaultConfig';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import styles from './styles.legacy.css';
import { InstrumentGenericDataProps } from './typings';

const InstrumentGenericData = ({
  widgetParagraph,
}: InstrumentGenericDataProps) => {
  const { isSSR } = useSSRContext();
  const searchParams = getSearchParams(widgetParagraph);
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"widgetTitle"' can't be used to index type '{ config */
  const widgetTitle = searchParams['widgetTitle'] || 'Generic Data';
  const config = searchParams['config'];
  const { instrument, loading, error } =
    useWidgetParagraphQuery(widgetParagraph);
  const isLoading = loading || !!error;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
  const parsedConfig = JSON.parse(config || null) || defaultConfig;

  // if not parseable config, return null
  // If no config present, show default config to know how one can integrate it
  if (isSSR || !parsedConfig || !instrument) {
    return null;
  }

  /* @ts-ignore TODO: TS7034 ->  Variable 'mappedData' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const mappedData = [];

  Object.entries(parsedConfig)?.map(
    ([label, field]: [string, keyof Instrument]) => {
      if (!instrument?.[field]) return null;

      mappedData.push({
        label,
        field: mapFields(instrument, [field])[field],
        tooltip: mapTooltip(field),
      });
    },
  );

  return (
    <>
      <div className={styles.Wrapper}>
        <p className={styles.Title}>{widgetTitle}</p>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'mappedData' implicitly has an 'any[]' type. */}
        {mappedData.map(({ label, field, tooltip }) => {
          return (
            <div key={label} className={styles.Row}>
              <span className={styles.Label}>
                {label}
                {tooltip}
              </span>

              <DataField isLoading={isLoading} field={field} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo<InstrumentGenericDataProps>(InstrumentGenericData);
