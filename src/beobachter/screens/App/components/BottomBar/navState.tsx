import { type BottomBarNavItem } from './constants';

const ENGAGEMENT_PATH_PREFIX = '/engagement';

/**
 * Determines whether a pathname matches a configured nav item path.
 */
function matchesNavItemPath(activePath: string, pathname: string): boolean {
  if (!activePath) {
    return false;
  }
  const normalizedActivePath = activePath.startsWith('/')
    ? activePath
    : `/${activePath}`;
  if (normalizedActivePath === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(normalizedActivePath);
}

function isEngagementPath(pathname: string): boolean {
  return (
    pathname === ENGAGEMENT_PATH_PREFIX ||
    pathname.startsWith(`${ENGAGEMENT_PATH_PREFIX}/`)
  );
}

/**
 * Returns the id of the currently active nav item, or null when no item is active.
 */
export function getActiveNavItemId(
  navItems: BottomBarNavItem[],
  pathname: string,
): string | null {
  if (isEngagementPath(pathname)) {
    return null;
  }

  const matchedItem = navItems.find(
    (item) => !item.isAction && matchesNavItemPath(item.activePath, pathname),
  );
  if (matchedItem) {
    return matchedItem.id;
  }

  const firstNavItem = navItems.find((navItem) => !navItem.isAction);
  if (!firstNavItem) {
    return null;
  }

  const hasOtherMatch = navItems.some(
    (navItem) =>
      !navItem.isAction &&
      navItem.id !== firstNavItem.id &&
      matchesNavItemPath(navItem.activePath, pathname),
  );

  return hasOtherMatch ? null : firstNavItem.id;
}

/**
 * Determines whether a nav item is currently active based on the current pathname.
 */
export function isNavItemActive(
  item: BottomBarNavItem,
  pathname: string,
  navItems: BottomBarNavItem[],
): boolean {
  if (item.isAction) {
    return false;
  }

  return getActiveNavItemId(navItems, pathname) === item.id;
}
