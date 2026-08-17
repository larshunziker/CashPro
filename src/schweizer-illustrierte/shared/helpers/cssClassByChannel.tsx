import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_STYLE,
  THEME_DEFAULT,
  THEME_SY,
} from '../../screens/App/constants';
import { ActiveMainChannel } from '../types';

/**
 * Returns the CSS class suffix for a given activeMainChannel.
 */
const getSuffix = (activeMainChannel: ActiveMainChannel | '') => {
  switch (activeMainChannel) {
    case MAIN_CHANNEL_STYLE:
    case MAIN_CHANNEL_BODY_HEALTH:
      return THEME_SY;
    default:
      return THEME_DEFAULT;
  }
};

/**
 * Generates a channel-specific class to allow different styling depending
 * on the channel.
 *
 * During test runs, the CSS class helper behaves differently than in development
 * and production. Since Jest doesn't load stylesheets into objects, we simply
 * return the requested class in order to satisfy the snapshot tests. We can still
 * test the logic by setting skipEnvChecks to true, which makes sure that possible
 * early returns are skipped.
 */
const getCssClass = (
  styles: Record<string, string>,
  suffix: string,
  baseClass: string,
  skipEnvChecks: boolean,
) => {
  if (__TESTING__ && !skipEnvChecks) {
    return baseClass;
  }

  if (!Object.keys(styles).length) {
    return undefined;
  }

  const baseStyle = styles[baseClass] || '';
  const themedClass = `${baseClass}${suffix}`;

  if (themedClass in styles) {
    // Prepend baseStyle, if available.
    return baseStyle
      ? `${baseStyle} ${styles[themedClass]}`
      : styles[themedClass];
  }

  if (baseStyle) {
    return baseStyle;
  }

  return undefined;
};

export default (
    styles: Record<string, string>,
    activeMainChannel: ActiveMainChannel | '',
    skipEnvChecks = false,
  ) =>
  (className: string) =>
    getCssClass(styles, getSuffix(activeMainChannel), className, skipEnvChecks);
