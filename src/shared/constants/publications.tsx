/**
 * @file   publications
 */

export const PUBLICATION_GROUP_BEO = 'BEO';
export const PUBLICATION_GROUP_RECHTSRATGEBER = 'GDR';
export const PUBLICATION_GROUP_CASH = 'CASH';
export const PUBLICATION_GROUP_HZ = 'HZ';
export const PUBLICATION_GROUP_HZB = 'HZB';
export const PUBLICATION_GROUP_BIL = 'BIL';
export const PUBLICATION_GROUP_GM = 'GM';
export const PUBLICATION_GROUP_GM_FR = 'GM_FR';
export const PUBLICATION_GROUP_SI = 'SI';
export const PUBLICATION_GROUP_SV = 'SV';
export const PUBLICATION_GROUP_BG = 'BG_DE';

//  TODO: Move PUBLICATION_BEO to App/constants file (like we did for SI)
export const PUBLICATION_BEO: string = PUBLICATION_GROUP_BEO;

export const PUBLICATION_BEOBACHTER = 'beobachter';
export const PUBLICATION_BIL = 'bilanz';
export const PUBLICATION_SI = 'schweizer_illustrierte';
export const PUBLICATION_SY = 'style';
export const PUBLICATION_GM = 'gault_millau';
export const PUBLICATION_GM_FR = 'gault_millau_fr';
export const PUBLICATION_HZ = 'handelszeitung';
export const PUBLICATION_CASH = 'cash';
export const PUBLICATION_SWISS_INSURANCE = 'schweizer_versicherung';
export const PUBLICATION_HZB = 'hz_banking';
export const PUBLICATION_BG_DE = 'business_guider_de';

export const PUBLICATION_BEO_SEO_TITLE = 'Beobachter';
export const PUBLICATION_BIL_SEO_TITLE = 'Bilanz';
export const PUBLICATION_SI_SEO_TITLE = 'Schweizer Illustrierte';
export const PUBLICATION_SY_SEO_TITLE = 'Style Magazin';
export const PUBLICATION_GM_SEO_TITLE = 'Gault Millau';
export const PUBLICATION_GM_FR_SEO_TITLE = 'Gault Millau';
export const PUBLICATION_HZ_SEO_TITLE = 'Handelszeitung';
export const PUBLICATION_CASH_SEO_TITLE = 'Cash';
export const PUBLICATION_SWISS_INSURANCE_SEO_TITLE = 'Schweizer Versicherung';
export const PUBLICATION_HZB_SEO_TITLE = 'HZ Banking';

export const ROUTE_HOME_BEO = 'home';
export const ROUTE_HOME_HZ = 'home-hz';
export const ROUTE_HOME_SI = 'home-si';
export const ROUTE_HOME_GM = 'home-gm';
export const ROUTE_HOME_GM_FR = 'home-gm-fr';
export const ROUTE_HOME_CASH = 'home-cash';

export const PUBLICATION_ENUM_MAPPING = {
  [PUBLICATION_BEOBACHTER]: PUBLICATION_GROUP_BEO,
  [PUBLICATION_BIL]: PUBLICATION_GROUP_BIL,
  [PUBLICATION_SI]: PUBLICATION_GROUP_SI,
  [PUBLICATION_GM]: PUBLICATION_GROUP_GM,
  [PUBLICATION_GM_FR]: PUBLICATION_GROUP_GM_FR,
  [PUBLICATION_HZ]: PUBLICATION_GROUP_HZ,
  [PUBLICATION_CASH]: PUBLICATION_GROUP_CASH,
  [PUBLICATION_SWISS_INSURANCE]: PUBLICATION_GROUP_SV,
  insurance: PUBLICATION_GROUP_SV,
  [PUBLICATION_HZB]: PUBLICATION_GROUP_HZB,
  banking: PUBLICATION_GROUP_HZB,
  [PUBLICATION_BG_DE]: PUBLICATION_GROUP_BG,
};
