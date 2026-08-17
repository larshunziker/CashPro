import { useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRange } from '../../screens/App/components/Highcharts/helpers';
import chartsStateSelector from '../selectors/chartsStateSelector';
import { setTimeseriesData } from '../actions/charts';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../Highcharts/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/ */
import { GET_CHART_TIMESERIE } from '../../screens/App/components/Highcharts/queries';
import { TimeseriesResponse } from '../../screens/App/components/Widgets/components/Timeseries/typings';

interface Props {
  listingKey?: string | null;
  pollInterval: number;
}

export const useTimeSeriesData = ({
  listingKey,
  pollInterval,
}: Props): {
  data: PriceWithAutoupdateState[];
  loading: boolean;
  error: any;
} => {
  const dispatch = useDispatch();

  const storedData = useSelector(
    (state: ReduxState) => chartsStateSelector(state)?.data,
  );

  const setNewPrices = useCallback(
    (data: TimeseriesResponse): PriceWithAutoupdateState[] => {
      const MAX_STORED_PRICES = 200;
      const rawPrices = data?.integration?.solid?.chart?.timeserie?.prices;

      if (!Array.isArray(rawPrices) || rawPrices.length === 0) {
        return [];
      }

      const prices = rawPrices.filter(
        (p): p is ExtendedPrice => p !== null && p !== undefined,
      );

      prices.sort((a, b) => {
        const timeA =
          typeof a?.date === 'string' ? new Date(a.date).getTime() : 0;
        const timeB =
          typeof b?.date === 'string' ? new Date(b.date).getTime() : 0;

        return timeB - timeA;
      });

      if (!storedData?.length) {
        return prices.slice(0, MAX_STORED_PRICES).map((price) => {
          return { price: price, isNew: false } as PriceWithAutoupdateState;
        });
      }

      const existingPriceIds = new Set(
        storedData.map(({ price }) => `${price.date}:${price.volume}`),
      );

      const newPrices = prices.filter(
        (price) => !existingPriceIds.has(`${price.date}:${price.volume}`),
      );

      if (newPrices.length > 0) {
        const merged = [
          ...newPrices.map((price) => {
            return { price: price, isNew: true };
          }),
          ...storedData.map((value) => {
            return { price: value.price, isNew: false };
          }),
        ];
        return merged.slice(0, MAX_STORED_PRICES);
      }

      return storedData;
    },
    [storedData],
  );

  const { loading, error } = useQuery<TimeseriesResponse>(GET_CHART_TIMESERIE, {
    variables: {
      id: listingKey,
      ...getRange(14, -1, 'tick', 100),
      cacheBuster: listingKey,
    },
    pollInterval,
    fetchPolicy: 'no-cache',
    ssr: false,
    onCompleted(data) {
      dispatch(setTimeseriesData(setNewPrices(structuredClone(data))));
    },
  });

  return {
    data: storedData,
    loading,
    error,
  };
};
