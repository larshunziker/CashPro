import { useSelector } from 'react-redux';
import autoUpdateStateSelector from '../../../shared/selectors/autoUpdateStateSelector';

/* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'fields' implicitly has an 'any' type. */
export const useAutoUpdateFields: any = (instrument, fields) => {
  const result = {};
  const state = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => autoUpdateStateSelector(state).data?.[instrument?.instrumentKey],
  );

  for (const field in fields) {
    const curr = fields[field];
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
    result[curr] = state?.[curr] || instrument?.[curr];
  }

  return result;
};
