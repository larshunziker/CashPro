import { cleanCorruptedUtagCookies } from '../utils';

const CORRUPTED_COOKIE_STRING = [
  'utag_main_v_id_018d1d0ea9e90017b144791695d60506f001406700c98_undefined_undefined_undefined_undefined=undefined',
  'utag_main__pn_1%3Bexp-session_undefined_undefined_undefined_undefined=undefined',
  'utag_main__sn_408_undefined_undefined_undefined_undefined=undefined',
  'utag_main_ses_id_1717047605870%3Bexp-session_undefined_undefined_undefined_undefined=undefined',
  'utag_main__ss_0%3Bexp-session_undefined_undefined_undefined_undefined=undefined',
  'utag_main__se_4%3Bexp-session_undefined_undefined_undefined_undefined=undefined',
  'utag_main__st_1717049501689%3Bexp-session_undefined_undefined_undefined_undefined=undefined',
  'utag_main__sn_408_undefined_undefined_undefined=undefined',
  'utag_main__sn_409_undefined_undefined=undefined',
  'utag_main_ses_id_1717054056208%3Bexp-session_undefined_undefined=undefined',
  'utag_main__ss_0%3Bexp-session_undefined_undefined=undefined',
  'utag_main__pn_10%3Bexp-session_undefined_undefined=undefined',
  'utag_main__se_72%3Bexp-session_undefined_undefined=undefined',
  'utag_main__st_1717056649078%3Bexp-session_undefined_undefined=undefined',
  'utag_main__sn_409_undefined=undefined',
  'utag_main__ss_0%3Bexp-session_undefined=undefined',
  'utag_main_ses_id_1717054056208%3Bexp-session_undefined=undefined',
  'utag_main__pn_10%3Bexp-session_undefined=undefined',
  'utag_main__se_74%3Bexp-session_undefined=undefined',
  'utag_main__st_1717056798344%3Bexp-session_undefined=undefined',
  'utag_main__sn_409=undefined',
].join('; ');

const CLEAN_COOKIES = [
  'ea_uuid=202410251505566503301125',
  'utag_main__se=102%3Bexp-session',
  'utag_main__st=1775810031060%3Bexp-session',
].join('; ');

const FULL_COOKIE_STRING = `${CORRUPTED_COOKIE_STRING}; ${CLEAN_COOKIES}`;

describe('cleanCorruptedUtagCookies', () => {
  let cookieStore: Record<string, string>;
  let deletedCookies: string[];

  beforeEach(() => {
    cookieStore = {};
    deletedCookies = [];

    FULL_COOKIE_STRING.split('; ').forEach((pair) => {
      const [name, ...rest] = pair.split('=');
      cookieStore[name] = rest.join('=');
    });

    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get() {
        return Object.entries(cookieStore)
          .map(([k, v]) => `${k}=${v}`)
          .join('; ');
      },
      set(value: string) {
        const [nameVal] = value.split(';');
        const [name, val] = nameVal.split('=');
        if (
          value.includes('expires=Thu, 01 Jan 1970 00:00:00 GMT') ||
          val === ''
        ) {
          deletedCookies.push(name);
          delete cookieStore[name];
        } else {
          cookieStore[name] = val;
        }
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      writable: true,
      value: '',
    });
  });

  it('should identify all corrupted utag_main cookies from the bug report', () => {
    const allCookies = document.cookie.split('; ');
    const corrupted = allCookies.filter((c) => {
      const name = c.split('=')[0];
      return name.startsWith('utag_main') && name.includes('undefined');
    });

    // utag_main__sn_409=undefined has undefined only in value, not name
    expect(corrupted).toHaveLength(20);
  });

  it('should not flag clean utag_main cookies as corrupted', () => {
    const allCookies = document.cookie.split('; ');
    const cleanUtag = allCookies.filter(
      (c) => c.startsWith('utag_main') && !c.includes('undefined'),
    );

    expect(cleanUtag).toHaveLength(2);
    expect(cleanUtag[0]).toBe('utag_main__se=102%3Bexp-session');
    expect(cleanUtag[1]).toBe('utag_main__st=1775810031060%3Bexp-session');
  });

  it('should not flag non-utag cookies', () => {
    const allCookies = document.cookie.split('; ');
    const nonUtag = allCookies.filter((c) => !c.startsWith('utag_main'));

    expect(nonUtag).toHaveLength(1);
    expect(nonUtag[0]).toBe('ea_uuid=202410251505566503301125');
  });

  it('should remove all corrupted cookies and keep clean ones', () => {
    const cookieCountBefore = Object.keys(cookieStore).length;
    expect(cookieCountBefore).toBe(24);

    cleanCorruptedUtagCookies();

    // 20 corrupted removed, 4 remain:
    // ea_uuid, utag_main__sn_409 (undefined only in value), utag_main__se, utag_main__st
    const remaining = Object.keys(cookieStore);
    expect(remaining).toHaveLength(4);
    expect(remaining).toContain('ea_uuid');
    expect(remaining).toContain('utag_main__sn_409');
    expect(remaining).toContain('utag_main__se');
    expect(remaining).toContain('utag_main__st');
  });

  it('should attempt deletion with all domain variants per corrupted cookie', () => {
    cleanCorruptedUtagCookies();

    // 3 delete attempts per corrupted cookie: no domain, .cash.ch, cash.ch
    expect(deletedCookies.length).toBe(20 * 3);
  });

  it('should not throw on empty cookie string', () => {
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => '',
      set: () => {},
    });

    expect(() => cleanCorruptedUtagCookies()).not.toThrow();
  });

  it('should not throw on cookie without utag entries', () => {
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => 'session_id=abc123; theme=dark',
      set: () => {},
    });

    expect(() => cleanCorruptedUtagCookies()).not.toThrow();
  });
});
