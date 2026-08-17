import { INTEGRATION_INSRUMENT_IDENTIFIER_MAPPING } from './constants';

type LinkType = 'puts' | 'calls';

const LINK_CONFIG: Record<LinkType, { cat: string; utmContent: string }> = {
  puts: { cat: 'Mini+Future+Short', utmContent: 'Short' },
  calls: { cat: 'Mini+Future+Long', utmContent: 'Long' },
};

const TRACKING_PATHS: Record<string, Record<LinkType, string>> = {
  app: {
    puts: '/ddm/clk/629716406;436644178;t;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
    calls:
      '/ddm/clk/630015466;436644178;j;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
  },
  default: {
    puts: '/ddm/clk/546729222;355594415;p;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
    calls:
      '/ddm/clk/546684338;355594415;x;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
  },
};

export const getTrackingPath = (
  type: LinkType,
  isHybridApp: boolean,
): string => {
  return isHybridApp ? TRACKING_PATHS.app[type] : TRACKING_PATHS.default[type];
};

export const getProductLink = (
  type: LinkType,
  instrument: Instrument,
  isHybridApp: boolean,
): string => {
  const config = LINK_CONFIG[type];
  const trackingUrl = `https://ad.doubleclick.net${getTrackingPath(
    type,
    isHybridApp,
  )}`;

  const params: string[] = [`cat=${config.cat}`];

  const sanitizeName = (name?: string): string => {
    if (!name) return '';
    let s = name.trim();
    s = s.replace(/ue/gi, (m) => (m === m.toUpperCase() ? 'Ü' : 'ü'));
    s = s.replace(/\s+/g, '');
    s = s.replace(/[^\p{L}\p{N}_-]/gu, '');
    return s;
  };

  if (instrument.isin) {
    const uVal =
      INTEGRATION_INSRUMENT_IDENTIFIER_MAPPING[
        instrument.isin as keyof typeof INTEGRATION_INSRUMENT_IDENTIFIER_MAPPING
      ];

    if (uVal) {
      params.push(`u=${uVal}`);
    }
  }

  const utmMedium = isHybridApp ? 'SMI_Top_Flop_App' : 'SMI_Top_Flop_Desktop';

  const utmTerm = sanitizeName(instrument.mName ?? undefined);

  params.push(
    'utm_campaign=Jahreskooperationen_AON',
    'utm_source=cash.ch',
    `utm_medium=${utmMedium}`,
    `utm_content=${config.utmContent}`,
    `utm_term=${utmTerm}`,
    'utm_creative_format=Linkintegration',
    'utm_marketing_tactic=Performance',
  );

  const redirectUrl = `https://www.bnpparibasmarkets.ch/produkte/?${params.join(
    '&',
  )}`;

  return `${trackingUrl}?${redirectUrl}`;
};
