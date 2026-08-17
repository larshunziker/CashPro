import {
  BOTTOM_BAR_HEIGHT_PX,
  BOTTOM_BAR_NAV_ITEMS,
  resolveBottomBarNavItems,
} from '../constants';

describe('[BottomBar] constants resolver', () => {
  it('exports bottom bar height aligned with design tokens', () => {
    expect(BOTTOM_BAR_HEIGHT_PX).toBe(76);
  });

  it('returns local defaults when GrowthBook value is not an array', () => {
    expect(resolveBottomBarNavItems(null)).toEqual(BOTTOM_BAR_NAV_ITEMS);
  });

  it('updates matching item by id with GrowthBook values', () => {
    const resolved = resolveBottomBarNavItems([
      {
        id: 'home',
        label: 'Start',
        url: '/start',
        icon: 'home',
      },
    ]);

    const homeItem = resolved?.find((item) => item.id === 'home');
    expect(homeItem).toMatchObject({
      id: 'home',
      label: 'Start',
      url: '/start',
      activePath: '/start',
      iconType: 'svg-icons/type/bottom-bar-home',
    });
  });

  it('keeps local defaults for items that are not present in GrowthBook', () => {
    const resolved = resolveBottomBarNavItems([
      {
        id: 'tools',
        label: 'Werkzeuge',
        url: '/tools',
        icon: 'tools',
      },
    ]);

    const homeItem = resolved?.find((item) => item.id === 'home');
    expect(homeItem).toEqual(BOTTOM_BAR_NAV_ITEMS[0]);
  });

  it('maps icon suffix to bottom-bar icon type format', () => {
    const resolved = resolveBottomBarNavItems([
      {
        id: 'profil',
        label: 'Profil',
        url: '/profile',
        icon: 'profile',
      },
    ]);

    const profileItem = resolved?.find((item) => item.id === 'profil');
    expect(profileItem?.iconType).toBe('svg-icons/type/bottom-bar-profile');
  });

  it('ignores malformed GrowthBook entries', () => {
    const resolved = resolveBottomBarNavItems([
      {
        id: 'home',
        label: 'Home',
        url: '/',
      },
      {
        id: 'home',
        label: 'Start',
        url: '/start',
        icon: 'home',
      },
    ]);

    const homeItem = resolved?.find((item) => item.id === 'home');
    expect(homeItem?.label).toBe('Start');
  });
});
