import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_STYLE,
} from '../../screens/App/constants';
import { ActiveMainChannel } from '../types';

const isStyleDesignByChannel = (activeMainChannel: ActiveMainChannel) =>
  activeMainChannel === MAIN_CHANNEL_STYLE ||
  activeMainChannel === MAIN_CHANNEL_BODY_HEALTH;

export default isStyleDesignByChannel;
