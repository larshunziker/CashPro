import { AutoUpdateStateAction } from '../actions/autoUpdate';

export type AutoUpdateState = {
  instrumentKeysAnonymous: {
    listingKey: string;
    isMarketOpen: boolean;
    constituents?: boolean;
  }[];
  instrumentKeysCustom: {
    listingKey: string;
    isMarketOpen: boolean;
    constituents?: boolean;
  }[];
  isAutoUpdateEnabled: boolean;
  data: Record<any, any>;
};

export const autoUpdateInitialState: AutoUpdateState = {
  instrumentKeysAnonymous: [],
  instrumentKeysCustom: [],
  isAutoUpdateEnabled: true,
  data: {},
};

export default (
  state: AutoUpdateState = autoUpdateInitialState,
  action: AutoUpdateStateAction<any>,
): AutoUpdateState => {
  switch (action.type) {
    case 'auto-update/set-instrument-keys-anonymous': {
      const keysA = action?.payload?.instrument || [];
      const keysB = state?.instrumentKeysAnonymous || [];
      // verify if the new keys are a subset of the current keys by verifying the listing keys and if market is open or not
      const setA = Array.from(new Set([...keysB, ...keysA]));
      const isSubset = setA.every((item) =>
        keysB.some(
          (itemB) =>
            itemB?.listingKey === item?.listingKey &&
            itemB?.isMarketOpen === item?.isMarketOpen,
        ),
      );
      if (!isSubset) {
        const instrumentKeysAnonymous = keysA.concat(
          keysB.filter((item) => {
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item2' implicitly has an 'any' type. */
            return !keysA.some((item2) => {
              return item.listingKey === item2.listingKey;
            });
          }),
        );
        return {
          ...state,
          instrumentKeysAnonymous,
        };
      }

      return state;
    }
    case 'auto-update/set-instrument-keys-custom': {
      const keysA = action?.payload?.instrument || [];
      const keysB = state?.instrumentKeysCustom || [];
      // verify if the new keys are a subset of the current keys by verifying the listing keys and if market is open or not
      const setA = Array.from(new Set([...keysB, ...keysA]));
      const isSubset = setA.every((item) =>
        keysB.some(
          (itemB) =>
            itemB?.listingKey === item?.listingKey &&
            itemB?.isMarketOpen === item?.isMarketOpen,
        ),
      );
      if (!isSubset) {
        const instrumentKeysCustom = keysA.concat(
          keysB.filter((item) => {
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item2' implicitly has an 'any' type. */
            return !keysA.some((item2) => {
              return item?.listingKey === item2?.listingKey;
            });
          }),
        );
        return {
          ...state,
          instrumentKeysCustom,
        };
      }

      return state;
    }
    case 'auto-update/clear-instrument-keys':
      return {
        ...state,
        instrumentKeysAnonymous: [],
        instrumentKeysCustom: [],
        data: {},
      };

    case 'auto-update/toggle-auto-update':
      return {
        ...state,
        isAutoUpdateEnabled: action.payload.isAutoUpdateEnabled,
      };

    case 'auto-update/set-instrument-data':
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};
