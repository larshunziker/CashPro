import { getActiveNavItemId, isNavItemActive } from '../navState';
import { BOTTOM_BAR_NAV_ITEMS } from '../constants';

describe('navState', () => {
  describe('getActiveNavItemId', () => {
    it('returns home on the root path', () => {
      expect(getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/')).toBe('home');
    });

    it('returns beratung on /beratung paths', () => {
      expect(getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/beratung')).toBe(
        'beratung',
      );
    });

    it('returns tools on /tools paths', () => {
      expect(
        getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/tools/calculator'),
      ).toBe('tools');
    });

    it('returns profil on /profile paths', () => {
      expect(getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/profile')).toBe(
        'profil',
      );
    });

    it('returns home as fallback on unrelated article paths', () => {
      expect(getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/some-article')).toBe(
        'home',
      );
    });

    it('returns null on engagement paths', () => {
      expect(
        getActiveNavItemId(BOTTOM_BAR_NAV_ITEMS, '/engagement/newsletter'),
      ).toBeNull();
    });
  });

  describe('isNavItemActive', () => {
    it('returns false for action items', () => {
      const chatbotItem = BOTTOM_BAR_NAV_ITEMS.find(
        (item) => item.id === 'chatbot',
      );

      expect(isNavItemActive(chatbotItem!, '/', BOTTOM_BAR_NAV_ITEMS)).toBe(
        false,
      );
    });

    it('delegates active state to getActiveNavItemId', () => {
      const homeItem = BOTTOM_BAR_NAV_ITEMS.find((item) => item.id === 'home');
      const beratungItem = BOTTOM_BAR_NAV_ITEMS.find(
        (item) => item.id === 'beratung',
      );

      expect(
        isNavItemActive(homeItem!, '/beratung', BOTTOM_BAR_NAV_ITEMS),
      ).toBe(false);
      expect(
        isNavItemActive(beratungItem!, '/beratung', BOTTOM_BAR_NAV_ITEMS),
      ).toBe(true);
    });
  });
});
