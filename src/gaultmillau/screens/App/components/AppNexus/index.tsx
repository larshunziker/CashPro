import appNexusFactory from '../../../../../common/components/AppNexus/factory';
import { VIEWPORT_XS } from '../../../../../shared/actions/window';
import {
  ADMEIRA_PLATFORM_DESKTOP,
  ADMEIRA_PLATFORM_MOBILE,
} from '../../../../../shared/constants/ads';
import styles from './styles.legacy.css';
import {
  AppNexusFactoryOptions,
  AppNexusFactoryOptionsStyles,
  AppNexusFactoryProps,
} from '../../../../../common/components/AppNexus/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.IAV1, styles.WB1, styles.SBA1, styles.MMR1];

type AppNexusPropsInner = AppNexusFactoryProps;

/**
 * map viewport to ad viewport
 *
 * @desc  maps viewport to ad viewport since tablet and desktop are combined in ad config
 */
export const mapViewportToAdViewport = (
  viewportOrViewportLabel: Viewport | ViewportLabel,
) => {
  const viewportLabel =
    (viewportOrViewportLabel.hasOwnProperty('label') &&
      (viewportOrViewportLabel as Viewport).label) ||
    viewportOrViewportLabel;

  switch (viewportLabel) {
    case VIEWPORT_XS:
      return ADMEIRA_PLATFORM_MOBILE;
    default:
      return ADMEIRA_PLATFORM_DESKTOP;
  }
};

export const getStylesByProps = ({
  slot,
}: AppNexusPropsInner): AppNexusFactoryOptionsStyles => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly AdSlot */
  const classNames: string = styles[slot] || '';
  if (classNames.length < 1) {
    return { AdSlot: styles.AdSlot };
  }
  return { AdSlot: `${styles.AdSlot} ${classNames}` };
};

const appNexusFactoryOption: AppNexusFactoryOptions<AppNexusPropsInner> = {
  mapViewportToAdViewport,
  styles: getStylesByProps,
};

const AppNexus = appNexusFactory(appNexusFactoryOption);

export default AppNexus;
