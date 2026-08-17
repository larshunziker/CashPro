// Navigation items configuration for the BEO BottomBar component.
// The Chatbot item (index 2) is a FAB action button, not a navigation link.
/* @ts-ignore — variables.legacy.css.js has no declaration file */
import variables from '../../assets/styles/variables.legacy.css.js';

import {
  SVG_ICONS_TYPE_BOTTOM_BAR_BERATUNG,
  SVG_ICONS_TYPE_BOTTOM_BAR_CHATBOT,
  SVG_ICONS_TYPE_BOTTOM_BAR_HOME,
  SVG_ICONS_TYPE_BOTTOM_BAR_PROFILE,
  SVG_ICONS_TYPE_BOTTOM_BAR_TOOLS,
} from '../SVGIcon/constants';

export type BottomBarNavItem = {
  /** Unique identifier for the item */
  id: string;
  /** Accessible label */
  label: string;
  /** Relative URL for nav links. Empty string for action buttons (e.g. Chatbot). */
  url: string;
  /** Path segment used for active-state matching. Empty string for action buttons. */
  activePath: string;
  /** Whether this item is an action button (FAB) rather than a navigation link */
  isAction?: boolean;
  /** BEO SVG icon type for this item */
  iconType: string;
};

export type BottomBarFeatureItem = {
  id: string;
  label: string;
  url: string;
  icon: string;
};

const BOTTOM_BAR_ICON_TYPE_PREFIX = 'svg-icons/type/bottom-bar-';

const isBottomBarFeatureItem = (
  value: unknown,
): value is BottomBarFeatureItem => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const item = value as BottomBarFeatureItem;
  return (
    typeof item.id === 'string' &&
    typeof item.label === 'string' &&
    typeof item.url === 'string' &&
    typeof item.icon === 'string'
  );
};

const toBottomBarIconType = (iconSuffix: string): string =>
  `${BOTTOM_BAR_ICON_TYPE_PREFIX}${iconSuffix}`;

export const BOTTOM_BAR_NAV_ITEMS: BottomBarNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    url: '/',
    activePath: '/',
    iconType: SVG_ICONS_TYPE_BOTTOM_BAR_HOME,
  },
  {
    id: 'beratung',
    label: 'Beratung',
    url: '/beratung',
    activePath: '/beratung',
    iconType: SVG_ICONS_TYPE_BOTTOM_BAR_BERATUNG,
  },
  {
    id: 'chatbot',
    label: 'Chatbot',
    url: '',
    activePath: '',
    isAction: true,
    iconType: SVG_ICONS_TYPE_BOTTOM_BAR_CHATBOT,
  },
  {
    id: 'tools',
    label: 'Tools',
    url: '/tools',
    activePath: '/tools',
    iconType: SVG_ICONS_TYPE_BOTTOM_BAR_TOOLS,
  },
  {
    id: 'profil',
    label: 'Profil',
    url: '/profile',
    activePath: '/profile',
    iconType: SVG_ICONS_TYPE_BOTTOM_BAR_PROFILE,
  },
];

/**
 * Merges GrowthBook values into local default config by matching id.
 * Unknown/malformed GrowthBook items are ignored and local defaults stay intact.
 */
export const resolveBottomBarNavItems = (
  growthBookValue: unknown,
): BottomBarNavItem[] | null => {
  if (!Array.isArray(growthBookValue) || growthBookValue.length === 0) {
    return BOTTOM_BAR_NAV_ITEMS;
  }
  if (growthBookValue[0].enabled === false) {
    return null;
  }
  const updatesById = new Map<string, BottomBarFeatureItem>();
  growthBookValue.forEach((value) => {
    if (!isBottomBarFeatureItem(value)) {
      return;
    }
    updatesById.set(value.id, value);
  });

  return BOTTOM_BAR_NAV_ITEMS.map((item) => {
    const update = updatesById.get(item.id);
    if (!update) {
      return item;
    }

    const nextUrl = update.url;
    return {
      ...item,
      label: update.label,
      url: nextUrl,
      activePath: item.isAction ? item.activePath : nextUrl,
      iconType: toBottomBarIconType(update.icon),
    };
  });
};

/** CSS class added to <body> when the bottom bar is active on mobile web. */
export const BOTTOM_BAR_ACTIVE_CLASS = 'bottom-bar-active';
export const BOTTOM_BAR_PADDING_CLASS = 'bottom-bar-padding';

/** Height of the bottom bar in pixels — shared with PostCSS via variables.legacy.css.js */
export const BOTTOM_BAR_HEIGHT_PX = parseInt(variables.bottomBarHeightPx, 10);
