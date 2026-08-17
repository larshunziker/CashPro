type SettingsStateActionTypesGM = 'settings/set-language';

export type SettingsStateActionGM<T> = {
  type: SettingsStateActionTypesGM;
  payload: T;
};

// Set language
export const setLanguage = (
  language: string,
): SettingsStateActionGM<{ language: string }> => ({
  type: 'settings/set-language',
  payload: {
    language,
  },
});
