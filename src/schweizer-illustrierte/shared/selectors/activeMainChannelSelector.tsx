import { ActiveMainChannel } from '../types';

export default (state: Record<string, any>): ActiveMainChannel =>
  state.settings.activeMainChannel;
