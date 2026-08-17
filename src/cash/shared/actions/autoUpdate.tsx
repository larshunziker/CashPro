type AutoUpdateStateActionTypes =
  | 'auto-update/set-instrument-keys-anonymous'
  | 'auto-update/set-instrument-keys-custom'
  | 'auto-update/clear-instrument-keys'
  | 'auto-update/toggle-auto-update'
  | 'auto-update/set-instrument-data';

export type AutoUpdateStateAction<T> = {
  type: AutoUpdateStateActionTypes;
  payload?: T;
};

export const setInstrumentKeysAnonymous = (
  instrument: { listingKey: string; isMarketOpen?: boolean }[],
): AutoUpdateStateAction<{
  instrument: { listingKey: string; isMarketOpen?: boolean }[];
}> => ({
  type: 'auto-update/set-instrument-keys-anonymous',
  payload: {
    instrument,
  },
});

export const setInstrumentKeysCustom = (
  instrument: { listingKey: string; isMarketOpen?: boolean }[],
): AutoUpdateStateAction<{
  instrument: { listingKey: string; isMarketOpen?: boolean }[];
}> => ({
  type: 'auto-update/set-instrument-keys-custom',
  payload: {
    instrument,
  },
});

export const clearInstrumentKeys = (): AutoUpdateStateAction<{
  instrument: { listingKey: string; isMarketOpen?: boolean }[];
}> => ({
  type: 'auto-update/clear-instrument-keys',
});

export const toggleAutoUpdate = (
  isAutoUpdateEnabled = false,
): AutoUpdateStateAction<{ isAutoUpdateEnabled: boolean }> => ({
  type: 'auto-update/toggle-auto-update',
  payload: {
    isAutoUpdateEnabled,
  },
});

export const setInstrumentData = (data: {}): AutoUpdateStateAction<{
  data: Record<string, any>;
}> => ({
  type: 'auto-update/set-instrument-data',
  payload: {
    data,
  },
});
