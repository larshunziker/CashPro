import { ActiveMainChannel, ActiveContentType } from '../types';

export const SET_ACTIVE_MAIN_CHANNEL = 'settings/set-active-main-channel';
export const RESET_ACTIVE_MAIN_CHANNEL = 'settings/reset-active-main-channel';
export const SET_ACTIVE_CONTENT_TYPE = 'settings/set-active-content-type';
export const RESET_ACTIVE_CONTENT_TYPE = 'settings/reset-active-content-type';

export type SettingsStateSI = {
  activeMainChannel: string;
  activeContentType: string;
};

type SettingsStateActionTypes =
  | 'settings/set-active-main-channel'
  | 'settings/reset-active-main-channel'
  | 'settings/set-active-content-type'
  | 'settings/reset-active-content-type';

export type SettingsStateActionSI = {
  type: SettingsStateActionTypes;
  payload: SettingsStateSI;
};

export const setActiveMainChannel = (activeMainChannel: ActiveMainChannel) => ({
  type: SET_ACTIVE_MAIN_CHANNEL,
  payload: {
    activeMainChannel,
  },
});

export const resetActiveMainChannel = () => ({
  type: RESET_ACTIVE_MAIN_CHANNEL,
  payload: {},
});

export const setActiveContentType = (activeContentType: ActiveContentType) => ({
  type: SET_ACTIVE_CONTENT_TYPE,
  payload: {
    activeContentType,
  },
});

export const resetActiveContentType = () => ({
  type: RESET_ACTIVE_CONTENT_TYPE,
  payload: {},
});
